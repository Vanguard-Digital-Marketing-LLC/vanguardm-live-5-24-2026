"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "WEB", label: "Website", description: "Web design & development" },
  { value: "SMA", label: "Social Media", description: "Social media management" },
  { value: "PPC", label: "PPC", description: "Pay-per-click advertising" },
  { value: "SEO", label: "SEO", description: "Search engine optimization" },
];

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

interface ClientOption {
  id: string;
  name: string;
  email: string | null;
}

export default function NewOnboardingPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [clientId, setClientId] = useState("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [respondentName, setRespondentName] = useState("");
  const [respondentEmail, setRespondentEmail] = useState("");

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(data.map((c: { id: string; name: string; email: string | null }) => ({
          id: c.id,
          name: c.name,
          email: c.email,
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Auto-fill respondent email from selected client
  useEffect(() => {
    if (clientId) {
      const client = clients.find((c) => c.id === clientId);
      if (client?.email && !respondentEmail) {
        setRespondentEmail(client.email);
      }
    }
  }, [clientId, clients, respondentEmail]);

  const toggleService = (value: string) => {
    setServiceTypes((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return setError("Please select a client");
    if (!serviceTypes.length) return setError("Please select at least one service");

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, serviceTypes, respondentName, respondentEmail }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create");
      }
      const onboarding = await res.json();
      router.push(`/admin/onboarding/${onboarding.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/onboarding"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Onboarding
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white font-display">New Onboarding</h1>
        <p className="text-sm text-slate-400 mt-1">
          Create a new onboarding questionnaire for a client
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client select */}
        <div>
          <label htmlFor="onboarding-client" className="block text-xs text-slate-400 mb-1">Client *</label>
          {loading ? (
            <div className="text-sm text-slate-500">Loading clients...</div>
          ) : (
            <select
              id="onboarding-client"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className={inputClass}
            >
              <option value="">Select a client...</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Services */}
        <div>
          <span id="onboarding-services-label" className="block text-xs text-slate-400 mb-2">Services *</span>
          <div role="group" aria-labelledby="onboarding-services-label" className="grid grid-cols-2 gap-3">
            {SERVICE_OPTIONS.map((opt) => {
              const checked = serviceTypes.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleService(opt.value)}
                  className={`flex flex-col items-start p-4 rounded-lg border text-left transition-colors ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className={`text-sm font-medium ${checked ? "text-emerald-300" : "text-white"}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">{opt.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Respondent info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="onboarding-respondent-name" className="block text-xs text-slate-400 mb-1">Respondent Name</label>
            <input
              id="onboarding-respondent-name"
              type="text"
              value={respondentName}
              onChange={(e) => setRespondentName(e.target.value)}
              placeholder="Who will fill this out?"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="onboarding-respondent-email" className="block text-xs text-slate-400 mb-1">Respondent Email</label>
            <input
              id="onboarding-respondent-email"
              type="email"
              value={respondentEmail}
              onChange={(e) => setRespondentEmail(e.target.value)}
              placeholder="Email for invite link"
              className={inputClass}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Onboarding"}
        </button>
      </form>
    </div>
  );
}
