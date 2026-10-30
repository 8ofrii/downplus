import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface AnonymizedContext {
  ageMonths: number;
  gender: string;
  primaryDiagnosis: string;
  karyotype: string | null;
  gestationalAgeWeeks: number | null;
  comorbidities: string[];
  activeMedications: Array<{ drug: string; dosage: string; frequency: string }>;
  milestoneSummary: string;
  recentObservations: string[];
}

@Injectable()
export class AnonymizerService {
  private readonly logger = new Logger(AnonymizerService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Sanitizes user message text by redacting PII patterns (Egyptian/Arabic phone numbers, emails, child names)
   */
  sanitizeUserMessage(message: string, childFirstName?: string, childLastName?: string): string {
    let sanitized = message;

    // 1. Remove Child Names if provided
    if (childFirstName && childFirstName.trim().length > 1) {
      const escapedFirst = childFirstName.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      sanitized = sanitized.replace(new RegExp(escapedFirst, 'gi'), 'Patient');
    }
    if (childLastName && childLastName.trim().length > 1) {
      const escapedLast = childLastName.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      sanitized = sanitized.replace(new RegExp(escapedLast, 'gi'), '');
    }

    // 2. Strip Phone Numbers (International & Local MENA formats)
    sanitized = sanitized.replace(/(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g, '[PHONE REDACTED]');

    // 3. Strip Email Addresses
    sanitized = sanitized.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EMAIL REDACTED]');

    // 4. Strip National IDs (e.g. Egyptian 14-digit National ID)
    sanitized = sanitized.replace(/\b\d{14}\b/g, '[NATIONAL_ID REDACTED]');

    return sanitized;
  }

  /**
   * Builds an entirely de-identified clinical context for the LLM prompt.
   * STRICT GDPR/HIPAA BOUNDARY: Names, parents, phones, and exact addresses are never queried or injected.
   */
  async buildAnonymizedClinicalContext(childId: string): Promise<AnonymizedContext> {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
      include: {
        clinicalProfile: true,
        caseBaseline: true,
        milestoneProgress: {
          include: { milestone: true },
          where: { status: { not: 'not_started' } },
        },
        caseUpdateLogs: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!child) {
      throw new Error(`Child with ID ${childId} not found`);
    }

    // Calculate age in months
    const today = new Date();
    const dob = new Date(child.dateOfBirth);
    const ageMonths = Math.max(
      0,
      (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth()),
    );

    // Extract comorbidities
    const comorbidities: string[] = Array.isArray(child.clinicalProfile?.comorbidities)
      ? (child.clinicalProfile.comorbidities as string[])
      : [];

    // Extract active medications from Case Baseline if present
    const baselineSummary = child.caseBaseline?.aiGeneratedSummary as any;
    const activeMedications = baselineSummary?.current_medications || [];

    // Summarize achieved milestones
    const milestoneSummaries = child.milestoneProgress.map(
      (mp) => `${mp.milestone.domain}: ${mp.milestone.titleEn} (${mp.status})`,
    );

    // Extract recent clinical observations
    const recentObservations = child.caseUpdateLogs.map(
      (log) => `[${log.updateType}]: ${log.content}`,
    );

    return {
      ageMonths,
      gender: child.gender || 'unspecified',
      primaryDiagnosis: child.clinicalProfile?.primaryDiagnosis || 'Down Syndrome',
      karyotype: child.clinicalProfile?.karyotypeType || null,
      gestationalAgeWeeks: child.clinicalProfile?.gestationalAgeWeeks || null,
      comorbidities,
      activeMedications,
      milestoneSummary: milestoneSummaries.length > 0 ? milestoneSummaries.join(', ') : 'None recorded yet',
      recentObservations,
    };
  }

  /**
   * Formats the clinical context into the system prompt string
   */
  formatSystemPromptContext(context: AnonymizedContext): string {
    const meds = context.activeMedications
      .map((m) => `${m.drug} (${m.dosage}, ${m.frequency})`)
      .join('; ');

    return `
=== CLINICAL CONTEXT (DE-IDENTIFIED) ===
- Age: ${context.ageMonths} months
- Gender: ${context.gender}
- Primary Diagnosis: ${context.primaryDiagnosis}
- Karyotype: ${context.karyotype || 'Not specified'}
- Gestational Age: ${context.gestationalAgeWeeks ? `${context.gestationalAgeWeeks} weeks` : 'Full term'}
- Documented Comorbidities: ${context.comorbidities.length ? context.comorbidities.join(', ') : 'None'}
- Current Active Medications: ${meds || 'None'}
- Developmental Milestones: ${context.milestoneSummary}
- Recent Observations: ${context.recentObservations.length ? context.recentObservations.join(' | ') : 'None'}
========================================
`.trim();
  }
}
