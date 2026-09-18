"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "@/components/layout/Logo";
import { useModals } from "@/components/modals/modal-context";
import {
  CeilingIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  PhoneIcon,
  WindowIcon,
} from "@/components/ui/icons";
import { servicesOverview } from "@/lib/content";
import { navLinks, site } from "@/lib/site";

// «Окна» и «Натяжные потолки» живут в выпадающем меню «Услуги», остальные пункты — рядом с ним
const pageLinks = navLinks.filter((link) => link.href.startsWith("/#"));

const serviceIcons = { okna: WindowIcon, potolki: CeilingIcon } as const;

// На десктопе шапка ровно по ширине контента (.container-page: 78rem, отступы 2.5rem → 73rem)
const insetX = "mx-3 sm:mx-6 lg:mx-10 xl:mx-auto xl:w-[min(calc(100%-5rem),73rem)]";

export default function Header() {
  const { openCallback } = useModals();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const mobileBackdrop = (
    <AnimatePresence initial={false}>
      {mobileOpen ? (
        <motion.div
          key="mobile-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-slate-950/50 xl:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
  );

  const mobileMenu = (
    <AnimatePresence initial={false}>
      {mobileOpen ? (
        <motion.div
          key="mobile-dropdown"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className={`absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-2xl border-x border-b border-slate-200 bg-slate-50/95 shadow-lg shadow-slate-900/10 backdrop-blur-md xl:hidden ${insetX}`}
        >
          <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain px-4 py-4">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
              className="flex w-full items-center justify-between py-3 text-lg font-bold text-slate-900"
            >
              Услуги
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileServicesOpen ? (
              <ul onClick={closeMobile} className="mb-2 space-y-1 border-l border-slate-200 pl-4">
                {servicesOverview.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/${service.slug}`}
                      className="block py-2 text-[15px] font-semibold text-slate-700"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <nav onClick={closeMobile} className="divide-y divide-slate-200 border-t border-slate-200">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3.5 text-lg font-bold text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-2 border-t border-slate-200 pt-4">
              <a href={site.phone.href} className="block text-xl font-extrabold text-slate-900">
                {site.phone.display}
              </a>
              <p className="mt-1 text-sm text-slate-400">{site.workingHours}</p>
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  openCallback();
                }}
                className="btn btn-primary mt-4 w-full"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full pt-3 sm:pt-4 lg:pt-5">
        <div
          className={`${insetX} border border-slate-200 bg-slate-50/95 shadow-lg shadow-slate-900/10 backdrop-blur-md ${
            mobileOpen ? "rounded-t-2xl border-b-0" : "rounded-2xl"
          }`}
        >
          <div className="relative grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:h-20 sm:px-5 xl:h-16">
            <Logo compact />

            <nav
              className="hidden items-center justify-self-center gap-0.5 xl:flex"
              aria-label="Основная навигация"
            >
              <div
                onMouseEnter={() => {
                  cancelClose();
                  setMegaOpen(true);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setMegaOpen((open) => !open)}
                  aria-expanded={megaOpen}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Услуги
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-self-end gap-2 sm:gap-3">
              <a
                href={site.phone.href}
                className="hidden px-2 text-sm font-bold whitespace-nowrap text-slate-900 transition hover:text-glass-600 xl:inline-flex"
              >
                {site.phone.display}
              </a>
              <button
                type="button"
                onClick={openCallback}
                className="btn btn-primary hidden px-5 py-2.5 text-sm whitespace-nowrap xl:inline-flex"
              >
                Заказать звонок
              </button>
              <a
                href={site.phone.href}
                aria-label="Позвонить"
                className="btn btn-primary p-3 xl:hidden"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={mobileOpen}
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-900 xl:hidden"
              >
                {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>

            {megaOpen ? (
              <div
                className="absolute top-full left-0 hidden w-full pt-3 xl:block"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div
                  onClick={() => setMegaOpen(false)}
                  className="animate-fade-up grid grid-cols-2 gap-x-8 gap-y-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5"
                >
                  {servicesOverview.map((service) => {
                    const Icon = serviceIcons[service.slug];
                    return (
                      <Link
                        key={service.slug}
                        href={`/${service.slug}`}
                        className="group flex items-start gap-3"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-glass-50 text-glass-600 transition group-hover:bg-glass-500 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-slate-900 group-hover:text-glass-600">
                            {service.title}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-slate-400">
                            {service.excerpt}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {mobileMenu}
      </header>
      {mobileBackdrop}
    </>
  );
}
