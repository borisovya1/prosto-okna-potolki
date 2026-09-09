import Image from "next/image";

/**
 * Заглушка под фото, пока реальных снимков объектов нет.
 * Чтобы подставить фото: положите файл в public/images и передайте src="/images/имя.jpg".
 *
 * variant="glass"   — блик и раскладка окна (для раздела про окна)
 * variant="ceiling" — мягкое рассеянное свечение (для раздела про потолки)
 * variant="neutral" — нейтральный холодный градиент
 */

type VisualProps = {
  src?: string;
  alt: string;
  variant?: "glass" | "ceiling" | "neutral";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function Visual({
  src,
  alt,
  variant = "neutral",
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: VisualProps) {
  return (
    <div
      role={src ? undefined : "img"}
      aria-label={src ? undefined : alt}
      className={`relative overflow-hidden bg-slate-800 ${className}`}
    >
      {!src ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                variant === "glass"
                  ? "linear-gradient(135deg, #17233a 0%, #1d3160 42%, #3d6fd6 78%, #8fb4f2 100%)"
                  : variant === "ceiling"
                    ? "radial-gradient(120% 90% at 50% -10%, #f3f6fb 0%, #cdd8e8 38%, #8695ac 78%, #4c5871 100%)"
                    : "linear-gradient(135deg, #1b2536 0%, #37455c 55%, #64738a 100%)",
            }}
          />
          {variant === "glass" ? (
            <div
              aria-hidden="true"
              className="pane-grid absolute inset-0"
              style={{ backgroundSize: "50% 33.33%" }}
            />
          ) : null}
          {variant === "ceiling" ? (
            <div
              aria-hidden="true"
              className="absolute top-[18%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)" }}
            />
          ) : null}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 15% 0%, rgba(255,255,255,0.25) 0%, transparent 55%)",
            }}
          />
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover select-none"
        />
      )}
    </div>
  );
}
