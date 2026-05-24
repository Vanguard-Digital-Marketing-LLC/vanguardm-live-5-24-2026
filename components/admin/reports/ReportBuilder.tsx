"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Trash2,
  Plus,
  Save,
  Send,
  Globe,
  Megaphone,
  Search,
  Share2,
  FileText,
  Loader2,
  Target,
  Phone,
  Download,
} from "lucide-react";
import TrafficSectionForm from "./sections/TrafficSectionForm";
import AdsSectionForm from "./sections/AdsSectionForm";
import SeoSectionForm from "./sections/SeoSectionForm";
import SocialSectionForm from "./sections/SocialSectionForm";
import CustomSectionForm from "./sections/CustomSectionForm";
import MarketingSectionForm from "./sections/MarketingSectionForm";
import CallsSectionForm from "./sections/CallsSectionForm";

interface Section {
  id: string;
  type: "TRAFFIC" | "ADS" | "SEO" | "SOCIAL" | "CUSTOM" | "MARKETING" | "CALLS";
  title: string;
  data: Record<string, unknown>;
  notes: string | null;
  sortOrder: number;
}

interface Report {
  id: string;
  title: string;
  summary: string | null;
  period: string;
  startDate: string;
  endDate: string;
  status: string;
  client: { id: string; name: string };
  sections: Section[];
}

const SECTION_TYPES = [
  { type: "TRAFFIC" as const, label: "Traffic Analytics", icon: Globe },
  { type: "ADS" as const, label: "Paid Advertising", icon: Megaphone },
  { type: "SEO" as const, label: "SEO Performance", icon: Search },
  { type: "SOCIAL" as const, label: "Social Media", icon: Share2 },
  { type: "CUSTOM" as const, label: "Custom Section", icon: FileText },
  { type: "MARKETING" as const, label: "Marketing Strategy", icon: Target },
  { type: "CALLS" as const, label: "Call Tracking", icon: Phone },
];

const SECTION_ICON_MAP = {
  TRAFFIC: Globe,
  ADS: Megaphone,
  SEO: Search,
  SOCIAL: Share2,
  CUSTOM: FileText,
  MARKETING: Target,
  CALLS: Phone,
};

