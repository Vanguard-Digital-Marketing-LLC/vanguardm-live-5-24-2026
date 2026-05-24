import { sendEmail, escapeHtml } from "@/lib/email";
import { prisma } from "@/lib/db";

const ADMIN_EMAIL = "james@vanguardm.com";
const APP_URL = process.env.NEXTAUTH_URL || "https://vanguardm.com";

interface TicketRef {
  id: string;
  title: string;
  clientId?: string;
  client?: { name: string; domain?: string | null } | null;
  source?: string | null;
}

export async function notifyTicketCreated(ticket: TicketRef): Promise<void> {
  const clientName = ticket.client?.name || "Unknown";
  const source = ticket.source || "admin";
  const link = `${APP_URL}/admin/tickets/${ticket.id}`;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Ticket: ${ticket.title} (${clientName})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">New Support Ticket</h1>
          <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Source: ${escapeHtml(source)}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Title</td><td style="padding: 8px 12px; font-size: 14px; color: #0a0f1a;">${escapeHtml(ticket.title)}</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Client</td><td style="padding: 8px 12px; font-size: 14px; color: #0a0f1a;">${escapeHtml(clientName)}</td></tr>
        </table>
        <a href="${link}" style="display: inline-block; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">View Ticket</a>
      </div>
    `,
  });
}

export async function notifyTicketStatusChanged(
  ticket: TicketRef,
  oldStatus: string,
  newStatus: string,
): Promise<void> {
  // Notify admin
  const adminLink = `${APP_URL}/admin/tickets/${ticket.id}`;
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `Ticket Updated: ${ticket.title} — ${oldStatus} → ${newStatus}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Ticket Status Changed</h1>
        </div>
        <p style="font-size: 14px; color: #0a0f1a;"><strong>${escapeHtml(ticket.title)}</strong></p>
        <p style="font-size: 14px; color: #64748b;">${escapeHtml(oldStatus.replace(/_/g, " "))} → <strong>${escapeHtml(newStatus.replace(/_/g, " "))}</strong></p>
        <a href="${adminLink}" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">View Ticket</a>
      </div>
    `,
  });

  // Notify portal users linked to this client
  if (ticket.clientId) {
    const portalUsers = await prisma.user.findMany({
      where: {
        clientId: ticket.clientId,
        emailOnTicketUpdate: true,
        role: "CLIENT",
      },
      select: { email: true, name: true },
    });

    const portalLink = `${APP_URL}/portal/tickets/${ticket.id}`;
    for (const user of portalUsers) {
      sendEmail({
        to: user.email,
        subject: `Ticket Updated: ${ticket.title}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Ticket Status Updated</h1>
            </div>
            <p style="font-size: 14px; color: #0a0f1a;">Hi ${escapeHtml(user.name || "there")},</p>
            <p style="font-size: 14px; color: #334155;">Your ticket <strong>${escapeHtml(ticket.title)}</strong> has been updated from <strong>${escapeHtml(oldStatus.replace(/_/g, " "))}</strong> to <strong>${escapeHtml(newStatus.replace(/_/g, " "))}</strong>.</p>
            <a href="${portalLink}" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">View Ticket</a>
          </div>
        `,
      }).catch(console.error);
    }
  }
}

export async function notifyAgentCompleted(
  ticket: TicketRef,
  success: boolean,
  output: string,
): Promise<void> {
  const link = `${APP_URL}/admin/tickets/${ticket.id}`;
  const status = success ? "completed successfully" : "failed";
  const color = success ? "#10b981" : "#ef4444";
  const preview = output.length > 500 ? output.slice(0, 500) + "..." : output;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `Agent ${status}: ${ticket.title}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="border-bottom: 2px solid ${color}; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">AI Agent ${escapeHtml(status)}</h1>
        </div>
        <p style="font-size: 14px; color: #0a0f1a;"><strong>${escapeHtml(ticket.title)}</strong></p>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <pre style="font-size: 13px; color: #334155; white-space: pre-wrap; margin: 0;">${escapeHtml(preview)}</pre>
        </div>
        <a href="${link}" style="display: inline-block; padding: 10px 20px; background: ${color}; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">Review Ticket</a>
      </div>
    `,
  });
}

export async function notifyTicketComment(
  ticket: TicketRef,
  message: { content: string; authorId?: string | null },
): Promise<void> {
  const author = message.authorId
    ? await prisma.user.findUnique({
        where: { id: message.authorId },
        select: { role: true, name: true },
      })
    : null;

  const isAdminComment = author?.role === "ADMIN" || author?.role === "TEAM";
  const authorName = author?.name || (isAdminComment ? "Support team" : "Client");
  const preview = message.content.length > 300 ? message.content.slice(0, 300) + "..." : message.content;

  if (isAdminComment && ticket.clientId) {
    // Admin/team comment — notify portal clients
    const portalUsers = await prisma.user.findMany({
      where: {
        clientId: ticket.clientId,
        emailOnNewMessage: true,
        role: "CLIENT",
      },
      select: { email: true, name: true },
    });

    const portalLink = `${APP_URL}/portal/tickets/${ticket.id}`;
    for (const user of portalUsers) {
      sendEmail({
        to: user.email,
        subject: `New Reply: ${ticket.title}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">New Reply on Your Ticket</h1>
            </div>
            <p style="font-size: 14px; color: #334155;">${escapeHtml(authorName)} replied to <strong>${escapeHtml(ticket.title)}</strong>:</p>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="font-size: 14px; color: #0a0f1a; white-space: pre-wrap; margin: 0;">${escapeHtml(preview)}</p>
            </div>
            <a href="${portalLink}" style="display: inline-block; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">View Ticket</a>
          </div>
        `,
      }).catch(console.error);
    }
  } else {
    // Client comment — notify admin
    const adminLink = `${APP_URL}/admin/tickets/${ticket.id}`;
    sendEmail({
      to: ADMIN_EMAIL,
      subject: `Client Reply: ${ticket.title} — ${ticket.client?.name || "Unknown"}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Client Replied to Ticket</h1>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">${escapeHtml(ticket.client?.name || "Unknown")}</p>
          </div>
          <p style="font-size: 14px; color: #334155;">${escapeHtml(authorName)} replied to <strong>${escapeHtml(ticket.title)}</strong>:</p>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="font-size: 14px; color: #0a0f1a; white-space: pre-wrap; margin: 0;">${escapeHtml(preview)}</p>
          </div>
          <a href="${adminLink}" style="display: inline-block; padding: 10px 20px; background: #f59e0b; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">View Ticket</a>
        </div>
      `,
    }).catch(console.error);
  }
}
