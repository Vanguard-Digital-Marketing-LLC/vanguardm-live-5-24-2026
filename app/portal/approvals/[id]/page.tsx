"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/admin/shared/Badge";
import { ArrowLeft, FileText, Image as ImageIcon, Download, CheckCircle, XCircle, Paperclip, X } from "lucide-react";

interface ApprovalResponse {
  id: string;
  action: string;
  reason: string | null;
  comment: string | null;
  fileUrls: string[];
  createdAt: string;
  user: { id: string; name: string | null };
}

interface Approval {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string | null;
  status: string;
  fileUrls: string[];
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  project: { id: string; name: string } | null;
  createdBy: { id: string; name: string | null };
  responses: ApprovalResponse[];
}

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate"> = {
    PENDING: "amber",
    APPROVED: "emerald",
    REVISION_REQUESTED: "red",
    EXPIRED: "slate",
  };
  return map[status] || "slate";
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf" || ext === "doc" || ext === "docx") return FileText;
  if (["png", "jpg", "jpeg", "webp"].includes(ext || "")) return ImageIcon;
  return FileText;
}

function isPreviewable(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase();
  return ["pdf", "png", "jpg", "jpeg", "webp"].includes(ext || "");
}

const REASONS: Record<string, string> = {
  NEEDS_CHANGES: "Needs Changes",
  WRONG_DIRECTION: "Wrong Direction",
  MISSING_INFO: "Missing Info",
  OTHER: "Other",
};

