"use client";

import React, { useId, useState } from "react";

/**
 * One maturity slice of a volatility surface using the raw SVI parameterization
 * (Gatheral, 2004): total variance w(k) = a + b·(ρ(k − m) + √((k − m)² + σ²)).
 */
const T = 0.5;
const M = 0;
const K_MIN = -0.6;
const K_MAX = 0.6;
const W = 720;
const H = 300;
const PAD = { l: 40, r: 8, t: 12, b: 26 };

const PARAMS = [
  { key: "a", label: "level a", min: -0.04, max: 0.08, step: 0.002 },
  { key: "b", label: "wings b", min: 0.02, max: 0.5, step: 0.01 },
  { key: "rho", label: "skew ρ", min: -0.9, max: 0.9, step: 0.05 },
  { key: "sigma", label: "curvature σ", min: 0.02, max: 0.6, step: 0.01 },
] as const;

type Params = Record<(typeof PARAMS)[number]["key"], number>;

const totalVariance = (k: number, p: Params) => p.a + p.b * (p.rho * (k - M) + Math.sqrt((k - M) ** 2 + p.sigma ** 2));

export default function SmileWidget() {
  const id = useId();
  const [p, setP] = useState<Params>({ a: 0.01, b: 0.18, rho: -0.4, sigma: 0.2 });

  const samples = Array.from({ length: 121 }, (_, i) => {
    const k = K_MIN + ((K_MAX - K_MIN) * i) / 120;
    const w = totalVariance(k, p);
    return { k, iv: w > 0 ? Math.sqrt(w / T) : null };
  });
  const valid = samples.filter((s) => s.iv !== null).map((s) => s.iv as number);
  const yMax = Math.max(0.2, ...valid) * 1.15;

  const x = (k: number) => PAD.l + ((k - K_MIN) / (K_MAX - K_MIN)) * (W - PAD.l - PAD.r);
  const y = (v: number) => H - PAD.b - (v / yMax) * (H - PAD.t - PAD.b);

  let path = "";
  let penDown = false;
  for (const s of samples) {
    if (s.iv === null) {
      penDown = false;
      continue;
    }
    path += `${penDown ? "L" : "M"}${x(s.k).toFixed(1)},${y(s.iv).toFixed(1)}`;
    penDown = true;
  }

  const minVariance = p.a + p.b * p.sigma * Math.sqrt(1 - p.rho ** 2);
  const iv = (k: number) => Math.sqrt(Math.max(0, totalVariance(k, p)) / T);
  const atm = iv(0);
  const atmSkew = (iv(0.01) - iv(-0.01)) / 0.02;
  const yTicks = Array.from({ length: 4 }, (_, i) => (yMax / 4) * (i + 1));

  return (
    <figure className="rounded-lg border border-rule p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby={`${id}-cap`}>
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} className="stroke-rule" strokeWidth="1" />
            <text x={PAD.l - 6} y={y(v) + 3} textAnchor="end" className="fill-dim font-mono text-[10px]">
              {(v * 100).toFixed(0)}%
            </text>
          </g>
        ))}
        {[-0.5, -0.25, 0, 0.25, 0.5].map((k) => (
          <text key={k} x={x(k)} y={H - 8} textAnchor="middle" className="fill-dim font-mono text-[10px]">
            {k === 0 ? "ATM" : k.toFixed(2)}
          </text>
        ))}
        <line x1={x(0)} x2={x(0)} y1={PAD.t} y2={H - PAD.b} className="stroke-rule" strokeDasharray="3 3" />
        <path d={path} fill="none" className="stroke-azure" strokeWidth="2" strokeLinejoin="round" />
      </svg>

      <div className="mt-2 flex justify-between font-mono text-[11px] text-dim">
        <span>implied vol</span>
        <span>log-moneyness k = ln(K/F), T = 6m</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {PARAMS.map((param) => (
          <label key={param.key} className="block font-mono text-xs">
            <span className="flex justify-between text-dim">
              <span>{param.label}</span>
              <span className="text-paper">{p[param.key].toFixed(param.step < 0.01 ? 3 : 2)}</span>
            </span>
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={p[param.key]}
              onChange={(e) => setP({ ...p, [param.key]: Number(e.target.value) })}
              className="mt-1 w-full accent-azure"
            />
          </label>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-1 border-t border-rule pt-3 font-mono text-xs sm:grid-cols-3">
        <div>
          <dt className="inline text-dim">ATM vol </dt>
          <dd className="inline">{(atm * 100).toFixed(1)}%</dd>
        </div>
        <div className="sm:order-last">
          <dt className="inline text-dim">min variance ≥ 0 </dt>
          <dd className={`inline ${minVariance >= 0 ? "text-up" : "text-down"}`}>{minVariance >= 0 ? "✓" : "✗ negative variance"}</dd>
        </div>
        <div>
          <dt className="inline text-dim">ATM skew </dt>
          <dd className="inline">{atmSkew.toFixed(3)}</dd>
        </div>
      </dl>

      <figcaption id={`${id}-cap`} className="mt-3 text-xs leading-relaxed text-dim">
        A single maturity slice of a volatility surface in the raw SVI parameterization (Gatheral, 2004). Drag the
        parameters to reshape the smile; push the level low enough and the slice admits negative variance, which is
        an arbitrage.
      </figcaption>
    </figure>
  );
}
