import { promises as fs } from "fs";
import path from "path";

const STORAGE_ROOT = process.env.STORAGE_PATH || "/home/vanguardm/storage/onboarding-files";

function resolvePath(storagePath: string): string {
  const resolved = path.resolve(STORAGE_ROOT, storagePath);
  if (!resolved.startsWith(STORAGE_ROOT)) {
    throw new Error("Invalid storage path");
  }
  return resolved;
}

/** Upload a file buffer to local storage */
export async function uploadFile(
  storagePath: string,
  buffer: Buffer,
  _contentType: string
): Promise<{ error: string | null }> {
  try {
    const fullPath = resolvePath(storagePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, buffer);
    return { error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    console.error("Storage upload error:", msg);
    return { error: msg };
  }
}

/** Read a file from local storage */
export async function readFile(
  storagePath: string
): Promise<{ buffer: Buffer; exists: true } | { buffer: null; exists: false }> {
  try {
    const fullPath = resolvePath(storagePath);
    const buffer = await fs.readFile(fullPath);
    return { buffer, exists: true };
  } catch {
    return { buffer: null, exists: false };
  }
}

/** Delete a file from local storage */
export async function deleteFile(storagePath: string): Promise<{ error: string | null }> {
  try {
    const fullPath = resolvePath(storagePath);
    await fs.unlink(fullPath);
    return { error: null };
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return { error: null }; // Already gone — not an error
    }
    const msg = err instanceof Error ? err.message : "Delete failed";
    console.error("Storage delete error:", msg);
    return { error: msg };
  }
}

/** Bulk delete files from local storage */
export async function deleteFiles(storagePaths: string[]): Promise<void> {
  await Promise.allSettled(storagePaths.map((p) => deleteFile(p)));
}
