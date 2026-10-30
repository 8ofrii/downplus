/**
 * @module case-update.schema
 * @description Zod validation schema for creating case updates.
 */

import { z } from 'zod';

/** Valid values matching the CaseUpdateType enum. */
const caseUpdateTypeValues = [
  'skill_change',
  'medical_incident',
  'medication_change',
  'general_observation',
] as const;

/**
 * Schema for creating a case update entry.
 *
 * - `child_id` — UUID of the child.
 * - `update_type` — one of the CaseUpdateType enum values.
 * - `content` — free-text content, 1–5000 characters.
 * - `metadata` — optional arbitrary structured data.
 */
export const createCaseUpdateSchema = z.object({
  child_id: z
    .string()
    .uuid('Child ID must be a valid UUID'),

  update_type: z.enum(caseUpdateTypeValues, {
    errorMap: () => ({
      message: `Update type must be one of: ${caseUpdateTypeValues.join(', ')}`,
    }),
  }),

  content: z
    .string()
    .min(1, 'Content must not be empty')
    .max(5000, 'Content must be at most 5000 characters'),

  metadata: z.record(z.unknown()).optional(),
});

export type CreateCaseUpdateInput = z.infer<typeof createCaseUpdateSchema>;
