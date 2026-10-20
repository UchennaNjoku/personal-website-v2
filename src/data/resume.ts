/**
 * Single source of truth for everything on the site. The page sections and the
 * terminal's virtual filesystem are both generated from this file.
 */

export interface Role {
  /** Slug used for the terminal file name, e.g. experience/goldman-sachs.txt */
  slug: string;
  company: string;
  title: string;
  start: string;
  end: string;
  current?: boolean;
  /** One line a non-technical reader can take away at a glance. */
  summary?: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  details?: string[];
  stack: string[];
  live?: string;
  github?: string;
}

export const profile = {
  name: "Uchenna Njoku",
  title: "Software Engineer",
  headline: "Software engineer at Bloomberg. Researcher in multi-agent reinforcement learning.",
  tagline: "Driven by curiosity and the challenge of solving problems that matter.",
  intro:
    "I build systems that have to be right, and I study how learning agents figure out how to work together. Before Bloomberg I shipped production systems at Goldman Sachs, Cisco · Splunk and AWS, and my research on emergent communication won an Outstanding Student Research Award from the Florida Academy of Science.",
  email: "uchenna.c.njoku@gmail.com",
  phone: "+1 (559) 776-2242",
  phoneHref: "tel:+15597762242",
  github: "https://github.com/UchennaNjoku",
  linkedin: "https://www.linkedin.com/in/uchennanjoku/",
  resume: "/resume.pdf",
};

export const education = {
  school: "Bethune-Cookman University",
  degree: "B.S. Computer Science, Mathematics minor",
  year: "2026",
  note: "Presidential Scholar",
};

export const experience: Role[] = [
  {
    slug: "bloomberg",
    company: "Bloomberg",
    title: "Software Engineer",
    start: "Aug 2026",
    end: "Present",
    current: true,
    bullets: [],
  },
  {
    slug: "goldman-sachs",
    company: "Goldman Sachs",
    title: "Software Engineer Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    summary: "Built a tax reciprocity rules engine covering 46,000 employees in 30+ countries.",
    bullets: [
      "Developed a secure, scalable CSV report generation and download system for the Payroll Tax Calculator using Spring Boot, AWS ECS Fargate, Lambda, S3 and Aurora PostgreSQL, with dynamic Java-based formatting and zero-knowledge password encryption — cutting processing time by 60% and meeting internal audit requirements.",
      "Led full-stack implementation of a U.S. Tax Reciprocity Rules Engine, designing OpenAPI-driven REST APIs and an accessible React + TypeScript UI for managing multi-state income tax exemptions — eliminating 95% of manual entries and reducing compliance errors to near zero, covering 46,000 employees in 30+ countries.",
    ],
  },
  {
    slug: "cisco-splunk",
    company: "Cisco · Splunk",
    title: "Software Engineer Intern",
    start: "Jan 2025",
    end: "Apr 2025",
    summary: "Automated maintenance scheduling in Go, catching 98% of deployment conflicts.",
    bullets: [
      "Engineered core functionality of Splunk's Maintenance Window Service in Go, automating ingestion of maintenance schedules from Google Sheets into Splunk — processing 10,000+ rows of operational data per week and reducing manual scheduling effort by 70%.",
      "Implemented checksum-based diffing and conflict-detection algorithms in Go, reducing redundant Splunk REST API calls by 30%, cutting duplicate schedule errors by 35%, and catching 98% of deployment conflicts (e.g. overlapping upgrade cohorts).",
    ],
  },
  {
    slug: "aws-2024",
    company: "Amazon Web Services",
    title: "Software Engineer Intern",
    start: "May 2024",
    end: "Aug 2024",
    summary: "Led a bootloader rollout reaching 500+ network sites worldwide.",
    bullets: [
      "Led the Local Compute Infrastructure (LCI) Bootloader Rollout project to streamline and automate deployment of network devices across the LCI fleet, impacting 500+ network sites globally.",
      "Built a release, rollout and deployment pipeline for new bootloader versions and PXE artifacts, with testing packages and environments — reducing bootloader release failures by 20%, expected to decrease system downtime by 30%.",
    ],
  },
  {
    slug: "aws-2023",
    company: "Amazon Web Services",
    title: "Software Engineer Intern",
    start: "May 2023",
    end: "Aug 2023",
    summary: "Automated network host generation, speeding up site builds by 40%.",
    bullets: [
      "Architected the migration of the AWS Network host generation workflow to automated pipelines using CloudFormation, CloudWatch, Lambda and CDK, increasing site build speed by 40%.",
      "Increased robustness and manageability of 450+ AWS Network Centers running over 1 million external services, using TypeScript, Java and Python.",
    ],
  },
  {
    slug: "gm-ecocar",
    company: "GM EcoCAR EV Challenge",
    title: "Team Lead, Connected & Autonomous Vehicles",
    start: "Jan 2023",
    end: "Dec 2024",
    summary: "Led the CAVs sub-team building vehicle control algorithms.",
    bullets: [
      "Led the Connected and Autonomous Vehicles (CAVs) sub-team, engineering vehicle control algorithms in MATLAB and Simulink and validating strategies in dSPACE and CARLA simulations.",
      "Refined large onboard sensor datasets with Fourier and wavelet transforms for noise reduction, using C++ for high-efficiency signal processing.",
      "Applied PCA and t-SNE for machine-learning-based vehicle health insights.",
    ],
  },
];

