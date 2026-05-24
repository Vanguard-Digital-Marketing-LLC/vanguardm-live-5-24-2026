import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { getLeadTemperature } from "@/lib/lead-scoring";

/* ──────────────────────────────────────────────
   GET /api/admin/leads/pipeline
   Returns leads grouped by status for the kanban
   pipeline view, with scoring info.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  try {
    const leads = await prisma.lead.findMany({
      where: { agencyId },
      orderBy: [{ score: "desc" }, { createdAt: "desc" }],
      include: {
        activities: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
        chatSessions: {
          select: { id: true, sessionId: true, createdAt: true },
          take: 3,
        },
      },
    });

    // Group by status and add temperature
    const pipeline: Record<string, any[]> = {
      NEW: [],
      CONTACTED: [],
      QUALIFIED: [],
      PROPOSAL: [],
      WON: [],
      LOST: [],
    };

    for (const lead of leads) {
      const temperature = getLeadTemperature(lead.score);
      const enriched = {
        ...lead,
        temperature,
        createdAt: lead.createdAt.toISOString(),
        updatedAt: lead.updatedAt.toISOString(),
        activities: lead.activities.map((a) => ({
          ...a,
          createdAt: a.createdAt.toISOString(),
        })),
        chatSessions: lead.chatSessions.map((cs) => ({
          ...cs,
          createdAt: cs.createdAt.toISOString(),
        })),
      };

      const status = lead.status as string;
      if (pipeline[status]) {
        pipeline[status].push(enriched);
      } else {
        pipeline.NEW.push(enriched);
      }
    }

    // Compute summary stats
    const stats = {
      total: leads.length,
      newCount: pipeline.NEW.length,
      contactedCount: pipeline.CONTACTED.length,
      qualifiedCount: pipeline.QUALIFIED.length,
      proposalCount: pipeline.PROPOSAL.length,
      wonCount: pipeline.WON.length,
      lostCount: pipeline.LOST.length,
      hotLeads: leads.filter((l) => l.score >= 26).length,
    };

    return NextResponse.json({ pipeline, stats });
  } catch (err) {
    console.error("[admin/leads/pipeline] Error:", err);
    return NextResponse.json(
      { error: "Failed to load pipeline" },
      { status: 500 },
    );
  }
}

/* ──────────────────────────────────────────────
   PATCH /api/admin/leads/pipeline
   Update a lead's status (drag between columns)
   or other fields.
   ────────────────────────────────────────────── */

export async function PATCH(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { id, status, assignedToId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 },
      );
    }

    // Verify ownership before updating
    const existing = await prisma.lead.findFirst({ where: { id, agencyId } });
    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (assignedToId !== undefined)
      updateData.assignedToId = assignedToId || null;

    const updated = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    // Log status change as activity
    if (status) {
      await prisma.leadActivity.create({
        data: {
          leadId: id,
          type: "status_changed",
          data: {
            newStatus: status,
            changedBy: session.user?.email,
          },
        },
      });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/leads/pipeline] PATCH error:", err);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 },
    );
  }
}
