"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  List,
  X,
  Loader2,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  mediaUrls: string[];
  hashtags: string[];
  scheduledAt: string | null;
  publishedAt: string | null;
  status: string;
  metrics: Record<string, number> | null;
  clientId: string | null;
  client: { id: string; name: string } | null;
  createdBy: { id: string; name: string } | null;
  notes: string | null;
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
}

interface Stats {
  totalPosts: number;
  byPlatform: { platform: string; _count: number }[];
  byStatus: { status: string; _count: number }[];
  scheduledThisWeek: number;
  publishedThisMonth: number;
}

const PLATFORM_CONFIG: Record<string, { label: string; color: string; icon: string; maxLen: number }> = {
  TWITTER: { label: "X (Twitter)", color: "bg-slate-400/10 text-slate-300", icon: "𝕏", maxLen: 280 },
  LINKEDIN: { label: "LinkedIn", color: "bg-blue-500/10 text-blue-400", icon: "in", maxLen: 3000 },
  FACEBOOK: { label: "Facebook", color: "bg-blue-600/10 text-blue-300", icon: "f", maxLen: 63206 },
  INSTAGRAM: { label: "Instagram", color: "bg-pink-500/10 text-pink-400", icon: "📷", maxLen: 2200 },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  DRAFT: { label: "Draft", color: "bg-slate-400/10 text-slate-400", icon: List },
  SCHEDULED: { label: "Scheduled", color: "bg-amber/10 text-amber", icon: Clock },
  PUBLISHED: { label: "Published", color: "bg-emerald/10 text-emerald", icon: CheckCircle },
  FAILED: { label: "Failed", color: "bg-red-400/10 text-red-400", icon: AlertCircle },
};

