# Admin Client Chat + AI Agent Removal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Messages tab to admin client detail pages with unread tracking, add an Invite to Portal button, and remove the AI Agent feature.

**Architecture:** The chat UI is a client component (`ClientChat.tsx`) embedded in the server-rendered client detail page via a tab system. Unread tracking uses a new `ClientMessageRead` Prisma model with a last-read timestamp per admin-client pair. Two new API routes handle unread counts and mark-as-read. The admin header gets a message notification indicator. AI Agent removal is a clean deletion of 8 files + 2 edits.

**Tech Stack:** Next.js 16.1.6 (App Router), React 19, Prisma 7 (PostgreSQL), NextAuth v5, Tailwind CSS 4, lucide-react

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `components/admin/clients/ClientChat.tsx` | Client-side chat component for admin ↔ client messaging |
| `components/admin/clients/InviteToPortal.tsx` | Client-side invite form with email input |
| `components/admin/clients/ClientDetailTabs.tsx` | Client-side tab switcher wrapping Messages, Notes, Tickets sections |
| `app/api/admin/messages/unread/route.ts` | GET endpoint returning unread message counts per client |
| `app/api/admin/clients/[id]/messages/read/route.ts` | POST endpoint to upsert last-read timestamp |
| `components/admin/layout/UnreadMessagesBadge.tsx` | Client-side header notification indicator with polling |

### Modified Files
| File | Change |
|------|--------|
| `prisma/schema.prisma` | Add `ClientMessageRead` model + relations on `User` and `Client` |
| `app/admin/clients/[id]/page.tsx` | Replace inline sections with `ClientDetailTabs` + add `InviteToPortal` button |
| `app/admin/clients/page.tsx` | Add unread badges next to client names |
| `components/admin/layout/AdminHeader.tsx` | Add `UnreadMessagesBadge`, remove agent breadcrumb |
| `components/admin/layout/AdminSidebar.tsx` | Remove Bot icon import and AI Agent nav item |

### Deleted Files
| File | Reason |
|------|--------|
| `app/admin/agent/page.tsx` | AI Agent page |
| `app/api/admin/agent/chat/route.ts` | Agent SSE chat endpoint |
| `app/api/admin/agent/conversations/route.ts` | Agent conversation CRUD |
| `components/admin/agent/AgentChat.tsx` | Agent chat UI |
| `components/admin/agent/ConfirmationCard.tsx` | Agent confirmation card |
| `components/admin/agent/ToolExecutionCard.tsx` | Agent tool execution card |
| `lib/agent/config.ts` | Agent config |
| `lib/agent/executor.ts` | Agent tool executor |

---

## Task 1: Remove AI Agent Feature

**Files:**
- Delete: `app/admin/agent/` (directory)
- Delete: `app/api/admin/agent/` (directory)
- Delete: `components/admin/agent/` (directory)
- Delete: `lib/agent/` (directory)
- Modify: `components/admin/layout/AdminSidebar.tsx`
- Modify: `components/admin/layout/AdminHeader.tsx`

- [ ] **Step 1: Delete agent directories**

```bash
cd C:/Users/james/projects/vanguardm.com
rm -rf app/admin/agent
rm -rf app/api/admin/agent
rm -rf components/admin/agent
rm -rf lib/agent
```

- [ ] **Step 2: Remove AI Agent from AdminSidebar.tsx**

In `components/admin/layout/AdminSidebar.tsx`, remove the `Bot` import from the lucide-react import block (line 14) and remove the AI Agent nav item from `NAV_ITEMS` (line 37).

Before (lines 6-23 of import block):
```tsx
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  KanbanSquare,
  LifeBuoy,
  MessageSquare,
  UserCog,
  Bot,
  GraduationCap,
  Settings,
  ChevronLeft,
  CreditCard,
  ChevronRight,
  ClipboardList,
  Newspaper,
  BarChart3,
} from "lucide-react";
```

After (remove `Bot,` line):
```tsx
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  KanbanSquare,
  LifeBuoy,
  MessageSquare,
  UserCog,
  GraduationCap,
  Settings,
  ChevronLeft,
  CreditCard,
  ChevronRight,
  ClipboardList,
  Newspaper,
  BarChart3,
} from "lucide-react";
```

