"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function TicketDeleteButton({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this ticket? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/tickets");
      }
    } catch {
      // ignore
    }
    setDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 border border-white/10 transition-colors disabled:opacity-50"
      title="Delete ticket"
    >
      <Trash2 size={14} />
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
