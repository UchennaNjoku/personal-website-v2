"use client";

import React, { useState } from "react";
import { runInTerminal } from "./Terminal";

/** "Run in terminal" and "Share" buttons for a section that also lives in the terminal. */
export default function TerminalActions({ command, share }: { command: string; share: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${location.origin}${location.pathname}?run=${encodeURIComponent(share)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const btn = "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors";
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => runInTerminal(command)} className={`${btn} border-azure/50 bg-azure/10 text-azure hover:bg-azure/20`}>
        <span aria-hidden="true">›_</span> run <span className="text-paper">{command}</span> in the terminal
      </button>
      <button type="button" onClick={copy} className={`${btn} border-rule text-dim hover:border-azure hover:text-azure`} aria-live="polite">
        {copied ? "link copied ✓" : "share ↗"}
      </button>
    </div>
  );
}
