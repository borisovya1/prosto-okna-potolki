import type { ComponentType, ReactNode, SVGProps } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";

type CardItem = { title: string; text: string };

type CardGridProps = {
  id?: string;
  title: ReactNode;
  text?: ReactNode;
  items: readonly CardItem[];
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  columns?: 2 | 3;
  tone?: "light" | "white";
};

export default function CardGrid({
  id,
  title,
  text,
  items,
  icon: Icon = CheckIcon,
  columns = 3,
  tone = "light",
}: CardGridProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 lg:py-28 ${tone === "white" ? "bg-white" : "bg-slate-50"}`}>
      <div className="container-page">
        <SectionHeading title={title} text={text} />

        <div className={`mt-12 grid gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
          {items.map((entry) => (
            <div key={entry.title} className="card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-glass-50 text-glass-600">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
