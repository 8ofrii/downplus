import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MilestonesService } from './milestones.service';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Milestones & Skills')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class MilestonesController {
  constructor(private milestonesService: MilestonesService) {}

  @Get('milestones/catalog')
  @ApiOperation({ summary: 'Get milestone catalog for disease module' })
  @ApiQuery({ name: 'domain', required: false })
  @ApiQuery({ name: 'age_months', required: false, type: Number })
  async getCatalog(
    @Query('domain') domain?: string,
    @Query('age_months') ageMonths?: string,
  ) {
    return this.milestonesService.getCatalog(
      domain,
      ageMonths ? parseInt(ageMonths, 10) : undefined,
    );
  }

  @Get('children/:child_id/milestones')
  @ApiOperation({ summary: 'Get milestone progress for a child' })
  async getChildProgress(
    @Param('child_id') childId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
  ) {
    return this.milestonesService.getChildProgress(childId, userId, userRole);
  }

  @Patch('children/:child_id/milestones/:milestone_id')
  @ApiOperation({ summary: 'Update child milestone status (Independence Ladder)' })
  async updateMilestone(
    @Param('child_id') childId: string,
    @Param('milestone_id') milestoneId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Body() dto: UpdateMilestoneDto,
  ) {
    return this.milestonesService.updateMilestone(childId, milestoneId, userId, userRole, dto);
  }
}
