"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, AlertTriangle } from "lucide-react";

interface FileUploadZoneProps {
  category: string;
  label: string;
  description: string;
  warning?: string;
  onUpload: (file: File, category: string) => Promise<void>;
  disabled?: boolean;
}

export default function FileUploadZone({
  category,
  label,
  description,
  warning,
  onUpload,
  disabled,
}: FileUploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length || disabled) return;
      setError("");
      setUploading(true);
      try {
        for (const file of Array.from(files)) {
          await onUpload(file, category);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [category, onUpload, disabled]
  );

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-white">{label}</h4>
      <p className="text-xs text-slate-400">{description}</p>
      {warning && (
        <div className="flex items-start gap-2 p-2 rounded bg-amber-500/10 border border-amber-500/20">
          <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-300">{warning}</p>
        </div>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-emerald-400/50 bg-emerald-500/5"
            : "border-white/10 hover:border-white/20 bg-white/[0.02]"
        } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : (
          <>
            <Upload size={20} className="mx-auto text-slate-500 mb-2" />
            <p className="text-sm text-slate-400">
              Drop files here or <span className="text-emerald-400">browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">Max 25MB per file</p>
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
