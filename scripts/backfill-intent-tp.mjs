import "dotenv/config";
import pg from "pg";
const { Client } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set — add it to .env");
}
const AUTH = process.env.DATAFORSEO_AUTH;
if (!AUTH) {
  throw new Error("DATAFORSEO_AUTH is not set — add it to .env");
}

const db = new Client({ connectionString });

await db.connect();

// 1. Get all keywords
const { rows: keywords } = await db.query('SELECT id, term, volume FROM "Keyword" ORDER BY term');
const terms = keywords.map(k => k.term);
console.log(`Fetching intent for ${terms.length} keywords...`);

// 2. Fetch search intent
const intentRes = await fetch("https://api.dataforseo.com/v3/dataforseo_labs/google/search_intent/live", {
  method: "POST",
  headers: { Authorization: `Basic ${AUTH}`, "Content-Type": "application/json" },
  body: JSON.stringify([{ keywords: terms, language_code: "en" }]),
});
const intentData = await intentRes.json();
const intentTask = intentData?.tasks?.[0];
console.log("Intent status:", intentTask?.status_code, intentTask?.status_message);

const intentMap = new Map();
for (const group of intentTask?.result || []) {
  for (const item of group?.items || []) {
    if (item.keyword && item.keyword_intent?.label) {
      const label = item.keyword_intent.label.toUpperCase();
      intentMap.set(item.keyword.toLowerCase(), label);
    }
  }
}
console.log(`Got intent for ${intentMap.size} keywords`);

// 3. Calculate Traffic Potential from SERP data
// TP = total traffic the #1 page gets from ALL keywords it ranks for
// For each keyword, find the #1 URL, then sum estimated traffic from all keywords where that URL ranks
const CTR = { 1: 0.317, 2: 0.243, 3: 0.187, 4: 0.088, 5: 0.063, 6: 0.047, 7: 0.035, 8: 0.028, 9: 0.022, 10: 0.018 };
function getCTR(pos) { if (pos <= 10) return CTR[pos] || 0; if (pos <= 20) return 0.01; return 0.005; }

// Get all SERP results with keyword volumes
const { rows: serpResults } = await db.query(`
  SELECT sr."keywordId", sr.position, sr.url, k.volume, k.term
  FROM "SerpResult" sr
  JOIN "Keyword" k ON k.id = sr."keywordId"
  WHERE sr.position <= 100
  ORDER BY sr."keywordId", sr.position
`);

// For each keyword, find the #1 URL
const topUrlByKeyword = new Map();
for (const r of serpResults) {
  if (!topUrlByKeyword.has(r.keywordId) || r.position < topUrlByKeyword.get(r.keywordId).position) {
    topUrlByKeyword.set(r.keywordId, { url: r.url, position: r.position });
  }
}

// For each URL, sum all estimated traffic from all keywords it ranks for
const trafficByUrl = new Map();
for (const r of serpResults) {
  const vol = r.volume || 0;
  const traffic = Math.round(vol * getCTR(r.position));
  const current = trafficByUrl.get(r.url) || 0;
  trafficByUrl.set(r.url, current + traffic);
}

// TP for each keyword = total traffic of its #1 URL
const tpMap = new Map();
for (const [kwId, top] of topUrlByKeyword) {
  tpMap.set(kwId, trafficByUrl.get(top.url) || 0);
}
console.log(`Calculated TP for ${tpMap.size} keywords`);

// 4. Update all keywords
let updated = 0;
for (const kw of keywords) {
  const intent = intentMap.get(kw.term);
  const tp = tpMap.get(kw.id);

  const updates = [];
  const values = [];
  let idx = 1;

  if (intent) {
    updates.push(`intent = $${idx++}::"KeywordIntent"`);
    values.push(intent);
  }
  if (tp != null && tp > 0) {
    updates.push(`"trafficPotential" = $${idx++}`);
    values.push(tp);
  }
  // Fix source
  updates.push(`source = $${idx++}::"KeywordSource"`);
  values.push("CSV_IMPORT");

  updates.push(`"updatedAt" = NOW()`);

  if (updates.length > 1) {
    values.push(kw.id);
    await db.query(`UPDATE "Keyword" SET ${updates.join(", ")} WHERE id = $${idx}`, values);
    updated++;
    if (intent || tp) {
      console.log(`  ${kw.term}: intent=${intent || '-'}, TP=${tp || 0}`);
    }
  }
}
console.log(`\nUpdated ${updated} keywords`);

// Show sample
const { rows: top } = await db.query('SELECT term, volume, difficulty, intent, "trafficPotential", source FROM "Keyword" WHERE volume > 0 ORDER BY volume DESC LIMIT 10');
console.log("\nTop 10:");
console.table(top);

await db.end();
