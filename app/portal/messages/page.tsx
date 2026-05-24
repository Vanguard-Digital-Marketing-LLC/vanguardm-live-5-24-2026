"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    role: string;
  };
}

export default function PortalMessagesPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamConnected, setStreamConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial load — full message history.
  const fetchInitial = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/messages");
      if (!res.ok) throw new Error("Failed to load messages");
      const data: Message[] = await res.json();
      setMessages(data);
      setError(null);
    } catch {
      setError("Unable to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  // Live deltas via SSE. Replaces 10s client polling.
  useEffect(() => {
    if (loading) return; // wait for initial load
    const since =
      messages.length > 0 ? messages[messages.length - 1].createdAt : new Date().toISOString();
    const es = new EventSource(`/api/portal/messages/stream?since=${encodeURIComponent(since)}`);

    es.addEventListener("hello", () => setStreamConnected(true));
    es.addEventListener("messages", (e: MessageEvent) => {
      try {
        const fresh: Message[] = JSON.parse(e.data);
        if (!fresh.length) return;
        setMessages((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          const add = fresh.filter((m) => !seen.has(m.id));
          return add.length ? [...prev, ...add] : prev;
        });
      } catch {
        // ignore malformed event
      }
    });
    es.addEventListener("error", () => {
      // EventSource auto-reconnects; surface only persistent loss.
      setStreamConnected(false);
    });

    return () => {
      es.close();
      setStreamConnected(false);
    };
    // We deliberately re-subscribe only on (loading -> false) transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/portal/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      const sent = await res.json();
      setMessages((prev) => [...prev, sent]);
      setNewMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSending(false);
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    if (diffDays === 0) return `Today at ${time}`;
    if (diffDays === 1) return `Yesterday at ${time}`;
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${time}`;
  }

  function isTeamMessage(msg: Message) {
    return msg.user.role === "ADMIN" || msg.user.role === "TEAM";
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Messages</h1>
          <p className="text-sm text-slate-400 mt-1">
            Direct communication with your Vanguard Digital Marketing team
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 mt-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              streamConnected ? "bg-emerald-400" : "bg-slate-600"
            }`}
          />
          {streamConnected ? "Live" : "Reconnecting…"}
        </span>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 bg-[#111827] border border-white/6 rounded-xl p-4 overflow-y-auto space-y-4 mb-4"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={24} className="animate-spin text-slate-500" />
          </div>
        ) : error && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-500 mb-1">No messages yet</p>
              <p className="text-xs text-slate-600">Send a message to start the conversation</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const fromTeam = isTeamMessage(msg);
            const isOwnMessage = msg.user.id === session?.user?.id;

            return (
              <div
                key={msg.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-3 ${
                    isOwnMessage
                      ? "bg-teal/10 border border-teal/20"
                      : "bg-white/5 border border-white/8"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-medium ${
                        fromTeam ? "text-teal" : "text-amber"
                      }`}
                    >
                      {msg.user.name || "Unknown"}
                      {fromTeam && !isOwnMessage ? " (Vanguard Digital)" : ""}
                    </span>
                    <span className="text-[10px] text-slate-600">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSend}
        className="flex items-end gap-3 bg-[#111827] border border-white/6 rounded-xl p-3"
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
          placeholder="Type a message..."
          rows={2}
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/50 transition-colors resize-none"
          maxLength={5000}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !newMessage.trim()}
          className="p-3 bg-teal text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {sending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
}
