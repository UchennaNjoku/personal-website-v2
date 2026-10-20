"use client";

import React, { createContext, useContext } from "react";

export interface TerminalApi {
  /** Run a command as if it had been typed. */
  run: (command: string) => void;
  /** While busy (e.g. a game is running) the prompt is hidden and keys go to the game. */
  setBusy: (busy: boolean) => void;
  /** Print a line of output without a prompt. */
  print: (output: React.ReactNode) => void;
}

export const TerminalContext = createContext<TerminalApi>({ run: () => {}, setBusy: () => {}, print: () => {} });

export const useTerminal = () => useContext(TerminalContext);

/** Inline text in terminal output that runs a command when clicked. */
export function Run({ cmd, children, className = "text-azure" }: { cmd: string; children?: React.ReactNode; className?: string }) {
  const { run } = useTerminal();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        run(cmd);
      }}
      className={`${className} underline decoration-current/30 decoration-dotted underline-offset-4 transition-colors hover:decoration-solid`}
    >
      {children ?? cmd}
    </button>
  );
}
