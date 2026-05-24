import { NextRequest, NextResponse } from "next/server";
import { requireAdminFeature, withRateLimit } from "@/lib/api-middleware";
import { prisma } from "@/lib/db";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  MAX_FILES_PER_APPROVAL,
  sanitizeFilename,
  validateMagicBytes,
  uploadApprovalFile,
} from "@/lib/approval-storage";
import crypto from "crypto";

// POST /api/admin/clients/[id]/approvals/upload — upload files for an approval
export const POST = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const authResult = await requireAdminFeature("approvals", "ADMIN");
  if (authResult.errorResponse) return authResult.errorResponse;
  const { agencyId } = authResult;

  const { id: clientId } = await context.params;

  // Verify the client belongs to this agency
  const clientCheck = await prisma.client.findFirst({ where: { id: clientId, agencyId } });
  if (!clientCheck) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const formData = await req.formData();
  const approvalId = formData.get("approvalId") as string | null;
  const files = formData.getAll("files") as File[];

  if (!approvalId) {
    return NextResponse.json({ error: "approvalId is required" }, { status: 400 });
  }

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  if (files.length > MAX_FILES_PER_APPROVAL) {
    return NextResponse.json(
      { error: `Maximum ${MAX_FILES_PER_APPROVAL} files per upload` },
      { status: 400 }
    );
  }

  const uploaded: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      errors.push(`${file.name}: File type not allowed`);
      continue;
    }
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`${file.name}: Exceeds 10MB limit`);
      continue;
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic-byte validation
    if (!validateMagicBytes(buffer, file.type)) {
      errors.push(`${file.name}: File content does not match declared type`);
      continue;
    }

    const uid = crypto.randomUUID().slice(0, 8);
    const safeName = sanitizeFilename(file.name);
    const filename = `${uid}_${safeName}`;

    const { storagePath, error } = await uploadApprovalFile(
      clientId,
      approvalId,
      filename,
      buffer
    );

    if (error) {
      errors.push(`${file.name}: ${error}`);
    } else {
      uploaded.push(storagePath);
    }
  }

  return NextResponse.json({ uploaded, errors }, { status: errors.length > 0 && uploaded.length === 0 ? 400 : 200 });
});
