import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Subscriptions & Paymob')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Initiate a Paymob payment checkout for Pro plan' })
  async checkout(
    @CurrentUser('id') userId: string,
    @Body('tier') tier: 'premium_monthly' | 'premium_annual',
  ) {
    return this.subscriptionsService.createCheckout(userId, tier || 'premium_monthly');
  }

  @Post('webhook/paymob')
  @ApiOperation({ summary: 'Paymob webhook endpoint to handle transaction callbacks' })
  async paymobWebhook(@Body() payload: any) {
    return this.subscriptionsService.handlePaymobWebhook(payload);
  }

  @Get('my-plan')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user active subscription and limits' })
  async getMyPlan(@CurrentUser('id') userId: string) {
    return this.subscriptionsService.getUserSubscription(userId);
  }
}
