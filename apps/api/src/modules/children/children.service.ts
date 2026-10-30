import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(parentId: string, dto: CreateChildDto) {
    const child = await this.prisma.$transaction(async (tx) => {
      const newChild = await tx.child.create({
        data: {
          parentId,
          firstName: dto.first_name,
          lastName: dto.last_name,
          dateOfBirth: new Date(dto.date_of_birth),
          gender: dto.gender,
          bloodType: dto.blood_type,
        },
      });

      await tx.childClinicalProfile.create({
        data: {
          childId: newChild.id,
          primaryDiagnosis: 'Down Syndrome',
          karyotypeType: dto.karyotype_type,
          gestationalAgeWeeks: dto.gestational_age_weeks,
          birthWeightKg: dto.birth_weight_kg,
          comorbidities: dto.comorbidities || [],
        },
      });

      return newChild;
    });

    return {
      child_id: child.id,
      message: 'Child profile created successfully. Ready for initial documentation.',
    };
  }

  async findAllByParent(parentId: string) {
    return this.prisma.child.findMany({
      where: { parentId },
      include: {
        clinicalProfile: true,
        caseBaseline: {
          select: {
            id: true,
            status: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(childId: string, currentUserId: string, currentUserRole: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
      include: {
        clinicalProfile: true,
        caseBaseline: true,
        documents: {
          select: {
            id: true,
            fileName: true,
            fileType: true,
            documentCategory: true,
            processingStatus: true,
            uploadedAt: true,
          },
        },
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    // Role check: parents can only see their own children
    if (currentUserRole === 'parent' && child.parentId !== currentUserId) {
      throw new ForbiddenException('You do not have permission to view this child profile.');
    }

    // Doctors check: must either have valid access token or be assigned
    if (currentUserRole === 'doctor') {
      const hasActiveToken = await this.prisma.doctorAccessToken.findFirst({
        where: {
          childId,
          targetDoctorId: currentUserId,
          expiresAt: { gt: new Date() },
        },
      });

      if (!hasActiveToken) {
        throw new ForbiddenException('No active access grant for this patient.');
      }
    }

    return child;
  }

  async update(childId: string, parentId: string, dto: UpdateChildDto) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (child.parentId !== parentId) {
      throw new ForbiddenException('You do not own this child profile.');
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedChild = await tx.child.update({
        where: { id: childId },
        data: {
          firstName: dto.first_name,
          lastName: dto.last_name,
          dateOfBirth: dto.date_of_birth ? new Date(dto.date_of_birth) : undefined,
          gender: dto.gender,
          bloodType: dto.blood_type,
        },
      });

      if (
        dto.karyotype_type !== undefined ||
        dto.gestational_age_weeks !== undefined ||
        dto.birth_weight_kg !== undefined ||
        dto.comorbidities !== undefined
      ) {
        await tx.childClinicalProfile.update({
          where: { childId },
          data: {
            karyotypeType: dto.karyotype_type,
            gestationalAgeWeeks: dto.gestational_age_weeks,
            birthWeightKg: dto.birth_weight_kg,
            comorbidities: dto.comorbidities,
          },
        });
      }

      return updatedChild;
    });
  }

  async delete(childId: string, parentId: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (child.parentId !== parentId) {
      throw new ForbiddenException('You do not own this child profile.');
    }

    await this.prisma.child.delete({
      where: { id: childId },
    });

    return {
      success: true,
      message: 'Child profile and associated clinical records deleted.',
    };
  }
}
