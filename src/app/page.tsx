import React from "react";
import Image from "next/image";
import Terminal from "@/components/qd/Terminal";
import TerminalActions from "@/components/qd/TerminalActions";
import CopyEmail from "@/components/qd/CopyEmail";
import SiteHeader from "@/components/SiteHeader";
import HeroBackdrop from "@/components/HeroBackdrop";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import PursuitSim from "@/components/research/PursuitSim";
import VolSurface from "@/components/volsurf/VolSurface";
import { education, experience, honors, profile, projects, research, skills, volsurf } from "@/data/resume";

const link = "underline decoration-rule underline-offset-4 transition-colors hover:text-azure hover:decoration-azure";
const section = "scroll-mt-28 py-20 md:scroll-mt-20 md:py-28";

/** Logos for the "Solved problems at" row. Each jumps to that role in Experience. */
const COMPANIES: { slug: string; name: string; logos: { file: string; size: string }[] }[] = [
  { slug: "bloomberg", name: "Bloomberg", logos: [] },
  { slug: "goldman-sachs", name: "Goldman Sachs", logos: [{ file: "goldmansachs", size: "h-14 w-14" }] },
  {
    slug: "cisco-splunk",
    name: "Cisco · Splunk",
    logos: [
      { file: "cisco", size: "h-11 w-16" },
      { file: "splunk", size: "h-11 w-20" },
    ],
  },
  { slug: "aws-2024", name: "Amazon Web Services", logos: [{ file: "amazonwebservices", size: "h-11 w-16" }] },
  { slug: "gm-ecocar", name: "GM EcoCAR", logos: [{ file: "generalmotors", size: "h-10 w-10" }] },
];

