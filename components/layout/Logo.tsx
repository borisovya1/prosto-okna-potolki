import Link from "next/link";

import { site } from "@/lib/site";

export default function Logo({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={site.name}>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 ${
          isLight ? "bg-white/10 text-glass-300" : "bg-slate-900 text-glass-300"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 3.5v17M3.5 12h17" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`truncate text-sm font-extrabold tracking-tight sm:text-base ${
            isLight ? "text-white" : "text-slate-900"
          }`}
        >
          {site.shortName}
        </span>
        <span
          className={`truncate text-[11px] font-medium tracking-wide ${
            compact ? "hidden sm:block" : ""
          } ${isLight ? "text-slate-300" : "text-slate-500"}`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
