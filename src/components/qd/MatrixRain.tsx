"use client";

import React, { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789UCHENNAJOKU";
const DURATION = 4500;
const FADE = 900;

/** Digital rain over the terminal for a few seconds, then it calls onDone. */
export default function MatrixRain({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const size = 14;
    // Fade with the terminal's own background so the trails work in both themes.
    const bg = getComputedStyle(canvas).getPropertyValue("--bg").trim() || "14 15 19";
    const paper = getComputedStyle(canvas).getPropertyValue("--paper").trim();
    const ink = document.documentElement.dataset.theme === "light" ? "#1a7f37" : "#3fb950";
    const drops = Array.from({ length: Math.ceil(width / size) }, () => -Math.random() * 40);
    const start = performance.now();
    let last = start;
    let frame = 0;

    const draw = (now: number) => {
      const elapsed = now - start;
      if (elapsed > DURATION) {
        done.current();
        return;
      }
      canvas.style.opacity = String(Math.min(1, (DURATION - elapsed) / FADE));
      if (now - last > 45) {
        last = now;
        ctx.fillStyle = `rgb(${bg} / 0.16)`;
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${size}px monospace`;
        drops.forEach((y, i) => {
          const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          ctx.fillStyle = Math.random() > 0.96 ? `rgb(${paper})` : ink;
          ctx.fillText(ch, i * size, y * size);
          drops[i] = y * size > height && Math.random() > 0.95 ? 0 : y + 1;
        });
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
