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
        {/* Полотно потолка над окном: дуга и четыре стекла */}
        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
          <path
            d="M10 20Q32 8 54 20"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-glass-200"
          />
          <g className="fill-glass-400">
            <rect x="13" y="27" width="17.5" height="12" rx="2.5" />
            <rect x="33.5" y="27" width="17.5" height="12" rx="2.5" />
            <rect x="13" y="42" width="17.5" height="12" rx="2.5" />
            <rect x="33.5" y="42" width="17.5" height="12" rx="2.5" />
          </g>
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
