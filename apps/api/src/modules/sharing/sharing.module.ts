import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { SharingController } from './sharing.controller';
import { EncryptionService } from '../../services/encryption.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Module({
  controllers: [SharingController],
  providers: [SharingService, EncryptionService, PdfGeneratorService],
  exports: [SharingService, PdfGeneratorService],
})
export class SharingModule {}
