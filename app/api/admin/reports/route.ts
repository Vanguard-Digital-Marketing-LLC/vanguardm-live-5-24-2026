import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));

  const where: Record<string, unknown> = { client: { agencyId } };
  if (clientId) where.clientId = clientId;
  if (status && status !== "ALL") where.status = status;

  const [reports, totalCount] = await Promise.all([
    prisma.clientReport.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        client: { select: { id: true, name: true } },
        _count: { select: { sections: true } },
      },
    }),
    prisma.clientReport.count({ where }),
  ]);

  return NextResponse.json({ reports, totalCount, page, pageSize });
}

export async function DELETE(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports", "ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  const ids = body.ids as string[];
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids array is required" }, { status: 400 });
  }

  // Only delete reports belonging to this agency
  const result = await prisma.clientReport.deleteMany({
    where: { id: { in: ids }, client: { agencyId } },
  });

  return NextResponse.json({ deleted: result.count });
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  if (!body.clientId) return NextResponse.json({ error: "Client is required" }, { status: 400 });
  if (!body.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  if (!body.period) return NextResponse.json({ error: "Period is required" }, { status: 400 });
  if (!body.startDate || !body.endDate) return NextResponse.json({ error: "Date range is required" }, { status: 400 });

  // Verify client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id: body.clientId, agencyId } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const report = await prisma.clientReport.create({
    data: {
      clientId: body.clientId,
      title: body.title,
      period: body.period,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      summary: body.summary || null,
      status: "DRAFT",
    },
    include: {
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(report, { status: 201 });
}
