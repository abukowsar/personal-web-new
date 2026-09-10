"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, type LucideIcon } from "lucide-react";

export type NavDropdownItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type NavDropdownProps = {
  label: string;
  eyebrow: string;
  heading: string;
  allLabel: string;
  allHref: string;
  items: NavDropdownItem[];
  columns?: 1 | 2;
  /** Horizontal anchor relative to the nav item's own button. "center" is for
   * wide panels that should stay centered under the label; "right" keeps the
   * panel's right edge flush with the button, for items near the nav's edge
   * where a centered panel would overflow the viewport. */
  align?: "center" | "right";
  /** Tailwind width class for the panel, e.g. "md:w-[640px]". */
  widthClassName?: string;
};

const CLOSE_DELAY_MS = 150;

export default function NavDropdown({
  label,
  eyebrow,
  heading,
  allLabel,
  allHref,
  items,
  columns = 2,
  align = "center",
  widthClassName = "md:w-[640px]",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const alignmentClassName =
    align === "right"
      ? "md:absolute md:right-0 md:top-full md:mt-2"
      : "md:absolute md:left-1/2 md:top-full md:mt-2 md:-translate-x-1/2";

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex items-center gap-1.5 font-bold text-foreground hover:text-accent transition-colors"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className={`${alignmentClassName} ${widthClassName} px-0 pt-4 md:pt-2`}>
          <div className="rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5">
                  {eyebrow}
                </p>
                <h3 className="text-xl font-bold text-foreground">{heading}</h3>
              </div>
              <a
                href={allHref}
                onClick={() => setOpen(false)}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                {allLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="border-t border-border mb-6" />

            <div
              className={
                columns === 2 ? "grid sm:grid-cols-2 gap-x-8 gap-y-6" : "space-y-5"
              }
            >
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={allHref}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
