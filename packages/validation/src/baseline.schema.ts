/**
 * @module baseline.schema
 * @description Zod validation schema for confirming or overriding a case baseline.
 */

import { z } from 'zod';

/**
 * Schema for confirming a case baseline.
 *
 * - `status` — must be "confirmed_by_doctor" or "manually_overridden".
 * - `doctor_notes` — optional free-text notes from the doctor.
 * - `adjustments` — optional additions / removals to the AI-generated conditions.
 */
export const confirmBaselineSchema = z.object({
  status: z.enum(['confirmed_by_doctor', 'manually_overridden'], {
    errorMap: () => ({
      message: 'Status must be "confirmed_by_doctor" or "manually_overridden"',
    }),
  }),

  doctor_notes: z.string().optional(),

  adjustments: z
    .object({
      add_conditions: z.array(z.string()).optional(),
      remove_conditions: z.array(z.string()).optional(),
    })
    .optional(),
});

export type ConfirmBaselineInput = z.infer<typeof confirmBaselineSchema>;
