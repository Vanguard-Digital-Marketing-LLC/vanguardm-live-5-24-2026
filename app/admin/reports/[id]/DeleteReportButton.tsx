"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteReportButton({ reportId, reportTitle }: { reportId: string; reportTitle: string }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      router.push("/admin/reports");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete report.");
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-400">Delete &quot;{reportTitle}&quot;?</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-lg text-xs font-medium hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-400 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-colors"
    >
      <Trash2 size={14} />
      Delete
    </button>
  );
}
