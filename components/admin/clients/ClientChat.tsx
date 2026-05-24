"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

interface ClientChatProps {
  clientId: string;
  currentUserId: string;
}

export default function ClientChat({ clientId, currentUserId }: ClientChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/messages`);
      if (!res.ok) throw new Error("Failed to load messages");
      const data: Message[] = await res.json();
      setMessages(data.filter((m) => !m.isInternal));
      setError(null);
    } catch {
      setError("Unable to load messages");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  const markAsRead = useCallback(async () => {
    try {
      await fetch(`/api/admin/clients/${clientId}/messages/read`, {
        method: "POST",
      });
    } catch {
      // Silent — non-critical
    }
  }, [clientId]);

  const fetchAndMarkRead = useCallback(async () => {
    await fetchMessages();
    markAsRead();
  }, [fetchMessages, markAsRead]);

  useEffect(() => {
    fetchAndMarkRead();
    pollRef.current = setInterval(fetchAndMarkRead, 10000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchAndMarkRead]);

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
      const res = await fetch(`/api/admin/clients/${clientId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage.trim(), isInternal: false }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      const sent = await res.json();
      setMessages((prev) => [...prev, sent]);
      setNewMessage("");
      markAsRead();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSending(false);
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    if (diffDays === 0) return `Today at ${time}`;
    if (diffDays === 1) return `Yesterday at ${time}`;
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${time}`;
  }

  function isClientMessage(msg: Message) {
    return msg.user.role === "CLIENT";
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div
        ref={scrollRef}
        className="flex-1 bg-[#0D1117] border border-white/6 rounded-xl p-4 overflow-y-auto space-y-4 mb-3"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={24} className="animate-spin text-slate-500" />
          </div>
        ) : error && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : messages.length === 0 && !error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-500 mb-1">No messages yet</p>
              <p className="text-xs text-slate-600">
                Messages from the client portal will appear here
              </p>
            </div>
          </div>
        ) : (
          <>
          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg mb-2">{error}</p>
          )}
          {messages.map((msg) => {
            const fromClient = isClientMessage(msg);
            return (
              <div
                key={msg.id}
                className={`flex ${fromClient ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-3 ${
                    fromClient
                      ? "bg-white/5 border border-white/8"
                      : "bg-emerald/10 border border-emerald/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-medium ${
                        fromClient ? "text-amber" : "text-emerald"
                      }`}
                    >
                      {msg.user.name || "Unknown"}
                      {fromClient ? " (Client)" : ""}
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
          })}
          </>
        )}
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-end gap-3 bg-[#0D1117] border border-white/6 rounded-xl p-3"
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
          placeholder="Type a message to the client..."
          rows={2}
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50 transition-colors resize-none"
          maxLength={5000}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !newMessage.trim()}
          aria-label="Send message"
          className="p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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
