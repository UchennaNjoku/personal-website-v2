"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThemeVars } from "@/hooks/useThemeVars";
import { arbitrageFree, impliedVol, K_RANGE, T_RANGE, type SsviParams } from "./ssvi";

const NK = 30;
const NT = 22;

const SLIDERS = [
  { key: "rho", label: "skew ρ", min: -0.9, max: 0.5, step: 0.05 },
  { key: "eta", label: "wings η", min: 0.2, max: 2.6, step: 0.05 },
  { key: "atmVol", label: "ATM vol", min: 0.1, max: 0.45, step: 0.01 },
] as const;

const rgb = (v: string) => v.split(/\s+/).map(Number);
const mix = (a: number[], b: number[], t: number) => a.map((x, i) => Math.round(x + (b[i] - x) * t));

/**
 * An implied volatility surface you can spin. Auto-rotates; drag to turn it, sliders
 * reshape it. Synthetic SSVI parameters, not market data.
 */
export default function VolSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = useThemeVars();
  const [p, setP] = useState<SsviParams>({ rho: -0.6, eta: 1.2, atmVol: 0.2 });
  const params = useRef(p);
  params.current = p;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let yaw = -0.7;
    let pitch = 0.55;
    let frame = 0;
    let visible = true;
    let drag: { x: number; y: number; yaw: number; pitch: number } | null = null;
    let lastInteraction = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const c = colors.current;
      const low = rgb(c.sky);
      const mid = rgb(c.azure);
      const high = rgb(c.violet);
      const pr = params.current;

      // Sample the surface on a grid; x = strike, y = maturity, z = implied vol.
      const grid: number[][] = [];
      let zMax = 0;
      let zMin = Infinity;
      for (let i = 0; i < NK; i++) {
        grid.push([]);
        const k = K_RANGE[0] + ((K_RANGE[1] - K_RANGE[0]) * i) / (NK - 1);
        for (let j = 0; j < NT; j++) {
          const T = T_RANGE[0] + ((T_RANGE[1] - T_RANGE[0]) * j) / (NT - 1);
          const iv = impliedVol(k, T, pr);
          grid[i].push(iv);
          zMax = Math.max(zMax, iv);
          zMin = Math.min(zMin, iv);
        }
      }
      zMax = Math.max(zMax, 0.3);

      const scale = Math.min(w, h) * 0.36;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const project = (x: number, y: number, z: number) => {
        const rx = x * cy - y * sy;
        const ry = x * sy + y * cy;
        const depth = ry * cp + z * sp;
        const up = z * cp - ry * sp;
        const persp = 3.2 / (3.2 + depth);
        return { x: w / 2 + rx * scale * persp, y: h * 0.56 - up * scale * persp, depth };
      };
      const point = (i: number, j: number) =>
        project((i / (NK - 1)) * 2 - 1, (j / (NT - 1)) * 2 - 1, (grid[i][j] / zMax) * 1.25 - 0.45);

      ctx.clearRect(0, 0, w, h);

      // Floor outline and axis labels.
      const corners = [project(-1, -1, -0.45), project(1, -1, -0.45), project(1, 1, -0.45), project(-1, 1, -0.45)];
      ctx.strokeStyle = `rgb(${c.rule})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      corners.forEach((q, n) => (n ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = `rgb(${c.dim})`;
      ctx.font = "10px ui-monospace, monospace";
      const label = (text: string, q: { x: number; y: number }) => ctx.fillText(text, q.x, q.y);
      label("strike →", project(0.6, -1.25, -0.45));
      label("maturity →", project(1.2, 0.5, -0.45));
      label("implied vol", project(-1, -1, 0.85));

      // Quads sorted back to front (painter's algorithm).
      const quads: { pts: { x: number; y: number }[]; depth: number; t: number }[] = [];
      for (let i = 0; i < NK - 1; i++) {
        for (let j = 0; j < NT - 1; j++) {
          const pts = [point(i, j), point(i + 1, j), point(i + 1, j + 1), point(i, j + 1)];
          const iv = (grid[i][j] + grid[i + 1][j] + grid[i + 1][j + 1] + grid[i][j + 1]) / 4;
          // Colour spans the surface's own range so low vol reads cool and high vol hot.
          quads.push({ pts, depth: pts.reduce((s, q) => s + q.depth, 0) / 4, t: (iv - zMin) / Math.max(zMax - zMin, 1e-6) });
        }
      }
      quads.sort((a, b) => b.depth - a.depth);
      for (const q of quads) {
        const col = q.t < 0.5 ? mix(low, mid, q.t / 0.5) : mix(mid, high, (q.t - 0.5) / 0.5);
        ctx.fillStyle = `rgb(${col.join(" ")} / 0.88)`;
        ctx.strokeStyle = `rgb(${col.join(" ")} / 1)`;
        ctx.beginPath();
        q.pts.forEach((pt, n) => (n ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y)));
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (!reduce && !drag && now - lastInteraction > 2500) yaw += 0.004;
      draw();
    };

    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, yaw, pitch };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      yaw = drag.yaw + (e.clientX - drag.x) * 0.01;
      pitch = Math.max(0.05, Math.min(1.35, drag.pitch + (e.clientY - drag.y) * 0.008));
    };
    const onUp = () => {
      drag = null;
      lastInteraction = performance.now();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      io.disconnect();
      ro.disconnect();
    };
  }, [colors]);

  const atm1y = impliedVol(0, 1, p);
  const skew1y = (impliedVol(0.05, 1, p) - impliedVol(-0.05, 1, p)) / 0.1;
  const ok = arbitrageFree(p);

  return (
    <figure className="rounded-2xl border border-rule bg-panel/60 p-4 backdrop-blur">
      <canvas
        ref={canvasRef}
        className="aspect-[4/3] w-full touch-none cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="A rotating 3D implied volatility surface over strike and maturity."
      />
      <p className="-mt-1 text-center font-mono text-[10px] text-dim">drag to rotate</p>

      <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-3">
        {SLIDERS.map((s) => (
          <label key={s.key} className="block font-mono text-xs">
            <span className="flex justify-between text-dim">
              <span>{s.label}</span>
              <span className="text-paper">{p[s.key].toFixed(2)}</span>
            </span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={p[s.key]}
              onChange={(e) => setP({ ...p, [s.key]: Number(e.target.value) })}
              className="mt-1 w-full accent-azure"
            />
          </label>
        ))}
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-rule pt-3 font-mono text-xs">
        <div>
          <dt className="text-dim">ATM vol, 1y</dt>
          <dd className="text-base text-paper">{(atm1y * 100).toFixed(1)}%</dd>
        </div>
        <div>
          <dt className="text-dim">skew, 1y</dt>
          <dd className="text-base text-paper">{skew1y.toFixed(3)}</dd>
        </div>
        <div>
          <dt className="text-dim">static arb</dt>
          <dd className={`text-base ${ok ? "text-up" : "text-down"}`}>{ok ? "none ✓" : "possible ✗"}</dd>
        </div>
      </dl>

      <figcaption className="mt-3 text-xs leading-relaxed text-dim">
        An SSVI surface (Gatheral &amp; Jacquier, 2014) drawn from synthetic parameters, not market data. VolSurf-CPP fits
        surfaces like this to real option quotes. Push η(1 + |ρ|) past 2 and the parameterization no longer guarantees
        an arbitrage-free surface.
      </figcaption>
    </figure>
  );
}