export interface Research {
  slug: string;
  title: string;
  award?: string;
  summary: string;
  bullets: string[];
  results: { label: string; before: number; after: number; better: "lower" | "higher" }[];
  stack: string[];
}

export const research: Research[] = [
  {
    slug: "emergent-communication",
    title: "Emergent Communication in Multi-Agent Reinforcement Learning",
    award: "Outstanding Student Research Award, Florida Academy of Science",
    summary:
      "Can agents that only see part of the world invent their own language to coordinate? I gave a team of reinforcement-learning agents a channel of a few discrete symbols, no meaning attached, and let training decide what to say.",
    bullets: [
      "Built a PettingZoo pursuit environment (16×16 grid, 3 pursuers vs. evasive prey, 7×7 partial observability) and trained shared-parameter DQN agents in PyTorch with a learned discrete communication channel (vocab 4 / 16), optimized end to end with no hand-coded protocol.",
      "Cut agent collisions from 38.1% to 3.7% and raised capture rate from 65.8% to 89.5% on held-out maps, isolating communication's value to out-of-distribution transfer.",
      "Quantified protocol structure via channel-entropy analysis (3.99 / 4.0 bits), showing functional but non-symbolic signaling.",
    ],
    results: [
      { label: "Agent collisions", before: 38.1, after: 3.7, better: "lower" },
      { label: "Capture rate, held-out maps", before: 65.8, after: 89.5, better: "higher" },
    ],
    stack: ["PyTorch", "PettingZoo", "DQN", "Python"],
  },
];

export const volsurf: Project = {
  slug: "volsurf",
  name: "VolSurf-CPP",
  tagline: "Arbitrage-free volatility surface engine",
  description:
    "A high-performance volatility surface engine in C++17 with Python bindings, built to take raw option quotes to a smooth, arbitrage-free implied volatility surface.",
  details: [
    "Multi-threaded implied volatility solvers and constrained spline fitting, parallelised with OpenMP.",
    "Python bindings via pybind11, with pricers benchmarked against QuantLib.",
    "Automated research pipeline ingesting market data from Yahoo Finance and Polygon.io.",
    "Interactive 3D surface dashboards built with Plotly and Streamlit.",
  ],
  stack: ["C++17", "Python", "pybind11", "OpenMP", "QuantLib"],
};

/** Smaller projects; VolSurf is featured on its own. */
export const projects: Project[] = [
  {
    slug: "wildtrack",
    name: "WildTrack",
    tagline: "NFC attendance system",
    description: "Mobile attendance tracking using NFC for secure, contactless check-ins at educational institutions.",
    stack: ["React Native", "Supabase", "NFC"],
  },
  {
    slug: "thriv",
    name: "Thriv",
    tagline: "Fitness companion app",
    description: "Workout plans, nutrition tracking and progress monitoring with real-time sync and social features.",
    stack: ["React Native", "Firebase"],
    live: "https://thriv-app.vercel.app/",
    github: "https://github.com/UchennaNjoku/Thriv",
  },
  {
    slug: "munchies",
    name: "Munchies",
    tagline: "Recipe discovery",
    description: "Find a recipe for any meal, powered by the Spoonacular API.",
    stack: ["React", "Tailwind CSS"],
    live: "https://munchies-recipes.vercel.app/",
    github: "https://github.com/UchennaNjoku/munchies-recipes",
  },
  {
    slug: "sentinel",
    name: "Sentinel Staffing",
    tagline: "Staffing portal redesign",
    description: "A modern, responsive redesign of Sentinel Staffing Solutions' web portal.",
    stack: ["React", "Tailwind CSS"],
    live: "https://sentinel-staffing.vercel.app/",
    github: "https://github.com/UchennaNjoku/sentinel-staffing",
  },
];

export const honors = [
  {
    title: "Florida Academy of Science",
    detail: "Outstanding Student Research Award for work on emergent communication in multi-agent reinforcement learning.",
  },
  {
    title: "Jamaica National Mathematical Olympiad",
    detail: "Placed 3rd of 2,000+ students; selected to represent Jamaica at the XVII Central American & Caribbean Mathematical Olympiad.",
  },
  {
    title: "IEEE SoutheastCon Robotics",
    detail: "1st in Florida. Orchestrated hardware and software for a 4WD obstacle-navigating robot, deploying a Jetson Nano in a containerized Docker architecture.",
  },
  {
    title: "Presidential Scholar",
    detail: "Bethune-Cookman University.",
  },
];

export const skills = {
  Languages: ["C++", "Python", "Java", "Go", "TypeScript", "JavaScript", "Rust", "C#", "Swift", "R", "SQL", "GraphQL", "Bash"],
  "ML & data": ["PyTorch", "TensorFlow", "NumPy", "pandas", "SciPy", "scikit-learn"],
  "Systems & web": ["AWS", "Docker", "Linux", "Spring", "React", "Node.js", "Angular"],
};
