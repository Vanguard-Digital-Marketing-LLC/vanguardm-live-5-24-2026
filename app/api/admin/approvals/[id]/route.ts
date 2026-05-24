import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature, withRateLimit } from "@/lib/api-middleware";
import { resubmitApprovalSchema } from "@/lib/validations/approvals";

// PATCH /api/admin/approvals/[id] — resubmit approval (reset to PENDING)
export const PATCH = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const authResult = await requireAdminFeature("approvals", "ADMIN");
  if (authResult.errorResponse) return authResult.errorResponse;
  const { agencyId } = authResult;

  const { id } = await context.params;

  const approval = await prisma.approval.findFirst({
    where: { id, agencyId },
    select: { id: true, status: true, deletedAt: true, clientId: true },
  });

  if (!approval || approval.deletedAt) {
    return NextResponse.json({ error: "Approval not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = resubmitApprovalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { description, fileUrls, comment } = parsed.data;

  // If status is PENDING, allow updating fields without creating a RESUBMITTED response
  // (used for attaching files after creation)
  if (approval.status === "PENDING") {
    const updated = await prisma.approval.update({
      where: { id },
      data: {
        ...(description ? { description } : {}),
        ...(fileUrls ? { fileUrls } : {}),
      },
    });
    return NextResponse.json(updated);
  }

  // For REVISION_REQUESTED or EXPIRED — resubmit workflow
  if (approval.status !== "REVISION_REQUESTED" && approval.status !== "EXPIRED") {
    return NextResponse.json(
      { error: "Only pending, revision-requested, or expired approvals can be updated" },
      { status: 400 }
    );
  }

  const updated = await prisma.$transaction(async (tx) => {
    const updatedApproval = await tx.approval.update({
      where: { id },
      data: {
        status: "PENDING",
        ...(description ? { description } : {}),
        ...(fileUrls ? { fileUrls } : {}),
      },
    });

    await tx.approvalResponse.create({
      data: {
        approvalId: id,
        userId: authResult.session.user.id,
        action: "RESUBMITTED",
        comment: comment || null,
        fileUrls: fileUrls || [],
      },
    });

    return updatedApproval;
  });

  return NextResponse.json(updated);
});

// DELETE /api/admin/approvals/[id] — soft-delete
export const DELETE = withRateLimit("admin", async (
  _req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const authResult = await requireAdminFeature("approvals", "ADMIN");
  if (authResult.errorResponse) return authResult.errorResponse;
  const { agencyId } = authResult;

  const { id } = await context.params;

  const approval = await prisma.approval.findFirst({
    where: { id, agencyId },
    select: { id: true, deletedAt: true },
  });

  if (!approval || approval.deletedAt) {
    return NextResponse.json({ error: "Approval not found" }, { status: 404 });
  }

  await prisma.approval.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json({ success: true });
});
