import { Module } from '@nestjs/common';
import { DoctorMatchService } from './doctor-match.service';
import { DoctorMatchController } from './doctor-match.controller';

@Module({
  controllers: [DoctorMatchController],
  providers: [DoctorMatchService],
  exports: [DoctorMatchService],
})
export class DoctorMatchModule {}
