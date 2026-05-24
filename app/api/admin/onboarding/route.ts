import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId");
  const search = searchParams.get("search") || "";

  const where: Record<string, unknown> = { agencyId };
  if (status && status !== "ALL") where.status = status;
  if (clientId) where.clientId = clientId;
  if (search) {
    where.client = { agencyId, name: { contains: search, mode: "insensitive" } };
  }

  const onboardings = await prisma.clientOnboarding.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
      _count: { select: { responses: true, files: true } },
    },
  });

  return NextResponse.json(onboardings);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  if (!body.clientId) return NextResponse.json({ error: "clientId is required" }, { status: 400 });
  if (!body.serviceTypes?.length) return NextResponse.json({ error: "At least one service type is required" }, { status: 400 });

  // Verify client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id: body.clientId, agencyId } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  // Default 30-day token expiry
  const tokenExpiresAt = new Date();
  tokenExpiresAt.setDate(tokenExpiresAt.getDate() + 30);

  const onboarding = await prisma.clientOnboarding.create({
    data: {
      agencyId,
      clientId: body.clientId,
      serviceTypes: body.serviceTypes,
      createdById: session.user.id,
      tokenExpiresAt,
      respondentName: body.respondentName || null,
      respondentEmail: body.respondentEmail || null,
    },
    include: {
      client: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(onboarding, { status: 201 });
}