Remove this line from `NAV_ITEMS` array:
```tsx
  { label: "AI Agent", icon: Bot, href: "/admin/agent", adminOnly: true },
```

- [ ] **Step 3: Remove AI Agent from AdminHeader.tsx**

In `components/admin/layout/AdminHeader.tsx`, remove this entry from `BREADCRUMB_MAP` (line 19):
```tsx
  "/admin/agent": "AI Agent",
```

- [ ] **Step 4: Verify build passes**

```bash
cd C:/Users/james/projects/vanguardm.com
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to agent imports. Other pre-existing errors are fine.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: remove AI Agent feature

Delete agent page, API routes, components, and lib.
Remove navigation and breadcrumb references."
```

---

## Task 2: Add ClientMessageRead Model to Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add ClientMessageRead model**

Add the following model at the end of `prisma/schema.prisma` (before the closing of the file, after the last model):

```prisma
model ClientMessageRead {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation("MessageReads", fields: [userId], references: [id])
  clientId   String
  client     Client   @relation("MessageReads", fields: [clientId], references: [id], onDelete: Cascade)
  lastReadAt DateTime @default(now())

  @@unique([userId, clientId])
  @@index([userId])
  @@index([clientId])
}
```

- [ ] **Step 2: Add relation to User model**

In the `User` model (line ~128, after `clientMessages  ClientMessage[]`), add:

```prisma
  messageReads    ClientMessageRead[] @relation("MessageReads")
```

- [ ] **Step 3: Add relation to Client model**

In the `Client` model (line ~384, after `clientInvites  ClientInvite[]`), add:

```prisma
  messageReads   ClientMessageRead[] @relation("MessageReads")
```

- [ ] **Step 4: Generate Prisma client**

```bash
cd C:/Users/james/projects/vanguardm.com
npx prisma generate
```

Expected: `Prisma Client` generated successfully.

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add ClientMessageRead model for unread tracking

Stores last-read timestamp per admin-client pair.
Used to calculate unread message counts."
```

---

## Task 3: Create Unread Messages API Endpoint

**Files:**
- Create: `app/api/admin/messages/unread/route.ts`

- [ ] **Step 1: Create the route file**

Create `app/api/admin/messages/unread/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";

export const GET = withRateLimit(
  "admin",
  async (req: NextRequest) => {
    const { session, errorResponse } = await requireAuth("ADMIN", "TEAM");
    if (errorResponse) return errorResponse;

    const userId = session.user.id;

    // Get all clients that have at least one non-internal message
    const clientsWithMessages = await prisma.client.findMany({
      where: {
        clientMessages: {
          some: { isInternal: false },
        },
      },
      select: {
        id: true,
        name: true,
        clientMessages: {
          where: { isInternal: false },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { createdAt: true },
        },
        messageReads: {
          where: { userId },
          select: { lastReadAt: true },
        },
      },
    });

    const unread = clientsWithMessages
      .map((client) => {
        const lastMessage = client.clientMessages[0]?.createdAt;
        const lastRead = client.messageReads[0]?.lastReadAt;

        if (!lastMessage) return null;
        if (lastRead && lastRead >= lastMessage) return null;

        return {
          clientId: client.id,
          clientName: client.name,
        };
      })
      .filter(Boolean);

    // For clients with unread, count the actual unread messages
    const unreadWithCounts = await Promise.all(
      unread.map(async (item) => {
        const lastRead = await prisma.clientMessageRead.findUnique({
          where: { userId_clientId: { userId, clientId: item!.clientId } },
          select: { lastReadAt: true },
        });

        const count = await prisma.clientMessage.count({
          where: {
            clientId: item!.clientId,
            isInternal: false,
            createdAt: lastRead ? { gt: lastRead.lastReadAt } : undefined,
          },
        });

        return {
          clientId: item!.clientId,
          clientName: item!.clientName,
          unreadCount: count,
        };
      }),
    );

    return NextResponse.json(unreadWithCounts.filter((u) => u.unreadCount > 0));
  },
);
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/james/projects/vanguardm.com
npx tsc --noEmit 2>&1 | grep "unread"
```

Expected: No errors for the new file.

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/messages/unread/route.ts
git commit -m "feat: add GET /api/admin/messages/unread endpoint

Returns list of clients with unread message counts
for the authenticated admin/team user."
```

