import Link from "next/link";
import type { ReactNode } from "react";

import CallbackButton from "@/components/ui/CallbackButton";
import Reveal from "@/components/ui/Reveal";
import Visual from "@/components/ui/Visual";
import { ArrowRightIcon } from "@/components/ui/icons";

type PageHeroProps = {
  variant?: "glass" | "ceiling";
  image?: string;
  imageAlt?: string;
  kicker?: string;
  title: ReactNode;
  lead: string;
  badges: readonly string[];
  /** Форма заявки вместо кнопок — например, телефон и «Записаться на замер» */
  form?: ReactNode;
  primaryCta?: { label: string; href: string } | "callback";
  secondaryHref?: string;
  secondaryLabel?: string;
};

/** Размерная линия, как на чертеже: засечки по краям и подпись посередине */
function DimensionLine({ label, vertical = false }: { label: string; vertical?: boolean }) {
  const tick = vertical ? "h-px w-3 bg-slate-400" : "h-3 w-px bg-slate-400";
  const rule = vertical ? "w-px flex-1 bg-slate-300" : "h-px flex-1 bg-slate-300";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-2 text-xs font-semibold text-slate-500 ${
        vertical ? "h-full flex-col" : "w-full"
      }`}
    >
      <span className={tick} />
      <span className={rule} />
      <span className={`whitespace-nowrap ${vertical ? "[writing-mode:vertical-rl] rotate-180" : ""}`}>
        {label}
      </span>
      <span className={rule} />
      <span className={tick} />
    </div>
  );
}

export default function PageHero({
  variant = "glass",
  image,
  imageAlt = "",
  kicker,
  title,
  lead,
  badges,
  form,
  primaryCta = "callback",
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div
        className="absolute inset-y-0 right-0 hidden w-[46%] bg-pane-100 lg:block"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-12 pt-[7.75rem] pb-14 sm:pt-[10rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pt-[10.5rem] lg:pb-24">
        <Reveal y={16}>
          {kicker ? (
            <span className="kicker">
              <span className="kicker-dot" />
              {kicker}
            </span>
          ) : null}

          <h1
            className={`${kicker ? "mt-5" : ""} text-[2rem] leading-[1.08] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[3.35rem]`}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{lead}</p>

          {form ? (
            <div className="mt-8 max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
              {form}
            </div>
          ) : (
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
                <Link href={secondaryHref} className="btn btn-outline">
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          )}

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <span className="h-3.5 w-1 shrink-0 bg-tape-400" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative min-w-0 pt-8 sm:pl-9">
          <div className="absolute inset-x-0 top-0 sm:left-9">
            <DimensionLine label="замер — бесплатно" />
          </div>
          <div className="absolute top-8 bottom-0 left-0 hidden w-4 sm:block">
            <DimensionLine label="под ваш проём" vertical />
          </div>

          <div className="relative aspect-[5/6] sm:aspect-[4/4.6]">
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] border-[10px] border-white bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200">
              <Visual
                src={image}
                alt={imageAlt}
                variant={variant}
                className="h-full w-full"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {/* Переплёт: створки делят кадр на четыре стекла */}
              <span className="pointer-events-none absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-white" />
              <span className="pointer-events-none absolute inset-x-0 top-[42%] h-2.5 -translate-y-1/2 bg-white" />
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 38%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
