"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Trash2, Sparkles } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string; ts: string };

export default function ClientAIChat({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lazy-load history on first open.
  useEffect(() => {
    if (!open || !loading) return;
    (async () => {
      try {
        const res = await fetch(`/api/admin/clients/${clientId}/chat`);
        if (res.ok) {
          const data = await res.json();
          setMessages(Array.isArray(data.messages) ? data.messages : []);
        } else if (res.status === 402) {
          const data = await res.json().catch(() => ({}));
          setErr(data.error || "AI chat requires Enterprise.");
        }
      } catch {
        setErr("Could not load chat history.");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, loading, clientId]);

  // Autoscroll on message change.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  const send = async () => {
    const message = draft.trim();
    if (!message || sending) return;
    setErr(null);
    setSending(true);
    const optimistic: ChatMessage = {
      role: "user",
      content: message,
      ts: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErr(data.error || `Failed (${res.status})`);
        // Roll back optimistic message.
        setMessages((prev) => prev.slice(0, -1));
        setDraft(message);
      } else {
        const data = await res.json();
        if (Array.isArray(data.messages)) setMessages(data.messages);
      }
    } catch {
      setErr("Network error");
      setMessages((prev) => prev.slice(0, -1));
      setDraft(message);
    } finally {
      setSending(false);
    }
  };

  const clear = async () => {
    if (!confirm("Clear chat history with this client?")) return;
    await fetch(`/api/admin/clients/${clientId}/chat`, { method: "DELETE" });
    setMessages([]);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/20 text-emerald-300 text-sm font-medium"
      >
        <Sparkles size={14} /> AI chat
      </button>

      {open && (
        <div
          className="fixed inset-y-0 right-0 z-[70] w-full sm:w-[420px] bg-[#0D1117] border-l border-white/10 shadow-2xl flex flex-col"
          role="dialog"
          aria-label="Client AI chat"
        >
          <div className="h-14 px-4 flex items-center justify-between border-b border-white/6">
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Client AI chat</h3>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clear}
                  title="Clear history"
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-white text-xl leading-none px-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={20} className="animate-spin text-slate-500" />
              </div>
            ) : err ? (
              <div className="text-xs text-red-400">{err}</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8">
                <Bot size={28} className="text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-500">
                  Ask anything about this client. Context (services, recent
                  tasks &amp; tickets, notes) is injected automatically.
                </p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      m.role === "user"
                        ? "bg-emerald-500/15 text-emerald-100 border border-emerald-400/20"
                        : "bg-white/5 text-slate-200 border border-white/8"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-xs text-slate-400 inline-flex items-center gap-1.5">
                  <Loader2 size={12} className="animate-spin" /> Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/6 flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about this client…"
              rows={2}
              maxLength={4000}
              className="flex-1 px-3 py-2 rounded-md bg-[#111827] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40 resize-none"
              disabled={sending}
            />
            <button
              onClick={send}
              disabled={sending || !draft.trim()}
              className="h-9 w-9 flex items-center justify-center rounded-md bg-emerald-500 hover:bg-emerald-400 text-white disabled:opacity-50"
              aria-label="Send"
            >
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
