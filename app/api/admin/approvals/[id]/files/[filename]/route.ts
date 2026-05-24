import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature, withRateLimit } from "@/lib/api-middleware";
import { readApprovalFile, getContentDisposition, mimeFromFilename } from "@/lib/approval-storage";

// GET /api/admin/approvals/[id]/files/[filename] — serve file to admin
export const GET = withRateLimit("admin", async (
  _req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const authResult = await requireAdminFeature("approvals", "ADMIN");
  if (authResult.errorResponse) return authResult.errorResponse;
  const { agencyId } = authResult;

  const { id, filename } = await context.params;

  const approval = await prisma.approval.findFirst({
    where: { id, agencyId },
    select: { clientId: true, fileUrls: true, deletedAt: true },
  });

  if (!approval || approval.deletedAt) {
    return NextResponse.json({ error: "Approval not found" }, { status: 404 });
  }

  // Find matching file path in approval's fileUrls
  const matchingPath = approval.fileUrls.find((url) => url.endsWith(`/${filename}`));
  if (!matchingPath) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const result = await readApprovalFile(matchingPath);
  if (!result.exists) {
    return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
  }

  const mimeType = mimeFromFilename(filename);

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": getContentDisposition(filename, mimeType, false),
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-cache",
    },
  });
});
