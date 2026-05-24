import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { resolvePublicAgencyId } from "@/lib/resolve-agency-public";
import { addLeadActivity, SCORING_RULES } from "@/lib/lead-scoring";

/* ──────────────────────────────────────────────
   GET & POST /api/leads/track
   Records page view activity. If the sessionId
   matches a ChatSession with a linked Lead, we
   add a LeadActivity and update scoring signals.
   Public endpoint, no auth required.

   GET uses query params (Cloudflare-friendly).
   POST uses JSON body (kept for compatibility).
   ────────────────────────────────────────────── */

/** Pages that trigger specific scoring signals. */
const SCORING_PAGES: Record<string, string> = {
  "/services": "services_page_viewed",
  "/pricing": "pricing_page_viewed",
};

/** Shared tracking logic used by both GET and POST handlers. */
async function handleTrack(
  agencyId: string,
  data: {
    page?: string;
    sessionId?: string;
    pageCount?: number;
    returnVisit?: boolean;
  },
) {
  const { page, sessionId, pageCount, returnVisit } = data;

  if (!page || !sessionId) {
    return NextResponse.json({ ok: true });
  }

  // Look up ChatSession by sessionId to find a linked lead. The session id
  // is essentially a bearer token, so an attacker with a stolen one could
  // pollute another tenant's lead — gate by the lead's actual agency.
  const chatSession = await prisma.chatSession.findUnique({
    where: { sessionId },
    select: { leadId: true, lead: { select: { agencyId: true } } },
  });

  if (chatSession?.leadId && chatSession.lead?.agencyId === agencyId) {
    const leadId = chatSession.leadId;

    // Record page view activity
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: "page_view",
        data: { page, pageCount },
      },
    });

    // Check for scoring-relevant pages
    for (const [pathPrefix, signal] of Object.entries(SCORING_PAGES)) {
      if (page === pathPrefix || page.startsWith(pathPrefix + "/")) {
        await addLeadActivity(prisma, leadId, signal, { page });
      }
    }

    // Check for "viewed 3+ pages" signal
    if (pageCount && pageCount >= 3) {
      await addLeadActivity(prisma, leadId, "viewed_3_plus_pages", {
        pageCount,
      });
    }

    // Return visit signal
    if (returnVisit) {
      await addLeadActivity(prisma, leadId, "return_visit", { page });
    }

    // Blog post read signal (can stack)
    if (page.startsWith("/blog/") && page !== "/blog") {
      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
      });
      if (lead) {
        const breakdown =
          (lead.scoreBreakdown as Record<string, number>) || {};
        breakdown.blog_post_read =
          (breakdown.blog_post_read || 0) + SCORING_RULES.blog_post_read;
        const newScore = Object.values(breakdown).reduce(
          (a, b) => a + b,
          0,
        );
        await prisma.lead.update({
          where: { id: leadId },
          data: { score: newScore, scoreBreakdown: breakdown },
        });
        await prisma.leadActivity.create({
          data: {
            leadId,
            type: "blog_post_read",
            data: { page },
          },
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  try {
    const agencyId = await resolvePublicAgencyId(request);
    const params = request.nextUrl.searchParams;
    return handleTrack(agencyId, {
      page: params.get("p") || undefined,
      sessionId: params.get("sid") || undefined,
      pageCount: params.has("pc") ? Number(params.get("pc")) : undefined,
      returnVisit: params.get("rv") === "1",
    });
  } catch (err) {
    console.error("[leads/track] GET Error:", err);
    return NextResponse.json({ ok: true });
  }
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  try {
    const agencyId = await resolvePublicAgencyId(request);
    const body = await request.json();
    return handleTrack(agencyId, {
      page: body.page,
      sessionId: body.sessionId,
      pageCount: body.pageCount,
      returnVisit: body.returnVisit,
    });
  } catch (err) {
    console.error("[leads/track] POST Error:", err);
    return NextResponse.json({ ok: true });
  }
}
