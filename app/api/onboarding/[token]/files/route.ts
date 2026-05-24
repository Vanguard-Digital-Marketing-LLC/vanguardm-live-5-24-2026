import { NextRequest, NextResponse } from "next/server";
import { validateOnboardingToken } from "@/lib/onboarding-auth";
import { rateLimitAsync } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, FILE_CATEGORIES } from "@/lib/onboarding-steps";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const onboarding = await validateOnboardingToken(token);
  if (!onboarding) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
  }

  const files = await prisma.onboardingFile.findMany({
    where: { onboardingId: onboarding.id },
    select: {
      id: true,
      category: true,
      fileName: true,
      mimeType: true,
      fileSize: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(files);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Rate limit: 20 uploads per 15 minutes per token
  const rl = await rateLimitAsync(`onboarding-upload:${token}`, 20, 15 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many uploads, please wait" }, { status: 429 });
  }

  const onboarding = await validateOnboardingToken(token);
  if (!onboarding) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
  }

  if (onboarding.status === "SUBMITTED") {
    return NextResponse.json({ error: "Already submitted" }, { status: 400 });
  }

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

  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uid = crypto.randomUUID().slice(0, 8);
  const storagePath = `${onboarding.id}/${category}/${uid}_${cleanName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await uploadFile(storagePath, buffer, file.type);
  if (error) return NextResponse.json({ error: `Upload failed: ${error}` }, { status: 500 });

  const fileRecord = await prisma.onboardingFile.create({
    data: {
      onboardingId: onboarding.id,
      category,
      fileName: file.name,
      storagePath,
      mimeType: file.type,
      fileSize: file.size,
      uploadedBy: onboarding.respondentName || "client",
    },
  });

  return NextResponse.json({
    id: fileRecord.id,
    category: fileRecord.category,
    fileName: fileRecord.fileName,
    mimeType: fileRecord.mimeType,
    fileSize: fileRecord.fileSize,
    createdAt: fileRecord.createdAt,
  }, { status: 201 });
}
