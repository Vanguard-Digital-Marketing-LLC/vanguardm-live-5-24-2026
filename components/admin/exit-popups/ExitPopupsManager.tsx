"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";

type Config = {
  id: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  offerType: string | null;
  isActive: boolean;
  showOnPaths: string[] | null;
  updatedAt: string;
};

const EMPTY_DRAFT = {
  headline: "",
  description: "",
  ctaText: "",
  ctaLink: "",
  offerType: "",
  isActive: true,
  showOnPaths: "",
};

export default function ExitPopupsManager({ initial }: { initial: Config[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [draftOpen, setDraftOpen] = useState(initial.length === 0);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [draftErr, setDraftErr] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const refresh = () => startTransition(() => router.refresh());

  const create = async () => {
    setDraftErr(null);
    if (!draft.headline.trim() || !draft.description.trim() || !draft.ctaText.trim() || !draft.ctaLink.trim()) {
      setDraftErr("All four fields above are required");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/exit-popups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          offerType: draft.offerType || null,
          showOnPaths: draft.showOnPaths
            ? draft.showOnPaths.split(",").map((s) => s.trim()).filter(Boolean)
            : null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setDraftErr(err.error || `Failed (${res.status})`);
      } else {
        setDraft(EMPTY_DRAFT);
        setDraftOpen(false);
        refresh();
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{initial.length} configuration{initial.length === 1 ? "" : "s"}</p>
        {!draftOpen && (
          <button
            onClick={() => {
              setDraft(EMPTY_DRAFT);
              setDraftErr(null);
              setDraftOpen(true);
            }}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium"
          >
            <Plus size={16} /> New popup
          </button>
        )}
      </div>

      {draftOpen && (
        <div className="bg-[#111827] border border-emerald-400/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-white">New popup</h3>
            {draftErr && <span className="text-xs text-red-400">{draftErr}</span>}
          </div>
          <Field label="Headline" id="popup-new-headline">
            <input
              id="popup-new-headline"
              value={draft.headline}
              onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
              className={inputCls}
              placeholder="Wait — before you go…"
            />
          </Field>
          <Field label="Description" id="popup-new-description">
            <textarea
              id="popup-new-description"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA text" id="popup-new-cta-text">
              <input
                id="popup-new-cta-text"
                value={draft.ctaText}
                onChange={(e) => setDraft({ ...draft, ctaText: e.target.value })}
                className={inputCls}
                placeholder="Get the playbook"
              />
            </Field>
            <Field label="CTA link" id="popup-new-cta-link">
              <input
                id="popup-new-cta-link"
                value={draft.ctaLink}
                onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })}
                className={inputCls}
                placeholder="/lp/free-audit"
              />
            </Field>
            <Field label="Offer type (optional)" id="popup-new-offer-type">
              <input
                id="popup-new-offer-type"
                value={draft.offerType}
                onChange={(e) => setDraft({ ...draft, offerType: e.target.value })}
                className={inputCls}
                placeholder="audit, lead-magnet, demo…"
              />
            </Field>
            <Field label="Show on paths (comma-separated, blank = all)" id="popup-new-show-paths">
              <input
                id="popup-new-show-paths"
                value={draft.showOnPaths}
                onChange={(e) => setDraft({ ...draft, showOnPaths: e.target.value })}
                className={inputCls}
                placeholder="/services, /pricing"
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={draft.isActive}
              onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })}
            />
            Active immediately
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setDraftOpen(false)}
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

      {initial.length === 0 && !draftOpen && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-10 text-center">
          <p className="text-sm text-slate-400">No exit popups configured yet.</p>
        </div>
      )}

      <div className="space-y-3">
        {initial.map((cfg) => (
          <ExistingRow key={cfg.id} cfg={cfg} onChange={refresh} />
        ))}
      </div>
    </div>
  );
}

function ExistingRow({ cfg, onChange }: { cfg: Config; onChange: () => void }) {
  const [edit, setEdit] = useState({
    headline: cfg.headline,
    description: cfg.description,
    ctaText: cfg.ctaText,
    ctaLink: cfg.ctaLink,
    offerType: cfg.offerType || "",
    isActive: cfg.isActive,
    showOnPaths: cfg.showOnPaths?.join(", ") || "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/exit-popups/${cfg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...edit,
          offerType: edit.offerType || null,
          showOnPaths: edit.showOnPaths
            ? edit.showOnPaths.split(",").map((s) => s.trim()).filter(Boolean)
            : null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setFeedback(err.error || `Failed (${res.status})`);
      } else {
        setFeedback("Saved");
        setTimeout(() => setFeedback(null), 2000);
        onChange();
      }
    } finally {
      setSaving(false);
    }
  };

  const del = async () => {
    if (!confirm("Delete this popup configuration?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/exit-popups/${cfg.id}`, { method: "DELETE" });
      if (res.ok) onChange();
      else setDeleting(false);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              edit.isActive ? "bg-emerald-400" : "bg-slate-600"
            }`}
          />
          <span className="text-xs text-slate-500">
            Updated {new Date(cfg.updatedAt).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {feedback && (
            <span className={`text-xs ${feedback === "Saved" ? "text-emerald-400" : "text-red-400"}`}>
              {feedback}
            </span>
          )}
          <button
            onClick={del}
            disabled={deleting}
            className="text-xs text-red-400 hover:text-red-300 inline-flex items-center gap-1"
          >
            {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Headline" id={`popup-${cfg.id}-headline`}>
          <input
            id={`popup-${cfg.id}-headline`}
            value={edit.headline}
            onChange={(e) => setEdit({ ...edit, headline: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="CTA text" id={`popup-${cfg.id}-cta-text`}>
          <input
            id={`popup-${cfg.id}-cta-text`}
            value={edit.ctaText}
            onChange={(e) => setEdit({ ...edit, ctaText: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="CTA link" wide id={`popup-${cfg.id}-cta-link`}>
          <input
            id={`popup-${cfg.id}-cta-link`}
            value={edit.ctaLink}
            onChange={(e) => setEdit({ ...edit, ctaLink: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Description" wide id={`popup-${cfg.id}-description`}>
          <textarea
            id={`popup-${cfg.id}-description`}
            value={edit.description}
            onChange={(e) => setEdit({ ...edit, description: e.target.value })}
            rows={2}
            className={`${inputCls} resize-none`}
          />
        </Field>
        <Field label="Offer type" id={`popup-${cfg.id}-offer-type`}>
          <input
            id={`popup-${cfg.id}-offer-type`}
            value={edit.offerType}
            onChange={(e) => setEdit({ ...edit, offerType: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Show on paths (comma-separated)" id={`popup-${cfg.id}-show-paths`}>
          <input
            id={`popup-${cfg.id}-show-paths`}
            value={edit.showOnPaths}
            onChange={(e) => setEdit({ ...edit, showOnPaths: e.target.value })}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={edit.isActive}
            onChange={(e) => setEdit({ ...edit, isActive: e.target.checked })}
          />
          Active
        </label>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-medium disabled:opacity-50"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
          Save
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  wide,
  id,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
  id?: string;
}) {
  const fieldId = id || `popup-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className={wide ? "col-span-2" : ""}>
      <label htmlFor={fieldId} className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40";
