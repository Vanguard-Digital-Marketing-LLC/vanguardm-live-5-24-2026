import { google } from "googleapis";
import { getAuthenticatedClient } from "./google-auth";

export interface SeoData {
  organicTraffic: number;
  organicOverTime: { date: string; traffic: number }[];
  keywordRankings: { keyword: string; position: number; previousPosition: number; url: string }[];
  topLandingPages: { page: string; sessions: number; conversions: number }[];
  domainStrength?: number;
  domainAuthority?: number;
  totalImpressions?: number;
  averagePosition?: number;
  totalIndexedPages?: number;
  newBacklinks?: number;
}

export async function fetchSearchConsoleData(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<SeoData> {
  const auth = getAuthenticatedClient();
  const searchconsole = google.searchconsole({ version: "v1", auth });

  // Query 1: Totals + daily breakdown
  const dateRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["date"],
      rowLimit: 500,
    },
  });

  const dateRows = dateRes.data.rows || [];
  let organicTraffic = 0;
  const organicOverTime = dateRows.map((row) => {
    const clicks = row.clicks || 0;
    organicTraffic += clicks;
    const d = (row.keys?.[0] || "").slice(5); // MM-DD
    return { date: d.replace("-", "/"), traffic: clicks };
  });

  // Query 2: Top queries → keyword rankings (fetch more for per-page breakdown)
  const queryRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query", "page"],
      rowLimit: 100,
      type: "web",
    },
  });

  const keywordRankings = (queryRes.data.rows || []).map((row) => {
    const fullUrl = row.keys?.[1] || "";
    // Strip domain to keep just the path for cleaner grouping
    let path = fullUrl;
    try { path = new URL(fullUrl).pathname; } catch { /* keep as-is */ }
    return {
      keyword: row.keys?.[0] || "",
      position: Math.round(row.position || 0),
      previousPosition: Math.round(row.position || 0), // SC doesn't provide previous; same value = no change shown
      url: path,
    };
  });

  // Query 3: Top pages
  const pageRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["page"],
      rowLimit: 15,
      type: "web",
    },
  });

  const topLandingPages = (pageRes.data.rows || []).map((row) => {
    const fullUrl = row.keys?.[0] || "";
    // Strip domain, keep path
    let path = fullUrl;
    try {
      path = new URL(fullUrl).pathname;
    } catch {
      // keep as-is
    }
    return {
      page: path,
      sessions: row.clicks || 0,
      conversions: 0, // SC doesn't track conversions
    };
  });

  // Query 4: Aggregate totals (no dimensions) for domain strength calculation
  const totalsRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, type: "web" },
  });

  const totalsRow = totalsRes.data.rows?.[0];
  const totalClicks = totalsRow?.clicks || organicTraffic;
  const totalImpressions = totalsRow?.impressions || 0;
  const avgPosition = totalsRow?.position || 0;

  // Compute Domain Strength (0-100)
  const positionScore = Math.max(0, 100 - avgPosition * 2);
  const trafficScore = Math.min(100, Math.log10(totalClicks + 1) * 25);
  const impressionScore = Math.min(100, Math.log10(totalImpressions + 1) * 20);
  const domainStrength = Math.round(
    positionScore * 0.4 + trafficScore * 0.35 + impressionScore * 0.25
  );

  const totalIndexedPages = topLandingPages.length;

  return {
    organicTraffic,
    organicOverTime,
    keywordRankings,
    topLandingPages,
    domainStrength,
    domainAuthority: domainStrength,
    totalImpressions,
    averagePosition: Math.round(avgPosition * 10) / 10,
    totalIndexedPages,
    newBacklinks: totalIndexedPages,
  };
}
