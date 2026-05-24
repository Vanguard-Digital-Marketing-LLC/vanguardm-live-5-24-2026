import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.delete("X-Powered-By");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Subdomain resolution ──────────────────────
  const host = request.headers.get("host") || "";
  const match = host.split(":")[0].match(/^([a-z0-9-]+)\.vanguardm\.com$/);
  const agencySlug = (match && match[1] !== "www") ? match[1] : null;

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
  // Platform super admins (vanguard agency + isAdmin) can access any subdomain
  // Note: agencySlug may be null for legacy tokens — treat isAdmin users permissively
  const isPlatformSuperAdmin =
    token.isAdmin === true && (!token.agencySlug || token.agencySlug === "vanguard");

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
