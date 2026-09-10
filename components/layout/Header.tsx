"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "@/components/layout/Logo";
import { useModals } from "@/components/modals/modal-context";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const { openCallback } = useModals();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let wasScrolled: boolean | null = null;

    const onScroll = () => {
      const isScrolled = window.scrollY > 12;
      if (isScrolled !== wasScrolled) {
        setScrolled(isScrolled);
        if (wasScrolled !== null) setMobileOpen(false);
        wasScrolled = isScrolled;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const insetX = scrolled ? "mx-3 sm:mx-6 lg:mx-10 xl:mx-16" : "mx-0";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`border-t-0 transition-all duration-300 ease-out ${insetX} ${
          scrolled
            ? `border-x border-white/10 bg-slate-950/90 px-3 shadow-xl shadow-black/30 backdrop-blur-md sm:px-5 ${
                mobileOpen ? "rounded-b-none border-b-0" : "rounded-b-2xl border-b"
              }`
            : "rounded-none border-x-0 border-b border-white/10 bg-slate-950/95 px-4 sm:px-6 lg:px-10"
        }`}
      >
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-20 sm:gap-6">
          <Logo compact tone="light" />

          <nav
            className="hidden items-center justify-self-center lg:flex lg:gap-8 xl:gap-10"
            aria-label="Основная навигация"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-semibold text-white/70 transition hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-2 sm:gap-3">
            <a
              href={site.phone.href}
              className="hidden text-sm font-bold text-white/80 transition hover:text-white md:block"
            >
              {site.phone.display}
            </a>
            <button
              type="button"
              onClick={openCallback}
              className="btn btn-light hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Заказать звонок
            </button>
            <a href={site.phone.href} aria-label="Позвонить" className="btn btn-light p-3 sm:hidden">
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className={`absolute inset-x-0 top-full overflow-hidden rounded-b-2xl border-x border-b border-white/10 shadow-xl shadow-black/30 backdrop-blur-md lg:hidden ${insetX} ${
              scrolled ? "bg-slate-950/90" : "bg-slate-950/95"
            }`}
          >
            <nav aria-label="Мобильная навигация" className="flex flex-col gap-0.5 border-t border-white/10 pt-3 pb-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 + index * 0.03, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-3 text-base font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-white/10 px-3 py-4">
              <a href={site.phone.href} className="block text-lg font-extrabold text-white">
                {site.phone.display}
              </a>
              <p className="mt-1 text-sm text-white/50">{site.phone.note}</p>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openCallback();
                }}
                className="btn btn-light mt-4 w-full"
              >
                Заказать звонок
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
