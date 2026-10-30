import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GrowthService } from './growth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Down Syndrome Growth Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('children/:child_id/growth')
export class GrowthController {
  constructor(private growthService: GrowthService) {}

  @Get()
  @ApiOperation({ summary: 'Get child growth metrics calculated against CDC Down Syndrome specific curves' })
  async getChildGrowth(@Param('child_id') childId: string) {
    return this.growthService.getChildGrowthData(childId);
  }
}
