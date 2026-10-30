import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SkillStatus } from '@prisma/client';

export class UpdateMilestoneDto {
  @ApiProperty({ enum: SkillStatus, example: SkillStatus.with_assistance })
  @IsEnum(SkillStatus)
  @IsNotEmpty()
  status: SkillStatus;

  @ApiPropertyOptional({ example: 'يقف بمفرده ممسكاً بالطاولة لمدة 20 ثانية' })
  @IsOptional()
  @IsString()
  notes?: string;
}
