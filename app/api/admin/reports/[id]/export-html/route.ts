import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { renderReportHtml, buildAgencyBranding } from "@/lib/report-html";

const SLUG_REGEX = /^[a-z0-9-]+$/;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const report = await prisma.clientReport.findFirst({
    where: { id, client: { agencyId } },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          agency: {
            select: {
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
      sections: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const agency = report.client.agency;

  // Validate slug to prevent directory traversal
  if (!SLUG_REGEX.test(agency.slug)) {
    return NextResponse.json({ error: "Invalid agency slug" }, { status: 400 });
  }

  const agencyBranding = buildAgencyBranding(agency);

  const html = renderReportHtml(
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

  // Save to filesystem under agency slug directory
  const clientSlug = report.client.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  const fileName = `${clientSlug}-report-${report.id.slice(-6)}.html`;
  const outputDir = path.join(process.cwd(), "public", "reports", agency.slug);

  try {
    await mkdir(outputDir, { recursive: true });
    const filePath = path.join(outputDir, fileName);
    await writeFile(filePath, html, "utf-8");
  } catch (err) {
    console.error("[export-html] Failed to write report file:", err);
    return NextResponse.json({ error: "Failed to write report file" }, { status: 500 });
  }

  const downloadUrl = `https://${agency.slug}.vanguardm.com/reports/${agency.slug}/${fileName}`;

  return NextResponse.json({
    url: downloadUrl,
    fileName,
    message: "Report exported successfully",
  });
}
