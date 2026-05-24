"use client";

import { useState, useEffect, useCallback } from "react";
import Badge from "@/components/admin/shared/Badge";
import { Plus, Trash2, RotateCcw } from "lucide-react";

interface ApprovalItem {
  id: string;
  title: string;
  description: string;
  category: string | null;
  status: string;
  fileUrls: string[];
  dueDate: string | null;
  createdAt: string;
  project: { id: string; name: string } | null;
  createdBy: { id: string; name: string | null };
  responses: {
    id: string;
    action: string;
    reason: string | null;
    comment: string | null;
    createdAt: string;
    user: { id: string; name: string | null };
  }[];
}

const STATUS_VARIANT: Record<string, "emerald" | "amber" | "red" | "slate"> = {
  PENDING: "amber",
  APPROVED: "emerald",
  REVISION_REQUESTED: "red",
  EXPIRED: "slate",
};

export default function ClientApprovals({ clientId }: { clientId: string }) {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchApprovals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/approvals?limit=50`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setApprovals(data.approvals);
      setTotal(data.total);
    } catch {
      setError("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // 1. Create the approval
      const createRes = await fetch(`/api/admin/clients/${clientId}/approvals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category: category || undefined,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        }),
      });

      if (!createRes.ok) {
        const data = await createRes.json();
        throw new Error(data.error || "Failed to create approval");
      }

      const approval = await createRes.json();

      // 2. Upload files if any
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("approvalId", approval.id);
        files.forEach((f) => formData.append("files", f));

        const uploadRes = await fetch(`/api/admin/clients/${clientId}/approvals/upload`, {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.uploaded.length > 0) {
            // Update the approval with file URLs
            const patchRes = await fetch(`/api/admin/approvals/${approval.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ fileUrls: uploadData.uploaded }),
            });
            if (!patchRes.ok) {
              setError("Approval created but files may not be linked. Please check and re-upload.");
            }
          }
        } else {
          setError("Approval created but file upload failed. You can re-upload from the approval detail.");
        }
      }

      // Reset form and refresh
      setTitle("");
      setDescription("");
      setCategory("");
      setDueDate("");
      setFiles([]);
      setShowForm(false);
      await fetchApprovals();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create approval");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this approval?")) return;
    try {
      const res = await fetch(`/api/admin/approvals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchApprovals();
    } catch {
      setError("Failed to delete approval");
    }
  }

  async function handleResubmit(id: string) {
    try {
      const res = await fetch(`/api/admin/approvals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: "Resubmitted for review" }),
      });
      if (!res.ok) throw new Error("Failed to resubmit");
      await fetchApprovals();
    } catch {
      setError("Failed to resubmit approval");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-5 h-5 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{total} approval{total !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus size={14} /> New Approval
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
          <div>
            <label htmlFor="approval-title" className="block text-xs text-slate-400 mb-1">Title *</label>
            <input
              id="approval-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald"
              placeholder="e.g., Website Redesign Proposal"
            />
          </div>
          <div>
            <label htmlFor="approval-description" className="block text-xs text-slate-400 mb-1">Description *</label>
            <textarea
              id="approval-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={5000}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald resize-none"
              placeholder="Describe what needs to be reviewed..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="approval-category" className="block text-xs text-slate-400 mb-1">Category</label>
              <input
                id="approval-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                maxLength={50}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald"
                placeholder="e.g., Proposal, Report"
              />
            </div>
            <div>
              <label htmlFor="approval-due-date" className="block text-xs text-slate-400 mb-1">Due Date</label>
              <input
                id="approval-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>
          </div>
          <div>
            <label htmlFor="approval-files" className="block text-xs text-slate-400 mb-1">Files (max 5, 10MB each)</label>
            <input
              id="approval-files"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
              onChange={(e) => {
                const selected = Array.from(e.target.files || []).slice(0, 5);
                const maxSize = 10 * 1024 * 1024; // 10MB
                const oversized = selected.find((f) => f.size > maxSize);
                if (oversized) {
                  setError(`File "${oversized.name}" exceeds 10MB limit`);
                  return;
                }
                setError("");
                setFiles(selected);
              }}
              className="w-full text-sm text-slate-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-white/10 file:text-slate-300 file:text-xs file:font-medium file:cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || !title || !description}
              className="px-4 py-2 bg-emerald text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Creating..." : "Create Approval"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Approvals list */}
      <div className="space-y-3">
        {approvals.map((approval) => {
          const lastResponse = approval.responses[0];
          const canResubmit = approval.status === "REVISION_REQUESTED" || approval.status === "EXPIRED";

          return (
            <div key={approval.id} className="p-3 rounded-lg bg-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-white truncate">{approval.title}</p>
                    <Badge label={approval.status.replace(/_/g, " ")} variant={STATUS_VARIANT[approval.status] || "slate"} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {approval.category && <span>{approval.category}</span>}
                    <span>{new Date(approval.createdAt).toLocaleDateString()}</span>
                    {approval.fileUrls.length > 0 && <span>{approval.fileUrls.length} file{approval.fileUrls.length !== 1 ? "s" : ""}</span>}
                    {approval.project && <span>{approval.project.name}</span>}
                  </div>
                  {lastResponse && (
                    <p className="text-xs text-slate-400 mt-1">
                      Last response: {lastResponse.user.name || "User"} — {lastResponse.action.replace(/_/g, " ")}
                      {lastResponse.comment && `: "${lastResponse.comment.slice(0, 80)}${lastResponse.comment.length > 80 ? "..." : ""}"`}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {canResubmit && (
                    <button
                      onClick={() => handleResubmit(approval.id)}
                      title="Resubmit"
                      className="p-1.5 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                    >
                      <RotateCcw size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(approval.id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {approvals.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">No approvals yet. Create one to request client sign-off.</p>
        )}
      </div>
    </div>
  );
}
