import type { ReactNode } from "react";

import CallbackButton from "@/components/ui/CallbackButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import { CheckIcon } from "@/components/ui/icons";

type ChecklistProps = {
  title: ReactNode;
  text?: ReactNode;
  items: readonly string[];
  visualVariant: "glass" | "ceiling";
  visualAlt: string;
};

export default function Checklist({ title, text, items, visualVariant, visualAlt }: ChecklistProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Visual
          alt={visualAlt}
          variant={visualVariant}
          className="aspect-4/5 w-full rounded-[2rem] border border-slate-200 lg:order-2"
        />

        <div className="lg:order-1">
          <SectionHeading title={title} text={text} />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {items.map((entry) => (
              <li key={entry} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-glass-50 text-glass-600">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.6} />
                </span>
                {entry}
              </li>
            ))}
          </ul>

          <CallbackButton className="btn btn-primary mt-9">Рассчитать стоимость</CallbackButton>
        </div>
      </div>
    </section>
  );
}
