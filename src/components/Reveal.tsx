"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Fades and lifts its children into place the first time they scroll into view.
 *
 * Content is only hidden while <html data-reveal> is set (see layout.tsx). The inline
 * script there removes it if this component hasn't run within a few seconds, so the
 * page never stays blank when JavaScript fails to load.
 */
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.__revealReady = true;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
