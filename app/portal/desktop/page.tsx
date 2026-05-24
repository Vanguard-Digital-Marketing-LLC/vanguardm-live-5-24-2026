import type { Metadata } from "next";
import DesktopShell from "@/components/portal/desktop/DesktopShell";
import InstallButton from "@/components/portal/desktop/InstallButton";

export const metadata: Metadata = {
  title: "Desktop (preview)",
  manifest: "/portal-desktop/manifest.webmanifest",
  themeColor: "#0A0F1A",
};

export default function DesktopPage() {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-white">Desktop preview</h1>
        <div className="flex items-center gap-3">
          <InstallButton />
          <span className="text-xs text-slate-500">prototype</span>
        </div>
      </div>
      <DesktopShell />
    </div>
  );
}
