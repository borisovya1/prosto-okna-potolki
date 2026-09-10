import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { advantages } from "@/lib/content";

const [featured, ...rest] = advantages;

export default function Advantages() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          title="Почему выбирают нас"
          text="Работаем как один подрядчик на оба вида отделки: одна заявка, одна бригада, одна гарантия."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-1 lg:row-span-2">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-slate-900 p-8 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-glass-300">
                <CheckIcon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-balance">{featured.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{featured.text}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {rest.map((entry, index) => (
              <Reveal key={entry.title} delay={0.08 * (index + 1)} className="card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-glass-50 text-glass-600">
                  <CheckIcon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{entry.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
