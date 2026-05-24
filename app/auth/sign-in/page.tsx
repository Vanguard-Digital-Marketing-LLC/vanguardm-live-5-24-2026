import type { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "./SignInForm";
import Link from "next/link";
import { resolveAgencyBranding } from "@/lib/resolve-agency-branding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default async function SignInPage() {
  const agency = await resolveAgencyBranding();

  return (
    <main className="pt-24">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
            Sign In
          </h1>
          <p className="text-sm text-slate-400 text-center mb-8">
            Welcome back to {agency.name}.
          </p>
          <Suspense fallback={<div className="animate-pulse h-48 rounded-lg bg-white/5" />}>
            <SignInForm />
          </Suspense>
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-teal hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
