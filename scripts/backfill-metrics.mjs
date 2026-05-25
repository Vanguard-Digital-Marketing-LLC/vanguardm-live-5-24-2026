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
const { rows: keywords } = await db.query('SELECT id, term FROM "Keyword" ORDER BY term');
console.log(`Fetching metrics for ${keywords.length} keywords...`);

const terms = keywords.map(k => k.term);

// 1. Search volume + CPC
console.log("Calling search_volume API...");
const volRes = await fetch("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live", {
  method: "POST",
  headers: { Authorization: `Basic ${AUTH}`, "Content-Type": "application/json" },
  body: JSON.stringify([{ keywords: terms, location_code: 2840, language_code: "en" }]),
});
const volData = await volRes.json();
const volTask = volData?.tasks?.[0];
console.log("Volume status:", volTask?.status_code, volTask?.status_message);

const volMap = new Map();
for (const item of volTask?.result || []) {
  if (item.keyword) volMap.set(item.keyword.toLowerCase(), { volume: item.search_volume || 0, cpc: item.cpc || 0 });
}
console.log(`Got volume for ${volMap.size} keywords`);

// 2. Keyword difficulty
console.log("Calling bulk_keyword_difficulty API...");
const kdRes = await fetch("https://api.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", {
  method: "POST",
  headers: { Authorization: `Basic ${AUTH}`, "Content-Type": "application/json" },
  body: JSON.stringify([{ keywords: terms, location_code: 2840, language_code: "en" }]),
});
const kdData = await kdRes.json();
const kdTask = kdData?.tasks?.[0];
console.log("KD status:", kdTask?.status_code, kdTask?.status_message);

const kdMap = new Map();
for (const resultGroup of kdTask?.result || []) {
  for (const item of resultGroup?.items || []) {
    if (item.keyword && item.keyword_difficulty != null) {
      kdMap.set(item.keyword.toLowerCase(), Math.round(item.keyword_difficulty));
    }
  }
}
console.log(`Got difficulty for ${kdMap.size} keywords`);

// 3. Update DB
let updated = 0;
for (const kw of keywords) {
  const vol = volMap.get(kw.term);
  const kd = kdMap.get(kw.term);
  const volume = vol?.volume ?? null;
  const difficulty = kd ?? null;
  const cpc = vol?.cpc ? parseFloat(vol.cpc.toFixed(2)) : null;

  await db.query(
    `UPDATE "Keyword" SET volume = $1, difficulty = $2, cps = $3, "lastMetricsUpdate" = NOW(), "updatedAt" = NOW() WHERE id = $4`,
    [volume, difficulty, cpc, kw.id]
  );
  updated++;
  if (volume || difficulty) {
    console.log(`  ${kw.term}: vol=${volume}, KD=${difficulty}, CPC=$${cpc}`);
  }
}
console.log(`\nUpdated ${updated} keywords.`);

// Show top 10
const { rows: top } = await db.query('SELECT term, volume, difficulty, cps FROM "Keyword" WHERE volume > 0 ORDER BY volume DESC LIMIT 10');
console.log("\nTop 10 by volume:");
console.table(top);

await db.end();