---

## Task 4: Create Mark-as-Read API Endpoint

**Files:**
- Create: `app/api/admin/clients/[id]/messages/read/route.ts`

- [ ] **Step 1: Create the route file**

Create `app/api/admin/clients/[id]/messages/read/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";

export const POST = withRateLimit(
  "admin",
  async (
    req: NextRequest,
    context?: { params: Promise<Record<string, string>> },
  ) => {
    const { session, errorResponse } = await requireAuth("ADMIN", "TEAM");
    if (errorResponse) return errorResponse;

    const { id } = await context!.params;

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Upsert the last-read timestamp
    await prisma.clientMessageRead.upsert({
      where: {
        userId_clientId: {
          userId: session.user.id,
          clientId: id,
        },
      },
      update: { lastReadAt: new Date() },
      create: {
        userId: session.user.id,
        clientId: id,
        lastReadAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  },
);
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/clients/[id]/messages/read/route.ts
git commit -m "feat: add POST /api/admin/clients/[id]/messages/read endpoint

Upserts ClientMessageRead.lastReadAt for the current
admin user + client pair."
```

---

## Task 5: Create ClientChat Component

**Files:**
- Create: `components/admin/clients/ClientChat.tsx`

- [ ] **Step 1: Create the component**

Create `components/admin/clients/ClientChat.tsx`:

```tsx
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
  const hasMounted = useRef(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/messages`);
      if (!res.ok) throw new Error("Failed to load messages");
      const data: Message[] = await res.json();
      // Filter to client-facing messages only (no internal notes)
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

  useEffect(() => {
    fetchMessages();
    markAsRead();
    pollRef.current = setInterval(fetchMessages, 10000);
    hasMounted.current = true;
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchMessages, markAsRead]);

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
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-500 mb-1">No messages yet</p>
              <p className="text-xs text-slate-600">
                Messages from the client portal will appear here
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
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
          })
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
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/clients/ClientChat.tsx
git commit -m "feat: add ClientChat component for admin messaging

Client-side chat with 10s polling, mark-as-read on mount,
auto-scroll, and client-facing messages only."
```

---

## Task 6: Create InviteToPortal Component

**Files:**
- Create: `components/admin/clients/InviteToPortal.tsx`

- [ ] **Step 1: Create the component**

Create `components/admin/clients/InviteToPortal.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle, AlertCircle, Users } from "lucide-react";

interface PortalUser {
  id: string;
  name: string | null;
  email: string;
}

interface InviteToPortalProps {
  clientId: string;
  defaultEmail: string | null;
  portalUsers: PortalUser[];
}

