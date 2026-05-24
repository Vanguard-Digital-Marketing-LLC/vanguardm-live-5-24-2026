"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Search, Plus, Trash2, Upload, Globe, ArrowUpDown, X, Loader2,
  Database, Radar, Zap, ChevronLeft, ChevronRight, Info,
} from "lucide-react";

// ── Types ────────────────────────────────────────

interface KeywordSeed {
  id: string;
  term: string;
  volume: number | null;
  difficulty: number | null;
  cps: number | null;
  trafficPotential: number | null;
  intent: string | null;
  source: string;
  tags: string[];
  serpFeatures: string[];
}

interface DomainResult {
  keyword: { id: string; term: string; volume: number | null; difficulty: number | null; intent: string | null };
  position: number;
  url: string;
  title: string;
  estimatedTraffic: number;
  scrapedAt: string;
}

interface DomainSummary {
  domain: string;
  totalKeywords: number;
  totalEstimatedTraffic: number;
  topKeyword: string | null;
}

interface Snapshot {
  id: string;
  name: string | null;
  source: string;
  keywordCount: number;
  resultCount: number;
  scrapedAt: string;
}

type Tab = "domain" | "database" | "serp";

// ── Helpers ──────────────────────────────────────

const INTENT_COLORS: Record<string, string> = {
  INFORMATIONAL: "bg-blue-400/10 text-blue-400",
  COMMERCIAL: "bg-amber/10 text-amber",
  TRANSACTIONAL: "bg-emerald/10 text-emerald",
  NAVIGATIONAL: "bg-purple-400/10 text-purple-400",
};

const SOURCE_COLORS: Record<string, string> = {
  MANUAL: "bg-slate-400/10 text-slate-400",
  GOOGLE_ADS: "bg-blue-400/10 text-blue-400",
  AUTOCOMPLETE: "bg-cyan-400/10 text-cyan-400",
  CSV_IMPORT: "bg-amber/10 text-amber",
  AHREFS_IMPORT: "bg-orange-400/10 text-orange-400",
};

const COLUMN_INFO: Record<string, { title: string; desc: string }> = {
  volume: {
    title: "Search Volume",
    desc: "Average monthly searches for this keyword. Sourced from Google Ads data via DataForSEO. Higher volume = more potential traffic, but also more competition.",
  },
  difficulty: {
    title: "Keyword Difficulty (KD)",
    desc: "Score 0-100 estimating how hard it is to rank on page 1. Based on backlink profiles of top-ranking pages. 0-20: Easy, 21-40: Medium, 41-60: Hard, 61-80: Very Hard, 81-100: Extremely Hard.",
  },
  cps: {
    title: "Cost Per Click (CPC)",
    desc: "Average cost advertisers pay per click in Google Ads for this keyword. Higher CPC indicates higher commercial value — these keywords drive revenue.",
  },
  tp: {
    title: "Traffic Potential (TP)",
    desc: "Total estimated monthly traffic the #1 ranking page receives from ALL keywords it ranks for — not just this one. Shows the true value of ranking #1 for this topic cluster.",
  },
  intent: {
    title: "Search Intent",
    desc: "Why someone searches this keyword. Informational: learning something. Commercial: researching before buying. Transactional: ready to buy/hire. Navigational: looking for a specific site or place.",
  },
  source: {
    title: "Data Source",
    desc: "Where this keyword data came from. Manual: added by hand. Google Ads: imported from Keyword Planner. CSV Import: uploaded from file. Ahrefs Import: pulled from Ahrefs export.",
  },
};

function kdColor(kd: number) {
  if (kd <= 20) return "text-emerald";
  if (kd <= 40) return "text-green-400";
  if (kd <= 60) return "text-amber";
  if (kd <= 80) return "text-orange-400";
  return "text-red-400";
}

function kdBar(kd: number) {
  if (kd <= 20) return "bg-emerald";
  if (kd <= 40) return "bg-green-400";
  if (kd <= 60) return "bg-amber";
  if (kd <= 80) return "bg-orange-400";
  return "bg-red-400";
}

function fmt(n: number | null) {
  return n != null ? n.toLocaleString() : "—";
}

// ── Main Component ───────────────────────────────

