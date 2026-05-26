import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { generateOnboardingTokenPair } from "@/lib/onboarding-auth";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const onboarding = await prisma.clientOnboarding.findFirst({
    where: { id, agencyId },
    include: { client: { select: { name: true } } },
  });

  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });
  if (!onboarding.respondentEmail) {
    return NextResponse.json({ error: "No respondent email set" }, { status: 400 });
  }

  // Rotate the token on every invite send. The DB stores only the sha256 hash
  // (B.4 invariant), so we can't reconstruct the raw value from `onboarding.token`
  // to put it in the email URL. Generating a fresh pair has two upsides:
  //   1. The URL we email is the raw token (validator hashes-then-looks-up).
  //   2. Any previously-shared invite URL (e.g. on a leaked screenshot) is
  //      invalidated as a side-effect — same kind of clean rotation behavior
  //      password-reset uses on every reset request.
  const { raw: rawToken, hash: tokenHash } = generateOnboardingTokenPair();
  await prisma.clientOnboarding.update({
    where: { id },
    data: { token: tokenHash },
  });

  const agencySlug = request.headers.get("x-agency-slug");
  const baseUrl = agencySlug
    ? `https://${agencySlug}.vanguardm.com`
    : (process.env.NEXTAUTH_URL || "https://vanguardm.com");
  const link = `${baseUrl}/onboarding/${rawToken}`;
  const recipientName = onboarding.respondentName || "there";

  try {
    await sendEmail({
      to: onboarding.respondentEmail,
      subject: `Onboarding Questionnaire — ${onboarding.client.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="border-bottom: 2px solid #0891b2; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Welcome to Vanguard Digital Marketing</h1>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Client Onboarding</p>
          </div>

          <p style="font-size: 15px; color: #1e293b; line-height: 1.6;">
            Hi ${esc(recipientName)},
          </p>
          <p style="font-size: 15px; color: #1e293b; line-height: 1.6;">
            We're excited to get started working with <strong>${esc(onboarding.client.name)}</strong>! To kick things off,
            we need some information about your business and goals. Please complete the questionnaire below — it
            should take about 15–20 minutes.
          </p>
          <p style="font-size: 15px; color: #1e293b; line-height: 1.6;">
            Your progress is saved automatically, so you can come back anytime to finish.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${link}" style="display: inline-block; background: #0891b2; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600;">
              Start Questionnaire
            </a>
          </div>

          <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
            This link expires on ${onboarding.tokenExpiresAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
            If you have any questions, reply to this email and we'll be happy to help.
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">
            Vanguard Digital Marketing &middot; vanguardm.com
          </p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Failed to send invite email:", e);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  // If status is still DRAFT, move to IN_PROGRESS
  if (onboarding.status === "DRAFT") {
    await prisma.clientOnboarding.update({
      where: { id },
      data: { status: "IN_PROGRESS" },
    });
  }

  return NextResponse.json({ success: true, sentTo: onboarding.respondentEmail });
}
