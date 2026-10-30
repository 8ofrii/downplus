import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') || 'me-south-1';
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'minioadmin';
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'minioadmin123';

    this.bucketName =
      this.configService.get<string>('S3_MEDICAL_DOCS_BUCKET') || 'downplus-medical-docs-dev';

    this.s3Client = new S3Client({
      region,
      endpoint: endpoint || undefined,
      forcePathStyle: !!endpoint, // needed for MinIO
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  /**
   * Generates a presigned upload URL for direct client upload
   * Maximum expiry strictly set to 15 minutes (900 seconds) per GDPR/security specs
   */
  async generatePresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn = 900,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  /**
   * Generates a presigned download URL with time-limited access
   */
  async generatePresignedDownloadUrl(key: string, expiresIn = 900): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  /**
   * Deletes an object from the S3 bucket
   */
  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.s3Client.send(command);
  }
}
