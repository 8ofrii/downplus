import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DoctorMatchService } from './doctor-match.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Doctor Matching Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('doctor-match')
export class DoctorMatchController {
  constructor(private doctorMatchService: DoctorMatchService) {}

  @Get()
  @ApiOperation({ summary: 'Find matched doctors using multi-variable scoring formula' })
  @ApiQuery({ name: 'specialty', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'governorate', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findMatches(
    @Query('specialty') specialty?: string,
    @Query('city') city?: string,
    @Query('governorate') governorate?: string,
    @Query('limit') limit?: string,
  ) {
    return this.doctorMatchService.findMatches({
      specialtyQuery: specialty,
      city,
      governorate,
      limit: limit ? parseInt(limit, 10) : 5,
    });
  }
}
