import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import type { Prisma } from "@/lib/generated/prisma/client";

// Maps onboarding service types → report section types with default data
const SERVICE_TO_SECTIONS: Record<string, { type: string; title: string; data: Record<string, unknown> }[]> = {
  WEB: [
    { type: "TRAFFIC", title: "Website Traffic", data: {} },
    { type: "MARKETING", title: "Marketing Strategy", data: { strategyType: "full_funnel", recommendations: "", kpis: [], timeline: [], budgetRecommendation: "" } },
  ],
  PPC: [
    { type: "ADS", title: "Paid Advertising", data: { spend: 0, impressions: 0, clicks: 0, ctr: 0, conversions: 0, cpa: 0, roas: 0, campaigns: [] } },
  ],
  SMA: [
    { type: "SOCIAL", title: "Social Media", data: { followers: 0, followersChange: 0, engagementRate: 0, reach: 0, impressions: 0, platformBreakdown: [], topPosts: [] } },
  ],
  SEO: [
    { type: "SEO", title: "SEO Performance", data: { organicTraffic: 0, organicTrafficChange: 0, domainAuthority: 0, newBacklinks: 0, organicOverTime: [], keywordRankings: [], topLandingPages: [] } },
  ],
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Fetch onboarding with responses, verify it belongs to agency
  const onboarding = await prisma.clientOnboarding.findFirst({
    where: { id, agencyId },
    include: {
      client: { select: { id: true, name: true, nimbataProjectId: true } },
      responses: true,
    },
  });

  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });
  if (onboarding.status !== "COMPLETED") {
    return NextResponse.json({ error: "Onboarding must be completed before generating a report" }, { status: 400 });
  }

  // Build sections from service types
  const sectionEntries: { type: string; title: string; data: Record<string, unknown>; sortOrder: number }[] = [];
  let sortOrder = 0;

  // Extract business info from onboarding responses for the marketing section
  const businessInfo: Record<string, unknown> = {};
  for (const response of onboarding.responses) {
    const data = response.data as Record<string, unknown>;
    Object.assign(businessInfo, data);
  }

  for (const serviceType of onboarding.serviceTypes) {
    const sectionDefs = SERVICE_TO_SECTIONS[serviceType] || [];
    for (const def of sectionDefs) {
      // Avoid duplicate section types
      if (sectionEntries.some((s) => s.type === def.type)) continue;

      const sectionData = { ...def.data };

      // Pre-fill marketing section with onboarding data
      if (def.type === "MARKETING") {
        const industry = (businessInfo.industry as string) || "";
        const location = (businessInfo.city as string) || (businessInfo.location as string) || "";
        const companySize = (businessInfo.employeeCount as string) || (businessInfo.companySize as string) || "";
        const businessName = onboarding.client.name;

        sectionData.recommendations = [
          `Marketing strategy for ${businessName}`,
          industry ? `Industry: ${industry}` : "",
          location ? `Location: ${location}` : "",
          companySize ? `Company Size: ${companySize} employees` : "",
          "",
          "Recommended actions:",
          "- Website optimization and conversion rate improvement",
          "- Content marketing strategy development",
          "- Lead generation and sales pipeline automation",
          "- Digital presence and brand awareness campaigns",
        ]
          .filter(Boolean)
          .join("\n");

        sectionData.kpis = [
          { metric: "Monthly Website Traffic", target: "", current: "" },
          { metric: "Conversion Rate", target: "3-5%", current: "" },
          { metric: "Monthly Qualified Leads", target: "", current: "" },
        ];

        sectionData.timeline = [
          { phase: "Phase 1", description: "Foundation & Setup", duration: "Weeks 1-4" },
          { phase: "Phase 2", description: "Content & SEO", duration: "Weeks 5-8" },
          { phase: "Phase 3", description: "Paid Campaigns", duration: "Weeks 9-12" },
        ];
      }

      sectionEntries.push({ type: def.type, title: def.title, data: sectionData, sortOrder: sortOrder++ });
    }
  }

  // Auto-include CALLS section for clients with Nimbata
  if (onboarding.client.nimbataProjectId && !sectionEntries.some((s) => s.type === "CALLS")) {
    sectionEntries.push({
      type: "CALLS",
      title: "Call Tracking",
      data: { totalCalls: 0, answeredCalls: 0, missedCalls: 0, avgDurationSeconds: 0, callsByDay: [], topSources: [], recentCalls: [] },
      sortOrder: sortOrder++,
    });
  }

  // Create report with sections
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0);

  const report = await prisma.clientReport.create({
    data: {
      clientId: onboarding.clientId,
      title: `${onboarding.client.name} — Marketing Strategy`,
      period: "QUARTERLY",
      startDate,
      endDate,
      status: "DRAFT",
      summary: `Auto-generated marketing strategy report for ${onboarding.client.name} based on onboarding data. Services: ${onboarding.serviceTypes.join(", ")}.`,
      sections: {
        create: sectionEntries.map((s) => ({
          type: s.type as "TRAFFIC" | "ADS" | "SEO" | "SOCIAL" | "CUSTOM" | "MARKETING" | "CALLS",
          title: s.title,
          data: s.data as unknown as Prisma.InputJsonValue,
          sortOrder: s.sortOrder,
        })),
      },
    },
    include: {
      client: { select: { id: true, name: true } },
      sections: true,
    },
  });

  return NextResponse.json(report, { status: 201 });
}
