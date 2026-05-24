import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { updateClientSchema } from "@/lib/validations/client";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const client = await prisma.client.findFirst({
    where: { id, agencyId },
    include: {
      contacts: { orderBy: { isPrimary: "desc" } },
      services: true,
      projects: { orderBy: { createdAt: "desc" }, include: { _count: { select: { tasks: true } } } },
      tasks: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          assignee: { select: { id: true, name: true, email: true } },
        },
      },
      clientNotes: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { user: { select: { id: true, name: true } } },
      },
      supportTickets: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { assignee: { select: { id: true, name: true, email: true } } },
      },
      _count: { select: { tasks: true, supportTickets: true, projects: true, clientNotes: true } },
    },
  });

  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(client);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  const parsed = updateClientSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Verify ownership before updating
  const existing = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: Record<string, unknown> = { ...parsed.data };
  // Handle date fields from raw body (not in updateClientSchema)
  if (body.contractStart !== undefined) data.contractStart = body.contractStart ? new Date(body.contractStart) : null;
  if (body.contractEnd !== undefined) data.contractEnd = body.contractEnd ? new Date(body.contractEnd) : null;

  const client = await prisma.client.update({ where: { id }, data });
  return NextResponse.json(client);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify ownership before archiving
  const existing = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Soft-delete: set status to CHURNED instead of hard delete
  await prisma.client.update({ where: { id }, data: { status: "CHURNED" } });
  return NextResponse.json({ success: true });
}
