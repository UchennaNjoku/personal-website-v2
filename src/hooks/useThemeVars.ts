"use client";

import { useEffect, useRef, type RefObject } from "react";

const TOKENS = ["bg", "panel", "rule", "paper", "dim", "azure", "sky", "violet", "up", "down"] as const;
export type ThemeVars = Record<(typeof TOKENS)[number], string>;

/**
 * The site palette (globals.css) as "r g b" strings for canvas drawing, e.g.
 * `rgb(${vars.current.azure} / 0.5)`. Re-read whenever the theme flips. Kept in a ref
 * so animation loops always see the latest values without re-rendering.
 */
export function useThemeVars(el?: RefObject<HTMLElement>) {
  const vars = useRef<ThemeVars>(Object.fromEntries(TOKENS.map((t) => [t, "128 128 128"])) as ThemeVars);

  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(el?.current ?? document.documentElement);
      for (const t of TOKENS) vars.current[t] = style.getPropertyValue(`--${t}`).trim() || vars.current[t];
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, [el]);

  return vars;
}
