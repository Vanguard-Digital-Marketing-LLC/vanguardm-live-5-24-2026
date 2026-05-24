# AI Agent Orchestration System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a full agentic AI assistant in the admin dashboard that can execute server-side operations (bash, database, Cloudflare, Nimbata, Google Ads, file reading, skill loading) through natural language with per-email tool permissions and destructive action confirmation.

**Architecture:** Agentic tool loop — Next.js API route calls Claude with tool definitions, executes tools server-side in a loop until Claude produces a final text response, streams all events (tool use, results, text) to the browser via SSE. Confirmation required for destructive actions. Per-email permissions gate tool access.

**Tech Stack:** Next.js 16.1.6, React 19, Claude Sonnet 4 API (raw fetch, non-streaming for tool loop), SSE for browser streaming, Prisma for conversations, Node child_process for bash, Tailwind v4 dark theme.

---

## Task 1: Environment Setup + Agent Config Module

**Files:**
- Modify: `/home/vanguardm/env/production.env`
- Create: `lib/agent/config.ts`

**Step 1: Add ANTHROPIC_API_KEY to production.env**

Add this line to `/home/vanguardm/env/production.env`:

```
ANTHROPIC_API_KEY=<your-api-key>
```

**Step 2: Create lib/agent/config.ts**

```typescript
// lib/agent/config.ts
import { readFileSync } from "fs";

// ── Per-email permissions ────────────────────────

interface AgentPermissions {
  tools: string[];
  skills: string[] | "all";
}

export const AGENT_PERMISSIONS: Record<string, AgentPermissions> = {
  "james@vanguardm.com": {
    tools: ["run_command", "query_database", "mutate_database", "cloudflare_api", "nimbata_api", "google_ads_script", "read_file", "load_skill"],
    skills: "all",
  },
  "howdy@mentservices.com": {
    tools: ["query_database", "read_file", "load_skill"],
    skills: ["client-report", "sales-automator"],
  },
};

export function getUserPermissions(email: string): AgentPermissions | null {
  return AGENT_PERMISSIONS[email.toLowerCase()] || null;
}

// ── Tool definitions (Anthropic API format) ──────

export const ALL_TOOL_DEFINITIONS = [
  {
    name: "run_command",
    description: "Execute a bash command on the VPS server. Use for: building sites, restarting services, checking logs, managing files, running scripts. Commands that modify/delete files or restart services require user confirmation.",
    input_schema: {
      type: "object" as const,
      properties: {
        command: { type: "string", description: "The bash command to execute" },
        working_directory: { type: "string", description: "Working directory (default: /root)" },
      },
      required: ["command"],
    },
  },
  {
    name: "query_database",
    description: "Run a read-only SQL query against the PostgreSQL database (vanguardm_vanguard_app). Use for: looking up clients, tasks, tickets, leads, users, conversations, certificates, quiz attempts. Only SELECT queries allowed.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "A SELECT SQL query" },
      },
      required: ["query"],
    },
  },
  {
    name: "mutate_database",
    description: "Run an INSERT, UPDATE, or DELETE SQL query. Always requires user confirmation before execution. Include a clear description of what the mutation does.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "The SQL query (INSERT, UPDATE, or DELETE)" },
        description: { type: "string", description: "Human-readable summary of what this mutation does" },
      },
      required: ["query", "description"],
    },
  },
  {
    name: "cloudflare_api",
    description: "Call Cloudflare API endpoints. Manages 75 zones including DNS records, WAF rules, SSL settings, security settings, and analytics. GET requests execute immediately. PUT/PATCH/POST/DELETE require confirmation.",
    input_schema: {
      type: "object" as const,
      properties: {
        method: { type: "string", enum: ["GET", "PUT", "PATCH", "POST", "DELETE"], description: "HTTP method" },
        endpoint: { type: "string", description: "API path after /client/v4/ (e.g. 'zones' or 'zones/{zone_id}/dns_records')" },
        body: { type: "object", description: "Request body for PUT/PATCH/POST" },
      },
      required: ["method", "endpoint"],
    },
  },
  {
    name: "nimbata_api",
    description: "Call Nimbata call tracking API. Manages 17 projects with 83 tracking numbers. GET requests execute immediately. POST/PUT/DELETE require confirmation.",
    input_schema: {
      type: "object" as const,
      properties: {
        method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE"], description: "HTTP method" },
        endpoint: { type: "string", description: "API path after /v1/a/{customerId}/ (e.g. 'tracking-numbers' or 'projects')" },
        body: { type: "object", description: "Request body for POST/PUT" },
      },
      required: ["method", "endpoint"],
    },
  },
  {
    name: "google_ads_script",
    description: "Run Google Ads management scripts. Available scripts: check_all_accounts.py (MCC-wide 30-day performance), check_all_search_terms.py (search terms audit), _shared/check_account.py <client> (single client), _shared/add_negatives.py <client> 'kw1' 'kw2' (add negative keywords).",
    input_schema: {
      type: "object" as const,
      properties: {
        script: { type: "string", description: "Script path relative to googleads dir (e.g. 'check_all_accounts.py' or '_shared/check_account.py')" },
        args: { type: "array", items: { type: "string" }, description: "Arguments to pass to the script" },
      },
      required: ["script"],
    },
  },
  {
    name: "read_file",
    description: "Read file contents from the server. Use for: reading config files, website source, build scripts, logs, skill files. Cannot read credential/env files.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "Absolute file path" },
        max_lines: { type: "number", description: "Maximum lines to read (default: 200)" },
      },
      required: ["path"],
    },
  },
  {
    name: "load_skill",
    description: "List available skills or load a skill's instructions. 186 skills available covering marketing, engineering, design, and operations. Priority marketing skills: sales-automator, customer-support, google-ads, editing-google-tag-manager, editing-nimbata, client-report, competitive-analysis, seo-structure, brand-identity, data-storytelling, kpi-dashboard, wcag-audit-patterns, accessibility-compliance.",
    input_schema: {
      type: "object" as const,
      properties: {
        action: { type: "string", enum: ["list", "load"], description: "'list' to see all skills, 'load' to load a specific skill" },
        skill_name: { type: "string", description: "Skill name (without .md extension) — required when action is 'load'" },
      },
      required: ["action"],
    },
  },
];

export function getToolsForUser(email: string) {
  const perms = getUserPermissions(email);
  if (!perms) return [];
  return ALL_TOOL_DEFINITIONS.filter((t) => perms.tools.includes(t.name));
}

// ── Destructive action detection ─────────────────

const DESTRUCTIVE_COMMAND_PATTERNS = /\b(rm\s|rmdir|kill|pkill|restart|systemctl\s+(restart|stop)|pm2\s+(restart|stop|delete)|shutdown|reboot|mkfs|dd\s+if=|chmod|chown|mv\s|cp\s.*-f|truncate|drop\s|npm\s+uninstall|pip\s+uninstall)\b/i;

const BLOCKED_COMMANDS = /\b(rm\s+-rf\s+\/\s|shutdown\s+-h|reboot\s*$|mkfs\s|dd\s+if=\/dev\/)/i;

export function isCommandBlocked(command: string): boolean {
  return BLOCKED_COMMANDS.test(command);
}

export function isDestructive(toolName: string, input: Record<string, unknown>): boolean {
  switch (toolName) {
    case "run_command":
      return DESTRUCTIVE_COMMAND_PATTERNS.test(input.command as string);
    case "mutate_database":
      return true;
    case "cloudflare_api":
      return (input.method as string) !== "GET";
    case "nimbata_api":
      return (input.method as string) !== "GET";
    default:
      return false;
  }
}

// ── Blocked file paths for read_file ─────────────

const BLOCKED_READ_PATTERNS = [
  /\/home\/vanguardm\/env\//,
  /\/home\/vanguardm\/\.[^/]+$/,
  /\/root\/\.[^/]+$/,
  /\.env$/,
  /\.pem$/,
  /\.key$/,
  /id_rsa/,
];

export function isReadBlocked(path: string): boolean {
  return BLOCKED_READ_PATTERNS.some((p) => p.test(path));
}

// ── System prompt ────────────────────────────────

export function buildSystemPrompt(): string {
  return `You are the AI operations assistant for Vanguard Digital Marketing, integrated into the admin dashboard at vanguardm.com/admin.

