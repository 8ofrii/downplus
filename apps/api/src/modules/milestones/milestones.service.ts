import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';

@Injectable()
export class MilestonesService {
  constructor(private prisma: PrismaService) {}

  async getCatalog(domain?: string, ageMonths?: number, disease = 'Down Syndrome') {
    return this.prisma.milestoneCatalog.findMany({
      where: {
        moduleDisease: disease,
        ...(domain ? { domain } : {}),
        ...(ageMonths !== undefined
          ? {
              ageBracketMinMonths: { lte: ageMonths },
              ageBracketMaxMonths: { gte: ageMonths },
            }
          : {}),
      },
      orderBy: [{ domain: 'asc' }, { ageBracketMinMonths: 'asc' }],
    });
  }

  async getChildProgress(childId: string, currentUserId: string, currentUserRole: string) {
    await this.verifyAccess(childId, currentUserId, currentUserRole);

    return this.prisma.childMilestoneProgress.findMany({
      where: { childId },
      include: {
        milestone: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async updateMilestone(
    childId: string,
    milestoneId: string,
    currentUserId: string,
    currentUserRole: string,
    dto: UpdateMilestoneDto,
  ) {
    await this.verifyAccess(childId, currentUserId, currentUserRole);

    const milestone = await this.prisma.milestoneCatalog.findUnique({
      where: { id: milestoneId },
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${milestoneId} not found in catalog`);
    }

    const progress = await this.prisma.childMilestoneProgress.upsert({
      where: {
        unique_child_milestone: {
          childId,
          milestoneId,
        },
      },
      update: {
        status: dto.status,
        notes: dto.notes,
        lastUpdatedByUserId: currentUserId,
        updatedAt: new Date(),
      },
      create: {
        childId,
        milestoneId,
        status: dto.status,
        notes: dto.notes,
        lastUpdatedByUserId: currentUserId,
      },
    });

    // Also append to case_update_logs for timeline tracking
    await this.prisma.caseUpdateLog.create({
      data: {
        childId,
        authorId: currentUserId,
        updateType: 'skill_change',
        content: `Updated milestone "${milestone.titleEn}" to ${dto.status}${dto.notes ? `: ${dto.notes}` : ''}`,
        metadata: {
          milestoneId,
          domain: milestone.domain,
          newStatus: dto.status,
        },
      },
    });

    return {
      milestone_id: progress.milestoneId,
      current_status: progress.status,
      updated_at: progress.updatedAt,
    };
  }

  private async verifyAccess(childId: string, userId: string, role: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (role === 'parent' && child.parentId !== userId) {
      throw new ForbiddenException('Access denied to this child milestones');
    }
  }
}
