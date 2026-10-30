import { IsNotEmpty, IsString, IsUUID, IsIn, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCaseUpdateDto {
  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @IsUUID()
  @IsNotEmpty()
  child_id: string;

  @ApiProperty({
    example: 'skill_change',
    enum: ['skill_change', 'medical_incident', 'medication_change', 'general_observation'],
  })
  @IsString()
  @IsIn(['skill_change', 'medical_incident', 'medication_change', 'general_observation'])
  update_type: string;

  @ApiProperty({ example: 'بدأ يكرر كلمة (ماما) بوضوح بعد جلسة التخاطب اليوم' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: { source: 'speech_clinic' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
