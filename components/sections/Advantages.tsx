import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { advantages } from "@/lib/content";

export default function Advantages() {
  return (
    <section id="about" className="scroll-mt-24 bg-slate-50 py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            title="Почему выбирают нас"
            text="Работаем как один подрядчик на оба вида отделки: одна заявка, одна бригада, одна гарантия."
          />
        </Reveal>

        <dl className="border-t-2 border-slate-900">
          {advantages.map((entry) => (
            <div
              key={entry.title}
              className="grid gap-2 border-b border-slate-200 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] sm:gap-8"
            >
              <dt className="flex items-start gap-3 font-display text-lg font-bold text-slate-900">
                <span className="mt-1.5 h-4 w-1 shrink-0 bg-tape-400" aria-hidden="true" />
                {entry.title}
              </dt>
              <dd className="text-sm leading-relaxed text-slate-600 sm:text-base">{entry.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