export default function InviteToPortal({
  clientId,
  defaultEmail,
  portalUsers,
}: InviteToPortalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(defaultEmail || "");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || sending) return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch(`/api/admin/clients/${clientId}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setResult({
          type: "error",
          message: `Active invite already exists (expires ${new Date(data.invite.expiresAt).toLocaleDateString()})`,
        });
      } else if (!res.ok) {
        throw new Error(data.error || "Failed to send invite");
      } else {
        setResult({
          type: "success",
          message: `Invite sent to ${data.email}`,
        });
      }
    } catch (err) {
      setResult({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to send invite",
      });
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
      >
        <Mail size={14} />
        Invite to Portal
      </button>
    );
  }

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-4 space-y-3">
      {portalUsers.length > 0 && (
        <div className="flex items-start gap-2 pb-3 border-b border-white/6">
          <Users size={14} className="text-emerald mt-0.5" />
          <div>
            <p className="text-xs text-slate-400 mb-1">Active portal users</p>
            {portalUsers.map((u) => (
              <p key={u.id} className="text-sm text-slate-300">
                {u.name || u.email}{" "}
                <span className="text-xs text-slate-500">({u.email})</span>
              </p>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleInvite} className="flex items-end gap-2">
        <div className="flex-1">
          <label className="text-xs text-slate-400 mb-1 block">
            Invite email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@example.com"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald/50 transition-colors"
            disabled={sending}
          />
        </div>
        <button
          type="submit"
          disabled={sending || !email.trim()}
          className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {sending ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
          Send
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setResult(null);
          }}
          className="px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </form>

      {result && (
        <div
          className={`flex items-center gap-2 text-sm ${
            result.type === "success" ? "text-emerald" : "text-red-400"
          }`}
        >
          {result.type === "success" ? (
            <CheckCircle size={14} />
          ) : (
            <AlertCircle size={14} />
          )}
          {result.message}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/clients/InviteToPortal.tsx
git commit -m "feat: add InviteToPortal component

Email input with invite API call, shows existing portal
users, handles duplicate invite errors."
```

---

## Task 7: Create ClientDetailTabs Component

**Files:**
- Create: `components/admin/clients/ClientDetailTabs.tsx`

- [ ] **Step 1: Create the component**

This component wraps the Messages, Communication Log, and Support Tickets sections in a tab interface. It receives the pre-fetched data from the server component and renders the appropriate tab content.

Create `components/admin/clients/ClientDetailTabs.tsx`:

```tsx
"use client";

import { useState } from "react";
import { MessageSquare, FileText, LifeBuoy } from "lucide-react";
import ClientChat from "./ClientChat";
import Badge from "@/components/admin/shared/Badge";

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
}

const TABS = [
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "notes", label: "Communication Log", icon: FileText },
  { key: "tickets", label: "Support Tickets", icon: LifeBuoy },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ClientDetailTabs({
  clientId,
  currentUserId,
  notes,
  noteCount,
  tickets,
  ticketCount,
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
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/clients/ClientDetailTabs.tsx
git commit -m "feat: add ClientDetailTabs component

Tabbed interface for Messages, Communication Log, and
Support Tickets on client detail page."
```

---

## Task 8: Update Client Detail Page

**Files:**
- Modify: `app/admin/clients/[id]/page.tsx`

- [ ] **Step 1: Update imports and data fetching**

In `app/admin/clients/[id]/page.tsx`, add the new imports at the top:

```tsx
import ClientDetailTabs from "@/components/admin/clients/ClientDetailTabs";
import InviteToPortal from "@/components/admin/clients/InviteToPortal";
```

Add `Mail` to the existing lucide-react import (not strictly needed since InviteToPortal handles its own icons, but keep the existing imports intact).

In the Prisma query (the `prisma.client.findUnique` call), add to the `include` object:

```tsx
      portalUsers: { select: { id: true, name: true, email: true } },
```

Also update `_count` to include `clientMessages`:

```tsx
      _count: { select: { tasks: true, supportTickets: true, projects: true, clientNotes: true, clientMessages: true } },
```

- [ ] **Step 2: Add InviteToPortal to header area**

Replace the existing "Edit Client" link in the header (lines 90-95) with a flex container holding both buttons:

Before:
```tsx
        <Link
          href={`/admin/clients/${client.id}/edit`}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
        >
          Edit Client
        </Link>
```

After:
```tsx
        <div className="flex items-center gap-3">
          <InviteToPortal
            clientId={client.id}
            defaultEmail={client.contacts[0]?.email || null}
            portalUsers={client.portalUsers}
          />
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
          >
            Edit Client
          </Link>
        </div>
```

- [ ] **Step 3: Replace Notes + Tickets sections with ClientDetailTabs**

Remove the entire "Two-column: Notes + Tickets" `<div>` block (the `<div className="grid lg:grid-cols-2 gap-6">` that contains the Communication Log and Support Tickets sections — lines 198-244).

Replace it with:

```tsx
      {/* Messages, Notes & Tickets */}
      <ClientDetailTabs
        clientId={client.id}
        currentUserId={session.user.id}
        notes={client.clientNotes.map((n) => ({
          id: n.id,
          type: n.type,
          content: n.content,
          createdAt: n.createdAt.toISOString(),
          user: { id: n.user.id, name: n.user.name },
        }))}
        noteCount={client._count.clientNotes}
        tickets={client.supportTickets.map((t) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          priority: t.priority,
          slaDeadline: t.slaDeadline?.toISOString() || null,
          assignee: t.assignee
            ? { id: t.assignee.id, name: t.assignee.name, email: t.assignee.email }
            : null,
        }))}
        ticketCount={client._count.supportTickets}
      />
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd C:/Users/james/projects/vanguardm.com
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add app/admin/clients/[id]/page.tsx
git commit -m "feat: integrate chat tabs and invite button on client detail

Replace inline notes/tickets with tabbed interface.
Add InviteToPortal button in header area."
```

---

## Task 9: Create UnreadMessagesBadge Component

**Files:**
- Create: `components/admin/layout/UnreadMessagesBadge.tsx`

- [ ] **Step 1: Create the component**

Create `components/admin/layout/UnreadMessagesBadge.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

interface UnreadItem {
  clientId: string;
  clientName: string;
  unreadCount: number;
}

export default function UnreadMessagesBadge() {
  const [unread, setUnread] = useState<UnreadItem[]>([]);

  const fetchUnread = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages/unread");
      if (!res.ok) return;
      const data: UnreadItem[] = await res.json();
      setUnread(data);
    } catch {
      // Silent failure — non-critical UI
    }
  }, []);

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  const totalClients = unread.length;

  return (
    <Link
      href="/admin/clients"
      className="relative text-slate-400 hover:text-white transition-colors"
      title={
        totalClients > 0
          ? `${totalClients} client${totalClients > 1 ? "s" : ""} with unread messages`
          : "No unread messages"
      }
    >
      <MessageSquare size={18} />
      {totalClients > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white px-1">
          {totalClients}
        </span>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/layout/UnreadMessagesBadge.tsx
git commit -m "feat: add UnreadMessagesBadge header component

Polls /api/admin/messages/unread every 30s.
Shows count of clients with unread messages."
```

---

## Task 10: Update AdminHeader with Unread Badge

**Files:**
- Modify: `components/admin/layout/AdminHeader.tsx`

- [ ] **Step 1: Add UnreadMessagesBadge to header**

In `components/admin/layout/AdminHeader.tsx`:

1. Add import at top:
```tsx
import UnreadMessagesBadge from "./UnreadMessagesBadge";
```

2. Replace the existing static Bell button (lines 47-49):

Before:
```tsx
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={18} />
        </button>
```

After:
```tsx
        <UnreadMessagesBadge />
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={18} />
        </button>
```

3. The agent breadcrumb was already removed in Task 1. Verify it's gone:
```tsx
  "/admin/agent": "AI Agent",  // this line should already be deleted
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/layout/AdminHeader.tsx
git commit -m "feat: add unread messages indicator to admin header

MessageSquare icon with badge count, links to client list."
```

---

## Task 11: Add Unread Badges to Client List Page

**Files:**
- Modify: `app/admin/clients/page.tsx`

- [ ] **Step 1: Convert client list to use unread data**

The client list page is currently a server component. The unread data requires a client-side fetch (per-user). Add a small client component for the unread badges.

Create an inline approach: add a client component wrapper for the table that fetches unread data and overlays badges.

In `app/admin/clients/page.tsx`, add at the end of the file (after the default export closing):

Actually, since the page is a server component and we need client-side unread data, create a small inline client component. Add a new file `components/admin/clients/ClientListUnreadBadges.tsx`:

Create `components/admin/clients/ClientListUnreadBadges.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare } from "lucide-react";

interface UnreadItem {
  clientId: string;
  clientName: string;
  unreadCount: number;
}

export default function ClientListUnreadBadges() {
  const [unreadMap, setUnreadMap] = useState<Map<string, number>>(new Map());

  const fetchUnread = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages/unread");
      if (!res.ok) return;
      const data: UnreadItem[] = await res.json();
      const map = new Map<string, number>();
      data.forEach((item) => map.set(item.clientId, item.unreadCount));
      setUnreadMap(map);
    } catch {
      // Silent
    }
  }, []);

  useEffect(() => {
    fetchUnread();
  }, [fetchUnread]);

  if (unreadMap.size === 0) return null;

  // Inject badges via portal-style DOM manipulation is complex.
  // Instead, render a floating legend above the table.
  return (
    <div className="flex items-center gap-2 px-6 py-2 bg-emerald/5 border-b border-white/6">
      <MessageSquare size={14} className="text-emerald" />
      <span className="text-xs text-emerald">
        {unreadMap.size} client{unreadMap.size > 1 ? "s" : ""} with unread
        messages
      </span>
      <div className="flex gap-2 ml-2">
        {Array.from(unreadMap.entries())
          .slice(0, 5)
          .map(([clientId, count]) => (
            <span
              key={clientId}
              data-client-unread={clientId}
              className="text-xs text-slate-400"
            >
              ({count})
            </span>
          ))}
      </div>
    </div>
  );
}
```

Wait — this approach is clunky. A cleaner approach: pass client IDs from the server component and use `data-` attributes. But the simplest solution that matches the spec: convert the table row into a client component that can display badges.

Better approach — keep the server component and add a small client island for each row. Actually the cleanest is: fetch unread in the **server component** directly since the admin is authenticated.

Revise: In `app/admin/clients/page.tsx`, add to the `Promise.all` array:

```tsx
    prisma.clientMessageRead.findMany({
      where: { userId: session.user.id },
      select: { clientId: true, lastReadAt: true },
    }),
```

And fetch latest message per client:

```tsx
    prisma.clientMessage.groupBy({
      by: ["clientId"],
      where: { isInternal: false },
      _max: { createdAt: true },
    }),
```

Then compute unread server-side and pass as a Set to the template.

Here's the complete update:

In `app/admin/clients/page.tsx`, update the `Promise.all` (currently lines 16-28):

Before:
```tsx
  const [activeCount, prospectCount, pausedCount, clients] = await Promise.all([
    prisma.client.count({ where: { status: "ACTIVE" } }),
    prisma.client.count({ where: { status: "PROSPECT" } }),
    prisma.client.count({ where: { status: "PAUSED" } }),
    prisma.client.findMany({
      orderBy: { name: "asc" },
      include: {
        services: { select: { serviceType: true, status: true } },
        contacts: { where: { isPrimary: true }, take: 1, select: { name: true, email: true } },
        _count: { select: { tasks: true, supportTickets: true, projects: true } },
      },
    }),
  ]);
```

After:
```tsx
  const [activeCount, prospectCount, pausedCount, clients, messageReads, latestMessages] = await Promise.all([
    prisma.client.count({ where: { status: "ACTIVE" } }),
    prisma.client.count({ where: { status: "PROSPECT" } }),
    prisma.client.count({ where: { status: "PAUSED" } }),
    prisma.client.findMany({
      orderBy: { name: "asc" },
      include: {
        services: { select: { serviceType: true, status: true } },
        contacts: { where: { isPrimary: true }, take: 1, select: { name: true, email: true } },
        _count: { select: { tasks: true, supportTickets: true, projects: true } },
      },
    }),
    prisma.clientMessageRead.findMany({
      where: { userId: session.user.id },
      select: { clientId: true, lastReadAt: true },
    }),
    prisma.clientMessage.groupBy({
      by: ["clientId"],
      where: { isInternal: false },
      _max: { createdAt: true },
    }),
  ]);

  // Build set of client IDs with unread messages
  const readMap = new Map(messageReads.map((r) => [r.clientId, r.lastReadAt]));
  const clientsWithUnread = new Set<string>();
  for (const group of latestMessages) {
    const lastMsg = group._max.createdAt;
    if (!lastMsg) continue;
    const lastRead = readMap.get(group.clientId);
    if (!lastRead || lastRead < lastMsg) {
      clientsWithUnread.add(group.clientId);
    }
  }
```

Then add `MessageSquare` to the lucide-react imports:
```tsx
import { Building2, UserPlus, Pause, MessageSquare } from "lucide-react";
```

In the table row, after the client name link (line 74), add an unread indicator:

Before:
```tsx
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${client.id}`} className="block">
                        <p className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">{client.name}</p>
                        {client.domain && <p className="text-xs text-slate-500">{client.domain}</p>}
                      </Link>
                    </td>
