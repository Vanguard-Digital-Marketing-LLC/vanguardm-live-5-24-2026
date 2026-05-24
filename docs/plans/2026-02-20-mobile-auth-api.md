# Mobile Auth API Implementation Plan

**Goal:** Build standalone `/api/auth/login` and `/api/auth/refresh` endpoints for React Native mobile app consumption, with email-based role auto-assignment and production-grade security hardening.

**Architecture:** Custom JWT-based auth using `jose` (already a next-auth transitive dependency). Access tokens are short-lived (15min), refresh tokens are long-lived (30 days), hashed with SHA-256 before DB storage (never stored plaintext). Role resolution runs on both login and registration. Rate limiting via in-memory store protects all auth endpoints. Sensitive config (admin email, employee domain) lives in env outside web root.

**Tech Stack:** Next.js API routes, jose (JWT), bcryptjs, Prisma/PostgreSQL, crypto (Node built-in)

**Security Model:**
- Refresh tokens: SHA-256 hashed before DB storage (like password hashing but faster for token rotation)
- Rate limiting: 5 login attempts per IP per 15min window, 10 refresh per IP per 15min
- Account lockout: 10 failed attempts locks account for 15min
- Input bounds: email ≤ 254 chars, password ≤ 128 chars
- Role config: env vars outside web root (`/home/vanguardm/env/production.env`)
- No hardcoded secrets or admin identifiers in source code

---

### Task 1: Add RefreshToken Model + Failed Attempts Tracking to Schema

**Files:**
- Modify: `/home/vanguardm/public_html/prisma/schema.prisma`

**Step 1: Add RefreshToken model and User lockout fields**

Add to User model (after `updatedAt`):

```prisma
  failedLoginAttempts Int       @default(0)
  lockedUntil         DateTime?
```

Add to User model relations (after `conversations`):

```prisma
  refreshTokens   RefreshToken[]
```

Add after the `VerificationToken` model:

```prisma
model RefreshToken {
  id        String   @id @default(cuid())
  tokenHash String   @unique        // SHA-256 hash, never store plaintext
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([tokenHash])
  @@index([userId])
}
```

**Step 2: Run migration**

```bash
cd /home/vanguardm/public_html && npx prisma migrate dev --name add_refresh_token_and_lockout
```

**Step 3: Regenerate Prisma client**

```bash
npx prisma generate
```

---

### Task 2: Add Auth Environment Variables

**Files:**
- Modify: `/home/vanguardm/env/production.env`

**Step 1: Add role resolution config (outside web root)**

```env
# Auth role resolution — keeps admin identity out of source code
AUTH_ADMIN_EMAIL=james@vanguardm.com
AUTH_EMPLOYEE_DOMAIN=mentservices.com
```

These live at `/home/vanguardm/env/production.env` (chmod 600, outside web root).

---

### Task 3: Create Rate Limiter Utility

**Files:**
- Create: `/home/vanguardm/public_html/lib/rate-limit.ts`

**Step 1: Create in-memory rate limiter**

```typescript
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * In-memory rate limiter. Returns { allowed, remaining, resetIn }.
 * @param key - Unique identifier (e.g. "login:192.168.1.1")
 * @param limit - Max requests per window
 * @param windowMs - Window size in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowMs };
  }

  entry.count++;
  const remaining = Math.max(0, limit - entry.count);
  const resetIn = entry.resetAt - now;

  return { allowed: entry.count <= limit, remaining, resetIn };
}
```

---

### Task 4: Create Role Resolution Utility

**Files:**
- Create: `/home/vanguardm/public_html/lib/roles.ts`

**Step 1: Create the role resolver (reads from env, not hardcoded)**

```typescript
import type { Role } from "@/lib/generated/prisma/client";

/**
 * Resolves user role from email address.
 * Config lives in env vars (outside web root), not source code.
 */
export function resolveRoleFromEmail(email: string): { role: Role; isAdmin: boolean } {
  const normalized = email.toLowerCase().trim();
  const adminEmail = (process.env.AUTH_ADMIN_EMAIL || "").toLowerCase().trim();
  const employeeDomain = (process.env.AUTH_EMPLOYEE_DOMAIN || "").toLowerCase().trim();

  if (adminEmail && normalized === adminEmail) {
    return { role: "ADMIN", isAdmin: true };
  }

  if (employeeDomain && normalized.endsWith(`@${employeeDomain}`)) {
    return { role: "TEAM", isAdmin: false };
  }

  return { role: "USER", isAdmin: false };
}
```

