/**
 * CTR (Click-Through Rate) Curve for organic search results.
 *
 * Based on industry-standard CTR curves (Backlinko/Sistrix/AWR aggregated data).
 * Position 1 gets ~31.7% of clicks, dropping sharply after position 3.
 * Positions 11+ (page 2+) get negligible traffic.
 *
 * Formula: estimatedTraffic = monthlySearchVolume × CTR[position]
 */

// CTR percentages for positions 1-10 based on aggregated industry data
const CTR_CURVE: Record<number, number> = {
  1: 0.317,
  2: 0.243,
  3: 0.187,
  4: 0.088,
  5: 0.063,
  6: 0.047,
  7: 0.035,
  8: 0.028,
  9: 0.022,
  10: 0.018,
};

/**
 * Get the CTR for a given SERP position (1-100).
 * Returns a decimal (e.g., 0.317 for position 1 = 31.7%).
 */
export function getCTR(position: number): number {
  if (position < 1 || position > 100) return 0;
  if (position <= 10) return CTR_CURVE[position] ?? 0;
  if (position <= 20) return 0.01;
  if (position <= 30) return 0.005;
  if (position <= 50) return 0.002;
  return 0.001;
}

/**
 * Estimate monthly organic traffic for a URL at a given position.
 */
export function estimateTraffic(volume: number, position: number): number {
  if (!volume || volume <= 0 || !position || position < 1) return 0;
  return Math.round(volume * getCTR(position));
}

/**
 * Estimate the traffic value in USD.
 * trafficValue = estimatedTraffic × avgCPC
 */
export function estimateTrafficValue(
  volume: number,
  position: number,
  cpc: number = 0,
): number {
  if (cpc <= 0) return 0;
  return Math.round(estimateTraffic(volume, position) * cpc * 100) / 100;
}

/**
 * Calculate total estimated traffic for a domain across all its ranking keywords.
 */
export function estimateDomainTraffic(
  rankings: { volume: number; position: number }[],
): number {
  return rankings.reduce((total, r) => total + estimateTraffic(r.volume, r.position), 0);
}

/**
 * Format CTR as a percentage string.
 */
export function formatCTR(position: number): string {
  return `${(getCTR(position) * 100).toFixed(1)}%`;
}

// ── Fetch Button: Live SERP Scraping ────────────
// These functions are called from the API route when the user clicks
// "Fetch SERPs" in the UI. They hit an external SERP API, parse
// results, and return structured data ready for DB insertion.

export interface SerpApiResult {
  position: number;
  url: string;
  domain: string;
  title: string;
  description: string | null;
}

export interface FetchSerpResponse {
  keyword: string;
  results: SerpApiResult[];
  serpFeatures: string[];
  error?: string;
}

/**
 * Extract the root domain from a URL.
 * "https://www.example.com/blog/post" → "example.com"
 */
export function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    // Strip www. prefix
    return hostname.replace(/^www\./, "");
  } catch {
    // Fallback: try regex for malformed URLs
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^/]+)/);
    return match?.[1] ?? url;
  }
}

/**
 * Detect SERP features from raw API response.
 * Adapts to both SerpApi and DataForSEO response formats.
 */
export function detectSerpFeatures(raw: Record<string, unknown>): string[] {
  const features: string[] = [];

  // SerpApi format
  if (raw.answer_box) features.push("Featured Snippet");
  if (raw.knowledge_graph) features.push("Knowledge Panel");
  if (raw.local_results || raw.local_map) features.push("Local Pack");
  if (raw.related_questions) features.push("People Also Ask");
  if (raw.shopping_results) features.push("Shopping");
  if (raw.top_stories) features.push("Top Stories");
  if (raw.images_results) features.push("Image Pack");
  if (raw.video_results) features.push("Video");
  if (raw.twitter_results) features.push("Twitter/X");

  // DataForSEO format (items[].type)
  if (Array.isArray(raw.items)) {
    const types = new Set((raw.items as { type?: string }[]).map((i) => i.type).filter(Boolean));
    if (types.has("featured_snippet")) features.push("Featured Snippet");
    if (types.has("knowledge_graph")) features.push("Knowledge Panel");
    if (types.has("local_pack")) features.push("Local Pack");
    if (types.has("people_also_ask")) features.push("People Also Ask");
    if (types.has("shopping")) features.push("Shopping");
    if (types.has("top_stories")) features.push("Top Stories");
    if (types.has("images")) features.push("Image Pack");
    if (types.has("video")) features.push("Video");
  }

  return [...new Set(features)]; // dedupe
}

/**
 * Fetch SERP results for a single keyword using SerpApi.
 * Requires SERPAPI_KEY in environment.
 *
 * Called from: /api/admin/seo/serp/fetch route
 */
