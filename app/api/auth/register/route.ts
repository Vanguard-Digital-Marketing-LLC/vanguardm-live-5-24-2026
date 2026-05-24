import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimitAsync } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 3 registration attempts per IP per hour
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("cf-connecting-ip")
    || "unknown";
  const { allowed, resetIn } = await rateLimitAsync(`register:${ip}`, 3, 60 * 60 * 1000);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many registration attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } },
    );
  }

  const { name, email, password, turnstileToken, invite } = await request.json();

  // Verify Turnstile
  if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return NextResponse.json(
      { error: "Password must include uppercase, lowercase, and a number." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // SECURITY: roles are NEVER derived from the email address. A new account is a
  // plain USER unless it presents a valid, unexpired team invite that was issued
  // for this exact email — in which case it adopts the invite's role + agency.
  if (invite) {
    const result = await prisma.$transaction(async (tx) => {
      const teamInvite = await tx.teamInvite.findFirst({
        where: { token: invite, acceptedAt: null },
      });
      if (!teamInvite) {
        return { error: "Invalid or already-used invitation.", status: 400 } as const;
      }
      if (teamInvite.expiresAt < new Date()) {
        return { error: "This invitation has expired. Please request a new one.", status: 410 } as const;
      }
      if (teamInvite.email.toLowerCase().trim() !== email.toLowerCase().trim()) {
        return { error: "This invitation was issued for a different email address.", status: 403 } as const;
      }

      await tx.teamInvite.update({
        where: { id: teamInvite.id },
        data: { acceptedAt: new Date() },
      });

      await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: teamInvite.role,
          isAdmin: teamInvite.role === "ADMIN",
          agencyId: teamInvite.agencyId,
        },
      });

      return { ok: true } as const;
    });

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ success: true });
  }

  // No invite — always a regular USER with no agency and no admin rights.
  await prisma.user.create({
    data: { name, email, password: hashedPassword, role: "USER", isAdmin: false },
  });

  return NextResponse.json({ success: true });
}
