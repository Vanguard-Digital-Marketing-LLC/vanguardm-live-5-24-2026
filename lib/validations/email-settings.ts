import { z } from "zod";

/**
 * Hostname regex: allows domain names only (no IPs) to prevent SSRF.
 * Must be a valid domain like smtp.example.com — no bare IPs.
 */
const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

export const smtpSettingsSchema = z.object({
  smtpHost: z
    .string()
    .min(1, "SMTP host is required")
    .max(253, "Hostname too long")
    .regex(hostnameRegex, "Must be a valid hostname (no IP addresses)"),
  smtpPort: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().int().min(1).max(65535))
    .optional()
    .default(465),
  smtpUser: z
    .string()
    .min(1, "SMTP username is required")
    .max(320, "Username too long"),
  smtpPass: z
    .string()
    .min(1, "SMTP password is required")
    .max(500, "Password too long"),
  fromEmail: z
    .string()
    .max(500, "From email too long")
    .optional()
    .nullable(),
});

export type SmtpSettings = z.infer<typeof smtpSettingsSchema>;
