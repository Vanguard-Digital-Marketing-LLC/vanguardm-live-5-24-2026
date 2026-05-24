import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { readFile, deleteFile } from "@/lib/storage";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; fileId: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id, fileId } = await params;

  // Verify onboarding belongs to agency, then find file
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  const file = await prisma.onboardingFile.findFirst({
    where: { id: fileId, onboardingId: id },
  });

  if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

  const result = await readFile(file.storagePath);
  if (!result.exists) return NextResponse.json({ error: "File not found on disk" }, { status: 404 });

  return new Response(new Uint8Array(result.buffer), {
    headers: {
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(file.fileName)}"`,
      "Content-Length": String(result.buffer.length),
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; fileId: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id, fileId } = await params;

  // Verify onboarding belongs to agency, then find file
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  const file = await prisma.onboardingFile.findFirst({
    where: { id: fileId, onboardingId: id },
  });

  if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

  await deleteFile(file.storagePath);
  await prisma.onboardingFile.delete({ where: { id: fileId } });

  return NextResponse.json({ success: true });
}
