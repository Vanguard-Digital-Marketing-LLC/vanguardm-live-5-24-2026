"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Check, Users, User } from "lucide-react";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none";

const PERIOD_OPTIONS = [
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
];

interface ClientOption {
  id: string;
  name: string;
}

export default function NewReportPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [period, setPeriod] = useState("MONTHLY");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  // Progress tracking for bulk creation
  const [createdCount, setCreatedCount] = useState(0);
  const [totalToCreate, setTotalToCreate] = useState(0);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.clients)
            ? data.clients
            : [];
        setClients(
          list
            .map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }))
            .sort((a: ClientOption, b: ClientOption) => a.name.localeCompare(b.name))
        );
      })
      .catch(() => setError("Failed to load clients"))
      .finally(() => setLoadingClients(false));
  }, []);

  // Auto-set date range based on period
  useEffect(() => {
    if (!period) return;
    const now = new Date();

    if (period === "WEEKLY") {
      const start = new Date(now);
      start.setDate(start.getDate() - 7);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
    } else if (period === "MONTHLY") {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    } else if (period === "QUARTERLY") {
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const prevQuarterMonth = currentQuarter === 0 ? 9 : (currentQuarter - 1) * 3;
      const year = currentQuarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const start = new Date(year, prevQuarterMonth, 1);
      const end = new Date(year, prevQuarterMonth + 3, 0);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [period]);

  function toggleClient(clientId: string) {
    setSelectedClientIds((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  }

  function selectAll() {
    const filtered = filteredClients.map((c) => c.id);
    const allSelected = filtered.every((id) => selectedClientIds.includes(id));
    if (allSelected) {
      setSelectedClientIds((prev) => prev.filter((id) => !filtered.includes(id)));
    } else {
      setSelectedClientIds((prev) => [...new Set([...prev, ...filtered])]);
    }
  }

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  function generateTitle(clientName: string) {
    const periodLabel = PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? period;
    const now = new Date();
    const monthName = now.toLocaleString("en-US", { month: "long", year: "numeric" });
    return `${clientName} - ${periodLabel} Report - ${monthName}`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClientIds.length === 0) return setError("Please select at least one client");
    if (!startDate || !endDate) return setError("Date range is required");

    setError("");
    setSubmitting(true);
    setCreatedCount(0);
    setTotalToCreate(selectedClientIds.length);

    const createdReportIds: string[] = [];
    const errors: string[] = [];

    for (const clientId of selectedClientIds) {
      const client = clients.find((c) => c.id === clientId);
      if (!client) continue;

      try {
        const res = await fetch("/api/admin/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            title: generateTitle(client.name),
            period,
            startDate,
            endDate,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed");
        }
        const report = await res.json();
        createdReportIds.push(report.id);
      } catch (err) {
        errors.push(`${client.name}: ${err instanceof Error ? err.message : "Failed"}`);
      }
      setCreatedCount((prev) => prev + 1);
    }

    if (errors.length > 0) {
      setError(`Created ${createdReportIds.length}/${selectedClientIds.length} reports. Errors:\n${errors.join("\n")}`);
      setSubmitting(false);
      return;
    }

    // If single report created, go straight to edit. Otherwise go to reports list.
    if (createdReportIds.length === 1) {
      router.push(`/admin/reports/${createdReportIds[0]}/edit`);
    } else {
      router.push("/admin/reports");
    }
  };

  const isSingleMode = selectedClientIds.length <= 1;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/reports"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Reports
      </Link>

      <div>
        <h1 className="font-display text-2xl font-bold text-white">New Report</h1>
        <p className="text-sm text-slate-400 mt-1">
          Select one or more clients to create performance reports
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 whitespace-pre-line">
            {error}
          </div>
        )}

        {/* Client multi-select */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span id="report-clients-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Clients *
            </span>
            {selectedClientIds.length > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                {selectedClientIds.length === 1 ? (
                  <><User size={12} /> 1 client selected</>
                ) : (
                  <><Users size={12} /> {selectedClientIds.length} clients selected</>
                )}
              </span>
            )}
          </div>

          {loadingClients ? (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 size={14} className="animate-spin" /> Loading clients...
            </div>
          ) : (
            <div role="group" aria-labelledby="report-clients-label" className="border border-white/10 rounded-lg overflow-hidden">
              {/* Search + Select All bar */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/10">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search clients..."
                  aria-label="Search clients"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors whitespace-nowrap"
                >
                  {filteredClients.length > 0 && filteredClients.every((c) => selectedClientIds.includes(c.id))
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              {/* Client list */}
              <div className="max-h-64 overflow-y-auto">
                {filteredClients.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-slate-500">
                    {searchFilter ? "No clients match your search" : "No clients found"}
                  </div>
                ) : (
                  filteredClients.map((client) => {
                    const selected = selectedClientIds.includes(client.id);
                    return (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => toggleClient(client.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          selected
                            ? "bg-emerald-500/[0.08] hover:bg-emerald-500/[0.12]"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-white/20 bg-white/5"
                          }`}
                        >
                          {selected && <Check size={12} className="text-slate-950" />}
                        </div>
                        <span className={`text-sm ${selected ? "text-white font-medium" : "text-slate-300"}`}>
                          {client.name}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Period */}
        <div>
          <span id="report-period-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Report Period *</span>
          <div role="group" aria-labelledby="report-period-label" className="grid grid-cols-3 gap-3">
            {PERIOD_OPTIONS.map((opt) => {
              const checked = period === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPeriod(opt.value)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className={`text-sm font-medium ${checked ? "text-emerald-300" : "text-white"}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="report-start-date" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Start Date *</label>
            <input
              id="report-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="report-end-date" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">End Date *</label>
            <input
              id="report-end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Preview — show what will be created */}
        {selectedClientIds.length > 1 && (
          <div className="bg-white/[0.02] border border-white/6 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Reports to create ({selectedClientIds.length})
            </p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {selectedClientIds.map((id) => {
                const client = clients.find((c) => c.id === id);
                if (!client) return null;
                return (
                  <p key={id} className="text-xs text-slate-300">
                    {generateTitle(client.name)}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/6">
          <Link
            href="/admin/reports"
            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || selectedClientIds.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                {totalToCreate > 1 ? `Creating ${createdCount}/${totalToCreate}...` : "Creating..."}
              </>
            ) : (
              <>
                {selectedClientIds.length > 1
                  ? `Create ${selectedClientIds.length} Reports`
                  : "Create Report"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
