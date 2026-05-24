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

  const report = await prisma.clientReport.findFirst({
    where: { id, client: { agencyId } },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      sections: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(report);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.clientReport.findFirst({ where: { id, client: { agencyId } } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.summary !== undefined) data.summary = body.summary;
  if (body.period !== undefined) data.period = body.period;
  if (body.startDate !== undefined) data.startDate = new Date(body.startDate);
  if (body.endDate !== undefined) data.endDate = new Date(body.endDate);

  const report = await prisma.clientReport.update({
    where: { id },
    data,
    include: {
      client: { select: { id: true, name: true } },
      sections: { orderBy: { sortOrder: "asc" } },
    },
  });

  return NextResponse.json(report);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports", "ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const existing = await prisma.clientReport.findFirst({ where: { id, client: { agencyId } } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.clientReport.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
