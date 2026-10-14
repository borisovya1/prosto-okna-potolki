"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExpandIcon,
} from "@/components/ui/icons";
import { ceilingWorks } from "@/lib/content";

const total = ceilingWorks.length;

// Лента повторена трижды: прокрутка всегда идёт по средней копии, а с крайних
// незаметно перескакивает обратно в середину — так слайдер бесконечный
const loopSlides = [0, 1, 2].flatMap((copy) =>
  ceilingWorks.map((photo, index) => ({ ...photo, index, copy })),
);

export default function WorkGallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [current, setCurrent] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const centre = () => {
      track.scrollLeft =
        (total + (Math.round(track.scrollLeft / slideStep(track)) % total)) *
        slideStep(track);
    };
    track.scrollLeft = total * slideStep(track);
    window.addEventListener("resize", centre);
    return () => window.removeEventListener("resize", centre);
  }, []);

  function recentre() {
    const track = trackRef.current;
    if (!track) return;

    const step = slideStep(track);
    const raw = Math.round(track.scrollLeft / step);
    if (raw < total || raw >= total * 2) {
      track.scrollLeft = (total + (((raw % total) + total) % total)) * step;
    }
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    const raw = Math.round(track.scrollLeft / slideStep(track));
    setCurrent(((raw % total) + total) % total);

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(recentre, 140);
  }

  function scrollBySlide(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * slideStep(track), behavior: "smooth" });
  }

  function scrollToSlide(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: (total + index) * slideStep(track),
      behavior: "smooth",
    });
  }

  return (
    <section
      id="works"
      className="scroll-mt-24 overflow-hidden bg-white py-20 lg:py-28"
    >
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading title="Наши работы" />

          <div className="hidden shrink-0 gap-2 sm:flex">
            <SliderButton
              label="Предыдущее фото"
              onClick={() => scrollBySlide(-1)}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </SliderButton>
            <SliderButton
              label="Следующее фото"
              onClick={() => scrollBySlide(1)}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </SliderButton>
          </div>
        </div>

        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-12 sm:scroll-px-0 sm:gap-4 sm:px-0"
        >
          {loopSlides.map((photo) => {
            const isClone = photo.copy !== 1;
            return (
              <li
                key={`${photo.copy}-${photo.src}`}
                aria-hidden={isClone || undefined}
                className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
              >
                <button
                  type="button"
                  tabIndex={isClone ? -1 : undefined}
                  onClick={() => setOpenIndex(photo.index)}
                  aria-label={`Открыть фото ${photo.index + 1} из ${total}`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pane-500"
                >
                  <Image
                    src={photo.src}
                    alt={isClone ? "" : photo.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur transition group-hover:scale-110">
                    <ExpandIcon className="h-5 w-5" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
          {ceilingWorks.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Перейти к фото ${index + 1}`}
              aria-current={index === current}
              className="grid h-6 place-items-center px-0.5"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-6 bg-tape-400"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox index={openIndex} onChange={setOpenIndex} />
    </section>
  );
}

/** Шаг ленты: расстояние между началами соседних карточек (ширина + отступ) */
function slideStep(track: HTMLElement) {
  const [first, second] = track.children as HTMLCollectionOf<HTMLElement>;
  if (!first || !second) return 1;
  return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
    >
      {children}
    </button>
  );
}

const swipeThreshold = 80;

function Lightbox({
  index,
  onChange,
}: {
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const [direction, setDirection] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const open = index !== null;

  const go = useCallback(
    (step: 1 | -1) => {
      if (index === null) return;
      setDirection(step);
      onChange((index + step + total) % total);
    },
    [index, onChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, go, onChange]);

  // Активная миниатюра всегда видна в ленте
  useEffect(() => {
    if (index === null) return;
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-4 py-4 text-white sm:px-6">
            <span className="text-sm font-semibold tabular-nums text-white/70">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Закрыть"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex-1 overflow-hidden"
            onClick={(event) => {
              if (event.target === event.currentTarget) onChange(null);
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ x: dir * 120, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({ x: dir * -120, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -swipeThreshold) go(1);
                  else if (info.offset.x > swipeThreshold) go(-1);
                }}
                className="absolute inset-0 mx-auto max-w-6xl cursor-grab px-4 active:cursor-grabbing sm:px-20"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={ceilingWorks[index].src}
                    alt={ceilingWorks[index].alt}
                    fill
                    sizes="100vw"
                    draggable={false}
                    className="pointer-events-none object-contain select-none"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute top-1/2 left-4 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:grid"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute top-1/2 right-4 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:grid"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          <div
            ref={thumbsRef}
            className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-4 sm:justify-center-safe sm:px-6"
          >
            {ceilingWorks.map((photo, thumbIndex) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => {
                  setDirection(thumbIndex > index ? 1 : -1);
                  onChange(thumbIndex);
                }}
                aria-label={`Фото ${thumbIndex + 1}`}
                aria-current={thumbIndex === index}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition sm:h-16 sm:w-16 ${
                  thumbIndex === index
                    ? "opacity-100 ring-2 ring-tape-400"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