```

After:
```tsx
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${client.id}`} className="block">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">{client.name}</p>
                          {clientsWithUnread.has(client.id) && (
                            <span className="flex items-center gap-1 text-emerald" title="Unread messages">
                              <MessageSquare size={12} />
                            </span>
                          )}
                        </div>
                        {client.domain && <p className="text-xs text-slate-500">{client.domain}</p>}
                      </Link>
                    </td>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/james/projects/vanguardm.com
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/clients/page.tsx
git commit -m "feat: add unread message badges to client list

Server-side unread calculation using ClientMessageRead
timestamps. Shows MessageSquare icon next to clients
with unread messages."
```

Note: delete `components/admin/clients/ClientListUnreadBadges.tsx` if it was created — we went with the server-side approach instead.

---

## Task 12: Push Schema to VPS Database and Redeploy

**Files:**
- No code changes — deployment task

- [ ] **Step 1: Push Prisma schema to VPS database**

```bash
cd C:/Users/james/projects/vanguardm.com
ssh -p 37980 root@103.120.48.66 "cd /home/vanguardm/public_html && DATABASE_URL='postgresql://vanguard_app:EffC8hw8n4_Fs-G@127.0.0.1:5432/vanguardm_vanguard_app' npx prisma db push"
```

Expected: `ClientMessageRead` table created. Existing tables unchanged.

