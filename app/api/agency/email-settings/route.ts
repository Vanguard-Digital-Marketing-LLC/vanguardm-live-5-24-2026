import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { encryptSecret, decryptSecret } from "@/lib/crypto";
import { escapeHtml } from "@/lib/email";
import { smtpSettingsSchema } from "@/lib/validations/email-settings";

export async function PATCH(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  const parsed = smtpSettingsSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { smtpHost, smtpPort, smtpUser, smtpPass, fromEmail } = parsed.data;

  // Test connection
  try {
    const testTransporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await testTransporter.verify();
  } catch {
    return NextResponse.json({ error: "SMTP connection test failed. Check your credentials." }, { status: 400 });
  }

  await prisma.agency.update({
    where: { id: agencyId },
    data: {
      smtpHostEnc: encryptSecret(smtpHost),
      smtpPortEnc: encryptSecret(String(smtpPort)),
      smtpUserEnc: encryptSecret(smtpUser),
      smtpPassEnc: encryptSecret(smtpPass),
      fromEmail: fromEmail || null,
    },
  });

  return NextResponse.json({ success: true });
}

/** Send a test email using the agency's stored SMTP config */
export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { name: true, smtpHostEnc: true, smtpPortEnc: true, smtpUserEnc: true, smtpPassEnc: true, fromEmail: true },
  });

  if (!agency?.smtpHostEnc || !agency.smtpUserEnc || !agency.smtpPassEnc) {
    return NextResponse.json({ error: "No SMTP configuration found. Save settings first." }, { status: 400 });
  }

  const host = decryptSecret(agency.smtpHostEnc);
  const port = agency.smtpPortEnc ? Number(decryptSecret(agency.smtpPortEnc)) : 465;
  const user = decryptSecret(agency.smtpUserEnc);
  const pass = decryptSecret(agency.smtpPassEnc);
  const from = agency.fromEmail || `${agency.name} <${user}>`;

  const to = session!.user!.email;
  if (!to) return NextResponse.json({ error: "No email on your account" }, { status: 400 });

  try {
    const testTransporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: { user, pass },
    });
    await testTransporter.sendMail({
      from,
      to,
      subject: `Test Email — ${agency.name} SMTP`,
      html: `<div style="font-family:-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 12px;">SMTP Test Successful</h2>
        <p style="color:#64748b;font-size:14px;">This confirms that the email settings for <strong>${escapeHtml(agency.name)}</strong> are working correctly.</p>
      </div>`,
    });
  } catch (err) {
    return NextResponse.json({
      error: `Failed to send test email: ${err instanceof Error ? err.message : "Unknown error"}`,
    }, { status: 500 });
  }

  return NextResponse.json({ success: true, sentTo: to });
}

export async function DELETE(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  await prisma.agency.update({
    where: { id: agencyId },
    data: {
      smtpHostEnc: null,
      smtpPortEnc: null,
      smtpUserEnc: null,
      smtpPassEnc: null,
      fromEmail: null,
    },
  });

  return NextResponse.json({ success: true });
}
