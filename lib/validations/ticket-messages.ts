import { z } from "zod";

export const createMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message is required")
    .max(10000, "Message must be 10000 characters or less"),
  isInternal: z.boolean().optional().default(false),
});

export const contactWebhookSchema = z.object({
  domain: z.string().min(1, "Domain is required").max(253, "Domain too long"),
  name: z.string().min(1, "Name is required").max(200, "Name too long"),
  email: z.string().email("Valid email required").max(320, "Email too long"),
  phone: z.string().max(50, "Phone too long").optional(),
  message: z.string().min(1, "Message is required").max(4000, "Message must be 4000 characters or less"),
  service: z.string().max(200, "Service too long").optional(),
});
