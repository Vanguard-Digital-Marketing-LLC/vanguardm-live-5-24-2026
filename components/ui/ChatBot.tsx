"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { findBestMatch, isCheatAttempt, getCheatResponse, QUICK_TOPICS } from "@/lib/chatbot-knowledge";

/* ──────────────────────────────────────────────
   ChatBot — Floating chat widget with keyword-
   matched knowledge base responses.
   ────────────────────────────────────────────── */

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  courseSlug?: string;
}

let msgIdCounter = 0;

const WELCOME_MESSAGE =
  "Hey! I'm the Vanguard assistant. Ask me about Google Ads, GA4, Google Tag Manager, SEO, or any of our 38 Academy courses. Pick a topic below to get started!";

const FALLBACK_MESSAGE =
  "I'm not sure about that one. Try asking about Google Ads, Google Analytics, GTM, or SEO — or pick one of the topics below. You can also reach out to our team for anything complex!";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: ++msgIdCounter, role: "bot", text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const addBotResponse = useCallback((userText: string) => {
    setIsTyping(true);

    // Simulate brief thinking delay
    const delay = 400 + Math.random() * 400;
    setTimeout(() => {
      // Anti-cheat: detect quiz/exam answer attempts
      if (isCheatAttempt(userText)) {
        setMessages((prev) => [
          ...prev,
          { id: ++msgIdCounter, role: "bot", text: getCheatResponse() },
        ]);
        setIsTyping(false);
        return;
      }

      const match = findBestMatch(userText);
      let responseText = match ? match.response : FALLBACK_MESSAGE;

      // Append Academy course link if available
      if (match?.courseSlug) {
        responseText += `\n\nLearn more in our Academy: /academy/${match.courseSlug}`;
      }

      setMessages((prev) => [
        ...prev,
        { id: ++msgIdCounter, role: "bot", text: responseText, courseSlug: match?.courseSlug },
      ]);
      setIsTyping(false);
    }, delay);
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text ?? input).trim();
      if (!msg) return;

      setMessages((prev) => [
        ...prev,
        { id: ++msgIdCounter, role: "user", text: msg },
      ]);
      setInput("");
      addBotResponse(msg);
    },
    [input, addBotResponse]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ─── Chat Toggle Button ─── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald text-slate-950 flex items-center justify-center shadow-lg shadow-emerald/25 hover:bg-emerald-400 hover:shadow-emerald/40 transition-all cursor-pointer"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          // X icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Chat bubble icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* ─── Chat Panel ─── */}
      {isOpen && (
        <div role="complementary" aria-label="Chat assistant" className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col glass-strong rounded-2xl shadow-2xl shadow-black/40 animate-chatOpen overflow-hidden"
          style={{ height: "min(520px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
            <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider leading-tight">
                Vanguard Assistant
              </h3>
              <p className="text-emerald-400 text-xs">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald/20 text-white rounded-br-sm"
                      : "bg-white/5 text-slate-300 rounded-bl-sm"
                  }`}
                >
                  {msg.text.split("\n").map((line, i) => {
                    // Make Academy links clickable
                    const academyMatch = line.match(/^Learn more in our Academy: \/academy\/([\w-]+)$/);
                    if (academyMatch) {
                      return (
                        <span key={i}>
                          {i > 0 && <br />}
                          <Link href={`/academy/${academyMatch[1]}`} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
                            View Academy Course →
                          </Link>
                        </span>
                      );
                    }
                    return (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Quick topics — show after bot messages when not typing */}
            {!isTyping && messages[messages.length - 1]?.role === "bot" && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_TOPICS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => handleSend(t.query)}
                    aria-label={t.label}
                    className="px-3 py-1 rounded-full border border-white/10 text-xs text-slate-400 hover:text-emerald-400 hover:border-emerald/30 transition-colors cursor-pointer"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Contact CTA bar */}
          <div className="px-4 py-2 border-t border-white/5">
            <Link
              href="/contact"
              className="block text-center text-xs text-amber hover:text-amber-400 transition-colors font-display font-semibold uppercase tracking-wider"
            >
              Or get a free consultation →
            </Link>
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/25 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="px-3.5 rounded-lg bg-emerald text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
