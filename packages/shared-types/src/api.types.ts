/**
 * @module api.types
 * @description Request / Response DTOs shared between the API server and all clients.
 * Every endpoint's payload shape is defined here so backend and frontends stay in sync.
 */

import {
  BaselineStatus,
  CaseUpdateType,
  DocumentCategory,
  DocumentStatus,
  Gender,
  MilestoneDomain,
  SkillStatus,
  SubscriptionStatus,
  SubscriptionTier,
  UserRole,
} from './enums';

import type {
  AiGeneratedSummary,
  Comorbidity,
  DoctorMatchScore,
  Medication,
} from './clinical.types';

// ═══════════════════════════════════════════════════════════════════════════
// Generic Wrappers
// ═══════════════════════════════════════════════════════════════════════════

/** Pagination metadata returned alongside list responses. */
export interface PaginationMeta {
  /** Current page number (1-based). */
  page: number;
  /** Items per page. */
  per_page: number;
  /** Total number of items across all pages. */
  total: number;
}

/**
 * Standard success envelope for all API responses.
 * @template T — the shape of the `data` payload.
 */
export interface ApiResponse<T> {
  /** Indicates the request succeeded. */
  success: true;
  /** The response payload. */
  data: T;
  /** Optional pagination metadata for list endpoints. */
  meta?: PaginationMeta;
}

/** Standard error envelope returned on failure. */
export interface ApiError {
  /** Indicates the request failed. */
  success: false;
  /** Machine-readable error code (e.g. "VALIDATION_ERROR"). */
  code: string;
  /** Human-readable error message. */
  message: string;
  /** Optional field-level or contextual details. */
  details?: Record<string, unknown>;
}

// ═══════════════════════════════════════════════════════════════════════════
// Auth
// ═══════════════════════════════════════════════════════════════════════════

/** POST /auth/register */
export interface RegisterRequest {
  email: string;
  phone_number: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: UserRole;
}

/** POST /auth/login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** POST /auth/otp/verify */
export interface OtpVerifyRequest {
  phone_number: string;
  otp_code: string;
}

