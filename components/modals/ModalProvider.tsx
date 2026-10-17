"use client";

import { MotionConfig } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import { ModalContext } from "@/components/modals/modal-context";
import LeadForm from "@/components/ui/LeadForm";
import MessengerLinks from "@/components/ui/MessengerLinks";
import Modal from "@/components/ui/Modal";
import { CheckIcon, ShieldIcon } from "@/components/ui/icons";
import { contactLead, leadPerks } from "@/lib/content";
import { site } from "@/lib/site";

type ModalKind = "callback" | "success" | null;

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ModalKind>(null);

  const openCallback = useCallback(() => setActive("callback"), []);
  const openSuccess = useCallback(() => setActive("success"), []);
  const close = useCallback(() => setActive(null), []);

  const value = useMemo(() => ({ openCallback, openSuccess, close }), [openCallback, openSuccess, close]);

  return (
    <ModalContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>

      <Modal open={active === "callback"} onClose={close} labelledBy="callback-title">
        <h2 id="callback-title" className="pr-10 text-2xl font-extrabold text-slate-900">
          Свяжитесь с нами!
        </h2>
        <p className="mt-2 text-sm text-slate-500">{contactLead}</p>

        <LeadForm source="callback" buttonLabel="Отправить" className="mt-6" />

        <p className="mt-5 text-center text-xs text-slate-500">или напишите нам:</p>
        <MessengerLinks className="mt-2" />

        <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
          {leadPerks.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 shrink-0 text-pane-600" />
              {item}
            </li>
          ))}
        </ul>
      </Modal>

      <Modal open={active === "success"} onClose={close} labelledBy="success-title">
        <div className="py-2 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pane-50 text-pane-600">
            <CheckIcon className="h-8 w-8" strokeWidth={2} />
          </div>
          <h2 id="success-title" className="mt-5 text-2xl font-extrabold text-slate-900">
            Заявка отправлена
          </h2>
          <p className="mt-2 text-slate-500">
            Мы перезвоним вам в ближайшее время. Если удобнее — позвоните сами:{" "}
            <a href={site.phone.href} className="font-semibold text-pane-600">
              {site.phone.display}
            </a>
          </p>
          <button type="button" onClick={close} className="btn btn-dark mt-6 w-full">
            Понятно
          </button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}
