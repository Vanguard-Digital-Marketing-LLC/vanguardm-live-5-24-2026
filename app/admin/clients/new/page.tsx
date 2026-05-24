"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SERVICE_TYPES = ["SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;
const CLIENT_STATUSES = ["PROSPECT", "ACTIVE", "PAUSED", "CHURNED"] as const;
const BILLING_CYCLES = ["MONTHLY", "QUARTERLY", "ANNUAL"] as const;

export default function NewClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    domain: "",
    phone: "",
    email: "",
    address: "",
    status: "PROSPECT" as string,
    monthlyRetainer: "",
    dailyBudget: "",
    billingCycle: "MONTHLY" as string,
    contractStart: "",
    contractEnd: "",
    slaResponseHours: "24",
    nimbataProjectId: "",
    gtmContainerId: "",
    cloudflareZoneId: "",
    googleAdsCustomerId: "",
    ga4PropertyId: "",
    searchConsoleUrl: "",
    notes: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactRole: "primary",
    services: [] as string[],
  });

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (svc: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { setError("Client name is required"); return; }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          domain: form.domain || null,
          phone: form.phone || null,
          email: form.email || null,
          address: form.address || null,
          status: form.status,
          monthlyRetainer: form.monthlyRetainer ? parseInt(form.monthlyRetainer) : null,
          dailyBudget: form.dailyBudget ? parseInt(form.dailyBudget) : null,
          billingCycle: form.billingCycle,
          contractStart: form.contractStart || null,
          contractEnd: form.contractEnd || null,
          slaResponseHours: parseInt(form.slaResponseHours) || 24,
          nimbataProjectId: form.nimbataProjectId || null,
          gtmContainerId: form.gtmContainerId || null,
          cloudflareZoneId: form.cloudflareZoneId || null,
          googleAdsCustomerId: form.googleAdsCustomerId || null,
          ga4PropertyId: form.ga4PropertyId || null,
          searchConsoleUrl: form.searchConsoleUrl || null,
          notes: form.notes || null,
          contacts: form.contactName && form.contactEmail
            ? [{ name: form.contactName, email: form.contactEmail, phone: form.contactPhone || null, role: form.contactRole, isPrimary: true }]
            : [],
          services: form.services.map((s) => ({ serviceType: s })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create client");
        return;
      }

      const client = await res.json();
      router.push(`/admin/clients/${client.id}`);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";
  const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link href="/admin/clients" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-3 transition-colors">
          <ArrowLeft size={14} /> Back to Clients
        </Link>
        <h1 className="font-display text-2xl font-bold text-white">New Client</h1>
        <p className="text-sm text-slate-400 mt-1">Add a new client to your portfolio</p>
      </div>

      {error && (
        <div className="bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label htmlFor="new-client-name" className={labelClass}>Client Name *</label><input id="new-client-name" className={inputClass} value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Acme Corp" required /></div>
            <div><label htmlFor="new-client-domain" className={labelClass}>Domain</label><input id="new-client-domain" className={inputClass} value={form.domain} onChange={(e) => updateField("domain", e.target.value)} placeholder="acme.com" /></div>
            <div><label htmlFor="new-client-phone" className={labelClass}>Phone</label><input id="new-client-phone" className={inputClass} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="(555) 123-4567" /></div>
            <div><label htmlFor="new-client-email" className={labelClass}>Email</label><input id="new-client-email" className={inputClass} type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="contact@acme.com" /></div>
          </div>
          <div><label htmlFor="new-client-address" className={labelClass}>Address</label><textarea id="new-client-address" className={inputClass} rows={2} value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="123 Main St, City, TX" /></div>
        </div>

        {/* Services */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Services</h2>
          <div className="flex flex-wrap gap-2">
            {SERVICE_TYPES.map((svc) => (
              <button
                key={svc}
                type="button"
                onClick={() => toggleService(svc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  form.services.includes(svc)
                    ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {svc}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Contact */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Primary Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label htmlFor="new-client-contact-name" className={labelClass}>Name</label><input id="new-client-contact-name" className={inputClass} value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} placeholder="John Smith" /></div>
            <div><label htmlFor="new-client-contact-email" className={labelClass}>Email</label><input id="new-client-contact-email" className={inputClass} type="email" value={form.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} placeholder="john@acme.com" /></div>
            <div><label htmlFor="new-client-contact-phone" className={labelClass}>Phone</label><input id="new-client-contact-phone" className={inputClass} value={form.contactPhone} onChange={(e) => updateField("contactPhone", e.target.value)} placeholder="(555) 123-4567" /></div>
            <div>
              <label htmlFor="new-client-contact-role" className={labelClass}>Role</label>
              <select id="new-client-contact-role" className={inputClass} value={form.contactRole} onChange={(e) => updateField("contactRole", e.target.value)}>
                <option value="primary">Primary</option>
                <option value="billing">Billing</option>
                <option value="technical">Technical</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contract & Billing */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Contract &amp; Billing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="new-client-status" className={labelClass}>Status</label>
              <select id="new-client-status" className={inputClass} value={form.status} onChange={(e) => updateField("status", e.target.value)}>
                {CLIENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div><label htmlFor="new-client-monthly-budget" className={labelClass}>Monthly Budget ($)</label><input id="new-client-monthly-budget" className={inputClass} type="number" step="0.01" value={form.monthlyRetainer} onChange={(e) => updateField("monthlyRetainer", e.target.value)} placeholder="1500.00" /></div>
            <div><label htmlFor="new-client-daily-budget" className={labelClass}>Daily Budget ($)</label><input id="new-client-daily-budget" className={inputClass} type="number" value={form.dailyBudget} onChange={(e) => updateField("dailyBudget", e.target.value)} placeholder="50" /></div>
            <div>
              <label htmlFor="new-client-billing-cycle" className={labelClass}>Billing Cycle</label>
              <select id="new-client-billing-cycle" className={inputClass} value={form.billingCycle} onChange={(e) => updateField("billingCycle", e.target.value)}>
                {BILLING_CYCLES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label htmlFor="new-client-contract-start" className={labelClass}>Contract Start</label><input id="new-client-contract-start" className={inputClass} type="date" value={form.contractStart} onChange={(e) => updateField("contractStart", e.target.value)} /></div>
            <div><label htmlFor="new-client-contract-end" className={labelClass}>Contract End</label><input id="new-client-contract-end" className={inputClass} type="date" value={form.contractEnd} onChange={(e) => updateField("contractEnd", e.target.value)} /></div>
            <div><label htmlFor="new-client-sla-hours" className={labelClass}>SLA Response (hours)</label><input id="new-client-sla-hours" className={inputClass} type="number" value={form.slaResponseHours} onChange={(e) => updateField("slaResponseHours", e.target.value)} /></div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Integrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label htmlFor="new-client-google-ads" className={labelClass}>Google Ads Customer ID</label><input id="new-client-google-ads" className={inputClass} value={form.googleAdsCustomerId} onChange={(e) => updateField("googleAdsCustomerId", e.target.value)} placeholder="7202644860" /></div>
            <div><label htmlFor="new-client-ga4" className={labelClass}>GA4 Property ID</label><input id="new-client-ga4" className={inputClass} value={form.ga4PropertyId} onChange={(e) => updateField("ga4PropertyId", e.target.value)} placeholder="properties/501975040" /></div>
            <div><label htmlFor="new-client-search-console" className={labelClass}>Search Console URL</label><input id="new-client-search-console" className={inputClass} value={form.searchConsoleUrl} onChange={(e) => updateField("searchConsoleUrl", e.target.value)} placeholder="sc-domain:example.com" /></div>
            <div><label htmlFor="new-client-nimbata" className={labelClass}>Nimbata Project ID</label><input id="new-client-nimbata" className={inputClass} value={form.nimbataProjectId} onChange={(e) => updateField("nimbataProjectId", e.target.value)} /></div>
            <div><label htmlFor="new-client-gtm" className={labelClass}>GTM Container ID</label><input id="new-client-gtm" className={inputClass} value={form.gtmContainerId} onChange={(e) => updateField("gtmContainerId", e.target.value)} placeholder="GTM-XXXXXXX" /></div>
            <div><label htmlFor="new-client-cloudflare" className={labelClass}>Cloudflare Zone ID</label><input id="new-client-cloudflare" className={inputClass} value={form.cloudflareZoneId} onChange={(e) => updateField("cloudflareZoneId", e.target.value)} /></div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Internal Notes</h2>
          <textarea className={inputClass} rows={3} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Internal notes about this client..." aria-label="Internal notes" />
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/clients" className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors">Cancel</Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Client"}
          </button>
        </div>
      </form>
    </div>
  );
}
