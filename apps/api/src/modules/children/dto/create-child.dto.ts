import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  IsInt,
  IsNumber,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({ example: 'عمر' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'أحمد' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '2024-03-15' })
  @IsDateString()
  date_of_birth: string;

  @ApiPropertyOptional({ example: 'male', enum: ['male', 'female'] })
  @IsOptional()
  @IsIn(['male', 'female'])
  gender?: string;

  @ApiPropertyOptional({ example: 'A+' })
  @IsOptional()
  @IsString()
  blood_type?: string;

  @ApiPropertyOptional({ example: 'Trisomy 21' })
  @IsOptional()
  @IsString()
  karyotype_type?: string;

  @ApiPropertyOptional({ example: 38 })
  @IsOptional()
  @IsInt()
  gestational_age_weeks?: number;

  @ApiPropertyOptional({ example: 3.15 })
  @IsOptional()
  @IsNumber()
  birth_weight_kg?: number;

  @ApiPropertyOptional({ example: ['Congenital Heart Defect', 'Hypothyroidism'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  comorbidities?: string[];
}
