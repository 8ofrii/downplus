/**
 * @module index
 * @description Barrel export for the @downplus/validation package.
 * Re-exports all Zod schemas and their inferred TypeScript types.
 */

// Auth
export { registerSchema, loginSchema, otpVerifySchema } from './auth.schema';
export type { RegisterInput, LoginInput, OtpVerifyInput } from './auth.schema';

// Child
export { createChildSchema, updateChildSchema } from './child.schema';
export type { CreateChildInput, UpdateChildInput } from './child.schema';

// Milestone
export { updateMilestoneSchema } from './milestone.schema';
export type { UpdateMilestoneInput } from './milestone.schema';

// Document
export { presignedUrlSchema } from './document.schema';
export type { PresignedUrlInput } from './document.schema';

// Chat
export { chatMessageSchema } from './chat.schema';
export type { ChatMessageInput } from './chat.schema';

// Sharing
export { generateShareTokenSchema } from './sharing.schema';
export type { GenerateShareTokenInput } from './sharing.schema';

// Case Update
export { createCaseUpdateSchema } from './case-update.schema';
export type { CreateCaseUpdateInput } from './case-update.schema';

// Baseline
export { confirmBaselineSchema } from './baseline.schema';
export type { ConfirmBaselineInput } from './baseline.schema';

// Subscription
export { checkoutSchema } from './subscription.schema';
export type { CheckoutInput } from './subscription.schema';
