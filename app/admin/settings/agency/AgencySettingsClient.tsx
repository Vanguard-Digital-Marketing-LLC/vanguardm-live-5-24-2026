"use client";

import { useState } from "react";

interface AgencySettingsClientProps {
  agency: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    primaryColor: string | null;
    accentColor: string | null;
  };
}

export default function AgencySettingsClient({ agency }: AgencySettingsClientProps) {
  const [form, setForm] = useState({
    name: agency.name,
    logoUrl: agency.logoUrl || "",
    primaryColor: agency.primaryColor || "#10b981",
    accentColor: agency.accentColor || "#f59e0b",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/agency/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Settings saved");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save");
      }
    } catch {
      setMessage("Network error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-5">
        <div>
          <label htmlFor="agency-name" className="block text-sm font-medium text-slate-300 mb-1.5">Agency Name</label>
          <input
            id="agency-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-slate-300 mb-1.5">Subdomain</span>
          <p className="text-sm text-slate-400">{agency.slug}.vanguardm.com</p>
        </div>

        <div>
          <label htmlFor="agency-logo-url" className="block text-sm font-medium text-slate-300 mb-1.5">Logo URL</label>
          <input
            id="agency-logo-url"
            type="url"
            value={form.logoUrl}
            onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            placeholder="https://example.com/logo.png"
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label htmlFor="agency-primary-color" className="block text-sm font-medium text-slate-300 mb-1.5">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                id="agency-primary-color"
                type="color"
                value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                className="h-10 w-10 rounded border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                id="agency-primary-color-text"
                type="text"
                value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                aria-label="Primary color hex value"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="agency-accent-color" className="block text-sm font-medium text-slate-300 mb-1.5">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                id="agency-accent-color"
                type="color"
                value={form.accentColor}
                onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                className="h-10 w-10 rounded border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                id="agency-accent-color-text"
                type="text"
                value={form.accentColor}
                onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                aria-label="Accent color hex value"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <span className={`text-sm ${message === "Settings saved" ? "text-emerald-400" : "text-red-400"}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
