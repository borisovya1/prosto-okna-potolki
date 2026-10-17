"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useSyncExternalStore } from "react";

import { getConsentSnapshot, parseConsent, subscribeConsent } from "@/lib/cookie-consent";
import { reachGoal, trackPageView, type MetrikaGoal } from "@/lib/metrika";
import { site } from "@/lib/site";

const getServerConsent = () => null;

/** Клики по ссылкам связи считаем целями без правки каждой ссылки */
function goalForLink(href: string): MetrikaGoal | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith(site.messengers.whatsapp)) return "whatsapp_click";
  if (href.startsWith(site.messengers.telegram)) return "telegram_click";
  return null;
}

/**
 * Счётчик подключается только если задан NEXT_PUBLIC_YM_ID и посетитель
 * принял cookie. После отказа новые хиты и цели не отправляются.
 */
export default function YandexMetrika() {
  const raw = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsent);
  const accepted = parseConsent(raw)?.accepted === true;
  const pathname = usePathname();
  const firstHit = useRef(true);

  useEffect(() => {
    if (!accepted) return;

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const goal = link ? goalForLink(link.getAttribute("href") ?? "") : null;
      if (goal) reachGoal(goal);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [accepted]);

  // Первый просмотр отправляет сам init, дальше — хиты при переходах между страницами
  useEffect(() => {
    if (!accepted) return;
    if (firstHit.current) {
      firstHit.current = false;
      return;
    }
    trackPageView(window.location.href);
  }, [accepted, pathname]);

  if (!site.metrikaId || !accepted) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(site.metrikaId)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
    </Script>
  );
}
