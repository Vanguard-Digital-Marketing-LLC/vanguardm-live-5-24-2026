import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";

/* ──────────────────────────────────────────────
   GET /api/admin/leads
   Returns Lead records with scoring data.
   Supports filter by status, sort by score.
   ────────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "200");
  const statusFilter = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  const where: Record<string, unknown> = { agencyId };
  if (statusFilter) where.status = statusFilter;

  // Build orderBy
  const orderBy: Record<string, string> = {};
  if (sortBy === "score") {
    orderBy.score = sortOrder;
  } else {
    orderBy.createdAt = sortOrder;
  }

  const [data, totalCount] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
}

/* ──────────────────────────────────────────────
   POST /api/admin/leads
   Manually create a lead. Body: { name, email,
   phone?, company?, source?, status?, notes? }
   ────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminFeature("leads");
  if (errorResponse) return errorResponse;

  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || typeof body.email !== "string") {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 },
    );
  }

  const name = body.name.trim();
  const email = body.email.trim().toLowerCase();
  if (!name || !email) {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const allowedStatuses = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];
  const status = allowedStatuses.includes(body.status) ? body.status : "NEW";

  const lead = await prisma.lead.create({
    data: {
      agencyId,
      name,
      email,
      phone: body.phone?.toString().trim() || null,
      company: body.company?.toString().trim() || null,
      source: body.source?.toString().trim() || "manual",
      status,
      score: 0,
      activities: {
        create: {
          type: "lead_created",
          data: {
            createdBy: session.user.email,
            source: body.source || "manual",
          },
        },
      },
    },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
    },
  });

  if (typeof body.notes === "string" && body.notes.trim()) {
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: "note_added",
        data: {
          message: body.notes.trim(),
          author: session.user.email,
        },
      },
    });
  }

  return NextResponse.json(lead, { status: 201 });
}
