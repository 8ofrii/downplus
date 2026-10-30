import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiChatService } from './ai-chat.service';
import { ChatMessageDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('AI Clinical Copilot')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai/chat')
export class AiChatController {
  constructor(private aiChatService: AiChatService) {}

  @Post()
  @ApiOperation({
    summary: 'Chat with AI Clinical Copilot (anonymized clinical context injected automatically)',
  })
  async sendMessage(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
    @Body() dto: ChatMessageDto,
  ) {
    return this.aiChatService.processMessage(userId, role, dto);
  }

  @Get('sessions/:child_id')
  @ApiOperation({ summary: 'Get all chat sessions for a child' })
  async getSessions(
    @Param('child_id') childId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.aiChatService.getSessions(childId, userId, role);
  }

  @Get('history/:session_id')
  @ApiOperation({ summary: 'Get full message history for a specific chat session' })
  async getSessionHistory(
    @Param('session_id') sessionId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.aiChatService.getSessionHistory(sessionId, userId, role);
  }
}
