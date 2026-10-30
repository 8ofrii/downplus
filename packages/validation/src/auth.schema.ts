/**
 * @module auth.schema
 * @description Zod validation schemas for authentication endpoints.
 */

import { z } from 'zod';

/**
 * Schema for user registration.
 *
 * - `email` — must be a valid email address.
 * - `phone_number` — international format (e.g. "+1234567890").
 * - `password` — min 8 characters, must contain at least one letter and one number.
 */
export const registerSchema = z.object({
  email: z
    .string()
    .email('Must be a valid email address'),

  phone_number: z
    .string()
    .regex(
      /^\+[1-9]\d{6,14}$/,
      'Phone number must be in international format (e.g. +1234567890)',
    ),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one number'),

  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Schema for user login.
 */
export const loginSchema = z.object({
  email: z.string().email('Must be a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Schema for OTP verification.
 *
 * - `otp_code` — exactly 6 digits.
 */
export const otpVerifySchema = z.object({
  phone_number: z
    .string()
    .regex(
      /^\+[1-9]\d{6,14}$/,
      'Phone number must be in international format',
    ),

  otp_code: z
    .string()
    .regex(/^\d{6}$/, 'OTP code must be exactly 6 digits'),
});

export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
