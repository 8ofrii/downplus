/**
 * @module enums
 * @description All application enums matching the PostgreSQL ENUM types from the database schema.
 * These enums are shared across backend, mobile, and web packages.
 */

/** Roles a user can hold in the system. */
export enum UserRole {
  PARENT = 'parent',
  DOCTOR = 'doctor',
  CLINIC_ADMIN = 'clinic_admin',
  SUPER_ADMIN = 'super_admin',
}

/** Processing status of an uploaded document. */
export enum DocumentStatus {
  UPLOADED = 'uploaded',
  PROCESSING_OCR = 'processing_ocr',
  OCR_COMPLETED = 'ocr_completed',
  FAILED = 'failed',
}

/** Status of a child's case baseline. */
export enum BaselineStatus {
  DRAFT_PENDING_DOCTOR = 'draft_pending_doctor',
  CONFIRMED_BY_DOCTOR = 'confirmed_by_doctor',
  MANUALLY_OVERRIDDEN = 'manually_overridden',
}

/** Mastery level for a developmental skill / milestone. */
export enum SkillStatus {
  NOT_STARTED = 'not_started',
  WITH_ASSISTANCE = 'with_assistance',
  INDEPENDENT = 'independent',
  MASTERED_OUTSIDE = 'mastered_outside',
}

/** Available subscription tiers. */
export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM_MONTHLY = 'premium_monthly',
  PREMIUM_ANNUAL = 'premium_annual',
}

/** Current state of a user's subscription. */
export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAST_DUE = 'past_due',
  EXPIRED = 'expired',
}

/** Biological gender. */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

/** Categories for uploaded medical documents. */
export enum DocumentCategory {
  LAB = 'Lab',
  ECHO = 'Echo',
  GENETICS = 'Genetics',
  THERAPY_REPORT = 'Therapy_Report',
  PRESCRIPTION = 'Prescription',
}

/** Types of updates that can be logged against a child's case. */
export enum CaseUpdateType {
  SKILL_CHANGE = 'skill_change',
  MEDICAL_INCIDENT = 'medical_incident',
  MEDICATION_CHANGE = 'medication_change',
  GENERAL_OBSERVATION = 'general_observation',
}

/** Who sent a message in the AI chat. */
export enum ChatSenderType {
  USER = 'user',
  ASSISTANT = 'assistant',
}

/** Developmental / health-check milestone domains. */
export enum MilestoneDomain {
  MOTOR = 'motor',
  SPEECH_LANGUAGE = 'speech_language',
  COGNITIVE = 'cognitive',
  SOCIAL_EMOTIONAL = 'social_emotional',
  HEALTH_CHECK = 'health_check',
}
