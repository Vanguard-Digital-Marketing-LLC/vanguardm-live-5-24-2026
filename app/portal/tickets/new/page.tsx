"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

const PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

export default function NewTicketPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          priority,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create ticket");
      }

      router.push("/portal/tickets");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <Link
        href="/portal/tickets"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Tickets
      </Link>

      <div>
        <h1 className="font-display text-2xl font-bold text-white">New Support Ticket</h1>
        <p className="text-sm text-slate-400 mt-1">
          Describe your issue and our team will get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of the issue"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/50 transition-colors"
            required
            maxLength={200}
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about the issue, including steps to reproduce if applicable..."
            rows={6}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/50 transition-colors resize-y"
            maxLength={5000}
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/50 transition-colors"
            disabled={submitting}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value} className="bg-slate-900">
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-4 pt-2">
          <Link
            href="/portal/tickets"
            className="px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Ticket
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
