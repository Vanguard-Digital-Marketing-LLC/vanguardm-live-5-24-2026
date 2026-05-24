import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { serviceTypeSchema } from "@/lib/validations/client";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  const parsed = serviceTypeSchema.safeParse(body.serviceType);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
  }

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const service = await prisma.clientService.create({
    data: {
      clientId: id,
      serviceType: parsed.data,
      monthlyBudget: body.monthlyBudget || null,
    },
  });

  return NextResponse.json(service, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("serviceType");

  const parsed = serviceTypeSchema.safeParse(serviceType);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
  }

  await prisma.clientService.delete({
    where: { clientId_serviceType: { clientId: id, serviceType: parsed.data } },
  });

  return NextResponse.json({ success: true });
}
