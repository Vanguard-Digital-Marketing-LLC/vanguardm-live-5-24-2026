import { escapeHtml } from "@/lib/email";

export interface AgencyBranding {
  name: string;
  slug: string;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  fromEmail: string | null;
}

export interface ReportData {
  id: string;
  title: string;
  summary: string | null;
  startDate: Date | string;
  endDate: Date | string;
  client: { name: string };
  sections: { type: string; title: string; data: Record<string, unknown>; notes: string | null }[];
}

/**
 * Build AgencyBranding from a Prisma agency record.
 * Resolves relative logo URLs to absolute subdomain URLs.
 */
export function buildAgencyBranding(agency: {
  name: string;
  slug: string;
  logoUrl: string | null;
  primaryColor: string | null;
  accentColor: string | null;
  fromEmail: string | null;
}): AgencyBranding {
  return {
    name: agency.name,
    slug: agency.slug,
    logoUrl: agency.logoUrl
      ? (agency.logoUrl.startsWith("http") ? agency.logoUrl : `https://${agency.slug}.vanguardm.com${agency.logoUrl}`)
      : null,
    primaryColor: agency.primaryColor || "#e74c3c",
    accentColor: agency.accentColor || "#f39c12",
    fromEmail: agency.fromEmail,
  };
}

function renderKpi(label: string, value: string, colorClass: string, sub?: string): string {
  return `<div class="kpi ${colorClass}"><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(value)}</div>${sub ? `<div class="sub">${escapeHtml(sub)}</div>` : ""}</div>`;
}

