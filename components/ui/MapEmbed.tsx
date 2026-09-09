import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

type MapEmbedProps = {
  className?: string;
};

export default function MapEmbed({ className = "" }: MapEmbedProps) {
  const { lat, lon } = site.address.coords;
  const src = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16&l=map&pt=${lon},${lat},pm2rdm&theme=dark`;
  const directionsHref = `https://yandex.ru/maps/?pt=${lon},${lat}&z=16&l=map`;

  return (
    <div className={`overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900 ${className}`}>
      <iframe
        src={src}
        title={`Карта проезда: ${site.address.display}`}
        loading="lazy"
        style={{ border: 0 }}
        className="h-64 w-full sm:h-72"
      />
      <a
        href={directionsHref}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center justify-between gap-3 border-t border-white/10 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:text-glass-300"
      >
        Проложить маршрут на Яндекс.Картах
        <ArrowRightIcon className="h-4 w-4 shrink-0" />
      </a>
    </div>
  );
}