## Your Role
Help the admin manage client accounts, run marketing operations, generate reports, manage the VPS server, and automate agency workflows. You have direct access to server tools.

## Clients
Query the database for current client data: SELECT name, domain, phone, email, status, "monthlyRetainer", notes FROM "Client" ORDER BY name;
Key clients include: Howdy Garage Doors ($4500/mo), SDS Plumbing ($5310/mo), Brazos Valley AC ($1950/mo), Peas in a Pod ($1050/mo), Raymond's Roofing ($900/mo), and 16 others totaling $20,010/mo.

## Server Infrastructure
- VPS: NameHero, cPanel user: vanguardm
- Web root: /home/vanguardm/public_html/
- Client sites: /home/vanguardm/public_html/{domain}/ (addon domains)
- Project dirs: /root/projects/ (howdy-garage-doors, hvac-site, abwms-site, site-template, reports)
- Build scripts: Python/Jinja2 (build.py in each project dir)
- vanguardm.com: Next.js 16.1.6, PM2 managed, PostgreSQL
- Deploy sequence: npm run build → cp static → pm2 restart → clear nginx cache

## APIs & Credentials
- Cloudflare: Token at /root/.cloudflare-token (75 zones, read with grep CF_API_TOKEN= | cut -d= -f2)
- Nimbata: Key at /home/vanguardm/.nimbata-api-key, account at /home/vanguardm/.nimbata-account-token (17 projects, 83 numbers)
- Google Ads: Scripts at /root/projects/skillmaster/.agent/skills/googleads/ (MUST use python3.12)
- GTM: 24 containers across 23 clients

## Marketing Skills (load with load_skill tool)
Priority: sales-automator, customer-support, google-ads, editing-google-tag-manager, editing-nimbata, client-report, competitive-analysis, seo-structure, brand-identity, data-storytelling, kpi-dashboard, wcag-audit-patterns, accessibility-compliance

