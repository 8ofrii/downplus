import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CaseBaselineService } from './case-baseline.service';
import { ConfirmBaselineDto } from './dto/confirm-baseline.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Clinical Case Baseline')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class CaseBaselineController {
  constructor(private caseBaselineService: CaseBaselineService) {}

  @Get('children/:child_id/case-baseline')
  @ApiOperation({ summary: 'Get AI-drafted or doctor-confirmed case baseline' })
  async getBaseline(
    @Param('child_id') childId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.caseBaselineService.getChildBaseline(childId, userId, role);
  }

  @Post('clinical/baseline/:baseline_id/confirm')
  @Roles(UserRole.doctor, UserRole.super_admin)
  @ApiOperation({ summary: 'Doctor review and confirmation of case baseline draft' })
  async confirmBaseline(
    @Param('baseline_id') baselineId: string,
    @CurrentUser('id') doctorId: string,
    @Body() dto: ConfirmBaselineDto,
  ) {
    return this.caseBaselineService.confirmBaseline(baselineId, doctorId, dto);
  }
}
