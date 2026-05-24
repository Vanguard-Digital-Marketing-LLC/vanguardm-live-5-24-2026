"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Plus,
  Trash2,
  ArrowUpDown,
  FolderOpen,
  ExternalLink,
  Search,
  X,
  Loader2,
  AlertCircle,
  Globe,
  Link2,
} from "lucide-react";

interface ContentProject {
  id: string;
  name: string;
  notes: string | null;
  clientId: string | null;
  client: { id: string; name: string } | null;
  _count: { entries: number };
  createdAt: string;
}

interface ContentEntry {
  id: string;
  url: string;
  title: string;
  organicTraffic: number | null;
  trafficValue: number | null;
  referringDomains: number | null;
  domainRating: number | null;
  wordCount: number | null;
  publishedAt: string | null;
  status: string | null;
  contentType: string | null;
  notes: string | null;
}

interface Client {
  id: string;
  name: string;
}

const STATUS_COLORS: Record<string, string> = {
  live: "bg-emerald/10 text-emerald",
  broken: "bg-red-400/10 text-red-400",
  redirected: "bg-amber/10 text-amber",
};

const TYPE_COLORS: Record<string, string> = {
  blog: "bg-blue-400/10 text-blue-400",
  landing: "bg-purple-400/10 text-purple-400",
  guide: "bg-cyan-400/10 text-cyan-400",
  tool: "bg-amber/10 text-amber",
  video: "bg-red-400/10 text-red-400",
};

function drColor(dr: number): string {
  if (dr >= 70) return "text-emerald";
  if (dr >= 50) return "text-green-400";
  if (dr >= 30) return "text-amber";
  return "text-slate-400";
}

