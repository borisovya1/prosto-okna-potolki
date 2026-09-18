import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import { ArrowRightIcon } from "@/components/ui/icons";
import { servicesOverview } from "@/lib/content";

export default function ServicesOverview() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          title="Две услуги, один подрядчик"
          text="Устанавливаем окна и натягиваем потолки своими бригадами — от замера до сдачи объекта."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {servicesOverview.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.1}>
              <Link
                href={`/${service.slug}`}
                className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-slate-900 lg:min-h-[32rem]"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Visual
                    src={service.slug === "okna" ? "/images/windows-hero.jpg" : "/images/ceiling-hero.jpg"}
                    alt={service.title}
                    variant={service.slug === "okna" ? "glass" : "ceiling"}
                    className="h-full w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,18,26,0.92) 0%, rgba(11,18,26,0.55) 45%, rgba(11,18,26,0) 75%)",
                  }}
                />

                <div className="relative p-6 text-white sm:p-8">
                  <h3 className="text-2xl font-bold sm:text-3xl">{service.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
                    {service.excerpt}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 border-b-2 border-tape-400 pb-1 text-sm font-bold">
                    Подробнее об услуге
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