/** Token payload returned after successful authentication. */
export interface TokenResponse {
  /** JWT access token. */
  accessToken: string;
  /** JWT refresh token. */
  refreshToken: string;
  /** Seconds until the access token expires. */
  expiresIn: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Child
// ═══════════════════════════════════════════════════════════════════════════

/** POST /children */
export interface CreateChildRequest {
  first_name: string;
  last_name: string;
  /** ISO 8601 date string (YYYY-MM-DD). */
  date_of_birth: string;
  gender: Gender;
  /** ABO + Rh blood type. */
  blood_type?: string;
  /** Karyotype classification. */
  karyotype_type?: string;
  /** List of comorbidity identifiers. */
  comorbidities?: Comorbidity[];
}

/** PATCH /children/:id */
export interface UpdateChildRequest extends Partial<CreateChildRequest> {}

/** GET /children/:id — response payload. */
export interface ChildResponse {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: Gender;
  blood_type?: string;
  karyotype_type?: string;
  comorbidities?: Comorbidity[];
  created_at: string;
  updated_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Documents
// ═══════════════════════════════════════════════════════════════════════════

/** POST /documents/presigned-url */
export interface PresignedUrlRequest {
  /** Original file name including extension. */
  file_name: string;
  /** MIME type of the file. */
  file_type: string;
  /** Category for organising the document. */
  document_category: DocumentCategory;
}

/** Response after generating a presigned upload URL. */
export interface PresignedUrlResponse {
  /** UUID of the newly created document record. */
  document_id: string;
  /** Presigned URL to which the client should PUT the file. */
  upload_url: string;
  /** Any additional upload instructions (headers, expiry, etc.). */
  instructions: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Case Baseline
// ═══════════════════════════════════════════════════════════════════════════

/** GET /children/:childId/baseline — response payload. */
export interface CaseBaselineResponse {
  id: string;
  child_id: string;
  status: BaselineStatus;
  /** AI-produced summary of the child's medical & developmental profile. */
  ai_generated_summary: AiGeneratedSummary;
  /** Doctor's notes (populated after confirmation). */
  doctor_notes?: string;
  created_at: string;
  updated_at: string;
}

/** POST /children/:childId/baseline/confirm */
export interface ConfirmBaselineRequest {
  /** Target status — can only move to confirmed or manually overridden. */
  status: BaselineStatus.CONFIRMED_BY_DOCTOR | BaselineStatus.MANUALLY_OVERRIDDEN;
  /** Optional doctor notes. */
  doctor_notes?: string;
  /** Optional adjustments to the AI-generated data. */
  adjustments?: {
    add_conditions?: string[];
    remove_conditions?: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Milestones
// ═══════════════════════════════════════════════════════════════════════════

/** GET /children/:childId/milestones/:id — response payload. */
export interface MilestoneResponse {
  id: string;
  child_id: string;
  domain: MilestoneDomain;
  title: string;
  description?: string;
  expected_age_months: number;
  status: SkillStatus;
  notes?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

/** PATCH /children/:childId/milestones/:id */
export interface UpdateMilestoneRequest {
  status: SkillStatus;
  notes?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI Chat
// ═══════════════════════════════════════════════════════════════════════════

/** POST /chat */
export interface ChatRequest {
  /** Existing session ID; omit to create a new session. */
  session_id?: string;
  /** Child context for the chat. */
  child_id: string;
  /** User's message. */
  message: string;
}

/** Recommended doctor returned alongside a chat response. */
export interface RecommendedDoctor {
  doctor_id: string;
  name: string;
  specialty: string;
  city: string;
  match_score: DoctorMatchScore;
}

/** Response from the AI chat endpoint. */
export interface ChatResponse {
  /** The assistant's reply. */
  response_text: string;
  /** Doctors recommended based on the conversation context. */
  recommended_doctors: RecommendedDoctor[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Sharing
// ═══════════════════════════════════════════════════════════════════════════

/** POST /sharing/generate-token */
export interface GenerateShareTokenRequest {
  child_id: string;
  /** Number of hours the token remains valid (1 – 168). */
  validity_hours: number;
  /** Whether the recipient can see the full medical history. */
  can_view_full_history: boolean;
  /** Whether the recipient can add clinical notes. */
  can_add_clinical_notes: boolean;
}

/** Response after generating a share token. */
export interface ShareTokenResponse {
  /** Full URL the parent can share. */
  share_url: string;
  /** SVG markup for the QR code. */
  qr_code_svg: string;
  /** ISO 8601 expiry timestamp. */
  expires_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Subscriptions
// ═══════════════════════════════════════════════════════════════════════════

/** POST /subscriptions/checkout */
export interface CheckoutRequest {
  /** The tier the user wants to subscribe to. */
  tier: SubscriptionTier.PREMIUM_MONTHLY | SubscriptionTier.PREMIUM_ANNUAL;
}

/** GET /subscriptions/current — response payload. */
export interface SubscriptionResponse {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Doctor Profile
// ═══════════════════════════════════════════════════════════════════════════

/** GET /doctors/:id — response payload. */
export interface DoctorProfileResponse {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  specialty: string;
  medical_license_number: string;
  city: string;
  clinic_name?: string;
  years_of_experience?: number;
  bio?: string;
  profile_photo_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Case Updates
// ═══════════════════════════════════════════════════════════════════════════

/** POST /children/:childId/case-updates */
export interface CreateCaseUpdateRequest {
  child_id: string;
  update_type: CaseUpdateType;
  /** Free-text content of the update. */
  content: string;
  /** Arbitrary structured metadata. */
  metadata?: Record<string, unknown>;
}

/** GET /children/:childId/case-updates/:id — response payload. */
export interface CaseUpdateResponse {
  id: string;
  child_id: string;
  author_id: string;
  update_type: CaseUpdateType;
  content: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
