import { NextRequest, NextResponse } from "next/server";
import { buildRevokedTokenData, validateOnboardingToken } from "@/lib/onboarding-auth";
import { rateLimitAsync } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Rate limit: 5 submit attempts per hour per token
  const rl = await rateLimitAsync(`onboarding-submit:${token}`, 5, 60 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many attempts, please wait" }, { status: 429 });
  }

  const onboarding = await validateOnboardingToken(token);
  if (!onboarding) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
  }

  if (onboarding.status === "SUBMITTED") {
    return NextResponse.json({ error: "Already submitted" }, { status: 400 });
  }

  // Verify Turnstile (mandatory)
  const body = await request.json();
  if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
  }

  // Mark as submitted and revoke the URL token: the respondent's link is
  // single-use, and re-presenting it after submit should surface 410 Gone via
  // classifyOnboardingToken (not let them re-edit / re-submit).
  await prisma.clientOnboarding.update({
    where: { id: onboarding.id },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
      ...buildRevokedTokenData(),
    },
  });

  // Notify admin(s) via email (fire-and-forget)
  const adminEmails = process.env.AUTH_ADMIN_EMAIL?.split(",").map((e) => e.trim()) || [];
  const clientName = onboarding.client.name;
  const agencySlug = request.headers.get("x-agency-slug");
  const baseUrl = agencySlug
    ? `https://${agencySlug}.vanguardm.com`
    : (process.env.NEXTAUTH_URL || "https://vanguardm.com");
  const adminLink = `${baseUrl}/admin/onboarding/${onboarding.id}`;

  for (const email of adminEmails) {
    sendEmail({
      to: email,
      subject: `Onboarding Submitted — ${esc(clientName)}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="border-bottom: 2px solid #0891b2; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Onboarding Submitted</h1>
          </div>
          <p style="font-size: 15px; color: #1e293b; line-height: 1.6;">
            <strong>${esc(clientName)}</strong> has completed their onboarding questionnaire.
            ${onboarding.respondentName ? `Submitted by ${esc(onboarding.respondentName)}.` : ""}
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${adminLink}" style="display: inline-block; background: #0891b2; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600;">
              Review Responses
            </a>
          </div>
          <p style="font-size: 12px; color: #94a3b8;">Vanguard Digital Marketing &middot; vanguardm.com</p>
        </div>
      `,
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}
