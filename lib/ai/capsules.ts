import fs from "node:fs";
import path from "node:path";

const CAPSULE_DIR = path.join(process.cwd(), "docs", "capsules", "speedmedown");

let cached: string | null = null;

export function loadCapsuleBundle(): string {
  if (cached !== null) return cached;

  const files = fs
    .readdirSync(CAPSULE_DIR)
    .filter((f) => f.endsWith(".md") && f !== "INDEX.md")
    .sort();

  const sections = files.map((f) => {
    const body = fs.readFileSync(path.join(CAPSULE_DIR, f), "utf8");
    return `<!-- capsule: ${f} -->\n${body}`;
  });

  cached = sections.join("\n\n---\n\n");
  return cached;
}
