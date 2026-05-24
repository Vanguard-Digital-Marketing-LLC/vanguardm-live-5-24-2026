"use client";

import { FILE_CATEGORIES } from "@/lib/onboarding-steps";
import FileUploadZone from "../FileUploadZone";
import FileList, { type OnboardingFileData } from "../FileList";

interface FileUploadsStepProps {
  files: OnboardingFileData[];
  onUpload: (file: File, category: string) => Promise<void>;
  onDownload: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
}

export default function FileUploadsStep({
  files,
  onUpload,
  onDownload,
  onDelete,
}: FileUploadsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2 mb-4">
          File Uploads
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Upload any files we&apos;ll need to get started — logos, brand guides, ad assets, content,
          and account credentials. All files are stored securely.
        </p>
      </div>

      {FILE_CATEGORIES.map((cat) => (
        <div key={cat.key} className="space-y-3">
          <FileUploadZone
            category={cat.key}
            label={cat.label}
            description={cat.description}
            warning={"warning" in cat ? cat.warning : undefined}
            onUpload={onUpload}
          />
          <FileList
            files={files}
            category={cat.key}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
