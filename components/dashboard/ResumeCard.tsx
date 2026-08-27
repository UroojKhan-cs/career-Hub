//  components/dashboard/ResumeCard.tsx

"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Download,
  Trash2,
  Upload,
} from "lucide-react";

type ResumeCardProps = {
  resume: string;
  onChange: (resume: string) => void;
};

export default function ResumeCard({
  resume,
  onChange,
}: ResumeCardProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setResumeFile(file);
    onChange(file.name);
  }

  function handleDownload() {
    if (!resumeFile) {
      alert("Please upload the resume again to download it.");
      return;
    }

    const url = URL.createObjectURL(resumeFile);

    const link = document.createElement("a");
    link.href = url;
    link.download = resumeFile.name;

    document.body.appendChild(link);
    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  }

  function handleRemove() {
    setResumeFile(null);
    onChange("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Resume
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your latest resume
        </p>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="hidden"
      />

      {resume ? (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
              <FileText className="h-6 w-6 text-red-500" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {resume}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PDF Document
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-indigo-600"
              aria-label="Download resume"
            >
              <Download className="h-5 w-5" />
            </button>

            {/* Remove */}
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-red-500"
              aria-label="Remove resume"
            >
              <Trash2 className="h-5 w-5" />
            </button>

          </div>

        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Upload className="h-4 w-4" />
          Upload Resume
        </button>
      )}

    </div>
  );
}