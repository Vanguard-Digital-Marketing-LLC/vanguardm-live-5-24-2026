# Admin Client Chat + AI Agent Removal

**Date:** 2026-03-29
**Status:** Approved

## Summary

Add a Messages tab to the admin client detail page (`/admin/clients/[id]`) so the admin can read and respond to client support chat messages. Add unread indicators to the client list and admin header. Add an "Invite to Portal" button on the client detail page to trigger client enrollment. Remove the AI Agent feature entirely.

## Requirements

1. Clients already send messages from `/portal/messages` — no changes needed on the portal side.
2. Admin sees and replies to messages within a "Messages" tab on the client detail page.
3. Chat is client-facing only — no internal notes in the chat UI (existing ClientNotes handle that).
4. Unread tracking via last-read timestamp per admin-client pair.
5. Unread badges on the client list page and a notification indicator in the admin header.
6. Remove the AI Agent feature (page, API routes, components, lib) and all navigation references to it.
7. Keep the public lead chatbot (`/api/leads/chat`) — it is a separate feature.
8. Add an "Invite to Portal" button on the client detail page to send portal invitations via the existing `/api/admin/clients/[id]/invite` endpoint.

## Data Model

### New Model: ClientMessageRead

Tracks the last time an admin/team user viewed a client's chat thread.

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

- One record per admin-client pair.
- `lastReadAt` updates to `now()` when the admin opens that client's Messages tab.
- Any `ClientMessage` with `createdAt > lastReadAt` (and `isInternal: false`) is "unread."
- Requires adding `messageReads ClientMessageRead[] @relation("MessageReads")` to both the `User` and `Client` models.

### Existing Model: ClientMessage (no changes)

```prisma
model ClientMessage {
  id         String   @id @default(cuid())
  clientId   String
  client     Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  content    String   @db.Text
  isInternal Boolean  @default(false)
  createdAt  DateTime @default(now())

  @@index([clientId])
  @@index([userId])
}
```

## API Endpoints

### New Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `GET /api/admin/messages/unread` | GET | ADMIN/TEAM | Returns `{ clientId, clientName, unreadCount }[]` for all clients with unread messages |
| `POST /api/admin/clients/[id]/messages/read` | POST | ADMIN/TEAM | Upserts `ClientMessageRead.lastReadAt` to `now()` for the current user + client |

### Existing Endpoints (no changes needed)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `GET /api/admin/clients/[id]/messages` | GET | Fetch all messages for a client (already works) |
| `POST /api/admin/clients/[id]/messages` | POST | Send a message to a client (already works, set `isInternal: false` for chat) |

**Note:** The existing POST endpoint supports `isInternal` — the chat component always sends `isInternal: false` (client-facing only). The GET endpoint returns all messages including internal; the `ClientChat` component filters to `isInternal === false` before rendering. This preserves backward compatibility — the admin can still see internal notes in the Communication Log section.

## UI Components

### 1. Messages Tab — Client Detail Page

**Location:** New tab in `app/admin/clients/[id]/page.tsx`

**Behavior:**
- Chat thread displayed chronologically, oldest at top, newest at bottom.
- Team messages (ADMIN/TEAM role) aligned right with emerald accent.
- Client messages aligned left with neutral/gray styling.
- Textarea at bottom — Enter to send, Shift+Enter for newline, max 5000 chars.
- 10-second polling for new messages (matches portal behavior).
- On tab mount, calls `POST /api/admin/clients/[id]/messages/read` to mark as read.
- Auto-scrolls to bottom on new messages.
- Loading spinner, empty state ("No messages yet"), and error handling.

**Component:** `components/admin/clients/ClientChat.tsx`

### 2. Unread Badge — Client List

**Location:** `app/admin/clients/page.tsx`

**Behavior:**
- On page load, fetches `GET /api/admin/messages/unread`.
- Displays a small emerald dot or count badge next to client names that have unread messages.
- Badge shows unread count if > 0.

### 3. Notification Indicator — Admin Header

**Location:** `components/admin/layout/AdminHeader.tsx`

**Behavior:**
- MessageSquare icon (from lucide-react) in the header bar.
- Shows total count of clients with unread messages as a badge.
- Fetches `GET /api/admin/messages/unread` on mount and polls every 30 seconds.
- Clicking navigates to `/admin/clients` (client list, where badges show which clients need attention).

## AI Agent Removal

### Files to Delete

| Path | Description |
|------|-------------|
| `app/admin/agent/page.tsx` | Agent chat page |
| `app/api/admin/agent/chat/route.ts` | SSE streaming chat endpoint |
| `app/api/admin/agent/conversations/route.ts` | Conversation CRUD endpoint |
| `components/admin/agent/AgentChat.tsx` | Agent chat UI component |
| `components/admin/agent/ConfirmationCard.tsx` | Destructive action confirmation |
| `components/admin/agent/ToolExecutionCard.tsx` | Tool execution display |
| `lib/agent/config.ts` | Agent permissions, tools, system prompt |
| `lib/agent/executor.ts` | Tool execution engine |

### Files to Modify

| File | Change |
|------|--------|
| `components/admin/layout/AdminSidebar.tsx` | Remove `Bot` icon import and `{ label: "AI Agent", icon: Bot, href: "/admin/agent", adminOnly: true }` nav item |
| `components/admin/layout/AdminHeader.tsx` | Remove `"/admin/agent": "AI Agent"` breadcrumb entry |

### Files to Keep

| File | Reason |
|------|--------|
| `app/api/leads/chat/route.ts` | Public lead chatbot — separate feature, not part of admin agent |

## Invite to Portal Button

### 4. Invite Button — Client Detail Page

**Location:** `app/admin/clients/[id]/page.tsx` (in the header area near the client name/status)

**Behavior:**
- Button labeled "Invite to Portal" with a Mail icon (lucide-react).
- Clicking opens a small inline form or modal with a single email input field.
- Email defaults to the primary ClientContact email if one exists.
- Submits to existing `POST /api/admin/clients/[id]/invite` endpoint.
- Shows success message with the invite link on success.
- Shows error if invite already exists or email is invalid.
- If client already has portal users (User records with `clientId`), show those users with a "Resend Invite" option instead.

**Component:** Inline in the client detail page (small enough to not warrant a separate component).

**No new API work** — the invite endpoint, email template, and accept flow already exist.

## Styling

Follows existing admin dark theme:
- Backgrounds: `#0A0F1A`, `#0D1117`, `#111827`
- Accent: emerald (`emerald-500`, `emerald-600`)
- Text: `gray-100`, `gray-400` for secondary
- Borders: `gray-700`, `gray-800`
- Consistent with portal Messages page styling (inverted sender alignment)

## Out of Scope

- WebSocket/real-time push (polling is sufficient for now)
- Internal notes in the chat UI (use existing ClientNotes)
- Changes to the portal-side messaging (`/portal/messages`)
- Email notifications for new messages
- Message search or filtering
- File/image attachments in chat
