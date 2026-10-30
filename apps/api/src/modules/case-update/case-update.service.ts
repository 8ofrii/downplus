import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCaseUpdateDto } from './dto/create-case-update.dto';

@Injectable()
export class CaseUpdateService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, role: string, dto: CreateCaseUpdateDto) {
    const child = await this.prisma.child.findUnique({
      where: { id: dto.child_id },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${dto.child_id} not found`);
    }

    if (role === 'parent' && child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.caseUpdateLog.create({
      data: {
        childId: dto.child_id,
        authorId: userId,
        updateType: dto.update_type,
        content: dto.content,
        metadata: dto.metadata || {},
      },
    });
  }

  async getTimeline(childId: string, userId: string, role: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (role === 'parent' && child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.caseUpdateLog.findMany({
      where: { childId },
      include: {
        author: {
          select: {
            id: true,
            role: true,
            doctorProfile: {
              select: {
                fullName: true,
                specialty: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