- [ ] **Step 2: Build and deploy to VPS**

Transfer updated code and rebuild:

```bash
cd C:/Users/james/projects/vanguardm.com

# Create deploy archive
tar --exclude=node_modules --exclude=.next --exclude=.git -czf /tmp/vanguardm-deploy.tar.gz .

# Upload to VPS
scp -P 37980 /tmp/vanguardm-deploy.tar.gz root@103.120.48.66:/home/vanguardm/public_html/

# SSH in and deploy
ssh -p 37980 root@103.120.48.66 << 'DEPLOY'
cd /home/vanguardm/public_html
rm -rf .next
tar -xzf vanguardm-deploy.tar.gz
rm vanguardm-deploy.tar.gz
npm install --legacy-peer-deps
npx prisma generate
npx prisma db push
npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
chown -R vanguardm:vanguardm .next node_modules
pm2 delete vanguardm
cd .next/standalone
HOSTNAME=0.0.0.0 PORT=3000 pm2 start server.js --name vanguardm
pm2 save
DEPLOY
```

- [ ] **Step 3: Verify deployment**

```bash
curl -sI https://vanguardm.com | head -5
ssh -p 37980 root@103.120.48.66 "PGPASSWORD='EffC8hw8n4_Fs-G' psql -U vanguard_app -d vanguardm_vanguard_app -h 127.0.0.1 -c '\dt ClientMessageRead'"
```

