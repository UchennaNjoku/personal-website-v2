/**
 * A tiny, hand-coded version of the pursuit environment from the research: pursuers
 * on a grid try to surround a prey that flees. It only illustrates the setup; the
 * agents here follow simple rules, they are not the trained DQN policies.
 *
 * "Coordinated" pursuers share their positions and each claim a different cell next
 * to the prey. Independent pursuers all head for whichever cell is closest to them,
 * so they bunch up and block each other.
 */

export const SIZE = 16;
export const VIEW = 7;

export type Cell = { x: number; y: number };

export interface World {
  pursuers: Cell[];
  prey: Cell;
  /** Cell each pursuer is heading for this step, for drawing. */
  targets: Cell[];
  /** Pursuers that bumped into each other on the last step. */
  bumped: number[];
  steps: number;
  captures: number;
  collisions: number;
  /** Steps since the last capture, used to respawn a prey that slipped away for too long. */
  chase: number;
  /** Where the prey was caught on the last step, if it was. */
  caughtAt: Cell | null;
}

const DIRS: Cell[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

const inside = (c: Cell) => c.x >= 0 && c.y >= 0 && c.x < SIZE && c.y < SIZE;
const same = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;
const dist = (a: Cell, b: Cell) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const add = (a: Cell, b: Cell) => ({ x: a.x + b.x, y: a.y + b.y });

function randomCell(rand: () => number, avoid: Cell[]): Cell {
  for (;;) {
    const c = { x: Math.floor(rand() * SIZE), y: Math.floor(rand() * SIZE) };
    if (avoid.every((a) => dist(a, c) > 3)) return c;
  }
}

export function createWorld(rand: () => number = Math.random): World {
  const pursuers: Cell[] = [];
  for (let i = 0; i < 3; i++) pursuers.push(randomCell(rand, pursuers));
  return {
    pursuers,
    prey: randomCell(rand, pursuers),
    targets: pursuers.map((p) => ({ ...p })),
    bumped: [],
    steps: 0,
    captures: 0,
    collisions: 0,
    chase: 0,
    caughtAt: null,
  };
}

/** The prey is caught when it has no free neighbouring cell left. */
function trapped(prey: Cell, pursuers: Cell[]) {
  return DIRS.every((d) => {
    const n = add(prey, d);
    return !inside(n) || pursuers.some((p) => same(p, n));
  });
}

/** In-bounds cells next to the prey. */
function slots(prey: Cell): Cell[] {
  return DIRS.map((d) => add(prey, d)).filter(inside);
}

/** Give each pursuer a distinct slot, minimising total distance (3 agents, ≤4 slots: brute force). */
function assign(pursuers: Cell[], prey: Cell): Cell[] {
  const free = slots(prey);
  let best: Cell[] = [];
  let bestCost = Infinity;
  const walk = (i: number, used: Set<number>, picked: Cell[], cost: number) => {
    if (cost >= bestCost) return;
    if (i === pursuers.length) {
      bestCost = cost;
      best = [...picked];
      return;
    }
    // More pursuers than slots (prey in a corner): extra pursuers just hold near the prey.
    if (used.size === free.length) {
      walk(i + 1, used, [...picked, prey], cost + dist(pursuers[i], prey));
      return;
    }
    free.forEach((s, j) => {
      if (used.has(j)) return;
      used.add(j);
      walk(i + 1, used, [...picked, s], cost + dist(pursuers[i], s));
      used.delete(j);
    });
  };
  walk(0, new Set(), [], 0);
  return best;
}

function stepToward(from: Cell, to: Cell, rand: () => number): Cell {
  if (same(from, to)) return from;
  const options = DIRS.map((d) => add(from, d)).filter((c) => inside(c) && dist(c, to) < dist(from, to));
  return options[Math.floor(rand() * options.length)] ?? from;
}

export function step(w: World, coordinated: boolean, rand: () => number = Math.random): World {
  const targets = coordinated
    ? assign(w.pursuers, w.prey)
    : w.pursuers.map((p) => slots(w.prey).reduce((a, b) => (dist(p, b) < dist(p, a) ? b : a)));

  // Pursuers move simultaneously. Two moving into the same cell, or into a cell
  // another pursuer is standing in, bump and stay put.
  const wanted = w.pursuers.map((p, i) => {
    const next = stepToward(p, targets[i], rand);
    return same(next, w.prey) ? p : next;
  });
  const bumped = new Set<number>();
  wanted.forEach((c, i) => {
    wanted.forEach((o, j) => {
      if (i !== j && same(c, o) && !same(c, w.pursuers[i])) bumped.add(i);
    });
    w.pursuers.forEach((o, j) => {
      if (i !== j && same(c, o) && same(wanted[j], o)) bumped.add(i);
    });
  });
  const pursuers = wanted.map((c, i) => (bumped.has(i) ? w.pursuers[i] : c));

  let prey = w.prey;
  let captures = w.captures;
  let chase = w.chase + 1;
  let caughtAt: Cell | null = null;

  if (trapped(prey, pursuers)) {
    caughtAt = prey;
  } else if (rand() < 0.85) {
    // The prey moves to whichever free neighbour keeps it furthest from the nearest pursuer.
    const options = [prey, ...DIRS.map((d) => add(prey, d))].filter(
      (c) => inside(c) && !pursuers.some((p) => same(p, c)),
    );
    const score = (c: Cell) => Math.min(...pursuers.map((p) => dist(p, c))) + rand() * 1.5;
    prey = options.reduce((a, b) => (score(b) > score(a) ? b : a));
    if (trapped(prey, pursuers)) caughtAt = prey;
  }

  if (caughtAt) {
    captures++;
    chase = 0;
    prey = randomCell(rand, pursuers);
  } else if (chase > 120) {
    chase = 0;
    prey = randomCell(rand, pursuers);
  }

  return {
    pursuers,
    prey,
    targets,
    bumped: Array.from(bumped),
    steps: w.steps + 1,
    captures,
    collisions: w.collisions + (bumped.size ? 1 : 0),
    chase,
    caughtAt,
  };
}
