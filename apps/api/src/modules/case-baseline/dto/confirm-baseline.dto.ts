import { IsEnum, IsOptional, IsString, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaselineStatus } from '@prisma/client';

export class ConfirmBaselineDto {
  @ApiProperty({
    enum: BaselineStatus,
    example: BaselineStatus.confirmed_by_doctor,
  })
  @IsEnum(BaselineStatus)
  status: BaselineStatus;

  @ApiPropertyOptional({
    example: 'Reviewed historical thyroid panels and echo. Plan approved. Focus on neck stability exercises.',
  })
  @IsOptional()
  @IsString()
  doctor_notes?: string;

  @ApiPropertyOptional({
    example: { add_conditions: [], remove_conditions: [] },
  })
  @IsOptional()
  @IsObject()
  adjustments?: {
    add_conditions?: string[];
    remove_conditions?: string[];
  };
}
