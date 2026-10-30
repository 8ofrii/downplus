import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Doctor Portal')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctor')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get('patients')
  @Roles(UserRole.doctor, UserRole.clinic_admin)
  @ApiOperation({ summary: 'Get all assigned children/patients for logged-in doctor' })
  async getAssignedPatients(@CurrentUser('id') doctorId: string) {
    return this.doctorsService.getAssignedPatients(doctorId);
  }

  @Get('profile')
  @Roles(UserRole.doctor)
  @ApiOperation({ summary: 'Get current doctor clinical profile and rating' })
  async getProfile(@CurrentUser('id') doctorId: string) {
    return this.doctorsService.getDoctorProfile(doctorId);
  }
}
