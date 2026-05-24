import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account.",
};

export default function ResetPasswordPage() {
  return (
    <main className="pt-24">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-slate-400 text-center mb-8">
            Enter your new password below.
          </p>
          <Suspense fallback={<div className="animate-pulse h-48 rounded-lg bg-white/5" />}>
            <ResetPasswordForm />
          </Suspense>
          <p className="text-center text-sm text-slate-500 mt-6">
            <Link href="/auth/sign-in" className="text-teal hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
