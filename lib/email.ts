import * as nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import { decryptSecret } from "@/lib/crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.vanguardm.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@vanguardm.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Vanguard Website <noreply@vanguardm.com>";

/** Escape user-provided strings before interpolation into HTML emails. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });
}

/**
 * Send email using per-agency SMTP config (if set), falling back to global SMTP.
 */
export async function sendAgencyEmail(
  agencyId: string,
  { to, subject, html }: { to: string; subject: string; html: string }
) {
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { smtpHostEnc: true, smtpPortEnc: true, smtpUserEnc: true, smtpPassEnc: true, fromEmail: true, name: true },
  });

  let agencyTransporter: nodemailer.Transporter;
  let from: string;

  if (agency?.smtpHostEnc && agency.smtpUserEnc && agency.smtpPassEnc) {
    const host = decryptSecret(agency.smtpHostEnc);
    const port = agency.smtpPortEnc ? Number(decryptSecret(agency.smtpPortEnc)) : 465;
    const user = decryptSecret(agency.smtpUserEnc);
    const pass = decryptSecret(agency.smtpPassEnc);
    from = agency.fromEmail || `${agency.name} <${user}>`;

    agencyTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } else {
    agencyTransporter = transporter;
    from = agency?.fromEmail || FROM_EMAIL;
  }

  await agencyTransporter.sendMail({ from, to, subject, html });
}

export async function sendContactEmail(data: ContactFormData) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : undefined;
  const company = data.company ? escapeHtml(data.company) : undefined;
  const service = data.service ? escapeHtml(data.service) : undefined;
  const message = escapeHtml(data.message);

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New Contact: ${name}${company ? ` (${company})` : ""} — ${service || "General Inquiry"}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">New Contact Form Submission</h1>
          <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">vanguardm.com</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px; font-size: 14px; color: #0a0f1a;">${name}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;">Email</td>
            <td style="padding: 8px 12px; font-size: 14px;"><a href="mailto:${email}" style="color: #10b981;">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;">Phone</td>
            <td style="padding: 8px 12px; font-size: 14px; color: #0a0f1a;">${phone}</td>
          </tr>` : ""}
          ${company ? `<tr style="background: #f8fafc;">
            <td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;">Company</td>
            <td style="padding: 8px 12px; font-size: 14px; color: #0a0f1a;">${company}</td>
          </tr>` : ""}
          ${service ? `<tr>
            <td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;">Service</td>
            <td style="padding: 8px 12px; font-size: 14px; color: #0a0f1a;">${service}</td>
          </tr>` : ""}
        </table>

        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="font-size: 13px; color: #64748b; font-weight: 600; margin: 0 0 8px 0;">Message</p>
          <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="font-size: 12px; color: #94a3b8; margin: 0;">
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `,
  });
}
