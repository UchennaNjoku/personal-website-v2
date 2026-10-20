/**
 * Surface SVI (Gatheral & Jacquier, 2014) with the power-law curvature
 * φ(θ) = η / (θ^γ (1 + θ)^(1−γ)), γ = ½. Total implied variance for log-moneyness k
 * at ATM total variance θ:
 *
 *   w(k, θ) = θ/2 · (1 + ρφk + √((φk + ρ)² + 1 − ρ²))
 *
 * The surface is free of static arbitrage when η(1 + |ρ|) ≤ 2.
 */

export interface SsviParams {
  /** Skew: negative tilts the smile down to the right, like equity indices. */
  rho: number;
  /** Wing steepness. */
  eta: number;
  /** ATM implied vol at one year. */
  atmVol: number;
}

export const K_RANGE = [-0.5, 0.5] as const;
export const T_RANGE = [0.1, 2] as const;

const GAMMA = 0.5;

/** ATM total variance θ(T); vol decays gently with maturity so the term structure has some shape. */
export const theta = (T: number, p: SsviParams) => (p.atmVol * (1 + 0.25 * Math.exp(-2 * T))) ** 2 * T;

const phi = (th: number, p: SsviParams) => p.eta / (th ** GAMMA * (1 + th) ** (1 - GAMMA));

export function impliedVol(k: number, T: number, p: SsviParams) {
  const th = theta(T, p);
  const f = phi(th, p);
  const w = (th / 2) * (1 + p.rho * f * k + Math.sqrt((f * k + p.rho) ** 2 + 1 - p.rho ** 2));
  return Math.sqrt(w / T);
}

export const arbitrageFree = (p: SsviParams) => p.eta * (1 + Math.abs(p.rho)) <= 2;
