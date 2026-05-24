"use client";

import { useState } from "react";
import TrafficSectionForm from "./sections/TrafficSectionForm";
import AdsSectionForm from "./sections/AdsSectionForm";
import SeoSectionForm from "./sections/SeoSectionForm";
import SocialSectionForm from "./sections/SocialSectionForm";
import CustomSectionForm from "./sections/CustomSectionForm";
import MarketingSectionForm from "./sections/MarketingSectionForm";
import CallsSectionForm from "./sections/CallsSectionForm";

interface SectionFormProps {
  initialType: string;
  initialTitle: string;
  initialData: Record<string, unknown>;
  initialNotes: string;
  onSave: (data: {
    type: string;
    title: string;
    data: Record<string, unknown>;
    notes: string;
  }) => void;
  onCancel: () => void;
}

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

const SECTION_TYPES = [
  { value: "TRAFFIC", label: "Traffic Analytics" },
  { value: "ADS", label: "Paid Advertising" },
  { value: "SEO", label: "SEO Performance" },
  { value: "SOCIAL", label: "Social Media" },
  { value: "CUSTOM", label: "Custom" },
  { value: "MARKETING", label: "Marketing Strategy" },
  { value: "CALLS", label: "Call Tracking" },
];

export default function SectionForm({
  initialType,
  initialTitle,
  initialData,
  initialNotes,
  onSave,
  onCancel,
}: SectionFormProps) {
  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState(initialTitle);
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    setSaving(true);
    onSave({ type, title, data, notes });
  };

  return (
    <div className="space-y-4">
      {/* Type selector */}
      <div>
        <label htmlFor="section-type" className="block text-xs text-slate-400 mb-1">Section Type</label>
        <select
          id="section-type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setData({});
          }}
          className={inputClass}
        >
          {SECTION_TYPES.map((st) => (
            <option key={st.value} value={st.value}>
              {st.label}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="section-title" className="block text-xs text-slate-400 mb-1">Section Title</label>
        <input
          id="section-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Section title..."
          className={inputClass}
        />
      </div>

      {/* Type-specific data fields */}
      <div className="border-t border-white/6 pt-4">
        {type === "TRAFFIC" && (
          <TrafficSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
        {type === "ADS" && (
          <AdsSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
        {type === "SEO" && (
          <SeoSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
        {type === "SOCIAL" && (
          <SocialSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
        {type === "CUSTOM" && (
          <CustomSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
        {type === "MARKETING" && (
          <MarketingSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
        {type === "CALLS" && (
          <CallsSectionForm
            data={data as Record<string, unknown>}
            onChange={(newData) => setData(newData as Record<string, unknown>)}
          />
        )}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="section-notes" className="block text-xs text-slate-400 mb-1">Notes (internal)</label>
        <textarea
          id="section-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Internal notes about this section..."
          className={inputClass}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={!title.trim() || saving}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Section"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-400 hover:text-white hover:border-white/20 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
