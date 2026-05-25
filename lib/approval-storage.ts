import { promises as fs } from "fs";
import path from "path";

const STORAGE_ROOT = "/home/vanguardm/storage/approvals";

/** Magic bytes for allowed file types */
const MAGIC_BYTES: Record<string, { offset: number; bytes: number[] }[]> = {
  "application/pdf": [{ offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] }],
  "image/png": [{ offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] }],
  "image/jpeg": [{ offset: 0, bytes: [0xff, 0xd8, 0xff] }],
  "image/webp": [
    { offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
    { offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] },
  ],
};

export const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES_PER_APPROVAL = 5;

/** Sanitize filename — allow only safe characters */
export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
}

/** Validate file magic bytes match the claimed MIME type */
export function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures = MAGIC_BYTES[mimeType];
  if (!signatures) return true; // No magic bytes check for DOCX (it's a ZIP)
  return signatures.every(({ offset, bytes }) =>
    bytes.every((b, i) => buffer[offset + i] === b)
  );
}

function resolvePath(storagePath: string): string {
  const resolved = path.resolve(STORAGE_ROOT, storagePath);
  // Boundary-aware check: a bare startsWith would also accept a sibling dir
  // like `${STORAGE_ROOT}-evil`.
  if (resolved !== STORAGE_ROOT && !resolved.startsWith(STORAGE_ROOT + path.sep)) {
    throw new Error("Invalid storage path");
  }
  return resolved;
}

/** Upload a file to approval storage */
export async function uploadApprovalFile(
  clientId: string,
  approvalId: string,
  filename: string,
  buffer: Buffer
): Promise<{ storagePath: string; error: string | null }> {
  const storagePath = `${clientId}/${approvalId}/${filename}`;
  try {
    const fullPath = resolvePath(storagePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, buffer);
    return { storagePath, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    console.error("Approval upload error:", msg);
    return { storagePath, error: msg };
  }
}

/** Read a file from approval storage */
export async function readApprovalFile(
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

/** Get content-disposition based on MIME type (inline for images/PDF, attachment for others) */
export function getContentDisposition(
  filename: string,
  mimeType: string,
  inline: boolean
): string {
  const safeName = sanitizeFilename(filename);
  const disposition = inline && (mimeType.startsWith("image/") || mimeType === "application/pdf")
    ? "inline"
    : "attachment";
  return `${disposition}; filename="${safeName}"`;
}

/** Detect MIME type from file extension */
export function mimeFromFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const map: Record<string, string> = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return map[ext] || "application/octet-stream";
}
