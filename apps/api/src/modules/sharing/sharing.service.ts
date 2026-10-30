import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { EncryptionService } from '../../services/encryption.service';
import { GenerateShareTokenDto } from './dto/generate-token.dto';

@Injectable()
export class SharingService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
    private configService: ConfigService,
  ) {}

  async generateShareToken(userId: string, dto: GenerateShareTokenDto) {
    const child = await this.prisma.child.findUnique({
      where: { id: dto.child_id },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${dto.child_id} not found`);
    }

    if (child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const validityHours = dto.validity_hours || 48;
    const expiresAt = new Date(Date.now() + validityHours * 3600 * 1000);
    const rawToken = `exp_${this.encryptionService.generateSecureToken(32)}`;

    await this.prisma.doctorAccessToken.create({
      data: {
        childId: dto.child_id,
        grantedByUserId: userId,
        targetDoctorId: dto.target_doctor_id || null,
        token: rawToken,
        canViewFullHistory: dto.can_view_full_history ?? true,
        canAddClinicalNotes: dto.can_add_clinical_notes ?? false,
        expiresAt,
      },
    });

    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'https://downplus.health';
    const shareUrl = `${frontendUrl}/guest/view?token=${rawToken}`;

    // SVG QR Code representation
    const qrSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#ffffff"/><text x="10" y="100" font-family="sans-serif" font-size="12" fill="#333">QR: ${rawToken.substring(0, 16)}...</text></svg>`;

    return {
      share_url: shareUrl,
      qr_code_svg: qrSvg,
      expires_at: expiresAt,
    };
  }

  async getGuestView(token: string) {
    const tokenRecord = await this.prisma.doctorAccessToken.findUnique({
      where: { token },
      include: {
        child: {
          include: {
            clinicalProfile: true,
            caseBaseline: true,
            milestoneProgress: {
              include: { milestone: true },
            },
            documents: {
              select: {
                id: true,
                fileName: true,
                documentCategory: true,
                uploadedAt: true,
              },
            },
          },
        },
      },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException({
        code: 'INVALID_TOKEN',
        message: 'The share link is invalid or does not exist.',
      });
    }

    if (new Date() > tokenRecord.expiresAt) {
      throw new UnauthorizedException({
        code: 'TOKEN_EXPIRED',
        message: 'This medical share link has expired. Please ask the parent for a renewed link.',
      });
    }

    const { child } = tokenRecord;

    return {
      access_permissions: {
        can_view_full_history: tokenRecord.canViewFullHistory,
        can_add_clinical_notes: tokenRecord.canAddClinicalNotes,
        expires_at: tokenRecord.expiresAt,
      },
      patient_summary: {
        id: child.id,
        first_name: child.firstName,
        last_name: child.lastName,
        date_of_birth: child.dateOfBirth,
        gender: child.gender,
        blood_type: child.bloodType,
        clinical_profile: child.clinicalProfile,
        case_baseline: child.caseBaseline,
        milestones: tokenRecord.canViewFullHistory ? child.milestoneProgress : [],
        documents: tokenRecord.canViewFullHistory ? child.documents : [],
      },
    };
  }
}
