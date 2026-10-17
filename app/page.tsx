import type { Metadata } from "next";

import Advantages from "@/components/sections/Advantages";
// import BeforeAfter from "@/components/sections/BeforeAfter";
import ContactsSection from "@/components/sections/ContactsSection";
import CtaBanner from "@/components/sections/CtaBanner";
import Faq from "@/components/sections/Faq";
import PageHero from "@/components/sections/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WorkGallery from "@/components/sections/WorkGallery";
import LeadForm from "@/components/ui/LeadForm";
import { faqItems, heroBadges, heroLead } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.tagline },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: site.tagline,
    description: site.description,
  },
};

export default function HomePage() {
  return (
    <>
      <PageHero
        variant="glass"
        image="/images/windows-hero.jpg"
        imageAlt="Пластиковые окна"
        kicker={site.name}
        title={
          <>
            Пластиковые окна и натяжные потолки
            <span className="mt-2 block text-tape-300 lg:text-pane-600">в Шаховской</span>
          </>
        }
        lead={heroLead}
        badges={heroBadges}
        form={<LeadForm source="hero" buttonLabel="Записаться на бесплатный замер" />}
      />

      <ServicesOverview />

      <Advantages />

      <WorkGallery />

      <CtaBanner
        title="Посчитаем стоимость бесплатно"
        text="Мастер приедет на замер, всё измерит и назовёт точную цену."
      />

      {/* <BeforeAfter /> */}

      <ProcessSteps />

      <Faq items={faqItems} />

      <ContactsSection />
    </>
  );
}
