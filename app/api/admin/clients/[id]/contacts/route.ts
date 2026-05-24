import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { createContactSchema } from "@/lib/validations/client";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  const parsed = createContactSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const d = parsed.data;
  const contact = await prisma.clientContact.create({
    data: {
      clientId: id,
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      role: d.role,
      isPrimary: d.isPrimary,
    },
  });

  return NextResponse.json(contact, { status: 201 });
}
