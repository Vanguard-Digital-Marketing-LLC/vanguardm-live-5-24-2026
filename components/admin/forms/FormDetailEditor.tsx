"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2 } from "lucide-react";

export default function FormDetailEditor({
  form,
  canEdit,
}: {
  form: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    steps: string; // pre-serialised JSON
  };
  canEdit: boolean;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [name, setName] = useState(form.name);
  const [slug, setSlug] = useState(form.slug);
  const [isActive, setIsActive] = useState(form.isActive);
  const [stepsJson, setStepsJson] = useState(form.steps);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const flash = (kind: "ok" | "err", msg: string) => {
    setFeedback({ kind, msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  const save = async () => {
    setSaving(true);
    let steps: unknown;
    try {
      steps = JSON.parse(stepsJson);
      if (!Array.isArray(steps)) {
        flash("err", "Steps must be a JSON array");
        setSaving(false);
        return;
      }
    } catch {
      flash("err", "Steps is not valid JSON");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(`/api/admin/forms/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, isActive, steps }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        flash("err", e.error || `Failed (${res.status})`);
      } else {
        flash("ok", "Saved");
        startTransition(() => router.refresh());
      }
    } finally {
      setSaving(false);
    }
  };

  const del = async () => {
    if (!confirm("Delete this form? Responses will also be deleted.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/forms/${form.id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/forms");
      else setDeleting(false);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">Configuration</h2>
        {feedback && (
          <span className={`text-xs ${feedback.kind === "ok" ? "text-emerald-400" : "text-red-400"}`}>
            {feedback.msg}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="form-detail-name" className={labelCls}>Name</label>
          <input
            id="form-detail-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!canEdit}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="form-detail-slug" className={labelCls}>Slug</label>
          <input
            id="form-detail-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            disabled={!canEdit}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="form-detail-steps" className={labelCls}>Steps (JSON array)</label>
        <textarea
          id="form-detail-steps"
          value={stepsJson}
          onChange={(e) => setStepsJson(e.target.value)}
          disabled={!canEdit}
          rows={14}
          spellCheck={false}
          className={`${inputCls} font-mono text-xs leading-relaxed h-auto`}
        />
        <p className="text-[10px] text-slate-600 mt-1.5">
          Each step is an object with at least <code>id</code>, <code>title</code>, and{" "}
          <code>fields[]</code>. The frontend renderer reads this verbatim.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          disabled={!canEdit}
        />
        Active (publicly accepting submissions)
      </label>

      {canEdit && (
        <div className="flex items-center justify-between pt-2 border-t border-white/6">
          <button
            onClick={del}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete form
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-400 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save changes
          </button>
        </div>
      )}
    </div>
  );
}

const labelCls = "block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5";
const inputCls =
  "w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40 disabled:opacity-60";