function SectionHeading({ id, index, children }: { id: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal className="mb-12 flex items-center gap-4">
      <span className="font-mono text-sm text-azure" aria-hidden="true">
        {index}
      </span>
      <h2 id={`${id}-heading`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-rule to-transparent" aria-hidden="true" />
    </Reveal>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 font-mono text-[11px] text-dim" aria-label="Technologies">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-rule px-2 py-0.5">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-4 text-sm leading-relaxed text-dim">
      {items.map((b) => (
        <li key={b} className="list-['▹__'] pl-1 marker:text-azure">
          {b}
        </li>
      ))}
    </ul>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-up" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
    </span>
  );
}

/** Single-colour logo drawn with a CSS mask so it follows the text colour in both themes. */
function Logo({ name, className = "h-7 w-20" }: { name: string; className?: string }) {
  const url = `url(/logos/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{ maskImage: url, WebkitMaskImage: url, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }}
    />
  );
}

function Metric({ label, before, after, better }: (typeof research)[number]["results"][number]) {
  return (
    <div className="rounded-xl border border-rule bg-panel/50 p-4">
      <p className="font-mono text-xs text-dim">{label}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-sm text-dim line-through decoration-dim/50">{before}%</span>
        <span className="text-dim" aria-hidden="true">
          →
        </span>
        <span className="text-3xl font-semibold tracking-tight text-azure">{after}%</span>
        <span className="sr-only">{better} is better</span>
      </p>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-1.5 rounded-full bg-rule/60">
          <div className="h-full rounded-full bg-dim/60" style={{ width: `${before}%` }} />
        </div>
        <div className="h-1.5 rounded-full bg-rule/60">
          <div className="h-full rounded-full bg-azure shadow-[0_0_12px_rgb(var(--azure)/0.6)]" style={{ width: `${after}%` }} />
        </div>
      </div>
      <p className="mt-2 flex justify-between font-mono text-[10px] text-dim">
        <span>baseline</span>
        <span className="text-azure">with communication</span>
      </p>
    </div>
  );
}

export default function Home() {
  const current = experience.find((r) => r.current);
  const study = research[0];

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-azure focus:px-3 focus:py-2 focus:text-canvas">
        Skip to content
      </a>

      <SiteHeader resume={profile.resume} />

      <main id="main">
        {/* Landing: who I am on the left, the terminal on the right */}
        <section id="top" aria-labelledby="intro-heading" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pt-24">
          <HeroBackdrop />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-5 lg:gap-10">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="mb-6 inline-flex items-center gap-2 rounded-md border border-rule bg-panel/60 px-3 py-1 font-mono text-xs text-dim backdrop-blur">
                  <LiveDot />
                  {current?.title} @ {current?.company}
                </p>
                <h1 id="intro-heading" className="text-4xl font-semibold tracking-tight sm:text-6xl xl:text-7xl">
                  <span className="block text-2xl font-normal text-dim sm:text-3xl">Hi, I&apos;m</span>
                  <span className="mt-2 inline-flex flex-wrap items-center gap-x-4">
                    <span className="text-gradient">{profile.name}</span>
                    <Image src="/emoji/wave.png" alt="" width={64} height={64} priority className="wave h-[0.9em] w-[0.9em]" />
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-dim sm:text-xl">{profile.tagline}</p>
              </Reveal>

              <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-azure to-sky px-5 py-2.5 text-sm font-semibold text-canvas shadow-[0_8px_30px_-8px_rgb(var(--azure)/0.7)] transition-transform hover:-translate-y-0.5"
                >
                  See my résumé <span aria-hidden="true">→</span>
                </a>
                {[
                  { label: "GitHub", href: profile.github },
                  { label: "LinkedIn", href: profile.linkedin },
                  { label: "Email", href: `mailto:${profile.email}` },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="rounded-md border border-rule bg-panel/40 px-4 py-2.5 text-sm text-dim backdrop-blur transition-colors hover:border-azure hover:text-azure"
                  >
                    {l.label}
                  </a>
                ))}
              </Reveal>

              <Reveal delay={0.15} className="mt-8">
                <div className="flex max-w-xl items-center gap-4 rounded-xl border border-azure/40 bg-azure/10 p-4 backdrop-blur">
                  <Image src="/emoji/medal.png" alt="" width={64} height={64} className="h-10 w-10 shrink-0" />
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-paper">3rd of 2,000+</span> in the Jamaica National Mathematical Olympiad.{" "}
                    <span className="text-dim">Selected to represent Jamaica at the Central American &amp; Caribbean Mathematical Olympiad.</span>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-10">
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-dim">Solved problems at</p>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {COMPANIES.map((c) => {
                    const role = experience.find((r) => r.slug === c.slug);
                    return (
                      <li key={c.slug}>
                        <a
                          href={`#exp-${c.slug}`}
                          aria-label={`${c.name}: jump to experience`}
                          className="group flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-rule bg-panel/50 px-4 text-dim backdrop-blur transition-all hover:-translate-y-1 hover:border-azure hover:bg-azure/5 hover:text-paper hover:shadow-[0_10px_30px_-10px_rgb(var(--azure)/0.6)]"
                        >
                          <span className="flex h-14 items-center gap-3">
                            {c.logos.length ? c.logos.map((l) => <Logo key={l.file} name={l.file} className={l.size} />) : <span className="text-2xl font-bold tracking-tight">Bloomberg</span>}
                            {c.slug === "gm-ecocar" && <span className="text-sm font-semibold">EcoCAR</span>}
                          </span>
                          <span className="font-mono text-[11px] text-dim transition-colors group-hover:text-azure">
                            {role?.current ? `${role.start.slice(-4)} – now` : role?.end.slice(-4) === role?.start.slice(-4) ? role?.start.slice(-4) : `${role?.start.slice(-4)} – ${role?.end.slice(-4)}`}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="min-w-0 lg:col-span-2">
              <Terminal />
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5">
          <section id="experience" aria-labelledby="experience-heading" className={section}>
            <SectionHeading id="experience" index="01">
              Experience
            </SectionHeading>
            <ol className="relative ml-1.5 border-l border-rule">
              {experience.map((role, i) => (
                <li key={role.slug} id={`exp-${role.slug}`} className="exp-item relative scroll-mt-28 pb-6 pl-8 md:scroll-mt-24">
                  <span
                    className={`absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full border ${role.current ? "border-up bg-up shadow-[0_0_12px_rgb(var(--up))]" : "border-azure bg-canvas"}`}
                    aria-hidden="true"
                  />
                  <Reveal delay={Math.min(i * 0.05, 0.2)}>
                    <div className="exp-card -mx-4 rounded-xl px-4 py-4 transition-colors hover:bg-panel/60">
                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_auto] sm:gap-6">
                        <div>
                          <h3 className="text-lg font-medium">
                            {role.company}
                            {role.current && (
                              <span className="ml-2 rounded-md border border-up/40 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-up">
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-azure/90">{role.title}</p>
                        </div>
                        <p className="font-mono text-xs text-dim sm:pt-1.5 sm:text-right">
                          {role.start} – {role.end}
                        </p>
                      </div>
                      {role.bullets.length > 0 && (
                        <div className="mt-4">
                          <Bullets items={role.bullets} />
                        </div>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          <section id="research" aria-labelledby="research-heading" className={section}>
            <SectionHeading id="research" index="02">
              Research &amp; featured project
            </SectionHeading>

            {/* Research: text left, live environment right */}
            <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
              <div>
                <Reveal>
                  <p className="mb-3 font-mono text-xs uppercase tracking-wider text-azure">Research</p>
                  {study.award && (
                    <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-azure/40 bg-azure/10 px-3 py-1 text-xs text-azure">
                      <span aria-hidden="true">★</span> {study.award}
                    </p>
                  )}
                  <h3 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{study.title}</h3>
                  <p className="mt-4 leading-relaxed text-dim">{study.summary}</p>
                </Reveal>

                <Reveal delay={0.1} className="mt-8 grid gap-3 sm:grid-cols-2">
                  {study.results.map((m) => (
                    <Metric key={m.label} {...m} />
                  ))}
                  <div className="rounded-xl border border-rule bg-panel/50 p-4 sm:col-span-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-mono text-xs text-dim">Channel entropy</p>
                      <p className="font-mono text-sm">
                        <span className="text-xl font-semibold text-sky">3.99</span>
                        <span className="text-dim"> / 4.00 bits</span>
                      </p>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-rule/60" aria-hidden="true">
                      <div className="h-full w-[99.75%] rounded-full bg-sky shadow-[0_0_12px_rgb(var(--sky)/0.6)]" />
                    </div>
                    <p className="mt-2 text-xs text-dim">The agents use nearly every symbol: functional signalling, but not a symbolic language.</p>
                  </div>
                </Reveal>

                <Reveal delay={0.15} className="mt-8 space-y-5">
                  <Bullets items={study.bullets} />
                  <Stack items={study.stack} />
                  <TerminalActions command="pursuit" share="research" />
                </Reveal>
              </div>

              <Reveal delay={0.1} className="lg:sticky lg:top-24">
                <PursuitSim />
              </Reveal>
            </div>

            {/* Featured project: live surface left, text right */}
            <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
              <Reveal className="order-2 lg:sticky lg:top-24 lg:order-1">
                <VolSurface />
              </Reveal>
              <div className="order-1 lg:order-2">
                <Reveal>
                  <p className="mb-3 font-mono text-xs uppercase tracking-wider text-azure">Featured project</p>
                  <h3 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{volsurf.name}</h3>
                  <p className="mt-1 text-azure/90">{volsurf.tagline}</p>
                  <p className="mt-4 leading-relaxed text-dim">{volsurf.description}</p>
                </Reveal>
                <Reveal delay={0.1} className="mt-6 space-y-5">
                  {volsurf.details && <Bullets items={volsurf.details} />}
                  <Stack items={volsurf.stack} />
                  <TerminalActions command="volsurf" share="volsurf" />
                </Reveal>
              </div>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading" className={section}>
            <SectionHeading id="projects" index="03">
              Projects
            </SectionHeading>
            <ul className="grid gap-4 sm:grid-cols-2">
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 2) * 0.08} className="h-full">
                    <Spotlight className="flex h-full flex-col rounded-2xl border border-rule bg-panel/40 p-5 transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="text-sm text-azure/90">{p.tagline}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">{p.description}</p>
                      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                        <Stack items={p.stack} />
                        {(p.live || p.github) && (
                          <p className="flex gap-4 text-sm">
                            {p.live && (
                              <a href={p.live} target="_blank" rel="noopener noreferrer" className={link}>
                                Live ↗
                              </a>
                            )}
                            {p.github && (
                              <a href={p.github} target="_blank" rel="noopener noreferrer" className={link}>
                                Code ↗
                              </a>
                            )}
                          </p>
                        )}
                      </div>
                    </Spotlight>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <section id="background" aria-labelledby="background-heading" className={section}>
            <SectionHeading id="background" index="04">
              Background
            </SectionHeading>
            <ul className="grid gap-4 sm:grid-cols-2">
              {honors.map((h, i) => (
                <li key={h.title}>
                  <Reveal delay={(i % 2) * 0.08} className="h-full">
                    <Spotlight className="h-full rounded-2xl border border-rule bg-panel/40 p-5">
                      <p className="font-medium">{h.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-dim">{h.detail}</p>
                    </Spotlight>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-dim">Education</dt>
                <dd className="mb-3 sm:mb-0">
                  {education.degree}, {education.school}, class of {education.year} · {education.note}
                </dd>
                {Object.entries(skills).map(([group, items]) => (
                  <React.Fragment key={group}>
                    <dt className="font-mono text-dim">{group}</dt>
                    <dd className="mb-3 sm:mb-0">
                      <Stack items={items} />
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </Reveal>
          </section>

          <section id="contact" aria-labelledby="contact-heading" className={`${section} pb-32`}>
            <SectionHeading id="contact" index="05">
              Contact
            </SectionHeading>
            <Reveal>
              <p className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Let&apos;s <span className="text-gradient">talk</span>.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-dim">Email is the best way to reach me.</p>
              <p className="mt-8 flex flex-wrap items-center gap-3 text-lg sm:text-2xl">
                <a href={`mailto:${profile.email}`} className={link}>
                  {profile.email}
                </a>
                <CopyEmail email={profile.email} />
              </p>
              <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className={link}>
                  GitHub
                </a>
                <a href={profile.phoneHref} className={link}>
                  {profile.phone}
                </a>
              </p>
            </Reveal>
          </section>
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-5 py-8 font-mono text-xs text-dim">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
      </footer>
    </>
  );
}