## Rules
1. Never expose raw API keys or credentials in responses — use them through tools only
2. Destructive actions (deletes, restarts, writes) will prompt for user confirmation
3. For database writes, always use mutate_database (not run_command with psql)
4. For Google Ads scripts, always use google_ads_script tool (handles python3.12 and working dir)
5. When asked about a client, query the database first for current data
6. Keep responses concise and actionable
7. When using a skill, load it first with load_skill, then follow its instructions`;
}
```

**Step 3: Verify**

```bash
cd /home/vanguardm/public_html && npx tsx -e "import { getToolsForUser } from './lib/agent/config'; console.log('james tools:', getToolsForUser('james@vanguardm.com').length); console.log('howdy tools:', getToolsForUser('howdy@mentservices.com').length); console.log('random:', getToolsForUser('random@test.com').length);"
```

Expected: `james tools: 8`, `howdy tools: 3`, `random: 0`

---

## Task 2: Tool Executor Module

**Files:**
- Create: `lib/agent/executor.ts`

**Step 1: Create the executor**

```typescript
// lib/agent/executor.ts
import { execSync } from "child_process";
import { readFileSync, readdirSync, existsSync } from "fs";
import { isCommandBlocked, isReadBlocked, getUserPermissions } from "./config";
import { prisma } from "@/lib/db";

interface ToolResult {
  output: string;
  isError: boolean;
}

export async function executeTool(
  name: string,
  input: Record<string, unknown>,
  userEmail: string
): Promise<ToolResult> {
  try {
    switch (name) {
      case "run_command":
        return executeCommand(input);
      case "query_database":
        return await executeQuery(input);
      case "mutate_database":
        return await executeMutation(input);
      case "cloudflare_api":
        return await executeCloudflareApi(input);
      case "nimbata_api":
        return await executeNimbataApi(input);
      case "google_ads_script":
        return executeGoogleAdsScript(input);
      case "read_file":
        return executeReadFile(input);
      case "load_skill":
        return executeLoadSkill(input, userEmail);
      default:
        return { output: `Unknown tool: ${name}`, isError: true };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { output: `Error: ${msg}`, isError: true };
  }
}

function executeCommand(input: Record<string, unknown>): ToolResult {
  const command = input.command as string;
  const cwd = (input.working_directory as string) || "/root";

  if (isCommandBlocked(command)) {
    return { output: "This command is blocked for safety.", isError: true };
  }

  try {
    const output = execSync(command, {
      cwd,
      timeout: 30000,
      maxBuffer: 1024 * 1024,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { output: output.slice(0, 10000) || "(no output)", isError: false };
  } catch (err: unknown) {
    const e = err as { stderr?: string; stdout?: string; message: string };
    return { output: (e.stderr || e.stdout || e.message).slice(0, 10000), isError: true };
  }
}

async function executeQuery(input: Record<string, unknown>): Promise<ToolResult> {
  const query = (input.query as string).trim();

  if (!/^\s*SELECT\b/i.test(query)) {
    return { output: "Only SELECT queries allowed. Use mutate_database for writes.", isError: true };
  }

  const rows = await prisma.$queryRawUnsafe(query);
  const output = JSON.stringify(rows, null, 2);
  return { output: output.slice(0, 10000), isError: false };
}

async function executeMutation(input: Record<string, unknown>): Promise<ToolResult> {
  const query = (input.query as string).trim();

  if (/^\s*SELECT\b/i.test(query)) {
    return { output: "Use query_database for SELECT queries.", isError: true };
  }
  if (/\b(DROP\s+DATABASE|DROP\s+SCHEMA)\b/i.test(query)) {
    return { output: "DROP DATABASE/SCHEMA is blocked.", isError: true };
  }

  const result = await prisma.$executeRawUnsafe(query);
  return { output: `Query executed. Rows affected: ${result}`, isError: false };
}

async function executeCloudflareApi(input: Record<string, unknown>): Promise<ToolResult> {
  const method = input.method as string;
  const endpoint = input.endpoint as string;
  const body = input.body as Record<string, unknown> | undefined;

  let token: string;
  try {
    const content = readFileSync("/root/.cloudflare-token", "utf-8");
    const match = content.match(/CF_API_TOKEN=(.+)/);
    token = match ? match[1].trim() : "";
    if (!token) throw new Error("Token not found");
  } catch {
    return { output: "Failed to read Cloudflare API token.", isError: true };
  }

  const url = `https://api.cloudflare.com/client/v4/${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json();
  const output = JSON.stringify(data, null, 2);
  return { output: output.slice(0, 10000), isError: !data.success };
}

