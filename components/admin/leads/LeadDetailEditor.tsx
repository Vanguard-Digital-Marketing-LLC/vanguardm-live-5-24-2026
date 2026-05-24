"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, MessageSquarePlus, Loader2, Trash2 } from "lucide-react";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"] as const;
type Status = (typeof STATUSES)[number];

type Assignee = { id: string; name: string | null; email: string };

export default function LeadDetailEditor({
  leadId,
  initialStatus,
  initialAssignedToId,
  initialName,
  initialPhone,
  initialCompany,
  assignees,
}: {
  leadId: string;
  initialStatus: string;
  initialAssignedToId: string | null;
  initialName: string;
  initialPhone: string | null;
  initialCompany: string | null;
  assignees: Assignee[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [status, setStatus] = useState<Status>(
    (STATUSES as readonly string[]).includes(initialStatus) ? (initialStatus as Status) : "NEW",
  );
  const [assignedToId, setAssignedToId] = useState(initialAssignedToId || "");
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone || "");
  const [company, setCompany] = useState(initialCompany || "");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const flash = (kind: "ok" | "err", msg: string) => {
    setFeedback({ kind, msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          previousStatus: initialStatus !== status ? initialStatus : undefined,
          assignedToId: assignedToId || null,
          name,
          phone,
          company,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        flash("err", err.error || `Save failed (${res.status})`);
      } else {
        flash("ok", "Saved");
        startTransition(() => router.refresh());
      }
    } catch {
      flash("err", "Network error");
    } finally {
      setSaving(false);
    }
  };

  const addNote = async () => {
    const message = note.trim();
    if (!message) return;
    setPosting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        flash("err", err.error || `Failed (${res.status})`);
      } else {
        setNote("");
        flash("ok", "Note added");
        startTransition(() => router.refresh());
      }
    } catch {
      flash("err", "Network error");
    } finally {
      setPosting(false);
    }
  };

  const deleteLead = async () => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        flash("err", err.error || `Delete failed (${res.status})`);
        setDeleting(false);
      } else {
        router.push("/admin/leads");
      }
    } catch {
      flash("err", "Network error");
      setDeleting(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">Edit</h2>
        {feedback && (
          <span
            className={`text-xs ${feedback.kind === "ok" ? "text-emerald-400" : "text-red-400"}`}
          >
            {feedback.msg}
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Status" id="lead-status">
          <select
            id="lead-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className={selectCls}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Assigned to" id="lead-assigned-to">
          <select
            id="lead-assigned-to"
            value={assignedToId}
            onChange={(e) => setAssignedToId(e.target.value)}
            className={selectCls}
          >
            <option value="">— Unassigned —</option>
            {assignees.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name || a.email}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Name" id="lead-name">
          <input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Phone" id="lead-phone">
          <input
            id="lead-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Company" wide id="lead-company">
          <input
            id="lead-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={deleteLead}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
        >
          {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          Delete lead
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

      <div className="border-t border-white/6 pt-5 space-y-2">
        <label htmlFor="lead-add-note" className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
          Add a note
        </label>
        <textarea
          id="lead-add-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Logged a call, sent proposal, etc."
          rows={2}
          className={`${inputCls} resize-none`}
        />
        <div className="flex justify-end">
          <button
            onClick={addNote}
            disabled={posting || !note.trim()}
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-white/8 hover:bg-white/12 text-white text-xs font-medium disabled:opacity-50"
          >
            {posting ? <Loader2 size={12} className="animate-spin" /> : <MessageSquarePlus size={12} />}
            Add note
          </button>
        </div>
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
  const fieldId = id || `lead-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={fieldId} className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40";
const selectCls = inputCls;