Expected: HTTP 200 and `ClientMessageRead` table exists.

---

## Self-Review Checklist

**Spec coverage:**
- [x] Req 1: Portal side unchanged — no portal files touched
- [x] Req 2: Messages tab via ClientDetailTabs → ClientChat (Tasks 5, 7, 8)
- [x] Req 3: Chat filters `isInternal: false` (Task 5)
- [x] Req 4: ClientMessageRead model + mark-as-read endpoint (Tasks 2, 4)
- [x] Req 5: Unread badges on client list (Task 11) + header indicator (Tasks 9, 10)
- [x] Req 6: AI Agent removal (Task 1)
- [x] Req 7: `app/api/leads/chat/route.ts` not touched
- [x] Req 8: InviteToPortal button (Tasks 6, 8)

**Placeholder scan:** No TBDs, TODOs, or vague instructions. All code blocks are complete.

**Type consistency:**
- `Message` interface: consistent across ClientChat (id, content, isInternal, createdAt, user)
- `UnreadItem` interface: consistent between unread API response and both consumer components
- `ClientDetailTabsProps`: matches the data shape passed from the server component in Task 8
- `requireAuth` usage: matches existing pattern `("ADMIN", "TEAM")` from api-middleware.ts
- `withRateLimit` usage: matches existing `"admin"` tier pattern
