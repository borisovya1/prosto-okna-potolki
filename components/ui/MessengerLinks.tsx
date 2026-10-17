import { TelegramIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

const messengers = [
  // WhatsApp временно скрыт. Чтобы вернуть — раскомментируйте строку и импорт WhatsAppIcon
  // { key: "whatsapp", label: "WhatsApp", href: site.messengers.whatsapp, Icon: WhatsAppIcon },
  { key: "telegram", label: "Telegram", href: site.messengers.telegram, Icon: TelegramIcon },
] as const;

type MessengerLinksProps = {
  /**
   * icons — круглые кнопки-иконки (шапка);
   * buttons — кнопки с подписью на светлом фоне;
   * buttons-dark — кнопки с подписью на тёмном фоне
   */
  variant?: "icons" | "buttons" | "buttons-dark";
  className?: string;
  /** Свой класс кнопки вместо стандартного для buttons / buttons-dark */
  buttonClassName?: string;
};

export default function MessengerLinks({
  variant = "buttons",
  className = "",
  buttonClassName,
}: MessengerLinksProps) {
  if (variant === "icons") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {messengers.map(({ key, label, href, Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Написать в ${label}`}
            title={`Написать в ${label}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    );
  }

  const buttonClass =
    buttonClassName ?? (variant === "buttons-dark" ? "btn btn-ghost-light" : "btn btn-outline");

  return (
    <div
      className={`grid gap-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${messengers.length}, minmax(0, 1fr))` }}
    >
      {messengers.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={`${buttonClass} px-4 py-3 text-sm`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </a>
      ))}
    </div>
  );
}
