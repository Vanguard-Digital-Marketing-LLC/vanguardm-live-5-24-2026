import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { withRateLimit } from "@/lib/api-middleware";

/** Generate a short-lived HMAC token so the client can sign in without Turnstile immediately after accepting an invite. Valid for ~60 seconds. */
function generateSigninBypass(email: string): string {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
  const window = Math.floor(Date.now() / 60_000); // 1-minute window
  return crypto.createHmac("sha256", secret).update(`${email}|${window}`).digest("hex");
}

export const POST = withRateLimit("auth", async (req: NextRequest) => {
  const { token, name, password } = await req.json();

  if (!token || !name || !password) {
    return NextResponse.json(
      { error: "Token, name, and password are required" },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }

  // Use a transaction to atomically consume the invite — prevents race conditions
  const result = await prisma.$transaction(async (tx) => {
    const invite = await tx.clientInvite.findFirst({
      where: { token, revokedAt: null, acceptedAt: null },
      include: { client: { select: { id: true, agencyId: true } } },
    });

    if (!invite) {
      return { error: "Invalid or expired invitation", status: 404 } as const;
    }

    if (invite.expiresAt < new Date()) {
      return { error: "This invitation has expired. Please request a new one.", status: 410 } as const;
    }

    // Soft-delete: set acceptedAt and null the token (PG allows multiple nulls in unique)
    await tx.clientInvite.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date(), token: null },
    });

    const agencyId = invite.client.agencyId;

    // Check if user already exists
    const existingUser = await tx.user.findUnique({
      where: { email: invite.email },
    });

    if (existingUser) {
      // Link to client + agency if not already set
      const updates: Record<string, unknown> = {};
      if (!existingUser.clientId) updates.clientId = invite.clientId;
      if (!existingUser.agencyId && agencyId) updates.agencyId = agencyId;
      if (existingUser.role !== "CLIENT") updates.role = "CLIENT";
      if (Object.keys(updates).length > 0) {
        await tx.user.update({ where: { id: existingUser.id }, data: updates });
      }
      return { email: existingUser.email };
    }

    // Create new user with CLIENT role, scoped to the client's agency
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await tx.user.create({
      data: {
        name,
        email: invite.email,
        password: hashedPassword,
        role: "CLIENT",
        clientId: invite.clientId,
        agencyId,
      },
    });

    return { email: user.email };
  });

  if ("status" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  // Return a short-lived bypass token so the client can auto-sign-in without Turnstile
  const bypassToken = generateSigninBypass(result.email);

  return NextResponse.json({ email: result.email, bypassToken });
});
