import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { steps } from "@/lib/content";

export default function ProcessSteps() {
  return (
    <section id="steps" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          title="Как мы работаем"
          text="От заявки до сдачи объекта — пять понятных шагов, закреплённых в договоре."
        />

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-5 lg:gap-6">
          {/* Линейка: шаги стоят на её длинных делениях */}
          <span
            className="ruler-ticks pointer-events-none absolute inset-x-0 top-0 hidden h-6 border-t-2 border-slate-900 lg:block"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * 0.08}
              className="relative border-l-2 border-tape-400 pl-5 lg:border-l-0 lg:pt-10 lg:pl-0"
            >
              <span
                className="absolute top-0 left-0 hidden h-9 w-1 bg-tape-400 lg:block"
                aria-hidden="true"
              />
              <span className="block font-display text-4xl leading-none font-extrabold text-slate-900 lg:pl-4">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 lg:pl-4">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 lg:pl-4">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
