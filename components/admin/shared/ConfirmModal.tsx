"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
}: ConfirmModalProps) {
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
      <div className="fixed inset-0 flex items-center justify-center z-[61] p-4">
        <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message" className="bg-[#111827] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl">
          <h3 id="confirm-title" className="font-display text-lg font-semibold text-white">{title}</h3>
          <p id="confirm-message" className="text-sm text-slate-400 mt-2">{message}</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              aria-label="Cancel"
              className="px-4 py-2 text-sm rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              aria-label="Confirm"
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 ${
                danger
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-emerald text-white hover:bg-emerald-600"
              }`}
            >
              {loading ? "..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
