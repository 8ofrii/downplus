import { Module } from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import { AiChatController } from './ai-chat.controller';
import { AnonymizerService } from '../../services/anonymizer.service';
import { OpenRouterService } from '../../services/openrouter.service';
import { DoctorMatchModule } from '../doctor-match/doctor-match.module';

@Module({
  imports: [DoctorMatchModule],
  controllers: [AiChatController],
  providers: [AiChatService, AnonymizerService, OpenRouterService],
  exports: [AiChatService],
})
export class AiChatModule {}
