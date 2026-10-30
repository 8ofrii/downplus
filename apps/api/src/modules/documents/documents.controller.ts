import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { PresignedUrlDto } from './dto/presigned-url.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Medical Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post('children/:child_id/documents/presigned-url')
  @ApiOperation({ summary: 'Request a presigned S3 URL to upload medical report' })
  async getPresignedUploadUrl(
    @Param('child_id') childId: string,
    @CurrentUser('id') parentId: string,
    @Body() dto: PresignedUrlDto,
  ) {
    return this.documentsService.generateUploadPresignedUrl(childId, parentId, dto);
  }

  @Get('children/:child_id/documents')
  @ApiOperation({ summary: 'List all medical documents uploaded for a child' })
  async getChildDocuments(
    @Param('child_id') childId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.documentsService.getChildDocuments(childId, userId, role);
  }

  @Get('documents/:id/download-url')
  @ApiOperation({ summary: 'Get a temporary presigned download URL for a document' })
  async getDownloadUrl(
    @Param('id') documentId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.documentsService.getDownloadPresignedUrl(documentId, userId, role);
  }

  @Post('documents/:id/process')
  @ApiOperation({ summary: 'Trigger OCR extraction and AI baseline drafting for uploaded document' })
  async triggerProcessing(
    @Param('id') documentId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    await this.documentsService.triggerProcessing(documentId, userId, role);
    return { success: true, message: 'OCR and clinical baseline extraction triggered.' };
  }
}
