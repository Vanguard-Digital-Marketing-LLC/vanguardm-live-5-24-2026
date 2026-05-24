import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { withRateLimit } from "@/lib/api-middleware";
import { readApprovalFile, getContentDisposition, mimeFromFilename } from "@/lib/approval-storage";

// GET /api/portal/approvals/[id]/files/[filename] — serve file to client (inline for preview)
export const GET = withRateLimit("portal", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT" || !session.user.clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, filename } = await context.params;

  const approval = await prisma.approval.findUnique({
    where: { id },
    select: {
      clientId: true,
      fileUrls: true,
      deletedAt: true,
      responses: { select: { fileUrls: true } },
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

  // Check both approval files and response files
  const allFileUrls = [
    ...approval.fileUrls,
    ...approval.responses.flatMap((r) => r.fileUrls),
  ];

  const matchingPath = allFileUrls.find((url) => url.endsWith(`/${filename}`));
  if (!matchingPath) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const result = await readApprovalFile(matchingPath);
  if (!result.exists) {
    return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
  }

  const mimeType = mimeFromFilename(filename);
  const url = new URL(req.url);
  const inline = url.searchParams.get("inline") === "true";

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": getContentDisposition(filename, mimeType, inline),
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-cache",
    },
  });
});
