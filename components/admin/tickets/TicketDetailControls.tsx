"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserRef {
  id: string;
  name: string | null;
  email: string;
}

interface TicketDetailControlsProps {
  ticketId: string;
  currentStatus: string;
  currentPriority: string;
  currentAssigneeId: string | null;
  users: UserRef[];
  role: "ADMIN" | "TEAM";
}

const statuses = ["QUEUED", "OPEN", "IN_PROGRESS", "WAITING", "RESOLVED", "CLOSED"];
const priorities = ["LOW", "NORMAL", "HIGH", "URGENT"];

export default function TicketDetailControls({
  ticketId,
  currentStatus,
  currentPriority,
  currentAssigneeId,
  users,
  role,
}: TicketDetailControlsProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (field: string, value: string | null) => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Update failed" }));
        setError(data.error || "Update failed");
      } else {
        router.refresh();
      }
    } catch {
      setError("Network error");
    }
    setSaving(false);
  };

  const selectClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 [&>option]:text-black [&>option]:bg-white";

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-4 space-y-3">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Controls</h3>

      <div>
        <label htmlFor="ticket-detail-status" className="text-xs text-slate-400 mb-1 block">Status</label>
        <select
          id="ticket-detail-status"
          className={selectClass}
          value={currentStatus}
          onChange={(e) => handleUpdate("status", e.target.value)}
          disabled={saving}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ticket-detail-priority" className="text-xs text-slate-400 mb-1 block">Priority</label>
        <select
          id="ticket-detail-priority"
          className={selectClass}
          value={currentPriority}
          onChange={(e) => handleUpdate("priority", e.target.value)}
          disabled={saving}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {role === "ADMIN" && (
        <div>
          <label htmlFor="ticket-detail-assignee" className="text-xs text-slate-400 mb-1 block">Assignee</label>
          <select
            id="ticket-detail-assignee"
            className={selectClass}
            value={currentAssigneeId || ""}
            onChange={(e) => handleUpdate("assigneeId", e.target.value || null)}
            disabled={saving}
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {saving && <p className="text-xs text-slate-500">Saving...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
