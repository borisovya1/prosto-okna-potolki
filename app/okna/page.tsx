import type { Metadata } from "next";

import CardGrid from "@/components/sections/CardGrid";
import Checklist from "@/components/sections/Checklist";
import CtaBanner from "@/components/sections/CtaBanner";
import PageHero from "@/components/sections/PageHero";
import { fairPrice, mosquitoNetsText, windowExtras, windowSteps } from "@/lib/content";

const title = "Изготовление и установка пластиковых окон";
const description = "Наши цены Вас приятно удивят!";

export const metadata: Metadata = {
  title,
  description: `${title}. ${description} Замер бесплатно, доставка бесплатная.`,
  alternates: { canonical: "/okna" },
  openGraph: { url: "/okna", title, description },
};

export default function WindowsPage() {
  return (
    <>
      <PageHero
        variant="glass"
        image="/images/windows-hero.jpg"
        imageAlt="Пластиковые окна"
        kicker="Пластиковые окна"
        title={title}
        lead={description}
        badges={["Замер бесплатно", "Доставка бесплатная", "Предоплата 70%"]}
        secondaryHref="/potolki"
        secondaryLabel="Натяжные потолки"
      />

      <CardGrid
        tone="light"
        columns={2}
        title="Как устроен наш процесс"
        items={windowSteps.map(({ title: stepTitle, text }) => ({ title: stepTitle, text }))}
      />

      <Checklist
        title="Также предлагаем вам следующие услуги"
        text={mosquitoNetsText}
        items={windowExtras}
        visualVariant="glass"
        visualAlt="Пластиковые окна"
        beforeSrc="/images/windows-before.jpg"
        afterSrc="/images/windows-after.jpg"
      />

      <CtaBanner title="Заказать замер" text={fairPrice} buttonLabel="Заказать замер" />
    </>
  );
}