async function executeNimbataApi(input: Record<string, unknown>): Promise<ToolResult> {
  const method = input.method as string;
  const endpoint = input.endpoint as string;
  const body = input.body as Record<string, unknown> | undefined;

  let apiKey: string;
  let customerId: string;
  try {
    apiKey = readFileSync("/home/vanguardm/.nimbata-api-key", "utf-8").trim();
    customerId = readFileSync("/home/vanguardm/.nimbata-account-token", "utf-8").trim();
  } catch {
    return { output: "Failed to read Nimbata credentials.", isError: true };
  }

  const url = `https://api.nimbata.com/v1/a/${customerId}/${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json();
  return { output: JSON.stringify(data, null, 2).slice(0, 10000), isError: false };
}

function executeGoogleAdsScript(input: Record<string, unknown>): ToolResult {
  const script = input.script as string;
  const args = (input.args as string[]) || [];
  const baseDir = "/root/projects/skillmaster/.agent/skills/googleads";

  const scriptPath = `${baseDir}/${script}`;
  if (!existsSync(scriptPath)) {
    return { output: `Script not found: ${script}`, isError: true };
  }

  const cmd = `python3.12 ${script} ${args.map((a) => `'${a.replace(/'/g, "'\\''")}'`).join(" ")}`.trim();

  try {
    const output = execSync(cmd, {
      cwd: baseDir,
      timeout: 120000,
      maxBuffer: 2 * 1024 * 1024,
      encoding: "utf-8",
      env: { ...process.env, PYTHONPATH: baseDir },
    });
    return { output: output.slice(0, 10000) || "(no output)", isError: false };
  } catch (err: unknown) {
    const e = err as { stderr?: string; stdout?: string; message: string };
    return { output: (e.stderr || e.stdout || e.message).slice(0, 10000), isError: true };
  }
}

function executeReadFile(input: Record<string, unknown>): ToolResult {
  const path = input.path as string;
  const maxLines = (input.max_lines as number) || 200;

  if (isReadBlocked(path)) {
    return { output: "Access to this file is blocked for security.", isError: true };
  }

  if (!existsSync(path)) {
    return { output: `File not found: ${path}`, isError: true };
  }

  try {
    const content = readFileSync(path, "utf-8");
    const lines = content.split("\n").slice(0, maxLines);
    return { output: lines.join("\n").slice(0, 10000), isError: false };
  } catch (err: unknown) {
    return { output: `Failed to read file: ${err instanceof Error ? err.message : err}`, isError: true };
  }
}

function executeLoadSkill(input: Record<string, unknown>, userEmail: string): ToolResult {
  const action = input.action as string;
  const skillName = input.skill_name as string | undefined;
  const skillsDir = "/root/.claude/commands";

  if (action === "list") {
    try {
      const files = readdirSync(skillsDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(".md", ""))
        .sort();
      return { output: `Available skills (${files.length}):\n${files.join("\n")}`, isError: false };
    } catch {
      return { output: "Failed to list skills.", isError: true };
    }
  }

  if (action === "load" && skillName) {
    // Check skill permissions
    const perms = getUserPermissions(userEmail);
    if (perms && perms.skills !== "all" && !perms.skills.includes(skillName)) {
      return { output: `You don't have permission to load the '${skillName}' skill.`, isError: true };
    }

    const filePath = `${skillsDir}/${skillName}.md`;
    if (!existsSync(filePath)) {
      return { output: `Skill not found: ${skillName}`, isError: true };
    }

    const content = readFileSync(filePath, "utf-8");
    return { output: content.slice(0, 15000), isError: false };
  }

  return { output: "Invalid action. Use 'list' or 'load' with a skill_name.", isError: true };
}
```

**Step 2: Verify**

```bash
cd /home/vanguardm/public_html && npx tsx -e "
import { executeTool } from './lib/agent/executor';
async function test() {
  const r1 = await executeTool('read_file', { path: '/home/vanguardm/public_html/package.json', max_lines: 5 }, 'james@vanguardm.com');
  console.log('read_file:', r1.isError ? 'FAIL' : 'OK');
  const r2 = await executeTool('read_file', { path: '/home/vanguardm/env/production.env' }, 'james@vanguardm.com');
  console.log('blocked read:', r2.isError ? 'OK (blocked)' : 'FAIL (should be blocked)');
  const r3 = await executeTool('load_skill', { action: 'list' }, 'james@vanguardm.com');
  console.log('list skills:', r3.output.includes('sales-automator') ? 'OK' : 'FAIL');
  const r4 = await executeTool('load_skill', { action: 'load', skill_name: 'sales-automator' }, 'howdy@mentservices.com');
  console.log('howdy load sales-automator:', r4.isError ? 'FAIL' : 'OK');
  const r5 = await executeTool('load_skill', { action: 'load', skill_name: 'google-ads' }, 'howdy@mentservices.com');
  console.log('howdy load google-ads (blocked):', r5.isError ? 'OK (blocked)' : 'FAIL');
}
test();
"
```

Expected: All checks pass.

---

## Task 3: Agentic Chat API Route

**Files:**
- Rewrite: `app/api/admin/agent/chat/route.ts`

**Step 1: Rewrite the chat route with agentic tool loop**

```typescript
// app/api/admin/agent/chat/route.ts
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  getUserPermissions,
  getToolsForUser,
  buildSystemPrompt,
  isDestructive,
  isCommandBlocked,
} from "@/lib/agent/config";
import { executeTool } from "@/lib/agent/executor";

