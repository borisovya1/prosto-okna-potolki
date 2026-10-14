import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ceilingSteps, windowSteps } from "@/lib/content";

const groups = [
  { title: "Изготовление и установка пластиковых окон", steps: windowSteps },
  { title: "Натяжные потолки", steps: ceilingSteps },
];

export default function ProcessSteps() {
  return (
    <section id="steps" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading title="Как устроен наш процесс" />

        <div className="mt-14 space-y-16">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl font-bold text-slate-900">{group.title}</h3>
              <ol
                className={`relative mt-8 grid gap-8 ${
                  group.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                }`}
              >
                {group.steps.map((step, index) => (
                  <Reveal
                    key={step.title}
                    as="li"
                    delay={index * 0.08}
                    className="relative border-l-2 border-tape-400 pl-5"
                  >
                    <span className="block font-display text-4xl leading-none font-extrabold text-slate-900">
                      {step.number}
                    </span>
                    <h4 className="mt-3 text-lg font-bold text-slate-900">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
