import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";

export const POST = withRateLimit("admin", async (req: NextRequest) => {
  const { session, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Both current and new password are required" },
      { status: 400 },
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });

  if (!user?.password) {
    return NextResponse.json(
      { error: "Account does not have a password set" },
      { status: 400 },
    );
  }

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 403 },
    );
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return NextResponse.json({ success: true });
});
