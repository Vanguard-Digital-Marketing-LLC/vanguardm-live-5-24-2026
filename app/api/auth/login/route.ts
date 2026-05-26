/**
 * POST /api/auth/login — API-surface credential login (mobile / external callers).
 *
 * NOTE: this is NOT the browser sign-in path. The vanguardm.com web app authenticates
 * via NextAuth at `/api/auth/callback/credentials` (see `auth.ts`). This route exists
 * to issue a bearer + refresh token for non-browser clients (mobile, scripts, etc.).
 *
 * Tenant claims in the issued JWT mirror the NextAuth session token (`agencyId`,
 * `agencySlug`, `role`). Without these, anything that trusts this bearer for admin
 * work (e.g. server middleware that branches on `agencySlug === "vanguard"` for
 * super-admin checks) would silently bypass tenant isolation: the token would
 * authenticate the user but carry no tenant scope, so the per-request tenant guard
 * would either treat the user as cross-tenant or fall through to a permissive
 * default. Keep these claims in sync with `auth.ts`'s `jwt` callback.
 */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signAccessToken, type AccessTokenPayload } from "@/lib/jwt";
import { rateLimitAsync } from "@/lib/rate-limit";
import { generateRefreshToken, hashToken } from "@/lib/token-hash";

const LOCKOUT_THRESHOLD = 10;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP: 5 attempts per 15 minutes
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("cf-connecting-ip")
      || "unknown";
    const { allowed, remaining, resetIn } = await rateLimitAsync(`login:${ip}`, 5, 15 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.slice(0, 254).toLowerCase().trim() : "";
    const password = typeof body.password === "string" ? body.password.slice(0, 128) : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { agency: { select: { slug: true } } },
    });

    // Generic error for invalid email (don't reveal if account exists)
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401, headers: { "X-RateLimit-Remaining": String(remaining) } }
      );
    }

    // Check account lockout
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const retryAfter = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000);
      return NextResponse.json(
        { error: "Account temporarily locked. Try again later." },
        { status: 423, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      // Increment failed attempts, lock if threshold reached
      const attempts = user.failedLoginAttempts + 1;
      const lockData = attempts >= LOCKOUT_THRESHOLD
        ? { failedLoginAttempts: attempts, lockedUntil: new Date(Date.now() + LOCKOUT_DURATION_MS) }
        : { failedLoginAttempts: attempts };

      await prisma.user.update({ where: { id: user.id }, data: lockData });

      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401, headers: { "X-RateLimit-Remaining": String(remaining) } }
      );
    }

    // Successful login — reset failed attempts. Role comes from the stored
    // user record (set at invite acceptance), never derived from email.
    const role = user.role;
    const isAdmin = user.isAdmin;
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });

    // Generate access token. Tenant claims (agencyId, agencySlug) mirror the
    // NextAuth jwt callback in auth.ts so downstream verifiers can enforce
    // per-tenant authorization against this bearer the same way they do for
    // browser sessions.
    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role,
      isAdmin,
      agencyId: user.agencyId,
      agencySlug: user.agency?.slug ?? null,
    };
    const accessToken = await signAccessToken(payload);

    // Generate and hash refresh token
    const rawRefreshToken = generateRefreshToken();
    const tokenHash = hashToken(rawRefreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await prisma.refreshToken.create({
      data: { tokenHash, userId: user.id, expiresAt },
    });

    return NextResponse.json({
      accessToken,
      refreshToken: rawRefreshToken,  // plaintext to client only, DB stores hash
      expiresIn: 900,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role,
        isAdmin,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
