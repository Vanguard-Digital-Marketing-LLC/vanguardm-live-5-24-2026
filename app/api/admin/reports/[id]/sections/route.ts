import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify report belongs to agency
  const report = await prisma.clientReport.findFirst({ where: { id, client: { agencyId } } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const sections = await prisma.reportSection.findMany({
    where: { reportId: id },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(sections);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  if (!body.type) return NextResponse.json({ error: "Section type is required" }, { status: 400 });
  if (!body.title) return NextResponse.json({ error: "Section title is required" }, { status: 400 });

  // Verify report belongs to agency
  const report = await prisma.clientReport.findFirst({ where: { id, client: { agencyId } } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  // Determine the next sort order
  const maxSort = await prisma.reportSection.findFirst({
    where: { reportId: id },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  const section = await prisma.reportSection.create({
    data: {
      reportId: id,
      type: body.type,
      title: body.title,
      data: body.data || {},
      notes: body.notes || null,
      sortOrder: (maxSort?.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(section, { status: 201 });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  // Params id = reportId (for consistency), but we update by sectionId
  const { id } = await params;
  const body = await request.json();

  if (!body.sectionId) return NextResponse.json({ error: "sectionId is required" }, { status: 400 });

  // Verify report belongs to agency
  const report = await prisma.clientReport.findFirst({ where: { id, client: { agencyId } } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.data !== undefined) data.data = body.data;
  if (body.notes !== undefined) data.notes = body.notes;
  if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;

  // Scope the mutation to this agency's report — a bare `id: sectionId` would
  // let an admin edit another tenant's section by passing a foreign sectionId.
  const updated = await prisma.reportSection.updateMany({
    where: { id: body.sectionId, reportId: id },
    data,
  });
  if (updated.count === 0) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  const section = await prisma.reportSection.findUnique({ where: { id: body.sectionId } });
  return NextResponse.json(section);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  if (!body.sectionId) return NextResponse.json({ error: "sectionId is required" }, { status: 400 });

  // Verify report belongs to agency
  const report = await prisma.clientReport.findFirst({ where: { id, client: { agencyId } } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  // Scope the delete to this agency's report (see PATCH note above).
  const deleted = await prisma.reportSection.deleteMany({
    where: { id: body.sectionId, reportId: id },
  });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
