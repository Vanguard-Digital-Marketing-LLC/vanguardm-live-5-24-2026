"use client";

import { useEffect, useState } from "react";
import { Download, Check } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/portal-desktop/sw.js", { scope: "/portal/" })
        .catch(() => {});
    }

    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    if (standalone) setInstalled(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
        <Check size={12} /> Installed
      </span>
    );
  }

  if (!deferred) {
    return (
      <span className="text-xs text-slate-500" title="Install via your browser menu (e.g. Chrome → Install Vanguard…)">
        Install via browser menu
      </span>
    );
  }

  return (
    <button
      onClick={async () => {
        await deferred.prompt();
        const { outcome } = await deferred.userChoice;
        if (outcome === "accepted") setInstalled(true);
        setDeferred(null);
      }}
      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-medium"
    >
      <Download size={12} />
      Install to desktop
    </button>
  );
}
