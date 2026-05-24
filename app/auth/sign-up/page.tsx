import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
import { resolveAgencyBranding } from "@/lib/resolve-agency-branding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your account.",
};

export default async function SignUpPage() {
  const agency = await resolveAgencyBranding();

  return (
    <main className="pt-24">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-sm text-slate-400 text-center mb-8">
            Join {agency.name} to track your progress and earn certificates.
          </p>
          <SignUpForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-teal hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