export default function ApprovalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [approval, setApproval] = useState<Approval | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Response form state
  const [showRespondForm, setShowRespondForm] = useState(false);
  const [respondAction, setRespondAction] = useState<"APPROVED" | "REVISION_REQUESTED" | null>(null);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [responseFiles, setResponseFiles] = useState<File[]>([]);

  const fetchApproval = useCallback(async () => {
    try {
      const res = await fetch(`/api/portal/approvals/${id}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setApproval(data);
    } catch {
      setError("Failed to load approval details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchApproval();
  }, [fetchApproval]);

  async function handleRespond() {
    if (!respondAction) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("action", respondAction);
      if (respondAction === "REVISION_REQUESTED" && reason) {
        formData.append("reason", reason);
      }
      if (comment) {
        formData.append("comment", comment);
      }
      for (const file of responseFiles) {
        formData.append("files", file);
      }

      const res = await fetch(`/api/portal/approvals/${id}/respond`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit response");
      }

      // Refresh the approval data
      await fetchApproval();
      setShowRespondForm(false);
      setRespondAction(null);
      setReason("");
      setComment("");
      setResponseFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit response");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !approval) {
    return (
      <div className="space-y-4">
        <Link href="/portal/approvals" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft size={16} /> Back to Approvals
        </Link>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!approval) return null;

  const filenameFromPath = (path: string) => path.split("/").pop() || path;

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/portal/approvals" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} /> Back to Approvals
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-xl font-bold text-white">{approval.title}</h1>
            <Badge label={approval.status.replace(/_/g, " ")} variant={getStatusVariant(approval.status)} />
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {approval.category && <span>{approval.category}</span>}
            {approval.project && <span>Project: {approval.project.name}</span>}
            <span>Created {formatDate(approval.createdAt)}</span>
            {approval.createdBy.name && <span>by {approval.createdBy.name}</span>}
          </div>
          {approval.dueDate && (
            <p className={`text-xs mt-1 ${new Date(approval.dueDate) < new Date() ? "text-red-400" : "text-slate-400"}`}>
              Due: {formatDate(approval.dueDate)}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Description</h2>
        <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{approval.description}</p>
      </div>

      {/* Files */}
      {approval.fileUrls.length > 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Attached Files ({approval.fileUrls.length})
          </h2>
          <div className="space-y-3">
            {approval.fileUrls.map((fileUrl) => {
              const filename = filenameFromPath(fileUrl);
              const Icon = getFileIcon(filename);
              const previewable = isPreviewable(filename);
              const ext = filename.split(".").pop()?.toLowerCase();

              return (
                <div key={fileUrl} className="space-y-2">
                  <div className="flex items-center justify-between bg-white/3 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-slate-400" />
                      <span className="text-sm text-slate-300">{filename}</span>
                    </div>
                    <a
                      href={`/api/portal/approvals/${approval.id}/files/${filename}`}
                      download
                      className="flex items-center gap-1 text-xs text-teal hover:text-teal-400"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>
                  {/* Inline preview for images and PDFs */}
                  {previewable && ext !== "pdf" && (
                    <div className="rounded-lg overflow-hidden border border-white/6 bg-black/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/portal/approvals/${approval.id}/files/${filename}?inline=true`}
                        alt={filename}
                        className="max-w-full max-h-96 object-contain mx-auto"
                      />
                    </div>
                  )}
                  {ext === "pdf" && (
                    <iframe
                      src={`/api/portal/approvals/${approval.id}/files/${filename}?inline=true`}
                      className="w-full h-96 rounded-lg border border-white/6"
                      title={filename}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Response actions */}
      {approval.status === "PENDING" && !showRespondForm && (
        <div className="flex gap-3">
          <button
            onClick={() => { setRespondAction("APPROVED"); setShowRespondForm(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors"
          >
            <CheckCircle size={16} /> Approve
          </button>
          <button
            onClick={() => { setRespondAction("REVISION_REQUESTED"); setShowRespondForm(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-colors"
          >
            <XCircle size={16} /> Request Revision
          </button>
        </div>
      )}

      {/* Response form */}
      {showRespondForm && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">
            {respondAction === "APPROVED" ? "Approve This Item" : "Request Revision"}
          </h2>

          {respondAction === "REVISION_REQUESTED" && (
            <div>
              <label htmlFor="approval-reason" className="block text-xs text-slate-400 mb-1.5">Reason *</label>
              <select
                id="approval-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal"
              >
                <option value="">Select a reason...</option>
                {Object.entries(REASONS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="approval-comment" className="block text-xs text-slate-400 mb-1.5">
              Comment {reason === "OTHER" ? "*" : "(optional)"}
            </label>
            <textarea
              id="approval-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={2000}
              placeholder="Add any feedback or notes..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal resize-none"
            />
          </div>

          <div>
            <span className="block text-xs text-slate-400 mb-1.5">Attach Files (optional, max 5)</span>
            <label className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/8 cursor-pointer transition-colors">
              <Paperclip size={14} />
              Choose Files
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const selected = Array.from(e.target.files || []);
                  setResponseFiles((prev) => [...prev, ...selected].slice(0, 5));
                  e.target.value = "";
                }}
              />
            </label>
            {responseFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {responseFiles.map((file, i) => (
                  <div key={`${file.name}-${i}`} className="flex items-center gap-2 text-xs text-slate-400">
                    <FileText size={12} />
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-slate-600">({(file.size / 1024).toFixed(0)} KB)</span>
                    <button
                      onClick={() => setResponseFiles((prev) => prev.filter((_, j) => j !== i))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleRespond}
              disabled={submitting || (respondAction === "REVISION_REQUESTED" && !reason) || (reason === "OTHER" && !comment)}
              className="px-4 py-2 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Submitting..." : "Submit Response"}
            </button>
            <button
              onClick={() => { setShowRespondForm(false); setRespondAction(null); setReason(""); setComment(""); setError(""); setResponseFiles([]); }}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Response history timeline */}
      {approval.responses.length > 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Response History</h2>
          <div className="space-y-4">
            {approval.responses.map((response) => {
              const isApproved = response.action === "APPROVED";
              const isResubmitted = response.action === "RESUBMITTED";
              const borderColor = isApproved ? "border-emerald" : isResubmitted ? "border-cyan-400" : "border-red-400";

              return (
                <div key={response.id} className={`border-l-2 ${borderColor} pl-4`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">
                      {response.user.name || "User"}
                    </span>
                    <Badge
                      label={response.action.replace(/_/g, " ")}
                      variant={isApproved ? "emerald" : isResubmitted ? "cyan" : "red"}
                    />
                    <span className="text-xs text-slate-500">{formatDate(response.createdAt)}</span>
                  </div>
                  {response.reason && (
                    <p className="text-xs text-slate-400">
                      Reason: {REASONS[response.reason] || response.reason}
                    </p>
                  )}
                  {response.comment && (
                    <p className="text-sm text-slate-300 mt-1 whitespace-pre-wrap">{response.comment}</p>
                  )}
                  {response.fileUrls.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {response.fileUrls.map((fileUrl) => {
                        const fname = filenameFromPath(fileUrl);
                        const Icon = getFileIcon(fname);
                        return (
                          <div key={fileUrl} className="flex items-center gap-2">
                            <Icon size={14} className="text-slate-500" />
                            <a
                              href={`/api/portal/approvals/${approval.id}/files/${fname}`}
                              download
                              className="text-xs text-teal hover:text-teal-400"
                            >
                              {fname}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
