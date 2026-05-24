"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";

export default function ExportButton({ reportId }: { reportId: string }) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/export-html`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to export");
      }
      const { url } = await res.json();
      window.open(url, "_blank");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to export report.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
    >
      {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
      Export HTML
    </button>
  );
}
