/**
 * @module chat.schema
 * @description Zod validation schema for AI chat messages.
 */

import { z } from 'zod';

/**
 * Schema for sending a message in the AI chat.
 *
 * - `session_id` — optional UUID; omit to start a new session.
 * - `child_id` — UUID of the child the conversation is about.
 * - `message` — user's message, 1–2000 characters.
 */
export const chatMessageSchema = z.object({
  session_id: z
    .string()
    .uuid('Session ID must be a valid UUID')
    .optional(),

  child_id: z
    .string()
    .uuid('Child ID must be a valid UUID'),

  message: z
    .string()
    .min(1, 'Message must not be empty')
    .max(2000, 'Message must be at most 2000 characters'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
