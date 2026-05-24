import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCourse } from "@/lib/academy-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const certificate = await prisma.certificate.findUnique({
    where: { certificateNumber: id },
    include: { user: { select: { name: true } } },
  });
  if (!certificate) return { title: "Certificate Not Found" };
  const course = getCourse(certificate.courseSlug);
  return {
    title: `Certificate: ${course?.title || certificate.courseSlug}`,
    description: `Certificate of completion awarded to ${certificate.user.name}`,
  };
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await prisma.certificate.findUnique({
    where: { certificateNumber: id },
    include: {
      user: { select: { name: true, email: true } },
      quizAttempt: { select: { score: true, totalQuestions: true } },
    },
  });

  if (!certificate) notFound();

  const course = getCourse(certificate.courseSlug);

  return (
    <main className="pt-24">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Certificate Card */}
          <div className="glass rounded-2xl p-8 md:p-12 text-center border border-emerald/20">
            <div className="text-4xl mb-4">{course?.icon || "🎓"}</div>

            <p className="font-display text-xs uppercase tracking-[0.3em] text-emerald mb-6">
              Certificate of Completion
            </p>

            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              {course?.title || certificate.courseSlug}
            </h1>

            <div className="border-t border-white/10 my-6 max-w-xs mx-auto" />

            <p className="text-sm text-slate-400 mb-1">Awarded to</p>
            <p className="font-display text-xl font-semibold text-white mb-6">
              {certificate.user.name || "Student"}
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
              <div className="glass rounded-lg p-3">
                <p className="text-xs text-slate-500">Quiz Score</p>
                <p className="font-display font-bold text-emerald">
                  {certificate.quizAttempt.score}/
                  {certificate.quizAttempt.totalQuestions}
                </p>
              </div>
              <div className="glass rounded-lg p-3">
                <p className="text-xs text-slate-500">Issued</p>
                <p className="font-display font-bold text-slate-200 text-sm">
                  {new Date(certificate.issuedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-slate-600 font-mono">
              Certificate #{certificate.certificateNumber}
            </p>

            <div className="border-t border-white/10 mt-6 pt-6">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-slate-500">
                Vanguard Digital Marketing Academy
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/academy"
              className="text-sm text-slate-400 hover:text-emerald transition-colors"
            >
              &larr; Back to Academy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
