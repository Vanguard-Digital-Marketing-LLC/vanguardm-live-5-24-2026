import type { Role } from "@/lib/generated/prisma/client";

/**
 * Resolves user role from email address.
 * Config lives in env vars (outside web root), not source code.
 */
export function resolveRoleFromEmail(email: string): { role: Role; isAdmin: boolean } {
  const normalized = email.toLowerCase().trim();
  const adminEmails = (process.env.AUTH_ADMIN_EMAIL || "")
    .toLowerCase()
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const employeeDomain = (process.env.AUTH_EMPLOYEE_DOMAIN || "").toLowerCase().trim();

  if (adminEmails.includes(normalized)) {
    return { role: "ADMIN", isAdmin: true };
  }

  if (employeeDomain && normalized.endsWith(`@${employeeDomain}`)) {
    return { role: "TEAM", isAdmin: false };
  }

  return { role: "USER", isAdmin: false };
}
