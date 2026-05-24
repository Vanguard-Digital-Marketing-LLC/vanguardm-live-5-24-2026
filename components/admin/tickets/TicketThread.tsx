"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, ChevronDown, ChevronUp, Lock } from "lucide-react";

interface Message {
  id: string;
  type: "COMMENT" | "AGENT_OUTPUT" | "STATUS_CHANGE" | "SYSTEM";
  content: string;
  isInternal: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    role?: string;
  } | null;
}

interface TicketThreadProps {
  ticketId: string;
  apiBase: string; // "/api/admin/tickets" or "/api/portal/tickets"
  showInternalToggle?: boolean;
  currentUserId?: string;
}

export default function TicketThread({
  ticketId,
  apiBase,
  showInternalToggle = false,
  currentUserId,
}: TicketThreadProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [sending, setSending] = useState(false);
  const [expandedAgentOutputs, setExpandedAgentOutputs] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}/${ticketId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      }
    } catch {
      // Keep existing messages on error
    }
    setLoading(false);
  }, [apiBase, ticketId]);

  useEffect(() => {
    fetchMessages();
    // Poll every 10 seconds for new messages
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch(`${apiBase}/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), isInternal }),
      });
      if (res.ok) {
        setContent("");
        await fetchMessages();
      }
    } catch {
      // Ignore
    }
    setSending(false);
  };

  const toggleAgentExpand = (id: string) => {
    setExpandedAgentOutputs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="text-sm text-slate-500 py-4">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 min-h-0">
        {messages.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-8">No messages yet. Start the conversation below.</p>
        )}
        {messages.map((msg) => {
          // STATUS_CHANGE / SYSTEM — centered muted text
          if (msg.type === "STATUS_CHANGE" || msg.type === "SYSTEM") {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="text-xs text-slate-500 bg-white/5 rounded-full px-3 py-1">
                  {msg.content}
                  <span className="text-slate-600 ml-2">{formatTime(msg.createdAt)}</span>
                </span>
              </div>
            );
          }

          // AGENT_OUTPUT — purple accent, monospace, collapsible
          if (msg.type === "AGENT_OUTPUT") {
            const isExpanded = expandedAgentOutputs.has(msg.id);
            const preview = msg.content.slice(0, 200);
            const hasMore = msg.content.length > 200;
            return (
              <div key={msg.id} className="border-l-2 border-purple-500/50 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-purple-400">AI Agent Output</span>
                  <span className="text-xs text-slate-600">{formatTime(msg.createdAt)}</span>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3">
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {isExpanded ? msg.content : preview}
                    {hasMore && !isExpanded && "..."}
                  </pre>
                  {hasMore && (
                    <button
                      onClick={() => toggleAgentExpand(msg.id)}
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2 transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      {isExpanded ? "Show less" : "Show full output"}
                    </button>
                  )}
                </div>
              </div>
            );
          }

          // COMMENT — styled by author role
          const isAdmin = msg.author?.role === "ADMIN" || msg.author?.role === "TEAM";
          const isSelf = msg.author?.id === currentUserId;
          const accent = isAdmin ? "emerald" : "slate";
          const borderColor = accent === "emerald" ? "border-emerald-500/50" : "border-slate-500/30";
          const bgColor = accent === "emerald" ? "bg-emerald-500/5" : "bg-slate-500/5";

          return (
            <div key={msg.id} className={`border-l-2 ${borderColor} pl-3`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold ${isAdmin ? "text-emerald-400" : "text-slate-400"}`}>
                  {msg.author?.name || "Unknown"}
                </span>
                {msg.isInternal && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                    <Lock size={10} />
                    Internal
                  </span>
                )}
                <span className="text-xs text-slate-600">{formatTime(msg.createdAt)}</span>
              </div>
              <div className={`${bgColor} rounded-lg p-3`}>
                <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Compose box */}
      <div className="border-t border-white/6 p-4">
        {showInternalToggle && (
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => setIsInternal(!isInternal)}
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-colors ${
                isInternal
                  ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  : "bg-white/5 text-slate-500 border border-white/10 hover:text-slate-400"
              }`}
            >
              <Lock size={10} />
              {isInternal ? "Internal note" : "Public reply"}
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend();
            }}
            placeholder={isInternal ? "Add an internal note..." : "Type a message..."}
            rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!content.trim() || sending}
            aria-label="Send message"
            className="self-end px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-slate-600 mt-1">Ctrl+Enter to send</p>
      </div>
    </div>
  );
}
