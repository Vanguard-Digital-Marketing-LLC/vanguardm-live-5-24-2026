"use client";

import { Download, Trash2, FileText, Image, FileSpreadsheet, Archive } from "lucide-react";

export interface OnboardingFileData {
  id: string;
  category: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
}

interface FileListProps {
  files: OnboardingFileData[];
  onDownload: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
  category?: string;
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return Image;
  if (mimeType.includes("spreadsheet") || mimeType.includes("csv") || mimeType.includes("excel")) return FileSpreadsheet;
  if (mimeType.includes("zip")) return Archive;
  return FileText;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileList({ files, onDownload, onDelete, category }: FileListProps) {
  const filtered = category ? files.filter((f) => f.category === category) : files;

  if (!filtered.length) return null;

  return (
    <div className="space-y-1.5">
      {filtered.map((file) => {
        const Icon = getFileIcon(file.mimeType);
        return (
          <div
            key={file.id}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 group"
          >
            <Icon size={16} className="text-slate-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{file.fileName}</p>
              <p className="text-xs text-slate-500">{formatSize(file.fileSize)}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onDownload(file.id)}
                className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Download"
              >
                <Download size={14} />
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(file.id)}
                  className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
