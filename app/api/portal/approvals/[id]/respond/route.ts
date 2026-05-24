import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { withRateLimit } from "@/lib/api-middleware";
import { sendEmail, escapeHtml } from "@/lib/email";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  MAX_FILES_PER_APPROVAL,
  sanitizeFilename,
  validateMagicBytes,
  uploadApprovalFile,
} from "@/lib/approval-storage";
import type { ApprovalAction, ApprovalReason } from "@/lib/generated/prisma/client";

// POST /api/portal/approvals/[id]/respond — approve or request revision
export const POST = withRateLimit("portal", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT" || !session.user.clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const approval = await prisma.approval.findUnique({
    where: { id },
    select: {
      id: true,
      clientId: true,
      title: true,
      status: true,
      deletedAt: true,
      createdById: true,
      createdBy: { select: { email: true, name: true } },
    },
  });

  if (!approval || approval.deletedAt) {
    return NextResponse.json({ error: "Approval not found" }, { status: 404 });
  }

  // IDOR check
  if (approval.clientId !== session.user.clientId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Verify client belongs to user's agency
  if (session.user.agencyId) {
    const clientCheck = await prisma.client.findFirst({
      where: { id: approval.clientId, agencyId: session.user.agencyId },
    });
    if (!clientCheck) return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  if (approval.status !== "PENDING") {
    return NextResponse.json(
      { error: "This approval has already been responded to" },
      { status: 400 }
    );
  }

  // Parse FormData (supports both JSON and multipart)
  let action: string;
  let reason: string | undefined;
  let comment: string | undefined;
  let files: File[] = [];

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    action = formData.get("action") as string;
    reason = (formData.get("reason") as string) || undefined;
    comment = (formData.get("comment") as string) || undefined;
    const fileEntries = formData.getAll("files");
    files = fileEntries.filter((f): f is File => f instanceof File && f.size > 0);
  } else {
    const body = await req.json();
    action = body.action;
    reason = body.reason;
    comment = body.comment;
  }

  // Validate action
  if (action !== "APPROVED" && action !== "REVISION_REQUESTED") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // Validate reason required for revision
  if (action === "REVISION_REQUESTED") {
    const validReasons = ["NEEDS_CHANGES", "WRONG_DIRECTION", "MISSING_INFO", "OTHER"];
    if (!reason || !validReasons.includes(reason)) {
      return NextResponse.json({ error: "Reason required when requesting revision" }, { status: 400 });
    }
    if (reason === "OTHER" && (!comment || comment.trim().length === 0)) {
      return NextResponse.json({ error: "Comment required when reason is OTHER" }, { status: 400 });
    }
  }

  if (comment && comment.length > 2000) {
    return NextResponse.json({ error: "Comment too long (max 2000 chars)" }, { status: 400 });
  }

  // Validate and upload files
  if (files.length > MAX_FILES_PER_APPROVAL) {
    return NextResponse.json({ error: `Maximum ${MAX_FILES_PER_APPROVAL} files allowed` }, { status: 400 });
  }

  const fileUrls: string[] = [];
  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: `File type not allowed: ${file.type}` }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File too large: ${file.name} (max 10MB)` }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!validateMagicBytes(buffer, file.type)) {
      return NextResponse.json({ error: `File content doesn't match type: ${file.name}` }, { status: 400 });
    }

    const safeName = sanitizeFilename(file.name);
    const timestamped = `${Date.now()}-${safeName}`;
    const result = await uploadApprovalFile(approval.clientId, id, timestamped, buffer);
    if (result.error) {
      return NextResponse.json({ error: `Upload failed: ${result.error}` }, { status: 500 });
    }
    fileUrls.push(result.storagePath);
  }

  // Create response + update approval status in a transaction
  const newStatus = action === "APPROVED" ? "APPROVED" : "REVISION_REQUESTED";

  const [response] = await prisma.$transaction([
    prisma.approvalResponse.create({
      data: {
        approvalId: id,
        userId: session.user.id,
        action: action as ApprovalAction,
        reason: (reason as ApprovalReason) || null,
        comment: comment || null,
        fileUrls,
      },
    }),
    prisma.approval.update({
      where: { id },
      data: { status: newStatus },
    }),
  ]);

  // Notify the admin who created the approval
  try {
    if (approval.createdBy.email) {
      const portalUrl = `${process.env.NEXTAUTH_URL || "https://vanguardm.com"}/admin/clients`;
      const statusLabel = action === "APPROVED" ? "Approved" : "Revision Requested";
      const statusColor = action === "APPROVED" ? "#0891b2" : "#f59e0b";

      await sendEmail({
        to: approval.createdBy.email,
        subject: `Approval ${statusLabel}: ${approval.title}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #0891b2; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Approval Response</h1>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Vanguard Digital Marketing</p>
            </div>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              ${escapeHtml(session.user.name || session.user.email || "A client")} responded to the approval:
            </p>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="font-size: 16px; font-weight: 600; color: #0a0f1a; margin: 0 0 8px 0;">${escapeHtml(approval.title)}</p>
              <p style="font-size: 14px; margin: 0;">
                Status: <span style="color: ${statusColor}; font-weight: 600;">${statusLabel}</span>
              </p>
              ${reason ? `<p style="font-size: 13px; color: #475569; margin: 8px 0 0 0;">Reason: ${escapeHtml(reason.replace(/_/g, " "))}</p>` : ""}
              ${comment ? `<p style="font-size: 13px; color: #475569; margin: 8px 0 0 0;">Comment: ${escapeHtml(comment)}</p>` : ""}
              ${fileUrls.length > 0 ? `<p style="font-size: 13px; color: #475569; margin: 8px 0 0 0;">${fileUrls.length} file(s) attached</p>` : ""}
            </div>
            <a href="${portalUrl}" style="display: inline-block; background: #0891b2; color: #fff; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
              View in Admin Panel
            </a>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error("Failed to send approval response notification:", err);
  }

  return NextResponse.json(response, { status: 201 });
});
