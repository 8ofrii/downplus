import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FEATURE_GATE_KEY } from '../decorators/feature-gate.decorator';
import { PrismaService } from '../../prisma/prisma.service';

export const FEATURE_TIER_MAP: Record<string, string[]> = {
  onboarding: ['free', 'premium_monthly', 'premium_annual'],
  milestones_basic: ['free', 'premium_monthly', 'premium_annual'],
  milestones_full: ['premium_monthly', 'premium_annual'],
  documents_limited: ['free', 'premium_monthly', 'premium_annual'],
  documents_unlimited: ['premium_monthly', 'premium_annual'],
  ai_case_baseline: ['premium_monthly', 'premium_annual'],
  ai_chat_limited: ['free', 'premium_monthly', 'premium_annual'],
  ai_chat_unlimited: ['premium_monthly', 'premium_annual'],
  doctor_match_top1: ['free', 'premium_monthly', 'premium_annual'],
  doctor_match_full: ['premium_monthly', 'premium_annual'],
  life_passport_export: ['premium_monthly', 'premium_annual'],
  share_links_unlimited: ['premium_monthly', 'premium_annual'],
};

@Injectable()
export class FeatureGateGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.getAllAndOverride<string>(FEATURE_GATE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredFeature) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    const userTier = subscription?.tier || 'free';
    const allowedTiers = FEATURE_TIER_MAP[requiredFeature] || ['premium_monthly', 'premium_annual'];

    if (!allowedTiers.includes(userTier)) {
      throw new HttpException(
        {
          success: false,
          error: {
            code: 'FEATURE_GATED',
            message: `Feature '${requiredFeature}' requires a Pro subscription. Current tier: ${userTier}`,
            required_tiers: allowedTiers,
          },
        },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    return true;
  }
}
