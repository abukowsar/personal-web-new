"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import BookCoverArt from "@/components/book-cover-art";

type BookCoverPreviewProps = {
  title: string;
  subtitle?: string;
  author?: string;
  category?: string;
  color?: string;
  icon?: string;
  imageUrl?: string;
  onClose: () => void;
};

export default function BookCoverPreview({
  title,
  subtitle,
  author,
  category,
  color,
  icon,
  imageUrl,
  onClose,
}: BookCoverPreviewProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-sm"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} cover preview`}
      >
        <button
          onClick={onClose}
          aria-label="Close cover preview"
          className="absolute -top-12 right-0 z-10 text-white transition-colors hover:text-white/70"
        >
          <X size={32} />
        </button>

        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl shadow-2xl">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          ) : (
            <BookCoverArt
              title={title}
              subtitle={subtitle}
              author={author}
              category={category}
              color={color}
              icon={icon}
            />
          )}
        </div>

        <p className="mt-4 text-center text-sm text-white/70">
          Click outside or press ESC to close
        </p>
      </div>
    </div>
  );
}