const MAX_ITERATIONS = 15;

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const email = session.user.email?.toLowerCase() || "";
  const perms = getUserPermissions(email);
  if (!perms) {
    return new Response(JSON.stringify({ error: "No agent access for this account" }), { status: 403 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), { status: 500 });
  }

  const body = await request.json();
  const { messages, conversationId, confirmAction } = body;

  const tools = getToolsForUser(email);
  const systemPrompt = buildSystemPrompt();

  // Build working messages array
  let workingMessages = [...messages];

  // Handle confirmation response
  if (confirmAction) {
    const lastAssistant = workingMessages[workingMessages.length - 1];
    if (lastAssistant?.role === "assistant") {
      const toolUseBlocks = (Array.isArray(lastAssistant.content) ? lastAssistant.content : [])
        .filter((b: { type: string }) => b.type === "tool_use");

      const toolResults = [];
      for (const toolUse of toolUseBlocks) {
        if (confirmAction.approved) {
          const result = await executeTool(toolUse.name, toolUse.input, email);
          toolResults.push({
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: result.output,
            is_error: result.isError,
          });
        } else {
          toolResults.push({
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: "User denied this action.",
            is_error: false,
          });
        }
      }
      workingMessages.push({ role: "user", content: toolResults });
    }
  }

  // SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: unknown) {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      }

      try {
        for (let i = 0; i < MAX_ITERATIONS; i++) {
          // Call Claude API (non-streaming for tool loop)
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-6",
              max_tokens: 8192,
              system: systemPrompt,
              messages: workingMessages,
              tools: tools.length > 0 ? tools : undefined,
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            send("error", { message: `Claude API error: ${res.status} ${errText.slice(0, 500)}` });
            break;
          }

          const response = await res.json();

          // Extract text and tool_use blocks
          const textBlocks = response.content.filter((b: { type: string }) => b.type === "text");
          const toolUseBlocks = response.content.filter((b: { type: string }) => b.type === "tool_use");

          // Stream text blocks
          for (const block of textBlocks) {
            send("text", { text: block.text });
          }

          // No tool calls — we're done
          if (toolUseBlocks.length === 0 || response.stop_reason === "end_turn") {
            // Add final assistant message
            workingMessages.push({ role: "assistant", content: response.content });
            break;
          }

          // Check for destructive tools
          const hasDestructive = toolUseBlocks.some((t: { name: string; input: Record<string, unknown> }) =>
            isDestructive(t.name, t.input)
          );

          // Check for blocked commands
          for (const t of toolUseBlocks) {
            if (t.name === "run_command" && isCommandBlocked(t.input.command as string)) {
              send("error", { message: `Blocked command: ${t.input.command}` });
              controller.close();
              return;
            }
          }

          if (hasDestructive) {
            // Add assistant message to working messages (for continuation after confirmation)
            workingMessages.push({ role: "assistant", content: response.content });

            // Send confirmation request to browser
            send("confirmation_required", {
              tools: toolUseBlocks.map((t: { id: string; name: string; input: Record<string, unknown> }) => ({
                id: t.id,
                name: t.name,
                input: t.input,
              })),
              messages: workingMessages,
            });

            // Save conversation state and stop
            const savedId = await saveConversation(session.user.id, conversationId, workingMessages);
            send("done", { conversationId: savedId, pendingConfirmation: true });
            controller.close();
            return;
          }

          // Execute non-destructive tools
          workingMessages.push({ role: "assistant", content: response.content });

          const toolResults = [];
          for (const toolUse of toolUseBlocks) {
            send("tool_start", { id: toolUse.id, name: toolUse.name, input: toolUse.input });

            const result = await executeTool(toolUse.name, toolUse.input, email);

            send("tool_result", { id: toolUse.id, output: result.output, isError: result.isError });

            toolResults.push({
              type: "tool_result",
              tool_use_id: toolUse.id,
              content: result.output,
              is_error: result.isError,
            });
          }

          workingMessages.push({ role: "user", content: toolResults });
        }

        // Save conversation
        const savedId = await saveConversation(session.user.id, conversationId, workingMessages);
        send("done", { conversationId: savedId });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        send("error", { message: msg });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

async function saveConversation(
  userId: string,
  conversationId: string | undefined,
  messages: unknown[]
): Promise<string> {
  // Generate title from first user message
  const firstUserMsg = messages.find((m: any) => m.role === "user");
  const title =
    typeof firstUserMsg?.content === "string"
      ? firstUserMsg.content.slice(0, 60)
      : "Agent conversation";

  if (conversationId) {
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { messages: messages as any, updatedAt: new Date() },
    });
    return conversationId;
  }

  const conv = await prisma.conversation.create({
    data: {
      userId,
      title,
      messages: messages as any,
    },
  });
  return conv.id;
}
```

**Step 2: Verify route compiles**

```bash
cd /home/vanguardm/public_html && npx tsc --noEmit app/api/admin/agent/chat/route.ts 2>&1 | head -20
```

---

## Task 4: Update Conversations API Route

**Files:**
- Modify: `app/api/admin/agent/conversations/route.ts`

**Step 1: Add PATCH method for updating conversation messages and DELETE for removing**

Add after the existing POST handler:

```typescript
export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const conversation = await prisma.conversation.update({
    where: { id: body.id, userId: session.user.id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.messages && { messages: body.messages }),
    },
  });

  return NextResponse.json(conversation);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.conversation.delete({ where: { id, userId: session.user.id } });
  return NextResponse.json({ success: true });
}
```

---

## Task 5: Chat UI Components — ToolExecutionCard + ConfirmationCard

**Files:**
- Create: `components/admin/agent/ToolExecutionCard.tsx`
- Create: `components/admin/agent/ConfirmationCard.tsx`

**Step 1: Create ToolExecutionCard**

```typescript
// components/admin/agent/ToolExecutionCard.tsx
"use client";

