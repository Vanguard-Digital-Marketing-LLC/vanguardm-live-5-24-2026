import { google } from "googleapis";
import { getAuthenticatedClient } from "./google-auth";

export interface TrafficData {
  sessions: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: string;
  sessionsOverTime: { date: string; sessions: number }[];
  topPages: { page: string; views: number; bounceRate: number }[];
  sourceBreakdown: { source: string; sessions: number; percentage: number }[];
}

export async function fetchGA4Data(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<TrafficData> {
  // Normalize property ID format
  if (/^G-/.test(propertyId)) {
    throw new Error(
      "GA4 Measurement ID (G-XXXXX) is not a Property ID. Go to GA4 Admin → Property Settings to find the numeric Property ID, then update the client with format: properties/XXXXXXXX"
    );
  }
  if (/^\d+$/.test(propertyId)) {
    propertyId = `properties/${propertyId}`;
  }
  if (!propertyId.startsWith("properties/")) {
    throw new Error(
      `Invalid GA4 Property ID format: "${propertyId}". Expected format: properties/XXXXXXXX`
    );
  }

  const auth = getAuthenticatedClient();
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

  // Query 1: Totals
  const totalsRes = await analyticsdata.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    },
  });

  const totalsRow = totalsRes.data.rows?.[0]?.metricValues || [];
  const totalSessions = parseInt(totalsRow[0]?.value || "0");
  const pageviews = parseInt(totalsRow[1]?.value || "0");
  const bounceRate = Math.round(parseFloat(totalsRow[2]?.value || "0") * 100) / 100;
  const avgDurationSec = parseFloat(totalsRow[3]?.value || "0");
  const mins = Math.floor(avgDurationSec / 60);
  const secs = Math.round(avgDurationSec % 60);
  const avgSessionDuration = `${mins}:${secs.toString().padStart(2, "0")}`;

  // Query 2: Sessions over time (by date)
  const timeRes = await analyticsdata.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    },
  });

  const sessionsOverTime = (timeRes.data.rows || []).map((row) => {
    const d = row.dimensionValues?.[0]?.value || "";
    return {
      date: `${d.slice(4, 6)}/${d.slice(6, 8)}`,
      sessions: parseInt(row.metricValues?.[0]?.value || "0"),
    };
  });

  // Query 3: Source breakdown
  const sourceRes = await analyticsdata.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: "10",
    },
  });

  const sourceBreakdown = (sourceRes.data.rows || []).map((row) => {
    const sessions = parseInt(row.metricValues?.[0]?.value || "0");
    return {
      source: row.dimensionValues?.[0]?.value || "Unknown",
      sessions,
      percentage: totalSessions > 0 ? Math.round((sessions / totalSessions) * 1000) / 10 : 0,
    };
  });

  // Query 4: Top pages
  const pagesRes = await analyticsdata.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "bounceRate" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: "10",
    },
  });

  const topPages = (pagesRes.data.rows || []).map((row) => ({
    page: row.dimensionValues?.[0]?.value || "/",
    views: parseInt(row.metricValues?.[0]?.value || "0"),
    bounceRate: Math.round(parseFloat(row.metricValues?.[1]?.value || "0") * 100) / 100,
  }));

  return {
    sessions: totalSessions,
    pageviews,
    bounceRate,
    avgSessionDuration,
    sessionsOverTime,
    topPages,
    sourceBreakdown,
  };
}

export interface GeoEntry {
  city: string;
  region: string;
  sessions: number;
  pageviews: number;
  channel: string;
}

export async function fetchGA4GeoData(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<GeoEntry[]> {
  // Normalize property ID format
  if (/^G-/.test(propertyId)) {
    throw new Error(
      "GA4 Measurement ID (G-XXXXX) is not a Property ID. Go to GA4 Admin → Property Settings to find the numeric Property ID, then update the client with format: properties/XXXXXXXX"
    );
  }
  if (/^\d+$/.test(propertyId)) {
    propertyId = `properties/${propertyId}`;
  }
  if (!propertyId.startsWith("properties/")) {
    throw new Error(
      `Invalid GA4 Property ID format: "${propertyId}". Expected format: properties/XXXXXXXX`
    );
  }

  const auth = getAuthenticatedClient();
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

  const geoRes = await analyticsdata.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: "city" },
        { name: "region" },
        { name: "sessionDefaultChannelGroup" },
      ],
      metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: "100",
    },
  });

  return (geoRes.data.rows || [])
    .map((row) => ({
      city: row.dimensionValues?.[0]?.value || "",
      region: row.dimensionValues?.[1]?.value || "",
      channel: row.dimensionValues?.[2]?.value || "Unknown",
      sessions: parseInt(row.metricValues?.[0]?.value || "0"),
      pageviews: parseInt(row.metricValues?.[1]?.value || "0"),
    }))
    .filter((r) => r.city !== "(not set)");
}

export async function fetchGA4PageConversions(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<Record<string, number>> {
  // Normalize property ID format
  if (/^G-/.test(propertyId)) {
    throw new Error(
      "GA4 Measurement ID (G-XXXXX) is not a Property ID. Go to GA4 Admin → Property Settings to find the numeric Property ID, then update the client with format: properties/XXXXXXXX"
    );
  }
  if (/^\d+$/.test(propertyId)) {
    propertyId = `properties/${propertyId}`;
  }
  if (!propertyId.startsWith("properties/")) {
    throw new Error(
      `Invalid GA4 Property ID format: "${propertyId}". Expected format: properties/XXXXXXXX`
    );
  }

  const auth = getAuthenticatedClient();
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

  // Only count real conversion events (phone calls, form submissions, etc.)
  // Exclude session_start/first_visit which GA4 often marks as key events by default
  const conversionEvents = ["phone_call", "nimbata_call", "form_submit", "generate_lead", "purchase", "book_appointment", "sign_up", "submit_lead_form"];

  const res = await analyticsdata.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "landingPagePlusQueryString" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        orGroup: {
          expressions: conversionEvents.map((event) => ({
            filter: {
              fieldName: "eventName",
              stringFilter: { value: event, matchType: "EXACT" as const },
            },
          })),
        },
      },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: "200",
    },
  });

  // Aggregate by path (strip query strings so /page/?utm=x merges with /page/)
  const result: Record<string, number> = {};
  for (const row of res.data.rows || []) {
    const rawPath = row.dimensionValues?.[0]?.value || "";
    const conversions = parseInt(row.metricValues?.[0]?.value || "0");
    if (!rawPath || conversions <= 0) continue;

    // Strip query string to get clean path for matching SC data
    const cleanPath = rawPath.split("?")[0];
    result[cleanPath] = (result[cleanPath] || 0) + conversions;
  }
  return result;
}
