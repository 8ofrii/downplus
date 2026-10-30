import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateShareTokenDto {
  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @IsUUID()
  @IsNotEmpty()
  child_id: string;

  @ApiPropertyOptional({ example: 48, default: 48 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(168) // up to 7 days
  validity_hours?: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  can_view_full_history?: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  can_add_clinical_notes?: boolean;

  @ApiPropertyOptional({ example: 'uuid-of-specific-doctor' })
  @IsOptional()
  @IsUUID()
  target_doctor_id?: string;
}
