"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "@/components/qd/ThemeToggle";

export const NAV = [
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

/** Fixed top bar: click-to-scroll links, a highlight on the section in view, and scroll progress. */
export default function SiteHeader({ resume }: { resume: string }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const mobileRow = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // A section counts as active once it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...NAV.map((n) => n.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Keep the active link visible in the horizontally scrolling mobile row.
  useEffect(() => {
    const row = mobileRow.current;
    const el = row?.querySelector<HTMLElement>("[aria-current]");
    if (row && el) row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
  };

  // Rendered twice (desktop row, mobile row); each copy needs its own layoutId.
  const links = (variant: string, ref?: React.Ref<HTMLUListElement>) => (
    <ul ref={ref} className="no-scrollbar relative flex items-center gap-1 overflow-x-auto">
      {NAV.map((n) => (
        <li key={n.id} className="shrink-0">
          <a
            href={`#${n.id}`}
            onClick={(e) => go(e, n.id)}
            aria-current={active === n.id ? "location" : undefined}
            className={`relative isolate block rounded-full px-3 py-1.5 text-sm transition-colors ${active === n.id ? "text-paper" : "text-dim hover:text-paper"}`}
          >
            {active === n.id && (
              <motion.span
                layoutId={`nav-pill-${variant}`}
                className="absolute inset-0 -z-10 rounded-full border border-azure/30 bg-azure/10"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            {n.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-rule/60 bg-canvas/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto max-w-5xl px-5">
        <div className="flex h-14 items-center justify-between gap-4">
          <a href="#top" onClick={(e) => go(e, "top")} className="group flex items-center gap-1 font-mono text-sm">
            <span className="text-azure">~</span>
            <span className="text-paper">/uchenna</span>
            <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-azure/80" aria-hidden="true" />
          </a>
          <div className="hidden md:block">{links("desktop")}</div>
          <div className="flex items-center gap-2">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-rule px-3 py-1.5 text-sm text-dim transition-colors hover:border-azure hover:text-azure"
            >
              Résumé
            </a>
            <ThemeToggle />
          </div>
        </div>
        <div className="-mx-2 pb-2 md:hidden">{links("mobile", mobileRow)}</div>
      </nav>
      <motion.div className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-azure/0 via-azure to-azure" style={{ scaleX: progress }} />
    </header>
  );
}
