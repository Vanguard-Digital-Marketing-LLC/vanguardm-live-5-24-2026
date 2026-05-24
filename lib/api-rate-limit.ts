import { NextRequest, NextResponse } from "next/server";
import { rateLimitAsync } from "./rate-limit";

// ── Rate Limit Tiers ──────────────────────────

export const RATE_LIMITS = {
  /** Auth endpoints — very strict: 5 requests per 15 minutes */
  auth: { limit: 5, windowMs: 15 * 60 * 1000, prefix: "auth" },
  /** Public forms — moderate: 10 requests per minute */
  public: { limit: 10, windowMs: 60 * 1000, prefix: "public" },
  /** Admin API — generous: 100 requests per minute */
  admin: { limit: 100, windowMs: 60 * 1000, prefix: "admin" },
  /** Portal API — moderate: 60 requests per minute */
  portal: { limit: 60, windowMs: 60 * 1000, prefix: "portal" },
  /** Onboarding — moderate: 30 requests per minute */
  onboarding: { limit: 30, windowMs: 60 * 1000, prefix: "onboarding" },
  /** Webhooks — moderate: 20 requests per minute */
  webhook: { limit: 20, windowMs: 60 * 1000, prefix: "webhook" },
} as const;

type RateLimitTier = keyof typeof RATE_LIMITS;

/**
 * Extract client IP from request headers.
 * Cloudflare → X-Forwarded-For → fallback "unknown".
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/**
 * Check rate limit for a request. Returns a 429 NextResponse if blocked,
 * or null if the request should proceed.
 *
 * Usage:
 *   const blocked = await checkRateLimit(request, "public");
 *   if (blocked) return blocked;
 */
export async function checkRateLimit(
  request: NextRequest,
  tier: RateLimitTier
): Promise<NextResponse | null> {
  const config = RATE_LIMITS[tier];
  const ip = getClientIP(request);
  const key = `${config.prefix}:${ip}`;
  const { allowed, remaining, resetIn } = await rateLimitAsync(key, config.limit, config.windowMs);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(resetIn / 1000)),
          "X-RateLimit-Limit": String(config.limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // Optionally add remaining count header to successful responses
  // (caller can add these to their response if desired)
  void remaining;
  return null;
}
