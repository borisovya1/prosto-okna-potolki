import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker?: ReactNode;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  kicker,
  title,
  text,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""} ${className}`}>
      {kicker ? (
        <span
          className={`kicker ${
            tone === "light" ? "border-white/15 bg-white/10 text-white" : ""
          }`}
        >
          <span className="kicker-dot" />
          {kicker}
        </span>
      ) : null}
      <h2
        className={`${kicker ? "mt-4" : ""} text-[1.65rem] leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1] ${
          tone === "light" ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            tone === "light" ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
