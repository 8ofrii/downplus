/**
 * @module index
 * @description Barrel export for the @downplus/shared-types package.
 * Re-exports all enums, API DTOs, and clinical type definitions.
 */

// Enums
export {
  UserRole,
  DocumentStatus,
  BaselineStatus,
  SkillStatus,
  SubscriptionTier,
  SubscriptionStatus,
  Gender,
  DocumentCategory,
  CaseUpdateType,
  ChatSenderType,
  MilestoneDomain,
} from './enums';

// Clinical types
export type {
  Comorbidity,
  Medication,
  AiGeneratedSummary,
  AnonymizedContext,
  DoctorMatchScore,
} from './clinical.types';

// API types
export type {
  PaginationMeta,
  ApiResponse,
  ApiError,
  RegisterRequest,
  LoginRequest,
  OtpVerifyRequest,
  TokenResponse,
  CreateChildRequest,
  UpdateChildRequest,
  ChildResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
  CaseBaselineResponse,
  ConfirmBaselineRequest,
  MilestoneResponse,
  UpdateMilestoneRequest,
  ChatRequest,
  RecommendedDoctor,
  ChatResponse,
  GenerateShareTokenRequest,
  ShareTokenResponse,
  CheckoutRequest,
  SubscriptionResponse,
  DoctorProfileResponse,
  CreateCaseUpdateRequest,
  CaseUpdateResponse,
} from './api.types';
