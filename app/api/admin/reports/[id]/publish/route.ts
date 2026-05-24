import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { sendAgencyEmail, escapeHtml } from "@/lib/email";
import { renderReportHtml, buildAgencyBranding } from "@/lib/report-html";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Check report exists, has sections, and belongs to agency
  const report = await prisma.clientReport.findFirst({
    where: { id, client: { agencyId } },
    include: {
      sections: { orderBy: { sortOrder: "asc" } },
      client: {
        select: {
          id: true,
          name: true,
          portalUsers: { select: { id: true, name: true, email: true } },
          agency: {
            select: {
              id: true,
              name: true,
              slug: true,
              logoUrl: true,
              primaryColor: true,
              accentColor: true,
              fromEmail: true,
            },
          },
        },
      },
    },
  });

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  if (report.sections.length === 0) {
    return NextResponse.json({ error: "Cannot publish a report with no sections" }, { status: 400 });
  }

  // Race condition guard: only publish if not already published
  let published;
  try {
    published = await prisma.clientReport.update({
      where: { id, status: { not: "PUBLISHED" } },
      data: { status: "PUBLISHED" },
      include: {
        client: { select: { id: true, name: true } },
        sections: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch {
    return NextResponse.json({ error: "Report was already published" }, { status: 409 });
  }

  // Send notifications to all portal users for this client
  const portalUsers = report.client.portalUsers;
  if (portalUsers.length > 0) {
    await prisma.notification.createMany({
      data: portalUsers.map((user) => ({
        agencyId,
        userId: user.id,
        type: "REPORT_PUBLISHED",
        title: "New Report Available",
        message: `A new ${report.period.toLowerCase()} report "${report.title}" has been published for ${report.client.name}.`,
        link: `/portal/reports/${report.id}`,
      })),
    });

    // Send branded email to portal users (fire-and-forget)
    const agency = report.client.agency;
    const agencyBranding = buildAgencyBranding(agency);

    const reportHtml = renderReportHtml(
      {
        id: report.id,
        title: report.title,
        summary: report.summary,
        startDate: report.startDate,
        endDate: report.endDate,
        client: { name: report.client.name },
        sections: report.sections.map((s) => ({
          type: s.type,
          title: s.title,
          data: s.data as Record<string, unknown>,
          notes: s.notes,
        })),
      },
      agencyBranding,
    );

    // Wrap report HTML in email-safe wrapper (XSS-escaped)
    const portalUrl = `https://${agency.slug}.vanguardm.com/portal/reports/${report.id}`;
    const emailHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060b14;">
<div style="max-width:1100px;margin:0 auto;padding:20px;">
<p style="font-family:-apple-system,sans-serif;font-size:14px;color:#94a3b8;text-align:center;margin-bottom:20px;">
  A new report is available for <strong style="color:#fff;">${escapeHtml(report.client.name)}</strong>.
  <a href="${portalUrl}" style="color:${escapeHtml(agencyBranding.primaryColor)};text-decoration:underline;">View in portal</a>
</p>
</div>
${reportHtml}
<div style="text-align:center;padding:20px;font-family:-apple-system,sans-serif;font-size:11px;color:#475569;">
  <p>You received this because you have portal access for ${escapeHtml(report.client.name)} on ${escapeHtml(agency.name)}.</p>
</div>
</body></html>`;

    const subject = `New Report: ${report.title} — ${report.client.name}`;

    // Fire-and-forget: send emails without blocking response, log failures
    Promise.allSettled(
      portalUsers
        .filter((u) => u.email)
        .map((user) =>
          sendAgencyEmail(agencyId, { to: user.email, subject, html: emailHtml })
        )
    ).then((results) => {
      for (const r of results) {
        if (r.status === "rejected") {
          console.error("[publish] Failed to send report email:", r.reason);
        }
      }
    });
  }

  return NextResponse.json(published);
}
