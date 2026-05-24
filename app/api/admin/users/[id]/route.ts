import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();

  // Verify user belongs to this agency
  const target = await prisma.user.findFirst({ where: { id, agencyId } });
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Only allow updating role
  if (body.role && ["ADMIN", "TEAM", "USER"].includes(body.role)) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        role: body.role,
        isAdmin: body.role === "ADMIN",
      },
    });
    return NextResponse.json(user);
  }

  return NextResponse.json({ error: "Invalid update" }, { status: 400 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Prevent self-deletion
  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  // Verify user belongs to this agency
  const target = await prisma.user.findFirst({ where: { id, agencyId } });
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
