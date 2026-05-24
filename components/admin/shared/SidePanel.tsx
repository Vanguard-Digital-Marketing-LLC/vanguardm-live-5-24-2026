"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SidePanel({ open, onClose, title, children }: SidePanelProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-labelledby="sidepanel-title" className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#0D1117] border-l border-white/6 z-[61] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/6">
          <h2 id="sidepanel-title" className="font-display text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} aria-label="Close panel" className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
}
