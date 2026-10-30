import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CaseUpdateService } from './case-update.service';
import { CreateCaseUpdateDto } from './dto/create-case-update.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Timeline & Case Updates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('case-updates')
export class CaseUpdateController {
  constructor(private caseUpdateService: CaseUpdateService) {}

  @Post()
  @ApiOperation({ summary: 'Log a new case update, skill change or medical incident' })
  async create(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
    @Body() dto: CreateCaseUpdateDto,
  ) {
    return this.caseUpdateService.create(userId, role, dto);
  }

  @Get('timeline/:child_id')
  @ApiOperation({ summary: 'Get unified chronological timeline of case updates for a child' })
  async getTimeline(
    @Param('child_id') childId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.caseUpdateService.getTimeline(childId, userId, role);
  }
}
