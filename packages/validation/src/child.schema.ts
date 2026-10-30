/**
 * @module child.schema
 * @description Zod validation schemas for child CRUD endpoints.
 */

import { z } from 'zod';

/** Valid ABO + Rh blood types. */
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

/**
 * Schema for creating a child record.
 *
 * - `date_of_birth` — ISO 8601 date string that must be in the past.
 * - `gender` — "male" or "female".
 * - `blood_type` — optional, one of the standard ABO+Rh types.
 */
export const createChildSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be at most 100 characters'),

  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be at most 100 characters'),

  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in ISO 8601 format (YYYY-MM-DD)')
    .refine(
      (val) => {
        const parsed = new Date(val);
        return !isNaN(parsed.getTime()) && parsed < new Date();
      },
      { message: 'Date of birth must be a valid date in the past' },
    ),

  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender must be "male" or "female"' }),
  }),

  blood_type: z
    .enum(bloodTypes, {
      errorMap: () => ({ message: `Blood type must be one of: ${bloodTypes.join(', ')}` }),
    })
    .optional(),

  karyotype_type: z.string().optional(),

  comorbidities: z.array(z.string()).optional(),
});

export type CreateChildInput = z.infer<typeof createChildSchema>;

/**
 * Schema for updating a child record.
 * All fields are optional (partial update).
 */
export const updateChildSchema = createChildSchema.partial();

export type UpdateChildInput = z.infer<typeof updateChildSchema>;
