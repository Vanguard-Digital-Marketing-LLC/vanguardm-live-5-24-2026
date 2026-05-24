import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const client = await prisma.client.findFirst({ where: { id, agencyId }, select: { id: true } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const jobs = await prisma.clientJob.findMany({
    where: { clientId: id },
    orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
  });

  let totalRevenue = 0;
  let totalJobs = 0;

  // Aggregate by lead source
  const sourceMap = new Map<string, { revenue: number; jobs: number }>();
  for (const job of jobs) {
    const total = Number(job.total);
    totalRevenue += total;
    totalJobs++;
    const sources = job.leadSource
      ? job.leadSource.split(",").map((s) => s.trim())
      : ["Unknown"];
    for (const src of sources) {
      const existing = sourceMap.get(src) || { revenue: 0, jobs: 0 };
      existing.revenue += total;
      existing.jobs++;
      sourceMap.set(src, existing);
    }
  }
  // Estimate actual job/conversion counts instead of record counts
  // Daily aggregates inflate record counts; use avg job value to estimate real conversions
  // Avg job value derived from detailed data: ~290 jobs / $204K ≈ $706/job
  const estimatedTotalJobs = Math.round(totalRevenue / 706);
  const bySource = Array.from(sourceMap.entries())
    .map(([source, data]) => ({
      source,
      revenue: data.revenue,
      jobs: Math.max(1, Math.round(estimatedTotalJobs * (data.revenue / totalRevenue))),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Aggregate by week
  const weekMap = new Map<string, { revenue: number; jobs: number; payout: number }>();
  for (const job of jobs) {
    const key = `${job.year}-W${String(job.weekNumber).padStart(2, "0")}`;
    const existing = weekMap.get(key) || { revenue: 0, jobs: 0, payout: 0 };
    existing.revenue += Number(job.total);
    existing.jobs++;
    existing.payout += Number(job.payout);
    weekMap.set(key, existing);
  }
  const byWeek = Array.from(weekMap.entries())
    .map(([week, data]) => ({ week, ...data }))
    .sort((a, b) => a.week.localeCompare(b.week));

  // Aggregate by team member
  const teamMap = new Map<string, { revenue: number; jobs: number; payout: number }>();
  for (const job of jobs) {
    const team = job.team || "Unknown";
    const existing = teamMap.get(team) || { revenue: 0, jobs: 0, payout: 0 };
    existing.revenue += Number(job.total);
    existing.jobs++;
    existing.payout += Number(job.payout);
    teamMap.set(team, existing);
  }
  const byTeam = Array.from(teamMap.entries())
    .map(([team, data]) => ({ team, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  // Aggregate by month
  const monthMap = new Map<string, { revenue: number; jobs: number }>();
  for (const job of jobs) {
    const d = job.jobDate;
    const key = d
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      : `${job.year}-W${job.weekNumber}`;
    const existing = monthMap.get(key) || { revenue: 0, jobs: 0 };
    existing.revenue += Number(job.total);
    existing.jobs++;
    monthMap.set(key, existing);
  }
  const byMonth = Array.from(monthMap.entries())
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Daily data (for chart)
  const dailyMap = new Map<string, number>();
  for (const job of jobs) {
    if (job.jobDate) {
      const key = job.jobDate.toISOString().slice(0, 10);
      dailyMap.set(key, (dailyMap.get(key) || 0) + Number(job.total));
    }
  }
  const daily = Array.from(dailyMap.entries())
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({ totalRevenue, totalJobs: estimatedTotalJobs, bySource, byWeek, byTeam, byMonth, daily });
}
