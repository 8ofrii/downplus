/**
 * @module subscription.schema
 * @description Zod validation schema for subscription checkout.
 */

import { z } from 'zod';

/**
 * Schema for initiating a subscription checkout.
 *
 * - `tier` — must be "premium_monthly" or "premium_annual" (free tier doesn't require checkout).
 */
export const checkoutSchema = z.object({
  tier: z.enum(['premium_monthly', 'premium_annual'], {
    errorMap: () => ({
      message: 'Tier must be "premium_monthly" or "premium_annual"',
    }),
  }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
