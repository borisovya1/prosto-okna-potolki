const items = [
  "Одно- и двустворчатые окна",
  "Балконные блоки и раздвижные системы",
  "Панорамное остекление",
  "Москитные сетки",
  "Матовые потолки",
  "Глянцевые потолки",
  "Сатиновые потолки",
  "Многоуровневые конструкции",
  "Встроенная подсветка",
] as const;

export default function ServiceMarquee() {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-slate-200 bg-white py-4">
      <div className="animate-marquee flex w-max gap-3">
        {track.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
