import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenRouterService } from '../services/openrouter.service';

export interface OcrJobData {
  documentId: string;
  childId: string;
  s3Key: string;
  fileType: string;
}

@Injectable()
export class OcrProcessor {
  private readonly logger = new Logger(OcrProcessor.name);

  constructor(
    private prisma: PrismaService,
    private openRouter: OpenRouterService,
  ) {}

  /**
   * Processes uploaded medical document text extraction.
   * Can be hooked to BullMQ @Processor('ocr') or run asynchronously
   */
  async process(job: OcrJobData): Promise<void> {
    this.logger.log(`Starting OCR text extraction for document: ${job.documentId}`);

    try {
      // 1. Update status to processing_ocr
      await this.prisma.medicalDocument.update({
        where: { id: job.documentId },
        data: { processingStatus: 'processing_ocr' },
      });

      // 2. Simulated OCR extraction (In production: calls Google Cloud Vision or multimodal Gemini via OpenRouter)
      const simulatedOcrText = `
Echocardiogram Examination Report
Patient Age: 2 months. Diagnosis: Down Syndrome (Trisomy 21).
Echo Findings: Small perimembranous ventricular septal defect (VSD), 3.2 mm with left-to-right shunt. Normal biventricular systolic function. No pulmonary hypertension.
Thyroid Panel: TSH 5.4 mIU/L, FT4 1.2 ng/dL. Subclinical hypothyroidism noted, initiated Eltroxin 25 mcg OD.
      `.trim();

      // 3. Save raw OCR text
      await this.prisma.medicalDocument.update({
        where: { id: job.documentId },
        data: {
          ocrRawText: simulatedOcrText,
          processingStatus: 'ocr_completed',
        },
      });

      this.logger.log(`OCR completed for document ${job.documentId}. Triggering AI baseline draft extraction...`);

      // 4. Trigger AI Baseline Extraction
      const extractedSummary = await this.openRouter.extractClinicalSummary(simulatedOcrText);

      // 5. Upsert child case baseline in "draft_pending_doctor" status
      await this.prisma.caseBaseline.upsert({
        where: { childId: job.childId },
        update: {
          aiGeneratedSummary: extractedSummary,
          status: 'draft_pending_doctor',
          updatedAt: new Date(),
        },
        create: {
          childId: job.childId,
          aiGeneratedSummary: extractedSummary,
          status: 'draft_pending_doctor',
        },
      });

      this.logger.log(`Successfully generated and stored AI Case Baseline Draft for child: ${job.childId}`);
    } catch (err: any) {
      this.logger.error(`OCR processing failed for document ${job.documentId}: ${err.message}`, err.stack);
      await this.prisma.medicalDocument.update({
        where: { id: job.documentId },
        data: { processingStatus: 'failed' },
      });
    }
  }
}
