#!/usr/bin/env node
// Run ESLint only on files changed vs a base ref (default: origin/main).
//
// Used by the per-phase verification gate in the 2026-05-25 audit-fixes spec:
// the global `npm run lint` carries a pre-existing baseline (143 problems on
// main at e26ebc0) which would otherwise mask a per-phase regression signal.
// This script narrows lint to the diff so a phase fails only when IT
// introduces new lint issues.
//
// Env vars:
//   LINT_CHANGED_BASE    base ref to diff against (default: origin/main)
//   LINT_CHANGED_INCLUDE comma-list of glob extensions (default: ts,tsx,mjs,cjs,js,jsx)
//
// Exit codes:
//   0  no lintable changes, OR eslint passed on the changed set
//   1  eslint reported errors on the changed set
//   2  setup error (git not available, base ref missing, etc.)
import { execSync, spawnSync } from "node:child_process";
import process from "node:process";

const BASE_DEFAULT = "origin/main";
const EXTS = (process.env.LINT_CHANGED_INCLUDE || "ts,tsx,mjs,cjs,js,jsx")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const EXT_RE = new RegExp(`\\.(${EXTS.join("|")})$`);

function pickBase() {
  const requested = process.env.LINT_CHANGED_BASE || BASE_DEFAULT;
  try {
    execSync(`git rev-parse --verify ${requested}`, { stdio: "ignore" });
    return requested;
  } catch {
    // Fall back: try `main` (local), then HEAD~1 (single-commit fallback).
    for (const fallback of ["main", "HEAD~1"]) {
      try {
        execSync(`git rev-parse --verify ${fallback}`, { stdio: "ignore" });
        console.error(`[lint:changed] '${requested}' not found; using '${fallback}'.`);
        return fallback;
      } catch {}
    }
    console.error(`[lint:changed] No reachable base ref ('${requested}', main, HEAD~1).`);
    process.exit(2);
  }
}

const base = pickBase();

function gitLines(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" })
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  } catch (e) {
    console.error(`[lint:changed] '${cmd}' failed:`, e?.message);
    process.exit(2);
  }
}

// Union three sources:
//   1. committed since branching:  base...HEAD
//   2. uncommitted (staged + unstaged) vs HEAD
//   3. untracked (new files not yet `git add`-ed)
// Without #2 + #3 a phase running its gate mid-flight would silently skip
// every file that hasn't been committed yet.
const committed = gitLines(`git diff --name-only --diff-filter=ACMRT ${base}...HEAD`);
const uncommitted = gitLines(`git diff --name-only --diff-filter=ACMRT HEAD`);
const untracked = gitLines(`git ls-files --others --exclude-standard`);

const files = [...new Set([...committed, ...uncommitted, ...untracked])]
  .filter((f) => EXT_RE.test(f));

if (files.length === 0) {
  console.log(`[lint:changed] No lintable changes vs ${base} — exit 0.`);
  process.exit(0);
}

console.log(`[lint:changed] Linting ${files.length} changed file(s) vs ${base}:`);
for (const f of files) console.log("  " + f);
console.log("");

const r = spawnSync("npx", ["eslint", ...files], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
process.exit(r.status ?? 1);
