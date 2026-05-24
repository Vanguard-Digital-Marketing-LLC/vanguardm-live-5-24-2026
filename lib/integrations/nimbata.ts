import { readFileSync } from "fs";

const NIMBATA_PROXY = "https://nimbata-proxy.james-fcd.workers.dev";

export interface CallsData {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  avgDurationSeconds: number;
  callsByDay: { date: string; count: number }[];
  topSources: { source: string; calls: number }[];
  recentCalls: { date: string; caller: string; duration: number; status: string }[];
}

function readCredential(path: string): string {
  return readFileSync(path, "utf-8").trim();
}

function parseDuration(dur: string): number {
  // "00:04:40" → 280 seconds
  const parts = dur.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

export async function fetchNimbataCalls(
  projectId: string,
  startDate: string,
  endDate: string
): Promise<CallsData> {
  const apiKey = readCredential("/home/vanguardm/.nimbata-api-key");
  const accountId = readCredential("/home/vanguardm/.nimbata-account-token");

  const url = `${NIMBATA_PROXY}/v1/a/${accountId}/project/${projectId}/activity/call`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      filters: { call_date: { from: startDate, to: endDate } },
      per_page: 500,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Nimbata API error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  const calls: {
    date?: string;
    outcome?: string;
    caller?: string;
    caller_name?: string;
    call_duration?: string;
    talk_duration?: string;
    source_type?: string;
    source?: string;
    medium?: string;
  }[] = json.data || [];

  let totalCalls = 0;
  let answeredCalls = 0;
  let missedCalls = 0;
  let totalDuration = 0;

  const dayMap: Record<string, number> = {};
  const sourceMap: Record<string, number> = {};
  const recentCalls: CallsData["recentCalls"] = [];

  for (const call of calls) {
    totalCalls++;
    const outcome = (call.outcome || "").toUpperCase();
    const duration = parseDuration(call.talk_duration || "00:00:00");

    if (outcome === "ANSWERED" || duration > 0) {
      answeredCalls++;
      totalDuration += duration;
    } else {
      missedCalls++;
    }

    // Group by day
    const dateStr = call.date || "";
    if (dateStr) {
      dayMap[dateStr] = (dayMap[dateStr] || 0) + 1;
    }

    // Group by source
    const source = call.source_type || call.medium || call.source || "Direct";
    sourceMap[source] = (sourceMap[source] || 0) + 1;

    // Recent calls (first 20)
    if (recentCalls.length < 20) {
      recentCalls.push({
        date: dateStr,
        caller: call.caller || call.caller_name || "Unknown",
        duration,
        status: outcome === "ANSWERED" || duration > 0 ? "Answered" : "Missed",
      });
    }
  }

  const callsByDay = Object.entries(dayMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date: date.slice(5).replace("-", "/"),
      count,
    }));

  const topSources = Object.entries(sourceMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([source, calls]) => ({ source, calls }));

  return {
    totalCalls,
    answeredCalls,
    missedCalls,
    avgDurationSeconds: answeredCalls > 0 ? Math.round(totalDuration / answeredCalls) : 0,
    callsByDay,
    topSources,
    recentCalls,
  };
}
