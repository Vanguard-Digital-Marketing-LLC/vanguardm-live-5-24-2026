import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z
    .string()
    .max(5000, "Description must be 5000 characters or less")
    .optional()
    .nullable(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
});

export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message is required")
    .max(10000, "Message must be 10000 characters or less"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

/** Parse body with zod and return field-level errors as 400 response, or parsed data */
export function parseBody<T>(schema: z.ZodSchema<T>, body: unknown):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> } {
  const result = schema.safeParse(body);
  if (result.success) return { success: true, data: result.data };

  const errors: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "_root";
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return { success: false, errors };
}
