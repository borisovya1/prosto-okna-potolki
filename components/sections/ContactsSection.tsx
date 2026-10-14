import LeadForm from "@/components/ui/LeadForm";
import MapEmbed from "@/components/ui/MapEmbed";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { contactLead, fairPrice } from "@/lib/content";
import { site } from "@/lib/site";

const perks = ["Замер бесплатно", "Доставка бесплатная", fairPrice];

const chip = "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-tape-300";

export default function ContactsSection() {
  return (
    <section id="contacts" className="scroll-mt-24 bg-slate-900 py-20 text-white lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <SectionHeading tone="light" title="Свяжитесь с нами!" text={contactLead} />

          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <span className={chip}>
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span>
                <a href={site.phone.href} className="block text-xl font-extrabold transition hover:text-tape-300">
                  {site.phone.display}
                </a>
              </span>
            </li>

            <li className="flex gap-4">
              <span className={chip}>
                <MailIcon className="h-6 w-6" />
              </span>
              <span>
                <a href={site.email.href} className="block text-lg font-bold transition hover:text-tape-300">
                  {site.email.display}
                </a>
              </span>
            </li>

            <li className="flex gap-4">
              <span className={chip}>
                <PinIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-lg font-bold">{site.address.display}</span>
              </span>
            </li>
          </ul>

          <MapEmbed className="mt-8" />
        </Reveal>

        <Reveal delay={0.12} className="rounded-[2rem] bg-white p-7 text-slate-900 sm:p-9">
          <h3 className="text-2xl font-extrabold">Свяжитесь с нами!</h3>
          <p className="mt-2 text-sm text-slate-500">{contactLead}</p>

          <LeadForm source="contacts" withName buttonLabel="Отправить" className="mt-6" />

          <ul className="mt-7 grid gap-2.5 border-t border-slate-200 pt-6 text-sm text-slate-600">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 shrink-0 text-pane-600" strokeWidth={2.5} />
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
