/**
 * @module sharing.schema
 * @description Zod validation schema for generating secure share tokens.
 */

import { z } from 'zod';

/**
 * Schema for generating a share token.
 *
 * - `child_id` — UUID of the child whose data will be shared.
 * - `validity_hours` — how long the token stays valid (1–168 hours / 1 week).
 * - `can_view_full_history` — grants read access to the full medical history.
 * - `can_add_clinical_notes` — grants write access to add clinical notes.
 */
export const generateShareTokenSchema = z.object({
  child_id: z
    .string()
    .uuid('Child ID must be a valid UUID'),

  validity_hours: z
    .number()
    .int('Validity hours must be a whole number')
    .min(1, 'Validity must be at least 1 hour')
    .max(168, 'Validity must be at most 168 hours (1 week)'),

  can_view_full_history: z.boolean(),

  can_add_clinical_notes: z.boolean(),
});

export type GenerateShareTokenInput = z.infer<typeof generateShareTokenSchema>;
