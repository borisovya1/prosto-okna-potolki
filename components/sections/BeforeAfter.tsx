import Link from "next/link";

import CompareSlider from "@/components/ui/CompareSlider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import { ArrowRightIcon } from "@/components/ui/icons";

const cases = [
  {
    href: "/okna",
    title: "Окна",
    before: "/images/windows-before.jpg",
    after: "/images/windows-after.jpg",
    variant: "glass",
  },
  {
    href: "/potolki",
    title: "Натяжные потолки",
    before: "/images/ceiling-before.jpg",
    after: "/images/ceiling-after.jpg",
    variant: "ceiling",
  },
] as const;

export default function BeforeAfter() {
  return (
    <section id="before-after" className="scroll-mt-24 bg-slate-900 py-20 text-white lg:py-28">
      <div className="container-page">
        <SectionHeading
          tone="light"
          title="До и после"
          text="Потяните ползунок, чтобы сравнить помещение до работ и после."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cases.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.1}>
              <CompareSlider
                className="aspect-[6/7] w-full rounded-[1.75rem] ring-1 ring-white/15"
                before={
                  <Visual src={item.before} alt={`До: ${item.title}`} variant="worn" className="h-full w-full" />
                }
                after={
                  <Visual src={item.after} alt={`После: ${item.title}`} variant={item.variant} className="h-full w-full" />
                }
              />
              <Link
                href={item.href}
                className="group mt-4 flex items-center justify-between gap-4 border-b border-white/15 pb-4 text-lg font-bold transition hover:text-tape-300"
              >
                {item.title}
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
