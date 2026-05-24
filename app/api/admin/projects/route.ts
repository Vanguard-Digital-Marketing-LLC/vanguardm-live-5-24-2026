import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("projects");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("serviceType");
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId");

  const where: Record<string, unknown> = { agencyId };
  if (serviceType && serviceType !== "ALL") where.serviceType = serviceType;
  if (status && status !== "ALL") where.status = status;
  if (clientId) where.clientId = clientId;

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      _count: { select: { tasks: true } },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("projects", "ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  if (!body.name || !body.clientId || !body.serviceType) {
    return NextResponse.json({ error: "name, clientId, and serviceType required" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      agencyId,
      clientId: body.clientId,
      name: body.name,
      serviceType: body.serviceType,
      description: body.description || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      budget: body.budget || null,
    },
    include: {
      client: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(project, { status: 201 });
}
