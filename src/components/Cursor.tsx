"use client";

import React, { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, label, select, [role='button'], input[type='range']";

/**
 * A dot that tracks the pointer exactly and a ring that trails behind it. The ring
 * grows over anything clickable and turns into a text bar over the terminal. Only on
 * devices with a fine pointer; touch users keep their normal behaviour.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate(${target.x}px, ${target.y}px)`;
      root.dataset.cursor = "on";
      const el = e.target as Element | null;
      ring.dataset.mode = el?.closest(".term-screen") ? "text" : el?.closest(INTERACTIVE) ? "hover" : "";
    };
    const onDown = () => (ring.dataset.pressed = "true");
    const onUp = () => delete ring.dataset.pressed;
    const onLeave = () => delete root.dataset.cursor;

    const tick = () => {
      const ease = reduce ? 1 : 0.18;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div ref={ringRef} className="cursor-ring">
        <span />
      </div>
      <div ref={dotRef} className="cursor-dot">
        <span />
      </div>
    </div>
  );
}
