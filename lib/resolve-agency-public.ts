import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

const FALLBACK_AGENCY_ID = "vanguard-seed";

/**
 * Resolve the effective agencyId for a PUBLIC (unauthenticated) request.
 *
 * Reads the `x-agency-slug` header injected by middleware.ts from the
 * request's Host header — middleware unconditionally overwrites any
 * inbound x-agency-slug, so this value is trustworthy.
 *
 * Falls back to the seed agency id when no subdomain context is present
 * (e.g., root-domain visits like vanguardm.com/contact) or when the slug
 * doesn't resolve to any agency.
 */
export async function resolvePublicAgencyId(
  request: NextRequest,
): Promise<string> {
  const slug = request.headers.get("x-agency-slug");

  if (slug) {
    const agency = await prisma.agency.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (agency) return agency.id;
  }

  return FALLBACK_AGENCY_ID;
}
