"use client";

import React, { useEffect, useRef } from "react";
import { useThemeVars } from "@/hooks/useThemeVars";

const GAP = 30;
const REACH = 180;
const MAX_SIGNALS = 7;

interface Signal {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

/**
 * Dot grid behind the hero. Dots near the pointer brighten and lean away from it, and
 * short pulses run along the grid lines like messages between agents. Draws a single
 * static frame for reduced motion and pauses while off-screen.
 */
export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const colors = useThemeVars();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    const signals: Signal[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw();
    };

    const spawn = () => {
      const horizontal = Math.random() > 0.5;
      const forward = Math.random() > 0.5;
      const speed = 2.5 + Math.random() * 3;
      const cols = Math.floor(w / GAP);
      const rows = Math.floor(h / GAP);
      signals.push({
        x: horizontal ? (forward ? 0 : w) : (1 + Math.floor(Math.random() * cols)) * GAP,
        y: horizontal ? (1 + Math.floor(Math.random() * rows)) * GAP : forward ? 0 : h,
        dx: horizontal ? (forward ? speed : -speed) : 0,
        dy: horizontal ? 0 : forward ? speed : -speed,
      });
    };

    function draw() {
      const c = colors.current;
      ctx!.clearRect(0, 0, w, h);
      const rect = canvas!.getBoundingClientRect();
      const px = pointer.x - rect.left;
      const py = pointer.y - rect.top;

      for (let x = GAP; x < w; x += GAP) {
        for (let y = GAP; y < h; y += GAP) {
          const dx = x - px;
          const dy = y - py;
          const d = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - d / REACH);
          const push = t * t * 8;
          const ox = d ? (dx / d) * push : 0;
          const oy = d ? (dy / d) * push : 0;
          ctx!.fillStyle = t > 0 ? `rgb(${c.azure} / ${0.25 + t * 0.75})` : `rgb(${c.dim} / 0.28)`;
          ctx!.beginPath();
          ctx!.arc(x + ox, y + oy, 1 + t * 1.4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      for (const s of signals) {
        const len = 90;
        const tx = s.x - Math.sign(s.dx) * len;
        const ty = s.y - Math.sign(s.dy) * len;
        const grad = ctx!.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgb(${c.azure} / 0)`);
        grad.addColorStop(1, `rgb(${c.azure} / 0.85)`);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(s.x, s.y);
        ctx!.stroke();
        ctx!.fillStyle = `rgb(${c.azure})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (signals.length < MAX_SIGNALS && Math.random() < 0.03) spawn();
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < -120 || s.y < -120 || s.x > w + 120 || s.y > h + 120) signals.splice(i, 1);
      }
      draw();
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const r = canvas.getBoundingClientRect();
      glowRef.current?.style.setProperty("transform", `translate(${e.clientX - r.left - 300}px, ${e.clientY - r.top - 300}px)`);
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      frame = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      ro.disconnect();
    };
  }, [colors]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, rgb(var(--azure) / 0.14), transparent 65%)", transform: "translate(50vw, 10vh)" }}
      />
      <canvas ref={canvasRef} className="hero-mask absolute inset-0 h-full w-full" />
    </div>
  );
}
