import { z } from "zod";

// ── Keyword Seed Database ────────────────────────

const KEYWORD_INTENTS = ["INFORMATIONAL", "COMMERCIAL", "TRANSACTIONAL", "NAVIGATIONAL"] as const;
const KEYWORD_SOURCES = ["MANUAL", "GOOGLE_ADS", "AUTOCOMPLETE", "CSV_IMPORT", "AHREFS_IMPORT"] as const;

export const createKeywordSchema = z.object({
  term: z.string().min(1, "Keyword term is required").max(500),
  volume: z.number().int().min(0).nullable().optional(),
  difficulty: z.number().int().min(0).max(100).nullable().optional(),
  cps: z.number().min(0).max(10).nullable().optional(),
  trafficPotential: z.number().int().min(0).nullable().optional(),
  globalVolume: z.number().int().min(0).nullable().optional(),
  parentTopic: z.string().max(500).nullable().optional(),
  serpFeatures: z.array(z.string().max(100)).max(20).optional().default([]),
  intent: z.enum(KEYWORD_INTENTS).nullable().optional(),
  source: z.enum(KEYWORD_SOURCES).optional().default("MANUAL"),
  tags: z.array(z.string().max(100)).max(50).optional().default([]),
  notes: z.string().max(5000).nullable().optional(),
});

export const updateKeywordSchema = createKeywordSchema.partial();

export const bulkCreateKeywordsSchema = z.object({
  keywords: z.array(createKeywordSchema).min(1).max(2000),
});

// ── Keyword Lists (Collections) ──────────────────

export const createKeywordListSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  clientId: z.string().nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export const updateKeywordListSchema = createKeywordListSchema.partial();

// ── SERP Tracking ────────────────────────────────

export const createSerpSnapshotSchema = z.object({
  name: z.string().max(200).nullable().optional(),
  source: z.string().max(50).optional().default("manual"),
});

export const importSerpResultSchema = z.object({
  keywordTerm: z.string().min(1).max(500),
  position: z.number().int().min(1).max(100),
  url: z.string().min(1).max(2000),
  title: z.string().min(1).max(1000),
  description: z.string().max(5000).nullable().optional(),
});

export const bulkImportSerpSchema = z.object({
  snapshotName: z.string().max(200).optional(),
  results: z.array(importSerpResultSchema).min(1).max(10000),
});

export const fetchSerpSchema = z.object({
  // Capped to bound paid-SERP-API cost per request (was 500).
  keywords: z.array(z.string().min(1).max(500)).min(1).max(100),
  gl: z.string().max(5).optional().default("us"),
  hl: z.string().max(5).optional().default("en"),
  num: z.number().int().min(10).max(100).optional().default(100),
  snapshotName: z.string().max(200).optional(),
});

// ── Domain Lookup ────────────────────────────────

export const domainLookupSchema = z.object({
  domain: z.string().min(1, "Domain is required").max(253),
  snapshotId: z.string().optional(), // Limit to a specific snapshot
});

// ── Content Explorer ─────────────────────────────

export const createContentProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  clientId: z.string().nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export const updateContentProjectSchema = createContentProjectSchema.partial();

export const createContentEntrySchema = z.object({
  url: z.string().min(1, "URL is required").max(2000),
  title: z.string().min(1, "Title is required").max(500),
  organicTraffic: z.number().int().min(0).nullable().optional(),
  trafficValue: z.number().min(0).nullable().optional(),
  referringDomains: z.number().int().min(0).nullable().optional(),
  domainRating: z.number().int().min(0).max(100).nullable().optional(),
  wordCount: z.number().int().min(0).nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  status: z.string().max(50).nullable().optional(),
  contentType: z.string().max(50).nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export const updateContentEntrySchema = createContentEntrySchema.partial();

// ── Social Media Manager ─────────────────────────

const SOCIAL_PLATFORMS = ["TWITTER", "LINKEDIN", "FACEBOOK", "INSTAGRAM"] as const;
const SOCIAL_STATUSES = ["DRAFT", "SCHEDULED", "PUBLISHED", "FAILED"] as const;

export const createSocialPostSchema = z.object({
  platform: z.enum(SOCIAL_PLATFORMS),
  content: z.string().min(1, "Content is required").max(10000),
  mediaUrls: z.array(z.string().max(2000)).max(10).optional().default([]),
  hashtags: z.array(z.string().max(100)).max(30).optional().default([]),
  scheduledAt: z.string().nullable().optional(),
  status: z.enum(SOCIAL_STATUSES).optional().default("DRAFT"),
  clientId: z.string().nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export const updateSocialPostSchema = createSocialPostSchema.partial().extend({
  metrics: z.record(z.string(), z.unknown()).nullable().optional(),
  publishedAt: z.string().nullable().optional(),
});
