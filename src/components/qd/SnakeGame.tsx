"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThemeVars } from "@/hooks/useThemeVars";
import { useTerminal } from "./TerminalContext";

const COLS = 24;
const ROWS = 15;

type Dir = { x: number; y: number };
type Status = "ready" | "playing" | "paused" | "over" | "quit";

const DIRS: Record<string, Dir> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

const readBest = () => {
  try {
    return Number(localStorage.getItem("snake-best")) || 0;
  } catch {
    return 0;
  }
};

/** Snake, played inside the terminal output. Takes the keyboard until you quit. */
export default function SnakeGame() {
  const { setBusy, print } = useTerminal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = useThemeVars();
  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [touch, setTouch] = useState(false);

  const game = useRef({
    snake: [{ x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }],
    dir: { x: 1, y: 0 },
    queue: [] as Dir[],
    food: { x: 15, y: 7 },
    score: 0,
    status: "ready" as Status,
  });
  // Set by the game loop below, used by the on-screen d-pad and buttons.
  const controls = useRef<{ turn: (d: Dir) => void; quit: () => void; restart: () => void } | null>(null);
  // Latest callbacks for the long-lived listeners below.
  const api = useRef({ setBusy, print });
  api.current = { setBusy, print };

  useEffect(() => {
    setBest(readBest());
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    api.current.setBusy(true);
    return () => api.current.setBusy(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const g = game.current;

    const setS = (s: Status) => {
      g.status = s;
      setStatus(s);
    };

    const placeFood = () => {
      for (;;) {
        const f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
        if (!g.snake.some((p) => p.x === f.x && p.y === f.y)) return (g.food = f);
      }
    };

    const reset = () => {
      g.snake = [{ x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }];
      g.dir = { x: 1, y: 0 };
      g.queue = [];
      g.score = 0;
      setScore(0);
      placeFood();
    };

    const quit = () => {
      setS("quit");
      api.current.setBusy(false);
      api.current.print(
        <span className="text-dim">
          snake exited · score <span className="text-azure">{g.score}</span> · best {Math.max(readBest(), g.score)}
        </span>,
      );
    };

    const turn = (d: Dir) => {
      if (g.status === "over" || g.status === "quit") return;
      if (g.status !== "playing") setS("playing");
      const last = g.queue[g.queue.length - 1] ?? g.dir;
      if (d.x === -last.x && d.y === -last.y) return;
      if (d.x === last.x && d.y === last.y) return;
      if (g.queue.length < 3) g.queue.push(d);
    };

    const step = () => {
      g.dir = g.queue.shift() ?? g.dir;
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
      const hitSelf = g.snake.slice(0, -1).some((p) => p.x === head.x && p.y === head.y);
      if (hitWall || hitSelf) {
        setS("over");
        if (g.score > readBest()) {
          try {
            localStorage.setItem("snake-best", String(g.score));
          } catch {}
          setBest(g.score);
        }
        return;
      }
      g.snake.unshift(head);
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score++;
        setScore(g.score);
        placeFood();
      } else {
        g.snake.pop();
      }
    };

    let size = { w: 0, cell: 0 };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.getBoundingClientRect().width;
      size = { w, cell: w / COLS };
      canvas.width = w * dpr;
      canvas.height = size.cell * ROWS * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const c = colors.current;
      const { w, cell } = size;
      ctx.clearRect(0, 0, w, cell * ROWS);
      ctx.fillStyle = `rgb(${c.dim} / 0.25)`;
      for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) ctx.fillRect((x + 0.5) * cell - 0.75, (y + 0.5) * cell - 0.75, 1.5, 1.5);

      const pulse = 0.75 + Math.sin(now / 180) * 0.15;
      ctx.shadowColor = `rgb(${c.violet})`;
      ctx.shadowBlur = 14;
      ctx.fillStyle = `rgb(${c.violet})`;
      ctx.beginPath();
      ctx.arc((g.food.x + 0.5) * cell, (g.food.y + 0.5) * cell, cell * 0.32 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = `rgb(${c.sky})`;
      g.snake.forEach((p, i) => {
        const fade = 1 - (i / g.snake.length) * 0.6;
        ctx.shadowBlur = i === 0 ? 14 : 0;
        ctx.fillStyle = `rgb(${c.sky} / ${fade})`;
        const pad = i === 0 ? 1 : 2;
        ctx.beginPath();
        ctx.roundRect(p.x * cell + pad, p.y * cell + pad, cell - pad * 2, cell - pad * 2, cell * 0.25);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      if (g.status === "over") {
        ctx.fillStyle = `rgb(${c.down} / 0.12)`;
        ctx.fillRect(0, 0, w, cell * ROWS);
      }
    };

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const interval = Math.max(55, 125 - g.score * 4);
      if (g.status === "playing" && now - last >= interval) {
        last = now;
        step();
      }
      draw(now);
      if (g.status === "quit") cancelAnimationFrame(frame);
    };

    const onKey = (e: KeyboardEvent) => {
      if (g.status === "quit") return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (DIRS[key]) {
        e.preventDefault();
        turn(DIRS[key]);
      } else if (key === " " || key === "p") {
        e.preventDefault();
        if (g.status === "playing") setS("paused");
        else if (g.status === "paused") setS("playing");
      } else if (key === "r" && g.status === "over") {
        reset();
        setS("ready");
      } else if (key === "q" || key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        quit();
      }
    };

    // Swipe to steer on touch screens.
    let start: { x: number; y: number } | null = null;
    const onDown = (e: PointerEvent) => (start = { x: e.clientX, y: e.clientY });
    const onUp = (e: PointerEvent) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
      turn(Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) });
    };

    window.addEventListener("keydown", onKey, true);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    frame = requestAnimationFrame(tick);

    controls.current = { turn, quit, restart: () => (reset(), setS("ready")) };

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey, true);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      ro.disconnect();
    };
  }, [colors]);

  const done = status === "quit";

  const pad = (label: string, d: Dir, cls: string) => (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        controls.current?.turn(d);
      }}
      className={`${cls} grid h-10 w-10 place-items-center rounded-md border border-rule bg-canvas/40 text-dim active:text-azure`}
    >
      {label === "up" ? "▲" : label === "down" ? "▼" : label === "left" ? "◀" : "▶"}
    </button>
  );

  return (
    <span className={`my-2 block ${done ? "opacity-60" : ""}`}>
      <span className="flex items-center justify-between text-xs">
        <span>
          <span className="text-sky">snake</span> <span className="text-dim">·</span> score <span className="text-azure">{score}</span>{" "}
          <span className="text-dim">· best {Math.max(best, score)}</span>
        </span>
        <span className="text-dim">
          {status === "ready" && (touch ? "swipe or tap ▲ to start" : "press an arrow key to start")}
          {status === "playing" && (touch ? "" : "space pauses · q quits")}
          {status === "paused" && "paused · space resumes"}
          {status === "over" && <span className="text-down">game over · r restarts · q quits</span>}
          {status === "quit" && "exited"}
        </span>
      </span>
      <canvas ref={canvasRef} className="mt-2 block w-full touch-none rounded-md border border-rule bg-canvas/30" aria-label={`Snake game, score ${score}`} role="img" />
      {touch && !done && (
        <span className="mt-2 flex items-center justify-between">
          <span className="grid grid-cols-3 gap-1">
            {pad("up", DIRS.ArrowUp, "col-start-2")}
            {pad("left", DIRS.ArrowLeft, "col-start-1 row-start-2")}
            {pad("down", DIRS.ArrowDown, "col-start-2 row-start-2")}
            {pad("right", DIRS.ArrowRight, "col-start-3 row-start-2")}
          </span>
          <span className="flex flex-col gap-1 text-xs">
            {status === "over" && (
              <button type="button" onClick={() => controls.current?.restart()} className="rounded-md border border-rule px-3 py-1.5 text-azure">
                restart
              </button>
            )}
            <button type="button" onClick={() => controls.current?.quit()} className="rounded-md border border-rule px-3 py-1.5 text-dim">
              quit
            </button>
          </span>
        </span>
      )}
    </span>
  );
}
