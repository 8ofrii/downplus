import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async getAssignedPatients(doctorId: string) {
    // Patients where the doctor has an active access token or verified baseline
    const grants = await this.prisma.doctorAccessToken.findMany({
      where: {
        targetDoctorId: doctorId,
        expiresAt: { gt: new Date() },
      },
      include: {
        child: {
          include: {
            clinicalProfile: true,
            caseBaseline: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return grants.map((g) => ({
      grant_id: g.id,
      can_view_full_history: g.canViewFullHistory,
      can_add_clinical_notes: g.canAddClinicalNotes,
      expires_at: g.expiresAt,
      child: g.child,
    }));
  }

  async getDoctorProfile(userId: string) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Doctor profile not found');
    }
    return profile;
  }
}
