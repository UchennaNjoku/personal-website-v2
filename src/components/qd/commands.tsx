import React, { useEffect, useState } from "react";
import { education, experience, honors, profile, projects, research, skills, volsurf, type Project, type Research, type Role } from "@/data/resume";
import PursuitSim from "@/components/research/PursuitSim";
import VolSurface from "@/components/volsurf/VolSurface";
import SnakeGame from "./SnakeGame";
import { Run } from "./TerminalContext";

/* ------------------------------------------------------------------ */
/* Virtual filesystem, generated from the résumé data                  */
/* ------------------------------------------------------------------ */

type FileNode = { type: "file"; content: () => React.ReactNode; onOpen?: () => void };
type DirNode = { type: "dir"; children: Record<string, FsNode> };
type FsNode = FileNode | DirNode;

const file = (content: () => React.ReactNode, onOpen?: () => void): FileNode => ({ type: "file", content, onOpen });

const ext = (href: string, label = href.replace(/^https?:\/\//, "").replace(/\/$/, "")) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-azure underline underline-offset-2 hover:text-paper">
    {label}
  </a>
);

const allProjects = [volsurf, ...projects];

function roleText(r: Role) {
  return (
    <>
      <span className="font-medium text-azure">{r.company}</span> — {r.title}
      {r.current && <span className="text-up"> ● current</span>}
      {"\n"}
      <span className="text-dim">
        {r.start} – {r.end}
      </span>
      {"\n"}
      {r.bullets.length ? r.bullets.map((b) => `  • ${b}`).join("\n") : <span className="text-dim">  • Just started. Ask me about it in a few months.</span>}
    </>
  );
}

function projectText(p: Project) {
  return (
    <>
      <span className="text-azure"># {p.name}</span> — {p.tagline}
      {"\n\n"}
      {p.description}
      {p.details?.length ? "\n\n" + p.details.map((d) => `- ${d}`).join("\n") : ""}
      {"\n\n"}
      <span className="text-dim">stack:</span> {p.stack.join(", ")}
      {p.live && (
        <>
          {"\n"}
          <span className="text-dim">live:</span> {ext(p.live)}
        </>
      )}
      {p.github && (
        <>
          {"\n"}
          <span className="text-dim">code:</span> {ext(p.github)}
        </>
      )}
    </>
  );
}

function researchText(r: Research) {
  return (
    <>
      <span className="text-azure"># {r.title}</span>
      {r.award && (
        <>
          {"\n"}
          <span className="text-up">★ {r.award}</span>
        </>
      )}
      {"\n\n"}
      {r.summary}
      {"\n\n"}
      {r.bullets.map((b) => `- ${b}`).join("\n")}
      {"\n\n"}
      <span className="text-dim">{"".padEnd(28)}baseline  with comm</span>
      {"\n"}
      {r.results.map((m) => `${m.label.padEnd(28)}${`${m.before}%`.padStart(8)}  ${`${m.after}%`.padStart(9)}`).join("\n")}
      {"\n\n"}
      <span className="text-dim">stack:</span> {r.stack.join(", ")}
    </>
  );
}

function aboutText() {
  const current = experience.find((r) => r.current);
  return (
    <>
      <span className="text-azure">{profile.name}</span> — {profile.tagline}
      {"\n\n"}
      {profile.intro}
      {"\n\n"}
      <span className="text-dim">now        </span> {current?.title}, {current?.company}
      {"\n"}
      <span className="text-dim">education  </span> {education.degree}, {education.school} ({education.year}), {education.note}
      {"\n"}
      <span className="text-dim">math       </span> 3rd of 2,000+ in the Jamaica National Mathematical Olympiad
      {"\n\n"}
      <span className="text-dim">next: </span>
      <Run cmd="experience" /> <Run cmd="research" /> <Run cmd="projects" /> <Run cmd="awards" />
    </>
  );
}

function contactText() {
  return (
    <>
      <span className="text-dim">email    </span>{" "}
      <a className="text-azure underline underline-offset-2" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      {"\n"}
      <span className="text-dim">linkedin </span> {ext(profile.linkedin)}
      {"\n"}
      <span className="text-dim">github   </span> {ext(profile.github)}
      {"\n"}
      <span className="text-dim">phone    </span> {profile.phone}
    </>
  );
}

const skillsText = () =>
  Object.entries(skills)
    .map(([group, items]) => `${group.padEnd(15)}${items.join(", ")}`)
    .join("\n");

const awardsText = () => honors.map((h) => `★ ${h.title}\n  ${h.detail}`).join("\n\n");

export const FS: DirNode = {
  type: "dir",
  children: {
    "about.txt": file(aboutText),
    "contact.txt": file(contactText),
    "resume.pdf": file(
      () => "Opening résumé in a new tab…",
      () => window.open(profile.resume, "_blank", "noopener"),
    ),
    "skills.txt": file(skillsText),
    "awards.txt": file(awardsText),
    experience: {
      type: "dir",
      children: Object.fromEntries(experience.map((r) => [`${r.slug}.txt`, file(() => roleText(r))])),
    },
    research: {
      type: "dir",
      children: Object.fromEntries(research.map((r) => [`${r.slug}.md`, file(() => researchText(r))])),
    },
    projects: {
      type: "dir",
      children: Object.fromEntries(allProjects.map((p) => [`${p.slug}.md`, file(() => projectText(p))])),
    },
  },
};

/** Resolve a path (absolute, ~-relative or relative to cwd) to normalized segments. */
export function resolve(cwd: string[], path = ""): string[] {
  const parts = path.startsWith("/") || path.startsWith("~") ? [] : [...cwd];
  for (const seg of path.replace(/^~/, "").split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts;
}

export function lookup(segments: string[]): FsNode | null {
  let node: FsNode = FS;
  for (const seg of segments) {
    if (node.type !== "dir" || !(seg in node.children)) return null;
    node = node.children[seg];
  }
  return node;
}

export const formatCwd = (cwd: string[]) => (cwd.length ? `~/${cwd.join("/")}` : "~");

/* ------------------------------------------------------------------ */
/* Black-Scholes, for the hidden `bs` easter egg                       */
/* ------------------------------------------------------------------ */

// Standard normal CDF via Abramowitz & Stegun 26.2.17 (|error| < 7.5e-8).
function normCdf(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const poly = t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const tail = (Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI)) * poly;
  return x >= 0 ? 1 - tail : tail;
}

const normPdf = (x: number) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

export function blackScholes(S: number, K: number, T: number, r: number, sigma: number) {
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const df = Math.exp(-r * T);
  return {
    call: S * normCdf(d1) - K * df * normCdf(d2),
    put: K * df * normCdf(-d2) - S * normCdf(-d1),
    callDelta: normCdf(d1),
    putDelta: normCdf(d1) - 1,
    gamma: normPdf(d1) / (S * sigma * sqrtT),
    vega: (S * normPdf(d1) * sqrtT) / 100,
    parity: S - K * df,
  };
}

/* ------------------------------------------------------------------ */
/* Commands                                                            */
/* ------------------------------------------------------------------ */

export type TerminalSize = "normal" | "full" | "min";

export interface Env {
  cwd: string[];
  setCwd: (cwd: string[]) => void;
  clear: () => void;
  history: string[];
  /** Play a visual effect over the terminal. */
  effect: (name: "matrix") => void;
  setSize: (size: TerminalSize) => void;
}

type Group = "explore" | "play" | "shell";

type Command = {
  usage: string;
  description: string;
  group?: Group;
  /** Hidden commands work but are left out of help and tab completion. */
  hidden?: boolean;
  run: (args: string[], env: Env) => React.ReactNode;
};

const LINKS: Record<string, string> = { github: profile.github, linkedin: profile.linkedin, resume: profile.resume, email: `mailto:${profile.email}` };

const err = (msg: string) => <span className="text-down">{msg}</span>;

function listDir(node: DirNode, path: string[]) {
  const names = Object.keys(node.children);
  return names.map((name, i) => {
    const isDir = node.children[name].type === "dir";
    // Absolute, so the command still works after a cd.
    const full = `~/${[...path, name].join("/")}`;
    return (
      <React.Fragment key={name}>
        <Run cmd={isDir ? `ls ${full}` : `cat ${full}`} className={isDir ? "font-medium text-sky" : "text-paper"}>
          {name}
          {isDir ? "/" : ""}
        </Run>
        {i < names.length - 1 ? "   " : ""}
      </React.Fragment>
    );
  });
}

function tree(node: DirNode, prefix = ""): string {
  const entries = Object.entries(node.children);
  return entries
    .map(([name, child], i) => {
      const last = i === entries.length - 1;
      const line = `${prefix}${last ? "└── " : "├── "}${name}${child.type === "dir" ? "/" : ""}`;
      return child.type === "dir" ? `${line}\n${tree(child, prefix + (last ? "    " : "│   "))}` : line;
    })
    .join("\n");
}

/** Commands that are safe to start the terminal with from a shared link. */
const UNSHAREABLE = new Set(["clear", "theme", "history", "share", "fullscreen", "exit", "resume", "open", "cd", "rm", "sudo"]);
export const isShareable = (line: string) => {
  const name = line.trim().split(/\s+/)[0]?.toLowerCase();
  return !!name && name in COMMANDS && !UNSHAREABLE.has(name);
};

/** Copies the link on mount and reports whether the clipboard accepted it. */
function ShareLink({ line }: { line: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState<boolean | null>(null);
  useEffect(() => {
    const u = `${location.origin}${location.pathname}?run=${encodeURIComponent(line)}`;
    setUrl(u);
    navigator.clipboard?.writeText(u).then(
      () => setCopied(true),
      () => setCopied(false),
    );
  }, [line]);
  return (
    <>
      {copied ? <span className="text-up">✓ Link copied. </span> : copied === false ? <span className="text-dim">Copy this link. </span> : null}
      Whoever opens it lands here with <span className="text-azure">{line}</span> already running:
      {"\n"}
      {url && ext(url, url.replace(/^https?:\/\//, ""))}
    </>
  );
}

export const COMMANDS: Record<string, Command> = {
  help: {
    usage: "help",
    description: "List commands",
    group: "shell",
    run: () => {
      const groups: [Group, string][] = [
        ["explore", "Explore"],
        ["play", "Play"],
        ["shell", "Shell"],
      ];
      return (
        <>
          {groups.map(([g, title]) => (
            <React.Fragment key={g}>
              <span className="text-dim">{title}</span>
              {"\n"}
              {Object.entries(COMMANDS)
                .filter(([, c]) => c.group === g && !c.hidden)
                .map(([name, c]) => (
                  <React.Fragment key={name}>
                    {"  "}
                    <Run cmd={name}>{name}</Run>
                    {" ".repeat(Math.max(1, 12 - name.length))}
                    <span className="text-dim">{c.description}</span>
                    {"\n"}
                  </React.Fragment>
                ))}
              {"\n"}
            </React.Fragment>
          ))}
          <span className="text-dim">Click any underlined word to run it. Tab completes, ↑/↓ walk history, Ctrl+L clears.</span>
        </>
      );
    },
  },

  // Explore
  about: { usage: "about", description: "Who I am", group: "explore", run: aboutText },
  experience: {
    usage: "experience [company]",
    description: "Every role, in full",
    group: "explore",
    run: (args) => {
      const q = args.join(" ").toLowerCase();
      const roles = q ? experience.filter((r) => r.slug.includes(q) || r.company.toLowerCase().includes(q)) : experience;
      if (!roles.length) return err(`experience: no role matching "${q}". Try: ${experience.map((r) => r.slug).join(", ")}`);
      return roles.map((r, i) => (
        <React.Fragment key={r.slug}>
          {roleText(r)}
          {i < roles.length - 1 ? "\n\n" : ""}
        </React.Fragment>
      ));
    },
  },
  research: {
    usage: "research",
    description: "Emergent communication in multi-agent RL",
    group: "explore",
    run: () => (
      <>
        {researchText(research[0])}
        {"\n\n"}
        <span className="text-dim">see it: </span>
        <Run cmd="pursuit" />
        <span className="text-dim"> · send it to someone: </span>
        <Run cmd="share research" />
      </>
    ),
  },
  projects: {
    usage: "projects",
    description: "Things I've built",
    group: "explore",
    run: () => (
      <>
        {allProjects.map((p) => (
          <React.Fragment key={p.slug}>
            <Run cmd={p === volsurf ? "volsurf" : `cat projects/${p.slug}.md`}>{p.name}</Run>
            {" ".repeat(Math.max(1, 18 - p.name.length))}
            <span className="text-dim">{p.tagline}</span>
            {"\n"}
          </React.Fragment>
        ))}
        {"\n"}
        <span className="text-dim">Click a name for details.</span>
      </>
    ),
  },
  volsurf: {
    usage: "volsurf",
    description: "VolSurf-CPP, with a live 3D surface",
    group: "explore",
    run: () => (
      <>
        {projectText(volsurf)}
        <span className="my-2 block max-w-xl whitespace-normal">
          <VolSurface />
        </span>
      </>
    ),
  },
  skills: { usage: "skills", description: "Languages and tools", group: "explore", run: skillsText },
  education: {
    usage: "education",
    description: "School",
    group: "explore",
    run: () => `${education.degree}\n${education.school}, class of ${education.year}\n${education.note}`,
  },
  awards: { usage: "awards", description: "Olympiad, robotics, research", group: "explore", run: awardsText },
  contact: { usage: "contact", description: "How to reach me", group: "explore", run: contactText },
  resume: {
    usage: "resume",
    description: "Open my résumé (PDF)",
    group: "explore",
    run: () => {
      window.open(profile.resume, "_blank", "noopener");
      return "Opening résumé in a new tab…";
    },
  },

  // Play
  snake: { usage: "snake", description: "Play snake (arrows or swipe)", group: "play", run: () => <SnakeGame /> },
  pursuit: {
    usage: "pursuit",
    description: "The research environment, live",
    group: "play",
    run: () => (
      <span className="my-2 block max-w-md whitespace-normal">
        <PursuitSim />
      </span>
    ),
  },
  matrix: {
    usage: "matrix",
    description: "Wake up, Neo",
    group: "play",
    run: (_, env) => {
      env.effect("matrix");
      return <span className="text-up">Follow the white rabbit.</span>;
    },
  },
  neofetch: { usage: "neofetch", description: "System information", group: "play", run: () => <Neofetch /> },

  // Shell
  share: {
    usage: "share [command]",
    description: "Copy a link that opens here running a command",
    group: "shell",
    run: (args) => {
      const line = args.join(" ") || "research";
      if (!isShareable(line)) return err(`share: can't share "${line}". Try share research, share pursuit or share snake.`);
      return <ShareLink line={line} />;
    },
  },
  fullscreen: {
    usage: "fullscreen",
    description: "Expand the terminal (Esc exits)",
    group: "shell",
    run: (_, env) => {
      env.setSize("full");
      return <span className="text-dim">Expanded. Press Esc or run exit to shrink.</span>;
    },
  },
  ls: {
    usage: "ls [dir]",
    description: "List files",
    group: "shell",
    run: (args, env) => {
      const path = resolve(env.cwd, args[0]);
      const node = lookup(path);
      if (!node) return err(`ls: ${args[0]}: No such file or directory`);
      if (node.type === "file") return args[0];
      return listDir(node, path);
    },
  },
  cd: {
    usage: "cd <dir>",
    description: "Change directory",
    group: "shell",
    run: (args, env) => {
      const target = resolve(env.cwd, args[0] ?? "~");
      const node = lookup(target);
      if (!node) return err(`cd: ${args[0]}: No such file or directory`);
      if (node.type !== "dir") return err(`cd: ${args[0]}: Not a directory`);
      env.setCwd(target);
      return null;
    },
  },
  cat: {
    usage: "cat <file>",
    description: "Print a file",
    group: "shell",
    run: (args, env) => {
      if (!args[0]) return err("cat: missing file operand. Try 'cat about.txt'");
      const node = lookup(resolve(env.cwd, args[0]));
      if (!node) return err(`cat: ${args[0]}: No such file or directory`);
      if (node.type === "dir") return err(`cat: ${args[0]}: Is a directory`);
      node.onOpen?.();
      return node.content();
    },
  },
  tree: { usage: "tree", description: "Show every file", group: "shell", run: () => `~\n${tree(FS)}` },
  open: {
    usage: "open <link>",
    description: "Open github, linkedin, resume or email",
    group: "shell",
    run: (args) => {
      const target = (args[0] ?? "").toLowerCase();
      if (target in LINKS) {
        window.open(LINKS[target], "_blank", "noopener");
        return `Opening ${target}…`;
      }
      return err(`open: try one of ${Object.keys(LINKS).join(", ")}`);
    },
  },
  theme: {
    usage: "theme",
    description: "Toggle light / dark",
    group: "shell",
    run: () => {
      const root = document.documentElement;
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return `Theme set to ${next}.`;
    },
  },
  history: {
    usage: "history",
    description: "Previously run commands",
    group: "shell",
    run: (_, env) => env.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n") || "(empty)",
  },
  clear: {
    usage: "clear",
    description: "Clear the screen",
    group: "shell",
    run: (_, env) => {
      env.clear();
      return null;
    },
  },

  // Hidden quirks
  whoami: { usage: "whoami", description: "", hidden: true, run: () => `${profile.name}\n${profile.tagline}` },
  exit: {
    usage: "exit",
    description: "",
    hidden: true,
    run: (_, env) => {
      env.setSize("normal");
      return "There is no escape. (But the terminal is smaller now.)";
    },
  },
  bs: {
    usage: "bs <S> <K> <T> <r> <σ>",
    description: "",
    hidden: true,
    run: (args) => {
      const nums = args.map(Number);
      if (nums.length !== 5 || nums.some((n) => !Number.isFinite(n))) {
        return (
          <>
            usage: bs &lt;spot&gt; &lt;strike&gt; &lt;years&gt; &lt;rate&gt; &lt;vol&gt;
            {"\n"}
            <span className="text-dim">e.g.  bs 100 105 0.5 0.04 0.22</span>
          </>
        );
      }
      const [S, K, T, r, sigma] = nums;
      if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) return err("bs: spot, strike, time and vol must be positive");
      const p = blackScholes(S, K, T, r, sigma);
      const f = (n: number, d = 4) => n.toFixed(d).padStart(10);
      const parityOk = Math.abs(p.call - p.put - p.parity) < 1e-6;
      return (
        <>
          {`              call       put\nprice   ${f(p.call)}${f(p.put)}\ndelta   ${f(p.callDelta)}${f(p.putDelta)}\ngamma   ${f(p.gamma)}${f(p.gamma)}\nvega    ${f(p.vega)}${f(p.vega)}\n\n`}
          <span className={parityOk ? "text-up" : "text-down"}>
            {parityOk ? "✓" : "✗"} put-call parity: C − P = S − Ke^(−rT) = {p.parity.toFixed(4)}
          </span>
        </>
      );
    },
  },
  pwd: { usage: "pwd", description: "", hidden: true, run: (_, env) => `/home/uchenna${formatCwd(env.cwd).slice(1)}` },
  echo: { usage: "echo", description: "", hidden: true, run: (args) => args.join(" ") },
  date: { usage: "date", description: "", hidden: true, run: () => new Date().toString() },
  sudo: { usage: "sudo", description: "", hidden: true, run: () => "uchenna is not in the sudoers file. This incident will be reported." },
  rm: { usage: "rm", description: "", hidden: true, run: () => err("rm: permission denied. Nice try.") },
  vim: { usage: "vim", description: "", hidden: true, run: () => "You'd never get out. Try 'cat' instead." },
  ll: { usage: "ll", description: "", hidden: true, run: (args, env) => COMMANDS.ls.run(args, env) },
};

// 5-row block glyphs for the boot banner.
const GLYPHS: Record<string, string[]> = {
  U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
  C: [" ████", "█    ", "█    ", "█    ", " ████"],
  H: ["█   █", "█   █", "█████", "█   █", "█   █"],
  E: ["█████", "█    ", "████ ", "█    ", "█████"],
  N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
  A: [" ███ ", "█   █", "█████", "█   █", "█   █"],
  J: ["█████", "   █ ", "   █ ", "█  █ ", " ██  "],
  O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
  K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
};
/** Drawn as a grid of cells rather than block characters, which many monospace fonts render unevenly. */
export function Banner({ word }: { word: string }) {
  const rows = GLYPHS.U.map((_, row) => word.split("").map((ch) => GLYPHS[ch][row]).join(" "));
  return (
    <span className="block w-max">
      {rows.map((row, r) => (
        <span key={r} className="flex">
          {row.split("").map((c, i) => (
            <span key={i} className={`h-1.5 w-1.5 ${c === "█" ? "bg-azure" : ""}`} />
          ))}
        </span>
      ))}
    </span>
  );
}

function Neofetch() {
  const current = experience.find((r) => r.current);
  const rows: [string, string][] = [
    ["OS", `${current?.company} ${current?.title}`],
    ["Host", `${education.school}, B.S. CS '${education.year.slice(2)}`],
    ["Kernel", "C++, Python, Go"],
    ["Shell", "Java, TypeScript, Rust"],
    ["Packages", "PyTorch, AWS, Docker, Spring, React"],
    ["Research", "Emergent communication in MARL"],
    ["Uptime", "3rd of 2,000+, Jamaica Math Olympiad"],
    ["History", "Goldman Sachs, Cisco · Splunk, AWS ×2"],
  ];
  return (
    <span className="flex flex-col gap-4 sm:flex-row">
      <span className="pt-1" aria-hidden="true">
        <Banner word="UN" />
      </span>
      <span>
        <span className="text-azure">uchenna</span>@<span className="text-azure">njoku</span>
        {"\n-------------\n"}
        {rows.map(([k, v]) => (
          <React.Fragment key={k}>
            <span className="text-azure">{k}</span>: {v}
            {"\n"}
          </React.Fragment>
        ))}
        {"\n"}
        <span aria-hidden="true">
          {["bg-down", "bg-up", "bg-azure", "bg-sky", "bg-paper"].map((c) => (
            <span key={c} className={`${c} inline-block h-3 w-6`} />
          ))}
        </span>
      </span>
    </span>
  );
}

/** Complete the last token of a command line. Returns the new line, or null if nothing to complete. */
export function complete(line: string, cwd: string[]): { line: string; options?: string[] } | null {
  const tokens = line.split(/\s+/);
  const last = tokens[tokens.length - 1] ?? "";

  const pick = (candidates: string[], prefix: string, apply: (c: string) => string) => {
    const matches = candidates.filter((c) => c.startsWith(prefix));
    if (matches.length === 1) return { line: apply(matches[0]) };
    if (matches.length > 1) {
      let common = matches[0];
      for (const m of matches) while (!m.startsWith(common)) common = common.slice(0, -1);
      return { line: apply(common), options: matches };
    }
    return null;
  };

  if (tokens.length === 1) {
    const names = Object.entries(COMMANDS)
      .filter(([, c]) => !c.hidden)
      .map(([n]) => n);
    return pick(names, last, (c) => (names.includes(c) ? `${c} ` : c));
  }

  const rest = (c: string) => [...tokens.slice(0, -1), c].join(" ");
  if (tokens[0] === "open") return pick(Object.keys(LINKS), last, rest);
  if (tokens[0] === "experience") return pick(experience.map((r) => r.slug), last, rest);
  if (tokens[0] === "share") return pick(Object.keys(COMMANDS).filter((n) => isShareable(n) && !COMMANDS[n].hidden), last, rest);

  const slash = last.lastIndexOf("/");
  const dirPart = slash >= 0 ? last.slice(0, slash + 1) : "";
  const dir = lookup(resolve(cwd, dirPart));
  if (!dir || dir.type !== "dir") return null;
  const names = Object.entries(dir.children).map(([n, c]) => (c.type === "dir" ? `${n}/` : n));
  return pick(names, last.slice(dirPart.length), (c) => rest(dirPart + c));
}
