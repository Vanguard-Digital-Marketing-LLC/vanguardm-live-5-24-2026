"use client";

import { useState, useEffect, useCallback } from "react";
import { LifeBuoy, AlertTriangle, Clock, Plus, Inbox, Trash2 } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";
import SidePanel from "@/components/admin/shared/SidePanel";
import AgentButton from "@/components/admin/shared/AgentButton";
import Link from "next/link";

// --------------- types ---------------

interface ClientRef {
  id: string;
  name: string;
  domain: string | null;
  slaResponseHours: number | null;
}

interface UserRef {
  id: string;
  name: string | null;
  email: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  clientId: string;
  client: ClientRef;
  assigneeId: string | null;
  assignee: UserRef | null;
  slaDeadline: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

interface TicketBoardProps {
  role: "ADMIN" | "TEAM";
  userId: string;
}

// --------------- helpers ---------------

const STATUS_VARIANT: Record<string, "emerald" | "amber" | "red" | "cyan" | "slate" | "purple"> = {
  QUEUED: "purple",
  OPEN: "red",
  IN_PROGRESS: "amber",
  WAITING: "cyan",
  RESOLVED: "emerald",
  CLOSED: "slate",
};

const PRIORITY_VARIANT: Record<string, "red" | "amber" | "slate"> = {
  URGENT: "red",
  HIGH: "amber",
  NORMAL: "slate",
  LOW: "slate",
};

const priorityOptions = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;

// --------------- component ---------------

export default function TicketBoard({ role, userId }: TicketBoardProps) {
  // ---- data state ----
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [clients, setClients] = useState<ClientRef[]>([]);
  const [users, setUsers] = useState<UserRef[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- panel state ----
  const [createOpen, setCreateOpen] = useState(false);

  // ---- create form state ----
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    priority: "NORMAL",
    clientId: "",
    assigneeId: "",
  });
  const [createSaving, setCreateSaving] = useState(false);
  const [createError, setCreateError] = useState("");

