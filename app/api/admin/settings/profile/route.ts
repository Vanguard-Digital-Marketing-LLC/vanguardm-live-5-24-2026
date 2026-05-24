import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";

export const PATCH = withRateLimit("admin", async (req: NextRequest) => {
  const { session, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { name } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (name.trim().length > 100) {
    return NextResponse.json({ error: "Name too long" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim() },
  });

  return NextResponse.json({ success: true });
});
