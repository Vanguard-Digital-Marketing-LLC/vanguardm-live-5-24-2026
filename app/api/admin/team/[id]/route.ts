import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot remove yourself" }, { status: 400 });
  }

  // Verify user belongs to this agency
  const target = await prisma.user.findFirst({ where: { id, agencyId } });
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.user.update({
    where: { id },
    data: { role: "USER", isAdmin: false },
  });

  return NextResponse.json({ success: true });
}
