/**
 * @module document.schema
 * @description Zod validation schema for requesting presigned upload URLs.
 */

import { z } from 'zod';

/** Valid values matching the DocumentCategory enum. */
const documentCategoryValues = [
  'Lab',
  'Echo',
  'Genetics',
  'Therapy_Report',
  'Prescription',
] as const;

/**
 * Schema for requesting a presigned URL to upload a document.
 *
 * - `file_name` — original file name, max 255 characters.
 * - `file_type` — MIME type (e.g. "application/pdf").
 * - `document_category` — one of the DocumentCategory enum values.
 */
export const presignedUrlSchema = z.object({
  file_name: z
    .string()
    .min(1, 'File name is required')
    .max(255, 'File name must be at most 255 characters'),

  file_type: z.string().min(1, 'File type is required'),

  document_category: z.enum(documentCategoryValues, {
    errorMap: () => ({
      message: `Document category must be one of: ${documentCategoryValues.join(', ')}`,
    }),
  }),
});

export type PresignedUrlInput = z.infer<typeof presignedUrlSchema>;