export default function SocialMediaManager() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [platformFilter, setPlatformFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    platform: "TWITTER" as string,
    content: "",
    hashtags: "",
    scheduledAt: "",
    status: "DRAFT",
    clientId: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const fetchPosts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (platformFilter) params.set("platform", platformFilter);
      if (statusFilter) params.set("status", statusFilter);
      if (clientFilter) params.set("clientId", clientFilter);
      const res = await fetch(`/api/admin/seo/social?${params}`);
      if (res.ok) setPosts(await res.json());
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [platformFilter, statusFilter, clientFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo/social/stats");
      if (res.ok) setStats(await res.json());
    } catch { /* ignore */ }
  }, []);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/clients?status=ALL");
      if (res.ok) {
        const data = await res.json();
        setClients(data.map((c: Client) => ({ id: c.id, name: c.name })));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchPosts(); fetchStats(); fetchClients(); }, [fetchPosts, fetchStats, fetchClients]);

  async function createPost() {
    setError("");
    const body: Record<string, unknown> = {
      platform: newPost.platform,
      content: newPost.content,
      status: newPost.status,
    };
    if (newPost.hashtags) body.hashtags = newPost.hashtags.split(/[,\s]+/).filter(Boolean).map((t) => t.startsWith("#") ? t : `#${t}`);
    if (newPost.scheduledAt) body.scheduledAt = newPost.scheduledAt;
    if (newPost.clientId) body.clientId = newPost.clientId;
    if (newPost.notes) body.notes = newPost.notes;

    const res = await fetch("/api/admin/seo/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) { setError("Failed to create post"); return; }
    setShowNewPost(false);
    setNewPost({ platform: "TWITTER", content: "", hashtags: "", scheduledAt: "", status: "DRAFT", clientId: "", notes: "" });
    await fetchPosts();
    await fetchStats();
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/seo/social/${id}`, { method: "DELETE" });
    await fetchPosts();
    await fetchStats();
  }

  async function updatePostStatus(id: string, status: string) {
    const body: Record<string, unknown> = { status };
    if (status === "PUBLISHED") body.publishedAt = new Date().toISOString();
    await fetch(`/api/admin/seo/social/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await fetchPosts();
    await fetchStats();
  }

  // Calendar helpers
  function getCalendarDays() {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }

  function getPostsForDay(day: number) {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    return posts.filter((p) => {
      const date = p.scheduledAt ? new Date(p.scheduledAt) : new Date(p.createdAt);
      return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    });
  }

  const platformCfg = PLATFORM_CONFIG[newPost.platform];
  const charCount = newPost.content.length;

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
          <h1 className="font-display text-2xl font-bold text-white">Social Media Manager</h1>
          <p className="text-sm text-slate-400 mt-1">Plan, schedule, and track social posts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-lg border border-white/6 p-0.5">
            <button onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${view === "list" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>
              <List size={14} className="inline mr-1" /> List
            </button>
            <button onClick={() => setView("calendar")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${view === "calendar" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>
              <Calendar size={14} className="inline mr-1" /> Calendar
            </button>
          </div>
          <button onClick={() => setShowNewPost(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-500/90 transition-colors">
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400">{error}</div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
            <p className="text-xs text-slate-400 mt-1">Total Posts</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
            <p className="text-2xl font-bold text-amber">{stats.scheduledThisWeek}</p>
            <p className="text-xs text-slate-400 mt-1">Scheduled This Week</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald">{stats.publishedThisMonth}</p>
            <p className="text-xs text-slate-400 mt-1">Published This Month</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
            <div className="flex gap-2 flex-wrap">
              {stats.byPlatform.map((p) => (
                <span key={p.platform} className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${PLATFORM_CONFIG[p.platform]?.color || "bg-white/10 text-slate-400"}`}>
                  {PLATFORM_CONFIG[p.platform]?.icon} {p._count}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">By Platform</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter size={14} className="text-slate-500" />
        <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}
          aria-label="Filter by platform"
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
          <option value="">All Platforms</option>
          {Object.entries(PLATFORM_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.label}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
          <option value="">All Status</option>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.label}</option>
          ))}
        </select>
        <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}
          aria-label="Filter by client"
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
          <option value="">All Clients</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="bg-[#111827] border border-white/6 rounded-xl p-8 text-center">
              <Send size={32} className="mx-auto text-slate-700 mb-3" />
              <p className="text-sm text-slate-500">No posts yet. Create your first post.</p>
            </div>
          ) : (
            posts.map((post) => {
              const platCfg = PLATFORM_CONFIG[post.platform];
              const statusCfg = STATUS_CONFIG[post.status];
              const StatusIcon = statusCfg?.icon || List;
              return (
                <div key={post.id} className="bg-[#111827] border border-white/6 rounded-xl p-4 hover:border-white/10 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${platCfg?.color || "bg-white/10 text-slate-400"}`}>
                      {platCfg?.icon || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${statusCfg?.color || "bg-white/10 text-slate-400"}`}>
                          <StatusIcon size={10} />
                          {statusCfg?.label || post.status}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${platCfg?.color || "bg-white/10 text-slate-400"}`}>
                          {platCfg?.label || post.platform}
                        </span>
                        {post.client && (
                          <span className="text-[10px] text-slate-500">{post.client.name}</span>
                        )}
                      </div>
                      <p className="text-sm text-white whitespace-pre-wrap line-clamp-3">{post.content}</p>
                      {post.hashtags.length > 0 && (
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {post.hashtags.map((tag) => (
                            <span key={tag} className="text-[10px] text-purple-400">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-600">
                        {post.scheduledAt && (
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(post.scheduledAt).toLocaleDateString()} {new Date(post.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <CheckCircle size={10} />
                            Published {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                        {post.createdBy && <span>by {post.createdBy.name}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {post.status === "DRAFT" && (
                        <button onClick={() => updatePostStatus(post.id, "SCHEDULED")}
                          className="px-2 py-1 rounded text-[10px] font-medium bg-amber/10 text-amber hover:bg-amber/20 transition-colors" title="Schedule">
                          Schedule
                        </button>
                      )}
                      {post.status === "SCHEDULED" && (
                        <button onClick={() => updatePostStatus(post.id, "PUBLISHED")}
                          className="px-2 py-1 rounded text-[10px] font-medium bg-emerald/10 text-emerald hover:bg-emerald/20 transition-colors" title="Mark Published">
                          Publish
                        </button>
                      )}
                      <button onClick={() => deletePost(post.id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-sm hover:text-white transition-colors">←</button>
            <h3 className="text-base font-semibold text-white">
              {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-sm hover:text-white transition-colors">→</button>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="px-2 py-2 text-center text-[10px] font-semibold uppercase text-slate-600">{day}</div>
            ))}
            {getCalendarDays().map((day, i) => {
              const dayPosts = day ? getPostsForDay(day) : [];
              const isToday = day && new Date().getDate() === day &&
                new Date().getMonth() === calendarMonth.getMonth() &&
                new Date().getFullYear() === calendarMonth.getFullYear();
              return (
                <div key={i} className={`min-h-[80px] p-1.5 border border-white/4 rounded ${day ? "bg-white/[0.02]" : ""}`}>
                  {day && (
                    <>
                      <span className={`text-xs font-medium ${isToday ? "text-purple-400 font-bold" : "text-slate-500"}`}>{day}</span>
                      <div className="mt-1 space-y-0.5">
                        {dayPosts.slice(0, 3).map((p) => {
                          const cfg = PLATFORM_CONFIG[p.platform];
                          const sCfg = STATUS_CONFIG[p.status];
                          return (
                            <div key={p.id} className={`px-1.5 py-0.5 rounded text-[8px] truncate ${sCfg?.color || "bg-white/5 text-slate-400"}`}>
                              {cfg?.icon} {p.content.slice(0, 25)}...
                            </div>
                          );
                        })}
                        {dayPosts.length > 3 && (
                          <span className="text-[8px] text-slate-600">+{dayPosts.length - 3} more</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60" onClick={() => setShowNewPost(false)}>
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">New Social Post</h3>
              <button onClick={() => setShowNewPost(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {/* Platform selector */}
              <div>
                <span id="social-platform-label" className="block text-xs font-medium text-slate-400 mb-2">Platform *</span>
                <div role="group" aria-labelledby="social-platform-label" className="flex gap-2">
                  {Object.entries(PLATFORM_CONFIG).map(([key, cfg]) => (
                    <button key={key} type="button"
                      onClick={() => setNewPost({ ...newPost, platform: key })}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        newPost.platform === key
                          ? `${cfg.color} border-white/20`
                          : "bg-white/5 text-slate-400 border-white/6 hover:border-white/10"
                      }`}>
                      <span className="text-lg">{cfg.icon}</span>
                      <span className="block text-[10px] mt-0.5">{cfg.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="social-post-content" className="text-xs font-medium text-slate-400">Content *</label>
                  <span className={`text-[10px] ${charCount > (platformCfg?.maxLen || 280) ? "text-red-400" : "text-slate-600"}`}>
                    {charCount}/{platformCfg?.maxLen || 280}
                  </span>
                </div>
                <textarea
                  id="social-post-content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-400/40 resize-none"
                  placeholder="What do you want to post?"
                />
              </div>

              {/* Hashtags */}
              <div>
                <label htmlFor="social-post-hashtags" className="block text-xs font-medium text-slate-400 mb-1">Hashtags</label>
                <input id="social-post-hashtags" type="text" value={newPost.hashtags}
                  onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-400/40"
                  placeholder="#seo #marketing #digitalmarketing" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="social-post-schedule" className="block text-xs font-medium text-slate-400 mb-1">Schedule For</label>
                  <input id="social-post-schedule" type="datetime-local" value={newPost.scheduledAt}
                    onChange={(e) => setNewPost({ ...newPost, scheduledAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="social-post-status" className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                  <select id="social-post-status" value={newPost.status} onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                    <option value="DRAFT">Draft</option>
                    <option value="SCHEDULED">Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="social-post-client" className="block text-xs font-medium text-slate-400 mb-1">Client (optional)</label>
                <select id="social-post-client" value={newPost.clientId} onChange={(e) => setNewPost({ ...newPost, clientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none [&>option]:bg-[#111827]">
                  <option value="">None</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="social-post-notes" className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
                <textarea id="social-post-notes" value={newPost.notes} onChange={(e) => setNewPost({ ...newPost, notes: e.target.value })}
                  rows={2} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none resize-none" />
              </div>

              <button onClick={createPost} disabled={!newPost.content || !newPost.platform}
                className="w-full py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {newPost.status === "SCHEDULED" ? "Schedule Post" : "Save Draft"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
