type CoverProps = {
  title: string;
  subtitle?: string;
  author?: string;
  category?: string;
  color?: string;
  icon?: string;
};

type Concept = "tech" | "security" | "corporate" | "blueprint" | "classic";

function resolveConcept(category?: string): Concept {
  const c = (category || "").toLowerCase();
  if (/security|cyber|safety|privacy/.test(c)) return "security";
  if (/leadership|management|business|executive/.test(c)) return "corporate";
  if (/project|engineering|planning|process/.test(c)) return "blueprint";
  if (/tech|\bai\b|artificial|digital|innovation|robot|software/.test(c)) return "tech";
  return "classic";
}

export default function BookCoverArt(props: CoverProps) {
  const concept = resolveConcept(props.category);

  if (concept === "tech") return <TechCover {...props} />;
  if (concept === "security") return <SecurityCover {...props} />;
  if (concept === "corporate") return <CorporateCover {...props} />;
  if (concept === "blueprint") return <BlueprintCover {...props} />;
  return <ClassicCover {...props} />;
}

/* ---------------------------------------------------------------------- *
 * Tech / AI / Digital — dark circuit-board jacket with a glowing scan line
 * ---------------------------------------------------------------------- */
function TechCover({ title, subtitle, author, category, icon }: CoverProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0f1c]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(56,189,248,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(56,189,248,0.2), transparent 40%)",
        }}
      />
      {/* Scan line */}
      <div className="absolute left-0 right-0 top-[38%] h-px bg-cyan-400/70 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      <div className="relative flex h-full flex-col justify-between p-5 text-cyan-50">
        <div className="flex items-start justify-between">
          {category && (
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-300/80">
              &lt;{category}/&gt;
            </span>
          )}
        </div>

        {icon && (
          <div className="mx-auto my-2 flex h-14 w-14 items-center justify-center bg-cyan-400/10 text-lg font-bold text-cyan-300 ring-1 ring-cyan-400/50 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]">
            {icon}
          </div>
        )}

        <div>
          <div className="mb-1.5 h-px w-10 bg-cyan-400/60" />
          <h4 className="font-mono text-base font-bold uppercase leading-tight tracking-tight text-white line-clamp-4">
            {title}
          </h4>
          {subtitle && (
            <p className="mt-1 font-mono text-[11px] text-cyan-200/70 line-clamp-2">
              {subtitle}
            </p>
          )}
          {author && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400/70">
              // {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Security / Cyber Safety — shield emblem on a deep guarded gradient
 * ---------------------------------------------------------------------- */
function SecurityCover({ title, subtitle, author, category, icon }: CoverProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#1a0e12] via-[#241016] to-[#0d0709]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(248,113,113,0.12) 0px, rgba(248,113,113,0.12) 1px, transparent 1px, transparent 10px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative flex h-full flex-col items-center justify-between p-5 text-center text-rose-50">
        {category && (
          <span className="rounded-sm border border-rose-400/40 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-rose-300/90">
            {category}
          </span>
        )}

        <div className="relative flex h-20 w-16 items-center justify-center bg-gradient-to-b from-rose-500/25 to-rose-900/25 ring-1 ring-rose-400/50 [clip-path:polygon(50%_0%,100%_15%,100%_58%,50%_100%,0%_58%,0%_15%)]">
          <span className="text-xl">{icon || "🛡"}</span>
        </div>

        <div>
          <h4 className="text-base font-black uppercase leading-tight tracking-wide text-white line-clamp-4">
            {title}
          </h4>
          {subtitle && (
            <p className="mt-1.5 text-[11px] text-rose-200/75 line-clamp-2">{subtitle}</p>
          )}
          <div className="mx-auto mt-3 h-px w-10 bg-rose-400/50" />
          {author && (
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-rose-300/70">
              {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Leadership / Business — boardroom crest with a formal serif title
 * ---------------------------------------------------------------------- */
function CorporateCover({ title, subtitle, author, category, icon }: CoverProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#1c2230] to-[#11151d]">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,110,0.9) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div className="absolute inset-x-4 top-4 h-px bg-amber-200/30" />
      <div className="absolute inset-x-4 bottom-4 h-px bg-amber-200/30" />

      <div className="relative flex h-full flex-col items-center justify-between p-6 text-center text-amber-50">
        {category && (
          <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-amber-200/70">
            {category}
          </span>
        )}

        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-amber-100 ring-1 ring-amber-200/50">
            <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-amber-200/40">
              {icon}
            </span>
          </div>
        )}

        <div>
          <h4 className="font-serif text-lg font-semibold leading-snug text-white line-clamp-4">
            {title}
          </h4>
          {subtitle && (
            <p className="mt-1.5 font-serif text-[11px] italic text-amber-100/70 line-clamp-2">
              {subtitle}
            </p>
          )}
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-4 bg-amber-200/50" />
            <span className="h-1 w-1 rotate-45 bg-amber-200/60" />
            <span className="h-px w-4 bg-amber-200/50" />
          </div>
          {author && (
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-amber-100/60">
              {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Project Management / Engineering — technical blueprint grid
 * ---------------------------------------------------------------------- */
function BlueprintCover({ title, subtitle, author, category, icon }: CoverProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f2a4a]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(191,219,254,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(191,219,254,0.15) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(191,219,254,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(191,219,254,0.25) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* Corner crop marks */}
      <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-blue-200/60" />
      <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-blue-200/60" />
      <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-blue-200/60" />
      <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-200/60" />

      <div className="relative flex h-full flex-col justify-between p-6 text-blue-50">
        <div className="flex items-center justify-between">
          {icon && (
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200/60 text-xs font-bold">
              {icon}
            </span>
          )}
          {category && (
            <span className="-rotate-3 rounded-sm border border-dashed border-blue-200/50 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-blue-100/85">
              {category}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-base font-extrabold uppercase leading-tight tracking-tight text-white line-clamp-4">
            {title}
          </h4>
          {subtitle && (
            <p className="mt-1 text-[11px] text-blue-100/75 line-clamp-2">{subtitle}</p>
          )}
          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-blue-200/50" />
            ))}
          </div>
          {author && (
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-blue-100/70">
              {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Classic — glossy 3D dust jacket (default / general topics)
 * ---------------------------------------------------------------------- */
function ClassicCover({ title, subtitle, author, category, color, icon }: CoverProps) {
  return (
    <div className="relative h-full w-full" style={{ perspective: "900px" }}>
      <div
        className={`relative h-full w-full ${color || "bg-blue-500"} overflow-hidden transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(-6deg)_scale(1.03)]`}
        style={{
          boxShadow:
            "0 18px 30px -12px rgba(0,0,0,0.55), 0 4px 10px -4px rgba(0,0,0,0.4), inset -10px 0 20px -12px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(0,0,0,0.35), transparent 45%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/45" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.28) 45%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 40px 10px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        />
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/45 to-transparent" />
        <div className="absolute inset-y-0 left-4 w-px bg-black/20" />
        <div
          className="absolute inset-y-1 right-0 w-2.5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, #f4ecd8 0px, #f4ecd8 1.5px, #d8cdb0 1.5px, #d8cdb0 2px)",
            boxShadow: "inset 2px 0 3px rgba(0,0,0,0.35)",
          }}
        />
        <div className="absolute inset-y-0 right-2.5 w-px bg-white/40" />

        <div className="relative flex h-full flex-col justify-between p-5 pr-6 text-white">
          <div>
            {category && (
              <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ring-1 ring-white/25">
                {category}
              </span>
            )}
            {icon && (
              <div
                className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-base font-bold backdrop-blur-sm ring-1 ring-white/25"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
              >
                {icon}
              </div>
            )}
          </div>

          <div>
            <h4
              className="text-lg font-extrabold uppercase leading-tight line-clamp-4"
              style={{
                textShadow: "0 1px 0 rgba(255,255,255,0.25), 0 2px 3px rgba(0,0,0,0.55)",
                letterSpacing: "0.01em",
              }}
            >
              {title}
            </h4>
            {subtitle && (
              <p className="mt-1 text-xs text-white/85 line-clamp-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                {subtitle}
              </p>
            )}
            <div className="mt-3 h-px w-8 bg-white/50" />
            {author && (
              <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-white/75">
                {author}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
