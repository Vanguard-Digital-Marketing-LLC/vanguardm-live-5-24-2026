import { getAccessToken } from "./google-auth";

export interface AdsGeoEntry {
  location: string;
  clicks: number;
  impressions: number;
  spend: number;
  conversions: number;
}

export interface AdsData {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  roas: number;
  campaigns: {
    name: string;
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
    roas: number;
  }[];
  geoBreakdown?: AdsGeoEntry[];
}

async function gaqlQuery(customerId: string, query: string, accessToken: string) {
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

  const res = await fetch(
    `https://googleads.googleapis.com/v21/customers/${customerId}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": developerToken!,
        "login-customer-id": loginCustomerId!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Ads API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  // searchStream returns array of result batches
  return data.flatMap((batch: { results?: unknown[] }) => batch.results || []);
}

export async function fetchGoogleAdsData(
  customerId: string,
  startDate: string,
  endDate: string
): Promise<AdsData> {
  const accessToken = await getAccessToken();

  // Account totals
  const totalsQuery = `
    SELECT
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.cost_per_conversion,
      metrics.conversions_value
    FROM customer
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
  `;

  // Campaign breakdown
  const campaignQuery = `
    SELECT
      campaign.name,
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      AND campaign.status = 'ENABLED'
    ORDER BY metrics.cost_micros DESC
    LIMIT 20
  `;

  // Geographic breakdown — city-level from user_location_view
  const geoQuery = `
    SELECT
      user_location_view.country_criterion_id,
      user_location_view.targeting_location,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.conversions
    FROM user_location_view
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    ORDER BY metrics.clicks DESC
    LIMIT 50
  `;

  const [totalsResults, campaignResults, geoResults] = await Promise.all([
    gaqlQuery(customerId, totalsQuery, accessToken),
    gaqlQuery(customerId, campaignQuery, accessToken),
    gaqlQuery(customerId, geoQuery, accessToken).catch((err) => {
      console.warn("[google-ads] Geo query failed:", err.message?.slice(0, 200));
      return [];
    }),
  ]);

  // Parse totals
  let spend = 0, impressions = 0, clicks = 0, ctr = 0, conversions = 0, cpa = 0, roas = 0;

  if (totalsResults.length > 0) {
    const m = totalsResults[0].metrics;
    spend = (parseInt(m.costMicros || "0") / 1_000_000);
    impressions = parseInt(m.impressions || "0");
    clicks = parseInt(m.clicks || "0");
    ctr = parseFloat(m.ctr || "0") * 100;
    conversions = parseFloat(m.conversions || "0");
    cpa = parseFloat(m.costPerConversion || "0") / 1_000_000;
    const convValue = parseFloat(m.conversionsValue || "0");
    roas = spend > 0 ? convValue / spend : 0;
  }

  // Parse campaigns
  const campaigns = campaignResults
    .filter((r: { campaign?: { name?: string } }) => r.campaign?.name)
    .map((r: { campaign: { name: string }; metrics: Record<string, string> }) => {
      const m = r.metrics;
      const campSpend = parseInt(m.costMicros || "0") / 1_000_000;
      const campConvValue = parseFloat(m.conversionsValue || "0");
      return {
        name: r.campaign.name,
        spend: Math.round(campSpend * 100) / 100,
        impressions: parseInt(m.impressions || "0"),
        clicks: parseInt(m.clicks || "0"),
        conversions: Math.round(parseFloat(m.conversions || "0") * 100) / 100,
        roas: campSpend > 0 ? Math.round((campConvValue / campSpend) * 100) / 100 : 0,
      };
    });

  // Parse geographic breakdown — resolve targeting_location resource names
  const geoBreakdown: AdsGeoEntry[] = [];
  if (geoResults.length > 0) {
    // Collect unique geo_target_constant resource names to resolve
    const geoConstants = new Set<string>();
    for (const r of geoResults) {
      const gtc = r.userLocationView?.targetingLocation;
      if (gtc) geoConstants.add(gtc);
    }

    // Resolve geo_target_constant names in batch
    const nameMap = new Map<string, string>();
    const resolvePromises = Array.from(geoConstants).map(async (resourceName) => {
      try {
        const res = await fetch(
          `https://googleads.googleapis.com/v21/${resourceName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
              "login-customer-id": process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          const canonical = data.canonicalName || data.name || resourceName;
          const parts = canonical.split(",").map((s: string) => s.trim());
          nameMap.set(resourceName, parts.length >= 2 ? `${parts[0]}, ${parts[1]}` : parts[0]);
        }
      } catch {
        // Skip unresolvable
      }
    });
    await Promise.all(resolvePromises);

    // Build geo entries, aggregating by resolved name
    const geoAgg = new Map<string, AdsGeoEntry>();
    for (const r of geoResults) {
      const gtc = r.userLocationView?.targetingLocation;
      const location = (gtc && nameMap.get(gtc)) || "Unknown";
      const m = r.metrics || {};
      const entry = geoAgg.get(location) || { location, clicks: 0, impressions: 0, spend: 0, conversions: 0 };
      entry.clicks += parseInt(m.clicks || "0");
      entry.impressions += parseInt(m.impressions || "0");
      entry.spend += parseInt(m.costMicros || "0") / 1_000_000;
      entry.conversions += parseFloat(m.conversions || "0");
      geoAgg.set(location, entry);
    }

    // Sort by clicks desc, take top 20
    const sorted = Array.from(geoAgg.values())
      .filter((e) => e.location !== "Unknown")
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 20);

    for (const e of sorted) {
      geoBreakdown.push({
        location: e.location,
        clicks: e.clicks,
        impressions: e.impressions,
        spend: Math.round(e.spend * 100) / 100,
        conversions: Math.round(e.conversions * 100) / 100,
      });
    }
  }

  return {
    spend: Math.round(spend * 100) / 100,
    impressions,
    clicks,
    ctr: Math.round(ctr * 100) / 100,
    conversions: Math.round(conversions * 100) / 100,
    cpa: Math.round(cpa * 100) / 100,
    roas: Math.round(roas * 100) / 100,
    campaigns,
    geoBreakdown: geoBreakdown.length > 0 ? geoBreakdown : undefined,
  };
}
