import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalChildren, totalDoctors, totalDocuments, totalActiveSubscriptions] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.child.count(),
        this.prisma.doctorProfile.count(),
        this.prisma.medicalDocument.count(),
        this.prisma.subscription.count({ where: { status: 'active', tier: { not: 'free' } } }),
      ]);

    return {
      total_users: totalUsers,
      total_children: totalChildren,
      total_doctors: totalDoctors,
      total_documents: totalDocuments,
      active_pro_subscriptions: totalActiveSubscriptions,
    };
  }

  async getAllDoctors() {
    return this.prisma.doctorProfile.findMany({
      include: {
        user: {
          select: {
            email: true,
            phoneNumber: true,
            createdAt: true,
          },
        },
      },
      orderBy: { experienceYearsPediatric: 'desc' },
    });
  }

  async verifyDoctor(doctorId: string, isActive: boolean) {
    return this.prisma.doctorProfile.update({
      where: { id: doctorId },
      data: { isActive },
    });
  }
}
