import { Module } from '@nestjs/common';
import { CaseBaselineService } from './case-baseline.service';
import { CaseBaselineController } from './case-baseline.controller';
import { OpenRouterService } from '../../services/openrouter.service';

@Module({
  controllers: [CaseBaselineController],
  providers: [CaseBaselineService, OpenRouterService],
  exports: [CaseBaselineService],
})
export class CaseBaselineModule {}
