import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendEmail, escapeHtml } from "@/lib/email";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";
import { getBaseUrl } from "@/lib/site-config";

export const POST = withRateLimit(
  "admin",
  async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> },
  ) => {
    const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN", "TEAM");
    if (errorResponse) return errorResponse;

    const { id } = await context.params;

    // Verify the client belongs to this agency, and pull agency branding
    const client = await prisma.client.findFirst({
      where: { id, agencyId },
      select: {
        id: true,
        name: true,
        agency: { select: { name: true, primaryColor: true } },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const body = await req.json();

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 },
      );
    }

    const email = body.email.trim().toLowerCase();

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if there is already an active (non-expired, non-revoked, non-accepted) invite
    const existingInvite = await prisma.clientInvite.findFirst({
      where: {
        clientId: id,
        email,
        expiresAt: { gt: new Date() },
        acceptedAt: null,
        revokedAt: null,
      },
    });

    if (existingInvite) {
      return NextResponse.json(
        {
          error: "An active invite already exists for this email",
          invite: {
            id: existingInvite.id,
            email: existingInvite.email,
            expiresAt: existingInvite.expiresAt,
          },
        },
        { status: 409 },
      );
    }

    // Create invite with 7-day expiry and cryptographic token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const token = crypto.randomBytes(32).toString("hex");

    const invite = await prisma.clientInvite.create({
      data: {
        clientId: id,
        email,
        token,
        expiresAt,
      },
    });

    // Send invitation email with tenant-aware branding
    const inviteUrl = `${getBaseUrl(req)}/auth/client-invite/${invite.token}`;
    const agencyName = client.agency?.name || "Vanguard Digital Marketing";
    const brandColor = client.agency?.primaryColor || "#0891b2";
    try {
      await sendEmail({
        to: email,
        subject: `You've been invited to the ${client.name.slice(0, 100)} Client Portal`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid ${brandColor}; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Client Portal Invitation</h1>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">${escapeHtml(agencyName)}</p>
            </div>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              You've been invited to access the <strong>${escapeHtml(client.name)}</strong> client portal at ${escapeHtml(agencyName)}.
            </p>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              From the portal you can view projects, submit support tickets, send messages, and access reports.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${inviteUrl}" style="display: inline-block; background: ${brandColor}; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Accept Invitation
              </a>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin: 24px 0 0 0;">
              This invitation expires in 7 days. If you did not expect this email, you can safely ignore it.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      // Log but don't fail — the invite was already created
      console.error("Failed to send client invite email:", emailErr);
    }

    return NextResponse.json(
      {
        id: invite.id,
        email: invite.email,
        expiresAt: invite.expiresAt,
        clientName: client.name,
      },
      { status: 201 },
    );
  },
);
