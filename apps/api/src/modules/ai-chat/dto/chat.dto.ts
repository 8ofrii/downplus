import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiPropertyOptional({ example: 'f1e2d3c4-b5a6-4f7e-8d9c-0b1a2c3d4e5f' })
  @IsOptional()
  @IsUUID()
  session_id?: string;

  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @IsUUID()
  @IsNotEmpty()
  child_id: string;

  @ApiProperty({
    example:
      'عمر عنده الآن سنتين ونصف ولسه مش بيمشي لوحده وبيقع كتير، إيه الخطوة الصح ومين أحسن دكتور يفحصه في الجيزة؟',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
