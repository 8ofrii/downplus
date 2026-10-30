import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ example: '+201012345678' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+201012345678' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  code: string;
}