export default function ContentExplorer() {
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [entryLoading, setEntryLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", clientId: "", notes: "" });
  const [newEntry, setNewEntry] = useState({
    url: "", title: "", organicTraffic: "", trafficValue: "",
    referringDomains: "", domainRating: "", wordCount: "",
    publishedAt: "", status: "live", contentType: "", notes: "",
  });
  const [error, setError] = useState("");

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo/content");
      if (res.ok) setProjects(await res.json());
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  const fetchEntries = useCallback(async (projectId: string) => {
    setEntryLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("contentType", typeFilter);
      if (sortField) params.set("sort", sortField);
      if (sortDir) params.set("dir", sortDir);
      const res = await fetch(`/api/admin/seo/content/${projectId}/entries?${params}`);
      if (res.ok) setEntries(await res.json());
    } catch { /* ignore */ } finally { setEntryLoading(false); }
  }, [search, statusFilter, typeFilter, sortField, sortDir]);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/clients?status=ALL");
      if (res.ok) {
        const data = await res.json();
        setClients(data.map((c: Client) => ({ id: c.id, name: c.name })));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchProjects(); fetchClients(); }, [fetchProjects, fetchClients]);
  useEffect(() => {
    if (selectedProject) fetchEntries(selectedProject);
  }, [selectedProject, fetchEntries]);

  async function createProject() {
    setError("");
    const res = await fetch("/api/admin/seo/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProject.name,
        clientId: newProject.clientId || null,
        notes: newProject.notes || null,
      }),
    });
    if (!res.ok) { setError("Failed to create project"); return; }
    setShowNewProject(false);
    setNewProject({ name: "", clientId: "", notes: "" });
    await fetchProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project and all its entries?")) return;
    await fetch(`/api/admin/seo/content/${id}`, { method: "DELETE" });
    if (selectedProject === id) { setSelectedProject(null); setEntries([]); }
    await fetchProjects();
  }

  async function addEntry() {
    if (!selectedProject) return;
    setError("");
    const body: Record<string, unknown> = { url: newEntry.url, title: newEntry.title };
    if (newEntry.organicTraffic) body.organicTraffic = parseInt(newEntry.organicTraffic);
    if (newEntry.trafficValue) body.trafficValue = parseFloat(newEntry.trafficValue);
    if (newEntry.referringDomains) body.referringDomains = parseInt(newEntry.referringDomains);
    if (newEntry.domainRating) body.domainRating = parseInt(newEntry.domainRating);
    if (newEntry.wordCount) body.wordCount = parseInt(newEntry.wordCount);
    if (newEntry.publishedAt) body.publishedAt = newEntry.publishedAt;
    if (newEntry.status) body.status = newEntry.status;
    if (newEntry.contentType) body.contentType = newEntry.contentType;
    if (newEntry.notes) body.notes = newEntry.notes;

    const res = await fetch(`/api/admin/seo/content/${selectedProject}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) { setError("Failed to add entry"); return; }
    setShowAddEntry(false);
    setNewEntry({
      url: "", title: "", organicTraffic: "", trafficValue: "",
      referringDomains: "", domainRating: "", wordCount: "",
      publishedAt: "", status: "live", contentType: "", notes: "",
    });
    await fetchEntries(selectedProject);
    await fetchProjects();
  }

  async function deleteEntry(entryId: string) {
    if (!selectedProject) return;
    await fetch(`/api/admin/seo/content/${selectedProject}/entries/${entryId}`, { method: "DELETE" });
    await fetchEntries(selectedProject);
    await fetchProjects();
  }

  function toggleSort(field: string) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  }

  const activeProject = projects.find((p) => p.id === selectedProject);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-slate-400" size={24} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Content Explorer</h1>
          <p className="text-sm text-slate-400 mt-1">Discover and track high-performing content</p>
        </div>
        <button onClick={() => setShowNewProject(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 text-white text-sm font-medium hover:bg-cyan-400/90 transition-colors">
          <Plus size={16} /> New Project
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Project list */}
        <div className="md:col-span-1 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 px-1">Projects</p>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {projects.map((p) => (
              <button key={p.id} onClick={() => setSelectedProject(p.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  selectedProject === p.id
                    ? "bg-cyan-400/10 text-white border border-cyan-400/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}>
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-[10px] text-slate-600">{p.client?.name || "No client"} · {p._count.entries} entries</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }}
                  className="flex-shrink-0 p-1 text-slate-600 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </button>
            ))}
            {projects.length === 0 && (
              <p className="text-sm text-slate-600 px-3 py-4">No projects yet.</p>
            )}
          </div>
        </div>

        {/* Entries table */}
        <div className="md:col-span-3">
          {selectedProject && activeProject ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <FolderOpen size={18} className="text-cyan-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-white truncate">{activeProject.name}</h2>
                    {activeProject.client && <p className="text-xs text-slate-500">{activeProject.client.name}</p>}
                  </div>
                </div>
                <button onClick={() => setShowAddEntry(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-white text-xs font-medium hover:bg-cyan-400/90 transition-colors">
                  <Plus size={14} /> Add Entry
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Search title or URL..." value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search content"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                  <option value="">All Status</option>
                  <option value="live">Live</option>
                  <option value="broken">Broken</option>
                  <option value="redirected">Redirected</option>
                </select>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                  aria-label="Filter by type"
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                  <option value="">All Types</option>
                  <option value="blog">Blog</option>
                  <option value="landing">Landing</option>
                  <option value="guide">Guide</option>
                  <option value="tool">Tool</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/6">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">Content</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-400 cursor-pointer select-none" onClick={() => toggleSort("organicTraffic")}>
                          <span className="inline-flex items-center gap-1">Traffic <ArrowUpDown size={12} /></span>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-400 cursor-pointer select-none" onClick={() => toggleSort("trafficValue")}>
                          <span className="inline-flex items-center gap-1">Value <ArrowUpDown size={12} /></span>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-400 cursor-pointer select-none" onClick={() => toggleSort("referringDomains")}>
                          <span className="inline-flex items-center gap-1">RDs <ArrowUpDown size={12} /></span>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-400 cursor-pointer select-none" onClick={() => toggleSort("domainRating")}>
                          <span className="inline-flex items-center gap-1">DR <ArrowUpDown size={12} /></span>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">Status</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {entryLoading ? (
                        <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500"><Loader2 className="animate-spin inline-block" size={18} /></td></tr>
                      ) : entries.length === 0 ? (
                        <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">No content entries yet.</td></tr>
                      ) : (
                        entries.map((entry) => (
                          <tr key={entry.id} className="border-b border-white/4 hover:bg-white/[0.02]">
                            <td className="px-4 py-3 max-w-xs">
                              <p className="text-sm text-white font-medium truncate">{entry.title}</p>
                              <a href={entry.url} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] text-cyan-400/70 hover:text-cyan-400 truncate flex items-center gap-1">
                                {entry.url.replace(/^https?:\/\//, "").slice(0, 50)}
                                <ExternalLink size={9} />
                              </a>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-sm font-mono text-white">
                                {entry.organicTraffic != null ? entry.organicTraffic.toLocaleString() : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-sm font-mono text-emerald">
                                {entry.trafficValue != null ? `$${entry.trafficValue.toLocaleString()}` : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-sm font-mono text-white">
                                {entry.referringDomains != null ? entry.referringDomains.toLocaleString() : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {entry.domainRating != null ? (
                                <span className={`text-sm font-mono font-bold ${drColor(entry.domainRating)}`}>
                                  {entry.domainRating}
                                </span>
                              ) : <span className="text-sm text-slate-600">—</span>}
                            </td>
                            <td className="px-4 py-3">
                              {entry.contentType ? (
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${TYPE_COLORS[entry.contentType] || "bg-white/10 text-slate-400"}`}>
                                  {entry.contentType}
                                </span>
                              ) : <span className="text-slate-600">—</span>}
                            </td>
                            <td className="px-4 py-3">
                              {entry.status ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${STATUS_COLORS[entry.status] || "bg-white/10 text-slate-400"}`}>
                                  {entry.status === "broken" && <AlertCircle size={10} />}
                                  {entry.status === "live" && <Globe size={10} />}
                                  {entry.status === "redirected" && <Link2 size={10} />}
                                  {entry.status}
                                </span>
                              ) : <span className="text-slate-600">—</span>}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => deleteEntry(entry.id)}
                                className="p-1 text-slate-600 hover:text-red-400 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-[#111827] border border-white/6 rounded-xl">
              <div className="text-center">
                <FileText size={32} className="mx-auto text-slate-700 mb-3" />
                <p className="text-sm text-slate-500">Select a project to view content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60" onClick={() => setShowNewProject(false)}>
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">New Content Project</h3>
              <button onClick={() => setShowNewProject(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="content-project-name" className="block text-xs font-medium text-slate-400 mb-1">Project Name *</label>
                <input id="content-project-name" type="text" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/40"
                  placeholder="e.g. Competitor Blog Analysis" />
              </div>
              <div>
                <label htmlFor="content-project-client" className="block text-xs font-medium text-slate-400 mb-1">Client (optional)</label>
                <select id="content-project-client" value={newProject.clientId} onChange={(e) => setNewProject({ ...newProject, clientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                  <option value="">None</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="content-project-notes" className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
                <textarea id="content-project-notes" value={newProject.notes} onChange={(e) => setNewProject({ ...newProject, notes: e.target.value })}
                  rows={2} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none resize-none" />
              </div>
              <button onClick={createProject} disabled={!newProject.name}
                className="w-full py-2 rounded-lg bg-cyan-400 text-white text-sm font-medium hover:bg-cyan-400/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60" onClick={() => setShowAddEntry(false)}>
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">Add Content Entry</h3>
              <button onClick={() => setShowAddEntry(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label htmlFor="content-entry-url" className="block text-xs font-medium text-slate-400 mb-1">URL *</label>
                <input id="content-entry-url" type="text" value={newEntry.url} onChange={(e) => setNewEntry({ ...newEntry, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/40"
                  placeholder="https://example.com/blog-post" />
              </div>
              <div>
                <label htmlFor="content-entry-title" className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
                <input id="content-entry-title" type="text" value={newEntry.title} onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/40"
                  placeholder="Article title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="content-entry-organic-traffic" className="block text-xs font-medium text-slate-400 mb-1">Organic Traffic</label>
                  <input id="content-entry-organic-traffic" type="number" value={newEntry.organicTraffic} onChange={(e) => setNewEntry({ ...newEntry, organicTraffic: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" placeholder="0" />
                </div>
                <div>
                  <label htmlFor="content-entry-traffic-value" className="block text-xs font-medium text-slate-400 mb-1">Traffic Value ($)</label>
                  <input id="content-entry-traffic-value" type="number" step="0.01" value={newEntry.trafficValue} onChange={(e) => setNewEntry({ ...newEntry, trafficValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" placeholder="0.00" />
                </div>
                <div>
                  <label htmlFor="content-entry-referring-domains" className="block text-xs font-medium text-slate-400 mb-1">Referring Domains</label>
                  <input id="content-entry-referring-domains" type="number" value={newEntry.referringDomains} onChange={(e) => setNewEntry({ ...newEntry, referringDomains: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" placeholder="0" />
                </div>
                <div>
                  <label htmlFor="content-entry-domain-rating" className="block text-xs font-medium text-slate-400 mb-1">Domain Rating (0-100)</label>
                  <input id="content-entry-domain-rating" type="number" min="0" max="100" value={newEntry.domainRating} onChange={(e) => setNewEntry({ ...newEntry, domainRating: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" placeholder="0" />
                </div>
                <div>
                  <label htmlFor="content-entry-word-count" className="block text-xs font-medium text-slate-400 mb-1">Word Count</label>
                  <input id="content-entry-word-count" type="number" value={newEntry.wordCount} onChange={(e) => setNewEntry({ ...newEntry, wordCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" placeholder="0" />
                </div>
                <div>
                  <label htmlFor="content-entry-published-date" className="block text-xs font-medium text-slate-400 mb-1">Published Date</label>
                  <input id="content-entry-published-date" type="date" value={newEntry.publishedAt} onChange={(e) => setNewEntry({ ...newEntry, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="content-entry-status" className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                  <select id="content-entry-status" value={newEntry.status} onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                    <option value="live">Live</option>
                    <option value="broken">Broken</option>
                    <option value="redirected">Redirected</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="content-entry-type" className="block text-xs font-medium text-slate-400 mb-1">Content Type</label>
                  <select id="content-entry-type" value={newEntry.contentType} onChange={(e) => setNewEntry({ ...newEntry, contentType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                    <option value="">None</option>
                    <option value="blog">Blog</option>
                    <option value="landing">Landing Page</option>
                    <option value="guide">Guide</option>
                    <option value="tool">Tool</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="content-entry-notes" className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
                <textarea id="content-entry-notes" value={newEntry.notes} onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  rows={2} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none resize-none" />
              </div>
              <button onClick={addEntry} disabled={!newEntry.url || !newEntry.title}
                className="w-full py-2 rounded-lg bg-cyan-400 text-white text-sm font-medium hover:bg-cyan-400/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
