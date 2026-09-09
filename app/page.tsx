import type { Metadata } from "next";

import Advantages from "@/components/sections/Advantages";
import ContactsSection from "@/components/sections/ContactsSection";
import CtaBanner from "@/components/sections/CtaBanner";
import Faq from "@/components/sections/Faq";
import PageHero from "@/components/sections/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import ServicesOverview from "@/components/sections/ServicesOverview";
import JsonLd from "@/components/seo/JsonLd";
import { faq, heroBadges } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.tagline} в ${site.regionShort} | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${site.tagline} в ${site.regionShort} | ${site.name}`,
    description: site.description,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <PageHero
        variant="glass"
        image="/images/windows-hero.jpg"
        imageAlt="Тёплая гостиная с панорамными окнами"
        title={
          <>
            Окна и натяжные потолки под ключ
            <span className="mt-2 block text-xl font-semibold text-glass-300 sm:mt-3 sm:text-3xl lg:text-4xl">
              в {site.regionIn}
            </span>
          </>
        }
        lead="Замер, монтаж и отделка — своими бригадами, без посредников. Приезжаем, считаем стоимость и фиксируем её в договоре до начала работ."
        badges={heroBadges}
        secondaryHref="#services"
        secondaryLabel="Наши услуги"
      />

      <ServiceMarquee />

      <ServicesOverview />

      <Advantages />

      <ProcessSteps />

      <Faq items={faq} />

      <ContactsSection />

      <CtaBanner />
    </>
  );
}
