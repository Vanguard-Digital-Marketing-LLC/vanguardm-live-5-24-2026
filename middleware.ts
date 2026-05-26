import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  // Sent app-wide so HSTS/Permissions-Policy hold even when the Next standalone
  // server is reached directly (not only behind the Apache .htaccess, which is
  // where the Content-Security-Policy is defined). Browsers ignore HSTS on HTTP.
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    // `interest-cohort=()` opts out of FLoC (Chrome, removed mid-2022 but
    // kept for legacy). `browsing-topics=()` opts out of the replacement
    // Topics API.
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()"
  );
  response.headers.delete("X-Powered-By");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Subdomain resolution ──────────────────────
  // X-Forwarded-Host is intentionally ignored: agency identity is derived from
  // the connection's own Host header. The Apache .htaccess (and any future
  // proxy) MUST preserve the original Host (`ProxyPreserveHost On`); if a
  // proxy rewrites Host, tenant resolution breaks before this line.
  const host = request.headers.get("host") || "";
  const hostNoPort = host.split(":")[0];
  // Case-insensitive match so `Acme.vanguardm.com` resolves to acme. The
  // matched group is then lowercased for canonical storage; see the 301 below
  // for the user-visible canonical URL.
  const match = hostNoPort.match(/^([a-z0-9-]+)\.vanguardm\.com$/i);
  const rawSlug = match?.[1] ?? null;
  const slugLower = rawSlug ? rawSlug.toLowerCase() : null;
  const agencySlug = (slugLower && slugLower !== "www") ? slugLower : null;

  // Canonicalize: if the raw host has uppercase characters in the subdomain,
  // 301-redirect GETs (and HEADs) to the all-lowercase canonical host. POST/
  // PUT/PATCH/DELETE and any /api/* request pass through untouched — redirects
  // would drop the request body and break webhooks.
  const isSafeMethod = request.method === "GET" || request.method === "HEAD";
  if (rawSlug && slugLower && rawSlug !== slugLower && isSafeMethod && !pathname.startsWith("/api/")) {
    const canonical = new URL(request.url);
    canonical.hostname = `${slugLower}.vanguardm.com`;
    return withSecurityHeaders(NextResponse.redirect(canonical, 301));
  }

  // Inject agency slug header for downstream use (API routes, server components).
  // Strip any client-supplied value first — without this, a request on apex/www
  // (where agencySlug is null) flows any spoofed x-agency-slug through to
  // requireAdminAuth, breaking tenant isolation.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-agency-slug");
  if (agencySlug) {
    requestHeaders.set("x-agency-slug", agencySlug);
  }

  // Security headers on all matched routes (public + protected)
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/client-onboarding");

  if (!isProtected) {
    return withSecurityHeaders(
      NextResponse.next({ request: { headers: requestHeaders } })
    );
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: true,
    cookieName: "__Secure-next-auth.session-token",
  });

  // All protected routes require authentication
  if (!token) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return withSecurityHeaders(NextResponse.redirect(signInUrl));
  }

  // ── Agency isolation: verify JWT agencySlug matches subdomain ──
  // Platform super admins (vanguard agency + isAdmin) can access any subdomain.
  // Strict equality: agencySlug MUST be "vanguard". The legacy permissive branch
  // that admitted isAdmin users with a null agencySlug has been removed — any
  // historic isAdmin user without an agencyId must be backfilled to the
  // vanguard agency (see prisma/migrations/20260526070000_backfill_super_admin_slug).
  const isPlatformSuperAdmin =
    token.isAdmin === true && token.agencySlug === "vanguard";

  if (
    agencySlug &&
    token.agencySlug &&
    token.agencySlug !== agencySlug &&
    !isPlatformSuperAdmin
  ) {
    return withSecurityHeaders(
      NextResponse.json({ error: "Agency mismatch" }, { status: 403 })
    );
  }

  const role = token.role as string | undefined;
  const isAdmin = token.isAdmin as boolean | undefined;

  // Block CLIENT users from admin routes — redirect to portal
  if (pathname.startsWith("/admin") && role === "CLIENT") {
    return withSecurityHeaders(NextResponse.redirect(new URL("/portal", request.url)));
  }

  // Admin routes require ADMIN or TEAM role
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN" && !isAdmin && role !== "TEAM") {
      return withSecurityHeaders(NextResponse.redirect(new URL("/dashboard", request.url)));
    }

    // TEAM users can only access overview, tasks, and tickets
    if (role === "TEAM" && !isAdmin) {
      const teamAllowed = ["/admin", "/admin/tasks", "/admin/tickets"];
      const isAllowed = teamAllowed.some(
        (route) => pathname === route || (route !== "/admin" && pathname.startsWith(route + "/"))
      );
      if (!isAllowed) {
        return withSecurityHeaders(NextResponse.redirect(new URL("/admin", request.url)));
      }
    }
  }

  // Portal routes require CLIENT role
  if (pathname.startsWith("/portal")) {
    if (role !== "CLIENT") {
      return withSecurityHeaders(NextResponse.redirect(new URL("/dashboard", request.url)));
    }
  }

  return withSecurityHeaders(
    NextResponse.next({ request: { headers: requestHeaders } })
  );
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/portal/:path*",
    "/client-onboarding",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2)).*)",
  ],
};
