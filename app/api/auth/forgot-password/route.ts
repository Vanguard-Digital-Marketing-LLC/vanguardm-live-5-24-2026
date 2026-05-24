import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { rateLimitAsync } from "@/lib/rate-limit";
import { getBaseUrl } from "@/lib/site-config";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  const { allowed, resetIn } = await rateLimitAsync(`forgot:${ip}`, 3, 60 * 60 * 1000);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } }
    );
  }

  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  // Always return success to prevent email enumeration
  const successMsg = { message: "If an account exists with that email, a reset link has been sent." };

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user || !user.password) {
    return NextResponse.json(successMsg);
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  const resetUrl = `${getBaseUrl(request)}/auth/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Password Reset — Vanguard Digital Marketing",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px;">
        <h2 style="color: #0891b2;">Reset Your Password</h2>
        <p>We received a request to reset your password. Click the link below to set a new one:</p>
        <p><a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #0891b2; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a></p>
        <p style="color: #64748b; font-size: 14px;">This link expires in 1 hour.</p>
        <p style="color: #64748b; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">Vanguard Digital Marketing</p>
      </div>
    `,
  }).catch(() => {});

  return NextResponse.json(successMsg);
}
