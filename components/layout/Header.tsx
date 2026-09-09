"use client";

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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const mobileMenu = mobileOpen ? (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <div className="absolute inset-0 bg-slate-950/60" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 flex h-dvh w-[min(100%,22rem)] flex-col bg-slate-50 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-2xl">
        <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4">
          <Logo compact />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Закрыть меню"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-900"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav
          onClick={() => setMobileOpen(false)}
          className="min-h-0 flex-1 divide-y divide-slate-200 overflow-y-auto px-4"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block py-4 text-lg font-bold text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-200 px-4 py-4">
          <a href={site.phone.href} className="block text-xl font-extrabold text-slate-900">
            {site.phone.display}
          </a>
          <p className="mt-1 text-sm text-slate-400">{site.phone.note}</p>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openCallback();
            }}
            className="btn btn-primary mt-4 w-full"
          >
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-slate-50/95 backdrop-blur-md"
            : "border-b border-transparent bg-slate-50"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
          <Logo compact />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={site.phone.href}
              className="hidden text-sm font-bold text-slate-900 transition hover:text-glass-600 md:block"
            >
              {site.phone.display}
            </a>
            <button
              type="button"
              onClick={openCallback}
              className="btn btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Заказать звонок
            </button>
            <a href={site.phone.href} aria-label="Позвонить" className="btn btn-primary p-3 sm:hidden">
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Открыть меню"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-900 lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
