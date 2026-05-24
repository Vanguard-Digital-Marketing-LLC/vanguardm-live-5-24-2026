"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import Link from "next/link";
import { Users, Flame, ThermometerSun, Search, Plus, Loader2, ExternalLink } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SidePanel from "@/components/admin/shared/SidePanel";
import LeadScoreCard from "@/components/admin/leads/LeadScoreCard";
import LeadActivityTimeline from "@/components/admin/leads/LeadActivityTimeline";

/* ──────────────────────────────────────────────
   LeadPipeline — Kanban board for lead management.
   Drag cards between status columns. Click to
   open detail panel with score + timeline.
   ────────────────────────────────────────────── */

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string | null;
  status: string;
  score: number;
  scoreBreakdown: Record<string, number> | null;
  assignedToId: string | null;
  assignedTo: { id: string; name: string | null; email: string } | null;
  createdAt: string;
  updatedAt: string;
}

interface Activity {
  id: string;
  type: string;
  data: Record<string, unknown> | null;
  createdAt: string;
}

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"] as const;

const STATUS_CONFIG: Record<string, { label: string; color: string; dotColor: string }> = {
  NEW: { label: "New", color: "bg-blue-400/10 border-blue-400/20", dotColor: "bg-blue-400" },
  CONTACTED: { label: "Contacted", color: "bg-amber/10 border-amber/20", dotColor: "bg-amber" },
  QUALIFIED: { label: "Qualified", color: "bg-emerald/10 border-emerald/20", dotColor: "bg-emerald" },
  PROPOSAL: { label: "Proposal", color: "bg-purple-400/10 border-purple-400/20", dotColor: "bg-purple-400" },
  WON: { label: "Won", color: "bg-emerald/10 border-emerald/20", dotColor: "bg-emerald" },
  LOST: { label: "Lost", color: "bg-red-400/10 border-red-400/20", dotColor: "bg-red-400" },
};

const TEMP_COLORS: Record<string, string> = {
  cold: "bg-blue-400",
  warm: "bg-amber-400",
  hot: "bg-orange-500",
  very_hot: "bg-red-500",
};

function getTemperature(score: number): string {
  if (score >= 41) return "very_hot";
  if (score >= 26) return "hot";
  if (score >= 11) return "warm";
  return "cold";
}

function getTemperatureLabel(temp: string): string {
  const labels: Record<string, string> = { cold: "Cold", warm: "Warm", hot: "Hot", very_hot: "Very Hot" };
  return labels[temp] || temp;
}

