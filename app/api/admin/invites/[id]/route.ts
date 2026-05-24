import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendEmail, escapeHtml } from "@/lib/email";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";
import { getBaseUrl } from "@/lib/site-config";

export const PATCH = withRateLimit(
  "admin",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ): Promise<NextResponse> => {
    const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
    if (errorResponse) return errorResponse;

    const { id } = await context.params;
    const body = await req.json();
    const action = body.action;

    if (!action || !["resend", "revoke"].includes(action)) {
      return NextResponse.json(
        { error: "action must be 'resend' or 'revoke'" },
        { status: 400 },
      );
    }

    const invite = await prisma.clientInvite.findFirst({
      where: { id, client: { agencyId } },
      include: { client: { select: { name: true } } },
    });

    if (!invite) {
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });
    }

    if (action === "revoke") {
      if (invite.acceptedAt) {
        return NextResponse.json(
          { error: "Cannot revoke an accepted invite" },
          { status: 400 },
        );
      }

      await prisma.clientInvite.update({
        where: { id },
        data: { revokedAt: new Date(), token: null },
      });

      return NextResponse.json({ success: true, action: "revoked" });
    }

    // Resend: generate new token and reset expiry
    if (invite.acceptedAt) {
      return NextResponse.json(
        { error: "Cannot resend an accepted invite" },
        { status: 400 },
      );
    }

    const newToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.clientInvite.update({
      where: { id },
      data: { token: newToken, expiresAt, revokedAt: null },
    });

    // Send email
    const inviteUrl = `${getBaseUrl(req)}/auth/client-invite/${newToken}`;
    try {
      await sendEmail({
        to: invite.email,
        subject: `You've been invited to the ${invite.client.name.slice(0, 100)} Client Portal`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #0891b2; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Client Portal Invitation</h1>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Vanguard Digital Marketing</p>
            </div>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              You've been invited to access the <strong>${escapeHtml(invite.client.name)}</strong> client portal at Vanguard Digital Marketing.
            </p>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              From the portal you can view projects, submit support tickets, send messages, and access reports.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${inviteUrl}" style="display: inline-block; background: #0891b2; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Accept Invitation
              </a>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin: 24px 0 0 0;">
              This invitation expires in 7 days. If you did not expect this email, you can safely ignore it.
            </p>
          </div>
        `,
      });
    } catch {
      console.error("Failed to send resend invite email");
    }

    return NextResponse.json({ success: true, action: "resent" });
  },
);
