import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenRouterService } from '../../services/openrouter.service';
import { ConfirmBaselineDto } from './dto/confirm-baseline.dto';

@Injectable()
export class CaseBaselineService {
  constructor(
    private prisma: PrismaService,
    private openRouterService: OpenRouterService,
  ) {}

  async getChildBaseline(childId: string, currentUserId: string, currentUserRole: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
      include: {
        caseBaseline: {
          include: {
            verifiedByDoctor: {
              select: {
                id: true,
                email: true,
                doctorProfile: {
                  select: {
                    fullName: true,
                    specialty: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (currentUserRole === 'parent' && child.parentId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }

    if (!child.caseBaseline) {
      // Create empty/initial draft baseline
      const initialBaseline = await this.prisma.caseBaseline.create({
        data: {
          childId,
          status: 'draft_pending_doctor',
          aiGeneratedSummary: {
            extracted_conditions: ['Trisomy 21 (Down Syndrome)'],
            current_medications: [],
            identified_strengths: [],
            priority_clinical_needs: ['Initial health supervision assessment due'],
          },
        },
      });

      return {
        id: initialBaseline.id,
        child_id: initialBaseline.childId,
        status: initialBaseline.status,
        ai_generated_summary: initialBaseline.aiGeneratedSummary,
        verified_by_doctor: null,
        last_updated: initialBaseline.updatedAt,
      };
    }

    return {
      id: child.caseBaseline.id,
      child_id: child.caseBaseline.childId,
      status: child.caseBaseline.status,
      ai_generated_summary: child.caseBaseline.aiGeneratedSummary,
      verified_by_doctor: child.caseBaseline.verifiedByDoctor
        ? {
            id: child.caseBaseline.verifiedByDoctor.id,
            name: child.caseBaseline.verifiedByDoctor.doctorProfile?.fullName,
            specialty: child.caseBaseline.verifiedByDoctor.doctorProfile?.specialty,
            verified_at: child.caseBaseline.verifiedAt,
          }
        : null,
      last_updated: child.caseBaseline.updatedAt,
    };
  }

  async confirmBaseline(baselineId: string, doctorId: string, dto: ConfirmBaselineDto) {
    const baseline = await this.prisma.caseBaseline.findUnique({
      where: { id: baselineId },
      include: { child: true },
    });

    if (!baseline) {
      throw new NotFoundException(`Case baseline with ID ${baselineId} not found`);
    }

    let summary = baseline.aiGeneratedSummary as any;

    if (dto.adjustments?.add_conditions?.length) {
      const current = new Set(summary.extracted_conditions || []);
      dto.adjustments.add_conditions.forEach((c) => current.add(c));
      summary.extracted_conditions = Array.from(current);
    }

    if (dto.adjustments?.remove_conditions?.length) {
      summary.extracted_conditions = (summary.extracted_conditions || []).filter(
        (c: string) => !dto.adjustments?.remove_conditions?.includes(c),
      );
    }

    const updated = await this.prisma.caseBaseline.update({
      where: { id: baselineId },
      data: {
        status: dto.status,
        doctorNotes: dto.doctor_notes,
        verifiedByDoctorId: doctorId,
        verifiedAt: new Date(),
        aiGeneratedSummary: summary,
      },
    });

    // Append to audit case_update_logs
    await this.prisma.caseUpdateLog.create({
      data: {
        childId: baseline.childId,
        authorId: doctorId,
        updateType: 'medical_incident',
        content: `Doctor verified and confirmed clinical case baseline: ${dto.doctor_notes || 'No extra notes'}`,
        metadata: {
          baselineId,
          status: dto.status,
        },
      },
    });

    return {
      success: true,
      confirmed_at: updated.verifiedAt,
      status: updated.status,
    };
  }
}
