"use client";

import { useEffect } from "react";
import { Download, X } from "lucide-react";

type ResumeViewerModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ResumeViewerModal({ open, onClose }: ResumeViewerModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex h-full w-[90%] flex-col bg-background shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-viewer-title"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4">
          <h2 id="resume-viewer-title" className="text-base font-semibold text-foreground">
            Resume
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <Download size={16} />
              Download
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume popup"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X size={22} />
            </button>
          </div>
        </div>
        <iframe
          src="/resume.pdf#view=FitH"
          title="Resume preview"
          className="min-h-0 flex-1 bg-white"
        />
      </div>
    </div>
  );
}
