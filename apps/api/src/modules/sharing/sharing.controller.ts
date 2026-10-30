import { Controller, Post, Get, Body, Query, Param, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { SharingService } from './sharing.service';
import { GenerateShareTokenDto } from './dto/generate-token.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@ApiTags('Sharing & Guest Portal')
@Controller()
export class SharingController {
  constructor(
    private sharingService: SharingService,
    private pdfGenerator: PdfGeneratorService,
  ) {}

  @Post('sharing/generate-token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate time-limited secure share token and QR code for external doctor' })
  async generateToken(
    @CurrentUser('id') userId: string,
    @Body() dto: GenerateShareTokenDto,
  ) {
    return this.sharingService.generateShareToken(userId, dto);
  }

  @Get('guest/view')
  @ApiOperation({ summary: 'Access read-only clinical passport using guest token (no login required)' })
  @ApiQuery({ name: 'token', required: true })
  async getGuestView(@Query('token') token: string) {
    return this.sharingService.getGuestView(token);
  }

  @Get('children/:child_id/life-passport/print')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate printable HTML/PDF view for Down Plus Life Passport' })
  async getLifePassport(
    @Param('child_id') childId: string,
    @Res() res: Response,
  ) {
    const html = await this.pdfGenerator.generateLifePassportHtml(childId);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  }
}
