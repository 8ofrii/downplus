import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PresignedUrlDto {
  @ApiProperty({ example: 'thyroid_echo_report.pdf' })
  @IsString()
  @IsNotEmpty()
  file_name: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  @IsNotEmpty()
  file_type: string;

  @ApiProperty({
    example: 'Lab',
    enum: ['Lab', 'Echo', 'Genetics', 'Therapy_Report', 'Prescription'],
  })
  @IsString()
  @IsIn(['Lab', 'Echo', 'Genetics', 'Therapy_Report', 'Prescription'])
  document_category: string;
}
