import Image from "next/image";

/**
 * Заглушка под фото, пока реальных снимков объектов нет.
 * Чтобы подставить фото: положите файл в public/images и передайте src="/images/имя.jpg".
 *
 * variant="glass"   — блик и раскладка окна (для раздела про окна)
 * variant="ceiling" — мягкое рассеянное свечение (для раздела про потолки)
 * variant="worn"    — тусклая, выцветшая поверхность («до» в сравнении до/после)
 * variant="neutral" — нейтральный холодный градиент
 */

type VisualProps = {
  src?: string;
  alt: string;
  variant?: "glass" | "ceiling" | "worn" | "neutral";
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
                  ? "linear-gradient(135deg, #2b2013 0%, #6b4a1e 42%, #d69a3a 78%, #f2d38f 100%)"
                  : variant === "ceiling"
                    ? "radial-gradient(120% 90% at 50% -10%, #fbf6ec 0%, #ecdcc0 38%, #ab8f66 78%, #5c4a34 100%)"
                    : variant === "worn"
                      ? "linear-gradient(135deg, #35281c 0%, #59452f 45%, #7c6647 75%, #948062 100%)"
                      : "linear-gradient(135deg, #241c13 0%, #5c4a34 55%, #9c8b76 100%)",
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
          {variant === "worn" ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(95deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 14px)",
              }}
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
