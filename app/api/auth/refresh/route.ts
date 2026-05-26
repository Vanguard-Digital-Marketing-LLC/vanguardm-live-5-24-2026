import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signAccessToken, type AccessTokenPayload } from "@/lib/jwt";
import { rateLimitAsync } from "@/lib/rate-limit";
import { generateRefreshToken, hashToken } from "@/lib/token-hash";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 refresh attempts per IP per 15 minutes
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("cf-connecting-ip")
      || "unknown";
    const { allowed, resetIn } = await rateLimitAsync(`refresh:${ip}`, 10, 15 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } }
      );
    }

    const body = await request.json();
    const refreshToken = typeof body.refreshToken === "string" ? body.refreshToken.slice(0, 256) : "";

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required." },
        { status: 400 }
      );
    }

    // Hash the incoming token to look up in DB
    const incomingHash = hashToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash: incomingHash },
      include: { user: true },
    });

    if (!storedToken) {
      return NextResponse.json(
        { error: "Invalid refresh token." },
        { status: 401 }
      );
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      return NextResponse.json(
        { error: "Refresh token expired." },
        { status: 401 }
      );
    }

    const user = storedToken.user;

    // Look up agencySlug to mirror the login route's payload. Without these
    // tenant claims, a refresh would silently strip the agencyId/agencySlug
    // that the original `/api/auth/login` token carried — anything that
    // trusts the bearer for admin work would then bypass tenant isolation
    // after the first refresh cycle.
    const agency = user.agencyId
      ? await prisma.agency.findUnique({
          where: { id: user.agencyId },
          select: { slug: true },
        })
      : null;

    // Rotate: delete old, create new (atomic transaction)
    const rawNewToken = generateRefreshToken();
    const newTokenHash = hashToken(rawNewToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.$transaction([
      prisma.refreshToken.delete({ where: { id: storedToken.id } }),
      prisma.refreshToken.create({
        data: { tokenHash: newTokenHash, userId: user.id, expiresAt },
      }),
    ]);

    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
      agencyId: user.agencyId,
      agencySlug: agency?.slug ?? null,
    };
    const accessToken = await signAccessToken(payload);

    return NextResponse.json({
      accessToken,
      refreshToken: rawNewToken,
      expiresIn: 900,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
