"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowRight } from "lucide-react";

type Result = {
  group: string;
  id: string;
  title: string;
  subtitle?: string;
  href: string;
};

const QUICK_LINKS: Result[] = [
  { group: "Jump to", id: "qa-clients", title: "Clients", href: "/admin/clients" },
  { group: "Jump to", id: "qa-leads", title: "Leads", href: "/admin/leads" },
  { group: "Jump to", id: "qa-tickets", title: "Tickets", href: "/admin/tickets" },
  { group: "Jump to", id: "qa-tasks", title: "Tasks", href: "/admin/tasks" },
  { group: "Jump to", id: "qa-projects", title: "Projects", href: "/admin/projects" },
  { group: "Jump to", id: "qa-keywords", title: "Keywords", href: "/admin/seo/keywords" },
  { group: "Jump to", id: "qa-content", title: "Content", href: "/admin/seo/content" },
  { group: "Jump to", id: "qa-social", title: "Social Media", href: "/admin/seo/social" },
  { group: "Jump to", id: "qa-reports", title: "Reports", href: "/admin/reports" },
  { group: "Jump to", id: "qa-payments", title: "Payments", href: "/admin/payments" },
  { group: "Jump to", id: "qa-team", title: "Team", href: "/admin/team" },
  { group: "Jump to", id: "qa-settings", title: "Settings", href: "/admin/settings" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>(QUICK_LINKS);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Open with ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setResults(quickLinksFiltered(""));
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!open) return;
    const term = q.trim();
    if (term.length < 2) {
      setResults(quickLinksFiltered(term));
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(term)}`, {
          signal: ctrl.signal,
        });
        if (!res.ok) {
          setResults([]);
        } else {
          const data = await res.json();
          const merged = [...quickLinksFiltered(term), ...(data.results || [])];
          setResults(merged);
        }
      } catch {
        // aborted or network error
      } finally {
        setLoading(false);
        setActive(0);
      }
    }, 180);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, open]);

  const choose = (r: Result) => {
    setOpen(false);
    router.push(r.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) choose(r);
    }
  };

  if (!open) return null;

  // Group results in render order
  const groups: { name: string; items: Result[] }[] = [];
  for (const r of results) {
    const last = groups[groups.length - 1];
    if (last && last.name === r.group) last.items.push(r);
    else groups.push({ name: r.group, items: [r] });
  }
  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-[#0D1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 h-12 border-b border-white/6">
          <Search size={18} className="text-slate-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search clients, leads, tickets, users, keywords…"
            className="flex-1 bg-transparent text-white placeholder:text-slate-600 text-sm outline-none"
          />
          {loading && <Loader2 size={16} className="text-slate-500 animate-spin" />}
          <kbd className="hidden sm:inline text-[10px] text-slate-600 border border-white/10 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-1">
          {results.length === 0 && !loading && (
            <p className="px-4 py-8 text-center text-sm text-slate-500">No matches.</p>
          )}
          {groups.map((g) => (
            <div key={g.name} className="py-1">
              <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
                {g.name}
              </p>
              {g.items.map((r) => {
                flatIndex += 1;
                const isActive = flatIndex === active;
                return (
                  <button
                    key={`${r.group}-${r.id}`}
                    onClick={() => choose(r)}
                    onMouseEnter={() => setActive(flatIndex)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-sm ${
                      isActive ? "bg-white/8 text-white" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{r.title}</span>
                      {r.subtitle && (
                        <span className="block truncate text-xs text-slate-500">{r.subtitle}</span>
                      )}
                    </span>
                    <ArrowRight size={14} className="text-slate-600 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 h-9 border-t border-white/6 text-[11px] text-slate-600">
          <span>↑↓ navigate · ↵ open</span>
          <span>⌘K to toggle</span>
        </div>
      </div>
    </div>
  );
}

function quickLinksFiltered(q: string): Result[] {
  if (!q) return QUICK_LINKS;
  const t = q.toLowerCase();
  return QUICK_LINKS.filter((l) => l.title.toLowerCase().includes(t));
}
