import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { uploadFile } from "@/lib/storage";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, FILE_CATEGORIES } from "@/lib/onboarding-steps";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify onboarding belongs to agency
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  const files = await prisma.onboardingFile.findMany({
    where: { onboardingId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(files);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify onboarding belongs to agency
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const category = formData.get("category") as string | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!category || !FILE_CATEGORIES.some((c) => c.key === category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File exceeds 25MB limit" }, { status: 400 });
  }

  // Sanitize filename: UUID prefix + cleaned name
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uid = crypto.randomUUID().slice(0, 8);
  const storagePath = `${id}/${category}/${uid}_${cleanName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await uploadFile(storagePath, buffer, file.type);
  if (error) return NextResponse.json({ error: `Upload failed: ${error}` }, { status: 500 });

  const fileRecord = await prisma.onboardingFile.create({
    data: {
      onboardingId: id,
      category,
      fileName: file.name,
      storagePath,
      mimeType: file.type,
      fileSize: file.size,
      uploadedBy: session.user.name || session.user.email || "admin",
    },
  });

  return NextResponse.json(fileRecord, { status: 201 });
}
