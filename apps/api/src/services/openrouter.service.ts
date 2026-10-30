import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: 'json_object' };
}

@Injectable()
export class OpenRouterService {
  private readonly logger = new Logger(OpenRouterService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultModel: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENROUTER_API_KEY') || '';
    this.baseUrl =
      this.configService.get<string>('OPENROUTER_BASE_URL') || 'https://openrouter.ai/api/v1';
    this.defaultModel =
      this.configService.get<string>('OPENROUTER_DEFAULT_MODEL') || 'google/gemini-3.5-flash';
  }

  /**
   * Performs standard chat completion via OpenRouter
   */
  async chatCompletion(
    messages: OpenRouterMessage[],
    options?: ChatCompletionOptions,
  ): Promise<string> {
    if (!this.apiKey) {
      this.logger.warn('OPENROUTER_API_KEY not configured. Returning fallback mock response.');
      return 'في متلازمة داون، يبلغ متوسط المشي المستقل عادة بين عمر سنتين إلى 3 سنوات بسبب مرونة المفاصل وضعف التوتر العضلي (Hypotonia). الخطوة السليمة حالياً تتضمن تقييم ثبات الحوض وعضلات الجذع عبر أخصائي علاج طبيعي للأطفال لتحديد الحاجة لدعامات كاحل خفيفة (SMOs) وتمارين التوازن.';
    }

    const model = options?.model || this.defaultModel;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://downplus.health',
          'X-Title': 'Down Plus Digital Health Engine',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options?.temperature ?? 0.3,
          max_tokens: options?.maxTokens ?? 1500,
          response_format: options?.responseFormat,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`OpenRouter API error: ${response.status} - ${errorText}`);
        throw new Error(`OpenRouter API responded with status ${response.status}`);
      }

      const json = await response.json();
      return json.choices?.[0]?.message?.content || '';
    } catch (err) {
      this.logger.error(`OpenRouter call failed: ${err.message}`, err.stack);
      throw err;
    }
  }

  /**
   * Extracts structured JSON from clinical documents (OCR output)
   */
  async extractClinicalSummary(ocrText: string): Promise<Record<string, any>> {
    const systemPrompt = `
You are an expert pediatric clinical intelligence engine specialized in Down Syndrome (Trisomy 21).
Extract a structured clinical JSON summary from medical reports (Echo, Thyroid panels, Genetic karyotypes, or Therapy evaluations).
Respond STRICTLY with valid JSON following this schema:
{
  "extracted_conditions": ["list of confirmed diagnoses"],
  "current_medications": [{"drug": "string", "dosage": "string", "frequency": "string"}],
  "identified_strengths": ["list of child developmental strengths"],
  "priority_clinical_needs": ["list of upcoming screenings or clinical priorities based on AAP Down Syndrome guidelines"],
  "growth_metrics": {"weight_kg": 0, "height_cm": 0, "head_circumference_cm": 0}
}
`.trim();

    const userPrompt = `Analyze the following de-identified medical document text and extract the clinical baseline:\n\n${ocrText}`;

    const rawResponse = await this.chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      {
        temperature: 0.1,
        responseFormat: { type: 'json_object' },
      },
    );

    try {
      return JSON.parse(rawResponse);
    } catch {
      // Fallback if model wraps in code fences
      const cleanJson = rawResponse.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  }
}
