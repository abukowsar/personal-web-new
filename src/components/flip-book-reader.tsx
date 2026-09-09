"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Download, Loader2, X } from "lucide-react";

type FlipBookReaderProps = {
  pdfUrl: string;
  title?: string;
  onClose: () => void;
};

type FlipEvent = { data: number };

export default function FlipBookReader({ pdfUrl, title, onClose }: FlipBookReaderProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aspect, setAspect] = useState(1.29);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void } } | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;

    const renderPdf = async () => {
      setLoading(true);
      setError(null);
      setPages([]);

      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;

        if (cancelled) return;
        setProgress({ current: 0, total: pdf.numPages });

        const renderedPages: string[] = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1.3 });

          if (pageNumber === 1) {
            setAspect(viewport.height / viewport.width);
          }

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext("2d");

          if (context) {
            await page.render({ canvasContext: context, viewport, canvas }).promise;
            renderedPages.push(canvas.toDataURL("image/jpeg", 0.82));
          }

          if (!cancelled) {
            setProgress({ current: pageNumber, total: pdf.numPages });
          }
        }

        if (!cancelled) {
          setPages(renderedPages);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load this PDF");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const flipPrev = () => bookRef.current?.pageFlip().flipPrev();
  const flipNext = () => bookRef.current?.pageFlip().flipNext();

  const baseWidth = 320;
  const baseHeight = Math.round(baseWidth * aspect);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex h-full w-full flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flipbook-title"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-4">
          <h2 id="flipbook-title" className="truncate text-base font-semibold text-white">
            {title || "Book Preview"}
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              <Download size={16} />
              Download
            </a>
            <button
              onClick={onClose}
              aria-label="Close book preview"
              className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden p-4">
          {error ? (
            <p className="max-w-sm text-center text-sm text-white/80">{error}</p>
          ) : pages.length === 0 ? (
            <div className="flex flex-col items-center gap-3 text-white/70">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-sm">
                {progress.total > 0
                  ? `Preparing pages… ${progress.current}/${progress.total}`
                  : "Loading book…"}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={flipPrev}
                  aria-label="Previous page"
                  disabled={currentPage <= 0}
                  className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                <HTMLFlipBook
                  ref={bookRef}
                  width={baseWidth}
                  height={baseHeight}
                  size="stretch"
                  minWidth={240}
                  maxWidth={560}
                  minHeight={320}
                  maxHeight={760}
                  startPage={0}
                  drawShadow
                  flippingTime={550}
                  usePortrait
                  startZIndex={0}
                  autoSize
                  maxShadowOpacity={0.5}
                  showCover={false}
                  mobileScrollSupport={false}
                  clickEventForward
                  useMouseEvents
                  swipeDistance={30}
                  showPageCorners
                  disableFlipByClick={false}
                  className="shadow-2xl"
                  style={{}}
                  onFlip={(event: FlipEvent) => setCurrentPage(event.data)}
                >
                  {pages.map((src, index) => (
                    <div key={index} className="flex h-full w-full items-center justify-center bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Page ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </HTMLFlipBook>

                <button
                  onClick={flipNext}
                  aria-label="Next page"
                  disabled={currentPage >= pages.length - 1}
                  className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <p className="text-xs text-white/60">
                Page {currentPage + 1} of {pages.length}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
