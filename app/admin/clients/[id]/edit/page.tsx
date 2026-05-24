"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Plus, Trash2, Star, Pencil, X, Check } from "lucide-react";
import Link from "next/link";

const SERVICE_TYPES = ["SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;
const CLIENT_STATUSES = ["PROSPECT", "ACTIVE", "PAUSED", "CHURNED"] as const;
const BILLING_CYCLES = ["MONTHLY", "QUARTERLY", "ANNUAL"] as const;

interface ClientContact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isPrimary: boolean;
}

interface ClientService {
  serviceType: string;
}

interface ClientData {
  id: string;
  name: string;
  domain: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: string;
  monthlyRetainer: number | null;
  dailyBudget: number | null;
  billingCycle: string;
  contractStart: string | null;
  contractEnd: string | null;
  slaResponseHours: number | null;
  nimbataProjectId: string | null;
  gtmContainerId: string | null;
  cloudflareZoneId: string | null;
  googleAdsCustomerId: string | null;
  ga4PropertyId: string | null;
  searchConsoleUrl: string | null;
  notes: string | null;
  contacts: ClientContact[];
  services: ClientService[];
}

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Track original services for diffing on save
  const [originalServices, setOriginalServices] = useState<string[]>([]);

  // Contacts management
  const [contacts, setContacts] = useState<ClientContact[]>([]);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Omit<ClientContact, "id">>({ name: "", email: "", phone: null, role: "primary", isPrimary: false });
  const [showNewContact, setShowNewContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", role: "primary" });
  const [contactSaving, setContactSaving] = useState(false);

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
    services: [] as string[],
  });

  const fetchClient = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/clients/${id}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) {
        setError("Failed to load client");
        return;
      }

      const client: ClientData = await res.json();
      const serviceTypes = client.services.map((s) => s.serviceType);

      setOriginalServices(serviceTypes);
      setContacts(client.contacts);

      setForm({
        name: client.name || "",
        domain: client.domain || "",
        phone: client.phone || "",
        email: client.email || "",
        address: client.address || "",
        status: client.status || "PROSPECT",
        monthlyRetainer: client.monthlyRetainer ? client.monthlyRetainer.toString() : "",
        dailyBudget: client.dailyBudget ? client.dailyBudget.toString() : "",
        billingCycle: client.billingCycle || "MONTHLY",
        contractStart: client.contractStart ? client.contractStart.slice(0, 10) : "",
        contractEnd: client.contractEnd ? client.contractEnd.slice(0, 10) : "",
        slaResponseHours: (client.slaResponseHours ?? 24).toString(),
        nimbataProjectId: client.nimbataProjectId || "",
        gtmContainerId: client.gtmContainerId || "",
        cloudflareZoneId: client.cloudflareZoneId || "",
        googleAdsCustomerId: client.googleAdsCustomerId || "",
        ga4PropertyId: client.ga4PropertyId || "",
        searchConsoleUrl: client.searchConsoleUrl || "",
        notes: client.notes || "",
        services: serviceTypes,
      });
    } catch {
      setError("Network error loading client");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (svc: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  const startEditContact = (contact: ClientContact) => {
    setEditingContactId(contact.id);
    setEditingContact({ name: contact.name, email: contact.email, phone: contact.phone, role: contact.role, isPrimary: contact.isPrimary });
  };

  const cancelEditContact = () => {
    setEditingContactId(null);
  };

  const saveEditContact = async (contactId: string) => {
    if (!editingContact.name || !editingContact.email) { setError("Contact name and email are required"); return; }
    setContactSaving(true);
    try {
      const res = await fetch(`/api/admin/clients/${id}/contacts/${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingContact),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Failed to update contact"); return; }
      const updated = await res.json();
      setContacts((prev) => {
        let list = prev.map((c) => (c.id === contactId ? updated : c));
        if (updated.isPrimary) list = list.map((c) => (c.id === contactId ? c : { ...c, isPrimary: false }));
        return list;
      });
      setEditingContactId(null);
    } catch { setError("Network error updating contact"); } finally { setContactSaving(false); }
  };

  const deleteContact = async (contactId: string) => {
    if (!confirm("Delete this contact?")) return;
    setContactSaving(true);
    try {
      const res = await fetch(`/api/admin/clients/${id}/contacts/${contactId}`, { method: "DELETE" });
      if (!res.ok) { setError("Failed to delete contact"); return; }
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
    } catch { setError("Network error deleting contact"); } finally { setContactSaving(false); }
  };

  const setPrimaryContact = async (contactId: string) => {
    setContactSaving(true);
    try {
      const res = await fetch(`/api/admin/clients/${id}/contacts/${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPrimary: true }),
      });
      if (!res.ok) { setError("Failed to set primary contact"); return; }
      setContacts((prev) => prev.map((c) => ({ ...c, isPrimary: c.id === contactId })));
    } catch { setError("Network error"); } finally { setContactSaving(false); }
  };

  const addNewContact = async () => {
    if (!newContact.name || !newContact.email) { setError("Contact name and email are required"); return; }
    setContactSaving(true);
    try {
      const isPrimary = contacts.length === 0;
      const res = await fetch(`/api/admin/clients/${id}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newContact, phone: newContact.phone || null, isPrimary }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Failed to add contact"); return; }
      const created = await res.json();
      setContacts((prev) => [...prev, created]);
      setNewContact({ name: "", email: "", phone: "", role: "primary" });
      setShowNewContact(false);
    } catch { setError("Network error adding contact"); } finally { setContactSaving(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { setError("Client name is required"); return; }

    setSaving(true);
    setError("");

    try {
      // 1. PATCH the scalar client fields
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: "PATCH",
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
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update client");
        return;
      }

      // 2. Sync services: add new ones, remove old ones
      const toAdd = form.services.filter((s) => !originalServices.includes(s));
      const toRemove = originalServices.filter((s) => !form.services.includes(s));

      const servicePromises = [
        ...toAdd.map((svc) =>
          fetch(`/api/admin/clients/${id}/services`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serviceType: svc }),
          })
        ),
        ...toRemove.map((svc) =>
          fetch(`/api/admin/clients/${id}/services?serviceType=${svc}`, {
            method: "DELETE",
          })
        ),
      ];

      if (servicePromises.length > 0) {
        const results = await Promise.all(servicePromises);
        const failed = results.find((r) => !r.ok);
        if (failed) {
          setError("Client updated but some services failed to sync");
          return;
        }
      }

      router.push(`/admin/clients/${id}`);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";
  const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="animate-spin text-emerald-400" />
          <p className="text-sm text-slate-400">Loading client...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/admin/clients" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-3 transition-colors">
            <ArrowLeft size={14} /> Back to Clients
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">Client Not Found</h1>
          <p className="text-sm text-slate-400 mt-1">This client does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link href={`/admin/clients/${id}`} className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-3 transition-colors">
          <ArrowLeft size={14} /> Back to Client
        </Link>
        <h1 className="font-display text-2xl font-bold text-white">Edit Client</h1>
        <p className="text-sm text-slate-400 mt-1">Update client information</p>
      </div>

      {error && (
        <div className="bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label htmlFor="edit-client-name" className={labelClass}>Client Name *</label><input id="edit-client-name" className={inputClass} value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Acme Corp" required /></div>
            <div><label htmlFor="edit-client-domain" className={labelClass}>Domain</label><input id="edit-client-domain" className={inputClass} value={form.domain} onChange={(e) => updateField("domain", e.target.value)} placeholder="acme.com" /></div>
            <div><label htmlFor="edit-client-phone" className={labelClass}>Phone</label><input id="edit-client-phone" className={inputClass} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="(555) 123-4567" /></div>
            <div><label htmlFor="edit-client-email" className={labelClass}>Email</label><input id="edit-client-email" className={inputClass} type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="contact@acme.com" /></div>
          </div>
          <div><label htmlFor="edit-client-address" className={labelClass}>Address</label><textarea id="edit-client-address" className={inputClass} rows={2} value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="123 Main St, City, TX" /></div>
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

        {/* Contacts */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-white">Contacts ({contacts.length})</h2>
            <button
              type="button"
              onClick={() => setShowNewContact(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <Plus size={12} /> Add Contact
            </button>
          </div>

          {/* Existing contacts */}
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="rounded-lg bg-white/5 border border-white/10 p-4">
                {editingContactId === contact.id ? (
                  /* Editing mode */
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label htmlFor="edit-contact-name" className={labelClass}>Name *</label><input id="edit-contact-name" className={inputClass} value={editingContact.name} onChange={(e) => setEditingContact((p) => ({ ...p, name: e.target.value }))} /></div>
                      <div><label htmlFor="edit-contact-email" className={labelClass}>Email *</label><input id="edit-contact-email" className={inputClass} type="email" value={editingContact.email} onChange={(e) => setEditingContact((p) => ({ ...p, email: e.target.value }))} /></div>
                      <div><label htmlFor="edit-contact-phone" className={labelClass}>Phone</label><input id="edit-contact-phone" className={inputClass} value={editingContact.phone || ""} onChange={(e) => setEditingContact((p) => ({ ...p, phone: e.target.value || null }))} /></div>
                      <div>
                        <label htmlFor="edit-contact-role" className={labelClass}>Role</label>
                        <select id="edit-contact-role" className={inputClass} value={editingContact.role} onChange={(e) => setEditingContact((p) => ({ ...p, role: e.target.value }))}>
                          <option value="primary">Primary</option>
                          <option value="billing">Billing</option>
                          <option value="technical">Technical</option>
                          <option value="marketing">Marketing</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => saveEditContact(contact.id)} disabled={contactSaving} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 disabled:opacity-50 transition-colors">
                        <Check size={12} /> Save
                      </button>
                      <button type="button" onClick={cancelEditContact} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 hover:text-white transition-colors">
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display mode */
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{contact.name}</p>
                        {contact.isPrimary && <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">Primary</span>}
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">{contact.role}</span>
                      </div>
                      <p className="text-xs text-slate-400">{contact.email}{contact.phone ? ` · ${contact.phone}` : ""}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!contact.isPrimary && (
                        <button type="button" onClick={() => setPrimaryContact(contact.id)} disabled={contactSaving} title="Set as primary" className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-400/10 transition-colors disabled:opacity-50">
                          <Star size={14} />
                        </button>
                      )}
                      <button type="button" onClick={() => startEditContact(contact)} title="Edit contact" className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button type="button" onClick={() => deleteContact(contact.id)} disabled={contactSaving} title="Delete contact" className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {contacts.length === 0 && !showNewContact && (
              <p className="text-sm text-slate-500">No contacts yet. Add one above.</p>
            )}
          </div>

          {/* Add new contact form */}
          {showNewContact && (
            <div className="rounded-lg bg-emerald-400/5 border border-emerald-400/20 p-4 space-y-3">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">New Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label htmlFor="new-contact-name" className={labelClass}>Name *</label><input id="new-contact-name" className={inputClass} value={newContact.name} onChange={(e) => setNewContact((p) => ({ ...p, name: e.target.value }))} placeholder="John Smith" /></div>
                <div><label htmlFor="new-contact-email" className={labelClass}>Email *</label><input id="new-contact-email" className={inputClass} type="email" value={newContact.email} onChange={(e) => setNewContact((p) => ({ ...p, email: e.target.value }))} placeholder="john@acme.com" /></div>
                <div><label htmlFor="new-contact-phone" className={labelClass}>Phone</label><input id="new-contact-phone" className={inputClass} value={newContact.phone} onChange={(e) => setNewContact((p) => ({ ...p, phone: e.target.value }))} placeholder="(555) 123-4567" /></div>
                <div>
                  <label htmlFor="new-contact-role" className={labelClass}>Role</label>
                  <select id="new-contact-role" className={inputClass} value={newContact.role} onChange={(e) => setNewContact((p) => ({ ...p, role: e.target.value }))}>
                    <option value="primary">Primary</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={addNewContact} disabled={contactSaving} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 disabled:opacity-50 transition-colors">
                  <Check size={12} /> {contactSaving ? "Adding..." : "Add Contact"}
                </button>
                <button type="button" onClick={() => { setShowNewContact(false); setNewContact({ name: "", email: "", phone: "", role: "primary" }); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 hover:text-white transition-colors">
                  <X size={12} /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contract & Billing */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Contract &amp; Billing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="edit-client-status" className={labelClass}>Status</label>
              <select id="edit-client-status" className={inputClass} value={form.status} onChange={(e) => updateField("status", e.target.value)}>
                {CLIENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div><label htmlFor="edit-client-monthly-budget" className={labelClass}>Monthly Budget ($)</label><input id="edit-client-monthly-budget" className={inputClass} type="number" step="0.01" value={form.monthlyRetainer} onChange={(e) => updateField("monthlyRetainer", e.target.value)} placeholder="1500.00" /></div>
            <div><label htmlFor="edit-client-daily-budget" className={labelClass}>Daily Budget ($)</label><input id="edit-client-daily-budget" className={inputClass} type="number" value={form.dailyBudget} onChange={(e) => updateField("dailyBudget", e.target.value)} placeholder="50" /></div>
            <div>
              <label htmlFor="edit-client-billing-cycle" className={labelClass}>Billing Cycle</label>
              <select id="edit-client-billing-cycle" className={inputClass} value={form.billingCycle} onChange={(e) => updateField("billingCycle", e.target.value)}>
                {BILLING_CYCLES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label htmlFor="edit-client-contract-start" className={labelClass}>Contract Start</label><input id="edit-client-contract-start" className={inputClass} type="date" value={form.contractStart} onChange={(e) => updateField("contractStart", e.target.value)} /></div>
            <div><label htmlFor="edit-client-contract-end" className={labelClass}>Contract End</label><input id="edit-client-contract-end" className={inputClass} type="date" value={form.contractEnd} onChange={(e) => updateField("contractEnd", e.target.value)} /></div>
            <div><label htmlFor="edit-client-sla-hours" className={labelClass}>SLA Response (hours)</label><input id="edit-client-sla-hours" className={inputClass} type="number" value={form.slaResponseHours} onChange={(e) => updateField("slaResponseHours", e.target.value)} /></div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Integrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label htmlFor="edit-client-google-ads" className={labelClass}>Google Ads Customer ID</label><input id="edit-client-google-ads" className={inputClass} value={form.googleAdsCustomerId} onChange={(e) => updateField("googleAdsCustomerId", e.target.value)} placeholder="7202644860" /></div>
            <div><label htmlFor="edit-client-ga4" className={labelClass}>GA4 Property ID</label><input id="edit-client-ga4" className={inputClass} value={form.ga4PropertyId} onChange={(e) => updateField("ga4PropertyId", e.target.value)} placeholder="properties/501975040" /></div>
            <div><label htmlFor="edit-client-search-console" className={labelClass}>Search Console URL</label><input id="edit-client-search-console" className={inputClass} value={form.searchConsoleUrl} onChange={(e) => updateField("searchConsoleUrl", e.target.value)} placeholder="sc-domain:example.com" /></div>
            <div><label htmlFor="edit-client-nimbata" className={labelClass}>Nimbata Project ID</label><input id="edit-client-nimbata" className={inputClass} value={form.nimbataProjectId} onChange={(e) => updateField("nimbataProjectId", e.target.value)} /></div>
            <div><label htmlFor="edit-client-gtm" className={labelClass}>GTM Container ID</label><input id="edit-client-gtm" className={inputClass} value={form.gtmContainerId} onChange={(e) => updateField("gtmContainerId", e.target.value)} placeholder="GTM-XXXXXXX" /></div>
            <div><label htmlFor="edit-client-cloudflare" className={labelClass}>Cloudflare Zone ID</label><input id="edit-client-cloudflare" className={inputClass} value={form.cloudflareZoneId} onChange={(e) => updateField("cloudflareZoneId", e.target.value)} /></div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-white">Internal Notes</h2>
          <textarea className={inputClass} rows={3} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Internal notes about this client..." aria-label="Internal notes" />
        </div>

        <div className="flex justify-end gap-3">
          <Link href={`/admin/clients/${id}`} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors">Cancel</Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
