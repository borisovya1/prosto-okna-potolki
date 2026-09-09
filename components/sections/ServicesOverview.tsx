import Link from "next/link";

import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { servicesOverview } from "@/lib/content";

export default function ServicesOverview() {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          title="Две услуги, один подрядчик"
          text="Устанавливаем окна и натягиваем потолки своими бригадами — от замера до сдачи объекта."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {servicesOverview.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="card group grid grid-rows-[12rem_1fr] overflow-hidden transition hover:-translate-y-1 hover:border-glass-300 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <Visual
                alt={service.title}
                variant={service.slug === "okna" ? "glass" : "ceiling"}
                className="h-full w-full"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.excerpt}</p>

                <ul className="mt-4 space-y-1.5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckIcon className="h-4 w-4 shrink-0 text-glass-500" strokeWidth={2.4} />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-glass-600">
                  Подробнее об услуге
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
