"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, ArrowRight, Loader2 } from "lucide-react";

type FormRow = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  stepCount: number;
  responseCount: number;
  updatedAt: string;
};

export default function FormsListClient({
  initial,
  canCreate,
}: {
  initial: FormRow[];
  canCreate: boolean;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const refresh = () => startTransition(() => router.refresh());

  const create = async () => {
    setErr(null);
    if (!name.trim() || !slug.trim()) {
      setErr("Name and slug are required");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, steps: [] }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setErr(e.error || `Failed (${res.status})`);
      } else {
        const created = await res.json();
        setOpen(false);
        setName("");
        setSlug("");
        refresh();
        router.push(`/admin/forms/${created.id}`);
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {initial.length} form{initial.length === 1 ? "" : "s"}
        </p>
        {canCreate && (
          <button
            onClick={() => {
              setErr(null);
              setOpen(true);
            }}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium"
          >
            <Plus size={16} /> New form
          </button>
        )}
      </div>

      {open && (
        <div className="bg-[#111827] border border-emerald-400/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-white">New form</h3>
            {err && <span className="text-xs text-red-400">{err}</span>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="form-new-name" className={labelCls}>Name</label>
              <input
                id="form-new-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(slugify(e.target.value));
                }}
                className={inputCls}
                placeholder="Free SEO audit"
              />
            </div>
            <div>
              <label htmlFor="form-new-slug" className={labelCls}>Slug (URL)</label>
              <input
                id="form-new-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                className={inputCls}
                placeholder="free-seo-audit"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setOpen(false)}
              disabled={creating}
              className="h-9 px-3 rounded-md text-sm text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={create}
              disabled={creating}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium disabled:opacity-50"
            >
              {creating && <Loader2 size={14} className="animate-spin" />}
              Create
            </button>
          </div>
        </div>
      )}

      {initial.length === 0 ? (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-10 text-center">
          <p className="text-sm text-slate-400">No forms yet.</p>
        </div>
      ) : (
        <div className="bg-[#111827] border border-white/6 rounded-xl divide-y divide-white/6">
          {initial.map((f) => (
            <Link
              key={f.id}
              href={`/admin/forms/${f.id}`}
              className="flex items-center justify-between p-4 hover:bg-white/[0.03]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      f.isActive ? "bg-emerald-400" : "bg-slate-600"
                    }`}
                  />
                  <p className="text-sm font-medium text-white truncate">{f.name}</p>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  /{f.slug} · {f.stepCount} step{f.stepCount === 1 ? "" : "s"} ·{" "}
                  {f.responseCount} response{f.responseCount === 1 ? "" : "s"}
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-600" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const labelCls = "block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5";
const inputCls =
  "w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40";
