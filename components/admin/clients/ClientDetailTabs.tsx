"use client";

import { useState } from "react";
import { MessageSquare, FileText, LifeBuoy, FileCheck } from "lucide-react";
import ClientChat from "./ClientChat";
import Badge from "@/components/admin/shared/Badge";
import ClientApprovals from "./ClientApprovals";

interface Note {
  id: string;
  type: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string | null };
}

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
  slaDeadline: string | null;
  assignee: { id: string; name: string | null; email: string } | null;
}

const NOTE_ICONS: Record<string, string> = {
  CALL: "\u{1F4DE}",
  EMAIL: "\u{1F4E7}",
  MEETING: "\u{1F91D}",
  NOTE: "\u{1F4DD}",
  SUPPORT: "\u{1F3AB}",
};

const TICKET_VARIANT: Record<string, "emerald" | "amber" | "red" | "cyan" | "slate"> = {
  OPEN: "red",
  IN_PROGRESS: "amber",
  WAITING: "cyan",
  RESOLVED: "emerald",
  CLOSED: "slate",
};

interface ClientDetailTabsProps {
  clientId: string;
  currentUserId: string;
  notes: Note[];
  noteCount: number;
  tickets: Ticket[];
  ticketCount: number;
  approvalCount: number;
}

const TABS = [
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "notes", label: "Communication Log", icon: FileText },
  { key: "tickets", label: "Support Tickets", icon: LifeBuoy },
  { key: "approvals", label: "Approvals", icon: FileCheck },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ClientDetailTabs({
  clientId,
  currentUserId,
  notes,
  noteCount,
  tickets,
  ticketCount,
  approvalCount,
}: ClientDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("messages");

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-white/6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.key
                ? "border-emerald text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {tab.key === "notes" && noteCount > 0 && (
              <span className="text-xs text-slate-500">({noteCount})</span>
            )}
            {tab.key === "tickets" && ticketCount > 0 && (
              <span className="text-xs text-slate-500">({ticketCount})</span>
            )}
            {tab.key === "approvals" && approvalCount > 0 && (
              <span className="text-xs text-slate-500">({approvalCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "messages" && (
          <ClientChat clientId={clientId} currentUserId={currentUserId} />
        )}

        {activeTab === "notes" && (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-lg bg-white/5 border-l-2 border-emerald-400/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{NOTE_ICONS[note.type] || "\u{1F4DD}"}</span>
                  <span className="text-xs font-semibold text-slate-300">
                    {note.type}
                  </span>
                  <span className="text-xs text-slate-500">
                    by {note.user.name || "Unknown"}
                  </span>
                  <span className="text-xs text-slate-600 ml-auto">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{note.content}</p>
              </div>
            ))}
            {notes.length === 0 && (
              <p className="text-sm text-slate-500">No notes yet</p>
            )}
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div>
                  <p className="text-sm text-white">{ticket.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      label={ticket.status}
                      variant={TICKET_VARIANT[ticket.status] || "slate"}
                    />
                    <Badge
                      label={ticket.priority}
                      variant={
                        ticket.priority === "URGENT"
                          ? "red"
                          : ticket.priority === "HIGH"
                            ? "amber"
                            : "slate"
                      }
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">
                    {ticket.assignee?.name || "Unassigned"}
                  </span>
                  {ticket.slaDeadline && (
                    <p
                      className={`text-xs mt-1 ${
                        new Date(ticket.slaDeadline) < new Date()
                          ? "text-red-400"
                          : "text-slate-500"
                      }`}
                    >
                      SLA: {new Date(ticket.slaDeadline).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <p className="text-sm text-slate-500">No tickets</p>
            )}
          </div>
        )}

        {activeTab === "approvals" && (
          <ClientApprovals clientId={clientId} />
        )}
      </div>
    </div>
  );
}
