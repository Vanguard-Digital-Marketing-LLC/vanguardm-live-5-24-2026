/**
 * In-app allowlist for the agent's `bash` tool.
 *
 * SECURITY (H4): the bash tool can be reached via a PUBLIC contact-form ticket,
 * so a successful prompt injection could otherwise run arbitrary shell as the
 * site uid. The shell wrapper (/usr/local/bin/agent-exec.sh) lives outside this
 * repo and can't be verified here, so the allowlist below is the in-app security
 * boundary: only build/deploy-style commands are permitted, and shell features
 * that enable arbitrary execution or exfiltration are rejected outright.
 */

// Leading binaries the deploy workflow legitimately needs (see buildDeployInstructions).
const ALLOWED_BINARIES = new Set([
  // Build/deploy. Note: `node` is intentionally excluded — `node -e` is an
  // arbitrary-code vector; `npm`/`npx` cover the documented build steps.
  "cd", "npm", "npx", "pm2",
  "cp", "mkdir", "ls", "cat", "echo", "pwd", "true",
  "find", "grep", "head", "tail", "wc", "test",
]);

// Patterns that must never appear regardless of the leading binary.
const FORBIDDEN_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /`/, label: "backtick command substitution" },
  { re: /\$\(/, label: "$() command substitution" },
  { re: /\b(curl|wget|nc|ncat|netcat|telnet|ssh|scp|sftp|ftp|socat)\b/i, label: "network tool" },
  { re: /\b(bash|sh|zsh|ksh|dash|eval|exec|source)\b/i, label: "shell spawn / eval" },
  { re: /\b(base64|xxd|openssl|gpg)\b/i, label: "encoder/exfil tool" },
  { re: /\/etc\b/, label: "access to /etc" },
  { re: /\/root\b/, label: "access to /root" },
  { re: /\/proc\b/, label: "access to /proc" },
  { re: /\.ssh\b/, label: "access to .ssh" },
  { re: /\.credentials\b/, label: "access to .credentials" },
  { re: /\.aws\b/, label: "access to .aws" },
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

  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (re.test(command)) {
      return { ok: false, reason: `disallowed: ${label}` };
    }
  }

  // Split into segments on shell control operators and check each leading binary.
  const segments = command.split(/&&|\|\||;|\||\n/).map((s) => s.trim()).filter(Boolean);
  if (segments.length === 0) {
    return { ok: false, reason: "empty command" };
  }
  for (const seg of segments) {
    // Skip leading env assignments (FOO=bar cmd ...).
    const tokens = seg.split(/\s+/).filter((t) => !/^[A-Za-z_][A-Za-z0-9_]*=/.test(t));
    const lead = tokens[0] || "";
    const bin = lead.split("/").pop() || ""; // basename, e.g. /usr/bin/npm -> npm
    if (!ALLOWED_BINARIES.has(bin)) {
      return { ok: false, reason: `command '${bin || lead}' is not in the allowlist` };
    }
  }

  return { ok: true };
}
