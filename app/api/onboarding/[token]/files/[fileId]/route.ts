import { NextRequest, NextResponse } from "next/server";
import { validateOnboardingToken } from "@/lib/onboarding-auth";
import { prisma } from "@/lib/db";
import { readFile } from "@/lib/storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string; fileId: string }> }
) {
  const { token, fileId } = await params;
  const onboarding = await validateOnboardingToken(token);
  if (!onboarding) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
  }

  const file = await prisma.onboardingFile.findFirst({
    where: { id: fileId, onboardingId: onboarding.id },
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
