"use client";

const TABS = ["ALL", "SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;

interface ServiceFilterTabsProps {
  active: string;
  onChange: (tab: string) => void;
  counts?: Record<string, number>;
}

export default function ServiceFilterTabs({ active, onChange, counts }: ServiceFilterTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-[#111827] border border-white/6 rounded-lg p-1">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
            active === tab
              ? "bg-emerald-400/10 text-emerald-400"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {tab === "ALL" ? "All" : tab}
          {counts && counts[tab] !== undefined && (
            <span className="ml-1.5 text-slate-500">{counts[tab]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
