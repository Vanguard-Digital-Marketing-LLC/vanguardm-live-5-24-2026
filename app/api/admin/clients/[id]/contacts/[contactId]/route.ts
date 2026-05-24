import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { updateContactSchema } from "@/lib/validations/client";

type Params = { params: Promise<{ id: string; contactId: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id, contactId } = await params;
  const body = await request.json();

  const parsed = updateContactSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Verify contact belongs to this client
  const existing = await prisma.clientContact.findFirst({
    where: { id: contactId, clientId: id },
  });
  if (!existing) return NextResponse.json({ error: "Contact not found" }, { status: 404 });

  const data: Record<string, unknown> = {};
  const d = parsed.data;
  if (d.name !== undefined) data.name = d.name;
  if (d.email !== undefined) data.email = d.email;
  if (d.phone !== undefined) data.phone = d.phone || null;
  if (d.role !== undefined) data.role = d.role;
  if (d.isPrimary !== undefined) {
    data.isPrimary = d.isPrimary;
    // If setting as primary, unset other primary contacts
    if (d.isPrimary) {
      await prisma.clientContact.updateMany({
        where: { clientId: id, id: { not: contactId } },
        data: { isPrimary: false },
      });
    }
  }

  const contact = await prisma.clientContact.update({
    where: { id: contactId },
    data,
  });

  return NextResponse.json(contact);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id, contactId } = await params;

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const existing = await prisma.clientContact.findFirst({
    where: { id: contactId, clientId: id },
  });
  if (!existing) return NextResponse.json({ error: "Contact not found" }, { status: 404 });

  await prisma.clientContact.delete({ where: { id: contactId } });
  return NextResponse.json({ success: true });
}
