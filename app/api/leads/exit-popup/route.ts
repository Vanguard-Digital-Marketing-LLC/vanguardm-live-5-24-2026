import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { resolvePublicAgencyId } from "@/lib/resolve-agency-public";

/* ──────────────────────────────────────────────
   GET /api/leads/exit-popup
   Returns the active ExitPopupConfig (if any) for the visiting agency.
   Public endpoint, no auth required.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  try {
    const agencyId = await resolvePublicAgencyId(request);
    const config = await prisma.exitPopupConfig.findFirst({
      where: { isActive: true, agencyId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        headline: true,
        description: true,
        ctaText: true,
        ctaLink: true,
        showOnPaths: true,
      },
    });

    if (!config) {
      return NextResponse.json(null);
    }

    return NextResponse.json(config);
  } catch (err) {
    console.error("Exit popup config fetch error:", err);
    return NextResponse.json(null);
  }
}
