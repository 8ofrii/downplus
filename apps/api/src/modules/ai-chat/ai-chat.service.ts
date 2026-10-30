import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AnonymizerService } from '../../services/anonymizer.service';
import { OpenRouterService, OpenRouterMessage } from '../../services/openrouter.service';
import { DoctorMatchService } from '../doctor-match/doctor-match.service';
import { ChatMessageDto } from './dto/chat.dto';

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);

  constructor(
    private prisma: PrismaService,
    private anonymizer: AnonymizerService,
    private openRouter: OpenRouterService,
    private doctorMatcher: DoctorMatchService,
  ) {}

  async processMessage(userId: string, role: string, dto: ChatMessageDto) {
    const child = await this.prisma.child.findUnique({
      where: { id: dto.child_id },
      include: {
        clinicalProfile: true,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${dto.child_id} not found`);
    }

    if (role === 'parent' && child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // 1. Session resolution or creation
    let sessionId = dto.session_id;
    if (!sessionId) {
      const newSession = await this.prisma.aiChatSession.create({
        data: {
          childId: dto.child_id,
          sessionTitle: 'Medical Consultation Session',
        },
      });
      sessionId = newSession.id;
    }

    // 2. Anonymize user message (remove names, phones, emails)
    const sanitizedUserMessage = this.anonymizer.sanitizeUserMessage(
      dto.message,
      child.firstName,
      child.lastName,
    );

    // 3. Save incoming user message
    await this.prisma.aiChatMessage.create({
      data: {
        sessionId,
        senderType: 'user',
        messageText: dto.message, // Store as is for user's own history
      },
    });

    // 4. Retrieve de-identified clinical context
    const clinicalContext = await this.anonymizer.buildAnonymizedClinicalContext(dto.child_id);
    const systemClinicalBlock = this.anonymizer.formatSystemPromptContext(clinicalContext);

    // 5. Construct OpenRouter prompt with AAP Down Syndrome supervision guidelines
    const systemPrompt = `
You are the Down Plus Pediatric Clinical AI Copilot, specialized in Down Syndrome (Trisomy 21) health supervision, developmental milestones, and evidence-based guidance (AAP Guidelines).
You respond warmly, clinically, and empathetically to parents. You support both Arabic and English seamlessly.

${systemClinicalBlock}

CLINICAL SAFETY PRINCIPLES:
1. Always base developmental expectations on Down Syndrome adjusted timelines, not neurotypical timelines (e.g. independent walking typically occurs between 24-36 months due to ligament laxity and hypotonia).
2. Never provide a final prescription dosage or definitive diagnosis; always advise evaluation with a certified pediatric specialist.
3. If questions involve cardiac symptoms, severe respiratory stridor, or acute neck pain/gait changes (potential Atlantoaxial Instability), flag immediate medical attention.
4. When parents ask for recommended doctors or medical actions in Egyptian/Arab cities, give actionable developmental advice first, and indicate that matching specialists are listed below.
`.trim();

    // Fetch conversation history
    const pastMessages = await this.prisma.aiChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 6,
    });

    const messagesToSend: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
      ...pastMessages.map((m) => ({
        role: m.senderType as 'user' | 'assistant',
        content: m.senderType === 'user'
          ? this.anonymizer.sanitizeUserMessage(m.messageText, child.firstName, child.lastName)
          : m.messageText,
      })),
    ];

    // 6. Call OpenRouter
    const assistantResponseText = await this.openRouter.chatCompletion(messagesToSend, {
      temperature: 0.3,
    });

    // 7. Check if query asks for a doctor / specialist
    const lowerQuery = dto.message.toLowerCase();
    const asksForDoctor =
      lowerQuery.includes('دكتور') ||
      lowerQuery.includes('طبيب') ||
      lowerQuery.includes('أخصائي') ||
      lowerQuery.includes('doctor') ||
      lowerQuery.includes('physio') ||
      lowerQuery.includes('specialist') ||
      lowerQuery.includes('مركز');

    let recommendedDoctors: any[] = [];
    if (asksForDoctor) {
      // Detect city
      let detectedCity: string | undefined = undefined;
      if (dto.message.includes('جيزة') || dto.message.includes('Giza')) detectedCity = 'Giza';
      if (dto.message.includes('قاهرة') || dto.message.includes('Cairo')) detectedCity = 'Cairo';
      if (dto.message.includes('إسكندرية') || dto.message.includes('Alexandria')) detectedCity = 'Alexandria';

      // Detect specialty
      let detectedSpecialty: string | undefined = undefined;
      if (dto.message.includes('يمشي') || dto.message.includes('طبيعي') || dto.message.includes('حركي') || dto.message.includes('علاج')) {
        detectedSpecialty = 'Pediatric Physiotherapy';
      } else if (dto.message.includes('كلام') || dto.message.includes('تخاطب') || dto.message.includes('بلع')) {
        detectedSpecialty = 'Speech Therapist';
      } else if (dto.message.includes('قلب')) {
        detectedSpecialty = 'Pediatric Cardiologist';
      } else if (dto.message.includes('غدة') || dto.message.includes('تحليل')) {
        detectedSpecialty = 'Pediatric Endocrinologist';
      }

      recommendedDoctors = await this.doctorMatcher.findMatches({
        city: detectedCity,
        specialtyQuery: detectedSpecialty,
        limit: 3,
      });
    }

    // 8. Save assistant reply in database
    await this.prisma.aiChatMessage.create({
      data: {
        sessionId,
        senderType: 'assistant',
        messageText: assistantResponseText,
        recommendedDoctorIds: recommendedDoctors.map((d) => d.doctor_id),
      },
    });

    return {
      session_id: sessionId,
      response_text: assistantResponseText,
      recommended_doctors: recommendedDoctors,
    };
  }

  async getSessions(childId: string, userId: string, role: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (role === 'parent' && child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.aiChatSession.findMany({
      where: { childId },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSessionHistory(sessionId: string, userId: string, role: string) {
    const session = await this.prisma.aiChatSession.findUnique({
      where: { id: sessionId },
      include: {
        child: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (role === 'parent' && session.child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return session.messages;
  }
}