import { useState } from "react";
import { Terminal, Database, Globe, Phone, BarChart3, FileText, BookOpen, ChevronDown, ChevronRight, CheckCircle, XCircle, Loader2 } from "lucide-react";

const TOOL_ICONS: Record<string, typeof Terminal> = {
  run_command: Terminal,
  query_database: Database,
  mutate_database: Database,
  cloudflare_api: Globe,
  nimbata_api: Phone,
  google_ads_script: BarChart3,
  read_file: FileText,
  load_skill: BookOpen,
};

const TOOL_LABELS: Record<string, string> = {
  run_command: "Bash Command",
  query_database: "Database Query",
  mutate_database: "Database Write",
  cloudflare_api: "Cloudflare API",
  nimbata_api: "Nimbata API",
  google_ads_script: "Google Ads Script",
  read_file: "Read File",
  load_skill: "Load Skill",
};

interface ToolExecutionCardProps {
  id: string;
  name: string;
  input: Record<string, unknown>;
  output?: string;
  isError?: boolean;
  status: "running" | "success" | "error";
}

export default function ToolExecutionCard({ name, input, output, isError, status }: ToolExecutionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = TOOL_ICONS[name] || Terminal;
  const label = TOOL_LABELS[name] || name;

  const inputPreview = name === "run_command"
    ? (input.command as string)
    : name === "query_database" || name === "mutate_database"
    ? (input.query as string)?.slice(0, 80)
    : name === "read_file"
    ? (input.path as string)
    : name === "load_skill"
    ? `${input.action}${input.skill_name ? `: ${input.skill_name}` : ""}`
    : JSON.stringify(input).slice(0, 80);

  return (
    <div className="my-2 rounded-lg border border-white/6 bg-[#0D1117] overflow-hidden text-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors"
      >
        <Icon size={14} className="text-slate-400 shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        <code className="text-xs text-slate-300 truncate flex-1 text-left">{inputPreview}</code>
        {status === "running" && <Loader2 size={14} className="text-amber animate-spin shrink-0" />}
        {status === "success" && <CheckCircle size={14} className="text-emerald shrink-0" />}
        {status === "error" && <XCircle size={14} className="text-red-400 shrink-0" />}
        {expanded ? <ChevronDown size={14} className="text-slate-500 shrink-0" /> : <ChevronRight size={14} className="text-slate-500 shrink-0" />}
      </button>
      {expanded && output && (
        <div className="px-4 py-3 border-t border-white/6 bg-[#0A0F1A]">
          <pre className={`text-xs whitespace-pre-wrap break-words max-h-64 overflow-y-auto ${isError ? "text-red-400" : "text-slate-300"}`}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Create ConfirmationCard**

```typescript
// components/admin/agent/ConfirmationCard.tsx
"use client";

import { ShieldAlert } from "lucide-react";

interface PendingTool {
  id: string;
  name: string;
  input: Record<string, unknown>;
}

interface ConfirmationCardProps {
  tools: PendingTool[];
  onApprove: () => void;
  onDeny: () => void;
  loading?: boolean;
}

export default function ConfirmationCard({ tools, onApprove, onDeny, loading }: ConfirmationCardProps) {
  return (
    <div className="my-3 rounded-xl border border-amber/30 bg-amber/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <ShieldAlert size={18} className="text-amber" />
        <span className="text-sm font-semibold text-amber">Confirmation Required</span>
      </div>
      <p className="text-xs text-slate-400 mb-3">The following action(s) require your approval:</p>
      {tools.map((tool) => (
        <div key={tool.id} className="mb-2 rounded-lg bg-[#0D1117] border border-white/6 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{tool.name}</p>
          <pre className="text-xs text-slate-300 whitespace-pre-wrap break-words">
            {JSON.stringify(tool.input, null, 2)}
          </pre>
        </div>
      ))}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onApprove}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald text-slate-950 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {loading ? "Executing..." : "Approve"}
        </button>
        <button
          onClick={onDeny}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          Deny
        </button>
      </div>
    </div>
  );
}
```

---

## Task 6: Main AgentChat Component

**Files:**
- Create: `components/admin/agent/AgentChat.tsx`

**Step 1: Create the main chat component**

```typescript
// components/admin/agent/AgentChat.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, User, Send, Plus, Trash2, MessageSquare } from "lucide-react";
import ToolExecutionCard from "./ToolExecutionCard";
import ConfirmationCard from "./ConfirmationCard";

interface ToolExecution {
  id: string;
  name: string;
  input: Record<string, unknown>;
  output?: string;
  isError?: boolean;
  status: "running" | "success" | "error";
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  tools?: ToolExecution[];
  pendingConfirmation?: { tools: { id: string; name: string; input: Record<string, unknown> }[]; messages: unknown[] };
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

export default function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [rawMessages, setRawMessages] = useState<unknown[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // Load conversations on mount
  useEffect(() => {
    fetch("/api/admin/agent/conversations")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setConversations(data); })
      .catch(() => {});
  }, []);

  function loadConversation(conv: Conversation) {
    setActiveConvId(conv.id);
    // Fetch full conversation with messages
    fetch(`/api/admin/agent/conversations`)
      .then((r) => r.json())
      .then(() => {
        // Load from saved messages in conversation
        fetch("/api/admin/agent/conversations", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: conv.id }),
        })
          .then((r) => r.json())
          .then((full) => {
            if (full.messages && Array.isArray(full.messages)) {
              setRawMessages(full.messages);
              setMessages(parseRawMessages(full.messages));
            }
          });
      });
  }

  function parseRawMessages(raw: any[]): ChatMessage[] {
    const parsed: ChatMessage[] = [];
    for (const msg of raw) {
      if (msg.role === "user") {
        if (typeof msg.content === "string") {
          parsed.push({ role: "user", content: msg.content });
        }
        // Skip tool_result messages (they're shown in tool cards)
      } else if (msg.role === "assistant") {
        const textParts: string[] = [];
        const tools: ToolExecution[] = [];
        const blocks = Array.isArray(msg.content) ? msg.content : [{ type: "text", text: msg.content }];
        for (const block of blocks) {
          if (block.type === "text") textParts.push(block.text);
          if (block.type === "tool_use") {
            // Find corresponding result
            const nextMsg = raw[raw.indexOf(msg) + 1];
            const resultBlock = nextMsg?.role === "user" && Array.isArray(nextMsg.content)
              ? nextMsg.content.find((r: any) => r.tool_use_id === block.id)
              : undefined;
            tools.push({
              id: block.id,
              name: block.name,
              input: block.input,
              output: resultBlock?.content,
              isError: resultBlock?.is_error,
              status: resultBlock?.is_error ? "error" : "success",
            });
          }
        }
        parsed.push({ role: "assistant", content: textParts.join("\n"), tools: tools.length > 0 ? tools : undefined });
      }
    }
    return parsed;
  }

  function newChat() {
    setMessages([]);
    setRawMessages([]);
    setActiveConvId(null);
  }

  async function deleteConversation(id: string) {
    await fetch(`/api/admin/agent/conversations?id=${id}`, { method: "DELETE" });
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConvId === id) newChat();
  }

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to display
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Build API messages
    const apiMessages = [...rawMessages, { role: "user", content: userMessage }];

    await streamChat(apiMessages);
  }

  async function handleConfirmation(approved: boolean, pendingMessages: unknown[]) {
    setConfirmLoading(true);

    try {
      const res = await fetch("/api/admin/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: pendingMessages,
          conversationId: activeConvId,
          confirmAction: { approved },
        }),
      });

      // Remove pending confirmation from last message
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.pendingConfirmation) {
          updated[updated.length - 1] = { ...last, pendingConfirmation: undefined };
        }
        return updated;
      });

      await processSSE(res);
    } finally {
      setConfirmLoading(false);
    }
  }

  async function streamChat(apiMessages: unknown[]) {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          conversationId: activeConvId,
        }),
      });

      await processSSE(res);
    } finally {
      setLoading(false);
    }
  }

  async function processSSE(res: Response) {
    const reader = res.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let buffer = "";
    let assistantText = "";
    let currentTools: ToolExecution[] = [];

    // Add initial assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "", tools: [] }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      let eventType = "";
      for (const line of lines) {
        if (line.startsWith("event: ")) {
          eventType = line.slice(7).trim();
        } else if (line.startsWith("data: ") && eventType) {
          try {
            const data = JSON.parse(line.slice(6));
            switch (eventType) {
              case "text":
                assistantText += data.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], content: assistantText };
                  return updated;
                });
                break;

              case "tool_start":
                currentTools = [...currentTools, { id: data.id, name: data.name, input: data.input, status: "running" }];
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], tools: [...currentTools] };
                  return updated;
                });
                break;

              case "tool_result":
                currentTools = currentTools.map((t) =>
                  t.id === data.id ? { ...t, output: data.output, isError: data.isError, status: data.isError ? "error" : "success" } : t
                );
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], tools: [...currentTools] };
                  return updated;
                });
                break;

              case "confirmation_required":
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    pendingConfirmation: { tools: data.tools, messages: data.messages },
                  };
                  return updated;
                });
                break;

              case "done":
                if (data.conversationId) {
                  setActiveConvId(data.conversationId);
                  // Refresh conversation list
                  fetch("/api/admin/agent/conversations")
                    .then((r) => r.json())
                    .then((convs) => { if (Array.isArray(convs)) setConversations(convs); });
                }
                if (data.messages) {
                  setRawMessages(data.messages);
                }
                break;

              case "error":
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], content: `Error: ${data.message}` };
                  return updated;
                });
                break;
            }
          } catch {
            // Skip malformed JSON
          }
          eventType = "";
        }
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-0">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 shrink-0 border-r border-white/6 bg-[#0D1117] flex flex-col">
          <div className="p-3 border-b border-white/6">
            <button
              onClick={newChat}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/10 text-emerald text-xs font-semibold uppercase tracking-wider hover:bg-emerald/20 transition-colors"
            >
              <Plus size={14} /> New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  activeConvId === conv.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <MessageSquare size={14} className="shrink-0" />
                <button onClick={() => loadConversation(conv)} className="flex-1 text-left text-xs truncate">
                  {conv.title}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toggle sidebar button */}
        <div className="px-4 py-2 border-b border-white/6 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <MessageSquare size={16} />
          </button>
          <span className="text-sm font-display font-semibold text-white">AI Agent</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mb-4">
                <Bot size={28} className="text-emerald" />
              </div>
              <h2 className="font-display text-lg font-semibold text-white mb-2">Vanguard AI Agent</h2>
              <p className="text-sm text-slate-400 max-w-sm">
                Ask me to manage clients, run Google Ads reports, check Cloudflare settings,
                generate audit reports, or execute any server operation.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} className="text-emerald" />
                </div>
              )}
              <div className={`max-w-[75%] ${msg.role === "user" ? "order-first" : ""}`}>
                {msg.role === "user" ? (
                  <div className="px-4 py-2.5 rounded-2xl rounded-tr-md bg-emerald/10 text-sm text-white">
                    {msg.content}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {msg.tools?.map((tool) => (
                      <ToolExecutionCard key={tool.id} {...tool} />
                    ))}
                    {msg.content && (
                      <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    )}
                    {msg.pendingConfirmation && (
                      <ConfirmationCard
                        tools={msg.pendingConfirmation.tools}
                        onApprove={() => handleConfirmation(true, msg.pendingConfirmation!.messages)}
                        onDeny={() => handleConfirmation(false, msg.pendingConfirmation!.messages)}
                        loading={confirmLoading}
                      />
                    )}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User size={14} className="text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-emerald" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/6">
          <form onSubmit={sendMessage} className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the agent anything..."
              rows={1}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#111827] border border-white/6 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-emerald/50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald text-slate-950 hover:bg-emerald-400 transition-colors disabled:opacity-30 disabled:hover:bg-emerald"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

---

## Task 7: Agent Page — Wire Up Chat UI

**Files:**
- Rewrite: `app/admin/agent/page.tsx`

**Step 1: Replace the placeholder with the chat component**

```typescript
// app/admin/agent/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserPermissions } from "@/lib/agent/config";
import AgentChat from "@/components/admin/agent/AgentChat";

export const metadata = { title: "AI Agent" };

export default async function AgentPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const email = session.user.email?.toLowerCase() || "";
  const perms = getUserPermissions(email);

  if (!perms) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-sm text-slate-400">You don't have access to the AI Agent.</p>
        <p className="text-xs text-slate-600 mt-1">Contact admin to request access.</p>
      </div>
    );
  }

  return <AgentChat />;
}
```

---

## Task 8: Build and Deploy

**Step 1: Build**

```bash
cd /home/vanguardm/public_html
npm run build
```

Expected: Build succeeds with new agent routes and components.

**Step 2: Copy static assets**

```bash
cp -r /home/vanguardm/public_html/.next/static /home/vanguardm/public_html/.next/standalone/.next/
```

**Step 3: Restart PM2**

```bash
pm2 restart vanguardm
```

**Step 4: Clear nginx cache**

```bash
rm -rf /var/cache/ea-nginx/proxy/vanguardm/
systemctl restart nginx
```

**Step 5: Verify**

```bash
curl -sI https://vanguardm.com/admin/agent
```

Expected: 307 redirect to sign-in (auth working). After login as james@vanguardm.com, agent chat should render.

---

## Task 9: Add ANTHROPIC_API_KEY and End-to-End Test

**Step 1: Add API key to production env**

Add `ANTHROPIC_API_KEY` to `/home/vanguardm/env/production.env`

**Step 2: Restart PM2 to pick up new env**

```bash
pm2 restart vanguardm
```

**Step 3: Test from browser**

1. Navigate to https://vanguardm.com/admin/agent
2. Log in as james@vanguardm.com
3. Send: "How many active clients do we have?"
4. Expected: Agent uses query_database, returns count
5. Send: "List all Cloudflare zones"
6. Expected: Agent uses cloudflare_api, returns zone list
7. Send: "Delete the test client 'foo'" (if it exists)
8. Expected: Confirmation card appears, approve/deny works

---

## Implementation Order Summary

| Task | Description | Dependencies |
|------|-------------|-------------|
| 1 | Agent config module (permissions, tools, system prompt) | None |
| 2 | Tool executor module | Task 1 |
| 3 | Agentic chat API route | Tasks 1, 2 |
| 4 | Conversations API update (PATCH, DELETE) | None |
| 5 | UI components (ToolExecutionCard, ConfirmationCard) | None |
| 6 | Main AgentChat component | Tasks 4, 5 |
| 7 | Agent page update | Task 6 |
| 8 | Build and deploy | All above |
| 9 | API key + end-to-end test | Task 8 |
