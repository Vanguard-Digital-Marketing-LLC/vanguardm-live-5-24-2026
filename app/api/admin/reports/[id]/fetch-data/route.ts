import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { fetchGoogleAdsData } from "@/lib/integrations/google-ads";
import { fetchGA4Data, fetchGA4GeoData, fetchGA4PageConversions, GeoEntry } from "@/lib/integrations/ga4";
import { fetchSearchConsoleData } from "@/lib/integrations/search-console";
import { fetchNimbataCalls } from "@/lib/integrations/nimbata";

// US state abbreviation → full name map for matching
const STATE_ABBR: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

/** Extract state name from client address (e.g. "Bryan, TX 77808" → "Texas") */
function extractStateFromAddress(address: string | null): string | null {
  if (!address) return null;
  // Match 2-letter state code before zip or at end
  const match = address.match(/\b([A-Z]{2})\s*\d{5}/) || address.match(/,\s*([A-Z]{2})\b/);
  if (match && STATE_ABBR[match[1]]) return STATE_ABBR[match[1]];
  // Check for full state name
  for (const [, fullName] of Object.entries(STATE_ABBR)) {
    if (address.toLowerCase().includes(fullName.toLowerCase())) return fullName;
  }
  return null;
}

async function fetchClientRevenue(clientId: string, startDate: string, endDate: string) {
  const jobs = await prisma.clientJob.findMany({
    where: {
      clientId,
      jobDate: { gte: new Date(startDate), lte: new Date(endDate + "T23:59:59Z") },
    },
  });

  if (jobs.length === 0) return {};

  let totalRevenue = 0;
  const sourceMap = new Map<string, { revenue: number; jobs: number }>();
  const dailyMap = new Map<string, number>();

  for (const job of jobs) {
    const total = Number(job.total);
    totalRevenue += total;
    // By source
    const sources = job.leadSource
      ? job.leadSource.split(",").map((s) => s.trim())
      : ["Unknown"];
    for (const src of sources) {
      const e = sourceMap.get(src) || { revenue: 0, jobs: 0 };
      e.revenue += total;
      e.jobs++;
      sourceMap.set(src, e);
    }
    // By day
    if (job.jobDate) {
      const key = job.jobDate.toISOString().slice(0, 10);
      dailyMap.set(key, (dailyMap.get(key) || 0) + total);
    }
  }

  // Estimate actual conversions from revenue (avg job value ~$706 from detailed data)
  const estimatedTotalJobs = Math.round(totalRevenue / 706);
  const revenueBySource = Array.from(sourceMap.entries())
    .map(([source, data]) => ({
      source,
      revenue: data.revenue,
      jobs: Math.max(1, Math.round(estimatedTotalJobs * (data.revenue / totalRevenue))),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const revenueByDay = Array.from(dailyMap.entries())
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return { totalRevenue, totalJobs: estimatedTotalJobs, revenueBySource, revenueByDay };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminFeature("reports");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();
  const { sectionType } = body as { sectionType: string };

  if (!sectionType) {
    return NextResponse.json({ error: "sectionType is required" }, { status: 400 });
  }

  // Load report with client, verify it belongs to agency
  const report = await prisma.clientReport.findFirst({
    where: { id, client: { agencyId } },
    include: { client: true },
  });

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const client = report.client;
  const startDate = report.startDate.toISOString().slice(0, 10);
  const endDate = report.endDate.toISOString().slice(0, 10);

  try {
    switch (sectionType) {
      case "ADS": {
        if (!client.googleAdsCustomerId) {
          return NextResponse.json({ error: "This client has no Google Ads Customer ID configured. Edit the client to add it." }, { status: 400 });
        }
        const adsData = await fetchGoogleAdsData(client.googleAdsCustomerId, startDate, endDate);
        // Filter geo breakdown to client's state (service area)
        const adsClientState = extractStateFromAddress(client.address);
        if (adsClientState && adsData.geoBreakdown) {
          adsData.geoBreakdown = adsData.geoBreakdown.filter((g) =>
            g.location.toLowerCase().includes(adsClientState.toLowerCase())
          );
          if (adsData.geoBreakdown.length === 0) adsData.geoBreakdown = undefined;
        }
        // Fetch revenue data from ClientJob for this period
        const revenueData = await fetchClientRevenue(client.id, startDate, endDate);
        // Fetch Nimbata call tracking if configured
        let callTracking: { totalCalls: number; answeredCalls: number; missedCalls: number; conversionCalls: number; avgDurationSeconds: number; callsByDay: { date: string; count: number }[] } | undefined;
        if (client.nimbataProjectId) {
          try {
            const nimbata = await fetchNimbataCalls(client.nimbataProjectId, startDate, endDate);
            callTracking = {
              totalCalls: nimbata.totalCalls,
              answeredCalls: nimbata.answeredCalls,
              missedCalls: nimbata.missedCalls,
              conversionCalls: nimbata.answeredCalls, // answered calls are qualified leads
              avgDurationSeconds: nimbata.avgDurationSeconds,
              callsByDay: nimbata.callsByDay,
            };
          } catch { /* Nimbata fetch failed, skip call data */ }
        }
        return NextResponse.json({ data: { ...adsData, ...revenueData, callTracking } });
      }

      case "TRAFFIC": {
        if (!client.ga4PropertyId) {
          return NextResponse.json({ error: "This client has no GA4 Property ID configured. Edit the client to add it." }, { status: 400 });
        }
        const data = await fetchGA4Data(client.ga4PropertyId, startDate, endDate);
        return NextResponse.json({ data });
      }

      case "SEO": {
        if (!client.searchConsoleUrl) {
          return NextResponse.json({ error: "This client has no Search Console URL configured. Edit the client to add it." }, { status: 400 });
        }
        const scData = await fetchSearchConsoleData(client.searchConsoleUrl, startDate, endDate);
        let geoBreakdown: GeoEntry[] = [];
        if (client.ga4PropertyId) {
          try {
            const [geo, pageConversions] = await Promise.all([
              fetchGA4GeoData(client.ga4PropertyId, startDate, endDate),
              fetchGA4PageConversions(client.ga4PropertyId, startDate, endDate),
            ]);
            // Filter geo data to client's state (service area)
            const clientState = extractStateFromAddress(client.address);
            if (clientState) {
              geoBreakdown = geo.filter((g) =>
                g.region.toLowerCase() === clientState.toLowerCase()
              );
            } else {
              geoBreakdown = geo;
            }
            // Merge GA4 conversions into SC landing pages
            if (Object.keys(pageConversions).length > 0) {
              scData.topLandingPages = scData.topLandingPages.map((lp) => ({
                ...lp,
                conversions: pageConversions[lp.page] || 0,
              }));
            }
          } catch (ga4Err) {
            console.warn("[fetch-data] Failed to fetch GA4 data for SEO, continuing without it:", ga4Err);
          }
        }
        return NextResponse.json({ data: { ...scData, geoBreakdown } });
      }

      case "CALLS": {
        if (!client.nimbataProjectId) {
          return NextResponse.json({ error: "This client has no Nimbata Project ID configured. Edit the client to add it." }, { status: 400 });
        }
        const data = await fetchNimbataCalls(client.nimbataProjectId, startDate, endDate);
        return NextResponse.json({ data });
      }

      default:
        return NextResponse.json({ error: `Fetch not supported for section type: ${sectionType}` }, { status: 400 });
    }
  } catch (err) {
    console.error(`[fetch-data] Error fetching ${sectionType} for client ${client.name}:`, err);
    return NextResponse.json(
      { error: `Failed to fetch ${sectionType} data: ${err instanceof Error ? err.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
