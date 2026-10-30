import { Module } from '@nestjs/common';
import { CaseUpdateService } from './case-update.service';
import { CaseUpdateController } from './case-update.controller';

@Module({
  controllers: [CaseUpdateController],
  providers: [CaseUpdateService],
  exports: [CaseUpdateService],
})
export class CaseUpdateModule {}
