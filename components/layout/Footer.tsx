import Link from "next/link";

import Logo from "@/components/layout/Logo";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_0.8fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{site.description}</p>
          <a
            href={site.social.ok}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-glass-300"
          >
            Отзывы и работы в Одноклассниках
          </a>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Страницы</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-glass-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Контакты</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-glass-400" />
              <span>
                <a href={site.phone.href} className="block text-base font-bold text-white transition hover:text-glass-300">
                  {site.phone.display}
                </a>
                <span className="text-xs text-slate-500">{site.phone.note}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-glass-400" />
              <span>
                <a href={site.email.href} className="block font-semibold text-white transition hover:text-glass-300">
                  {site.email.display}
                </a>
                <span className="text-xs text-slate-500">{site.email.note}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-glass-400" />
              <span>
                <span className="block font-semibold text-white">{site.address.note}</span>
                <span className="text-xs text-slate-500">{site.address.display}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-glass-400" />
              <span className="text-xs text-slate-500">{site.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Все права защищены.
          </p>
          <Link href="/politika" className="transition hover:text-glass-300">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
