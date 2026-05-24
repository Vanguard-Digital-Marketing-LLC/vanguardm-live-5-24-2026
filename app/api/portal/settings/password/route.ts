import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";
import { changePasswordSchema, parseBody } from "@/lib/validations/portal";

export const POST = withRateLimit("portal", async (req: NextRequest) => {
  const { session, errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const body = await req.json();
  const parsed = parseBody(changePasswordSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", fields: parsed.errors }, { status: 400 });
  }
  const { currentPassword, newPassword } = parsed.data;

  // Fetch user with current password hash
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, password: true },
  });

  if (!user || !user.password) {
    return NextResponse.json(
      { error: "Unable to verify identity. Account may use social login." },
      { status: 400 },
    );
  }

  // Verify current password
  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 403 },
    );
  }

  // Hash and save new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ success: true });
});
