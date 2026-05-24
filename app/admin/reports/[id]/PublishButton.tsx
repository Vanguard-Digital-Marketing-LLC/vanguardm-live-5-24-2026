"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";

interface PublishButtonProps {
  reportId: string;
  hasSections: boolean;
}

export default function PublishButton({ reportId, hasSections }: PublishButtonProps) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);

  async function handlePublish() {
    if (!hasSections) {
      alert("Cannot publish a report with no sections. Add at least one section first.");
      return;
    }
    if (!confirm("Publish this report? It will be visible to the client in their portal and emailed to portal users.")) return;

    setPublishing(true);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/publish`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to publish");
      }

      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to publish report.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <button
      onClick={handlePublish}
      disabled={publishing || !hasSections}
      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50"
    >
      {publishing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
      Publish
    </button>
  );
}
