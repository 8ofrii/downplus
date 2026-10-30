import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Super Admin Operations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.super_admin)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get core health engine system metrics' })
  async getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('doctors')
  @ApiOperation({ summary: 'Get all registered doctors for verification' })
  async getAllDoctors() {
    return this.adminService.getAllDoctors();
  }

  @Patch('doctors/:id/status')
  @ApiOperation({ summary: 'Activate or deactivate a doctor profile' })
  async setDoctorStatus(
    @Param('id') doctorId: string,
    @Body('is_active') isActive: boolean,
  ) {
    return this.adminService.verifyDoctor(doctorId, isActive);
  }
}
