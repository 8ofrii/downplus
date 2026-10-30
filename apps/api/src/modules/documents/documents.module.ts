import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { S3Service } from '../../services/s3.service';
import { OcrProcessor } from '../../workers/ocr.processor';
import { OpenRouterService } from '../../services/openrouter.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, S3Service, OcrProcessor, OpenRouterService],
  exports: [DocumentsService, OcrProcessor],
})
export class DocumentsModule {}
