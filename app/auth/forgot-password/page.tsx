import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your account password.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="pt-24">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-sm text-slate-400 text-center mb-8">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <ForgotPasswordForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Remember your password?{" "}
            <Link href="/auth/sign-in" className="text-teal hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