function renderSection(section: { type: string; title: string; data: Record<string, unknown>; notes: string | null }, brandColor: string): string {
  const d = section.data;
  let content = "";

  switch (section.type) {
    case "TRAFFIC": {
      content = `<div class="kpi-grid">
        ${renderKpi("Sessions", String((d.sessions as number) || 0), "blue")}
        ${renderKpi("Pageviews", String((d.pageviews as number) || 0), "gold")}
        ${renderKpi("Bounce Rate", `${(d.bounceRate as number) || 0}%`, "red")}
        ${renderKpi("Avg. Duration", String((d.avgSessionDuration as string) || "0:00"), "green")}
      </div>`;
      // Source Breakdown
      const sources = (d.sourceBreakdown as { source: string; sessions: number; percentage: number }[]) || [];
      if (sources.length > 0) {
        content += `<h3>Traffic Sources</h3><div style="overflow-x:auto;"><table class="tbl"><thead><tr>
          <th>Source</th><th style="text-align:right">Sessions</th><th style="text-align:right">%</th></tr></thead><tbody>`;
        for (const s of sources) {
          content += `<tr><td>${escapeHtml(s.source)}</td><td style="text-align:right">${s.sessions.toLocaleString()}</td><td style="text-align:right">${s.percentage}%</td></tr>`;
        }
        content += "</tbody></table></div>";
      }
      // Top Pages
      const tPages = (d.topPages as { page: string; views: number; bounceRate: number }[]) || [];
      if (tPages.length > 0) {
        content += `<h3>Top Pages</h3><div style="overflow-x:auto;"><table class="tbl"><thead><tr>
          <th>Page</th><th style="text-align:right">Views</th><th style="text-align:right">Bounce Rate</th></tr></thead><tbody>`;
        for (const p of tPages) {
          content += `<tr><td style="font-family:monospace;font-size:0.78rem;">${escapeHtml(p.page)}</td><td style="text-align:right">${p.views.toLocaleString()}</td><td style="text-align:right">${p.bounceRate}%</td></tr>`;
        }
        content += "</tbody></table></div>";
      }
      break;
    }
    case "ADS": {
      const totalRevenue = (d.totalRevenue as number) || 0;
      const adSpend = (d.spend as number) || 0;
      content = `<div class="kpi-grid">
        ${renderKpi("Ad Spend", `$${adSpend.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, "red")}
        ${totalRevenue > 0 ? renderKpi("Revenue", `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, "green") : ""}
        ${renderKpi("Clicks", String((d.clicks as number) || 0), "blue")}
        ${renderKpi("Conversions", String((d.conversions as number) || 0), "gold")}
        ${totalRevenue > 0 && adSpend > 0 ? renderKpi("ROAS", `${(totalRevenue / adSpend).toFixed(1)}x`, "green") : renderKpi("CPA", `$${((d.cpa as number) || 0).toFixed(2)}`, "green")}
      </div>`;
      const campaigns = (d.campaigns as { name: string; spend: number; clicks: number; conversions: number; roas: number }[]) || [];
      if (campaigns.length > 0) {
        content += `<div style="overflow-x:auto;margin-top:16px;"><table class="tbl"><thead><tr>
          <th>Campaign</th><th style="text-align:right">Spend</th><th style="text-align:right">Clicks</th>
          <th style="text-align:right">Conv.</th><th style="text-align:right">ROAS</th></tr></thead><tbody>`;
        for (const c of campaigns) {
          content += `<tr><td>${escapeHtml(c.name)}</td><td style="text-align:right">$${c.spend.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td style="text-align:right">${c.clicks}</td><td style="text-align:right">${c.conversions}</td>
            <td style="text-align:right">${c.roas}x</td></tr>`;
        }
        content += "</tbody></table></div>";
      }
      // Revenue by Source
      const revSources = (d.revenueBySource as { source: string; revenue: number; jobs: number }[]) || [];
      if (revSources.length > 0) {
        const maxRev = revSources[0]?.revenue || 1;
        content += `<h3>Revenue by Source</h3><p style="font-size:0.78rem;color:#64748b;">${(d.totalJobs as number) || 0} jobs &middot; $${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })} total</p>`;
        content += `<div style="margin-top:8px;">`;
        for (const s of revSources) {
          const pct = (s.revenue / maxRev) * 100;
          content += `<div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:0.85rem;font-weight:500;">${escapeHtml(s.source)}</span>
              <span style="font-size:0.78rem;"><span style="color:#64748b;margin-right:8px;">${s.jobs} jobs</span><span style="color:#10b981;font-weight:600;">$${s.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></span>
            </div>
            <div style="height:6px;background:#f1f5f9;border-radius:999px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:999px;"></div>
            </div>
          </div>`;
        }
        content += `</div>`;
      }
      break;
    }
    case "SEO": {
      const domainScore = (d.domainStrength as number) || (d.domainAuthority as number) || 0;
      const indexedPages = (d.totalIndexedPages as number) || (d.newBacklinks as number) || 0;
      const kwRankings = (d.keywordRankings as { keyword: string; position: number; previousPosition: number; url: string }[]) || [];
      const landingPages = (d.topLandingPages as { page: string; sessions: number; conversions: number }[]) || [];
      const geoData = (d.geoBreakdown as { city: string; region: string; sessions: number; pageviews: number }[]) || [];

      content = `<div class="kpi-grid">
        ${renderKpi("Organic Traffic", String((d.organicTraffic as number) || 0), "green", (d.organicTrafficChange as number) ? `${(d.organicTrafficChange as number) > 0 ? "+" : ""}${d.organicTrafficChange}%` : undefined)}
        ${renderKpi("Domain Strength", `${domainScore}/100`, "blue")}
        ${renderKpi("Indexed Pages", String(indexedPages), "gold")}
        ${renderKpi("Keywords Tracked", String(kwRankings.length), "red")}
      </div>`;

      // Keyword Rankings Table
      if (kwRankings.length > 0) {
        content += `<h3>Keyword Rankings</h3><div style="overflow-x:auto;"><table class="tbl"><thead><tr>
          <th>Keyword</th><th style="text-align:center">Position</th><th style="text-align:center">Change</th><th>Page</th></tr></thead><tbody>`;
        for (const kw of kwRankings) {
          const diff = kw.previousPosition - kw.position;
          const posColor = kw.position <= 3 ? "#10b981" : kw.position <= 10 ? "#f59e0b" : "#94a3b8";
          const changeHtml = diff === 0 || kw.previousPosition === 0
            ? `<span style="color:#64748b;">&mdash;</span>`
            : diff > 0
              ? `<span style="color:#10b981;">+${diff}</span>`
              : `<span style="color:#ef4444;">${diff}</span>`;
          content += `<tr>
            <td style="font-weight:500;">${escapeHtml(kw.keyword)}</td>
            <td style="text-align:center;"><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(${posColor === "#10b981" ? "16,185,129" : posColor === "#f59e0b" ? "245,158,11" : "148,163,184"},0.12);color:${posColor};font-weight:700;font-size:0.82rem;">${kw.position}</span></td>
            <td style="text-align:center;font-size:0.78rem;font-weight:600;">${changeHtml}</td>
            <td style="font-family:monospace;font-size:0.72rem;color:#64748b;">${escapeHtml(kw.url)}</td>
          </tr>`;
        }
        content += "</tbody></table></div>";
      }

      // Geographic Breakdown
      if (geoData.length > 0) {
        const maxSessions = geoData[0]?.sessions || 1;
        content += `<h3>Traffic by Area</h3><div style="margin-top:8px;">`;
        for (const geo of geoData) {
          const pct = Math.round((geo.sessions / maxSessions) * 100);
          const label = geo.region ? `${escapeHtml(geo.city)}, ${escapeHtml(geo.region)}` : escapeHtml(geo.city);
          content += `<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <div style="width:180px;font-size:0.75rem;color:#cbd5e1;text-align:right;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${label}</div>
            <div style="flex:1;height:20px;background:rgba(255,255,255,0.03);border-radius:4px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,rgba(16,185,129,0.7),rgba(16,185,129,0.4));border-radius:4px;"></div>
            </div>
            <div style="width:50px;font-size:0.72rem;color:#94a3b8;font-weight:600;">${geo.sessions.toLocaleString()}</div>
          </div>`;
        }
        content += "</div>";
      }

      // Top Landing Pages Table
      if (landingPages.length > 0) {
        content += `<h3>Top Organic Landing Pages</h3><div style="overflow-x:auto;"><table class="tbl"><thead><tr>
          <th>Page</th><th style="text-align:right">Sessions</th><th style="text-align:right">Conversions</th></tr></thead><tbody>`;
        for (const lp of landingPages) {
          content += `<tr>
            <td style="font-family:monospace;font-size:0.78rem;">${escapeHtml(lp.page)}</td>
            <td style="text-align:right;">${lp.sessions.toLocaleString()}</td>
            <td style="text-align:right;color:#10b981;font-weight:600;">${lp.conversions}</td>
          </tr>`;
        }
        content += "</tbody></table></div>";
      }
      break;
    }
    case "SOCIAL": {
      content = `<div class="kpi-grid">
        ${renderKpi("Followers", String((d.followers as number) || 0), "blue")}
        ${renderKpi("Engagement", `${(d.engagementRate as number) || 0}%`, "green")}
        ${renderKpi("Reach", String((d.reach as number) || 0), "gold")}
        ${renderKpi("Impressions", String((d.impressions as number) || 0), "red")}
      </div>`;
      break;
    }
    case "CALLS": {
      const totalCalls = (d.totalCalls as number) || 0;
      const answered = (d.answered as number) || 0;
      const missed = (d.missed as number) || 0;
      const avgDuration = (d.avgDuration as string) || "0:00";
      content = `<div class="kpi-grid">
        ${renderKpi("Total Calls", String(totalCalls), "blue")}
        ${renderKpi("Answered", String(answered), "green")}
        ${renderKpi("Missed", String(missed), "red")}
        ${renderKpi("Avg. Duration", avgDuration, "gold")}
      </div>`;
      const calls = (d.calls as { date: string; number: string; duration: string; status: string }[]) || [];
      if (calls.length > 0) {
        content += `<div style="overflow-x:auto;margin-top:16px;"><table class="tbl"><thead><tr>
          <th>Date</th><th>Number</th><th style="text-align:right">Duration</th><th style="text-align:right">Status</th></tr></thead><tbody>`;
        for (const c of calls) {
          content += `<tr><td>${escapeHtml(c.date)}</td><td>${escapeHtml(c.number)}</td>
            <td style="text-align:right">${escapeHtml(c.duration)}</td>
            <td style="text-align:right">${escapeHtml(c.status)}</td></tr>`;
        }
        content += "</tbody></table></div>";
      }
      break;
    }
    case "MARKETING": {
      const strategyLabels: Record<string, string> = {
        content: "Content Marketing", ppc: "PPC / Paid Advertising", social: "Social Media",
        full_funnel: "Full Funnel Strategy", seo: "SEO Strategy", email: "Email Marketing",
      };
      const strategyType = (d.strategyType as string) || "full_funnel";
      const budget = (d.budgetRecommendation as string) || "";
      const recommendations = (d.recommendations as string) || "";
      const kpis = (d.kpis as { metric: string; target: string; current: string }[]) || [];
      const timeline = (d.timeline as { phase: string; description: string; duration: string }[]) || [];

      content = `<div class="kpi-grid">
        ${renderKpi("Strategy", strategyLabels[strategyType] || strategyType, "blue")}
        ${budget ? renderKpi("Budget", budget, "gold") : ""}
        ${renderKpi("KPIs", String(kpis.length), "green")}
        ${renderKpi("Phases", String(timeline.length), "red")}
      </div>`;

      if (recommendations) {
        content += `<div class="exec" style="margin-top:16px;">${recommendations.split("\n").map((l) => `<p>${escapeHtml(l) || "&nbsp;"}</p>`).join("")}</div>`;
      }

      if (kpis.length > 0) {
        content += `<h3>Target KPIs</h3><div style="overflow-x:auto;"><table class="tbl"><thead><tr>
          <th>Metric</th><th style="text-align:right">Current</th><th style="text-align:right">Target</th></tr></thead><tbody>`;
        for (const kpi of kpis) {
          content += `<tr><td>${escapeHtml(kpi.metric)}</td><td style="text-align:right">${escapeHtml(kpi.current)}</td><td style="text-align:right;color:#27ae60;font-weight:600">${escapeHtml(kpi.target)}</td></tr>`;
        }
        content += "</tbody></table></div>";
      }

      if (timeline.length > 0) {
        const colors = [brandColor, "#f39c12", "#3498db", "#27ae60", "#8b5cf6", "#ec4899"];
        content += `<h3>Implementation Timeline</h3><div style="margin-top:12px;">`;
        for (let i = 0; i < timeline.length; i++) {
          const p = timeline[i];
          content += `<div style="display:flex;gap:12px;margin-bottom:12px;">
            <div style="width:10px;height:10px;border-radius:50%;background:${colors[i % colors.length]};margin-top:5px;flex-shrink:0;"></div>
            <div><strong style="color:#fff;">${escapeHtml(p.phase)}</strong>
            ${p.duration ? `<span style="margin-left:8px;padding:2px 8px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:0.65rem;color:#94a3b8;">${escapeHtml(p.duration)}</span>` : ""}
            <p style="font-size:0.8rem;color:#94a3b8;margin-top:2px;">${escapeHtml(p.description)}</p></div></div>`;
        }
        content += "</div>";
      }
      break;
    }
    case "CUSTOM": {
      const customContent = (d.content as string) || "";
      if (customContent) {
        content = `<div style="font-size:0.85rem;line-height:1.7;color:rgba(255,255,255,0.85);">${customContent.split("\n").map((l) => `<p>${escapeHtml(l) || "&nbsp;"}</p>`).join("")}</div>`;
      }
      const kvPairs = (d.keyValuePairs as { key: string; value: string }[]) || [];
      if (kvPairs.length > 0) {
        content += `<div class="kpi-grid" style="margin-top:16px;">`;
        for (const kv of kvPairs) {
          content += renderKpi(kv.key, kv.value, "blue");
        }
        content += "</div>";
      }
      break;
    }
  }

  if (section.notes && section.type !== "CUSTOM") {
    content += `<div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);font-size:0.78rem;color:#64748b;">${section.notes.split("\n").map((l) => `<p>${escapeHtml(l)}</p>`).join("")}</div>`;
  }

  return `<div class="section"><h2>${escapeHtml(section.title)}</h2>${content}</div>`;
}

export function renderReportHtml(report: ReportData, agency: AgencyBranding): string {
  const primaryColor = agency.primaryColor || "#e74c3c";
  const accentColor = agency.accentColor || "#f39c12";

  const dateRange = `${new Date(report.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} &ndash; ${new Date(report.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
  const generated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const sectionsHtml = report.sections
    .map((s) => renderSection({ type: s.type, title: s.title, data: s.data, notes: s.notes }, primaryColor))
    .join("\n");

  const logoHtml = agency.logoUrl
    ? `<div class="agency-logo"><img src="${escapeHtml(agency.logoUrl)}" alt="${escapeHtml(agency.name)}" height="34"></div>`
    : `<div class="agency-logo" style="font-size:1.1rem;font-weight:800;color:rgba(255,255,255,0.9);letter-spacing:-0.02em;">${escapeHtml(agency.name)}</div>`;

  const footerLogoHtml = agency.logoUrl
    ? `<img src="${escapeHtml(agency.logoUrl)}" alt="${escapeHtml(agency.name)}" height="28" style="opacity:0.6;margin-bottom:10px;">`
    : `<p style="font-size:1rem;font-weight:700;opacity:0.6;margin-bottom:10px;">${escapeHtml(agency.name)}</p>`;

  const contactEmail = agency.fromEmail || "";
  const ctaHtml = contactEmail
    ? `<a href="mailto:${escapeHtml(contactEmail)}?subject=${encodeURIComponent(report.client.name + " Report")}" class="cta">Schedule Discussion</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(report.title)} | ${escapeHtml(agency.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
:root{--primary:#1a2f4e;--secondary:${primaryColor};--accent:#3498db;--gold:${accentColor};--success:#27ae60;--dark:#0a0f1a;--darker:#060b14;--light:#f8fafc;--gray-400:#94a3b8;--gray-500:#64748b;--gray-600:#475569;--glass:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.08);--shadow-card:0 4px 24px rgba(0,0,0,0.3);--radius:16px;--radius-sm:10px;}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--darker);color:var(--light);line-height:1.65;}
.wrap{max-width:1100px;margin:0 auto;padding:40px 36px 60px;}
.header{background:linear-gradient(160deg,#0d1a2e 0%,#1a2f4e 35%,#253d5c 65%,#1a2f4e 100%);border-radius:20px;padding:48px 52px;position:relative;overflow:hidden;border:1px solid var(--glass-border);margin-bottom:28px;}
.header::before{content:'';position:absolute;top:-60px;right:-40px;width:380px;height:380px;background:radial-gradient(circle,rgba(${hexToRgb(primaryColor)},0.10) 0%,transparent 65%);}
.header::after{content:'';position:absolute;bottom:-80px;left:20%;width:500px;height:500px;background:radial-gradient(circle,rgba(52,152,219,0.06) 0%,transparent 60%);}
.agency-logo{margin-bottom:16px;position:relative;z-index:1;}
.agency-logo img{height:34px;opacity:0.9;}
.header h1{font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.7) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px;position:relative;z-index:1;}
.header .subtitle{font-size:0.9rem;color:rgba(255,255,255,0.5);font-weight:400;position:relative;z-index:1;}
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px;}
.kpi{background:linear-gradient(145deg,rgba(26,47,78,0.6),rgba(10,15,26,0.95));border:1px solid var(--glass-border);border-radius:var(--radius);padding:22px 18px;text-align:center;}
.kpi .label{font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--gray-400);margin-bottom:6px;}
.kpi .value{font-size:1.6rem;font-weight:800;}
.kpi .sub{font-size:0.7rem;color:var(--gray-500);margin-top:4px;}
.kpi.red .value{color:var(--secondary);text-shadow:0 0 20px rgba(${hexToRgb(primaryColor)},0.3);}
.kpi.blue .value{color:var(--accent);text-shadow:0 0 20px rgba(52,152,219,0.3);}
.kpi.gold .value{color:var(--gold);text-shadow:0 0 20px rgba(${hexToRgb(accentColor)},0.3);}
.kpi.green .value{color:var(--success);text-shadow:0 0 20px rgba(39,174,96,0.3);}
.section{background:linear-gradient(145deg,rgba(26,47,78,0.4),rgba(10,15,26,0.95));border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-bottom:24px;}
.section h2{font-size:1rem;font-weight:700;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid rgba(${hexToRgb(primaryColor)},0.25);}
.section h3{font-size:0.9rem;font-weight:600;margin:18px 0 10px;color:rgba(255,255,255,0.85);}
.exec{border-left:4px solid var(--secondary);background:linear-gradient(145deg,rgba(${hexToRgb(primaryColor)},0.06),rgba(18,30,52,0.7));border-radius:0 var(--radius-sm) var(--radius-sm) 0;padding:22px 26px;font-size:0.85rem;line-height:1.8;}
.exec strong{color:#fff;}
.tbl{width:100%;border-collapse:collapse;font-size:0.78rem;}
.tbl th{text-align:left;padding:10px 8px;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--gray-400);border-bottom:2px solid rgba(${hexToRgb(primaryColor)},0.25);font-weight:600;}
.tbl td{padding:9px 8px;border-bottom:1px solid rgba(255,255,255,0.04);color:rgba(255,255,255,0.85);}
.tbl tr:hover td{background:rgba(255,255,255,0.03);}
.footer{text-align:center;padding:36px 20px;color:var(--gray-500);font-size:0.72rem;}
.footer .cta{display:inline-block;padding:14px 36px;background:linear-gradient(135deg,${primaryColor},${darkenColor(primaryColor)});color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:0.85rem;margin:18px 0;box-shadow:0 10px 35px rgba(${hexToRgb(primaryColor)},0.3);}
.footer .cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(${hexToRgb(primaryColor)},0.4);}
@media(max-width:768px){.wrap{padding:20px 16px 40px;}.header{padding:28px 24px;}.header h1{font-size:1.3rem;}.kpi-grid{grid-template-columns:1fr 1fr;}.section{padding:18px 14px;}}
@media(max-width:480px){.kpi-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<div class="wrap">
<div class="header">
${logoHtml}
<h1>${escapeHtml(report.client.name)} &mdash; ${escapeHtml(report.title)}</h1>
<div class="subtitle">${dateRange} &bull; Generated ${generated}</div>
</div>
${report.summary ? `<div class="exec"><strong>Summary:</strong> ${escapeHtml(report.summary)}</div>` : ""}
${sectionsHtml}
<div class="footer">
${footerLogoHtml}
<p style="margin-bottom:14px;">&copy; ${new Date().getFullYear()} ${escapeHtml(agency.name)}</p>
${ctaHtml}
<p style="margin-top:18px;font-size:0.62rem;color:var(--gray-600);">Report generated ${generated}</p>
</div>
</div>
</body></html>`;
}

/** Convert hex color to r,g,b string for rgba() usage */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) || 0;
  const g = parseInt(h.substring(2, 4), 16) || 0;
  const b = parseInt(h.substring(4, 6), 16) || 0;
  return `${r},${g},${b}`;
}

/** Darken a hex color by ~20% for gradient usage */
function darkenColor(hex: string): string {
  const h = hex.replace("#", "");
  const r = Math.max(0, Math.round((parseInt(h.substring(0, 2), 16) || 0) * 0.8));
  const g = Math.max(0, Math.round((parseInt(h.substring(2, 4), 16) || 0) * 0.8));
  const b = Math.max(0, Math.round((parseInt(h.substring(4, 6), 16) || 0) * 0.8));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
