"use client";

import React, { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className="font-mono text-xs text-dim hover:text-paper" aria-live="polite">
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}
