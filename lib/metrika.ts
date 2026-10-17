import { hasCookieConsent } from "@/lib/cookie-consent";
import { site } from "@/lib/site";

// ============================================================
//  Цели Яндекс Метрики. Создайте в счётчике цели типа
//  «JavaScript-событие» с такими же идентификаторами.
// ============================================================

export type MetrikaGoal = "lead" | "phone_click" | "whatsapp_click" | "telegram_click";

type Ym = (id: number, method: string, ...args: unknown[]) => void;

function getYm(): Ym | null {
  if (typeof window === "undefined" || !site.metrikaId) return null;
  return (window as unknown as { ym?: Ym }).ym ?? null;
}

export function reachGoal(goal: MetrikaGoal) {
  if (!hasCookieConsent()) return;
  getYm()?.(Number(site.metrikaId), "reachGoal", goal);
}

export function trackPageView(url: string) {
  if (!hasCookieConsent()) return;
  getYm()?.(Number(site.metrikaId), "hit", url);
}
