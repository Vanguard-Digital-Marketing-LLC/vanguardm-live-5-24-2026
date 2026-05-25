/**
 * In-app allowlist for the agent's `bash` tool.
 *
 * SECURITY (H4): the bash tool can be reached via a PUBLIC contact-form ticket,
 * so a successful prompt injection could otherwise run arbitrary shell as the
 * site uid. The command string is ultimately executed by a REAL shell
 * (`cd <cwd> && <cmd>` via /usr/local/bin/agent-exec.sh), which lives outside
 * this repo and cannot be changed here.
 *
 * A validator that re-parses a string and hands it to a shell is only safe if
 * the accepted grammar is something the shell cannot reinterpret. So we reduce
 * the grammar to: plain space-separated words, joined ONLY by `&&`. Every shell
 * metacharacter that enables redirection (`> <`), substitution (`$()`, backtick),
 * backgrounding/lists (`& ; |`), globbing (`* ? []`), brace/tilde/var expansion
 * (`{} ~ $`), quoting (`' "`), escaping (`\`) or comments (`#`) is rejected
 * outright. With those gone, shell execution is deterministic and equivalent to
 * argv. On top of that we allowlist a small set of build/deploy binaries with
 * per-binary argument constraints and confine file access to the working dir.
 */

// Leading binaries the deploy workflow legitimately needs, plus harmless
// read-only inspection commands (harmless once metacharacters and absolute
// paths are blocked — they cannot write, redirect, or escape the cwd).
const ALLOWED_BINARIES = new Set([
  "cd", "npm", "npx", "pm2", "cp", "mkdir",
  "ls", "pwd", "cat", "head", "tail", "wc", "grep", "test", "echo", "true",
]);

// Only these subcommands may follow npm. `npm install <pkg>` runs arbitrary
// install lifecycle scripts, so a specific package argument is rejected below.
const NPM_SUBCOMMANDS = new Set(["run", "ci", "rebuild", "prune", "install", "i"]);

// `npx <pkg>` downloads and executes an arbitrary npm package; only the
// documented build tool is permitted.
const NPX_PACKAGES = new Set(["next"]);

// `cd` is the only command allowed to reference an absolute path (to enter the
// site root). Restrict those targets to plausible web roots so it cannot be
// used to `cd /` and then read system files via relative paths.
const CD_ABS_PREFIXES = ["/home/", "/var/www/", "/srv/", "/opt/"];

// Characters allowed inside a single command segment. This set contains NO shell
// metacharacters. The only multi-command operator allowed is `&&`, which is
// split out before this check runs.
const SAFE_SEGMENT = /^[A-Za-z0-9 ._/:=,@+-]+$/;

// Paths/files that must never be touched regardless of the leading binary.
const FORBIDDEN_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\/etc\b/, label: "access to /etc" },
  { re: /\/root\b/, label: "access to /root" },
  { re: /\/proc\b/, label: "access to /proc" },
  { re: /\/sys\b/, label: "access to /sys" },
  { re: /\.ssh\b/, label: "access to .ssh" },
  { re: /\.aws\b/, label: "access to .aws" },
  { re: /\.credentials\b/, label: "access to .credentials" },
  { re: /\.env(\b|\.)/, label: "access to .env file" },
  { re: /\.npmrc\b/, label: "access to .npmrc" },
  { re: /\.pgpass\b/, label: "access to .pgpass" },
  { re: /\.git\b/, label: "access to .git" },
  { re: /id_rsa/, label: "access to private key" },
  { re: /\.\.(\/|$)/, label: "parent-directory traversal" },
];

export function validateBashCommand(command: unknown): { ok: boolean; reason?: string } {
  if (typeof command !== "string" || !command.trim()) {
    return { ok: false, reason: "empty command" };
  }
  if (command.length > 2000) {
    return { ok: false, reason: "command too long" };
  }

  // Defense-in-depth: reject known-bad path/file patterns up front for a
  // specific error message (also covers relative `.env`, traversal, etc.).
  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (re.test(command)) {
      return { ok: false, reason: `disallowed: ${label}` };
    }
  }

  // Split on the ONLY permitted operator (&&). Any other control operator
  // (`; | &` etc.) survives inside a segment and is caught by SAFE_SEGMENT.
  const segments = command.split(/&&/).map((s) => s.trim()).filter(Boolean);
  if (segments.length === 0) {
    return { ok: false, reason: "empty command" };
  }

  for (const seg of segments) {
    if (!SAFE_SEGMENT.test(seg)) {
      return { ok: false, reason: "command contains a disallowed shell metacharacter" };
    }

    const tokens = seg.split(/\s+/).filter(Boolean);
    const lead = tokens[0] || "";

    // Reject leading env-var assignments (e.g. `LD_PRELOAD=/evil.so cmd`): the
    // shell applies them even though they are not the "binary".
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(lead)) {
      return { ok: false, reason: "environment-variable assignment is not allowed" };
    }

    const bin = lead.split("/").pop() || ""; // basename: /usr/bin/npm -> npm
    if (!ALLOWED_BINARIES.has(bin)) {
      return { ok: false, reason: `command '${bin || lead}' is not in the allowlist` };
    }

    const args = tokens.slice(1);
    const positional = args.filter((a) => !a.startsWith("-"));

    if (bin === "npm") {
      const sub = positional[0];
      if (!sub || !NPM_SUBCOMMANDS.has(sub)) {
        return { ok: false, reason: `npm subcommand '${sub ?? ""}' is not allowed` };
      }
      if ((sub === "install" || sub === "i") && positional.length > 1) {
        return { ok: false, reason: "installing a specific package is not allowed" };
      }
    } else if (bin === "npx") {
      const pkg = positional[0];
      if (!pkg || !NPX_PACKAGES.has(pkg)) {
        return { ok: false, reason: `npx package '${pkg ?? ""}' is not allowed` };
      }
    }

    // Absolute-path confinement. Only `cd` may use an absolute path, and only
    // into a known web root — this stops `cp /home/u/.env /var/www/leak` style
    // exfiltration and `cd / && cat etc/passwd` relative escapes.
    const absArg = positional.find((a) => a.startsWith("/"));
    if (bin === "cd") {
      if (absArg && !CD_ABS_PREFIXES.some((p) => absArg.startsWith(p))) {
        return { ok: false, reason: `cd target '${absArg}' is outside the allowed site roots` };
      }
    } else if (absArg) {
      return { ok: false, reason: `absolute path '${absArg}' is not allowed for '${bin}'` };
    }
  }

  return { ok: true };
}
