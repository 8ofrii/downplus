/**
 * @module milestone.schema
 * @description Zod validation schema for updating milestone / skill status.
 */

import { z } from 'zod';

/** Valid values matching the SkillStatus enum. */
const skillStatusValues = [
  'not_started',
  'with_assistance',
  'independent',
  'mastered_outside',
] as const;

/**
 * Schema for updating a milestone.
 *
 * - `status` — one of the SkillStatus enum values.
 * - `notes` — optional free-text, max 1000 characters.
 */
export const updateMilestoneSchema = z.object({
  status: z.enum(skillStatusValues, {
    errorMap: () => ({
      message: `Status must be one of: ${skillStatusValues.join(', ')}`,
    }),
  }),

  notes: z
    .string()
    .max(1000, 'Notes must be at most 1000 characters')
    .optional(),
});

export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;
