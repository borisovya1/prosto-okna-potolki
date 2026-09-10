import LeadForm from "@/components/ui/LeadForm";
import MapEmbed from "@/components/ui/MapEmbed";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

const perks = ["Бесплатный замер", "Без спама и рассылок", "Расчёт стоимости по телефону"];

export default function ContactsSection() {
  return (
    <section id="contacts" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <SectionHeading
            title="Оставьте заявку"
            text="Расскажите о вашем окне или потолке — перезвоним в течение рабочего дня и рассчитаем стоимость."
          />

          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-glass-50 text-glass-600">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span>
                <a href={site.phone.href} className="block text-xl font-extrabold text-slate-900 transition hover:text-glass-600">
                  {site.phone.display}
                </a>
                <span className="text-sm text-slate-400">{site.phone.note}</span>
              </span>
            </li>

            <li className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-glass-50 text-glass-600">
                <MailIcon className="h-6 w-6" />
              </span>
              <span>
                <a href={site.email.href} className="block text-lg font-bold text-slate-900 transition hover:text-glass-600">
                  {site.email.display}
                </a>
                <span className="text-sm text-slate-400">{site.email.note}</span>
              </span>
            </li>

            <li className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-glass-50 text-glass-600">
                <PinIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-lg font-bold text-slate-900">{site.address.note}</span>
                <span className="text-sm text-slate-400">{site.address.display}</span>
              </span>
            </li>

            <li className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-glass-50 text-glass-600">
                <ClockIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-lg font-bold text-slate-900">Режим работы</span>
                <span className="text-sm text-slate-400">{site.workingHours}</span>
              </span>
            </li>
          </ul>

          <MapEmbed className="mt-8" />
        </Reveal>

        <Reveal delay={0.12} className="rounded-[2rem] bg-slate-900 p-7 text-white sm:p-9">
          <h3 className="text-2xl font-extrabold">Оставьте телефон</h3>
          <p className="mt-2 text-sm text-slate-300">Перезвоним в течение рабочего дня и уточним детали.</p>

          <LeadForm source="contacts" tone="dark" withName buttonLabel="Отправить заявку" className="mt-6" />

          <ul className="mt-7 grid gap-2.5 border-t border-white/10 pt-6 text-sm text-slate-300">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 shrink-0 text-glass-300" strokeWidth={2.5} />
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
