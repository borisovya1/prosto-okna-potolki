"use client";

import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { CompareIcon } from "@/components/ui/icons";

type CompareSliderProps = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  defaultValue?: number;
};

export default function CompareSlider({
  before,
  after,
  beforeLabel = "До",
  afterLabel = "После",
  className = "",
  defaultValue = 50,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [value, setValue] = useState(defaultValue);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, pct)));
  }, []);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    containerRef.current?.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") setValue((v) => Math.max(0, v - 5));
    if (event.key === "ArrowRight") setValue((v) => Math.min(100, v + 5));
  }

  return (
    <div
      ref={containerRef}
      className={`relative touch-none overflow-hidden select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        {before}
      </div>

      <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-glass-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(11,15,22,0.15)]"
        style={{ left: `${value}%` }}
      />

      <div
        role="slider"
        tabIndex={0}
        aria-label="Сравнить до и после"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-glass-500 text-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{ left: `${value}%` }}
      >
        <CompareIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