export async function fetchSerpFromSerpApi(
  keyword: string,
  options: { gl?: string; hl?: string; num?: number } = {},
): Promise<FetchSerpResponse> {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return { keyword, results: [], serpFeatures: [], error: "SERPAPI_KEY not configured" };
  }

  const params = new URLSearchParams({
    q: keyword,
    api_key: apiKey,
    engine: "google",
    gl: options.gl || "us",
    hl: options.hl || "en",
    num: String(options.num || 100),
  });

  try {
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    if (!res.ok) {
      return { keyword, results: [], serpFeatures: [], error: `SerpApi HTTP ${res.status}` };
    }

    const data = await res.json();
    const serpFeatures = detectSerpFeatures(data);

    const organicResults: SerpApiResult[] = (data.organic_results || []).map(
      (r: { position: number; link: string; title: string; snippet?: string }) => ({
        position: r.position,
        url: r.link,
        domain: extractDomain(r.link),
        title: r.title,
        description: r.snippet || null,
      }),
    );

    return { keyword, results: organicResults, serpFeatures };
  } catch (err) {
    return {
      keyword,
      results: [],
      serpFeatures: [],
      error: err instanceof Error ? err.message : "Fetch failed",
    };
  }
}

/**
 * Fetch SERP results for a single keyword using DataForSEO.
 * Requires DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in environment.
 */
export async function fetchSerpFromDataForSeo(
  keyword: string,
  options: { locationCode?: number; languageCode?: string } = {},
): Promise<FetchSerpResponse> {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    return { keyword, results: [], serpFeatures: [], error: "DataForSEO credentials not configured" };
  }

  const auth = Buffer.from(`${login}:${password}`).toString("base64");

  try {
    const res = await fetch("https://api.dataforseo.com/v3/serp/google/organic/live/advanced", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          keyword,
          location_code: options.locationCode || 2840, // US
          language_code: options.languageCode || "en",
          depth: 100,
        },
      ]),
    });

    if (!res.ok) {
      return { keyword, results: [], serpFeatures: [], error: `DataForSEO HTTP ${res.status}` };
    }

    const data = await res.json();
    const task = data?.tasks?.[0];
    if (!task || task.status_code !== 20000) {
      return { keyword, results: [], serpFeatures: [], error: task?.status_message || "Unknown error" };
    }

    const items = task.result?.[0]?.items || [];
    const serpFeatures = detectSerpFeatures({ items });

    const organicResults: SerpApiResult[] = items
      .filter((i: { type: string }) => i.type === "organic")
      .map((r: { rank_absolute: number; url: string; domain: string; title: string; description?: string }) => ({
        position: r.rank_absolute,
        url: r.url,
        domain: extractDomain(r.url),
        title: r.title,
        description: r.description || null,
      }));

    return { keyword, results: organicResults, serpFeatures };
  } catch (err) {
    return {
      keyword,
      results: [],
      serpFeatures: [],
      error: err instanceof Error ? err.message : "Fetch failed",
    };
  }
}

/**
 * Fetch SERPs using whichever provider is configured.
 * Checks SERPAPI_KEY first, then DATAFORSEO_LOGIN.
 * Falls back to error if neither is set.
 */
export async function fetchSerp(
  keyword: string,
  options: { gl?: string; hl?: string; num?: number } = {},
): Promise<FetchSerpResponse> {
  if (process.env.SERPAPI_KEY) {
    return fetchSerpFromSerpApi(keyword, options);
  }
  if (process.env.DATAFORSEO_LOGIN) {
    return fetchSerpFromDataForSeo(keyword, {
      locationCode: options.gl === "us" ? 2840 : undefined,
      languageCode: options.hl,
    });
  }
  return {
    keyword,
    results: [],
    serpFeatures: [],
    error: "No SERP API configured. Set SERPAPI_KEY or DATAFORSEO_LOGIN in environment.",
  };
}

// ── Keyword Metrics (Volume, KD, CPC) ───────────
// DataForSEO provides keyword metrics via separate endpoints:
// - /v3/keywords_data/google_ads/search_volume/live → volume, CPC, competition
// - /v3/dataforseo_labs/google/keyword_difficulty/live → difficulty score

export interface KeywordMetrics {
  term: string;
  volume: number | null;
  difficulty: number | null;
  cps: number | null;
  competition: number | null;
  cpc: number | null;
  intent: string | null;
  error?: string;
}

/**
 * Fetch search volume and CPC for a batch of keywords via DataForSEO.
 * Accepts up to 700 keywords per call.
 */
