import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { rateLimitAsync } from "@/lib/rate-limit";
import { hashToken } from "@/lib/token-hash";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  const { allowed, resetIn } = await rateLimitAsync(`reset:${ip}`, 5, 60 * 60 * 1000);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } }
    );
  }

  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and password are required." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashToken(token),
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired reset link. Please request a new one." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  return NextResponse.json({ message: "Password has been reset. You can now sign in." });
}
