import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscriptionTier } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createCheckout(userId: string, tier: 'premium_monthly' | 'premium_annual') {
    const amountEgp = tier === 'premium_monthly' ? 250 : 2400; // in EGP
    const fakeOrderId = `pm_ord_${Date.now()}`;

    this.logger.log(`Initiating Paymob payment for user ${userId}, tier ${tier}, amount ${amountEgp} EGP`);

    // In production: make HTTP call to Paymob /api/auth/tokens & /api/ecommerce/orders
    const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/12345?payment_token=mock_token_${fakeOrderId}`;

    return {
      order_id: fakeOrderId,
      payment_url: paymentUrl,
      amount: amountEgp,
      currency: 'EGP',
      tier,
    };
  }

  async handlePaymobWebhook(payload: any) {
    this.logger.log(`Received Paymob Webhook: ${JSON.stringify(payload)}`);

    const orderId = payload?.obj?.order?.id || payload?.order_id;
    const success = payload?.obj?.success ?? true;
    const email = payload?.obj?.order?.shipping_data?.email;

    if (success && email) {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        const periodStart = new Date();
        const periodEnd = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 days

        await this.prisma.subscription.upsert({
          where: { userId: user.id },
          update: {
            tier: SubscriptionTier.premium_monthly,
            status: 'active',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
            paymobOrderId: String(orderId),
          },
          create: {
            userId: user.id,
            tier: SubscriptionTier.premium_monthly,
            status: 'active',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
            paymobOrderId: String(orderId),
          },
        });
      }
    }

    return { received: true };
  }

  async getUserSubscription(userId: string) {
    return this.prisma.subscription.findUnique({
      where: { userId },
    });
  }
}
