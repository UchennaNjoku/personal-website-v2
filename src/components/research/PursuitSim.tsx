"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThemeVars } from "@/hooks/useThemeVars";
import { createWorld, SIZE, step, VIEW, type Cell, type World } from "./pursuit";

const STEP_MS = 220;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - (1 - t) ** 3;

export default function PursuitSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = useThemeVars();
  const [coordinated, setCoordinated] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState({ steps: 0, captures: 0, collisions: 0 });

  const world = useRef<World | null>(null);
  const prev = useRef<World | null>(null);
  const coordRef = useRef(coordinated);
  const playRef = useRef(playing);
  const resetStats = useRef(false);
  coordRef.current = coordinated;
  playRef.current = playing;

  // Autoplay unless the visitor prefers reduced motion; they can still press play.
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    world.current ??= createWorld();
    prev.current ??= world.current;
    let size = 0;
    let lastStep = performance.now();
    let frame = 0;
    let visible = true;
    const captures: { at: Cell; t: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.getBoundingClientRect().width;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const c = colors.current;
      const cur = world.current!;
      const old = prev.current!;
      const cell = size / SIZE;
      const t = ease(Math.min(1, (now - lastStep) / (STEP_MS * 0.8)));
      const center = (p: Cell) => [(p.x + 0.5) * cell, (p.y + 0.5) * cell] as const;
      const pos = cur.pursuers.map((p, i) => [lerp(old.pursuers[i].x, p.x, t), lerp(old.pursuers[i].y, p.y, t)] as const);

      ctx.clearRect(0, 0, size, size);

      ctx.strokeStyle = `rgb(${c.rule} / 0.6)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= SIZE; i++) {
        const v = Math.round(i * cell) + 0.5;
        ctx.moveTo(v, 0);
        ctx.lineTo(v, size);
        ctx.moveTo(0, v);
        ctx.lineTo(size, v);
      }
      ctx.stroke();

      // Each pursuer only sees a 7×7 window around itself.
      const half = (VIEW - 1) / 2;
      for (const [x, y] of pos) {
        ctx.fillStyle = `rgb(${c.azure} / 0.06)`;
        ctx.strokeStyle = `rgb(${c.azure} / 0.22)`;
        ctx.fillRect((x - half) * cell, (y - half) * cell, VIEW * cell, VIEW * cell);
        ctx.strokeRect((x - half) * cell + 0.5, (y - half) * cell + 0.5, VIEW * cell - 1, VIEW * cell - 1);
      }

      // Where each pursuer is heading this step.
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = `rgb(${c.azure} / 0.55)`;
      for (const target of cur.targets) ctx.strokeRect(target.x * cell + 3, target.y * cell + 3, cell - 6, cell - 6);
      ctx.setLineDash([]);

      // Messages: pulses travelling between coordinated pursuers.
      if (coordRef.current) {
        for (let i = 0; i < pos.length; i++) {
          for (let j = i + 1; j < pos.length; j++) {
            const [ax, ay] = [(pos[i][0] + 0.5) * cell, (pos[i][1] + 0.5) * cell];
            const [bx, by] = [(pos[j][0] + 0.5) * cell, (pos[j][1] + 0.5) * cell];
            ctx.strokeStyle = `rgb(${c.sky} / 0.25)`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
            const k = (now / 900 + (i + j) * 0.33) % 1;
            ctx.fillStyle = `rgb(${c.sky} / 0.9)`;
            ctx.beginPath();
            ctx.arc(lerp(ax, bx, k), lerp(ay, by, k), 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Prey: snaps to its new spot after a capture, glides otherwise.
      const respawned = Math.abs(old.prey.x - cur.prey.x) + Math.abs(old.prey.y - cur.prey.y) > 1;
      const px = respawned ? cur.prey.x : lerp(old.prey.x, cur.prey.x, t);
      const py = respawned ? cur.prey.y : lerp(old.prey.y, cur.prey.y, t);
      ctx.shadowColor = `rgb(${c.violet})`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgb(${c.violet})`;
      ctx.beginPath();
      ctx.arc((px + 0.5) * cell, (py + 0.5) * cell, cell * 0.32, 0, Math.PI * 2);
      ctx.fill();

      pos.forEach(([x, y], i) => {
        const bumped = cur.bumped.includes(i) && now - lastStep < STEP_MS;
        ctx.shadowColor = bumped ? `rgb(${c.down})` : `rgb(${c.azure})`;
        ctx.shadowBlur = bumped ? 16 : 10;
        ctx.fillStyle = bumped ? `rgb(${c.down})` : `rgb(${c.azure})`;
        const pad = cell * 0.16;
        ctx.beginPath();
        ctx.roundRect(x * cell + pad, y * cell + pad, cell - pad * 2, cell - pad * 2, 3);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      for (let i = captures.length - 1; i >= 0; i--) {
        const k = (now - captures[i].t) / 700;
        if (k > 1) {
          captures.splice(i, 1);
          continue;
        }
        const [cx, cy] = center(captures[i].at);
        ctx.strokeStyle = `rgb(${c.up} / ${1 - k})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, cell * (0.4 + k * 2), 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (resetStats.current) {
        resetStats.current = false;
        world.current = { ...world.current!, steps: 0, captures: 0, collisions: 0 };
        setStats({ steps: 0, captures: 0, collisions: 0 });
      }
      if (playRef.current && now - lastStep >= STEP_MS) {
        lastStep = now;
        prev.current = world.current;
        world.current = step(world.current!, coordRef.current);
        if (world.current.caughtAt) captures.push({ at: world.current.caughtAt, t: now });
        const { steps, captures: caught, collisions } = world.current;
        setStats({ steps, captures: caught, collisions });
      }
      draw(now);
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
  }, [colors]);

  const setMode = (value: boolean) => {
    setCoordinated(value);
    resetStats.current = true;
  };

  const reset = () => {
    world.current = createWorld();
    prev.current = world.current;
    resetStats.current = true;
  };

  const collisionRate = stats.steps ? ((stats.collisions / stats.steps) * 100).toFixed(0) : "0";
  const pace = stats.captures ? Math.round(stats.steps / stats.captures) : null;

  return (
    <figure className="rounded-2xl border border-rule bg-panel/60 p-4 backdrop-blur">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-full border border-rule p-0.5 font-mono text-xs" role="group" aria-label="Pursuer behaviour">
          {[
            { label: "independent", value: false },
            { label: "coordinated", value: true },
          ].map((m) => (
            <button
              key={m.label}
              type="button"
              aria-pressed={coordinated === m.value}
              onClick={() => setMode(m.value)}
              className={`rounded-full px-3 py-1 transition-colors ${coordinated === m.value ? "bg-azure text-canvas" : "text-dim hover:text-paper"}`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 font-mono text-xs">
          <button type="button" onClick={() => setPlaying((p) => !p)} className="rounded-full border border-rule px-3 py-1 text-dim transition-colors hover:border-azure hover:text-azure">
            {playing ? "pause" : "play"}
          </button>
          <button type="button" onClick={reset} className="rounded-full border border-rule px-3 py-1 text-dim transition-colors hover:border-azure hover:text-azure">
            reset
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="aspect-square w-full"
        role="img"
        aria-label="A 16 by 16 grid where three pursuers chase one prey. Each pursuer has a 7 by 7 view window."
      />

      <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-rule pt-3 font-mono text-xs" aria-live="off">
        <div>
          <dt className="text-dim">captures</dt>
          <dd className="text-base text-paper">{stats.captures}</dd>
        </div>
        <div>
          <dt className="text-dim">steps / capture</dt>
          <dd className="text-base text-paper">{pace ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-dim">bump rate</dt>
          <dd className={`text-base ${Number(collisionRate) > 30 ? "text-down" : "text-paper"}`}>{collisionRate}%</dd>
        </div>
      </dl>

      <figcaption className="mt-3 text-xs leading-relaxed text-dim">
        <span className="text-azure">■</span> pursuers with their 7×7 view, <span className="text-violet">●</span> prey. A hand-coded sketch of
        the environment, not the trained agents: <em>coordinated</em> pursuers share positions and split up around the prey,
        <em> independent</em> ones all rush the nearest gap and get in each other&apos;s way. In the research, nobody wrote that
        rule. The agents learned what to say.
      </figcaption>
    </figure>
  );
}