export async function fetchKeywordVolume(
  keywords: string[],
  options: { locationCode?: number; languageCode?: string } = {},
): Promise<Map<string, { volume: number; cpc: number; competition: number }>> {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  const result = new Map<string, { volume: number; cpc: number; competition: number }>();
  if (!login || !password || keywords.length === 0) return result;

  const auth = Buffer.from(`${login}:${password}`).toString("base64");

  try {
    const res = await fetch("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{
        keywords,
        location_code: options.locationCode || 2840,
        language_code: options.languageCode || "en",
      }]),
    });

    if (!res.ok) return result;
    const data = await res.json();
    const task = data?.tasks?.[0];
    if (!task || task.status_code !== 20000) return result;

    for (const item of task.result || []) {
      if (item.keyword) {
        result.set(item.keyword.toLowerCase(), {
          volume: item.search_volume ?? 0,
          cpc: item.cpc ?? 0,
          competition: item.competition ?? 0,
        });
      }
    }
  } catch { /* ignore */ }

  return result;
}

/**
 * Fetch keyword difficulty scores via DataForSEO Labs.
 * Accepts up to 1000 keywords per call.
 */
export async function fetchKeywordDifficulty(
  keywords: string[],
  options: { locationCode?: number; languageCode?: string } = {},
): Promise<Map<string, number>> {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  const result = new Map<string, number>();
  if (!login || !password || keywords.length === 0) return result;

  const auth = Buffer.from(`${login}:${password}`).toString("base64");

  try {
    const res = await fetch("https://api.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{
        keywords,
        location_code: options.locationCode || 2840,
        language_code: options.languageCode || "en",
      }]),
    });

    if (!res.ok) return result;
    const data = await res.json();
    const task = data?.tasks?.[0];
    if (!task || task.status_code !== 20000) return result;

    for (const resultGroup of task.result || []) {
      for (const item of resultGroup?.items || []) {
        if (item.keyword && item.keyword_difficulty != null) {
          result.set(item.keyword.toLowerCase(), Math.round(item.keyword_difficulty));
        }
      }
    }
  } catch { /* ignore */ }

  return result;
}

/**
 * Fetch keyword search intent via DataForSEO Labs.
 * Returns a map of term → intent label (INFORMATIONAL, COMMERCIAL, TRANSACTIONAL, NAVIGATIONAL).
 */
export async function fetchKeywordIntent(
  keywords: string[],
  options: { languageCode?: string } = {},
): Promise<Map<string, string>> {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  const result = new Map<string, string>();
  if (!login || !password || keywords.length === 0) return result;

  const auth = Buffer.from(`${login}:${password}`).toString("base64");

  try {
    const res = await fetch("https://api.dataforseo.com/v3/dataforseo_labs/google/search_intent/live", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{
        keywords,
        language_code: options.languageCode || "en",
      }]),
    });

    if (!res.ok) return result;
    const data = await res.json();
    const task = data?.tasks?.[0];
    if (!task || task.status_code !== 20000) return result;

    for (const resultGroup of task.result || []) {
      for (const item of resultGroup?.items || []) {
        if (item.keyword && item.keyword_intent?.label) {
          const label = item.keyword_intent.label.toUpperCase();
          const mapped = label === "COMMERCIAL" ? "COMMERCIAL"
            : label === "TRANSACTIONAL" ? "TRANSACTIONAL"
            : label === "NAVIGATIONAL" ? "NAVIGATIONAL"
            : "INFORMATIONAL";
          result.set(item.keyword.toLowerCase(), mapped);
        }
      }
    }
  } catch { /* ignore */ }

  return result;
}

/**
 * Fetch all keyword metrics (volume + difficulty + intent) in parallel.
 * Returns a map of term → metrics.
 */
export async function fetchAllKeywordMetrics(
  keywords: string[],
  options: { locationCode?: number; languageCode?: string } = {},
): Promise<Map<string, KeywordMetrics>> {
  const [volumeMap, difficultyMap, intentMap] = await Promise.all([
    fetchKeywordVolume(keywords, options),
    fetchKeywordDifficulty(keywords, options),
    fetchKeywordIntent(keywords, { languageCode: options.languageCode }),
  ]);

  const result = new Map<string, KeywordMetrics>();
  for (const term of keywords) {
    const lower = term.toLowerCase();
    const vol = volumeMap.get(lower);
    const kd = difficultyMap.get(lower);
    const intent = intentMap.get(lower);
    result.set(lower, {
      term: lower,
      volume: vol?.volume ?? null,
      difficulty: kd ?? null,
      cps: vol?.cpc ?? null,
      competition: vol?.competition ?? null,
      cpc: vol?.cpc ?? null,
      intent: intent ?? null,
    });
  }

  return result;
}

/**
 * Parse a CSV/TSV line of SERP data (for manual imports).
 * Expected format: position\turl\ttitle\tdescription
 */
export function parseSerpCsvLine(line: string): SerpApiResult | null {
  const parts = line.split("\t");
  if (parts.length < 3) return null;
  const position = parseInt(parts[0]);
  const url = parts[1]?.trim();
  const title = parts[2]?.trim();
  const description = parts[3]?.trim() || null;
  if (!position || !url || !title) return null;
  return { position, url, domain: extractDomain(url), title, description };
}
