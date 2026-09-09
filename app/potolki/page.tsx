import type { Metadata } from "next";

import CardGrid from "@/components/sections/CardGrid";
import Checklist from "@/components/sections/Checklist";
import CtaBanner from "@/components/sections/CtaBanner";
import Faq from "@/components/sections/Faq";
import PageHero from "@/components/sections/PageHero";
import { CeilingIcon } from "@/components/ui/icons";
import {
  ceilingFaq,
  ceilingHighlights,
  ceilingIncludes,
  ceilingTypes,
} from "@/lib/content";
import { site } from "@/lib/site";

const title = `Натяжные потолки в ${site.regionShort}`;
const description =
  "Монтаж натяжных потолков под ключ: матовые, глянцевые и сатиновые полотна, многоуровневые конструкции, встроенное освещение. Бесплатный выезд замерщика.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/potolki" },
  openGraph: { url: "/potolki", title: `${title} | ${site.name}`, description },
};

export default function CeilingsPage() {
  return (
    <>
      <PageHero
        variant="ceiling"
        image="/images/ceiling-hero.jpg"
        imageAlt="Гостиная с натяжным потолком и подсветкой"
        kicker="Натяжные потолки"
        title="Натяжные потолки под ключ"
        lead="Матовые, глянцевые и сатиновые полотна. Монтаж одной комнаты — за несколько часов, без пыли и грязи от штукатурки."
        badges={["Бесплатный замер", "Монтаж за один день", "Гарантия на монтаж"]}
        secondaryHref="/okna"
        secondaryLabel="Смотреть окна"
      />

      <CardGrid
        tone="light"
        columns={3}
        icon={CeilingIcon}
        title="Какие полотна устанавливаем"
        text="Подбираем фактуру под задачу: скрыть неровности, добавить света или обойтись без бликов."
        items={ceilingTypes}
      />

      <Checklist
        title="Что входит в монтаж"
        text="От замера до финишной заправки полотна — одна бригада и один визит на объект."
        items={ceilingIncludes}
        visualVariant="ceiling"
        visualAlt="Монтаж натяжного потолка"
        beforeSrc="/images/ceiling-before.jpg"
        afterSrc="/images/ceiling-hero.jpg"
      />

      <CardGrid
        tone="light"
        columns={3}
        title="Почему это удобно"
        text="Три причины, почему натяжной потолок чаще выбирают вместо штукатурки и покраски."
        items={ceilingHighlights}
      />

      <Faq items={ceilingFaq} title="Вопросы про натяжные потолки" tone="white" />

      <CtaBanner
        title="Готовы к замеру?"
        text="Приезжаем, замеряем потолок и называем точную цену — бесплатно и без обязательств."
        buttonLabel="Записаться на замер"
      />
    </>
  );
}
