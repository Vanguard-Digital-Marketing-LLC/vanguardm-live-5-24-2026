# AI Agent Orchestration System — Design Document

**Date:** 2026-02-21
**Status:** Approved

## Goal

Build a full AI agent inside the vanguardm.com admin dashboard (`/admin/agent`) that can orchestrate server-side operations through natural language. The agent uses Claude's tool-use API in an agentic loop — executing bash commands, database queries, external API calls, and loading operational skills — all from a chat interface.

## Architecture

```
Browser (Admin Panel /admin/agent)
  └─ Chat UI (React client component, SSE streaming)
       └─ POST /api/admin/agent/chat
            └─ Agentic tool loop:
                 1. Send messages + tool definitions to Claude API
                 2. Claude responds with tool_use blocks or text
                 3. If tool_use → check permissions → confirm if destructive → execute → append result → go to 1
                 4. If text (stop_reason: end_turn) → stream final response to browser
                 5. Save conversation to Prisma Conversation model
```

**Model:** claude-sonnet-4-20250514 (upgradeable to Opus)

## Access Control

ADMIN role only. Per-email tool permissions hardcoded in the API route.

| Email | Access Level | Tools Available |
|-------|-------------|----------------|
| james@vanguardm.com | Full Access | All 8 tools, all 186 skills, no restrictions |
| howdy@mentservices.com | Limited | load_skill (client-report + sales-automator only), query_database (read-only), read_file |

Any other ADMIN user: denied access to the agent chat.

## Tools (8)

### 1. run_command
Execute bash commands on the VPS. Destructive commands (rm, kill, restart, drop, truncate, write operations) require user confirmation in the chat UI before execution.

**Blocked commands:** `rm -rf /`, `shutdown`, `reboot`, `mkfs`, `dd if=`, password/key file reads outside designated paths.

**Parameters:** `command` (string), `working_directory` (string, optional)

### 2. query_database
Run read-only SQL queries against PostgreSQL (vanguardm_vanguard_app).

**Parameters:** `query` (string — SELECT only, enforced server-side)

### 3. mutate_database
Run INSERT, UPDATE, DELETE SQL. Always requires user confirmation.

**Parameters:** `query` (string), `description` (string — human-readable summary of what this mutation does)

### 4. cloudflare_api
Call Cloudflare API endpoints. GET requests execute immediately. PUT/PATCH/POST/DELETE require confirmation.

**Parameters:** `method` (GET|PUT|PATCH|POST|DELETE), `endpoint` (string — relative to /zones/), `body` (object, optional)

### 5. nimbata_api
Call Nimbata API endpoints. GET requests execute immediately. POST/PUT/DELETE require confirmation.

**Parameters:** `method` (GET|POST|PUT|DELETE), `endpoint` (string — relative to API base), `body` (object, optional)

### 6. google_ads_script
Run Google Ads Python scripts from /root/projects/skillmaster/.agent/skills/googleads/.

**Parameters:** `script` (string — script path relative to googleads dir), `args` (string[], optional)

### 7. read_file
Read file contents from the server filesystem.

**Parameters:** `path` (string — absolute path), `max_lines` (number, optional, default 200)

### 8. load_skill
List available skills or load a skill's content into the conversation context.

**Parameters:** `action` ("list" | "load"), `skill_name` (string, optional — required when action is "load")

## Priority Marketing Skills (13)

These are listed in the system prompt as recommended for marketing/agency tasks:

1. sales-automator — cold emails, follow-ups, proposals, case studies
2. customer-support — ticket handling, sentiment analysis
3. google-ads — campaign management, search terms, negatives
4. editing-google-tag-manager — GTM container audit/configuration
5. editing-nimbata — call tracking, DNI, routing
6. client-report — branded website audit reports (MENT or Vanguard)
7. competitive-analysis — competitor research, market positioning
8. seo-structure — heading hierarchy, site structure, AEO
9. brand-identity — brand guidelines, design tokens, voice/tone
10. data-storytelling — analytics data into client-facing narratives
11. kpi-dashboard — metric dashboard design, KPI selection
12. wcag-audit-patterns — WCAG 2.2 accessibility audits
13. accessibility-compliance — accessible interface patterns, ARIA

## Confirmation Flow (Destructive Actions)

When Claude calls a tool marked as destructive:

1. API streams a `tool_pending_confirmation` event to the browser
2. Chat UI renders a confirmation card: tool name, parameters, description
3. User clicks **Approve** or **Deny**
4. Browser sends confirmation response back to the API
5. If approved: API executes tool, appends result, continues loop
6. If denied: API appends "User denied this action" as tool result, Claude adjusts

## Chat UI Components

- **ConversationSidebar** — list of saved conversations, "New Chat" button
- **MessageThread** — scrollable message list with user/assistant bubbles
- **ToolExecutionCard** — expandable card showing tool name, input, output, status (pending/running/success/failed/denied)
- **ConfirmationModal** — overlay for destructive actions with Approve/Deny
- **ChatInput** — multi-line text input with send button at bottom
- **StreamingIndicator** — typing indicator while Claude is generating

Styled with existing dark theme: bg-[#0A0F1A], border-white/6, emerald/amber accents, font-display headers.

## System Prompt

A comprehensive prompt containing:
- Agent identity and role (Vanguard Digital Marketing operations assistant)
- All client data summary (names, domains, phones, retainers, services)
- Server paths (doc roots, project dirs, build scripts)
- API credential locations (Cloudflare token path, Nimbata key path, Google Ads env)
- Operational procedures (deploy sequence, cache clearing, nginx restart)
- List of 13 priority marketing skills
- Instructions for confirmation flow
- Security boundaries (never expose raw credentials, never delete without confirmation)

## Data Flow

1. User types message in chat UI
2. Browser POSTs to /api/admin/agent/chat with { messages, conversationId }
3. API checks session email against permissions map
4. API builds tool definitions array based on user's allowed tools
5. API calls Claude with messages + tools + system prompt
6. Claude responds — API handles tool loop server-side
7. Each step streams status events (SSE) to browser:
   - `message_start`, `content_block_start`, `content_block_delta` (text streaming)
   - `tool_use` (tool execution status)
   - `tool_pending_confirmation` (destructive action needs approval)
   - `tool_result` (tool completed)
   - `message_complete` (final response done)
8. On message_complete, API saves updated messages to Conversation record

## Environment Requirements

- `ANTHROPIC_API_KEY` added to /home/vanguardm/env/production.env
- No new npm dependencies required (fetch API for Claude calls, existing Prisma for DB)

## Security

- ADMIN role + email allowlist (double gate)
- Destructive action confirmation
- Command denylist for bash
- SQL injection prevention (SELECT-only for query_database)
- Credential files readable only through designated paths
- All tool executions logged to server console
- Conversation history stored in Prisma (auditable)
