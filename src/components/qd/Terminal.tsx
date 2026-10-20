"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Banner, COMMANDS, complete, formatCwd, isShareable, type Env, type TerminalSize } from "./commands";
import { TerminalContext, type TerminalApi } from "./TerminalContext";
import MatrixRain from "./MatrixRain";

interface Entry {
  id: number;
  cwd?: string;
  command?: string;
  output: React.ReactNode;
}

const SUGGESTIONS = ["experience", "research", "volsurf", "projects", "snake", "pursuit", "help"];
const BOOT_COMMAND = "whoami";

/** Page buttons run commands here with `runInTerminal("pursuit")`. */
export const RUN_EVENT = "terminal:run";
export const runInTerminal = (command: string) => window.dispatchEvent(new CustomEvent(RUN_EVENT, { detail: command }));

function Prompt({ cwd }: { cwd: string }) {
  return (
    <span aria-hidden="true" className="shrink-0">
      <span className="text-up">uchenna@njoku</span>:<span className="text-sky">{cwd}</span>$
    </span>
  );
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [cwd, setCwd] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [caret, setCaret] = useState(0);
  const [focused, setFocused] = useState(false);
  const [size, setSize] = useState<TerminalSize>("normal");
  const [busy, setBusyState] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const nextId = useRef(0);
  const touched = useRef(false);
  const busyRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState(0);

  const push = useCallback((entry: Omit<Entry, "id">) => {
    setEntries((prev) => [...prev, { ...entry, id: nextId.current++ }]);
  }, []);

  const setLine = (line: string) => {
    setInput(line);
    setCaret(line.length);
  };

  const run = (raw: string) => {
    const line = raw.trim();
    const shownCwd = formatCwd(cwd);
    if (!line) {
      push({ cwd: shownCwd, command: "", output: null });
      return;
    }
    history.current.push(line);
    historyIndex.current = -1;

    const [name, ...args] = line.split(/\s+/);
    const command = COMMANDS[name.toLowerCase()];
    let cleared = false;
    const env: Env = {
      cwd,
      setCwd,
      history: history.current,
      clear: () => {
        cleared = true;
        setEntries([]);
      },
      effect: () => {
        if (!reducedMotion()) setMatrix(true);
      },
      setSize,
    };
    const output = command ? (
      command.run(args, env)
    ) : (
      <span className="text-down">
        command not found: {name}. Type <span className="text-azure">help</span> for a list.
      </span>
    );
    if (!cleared) push({ cwd: shownCwd, command: line, output });
  };
  const runRef = useRef(run);
  runRef.current = run;

  const takeOver = () => {
    if (touched.current) return;
    touched.current = true;
    setLine("");
  };

  // Stable API for anything rendered inside the terminal (clickable commands, games).
  // Running a command this way also opens the terminal fullscreen.
  const api = useMemo<TerminalApi>(
    () => ({
      run: (command) => {
        if (busyRef.current) return;
        takeOver();
        setSize("full");
        runRef.current(command);
        // Keep typing straight away (not on touch screens, where it would pop the keyboard up).
        if (window.matchMedia("(pointer: fine)").matches) window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
      },
      setBusy: (b) => {
        busyRef.current = b;
        setBusyState(b);
        if (b) inputRef.current?.blur();
        else window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
      },
      print: (output) => push({ output }),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push],
  );

  // Boot: banner, then type out a command like someone is at the keyboard: `whoami`,
  // or whatever a shared link asked for (?run=research). Real input cancels the typing.
  useEffect(() => {
    setEntries([
      {
        id: nextId.current++,
        output: (
          <>
            <span className="mb-3 mt-1 hidden flex-col gap-1.5 sm:flex" aria-hidden="true">
              <Banner word="UCHENNA" />
              <Banner word="NJOKU" />
            </span>
            <span className="text-dim">Last login: {new Date().toDateString()} on ttys001</span>
          </>
        ),
      },
    ]);

    const requested = new URLSearchParams(location.search).get("run");
    const boot = requested && isShareable(requested) ? requested.slice(0, 60) : BOOT_COMMAND;

    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => !touched.current && fn(), ms));
    const finish = () => {
      setLine("");
      runRef.current(boot);
      push({
        output: (
          <span className="text-dim">
            Type <span className="text-azure">help</span>, or click a command below.
          </span>
        ),
      });
    };

    if (reducedMotion()) {
      later(0, finish);
    } else {
      for (let i = 1; i <= boot.length; i++) later(700 + i * 90, () => setLine(boot.slice(0, i)));
      later(700 + boot.length * 90 + 350, finish);
    }
    return () => timers.forEach(clearTimeout);
  }, [push]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, size]);

  // Buttons elsewhere on the page can run commands here.
  useEffect(() => {
    const onRun = (e: Event) => {
      const command = (e as CustomEvent<string>).detail;
      api.run(command);
    };
    window.addEventListener(RUN_EVENT, onRun);
    return () => window.removeEventListener(RUN_EVENT, onRun);
  }, [api]);

  // Remember the in-page height so the layout keeps its shape while fullscreen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (getComputedStyle(el).position !== "fixed") setPlaceholder(el.offsetHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fullscreen: Esc exits, and the page behind doesn't scroll.
  useEffect(() => {
    if (size !== "full") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busyRef.current) setSize("normal");
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [size]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    takeOver();
    if (e.key === "Enter") {
      // Any real command opens the terminal fullscreen; a command like `exit` can still shrink it.
      if (input.trim()) setSize("full");
      run(input);
      setLine("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const h = history.current;
      if (!h.length) return;
      e.preventDefault();
      let i = historyIndex.current;
      if (e.key === "ArrowUp") i = i === -1 ? h.length - 1 : Math.max(0, i - 1);
      else i = i === -1 ? -1 : i + 1 >= h.length ? -1 : i + 1;
      historyIndex.current = i;
      setLine(i === -1 ? "" : h[i]);
    } else if (e.key === "Tab") {
      const result = complete(input, cwd);
      if (!result) return;
      e.preventDefault();
      setLine(result.line);
      if (result.options) push({ cwd: formatCwd(cwd), command: input, output: result.options.join("   ") });
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const syncCaret = (e: React.SyntheticEvent<HTMLInputElement>) => setCaret(e.currentTarget.selectionStart ?? input.length);

  // Spotlight that follows the pointer inside the window; set as CSS vars to avoid re-renders.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const at = Math.min(caret, input.length);
  const full = size === "full";

  return (
    <TerminalContext.Provider value={api}>
      {full && (
        <>
          <div style={{ height: placeholder }} aria-hidden="true" />
          <div className="term-backdrop fixed inset-0 z-40 bg-canvas/50 backdrop-blur-sm" onClick={() => setSize("normal")} aria-hidden="true" />
        </>
      )}
      <div
        ref={rootRef}
        onPointerMove={onPointerMove}
        role={full ? "dialog" : undefined}
        aria-modal={full || undefined}
        aria-label={full ? "Terminal" : undefined}
        className={`term term-frame group/term rounded-xl font-mono text-[13px] leading-relaxed text-paper ${
          full ? "fixed inset-2 z-50 flex flex-col sm:inset-6" : "relative"
        }`}
      >
        <div className={`term-glass relative overflow-hidden rounded-[11px] ${full ? "flex min-h-0 flex-1 flex-col" : ""}`}>
          <div className="term-spotlight pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="term-scan pointer-events-none absolute inset-0 z-10" aria-hidden="true" />

          <div className="relative flex items-center gap-2 border-b border-rule/70 px-4 py-2.5">
            <button type="button" onClick={() => setEntries([])} aria-label="Clear terminal" title="clear" className="term-dot bg-[#ff5f57]">
              ×
            </button>
            <button
              type="button"
              onClick={() => setSize((s) => (s === "min" ? "normal" : "min"))}
              aria-label={size === "min" ? "Restore terminal" : "Minimize terminal"}
              title={size === "min" ? "restore" : "minimize"}
              className="term-dot bg-[#febc2e]"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setSize((s) => (s === "full" ? "normal" : "full"))}
              aria-label={full ? "Exit fullscreen" : "Expand terminal to fullscreen"}
              title={full ? "exit fullscreen (Esc)" : "fullscreen"}
              className="term-dot bg-[#28c840]"
            >
              {full ? "↙" : "↗"}
            </button>
            <span className="flex-1 truncate pr-12 text-center text-xs text-dim">uchenna@njoku: {formatCwd(cwd)} — zsh</span>
          </div>

          {size !== "min" && (
            <>
              <div
                ref={scrollRef}
                className={`term-screen relative overflow-y-auto px-4 py-3 ${full ? "min-h-0 flex-1" : "h-[380px] sm:h-[440px]"}`}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (busyRef.current || target.closest("button, a, input, label, canvas, figure")) return;
                  if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
                }}
              >
                <div role="log" aria-live="polite" aria-label="Terminal output" className={`term-glow ${full ? "mx-auto max-w-5xl" : ""}`}>
                  {entries.map((entry) => (
                    <div key={entry.id} className="term-line mb-1">
                      {entry.command !== undefined && (
                        <div className="whitespace-pre-wrap break-words">
                          <Prompt cwd={entry.cwd ?? "~"} /> {entry.command}
                        </div>
                      )}
                      {entry.output !== null && entry.output !== undefined && (
                        <div className="whitespace-pre-wrap break-words">{entry.output}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={`term-glow flex items-start gap-2 ${busy ? "hidden" : ""} ${full ? "mx-auto max-w-5xl" : ""}`}>
                  <Prompt cwd={formatCwd(cwd)} />
                  <div className="relative min-w-0 flex-1">
                    <span aria-hidden="true" className="whitespace-pre-wrap break-all">
                      {input.slice(0, at)}
                      <span className={`term-caret ${focused ? "is-focused" : ""}`}>{input[at] ?? " "}</span>
                      {input.slice(at + 1)}
                    </span>
                    <input
                      ref={inputRef}
                      value={input}
                      disabled={busy}
                      onChange={(e) => {
                        takeOver();
                        setInput(e.target.value);
                        syncCaret(e);
                      }}
                      onKeyDown={onKeyDown}
                      onSelect={syncCaret}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      aria-label="Terminal command"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="relative flex flex-wrap gap-1.5 border-t border-rule/70 px-4 py-3" aria-label="Suggested commands">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={busy}
                    onClick={() => api.run(s)}
                    className="rounded-md border border-rule bg-canvas/30 px-2 py-1 text-xs text-dim transition-all hover:-translate-y-0.5 hover:border-azure hover:text-azure hover:shadow-[0_0_16px_-4px_rgb(var(--azure)/0.6)] focus-visible:text-azure disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
        </div>
      </div>
    </TerminalContext.Provider>
  );
}