export default function LeadPipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailLeadId, setDetailLeadId] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "NEW",
    notes: "",
  });
  const [createErr, setCreateErr] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads?pageSize=200&sortBy=score&sortOrder=desc");
      if (res.ok) {
        const json = await res.json();
        setLeads(json.data || []);
      }
    } catch {
      // Keep existing data on error
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchLeads().finally(() => setLoading(false));
  }, [fetchLeads]);

  // Filtered leads
  const filtered = leads.filter((lead) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.company || "").toLowerCase().includes(q)
    );
  });

  // Group by status
  const columns: Record<string, Lead[]> = {};
  for (const status of STATUSES) {
    columns[status] = filtered.filter((l) => l.status === status);
  }

  // Metrics
  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.score >= 26).length;
  const avgScore = totalLeads > 0
    ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / totalLeads)
    : 0;

  // Drag and drop handler
  const handleDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    const newStatus = destination.droppableId;
    const lead = leads.find((l) => l.id === draggableId);
    if (!lead || lead.status === newStatus) return;

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === draggableId ? { ...l, status: newStatus } : l)),
    );

    try {
      const res = await fetch("/api/admin/leads/pipeline", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draggableId, status: newStatus }),
      });
      if (!res.ok) {
        // Revert on failure
        setLeads((prev) =>
          prev.map((l) =>
            l.id === draggableId ? { ...l, status: lead.status } : l,
          ),
        );
      }
    } catch {
      // Revert on network error
      setLeads((prev) =>
        prev.map((l) =>
          l.id === draggableId ? { ...l, status: lead.status } : l,
        ),
      );
    }
  };

  // Open detail panel — uses activities from pipeline data
  const openDetail = (lead: Lead) => {
    setDetailLeadId(lead.id);
    // Pipeline response includes activities on each lead
    const leadWithActivities = lead as Lead & { activities?: Activity[] };
    if (leadWithActivities.activities) {
      setActivities(leadWithActivities.activities);
      setActivitiesLoading(false);
    } else {
      setActivities([]);
      setActivitiesLoading(false);
    }
  };

  const detailLead = leads.find((l) => l.id === detailLeadId) || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        Loading leads...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Lead Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Drag leads between stages to update status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              aria-label="Search leads"
              className="pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-48"
            />
          </div>
          <button
            onClick={() => {
              setCreateErr(null);
              setCreateOpen(true);
            }}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium"
          >
            <Plus size={16} /> New lead
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Total Leads" value={totalLeads} icon={Users} accent="emerald" />
        <MetricCard label="Hot Leads" value={hotLeads} icon={Flame} accent="red" />
        <MetricCard label="Avg Score" value={avgScore} icon={ThermometerSun} accent="amber" />
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
          {STATUSES.map((status) => {
            const config = STATUS_CONFIG[status];
            const columnLeads = columns[status] || [];

            return (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-[#111827] border rounded-xl overflow-hidden transition-colors ${
                      snapshot.isDraggingOver
                        ? "border-emerald/40"
                        : "border-white/6"
                    }`}
                  >
                    {/* Column header */}
                    <div className="px-3 py-2.5 border-b border-white/6 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                        {config.label}
                      </h3>
                      <span className="text-xs text-slate-500 ml-auto">
                        {columnLeads.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="p-2 space-y-2 min-h-[120px]">
                      {columnLeads.map((lead, index) => {
                        const temp = getTemperature(lead.score);

                        return (
                          <Draggable
                            key={lead.id}
                            draggableId={lead.id}
                            index={index}
                          >
                            {(dragProvided, dragSnapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                onClick={() => openDetail(lead)}
                                className={`bg-white/5 rounded-lg p-3 border cursor-pointer transition-colors ${
                                  dragSnapshot.isDragging
                                    ? "border-emerald/40 shadow-lg"
                                    : "border-white/6 hover:border-white/12"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-medium text-white truncate">
                                    {lead.name}
                                  </p>
                                  {/* Score badge */}
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${TEMP_COLORS[temp]}`}
                                    title={`Score: ${lead.score} (${getTemperatureLabel(temp)})`}
                                  >
                                    {lead.score}
                                  </div>
                                </div>
                                <p className="text-xs text-slate-400 truncate mt-0.5">
                                  {lead.email}
                                </p>
                                {lead.source && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-white/5 text-slate-500 mt-2">
                                    {lead.source.replace(/_/g, " ")}
                                  </span>
                                )}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* Detail Side Panel */}
      <SidePanel
        open={!!detailLeadId}
        onClose={() => setDetailLeadId(null)}
        title="Lead Details"
      >
        {detailLead && (
          <div className="space-y-6">
            <LeadScoreCard lead={detailLead} />

            {/* Contact Info */}
            <div className="space-y-2">
              <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Contact Information
              </h4>
              <div className="space-y-1.5">
                <p className="text-sm text-slate-300">
                  <span className="text-slate-500 mr-2">Email:</span>
                  <a href={`mailto:${detailLead.email}`} className="text-emerald-400 hover:text-emerald-300">
                    {detailLead.email}
                  </a>
                </p>
                {detailLead.phone && (
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-500 mr-2">Phone:</span>
                    <a href={`tel:${detailLead.phone}`} className="text-emerald-400 hover:text-emerald-300">
                      {detailLead.phone}
                    </a>
                  </p>
                )}
                {detailLead.company && (
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-500 mr-2">Company:</span>
                    {detailLead.company}
                  </p>
                )}
                {detailLead.source && (
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-500 mr-2">Source:</span>
                    {detailLead.source.replace(/_/g, " ")}
                  </p>
                )}
                <p className="text-sm text-slate-300">
                  <span className="text-slate-500 mr-2">Created:</span>
                  {new Date(detailLead.createdAt).toLocaleDateString()}
                </p>
                <Link
                  href={`/admin/leads/${detailLead.id}`}
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 mt-2"
                >
                  Open full detail <ExternalLink size={11} />
                </Link>
              </div>
            </div>

            {/* Status Change */}
            <div>
              <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                Status
              </h4>
              <select
                value={detailLead.status}
                aria-label="Change status"
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  setLeads((prev) =>
                    prev.map((l) =>
                      l.id === detailLead.id ? { ...l, status: newStatus } : l,
                    ),
                  );
                  await fetch("/api/admin/leads/pipeline", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: detailLead.id, status: newStatus }),
                  });
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 [&>option]:text-black [&>option]:bg-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Timeline */}
            <div>
              <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                Activity Timeline
              </h4>
              {activitiesLoading ? (
                <p className="text-xs text-slate-500">Loading activities...</p>
              ) : (
                <LeadActivityTimeline activities={activities as { id: string; type: string; data: Record<string, string | number | boolean | null> | null; createdAt: string }[]} />
              )}
            </div>
          </div>
        )}
      </SidePanel>

      {createOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[10vh] px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => !creating && setCreateOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg font-semibold text-white mb-1">New lead</h2>
            <p className="text-xs text-slate-500 mb-5">
              Manually add a lead. Activity will log a {`"lead_created"`} entry.
            </p>
            {createErr && (
              <p className="mb-3 text-xs text-red-400">{createErr}</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Input2
                label="Name *"
                value={createForm.name}
                onChange={(v) => setCreateForm((f) => ({ ...f, name: v }))}
              />
              <Input2
                label="Email *"
                value={createForm.email}
                onChange={(v) => setCreateForm((f) => ({ ...f, email: v }))}
              />
              <Input2
                label="Phone"
                value={createForm.phone}
                onChange={(v) => setCreateForm((f) => ({ ...f, phone: v }))}
              />
              <Input2
                label="Company"
                value={createForm.company}
                onChange={(v) => setCreateForm((f) => ({ ...f, company: v }))}
              />
              <Input2
                label="Source"
                value={createForm.source}
                onChange={(v) => setCreateForm((f) => ({ ...f, source: v }))}
                placeholder="referral, ads, manual…"
              />
              <div>
                <label htmlFor="lead-create-status" className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
                  Status
                </label>
                <select
                  id="lead-create-status"
                  value={createForm.status}
                  onChange={(e) => setCreateForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white outline-none focus:border-emerald-400/40"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_CONFIG[s].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="lead-create-notes" className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  id="lead-create-notes"
                  rows={2}
                  value={createForm.notes}
                  onChange={(e) => setCreateForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full px-3 py-2 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white outline-none focus:border-emerald-400/40 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setCreateOpen(false)}
                disabled={creating}
                className="h-9 px-3 rounded-md text-sm text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setCreateErr(null);
                  if (!createForm.name.trim() || !createForm.email.trim()) {
                    setCreateErr("Name and email are required");
                    return;
                  }
                  setCreating(true);
                  try {
                    const res = await fetch("/api/admin/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(createForm),
                    });
                    if (!res.ok) {
                      const err = await res.json().catch(() => ({}));
                      setCreateErr(err.error || `Failed (${res.status})`);
                    } else {
                      setCreateOpen(false);
                      setCreateForm({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        source: "",
                        status: "NEW",
                        notes: "",
                      });
                      await fetchLeads();
                    }
                  } catch {
                    setCreateErr("Network error");
                  } finally {
                    setCreating(false);
                  }
                }}
                disabled={creating}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium disabled:opacity-50"
              >
                {creating && <Loader2 size={14} className="animate-spin" />}
                Create lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input2({
  label,
  value,
  onChange,
  placeholder,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
}) {
  const fieldId = id || `lead-create-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
        {label}
      </label>
      <input
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40"
      />
    </div>
  );
}