export default function KeywordsExplorer() {
  const [tab, setTab] = useState<Tab>("domain");
  const [error, setError] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Keywords Explorer</h1>
          <p className="text-sm text-slate-400 mt-1">Domain lookup, keyword database, and SERP tracking</p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400 flex items-center justify-between">
          {error}
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-300"><X size={14} /></button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-lg border border-white/6 p-1 w-fit">
        {[
          { id: "domain" as Tab, label: "Domain Lookup", icon: Globe },
          { id: "database" as Tab, label: "Keyword Database", icon: Database },
          { id: "serp" as Tab, label: "SERP Snapshots", icon: Radar },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
            }`}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "domain" && <DomainLookupTab setError={setError} />}
      {tab === "database" && <KeywordDatabaseTab setError={setError} />}
      {tab === "serp" && <SerpSnapshotsTab setError={setError} />}
    </div>
  );
}

// ══════════════════════════════════════════════════
// Tab 1: Domain Lookup
// ══════════════════════════════════════════════════

function DomainLookupTab({ setError }: { setError: (e: string) => void }) {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<DomainSummary | null>(null);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [sortField, setSortField] = useState("estimatedTraffic");
  const [sortDir, setSortDir] = useState("desc");

  async function lookup() {
    if (!domain.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/seo/domains/lookup?domain=${encodeURIComponent(domain.trim())}`);
      if (!res.ok) { setError("Domain lookup failed"); return; }
      const data = await res.json();
      setSummary(data.summary);
      setResults(data.results);
    } catch { setError("Domain lookup failed"); } finally { setLoading(false); }
  }

  function toggleSort(field: string) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  }

  const sorted = [...results].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortField === "estimatedTraffic") return (a.estimatedTraffic - b.estimatedTraffic) * dir;
    if (sortField === "position") return (a.position - b.position) * dir;
    if (sortField === "volume") return ((a.keyword.volume ?? 0) - (b.keyword.volume ?? 0)) * dir;
    if (sortField === "difficulty") return ((a.keyword.difficulty ?? 0) - (b.keyword.difficulty ?? 0)) * dir;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            placeholder="Enter a domain to see its rankings (e.g. example.com)"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#111827] border border-white/6 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald/40" />
        </div>
        <button onClick={lookup} disabled={loading || !domain.trim()}
          className="px-6 py-3 rounded-xl bg-emerald text-white text-sm font-medium hover:bg-emerald/90 disabled:opacity-50 transition-colors">
          {loading ? <Loader2 size={16} className="animate-spin" /> : "Lookup"}
        </button>
      </div>

      {/* Summary cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-white/6 rounded-xl p-5">
            <p className="text-3xl font-bold font-mono text-white">{summary.totalKeywords.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Keywords Ranking</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl p-5">
            <p className="text-3xl font-bold font-mono text-cyan-400">{summary.totalEstimatedTraffic.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Est. Monthly Traffic</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl p-5">
            <p className="text-lg font-semibold text-white truncate">{summary.topKeyword || "—"}</p>
            <p className="text-xs text-slate-400 mt-1">Top Keyword</p>
          </div>
        </div>
      )}

      {/* Results table */}
      {results.length > 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/6">
            <h2 className="font-display text-base font-semibold text-white">
              Rankings for <span className="text-emerald">{summary?.domain}</span>
              <span className="text-slate-500 text-sm ml-2">({results.length})</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">Keyword</th>
                  <SortTh label="Vol" field="volume" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <SortTh label="KD" field="difficulty" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <SortTh label="Pos" field="position" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <SortTh label="Est. Traffic" field="estimatedTraffic" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">URL</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">Intent</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r, i) => (
                  <tr key={`${r.keyword.id}-${i}`} className="border-b border-white/4 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-sm text-white font-medium">{r.keyword.term}</td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-white">{fmt(r.keyword.volume)}</td>
                    <td className="px-4 py-3 text-right">
                      {r.keyword.difficulty != null ? (
                        <div className="inline-flex items-center gap-2">
                          <div className="w-10 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className={`h-full rounded-full ${kdBar(r.keyword.difficulty)}`} style={{ width: `${r.keyword.difficulty}%` }} />
                          </div>
                          <span className={`text-sm font-mono ${kdColor(r.keyword.difficulty)}`}>{r.keyword.difficulty}</span>
                        </div>
                      ) : <span className="text-sm text-slate-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-white">#{r.position}</td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-cyan-400">{r.estimatedTraffic.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[200px] truncate">{r.url.replace(/^https?:\/\//, "")}</td>
                    <td className="px-4 py-3">
                      {r.keyword.intent ? (
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${INTENT_COLORS[r.keyword.intent] || ""}`}>
                          {r.keyword.intent.slice(0, 4)}
                        </span>
                      ) : <span className="text-slate-600">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {summary && results.length === 0 && !loading && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-8 text-center">
          <Globe size={32} className="mx-auto text-slate-700 mb-3" />
          <p className="text-sm text-slate-500">No SERP data found for this domain. Import SERP data or run a fetch first.</p>
        </div>
      )}

      {!summary && !loading && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-12 text-center">
          <Globe size={40} className="mx-auto text-slate-700 mb-4" />
          <p className="text-base text-slate-400">Enter a domain above to discover its keyword rankings</p>
          <p className="text-xs text-slate-600 mt-2">Results are based on your SERP tracking data. Import or fetch SERPs first.</p>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
// Tab 2: Keyword Database
// ══════════════════════════════════════════════════

function KeywordDatabaseTab({ setError }: { setError: (e: string) => void }) {
  const [keywords, setKeywords] = useState<KeywordSeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [intentFilter, setIntentFilter] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 50;
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [showFetch, setShowFetch] = useState(false);
  const [newKw, setNewKw] = useState({ term: "", volume: "", difficulty: "", cps: "", trafficPotential: "", intent: "", parentTopic: "" });
  const [bulkText, setBulkText] = useState("");
  const [fetchKeywords, setFetchKeywords] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchResults, setFetchResults] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (search) params.set("search", search);
      if (intentFilter) params.set("intent", intentFilter);
      if (sortField) params.set("sort", sortField);
      if (sortDir) params.set("dir", sortDir);
      const res = await fetch(`/api/admin/seo/keywords?${params}`);
      if (res.ok) {
        const data = await res.json();
        setKeywords(Array.isArray(data) ? data : data.keywords || []);
        setTotal(parseInt(res.headers.get("x-total-count") || "0") || (Array.isArray(data) ? data.length : 0));
      }
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [search, intentFilter, sortField, sortDir, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function addKeyword() {
    setError("");
    const body: Record<string, unknown> = { term: newKw.term };
    if (newKw.volume) body.volume = parseInt(newKw.volume);
    if (newKw.difficulty) body.difficulty = parseInt(newKw.difficulty);
    if (newKw.cps) body.cps = parseFloat(newKw.cps);
    if (newKw.trafficPotential) body.trafficPotential = parseInt(newKw.trafficPotential);
    if (newKw.intent) body.intent = newKw.intent;
    if (newKw.parentTopic) body.parentTopic = newKw.parentTopic;
    const res = await fetch("/api/admin/seo/keywords", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (!res.ok) { setError("Failed to add keyword"); return; }
    setShowAdd(false);
    setNewKw({ term: "", volume: "", difficulty: "", cps: "", trafficPotential: "", intent: "", parentTopic: "" });
    await fetchData();
  }

  async function bulkImport() {
    setError("");
    const lines = bulkText.trim().split(/[\n,]+/).map((l) => l.trim()).filter(Boolean);
    const kws = lines.map((line) => {
      const p = line.split("\t");
      const kw: Record<string, unknown> = { term: p[0]?.trim() || line.trim() };
      if (p[1]) kw.volume = parseInt(p[1]);
      if (p[2]) kw.difficulty = parseInt(p[2]);
      if (p[3]) kw.trafficPotential = parseInt(p[3]);
      return kw;
    });
    const res = await fetch("/api/admin/seo/keywords", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ keywords: kws }),
    });
    if (!res.ok) { setError("Bulk import failed"); return; }
    setShowBulk(false);
    setBulkText("");
    await fetchData();
  }

  async function fetchSerps() {
    setFetchLoading(true);
    setFetchResults([]);
    setError("");
    const kws = fetchKeywords.trim().split(/[\n,]+/).map((k) => k.trim()).filter(Boolean);
    try {
      const res = await fetch("/api/admin/seo/serp/fetch", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: kws }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "SERP fetch failed");
        return;
      }
      const data = await res.json();
      setFetchResults(data.results?.map((r: { keyword: string; resultCount?: number; error?: string }) =>
        r.error ? `✗ ${r.keyword}: ${r.error}` : `✓ ${r.keyword}: ${r.resultCount || 0} results`
      ) || ["Fetch complete"]);
      await fetchData();
    } catch { setError("SERP fetch failed"); } finally { setFetchLoading(false); }
  }

  async function deleteKeyword(id: string) {
    if (!confirm("Delete this keyword?")) return;
    await fetch(`/api/admin/seo/keywords/${id}`, { method: "DELETE" });
    await fetchData();
  }

  function toggleSort(field: string) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  }

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" placeholder="Search keywords..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search keywords"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald/40" />
        </div>
        <select value={intentFilter} onChange={(e) => { setIntentFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
          <option value="">All Intents</option>
          <option value="INFORMATIONAL">Informational</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="TRANSACTIONAL">Transactional</option>
          <option value="NAVIGATIONAL">Navigational</option>
        </select>
        <div className="flex-1" />
        <button onClick={() => setShowFetch(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber/10 text-amber text-xs font-medium border border-amber/20 hover:bg-amber/20 transition-colors">
          <Zap size={14} /> Fetch SERPs
        </button>
        <button onClick={() => setShowBulk(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10 transition-colors">
          <Upload size={14} /> Bulk Import
        </button>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald text-white text-xs font-medium hover:bg-emerald/90 transition-colors">
          <Plus size={14} /> Add Keyword
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">Keyword</th>
                <SortThWithInfo label="Volume" field="volume" current={sortField} dir={sortDir} onSort={toggleSort} info={COLUMN_INFO.volume} />
                <SortThWithInfo label="KD" field="difficulty" current={sortField} dir={sortDir} onSort={toggleSort} info={COLUMN_INFO.difficulty} />
                <ThWithInfo label="CPC" info={COLUMN_INFO.cps} align="right" />
                <SortThWithInfo label="TP" field="trafficPotential" current={sortField} dir={sortDir} onSort={toggleSort} info={COLUMN_INFO.tp} />
                <ThWithInfo label="Intent" info={COLUMN_INFO.intent} align="left" />
                <ThWithInfo label="Source" info={COLUMN_INFO.source} align="left" />
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center"><Loader2 className="animate-spin inline-block text-slate-500" size={18} /></td></tr>
              ) : keywords.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">No keywords in database. Add keywords or import from CSV.</td></tr>
              ) : keywords.map((kw) => (
                <tr key={kw.id} className="border-b border-white/4 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="text-sm text-white font-medium">{kw.term}</p>
                    {kw.tags.length > 0 && (
                      <div className="flex gap-1 mt-0.5">{kw.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{t}</span>
                      ))}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-mono text-white">{fmt(kw.volume)}</td>
                  <td className="px-4 py-3 text-right">
                    {kw.difficulty != null ? (
                      <div className="inline-flex items-center gap-2">
                        <div className="w-10 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className={`h-full rounded-full ${kdBar(kw.difficulty)}`} style={{ width: `${kw.difficulty}%` }} />
                        </div>
                        <span className={`text-sm font-mono ${kdColor(kw.difficulty)}`}>{kw.difficulty}</span>
                      </div>
                    ) : <span className="text-sm text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-mono text-slate-300">{kw.cps != null ? kw.cps.toFixed(2) : "—"}</td>
                  <td className="px-4 py-3 text-right text-sm font-mono text-white">{fmt(kw.trafficPotential)}</td>
                  <td className="px-4 py-3">
                    {kw.intent ? (
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${INTENT_COLORS[kw.intent] || "bg-white/10 text-slate-400"}`}>
                        {kw.intent.slice(0, 4)}
                      </span>
                    ) : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${SOURCE_COLORS[kw.source] || "bg-white/5 text-slate-500"}`}>
                      {kw.source.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => deleteKeyword(kw.id)} className="p-1 text-slate-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/6">
            <span className="text-xs text-slate-500">Page {page} of {totalPages} ({total} keywords)</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}
                className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white disabled:opacity-30"><ChevronLeft size={14} /></button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}
                className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white disabled:opacity-30"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Add Keyword Modal */}
      {showAdd && (
        <Modal title="Add Keyword" onClose={() => setShowAdd(false)}>
          <div className="space-y-3">
            <Field label="Keyword Term *" value={newKw.term} onChange={(v) => setNewKw({ ...newKw, term: v })} placeholder="e.g. hvac repair near me" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Volume" type="number" value={newKw.volume} onChange={(v) => setNewKw({ ...newKw, volume: v })} placeholder="0" />
              <Field label="KD (0-100)" type="number" value={newKw.difficulty} onChange={(v) => setNewKw({ ...newKw, difficulty: v })} placeholder="0" />
              <Field label="CPS" type="number" value={newKw.cps} onChange={(v) => setNewKw({ ...newKw, cps: v })} placeholder="0.00" />
              <Field label="Traffic Potential" type="number" value={newKw.trafficPotential} onChange={(v) => setNewKw({ ...newKw, trafficPotential: v })} placeholder="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="kw-add-intent" className="block text-xs font-medium text-slate-400 mb-1">Intent</label>
                <select id="kw-add-intent" value={newKw.intent} onChange={(e) => setNewKw({ ...newKw, intent: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                  <option value="">None</option>
                  <option value="INFORMATIONAL">Informational</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="TRANSACTIONAL">Transactional</option>
                  <option value="NAVIGATIONAL">Navigational</option>
                </select>
              </div>
              <Field label="Parent Topic" value={newKw.parentTopic} onChange={(v) => setNewKw({ ...newKw, parentTopic: v })} placeholder="e.g. HVAC Services" />
            </div>
            <button onClick={addKeyword} disabled={!newKw.term}
              className="w-full py-2 rounded-lg bg-emerald text-white text-sm font-medium hover:bg-emerald/90 disabled:opacity-50 transition-colors">Add Keyword</button>
          </div>
        </Modal>
      )}

      {/* Bulk Import Modal */}
      {showBulk && (
        <Modal title="Bulk Import Keywords" onClose={() => setShowBulk(false)}>
          <div className="space-y-4">
            <p className="text-xs text-slate-400">Paste keywords, one per line. Tab-separated: <code className="text-slate-500">term{"\t"}volume{"\t"}KD{"\t"}TP</code></p>
            <textarea value={bulkText} onChange={(e) => setBulkText(e.target.value)} rows={10}
              aria-label="Bulk import keywords"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white font-mono focus:outline-none resize-none"
              placeholder={"hvac repair\t2400\t45\t5800\nac installation\t1900\t38\t4200"} />
            <button onClick={bulkImport} disabled={!bulkText.trim()}
              className="w-full py-2 rounded-lg bg-emerald text-white text-sm font-medium hover:bg-emerald/90 disabled:opacity-50 transition-colors">
              Import {bulkText.trim().split(/[\n,]+/).filter(Boolean).length} Keywords
            </button>
          </div>
        </Modal>
      )}

      {/* Fetch SERPs Modal */}
      {showFetch && (
        <Modal title="Fetch Live SERPs" onClose={() => { setShowFetch(false); setFetchResults([]); }}>
          <div className="space-y-4">
            <p className="text-xs text-slate-400">Enter keywords (one per line). We&apos;ll fetch Google SERPs and store positions 1-100.</p>
            <textarea value={fetchKeywords} onChange={(e) => setFetchKeywords(e.target.value)} rows={6}
              aria-label="Keywords to fetch SERPs"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white font-mono focus:outline-none resize-none"
              placeholder={"hvac repair near me\nac installation cost\nplumber conroe tx"} />
            {fetchResults.length > 0 && (
              <div className="p-3 rounded-lg bg-white/5 max-h-40 overflow-y-auto space-y-1">
                {fetchResults.map((r, i) => (
                  <p key={i} className={`text-xs font-mono ${r.startsWith("✗") ? "text-red-400" : "text-emerald"}`}>{r}</p>
                ))}
              </div>
            )}
            <button onClick={fetchSerps} disabled={fetchLoading || !fetchKeywords.trim()}
              className="w-full py-2 rounded-lg bg-amber text-black text-sm font-bold hover:bg-amber/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {fetchLoading ? <><Loader2 size={14} className="animate-spin" /> Fetching...</> : <><Zap size={14} /> Fetch SERPs</>}
            </button>
            <p className="text-[10px] text-slate-600">Requires SERPAPI_KEY or DATAFORSEO credentials in server environment.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
// Tab 3: SERP Snapshots
// ══════════════════════════════════════════════════

function SerpSnapshotsTab({ setError }: { setError: (e: string) => void }) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSnapshots = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo/serp");
      if (res.ok) setSnapshots(await res.json());
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSnapshots(); }, [fetchSnapshots]);

  async function deleteSnapshot(id: string) {
    if (!confirm("Delete this snapshot and all its SERP results?")) return;
    const res = await fetch(`/api/admin/seo/serp/${id}`, { method: "DELETE" });
    if (!res.ok) setError("Failed to delete snapshot");
    await fetchSnapshots();
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-slate-400" size={24} /></div>;

  return (
    <div className="space-y-4">
      {snapshots.length === 0 ? (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-8 text-center">
          <Radar size={32} className="mx-auto text-slate-700 mb-3" />
          <p className="text-sm text-slate-500">No SERP snapshots yet. Use &quot;Fetch SERPs&quot; in the Keyword Database tab or import CSV data.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {snapshots.map((s) => (
            <div key={s.id} className="bg-[#111827] border border-white/6 rounded-xl p-4 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{s.name || "Unnamed Snapshot"}</h3>
                  <div className="flex items-center gap-4 mt-1 text-[10px] text-slate-500">
                    <span className="uppercase px-2 py-0.5 rounded bg-white/5">{s.source}</span>
                    <span>{s.keywordCount} keywords</span>
                    <span>{s.resultCount} results</span>
                    <span>{new Date(s.scrapedAt).toLocaleDateString()} {new Date(s.scrapedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
                <button onClick={() => deleteSnapshot(s.id)}
                  className="p-2 text-slate-600 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
// Shared UI Components
// ══════════════════════════════════════════════════

function SortTh({ label, field, current, dir, onSort }: {
  label: string; field: string; current: string; dir: string; onSort: (f: string) => void;
}) {
  return (
    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-400 cursor-pointer select-none" onClick={() => onSort(field)}>
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown size={12} className={current === field ? "text-emerald" : ""} />
        {current === field && <span className="text-[8px] text-emerald">{dir === "asc" ? "↑" : "↓"}</span>}
      </span>
    </th>
  );
}

function SortThWithInfo({ label, field, current, dir, onSort, info }: {
  label: string; field: string; current: string; dir: string; onSort: (f: string) => void;
  info: { title: string; desc: string };
}) {
  return (
    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-400 cursor-pointer select-none" onClick={() => onSort(field)}>
      <span className="inline-flex items-center gap-1">
        {label}
        <InfoBubble title={info.title} desc={info.desc} />
        <ArrowUpDown size={12} className={current === field ? "text-emerald" : ""} />
        {current === field && <span className="text-[8px] text-emerald">{dir === "asc" ? "↑" : "↓"}</span>}
      </span>
    </th>
  );
}

function ThWithInfo({ label, info, align = "left" }: {
  label: string; info: { title: string; desc: string }; align?: "left" | "right";
}) {
  return (
    <th className={`px-4 py-3 text-${align} text-xs font-semibold uppercase text-slate-400`}>
      <span className="inline-flex items-center gap-1">
        {label}
        <InfoBubble title={info.title} desc={info.desc} />
      </span>
    </th>
  );
}

function InfoBubble({ title, desc }: { title: string; desc: string }) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (!open && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPos({ top: rect.top - 8, left: rect.left + rect.width / 2 });
    }
    setOpen(!open);
  }

  return (
    <span ref={iconRef} className="inline-block" onClick={handleClick}>
      <Info size={11} className="text-slate-600 hover:text-slate-400 cursor-help transition-colors" />
      {open && createPortal(
        <>
          <div className="fixed inset-0 z-[80]" onClick={(e) => { e.stopPropagation(); setOpen(false); }} />
          <div
            className="fixed z-[90] w-64 p-3 rounded-lg bg-[#1a2332] border border-white/10 shadow-xl"
            style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -100%)" }}
          >
            <p className="text-xs font-semibold text-white mb-1 normal-case">{title}</p>
            <p className="text-[11px] text-slate-400 leading-relaxed normal-case font-normal">{desc}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a2332] border-r border-b border-white/10 rotate-45 -mt-1" />
          </div>
        </>,
        document.body,
      )}
    </span>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", id }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; id?: string;
}) {
  const fieldId = id || `kw-field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <input id={fieldId} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-emerald/40" />
    </div>
  );
}
