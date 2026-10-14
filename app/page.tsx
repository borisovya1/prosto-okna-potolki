import type { Metadata } from "next";

import BeforeAfter from "@/components/sections/BeforeAfter";
import ContactsSection from "@/components/sections/ContactsSection";
import PageHero from "@/components/sections/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WorkGallery from "@/components/sections/WorkGallery";
import LeadForm from "@/components/ui/LeadForm";
import { contactLead, heroBadges } from "@/lib/content";
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
        title={
          <>
            «Просто окна,
            <span className="mt-2 block">натяжные потолки»</span>
          </>
        }
        lead={contactLead}
        badges={heroBadges}
        form={<LeadForm source="hero" buttonLabel="Отправить" />}
      />

      <ServicesOverview />

      <WorkGallery />


      <BeforeAfter />

      <ProcessSteps />

      <ContactsSection />
    </>
  );
}