---

### Task 5: Create JWT Utility Library

**Files:**
- Create: `/home/vanguardm/public_html/lib/jwt.ts`

**Step 1: Create the JWT utility**

```typescript
import { SignJWT, jwtVerify } from "jose";

const getSecret = () => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is not configured");
  return new TextEncoder().encode(secret);
};

export interface AccessTokenPayload {
  sub: string;       // user id
  email: string;
  name: string | null;
  role: "ADMIN" | "TEAM" | "USER";
  isAdmin: boolean;
}

export async function signAccessToken(payload: AccessTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .setIssuer("vanguardm.com")
    .setAudience("mobile")
    .sign(getSecret());
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(), {
    issuer: "vanguardm.com",
    audience: "mobile",
  });
  return payload as unknown as AccessTokenPayload;
}
```

---

### Task 6: Create Token Hashing Utility

**Files:**
- Create: `/home/vanguardm/public_html/lib/token-hash.ts`

**Step 1: Create SHA-256 token hasher**

```typescript
import { createHash, randomBytes, timingSafeEqual } from "crypto";

/** Generate a cryptographically random refresh token (returned to client) */
export function generateRefreshToken(): string {
  return randomBytes(64).toString("hex");
}

/** SHA-256 hash a token for DB storage (never store plaintext) */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Timing-safe comparison of two token hashes */
export function compareTokenHash(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
```

---

### Task 7: Create Login Endpoint (hardened)

**Files:**
- Create: `/home/vanguardm/public_html/app/api/auth/login/route.ts`

**Step 1: Create the login route with rate limiting, lockout, and hashed refresh tokens**

```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signAccessToken } from "@/lib/jwt";
import { resolveRoleFromEmail } from "@/lib/roles";
import { rateLimit } from "@/lib/rate-limit";
import { generateRefreshToken, hashToken } from "@/lib/token-hash";

const LOCKOUT_THRESHOLD = 10;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP: 5 attempts per 15 minutes
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("cf-connecting-ip")
      || "unknown";
    const { allowed, remaining, resetIn } = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);

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

    const user = await prisma.user.findUnique({ where: { email } });

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

    // Successful login — reset failed attempts
    const { role, isAdmin } = resolveRoleFromEmail(user.email);
    const updateData: Record<string, unknown> = { failedLoginAttempts: 0, lockedUntil: null };

    // Sync role if changed
    if (user.role !== role || user.isAdmin !== isAdmin) {
      updateData.role = role;
      updateData.isAdmin = isAdmin;
    }

    await prisma.user.update({ where: { id: user.id }, data: updateData });

    // Generate access token
    const accessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role,
      isAdmin,
    });

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
```

---

### Task 8: Create Refresh Endpoint (hardened)

**Files:**
- Create: `/home/vanguardm/public_html/app/api/auth/refresh/route.ts`

**Step 1: Create the refresh route with rate limiting and hashed token lookup**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signAccessToken } from "@/lib/jwt";
import { rateLimit } from "@/lib/rate-limit";
import { generateRefreshToken, hashToken } from "@/lib/token-hash";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 refresh attempts per IP per 15 minutes
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("cf-connecting-ip")
      || "unknown";
    const { allowed, resetIn } = rateLimit(`refresh:${ip}`, 10, 15 * 60 * 1000);

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

    const accessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
    });

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
```

---

### Task 9: Update Registration with Role Auto-Assignment

**Files:**
- Modify: `/home/vanguardm/public_html/app/api/auth/register/route.ts`

**Step 1: Add role resolution + rate limiting to registration**

Add imports at top:
```typescript
import { resolveRoleFromEmail } from "@/lib/roles";
import { rateLimit } from "@/lib/rate-limit";
```

Add rate limiting at start of POST handler (after parsing body):
```typescript
const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  || request.headers.get("cf-connecting-ip")
  || "unknown";
