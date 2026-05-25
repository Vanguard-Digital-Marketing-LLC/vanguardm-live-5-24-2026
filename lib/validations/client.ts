import { z } from "zod";
import { EMAIL_REGEX } from "./email";

const CLIENT_STATUSES = ["PROSPECT", "ACTIVE", "PAUSED", "CHURNED"] as const;
const BILLING_CYCLES = ["MONTHLY", "QUARTERLY", "ANNUAL"] as const;
export const SERVICE_TYPES = ["SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;

const emailRegex = EMAIL_REGEX;

export const createClientSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  domain: z.string().max(253).nullable().optional(),
  phone: z.string().max(50).nullable().optional(),
  email: z.string().max(320).regex(emailRegex, "Invalid email").nullable().optional().or(z.literal("")).or(z.null()),
  address: z.string().max(500).nullable().optional(),
  status: z.enum(CLIENT_STATUSES).optional().default("PROSPECT"),
  monthlyRetainer: z.number().int().min(0).max(100_000_000).nullable().optional(),
  dailyBudget: z.number().int().min(0).max(100_000_000).nullable().optional(),
  billingCycle: z.enum(BILLING_CYCLES).optional().default("MONTHLY"),
  contractStart: z.string().nullable().optional(),
  contractEnd: z.string().nullable().optional(),
  slaResponseHours: z.number().int().min(1).max(720).optional().default(24),
  nimbataProjectId: z.string().max(100).nullable().optional(),
  gtmContainerId: z.string().max(100).nullable().optional(),
  cloudflareZoneId: z.string().max(100).nullable().optional(),
  googleAdsCustomerId: z.string().max(100).nullable().optional()
    .transform((v) => {
      if (!v) return v;
      const stripped = v.replace(/-/g, "");
      if (!/^\d+$/.test(stripped)) return v; // let max() catch non-numeric
      return stripped;
    }),
  ga4PropertyId: z.string().max(200).nullable().optional()
    .transform((v) => {
      if (!v) return v;
      if (/^G-/.test(v)) throw new Error("GA4 Measurement ID (G-XXXXX) is not a Property ID. Use the numeric Property ID from GA4 Admin → Property Settings, e.g. properties/372395054");
      if (/^\d+$/.test(v)) return `properties/${v}`;
      if (!v.startsWith("properties/")) throw new Error(`Invalid GA4 Property ID format. Expected: properties/XXXXXXXX`);
      return v;
    }),
  searchConsoleUrl: z.string().max(500).nullable().optional()
    .refine((v) => !v || v.startsWith("sc-domain:") || v.startsWith("https://"), {
      message: "Search Console URL must start with sc-domain: or https://",
    }),
  notes: z.string().max(10000).nullable().optional(),
  contacts: z.array(z.object({
    name: z.string().min(1).max(200),
    email: z.string().max(320).regex(emailRegex, "Invalid contact email"),
    phone: z.string().max(50).nullable().optional(),
    role: z.string().max(50).optional().default("primary"),
    isPrimary: z.boolean().optional().default(false),
  })).optional().default([]),
  services: z.array(z.object({
    serviceType: z.enum(SERVICE_TYPES),
    monthlyBudget: z.number().nullable().optional(),
  })).optional().default([]),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  domain: z.string().max(253).nullable().optional(),
  phone: z.string().max(50).nullable().optional(),
  email: z.string().max(320).nullable().optional(),
  address: z.string().max(500).nullable().optional(),
  status: z.enum(CLIENT_STATUSES).optional(),
  monthlyRetainer: z.number().int().min(0).max(100_000_000).nullable().optional(),
  dailyBudget: z.number().int().min(0).max(100_000_000).nullable().optional(),
  billingCycle: z.enum(BILLING_CYCLES).optional(),
  contractStart: z.string().nullable().optional(),
  contractEnd: z.string().nullable().optional(),
  slaResponseHours: z.number().int().min(1).max(720).optional(),
  nimbataProjectId: z.string().max(100).nullable().optional(),
  gtmContainerId: z.string().max(100).nullable().optional(),
  cloudflareZoneId: z.string().max(100).nullable().optional(),
  googleAdsCustomerId: z.string().max(100).nullable().optional()
    .transform((v) => {
      if (!v) return v;
      const stripped = v.replace(/-/g, "");
      if (!/^\d+$/.test(stripped)) return v;
      return stripped;
    }),
  ga4PropertyId: z.string().max(200).nullable().optional()
    .transform((v) => {
      if (!v) return v;
      if (/^G-/.test(v)) throw new Error("GA4 Measurement ID (G-XXXXX) is not a Property ID. Use the numeric Property ID from GA4 Admin → Property Settings, e.g. properties/372395054");
      if (/^\d+$/.test(v)) return `properties/${v}`;
      if (!v.startsWith("properties/")) throw new Error(`Invalid GA4 Property ID format. Expected: properties/XXXXXXXX`);
      return v;
    }),
  searchConsoleUrl: z.string().max(500).nullable().optional()
    .refine((v) => !v || v.startsWith("sc-domain:") || v.startsWith("https://"), {
      message: "Search Console URL must start with sc-domain: or https://",
    }),
  notes: z.string().max(10000).nullable().optional(),
});

export const serviceTypeSchema = z.enum(SERVICE_TYPES);

export const createContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().min(1, "Email is required").max(320).regex(emailRegex, "Invalid email format"),
  phone: z.string().max(50).nullable().optional(),
  role: z.string().max(50).optional().default("primary"),
  isPrimary: z.boolean().optional().default(false),
});

export const updateContactSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  email: z.string().max(320).regex(emailRegex, "Invalid email format").optional(),
  phone: z.string().max(50).nullable().optional(),
  role: z.string().max(50).optional(),
  isPrimary: z.boolean().optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1, "Message is required").max(5000, "Message too long (max 5000 characters)"),
  isInternal: z.boolean().optional().default(false),
});
