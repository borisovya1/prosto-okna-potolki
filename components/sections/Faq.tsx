"use client";

import { useState } from "react";

import CallbackButton from "@/components/ui/CallbackButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PlusIcon } from "@/components/ui/icons";

type FaqItem = { question: string; answer: string };

type FaqProps = {
  items: readonly FaqItem[];
  title?: string;
  text?: string;
  tone?: "light" | "white";
};

export default function Faq({
  items,
  title = "Частые вопросы",
  text = "Собрали то, о чём чаще всего спрашивают перед заявкой. Не нашли ответ — спросите напрямую.",
  tone = "light",
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={`scroll-mt-24 py-20 lg:py-28 ${tone === "white" ? "bg-white" : "bg-slate-50"}`}>
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading title={title} text={text} />
          <CallbackButton className="btn btn-primary mt-8">Бесплатный замер</CallbackButton>
        </Reveal>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={Math.min(index, 4) * 0.06} y={16}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-bold text-slate-900 sm:text-lg">{item.question}</span>
                  <span
                    className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                      isOpen ? "rotate-45 border-glass-500 bg-glass-500 text-white" : "border-slate-300 text-slate-600"
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>

                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pr-12 text-sm leading-relaxed text-slate-500 sm:text-base">{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