export default function ReportBuilder({ report: initialReport }: { report: Report }) {
  const router = useRouter();
  const [report, setReport] = useState(initialReport);
  const [sections, setSections] = useState<Section[]>(initialReport.sections || []);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [summary, setSummary] = useState(initialReport.summary || "");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [fetchingSection, setFetchingSection] = useState<string | null>(null);

  const toggleSection = useCallback((id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  }, []);

  async function addSection(type: Section["type"]) {
    setShowAddMenu(false);
    const defaultTitles: Record<string, string> = {
      TRAFFIC: "Website Traffic",
      ADS: "Paid Advertising",
      SEO: "SEO Performance",
      SOCIAL: "Social Media",
      CUSTOM: "Custom Section",
      MARKETING: "Marketing Strategy",
      CALLS: "Call Tracking",
    };

    try {
      const res = await fetch(`/api/admin/reports/${report.id}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title: defaultTitles[type],
          data: {},
        }),
      });

      if (!res.ok) throw new Error("Failed to add section");
      const section = await res.json();
      setSections((prev) => [...prev, section]);
      setExpandedSection(section.id);
    } catch {
      alert("Failed to add section. Please try again.");
    }
  }

  async function deleteSection(sectionId: string) {
    if (!confirm("Delete this section?")) return;

    try {
      const res = await fetch(`/api/admin/reports/${report.id}/sections`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId }),
      });

      if (!res.ok) throw new Error("Failed to delete section");
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      if (expandedSection === sectionId) setExpandedSection(null);
    } catch {
      alert("Failed to delete section.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function updateSectionData(sectionId: string, data: any) {
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, data } : s)));
  }

  async function updateSectionTitle(sectionId: string, title: string) {
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, title } : s)));
  }

  async function updateSectionNotes(sectionId: string, notes: string) {
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, notes } : s)));
  }

  // Drag-and-drop reorder
  function handleDragStart(idx: number) {
    setDraggedIdx(idx);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;

    const newSections = [...sections];
    const [dragged] = newSections.splice(draggedIdx, 1);
    newSections.splice(idx, 0, dragged);
    setSections(newSections.map((s, i) => ({ ...s, sortOrder: i })));
    setDraggedIdx(idx);
  }

  function handleDragEnd() {
    setDraggedIdx(null);
  }

  const FETCHABLE_TYPES = ["TRAFFIC", "ADS", "SEO", "CALLS"];
  const [fetchAllProgress, setFetchAllProgress] = useState<{ current: number; total: number } | null>(null);

  async function fetchLiveData(sectionId: string, sectionType: string) {
    setFetchingSection(sectionId);
    try {
      const res = await fetch(`/api/admin/reports/${report.id}/fetch-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionType }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to fetch data");
        return;
      }
      updateSectionData(sectionId, result.data);
    } catch {
      alert("Failed to fetch live data. Check the console for details.");
    } finally {
      setFetchingSection(null);
    }
  }

  async function fetchAllSections() {
    const fetchable = sections.filter((s) => FETCHABLE_TYPES.includes(s.type));
    if (fetchable.length === 0) return;

    setFetchAllProgress({ current: 0, total: fetchable.length });
    const errors: string[] = [];

    for (let i = 0; i < fetchable.length; i++) {
      const section = fetchable[i];
      setFetchingSection(section.id);
      setFetchAllProgress({ current: i + 1, total: fetchable.length });

      try {
        const res = await fetch(`/api/admin/reports/${report.id}/fetch-data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionType: section.type }),
        });
        const result = await res.json();
        if (!res.ok) {
          errors.push(`${section.title}: ${result.error || "Failed"}`);
        } else {
          updateSectionData(section.id, result.data);
        }
      } catch {
        errors.push(`${section.title}: Network error`);
      }
    }

    setFetchingSection(null);
    setFetchAllProgress(null);

    if (errors.length > 0) {
      alert(`Fetched ${fetchable.length - errors.length}/${fetchable.length} sections.\n\nErrors:\n${errors.join("\n")}`);
    }
  }

  async function saveAll() {
    setSaving(true);
    try {
      // Save report summary
      await fetch(`/api/admin/reports/${report.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
      });

      // Save all sections
      for (const section of sections) {
        await fetch(`/api/admin/reports/${report.id}/sections`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sectionId: section.id,
            title: section.title,
            data: section.data,
            notes: section.notes,
            sortOrder: section.sortOrder,
          }),
        });
      }

      setReport((prev) => ({ ...prev, summary }));
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function publishReport() {
    if (!confirm("Publish this report? It will be visible to the client in their portal.")) return;

    setPublishing(true);
    try {
      // Save first
      await saveAll();

      const res = await fetch(`/api/admin/reports/${report.id}/publish`, {
        method: "POST",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to publish");
      }

      setReport((prev) => ({ ...prev, status: "PUBLISHED" }));
      router.push(`/admin/reports/${report.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to publish report.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Edit Report</h1>
          <p className="text-sm text-slate-400 mt-1">
            {report.client.name} &mdash; {report.title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {sections.some((s) => FETCHABLE_TYPES.includes(s.type)) && (
            <button
              onClick={fetchAllSections}
              disabled={fetchAllProgress !== null}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
            >
              {fetchAllProgress ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Fetching {fetchAllProgress.current}/{fetchAllProgress.total}
                </>
              ) : (
                <>
                  <Download size={16} />
                  Fetch All
                </>
              )}
            </button>
          )}
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Draft
          </button>
          {report.status === "DRAFT" && (
            <button
              onClick={publishReport}
              disabled={publishing || sections.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {publishing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Publish
            </button>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <label htmlFor="report-executive-summary" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Executive Summary
        </label>
        <textarea
          id="report-executive-summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          placeholder="Write a brief executive summary of the report period..."
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none resize-y"
        />
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Report Sections</h2>
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors"
            >
              <Plus size={16} /> Add Section
            </button>
            {showAddMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a2332] border border-white/10 rounded-xl shadow-xl z-20 py-1">
                {SECTION_TYPES.map((st) => (
                  <button
                    key={st.type}
                    onClick={() => addSection(st.type)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <st.icon size={16} className="text-slate-500" />
                    {st.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {sections.length === 0 && (
          <div className="bg-[#111827] border border-white/6 border-dashed rounded-xl p-12 text-center">
            <p className="text-slate-500 text-sm">No sections yet. Click &quot;Add Section&quot; to start building the report.</p>
          </div>
        )}

        {sections.map((section, idx) => {
          const SectionIcon = SECTION_ICON_MAP[section.type];
          const isExpanded = expandedSection === section.id;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-[#111827] border rounded-xl transition-colors ${
                draggedIdx === idx ? "border-emerald-500/50 opacity-50" : "border-white/6"
              }`}
            >
              {/* Section Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="cursor-grab text-slate-600 hover:text-slate-400" onClick={(e) => e.stopPropagation()}>
                  <GripVertical size={16} />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <SectionIcon size={16} className="text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Section title"
                    className="bg-transparent text-sm font-medium text-white w-full focus:outline-none focus:ring-1 focus:ring-emerald-500/30 rounded px-1 -ml-1"
                  />
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider">{section.type}</p>
                </div>
                {FETCHABLE_TYPES.includes(section.type) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchLiveData(section.id, section.type);
                    }}
                    disabled={fetchingSection === section.id}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors p-1 disabled:opacity-50"
                    title="Fetch Live Data"
                  >
                    {fetchingSection === section.id ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                    <span className="hidden sm:inline">Fetch</span>
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSection(section.id);
                  }}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                  title="Delete section"
                >
                  <Trash2 size={14} />
                </button>
                {isExpanded ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
              </div>

              {/* Section Body */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/6 pt-4">
                  {section.type === "TRAFFIC" && (
                    <TrafficSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}
                  {section.type === "ADS" && (
                    <AdsSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}
                  {section.type === "SEO" && (
                    <SeoSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}
                  {section.type === "SOCIAL" && (
                    <SocialSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}
                  {section.type === "CUSTOM" && (
                    <CustomSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}
                  {section.type === "MARKETING" && (
                    <MarketingSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}
                  {section.type === "CALLS" && (
                    <CallsSectionForm
                      data={section.data as Record<string, unknown>}
                      onChange={(data) => updateSectionData(section.id, data)}
                    />
                  )}

                  {/* Section Notes */}
                  <div className="mt-4 pt-4 border-t border-white/6">
                    <label htmlFor={`report-section-notes-${section.id}`} className="block text-xs text-slate-500 mb-1">Section Notes (internal)</label>
                    <textarea
                      id={`report-section-notes-${section.id}`}
                      value={section.notes || ""}
                      onChange={(e) => updateSectionNotes(section.id, e.target.value)}
                      rows={2}
                      placeholder="Internal notes about this section..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none resize-y"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
