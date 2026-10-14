import type { Metadata } from "next";

import CardGrid from "@/components/sections/CardGrid";
import CtaBanner from "@/components/sections/CtaBanner";
import PageHero from "@/components/sections/PageHero";
import WorkGallery from "@/components/sections/WorkGallery";
import {
  ceilingIntro,
  ceilingPrice,
  ceilingSteps,
  fairPrice,
} from "@/lib/content";

const title = "Натяжные потолки";
const description = `${ceilingPrice}. ${ceilingIntro}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/potolki" },
  openGraph: { url: "/potolki", title, description },
};

export default function CeilingsPage() {
  return (
    <>
      <PageHero
        variant="ceiling"
        image="/images/ceilings/2.webp"
        imageAlt="Натяжной потолок, наши работы"
        kicker="Натяжные потолки"
        title={title}
        lead={description}
        badges={[ceilingPrice, "Замер бесплатно", "Предоплата 50%"]}
        secondaryHref="/okna"
        secondaryLabel="Пластиковые окна"
      />

      <CardGrid
        tone="light"
        columns={3}
        title="Как устроен наш процесс"
        items={ceilingSteps.map(({ title: stepTitle, text }) => ({ title: stepTitle, text }))}
      />

      <WorkGallery />


      <CtaBanner title="Заказать монтаж потолка" text={fairPrice} buttonLabel="Заказать" />
    </>
  );
}
