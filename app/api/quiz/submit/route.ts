import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to save quiz results." },
      { status: 401 },
    );
  }

  const { courseSlug, score, totalQuestions, passed, answers } =
    await request.json();

  if (!courseSlug || score == null || !totalQuestions) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: session.user.id,
      courseSlug,
      score,
      totalQuestions,
      passed: !!passed,
      answers: answers ?? {},
    },
  });

  // Issue certificate on first passing attempt for this course
  let certificate = null;
  if (passed) {
    const existingCert = await prisma.certificate.findUnique({
      where: {
        userId_courseSlug: {
          userId: session.user.id,
          courseSlug,
        },
      },
    });

    if (!existingCert) {
      certificate = await prisma.certificate.create({
        data: {
          userId: session.user.id,
          courseSlug,
          quizAttemptId: attempt.id,
        },
      });
    } else {
      certificate = existingCert;
    }
  }

  return NextResponse.json({
    attemptId: attempt.id,
    certificate: certificate
      ? { id: certificate.id, number: certificate.certificateNumber }
      : null,
  });
}
