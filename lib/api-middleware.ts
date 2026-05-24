import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { rateLimitAsync } from "@/lib/rate-limit";
import { enforcePlanFeature } from "@/lib/plan-limits";
import type { Session } from "next-auth";

// ---------------------------------------------------------------------------
// Rate-limit tier definitions
// ---------------------------------------------------------------------------

const RATE_LIMIT_TIERS = {
  auth: { limit: 5, windowMs: 15 * 60 * 1000 },   // 5 req / 15 min
  public: { limit: 10, windowMs: 60 * 1000 },      // 10 req / 1 min
  admin: { limit: 100, windowMs: 60 * 1000 },      // 100 req / 1 min
  portal: { limit: 60, windowMs: 60 * 1000 },      // 60 req / 1 min
} as const;

export type RateLimitTier = keyof typeof RATE_LIMIT_TIERS;

// ---------------------------------------------------------------------------
// IP extraction helper
// ---------------------------------------------------------------------------

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ---------------------------------------------------------------------------
// withRateLimit — higher-order function for API route handlers
// ---------------------------------------------------------------------------

type RouteContext = { params: Promise<Record<string, string>> };

type RouteHandler = (
  req: NextRequest,
  context: RouteContext,
) => Promise<NextResponse> | NextResponse;

/**
 * Wraps a Next.js App Router handler with IP-based rate limiting.
 *
 * @example
 * ```ts
 * import { withRateLimit } from "@/lib/api-middleware";
 *
 * export const POST = withRateLimit("auth", async (req: NextRequest) => {
 *   // handler logic
 *   return NextResponse.json({ ok: true });
 * });
 * ```
 */
export function withRateLimit(tier: RateLimitTier, handler: RouteHandler): RouteHandler {
  const { limit, windowMs } = RATE_LIMIT_TIERS[tier];

  return async (req: NextRequest, context: RouteContext) => {
    const ip = getClientIp(req);
    const key = `${tier}:${ip}`;
    const { allowed, remaining, resetIn } = await rateLimitAsync(key, limit, windowMs);

    const resetAtEpoch = Math.ceil((Date.now() + resetIn) / 1000);

    // Rate-limit headers applied to every response
    const rateLimitHeaders: Record<string, string> = {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(resetAtEpoch),
    };

    if (!allowed) {
      const retryAfter = Math.ceil(resetIn / 1000);
      return NextResponse.json(
        { error: "Too many requests", retryAfter },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            "Retry-After": String(retryAfter),
          },
        },
      );
    }

    // Call the wrapped handler and attach rate-limit headers to its response
    const response = await handler(req, context);

    for (const [header, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(header, value);
    }

    return response;
  };
}

// ---------------------------------------------------------------------------
// requireAuth — session + optional role check helper
// ---------------------------------------------------------------------------

type Role = "ADMIN" | "TEAM";

interface AuthSuccess {
  session: Session;
  errorResponse?: undefined;
}

interface AuthFailure {
  session?: undefined;
  errorResponse: NextResponse;
}

/**
 * Gets the current session and optionally enforces role membership.
 *
 * @param requiredRoles - If provided, the user must have one of these roles.
 * @returns `{ session }` on success, or `{ errorResponse }` to return early.
 */
export async function requireAuth(
  ...requiredRoles: Role[]
): Promise<AuthSuccess | AuthFailure> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  if (requiredRoles.length > 0) {
    const userRole = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
    if (!requiredRoles.includes(userRole as Role)) {
      return {
        errorResponse: NextResponse.json(
          { error: "Forbidden" },
          { status: 403 },
        ),
      };
    }
  }

  return { session };
}

// ---------------------------------------------------------------------------
// requireAdminAuth — session + role + agencyId scoping for admin routes
// ---------------------------------------------------------------------------

interface AdminAuthSuccess {
  session: Session;
  agencyId: string;
  errorResponse?: undefined;
}

interface AdminAuthFailure {
  session?: undefined;
  agencyId?: undefined;
  errorResponse: NextResponse;
}

/**
 * Gets the current session, enforces admin/team role, and extracts agencyId.
 * Use this in all tenant-scoped admin API routes.
 *
 * @param requiredRoles - Defaults to ["ADMIN", "TEAM"] if not specified.
 * @returns `{ session, agencyId }` on success, or `{ errorResponse }` to return early.
 *
 * @example
 * ```ts
 * const { session, agencyId, errorResponse } = await requireAdminAuth();
 * if (errorResponse) return errorResponse;
 * // agencyId is guaranteed non-null here
 * ```
 */
export async function requireAdminAuth(
  ...requiredRoles: Role[]
): Promise<AdminAuthSuccess | AdminAuthFailure> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  const roles = requiredRoles.length > 0 ? requiredRoles : (["ADMIN", "TEAM"] as Role[]);
  const userRole = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (!roles.includes(userRole as Role)) {
    return {
      errorResponse: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 },
      ),
    };
  }

  let agencyId = session.user.agencyId;

  // When on a subdomain, always scope to that subdomain's agency.
  // The middleware already enforces agency isolation (blocks mismatched users),
  // so by this point the user is authorized for this subdomain.
  const headersList = await headers();
  const subdomainSlug = headersList.get("x-agency-slug");

  if (subdomainSlug) {
    const agency = await prisma.agency.findUnique({
      where: { slug: subdomainSlug },
      select: { id: true },
    });
    if (agency) agencyId = agency.id;
  }

  if (!agencyId) {
    return {
      errorResponse: NextResponse.json(
        { error: "No agency context" },
        { status: 403 },
      ),
    };
  }

  return { session, agencyId };
}

// ---------------------------------------------------------------------------
// requireAdminFeature — admin auth + plan-feature gate in one call
// ---------------------------------------------------------------------------

/**
 * Same as requireAdminAuth, but additionally enforces that the agency's
 * current plan tier includes the named feature. Returns 402 on plan miss.
 *
 * @example
 * ```ts
 * const auth = await requireAdminFeature("reports", "ADMIN");
 * if (auth.errorResponse) return auth.errorResponse;
 * const { agencyId } = auth;
 * ```
 */
export async function requireAdminFeature(
  feature: string,
  ...requiredRoles: Role[]
): Promise<AdminAuthSuccess | AdminAuthFailure> {
  const auth = await requireAdminAuth(...requiredRoles);
  if (auth.errorResponse) return auth;

  const blocked = await enforcePlanFeature(auth.agencyId, feature);
  if (blocked) return { errorResponse: blocked };

  return auth;
}
