import Link from "next/link";
import type { ReactNode } from "react";

import CallbackButton from "@/components/ui/CallbackButton";
import Visual from "@/components/ui/Visual";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

type PageHeroProps = {
  variant?: "glass" | "ceiling";
  image?: string;
  imageAlt?: string;
  kicker?: string;
  title: ReactNode;
  lead: string;
  badges: readonly string[];
  primaryCta?: { label: string; href: string } | "callback";
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function PageHero({
  variant = "glass",
  image,
  imageAlt = "",
  kicker,
  title,
  lead,
  badges,
  primaryCta = "callback",
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 opacity-90">
        <Visual src={image} alt={imageAlt} variant={variant} className="h-full w-full" priority sizes="100vw" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(16,13,10,0.95) 0%, rgba(16,13,10,0.86) 40%, rgba(16,13,10,0.55) 100%)",
        }}
      />
      <div
        className="animate-drift absolute -top-24 -right-16 h-[26rem] w-[26rem] rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(214,154,58,0.55), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-10 py-16 sm:gap-14 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          {kicker ? (
            <span className="kicker border-white/15 bg-white/10 text-white">
              <span className="kicker-dot" />
              {kicker}
            </span>
          ) : null}

          <h1
            className={`${kicker ? "mt-5" : ""} text-[1.9rem] leading-[1.1] font-bold tracking-tight sm:text-5xl sm:leading-[1.05] lg:text-[3.4rem]`}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {primaryCta === "callback" ? (
              <CallbackButton className="btn btn-primary">
                Оставить заявку
                <ArrowRightIcon className="h-5 w-5" />
              </CallbackButton>
            ) : (
              <Link href={primaryCta.href} className="btn btn-primary">
                {primaryCta.label}
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            )}
            {secondaryHref ? (
              <Link href={secondaryHref} className="btn btn-ghost-light">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-8">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckIcon className="h-4 w-4 shrink-0 text-glass-300" strokeWidth={2.4} />
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
