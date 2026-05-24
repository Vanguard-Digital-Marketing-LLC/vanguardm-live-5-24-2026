import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Vanguard Marketing",
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0F1A] overflow-y-auto">
      {children}
    </div>
  );
}