const { allowed, resetIn } = rateLimit(`register:${ip}`, 3, 60 * 60 * 1000); // 3 per hour

if (!allowed) {
  return NextResponse.json(
    { error: "Too many registration attempts. Try again later." },
    { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } }
  );
}
```

Replace the `prisma.user.create` call with:
```typescript
const { role, isAdmin } = resolveRoleFromEmail(email);

await prisma.user.create({
  data: { name, email, password: hashedPassword, role, isAdmin },
});
```

---

### Task 10: Update NextAuth Credentials Provider with Role Sync

**Files:**
- Modify: `/home/vanguardm/public_html/auth.ts`

**Step 1: Add role sync to the authorize callback**

Add import at top:
```typescript
import { resolveRoleFromEmail } from "@/lib/roles";
```

After `if (!isValid) return null;`, replace the return with role sync:
```typescript
// Sync role from email on every web login
const { role, isAdmin } = resolveRoleFromEmail(user.email);
if (user.role !== role || user.isAdmin !== isAdmin) {
  await prisma.user.update({
    where: { id: user.id },
    data: { role, isAdmin },
  });
}

return {
  id: user.id,
  name: user.name,
  email: user.email,
  image: user.image,
  isAdmin: isAdmin,
  role: role,
};
```

---

### Task 11: Build and Verify

**Step 1: Build the project**

```bash
cd /home/vanguardm/public_html && npx next build
```

**Step 2: Restart PM2**

```bash
pm2 restart vanguardm
```

**Step 3: Test login endpoint**

```bash
curl -X POST https://vanguardm.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"james@vanguardm.com","password":"<test>"}'
```

**Step 4: Test rate limiting**

Fire 6 rapid requests — 6th should return 429.

---

## Security Checklist

| Protection | Implementation | Location |
|-----------|---------------|----------|
| Refresh token hashing | SHA-256 before DB storage | `lib/token-hash.ts` |
| Rate limiting (login) | 5 attempts / 15min / IP | `lib/rate-limit.ts` |
| Rate limiting (refresh) | 10 attempts / 15min / IP | `lib/rate-limit.ts` |
| Rate limiting (register) | 3 attempts / 1hr / IP | `lib/rate-limit.ts` |
| Account lockout | 10 failed → 15min lock | `app/api/auth/login/route.ts` |
| Input bounds | email ≤254, password ≤128 | login + register routes |
| Timing-safe compare | `timingSafeEqual` for tokens | `lib/token-hash.ts` |
| Admin identity in env | `AUTH_ADMIN_EMAIL` env var | `production.env` (outside web root) |
| Employee domain in env | `AUTH_EMPLOYEE_DOMAIN` env var | `production.env` (outside web root) |
| No plaintext secrets in source | All config from env | `lib/roles.ts`, `lib/jwt.ts` |
| Generic error messages | Same error for wrong email/password | login route |
| Token rotation | Old refresh token deleted on use | refresh route |
| JWT expiry | 15min access, 30d refresh | `lib/jwt.ts`, login route |

## Role Resolution Rules

| Email | Role | isAdmin | Source |
|-------|------|---------|--------|
| `$AUTH_ADMIN_EMAIL` | ADMIN | true | env var |
| `*@$AUTH_EMPLOYEE_DOMAIN` | TEAM | false | env var |
| everyone else | USER | false | default |

---

## API Reference

### POST /api/auth/login
**Request:**
```json
{ "email": "user@example.com", "password": "password123" }
```
**Success (200):**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "a1b2c3...",
  "expiresIn": 900,
  "user": { "id": "...", "name": "...", "email": "...", "image": null, "role": "USER", "isAdmin": false }
}
```
**Error (401):** `{ "error": "Invalid email or password." }`
**Error (423):** `{ "error": "Account temporarily locked. Try again later." }`
**Error (429):** `{ "error": "Too many login attempts. Try again later." }`

### POST /api/auth/refresh
**Request:**
```json
{ "refreshToken": "a1b2c3..." }
```
**Success (200):**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "d4e5f6...",
  "expiresIn": 900
}
```
**Error (401):** `{ "error": "Invalid refresh token." }` or `{ "error": "Refresh token expired." }`
**Error (429):** `{ "error": "Too many requests. Try again later." }`
