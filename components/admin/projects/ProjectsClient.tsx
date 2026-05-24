"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderKanban, Play, Clock, CheckCircle, Plus } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import Badge from "@/components/admin/shared/Badge";
import SidePanel from "@/components/admin/shared/SidePanel";
import Link from "next/link";

const SERVICE_TYPES = ["SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;
const PROJECT_STATUSES = ["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED"] as const;

const STATUS_VARIANT: Record<string, "emerald" | "amber" | "cyan" | "slate"> = {
  PLANNING: "cyan",
  ACTIVE: "emerald",
  ON_HOLD: "amber",
  COMPLETED: "slate",
};

interface ProjectClient {
  id: string;
  name: string;
  domain: string | null;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  serviceType: string;
  status: string;
  dueDate: string | null;
  client: ProjectClient;
  _count: { tasks: number };
}

interface ClientOption {
  id: string;
  name: string;
}

interface Metrics {
  activeCount: number;
  planningCount: number;
  completedCount: number;
  onHoldCount: number;
}

interface ProjectsClientProps {
  projects: Project[];
  clients: ClientOption[];
  metrics: Metrics;
}

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";
const labelClass =
  "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

export default function ProjectsClient({ projects, clients, metrics }: ProjectsClientProps) {
  const router = useRouter();
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    clientId: "",
    serviceType: "WEB" as string,
    description: "",
    startDate: "",
    dueDate: "",
    budget: "",
  });

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setForm({
      name: "",
      clientId: "",
      serviceType: "WEB",
      description: "",
      startDate: "",
      dueDate: "",
      budget: "",
    });
    setError("");
  };

  const handleOpen = () => {
    resetForm();
    setPanelOpen(true);
  };

  const handleClose = () => {
    setPanelOpen(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.clientId || !form.serviceType) {
      setError("Name, client, and service type are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          clientId: form.clientId,
          serviceType: form.serviceType,
          description: form.description || null,
          startDate: form.startDate || null,
          dueDate: form.dueDate || null,
          budget: form.budget ? Math.round(parseFloat(form.budget) * 100) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create project");
        return;
      }

      setPanelOpen(false);
      resetForm();
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-400 mt-1">Track all client projects</p>
        </div>
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricCard label="Active" value={metrics.activeCount} icon={Play} accent="emerald" />
        <MetricCard label="Planning" value={metrics.planningCount} icon={FolderKanban} accent="cyan" />
        <MetricCard label="On Hold" value={metrics.onHoldCount} icon={Clock} accent="amber" />
        <MetricCard label="Completed" value={metrics.completedCount} icon={CheckCircle} accent="emerald" />
      </div>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Projects ({projects.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-white">{project.name}</p>
                    {project.description && <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/clients/${project.client.id}`} className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                      {project.client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><ServiceTypeBadge type={project.serviceType} /></td>
                  <td className="px-4 py-3"><Badge label={project.status} variant={STATUS_VARIANT[project.status] || "slate"} /></td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "\u2014"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{project._count.tasks}</td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SidePanel open={panelOpen} onClose={handleClose} title="New Project">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="project-name" className={labelClass}>Project Name *</label>
            <input
              id="project-name"
              className={inputClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Website Redesign"
              required
            />
          </div>

          <div>
            <label htmlFor="project-client" className={labelClass}>Client *</label>
            <select
              id="project-client"
              className={inputClass}
              value={form.clientId}
              onChange={(e) => updateField("clientId", e.target.value)}
              required
            >
              <option value="">Select a client...</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <span id="project-service-type-label" className={labelClass}>Service Type *</span>
            <div role="group" aria-labelledby="project-service-type-label" className="flex flex-wrap gap-2">
              {SERVICE_TYPES.map((svc) => (
                <button
                  key={svc}
                  type="button"
                  onClick={() => updateField("serviceType", svc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    form.serviceType === svc
                      ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="project-description" className={labelClass}>Description</label>
            <textarea
              id="project-description"
              className={inputClass}
              rows={3}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Brief description of the project scope..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="project-start-date" className={labelClass}>Start Date</label>
              <input
                id="project-start-date"
                className={inputClass}
                type="date"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="project-due-date" className={labelClass}>Due Date</label>
              <input
                id="project-due-date"
                className={inputClass}
                type="date"
                value={form.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="project-budget" className={labelClass}>Budget ($)</label>
            <input
              id="project-budget"
              className={inputClass}
              type="number"
              step="0.01"
              min="0"
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              placeholder="5000.00"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </SidePanel>
    </div>
  );
}
