import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { S3Service } from '../../services/s3.service';
import { OcrProcessor } from '../../workers/ocr.processor';
import { PresignedUrlDto } from './dto/presigned-url.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    private ocrProcessor: OcrProcessor,
  ) {}

  async generateUploadPresignedUrl(childId: string, parentId: string, dto: PresignedUrlDto) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (child.parentId !== parentId) {
      throw new ForbiddenException('Access denied to upload documents for this child');
    }

    const documentId = uuidv4();
    const s3Key = `children/${childId}/documents/${documentId}-${dto.file_name}`;

    // Create document record with status "uploaded" (pending confirmation)
    const document = await this.prisma.medicalDocument.create({
      data: {
        id: documentId,
        childId,
        fileName: dto.file_name,
        s3Key,
        fileType: dto.file_type,
        documentCategory: dto.document_category,
        processingStatus: 'uploaded',
      },
    });

    const uploadUrl = await this.s3Service.generatePresignedUploadUrl(
      s3Key,
      dto.file_type,
      900, // 15 mins
    );

    return {
      document_id: document.id,
      upload_url: uploadUrl,
      instructions: 'Upload file directly via PUT request within 15 minutes.',
    };
  }

  async triggerProcessing(documentId: string, userId: string, role: string) {
    const doc = await this.prisma.medicalDocument.findUnique({
      where: { id: documentId },
      include: { child: true },
    });

    if (!doc) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    if (role === 'parent' && doc.child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.ocrProcessor.process({
      documentId: doc.id,
      childId: doc.childId,
      s3Key: doc.s3Key,
      fileType: doc.fileType,
    });
  }

  async getChildDocuments(childId: string, userId: string, role: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    if (role === 'parent' && child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.medicalDocument.findMany({
      where: { childId },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  async getDownloadPresignedUrl(documentId: string, userId: string, role: string) {
    const doc = await this.prisma.medicalDocument.findUnique({
      where: { id: documentId },
      include: { child: true },
    });

    if (!doc) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    if (role === 'parent' && doc.child.parentId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const downloadUrl = await this.s3Service.generatePresignedDownloadUrl(doc.s3Key, 900);

    return {
      document_id: doc.id,
      file_name: doc.fileName,
      download_url: downloadUrl,
      expires_in_seconds: 900,
    };
  }
}