  // --------------- data fetching ---------------

  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/tickets");
      if (res.ok) {
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      }
    } catch {
      // Network error - keep existing tickets
    }
  }, []);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      await Promise.all([
        fetchTickets(),
        fetch("/api/admin/clients")
          .then((r) => r.json())
          .then((data) => {
            const mapped = (Array.isArray(data) ? data : []).map(
              (c: { id: string; name: string; domain?: string | null; slaResponseHours?: number | null }) => ({
                id: c.id,
                name: c.name,
                domain: c.domain || null,
                slaResponseHours: c.slaResponseHours ?? null,
              })
            );
            setClients(mapped);
          })
          .catch(() => {}),
        fetch("/api/admin/users?pageSize=100")
          .then((r) => r.json())
          .then((d) => setUsers(d.data || []))
          .catch(() => {}),
      ]);
      setLoading(false);
    }
    loadAll();
  }, [fetchTickets]);

  // --------------- metrics ---------------

  const now = new Date();
  const queuedCount = tickets.filter((t) => t.status === "QUEUED").length;
  const openCount = tickets.filter((t) => t.status === "OPEN").length;
  const inProgressCount = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const overdueCount = tickets.filter(
    (t) =>
      t.slaDeadline &&
      new Date(t.slaDeadline) < now &&
      !["RESOLVED", "CLOSED"].includes(t.status)
  ).length;

  // --------------- create ticket ---------------

  const handleCreate = async () => {
    if (!createForm.title.trim() || !createForm.clientId) return;
    setCreateSaving(true);
    setCreateError("");

    const body: Record<string, string | null> = {
      title: createForm.title.trim(),
      description: createForm.description.trim() || null,
      priority: createForm.priority,
      clientId: createForm.clientId,
      assigneeId: createForm.assigneeId || null,
    };

    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchTickets();
        setCreateOpen(false);
        setCreateForm({
          title: "",
          description: "",
          priority: "NORMAL",
          clientId: "",
          assigneeId: "",
        });
      } else {
        const err = await res.json().catch(() => ({ error: "Failed to create ticket" }));
        setCreateError(err.error || "Failed to create ticket");
      }
    } catch {
      setCreateError("Network error. Please try again.");
    }
    setCreateSaving(false);
  };

  // --------------- render ---------------

  const selectClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 [&>option]:text-black [&>option]:bg-white";
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-sm text-slate-400 mt-1">Track and resolve client support requests</p>
        </div>
        {role === "ADMIN" && (
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            New Ticket
          </button>
        )}
      </div>

      {/* ---- Metrics ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricCard label="Queued" value={queuedCount} icon={Inbox} accent="purple" />
        <MetricCard label="Open" value={openCount} icon={LifeBuoy} accent="red" />
        <MetricCard label="In Progress" value={inProgressCount} icon={Clock} accent="amber" />
        <MetricCard label="Overdue" value={overdueCount} icon={AlertTriangle} accent="red" />
      </div>

      {/* ---- Ticket Table ---- */}
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">
            All Tickets ({tickets.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Assignee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">SLA Deadline</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Created</th>
                {role === "ADMIN" && (
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const isOverdue =
                  ticket.slaDeadline &&
                  new Date(ticket.slaDeadline) < now &&
                  !["RESOLVED", "CLOSED"].includes(ticket.status);
                return (
                  <tr
                    key={ticket.id}
                    className={`border-b border-white/4 hover:bg-white/5 transition-colors ${isOverdue ? "bg-red-400/5" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <Link href={`/admin/tickets/${ticket.id}`} className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">
                        {ticket.title}
                      </Link>
                      {ticket.description && (
                        <p className="text-xs text-slate-500 line-clamp-1">{ticket.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/clients/${ticket.client.id}`}
                        className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                      >
                        {ticket.client.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={ticket.status.replace(/_/g, " ")}
                        variant={STATUS_VARIANT[ticket.status] || "slate"}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={ticket.priority}
                        variant={PRIORITY_VARIANT[ticket.priority] || "slate"}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {ticket.assignee?.name || "Unassigned"}
                    </td>
                    <td className="px-4 py-3">
                      {ticket.slaDeadline ? (
                        <span
                          className={`text-sm ${isOverdue ? "text-red-400 font-semibold" : "text-slate-400"}`}
                        >
                          {new Date(ticket.slaDeadline).toLocaleString()}
                          {isOverdue && " (OVERDUE)"}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-600">&mdash;</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    {role === "ADMIN" && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {["OPEN", "IN_PROGRESS"].includes(ticket.status) && (
                            <AgentButton ticketId={ticket.id} onComplete={() => fetchTickets()} />
                          )}
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (!confirm("Delete this ticket?")) return;
                              const res = await fetch(`/api/admin/tickets/${ticket.id}`, { method: "DELETE" });
                              if (res.ok) fetchTickets();
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            title="Delete ticket"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan={role === "ADMIN" ? 8 : 7} className="text-center py-8 text-slate-500">
                    No tickets yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- Create Side Panel ---- */}
      <SidePanel
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
          setCreateError("");
        }}
        title="New Ticket"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="create-ticket-title" className="text-xs text-slate-400 mb-1 block">Title *</label>
            <input
              id="create-ticket-title"
              className={inputClass}
              value={createForm.title}
              onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              placeholder="Brief summary of the issue"
            />
          </div>
          <div>
            <label htmlFor="create-ticket-description" className="text-xs text-slate-400 mb-1 block">Description</label>
            <textarea
              id="create-ticket-description"
              className={`${inputClass} min-h-[100px]`}
              value={createForm.description}
              onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
              placeholder="Detailed description of the issue..."
            />
          </div>
          <div>
            <label htmlFor="create-ticket-client" className="text-xs text-slate-400 mb-1 block">Client *</label>
            <select
              id="create-ticket-client"
              className={selectClass}
              value={createForm.clientId}
              onChange={(e) => setCreateForm({ ...createForm, clientId: e.target.value })}
            >
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="create-ticket-priority" className="text-xs text-slate-400 mb-1 block">Priority</label>
              <select
                id="create-ticket-priority"
                className={selectClass}
                value={createForm.priority}
                onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
              >
                {priorityOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="create-ticket-assignee" className="text-xs text-slate-400 mb-1 block">Assignee</label>
              <select
                id="create-ticket-assignee"
                className={selectClass}
                value={createForm.assigneeId}
                onChange={(e) => setCreateForm({ ...createForm, assigneeId: e.target.value })}
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.email}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {createError && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {createError}
            </p>
          )}
          <button
            onClick={handleCreate}
            disabled={!createForm.title.trim() || !createForm.clientId || createSaving}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {createSaving ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </SidePanel>
    </div>
  );
}
