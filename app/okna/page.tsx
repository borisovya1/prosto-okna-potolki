import type { Metadata } from "next";

import CardGrid from "@/components/sections/CardGrid";
import Checklist from "@/components/sections/Checklist";
import CtaBanner from "@/components/sections/CtaBanner";
import Faq from "@/components/sections/Faq";
import PageHero from "@/components/sections/PageHero";
import { WindowIcon } from "@/components/ui/icons";
import {
  windowFaq,
  windowHighlights,
  windowIncludes,
  windowTypes,
} from "@/lib/content";
import { site } from "@/lib/site";

const title = `Пластиковые окна в ${site.regionShort}`;
const description =
  "Установка пластиковых окон под ключ: замер, демонтаж старых рам, монтаж по технологии, отделка откосов. Бесплатный выезд замерщика.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/okna" },
  openGraph: { url: "/okna", title: `${title} | ${site.name}`, description },
};

export default function WindowsPage() {
  return (
    <>
      <PageHero
        variant="glass"
        image="/images/windows-hero.jpg"
        imageAlt="Тёплая гостиная с панорамными окнами"
        kicker="Окна"
        title="Пластиковые окна под ключ"
        lead="От замера до отделки откосов. Балконы, лоджии и панорамное остекление — своими монтажными бригадами."
        badges={["Бесплатный замер", "Демонтаж и вывоз мусора включены", "Гарантия на монтаж"]}
        secondaryHref="/potolki"
        secondaryLabel="Смотреть потолки"
      />

      <CardGrid
        tone="light"
        columns={3}
        icon={WindowIcon}
        title="Какие окна устанавливаем"
        text="Изготавливаем и монтируем окна под конкретный проём — от типового до нестандартного."
        items={windowTypes}
      />

      <Checklist
        title="Что входит в монтаж"
        text="Полный цикл работ одной бригадой — от демонтажа старого окна до готового проёма."
        items={windowIncludes}
        visualVariant="glass"
        visualAlt="Монтаж пластикового окна"
        beforeSrc="/images/windows-before.jpg"
        afterSrc="/images/windows-after.jpg"
      />

      <CardGrid
        tone="light"
        columns={3}
        title="Почему это важно"
        text="Три вещи, которые определяют, как окно поведёт себя через несколько лет."
        items={windowHighlights}
      />

      <Faq items={windowFaq} title="Вопросы про окна" tone="white" />

      <CtaBanner
        title="Готовы к замеру?"
        text="Приезжаем, замеряем проём и называем точную цену — бесплатно и без обязательств."
        buttonLabel="Записаться на замер"
      />
    </>
  );
}
