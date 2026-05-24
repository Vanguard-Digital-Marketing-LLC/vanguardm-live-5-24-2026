"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  totalCount: number;
}

export default function LeadsTable({ leads: initialLeads, totalCount }: LeadsTableProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleMarkRead(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, read: true } : l))
        );
        router.refresh();
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">
            All Submissions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Service
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Message
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/4 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {lead.email}
                  </td>
                  <td className="px-4 py-3">
                    {lead.service && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald/10 text-emerald">
                        {lead.service}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400 max-w-[200px] truncate">
                    {lead.message}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {lead.read ? (
                      <span className="text-xs text-slate-500">Read</span>
                    ) : (
                      <span className="inline-block w-2 h-2 bg-emerald rounded-full" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {!lead.read && (
                        <button
                          onClick={() => handleMarkRead(lead.id)}
                          disabled={actionLoading === lead.id}
                          title="Mark as read"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                        >
                          <Eye size={13} />
                          {actionLoading === lead.id ? "..." : "Mark Read"}
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteTarget(lead)}
                        title="Delete lead"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-slate-500"
                  >
                    No leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-white/6 text-xs text-slate-500">
          Showing {leads.length} of {totalCount}
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message={
          deleteTarget
            ? `Are you sure you want to delete the submission from ${deleteTarget.name} (${deleteTarget.email})? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        danger
        loading={deleteLoading}
      />
    </>
  );
}
