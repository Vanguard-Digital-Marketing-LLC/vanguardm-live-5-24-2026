import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { getBaseUrl } from "@/lib/site-config";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { email, inviteRole } = await request.json();
  if (!email || !["ADMIN", "TEAM"].includes(inviteRole)) {
    return NextResponse.json({ error: "Email and valid role required" }, { status: 400 });
  }

  const invite = await prisma.teamInvite.create({
    data: {
      email,
      role: inviteRole,
      invitedById: session.user.id,
      agencyId,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours
    },
  });

  // Send invite email
  const inviteUrl = `${getBaseUrl(request)}/auth/sign-up?invite=${invite.token}`;
  await sendEmail({
    to: email,
    subject: "You've been invited to Vanguard Digital Marketing",
    html: `<p>You've been invited to join the Vanguard Digital Marketing team as a <strong>${inviteRole}</strong>.</p>
           <p><a href="${inviteUrl}">Accept Invite</a></p>
           <p>This link expires in 72 hours.</p>`,
  });

  return NextResponse.json({ success: true, invite });
}
