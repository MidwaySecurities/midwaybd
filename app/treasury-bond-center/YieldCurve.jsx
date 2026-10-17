'use client'
import { useState } from "react";
import defaultData from "./yield-curve.json";

/**
 * Government bond yield curve with a per-tenor toggle (Treasury Bond Center).
 * Reads yield-curve.json, which gsec-daily-update/gsec_update.py rewrites daily.
 * Mobile-first: a compact chart on phones, a wider one from md: up.
 * Colors: navy #004990 line, #e5e7e5 grid. No chart library needed.
 *
 * Data shape:
 *   asOf: "2026-10-06"
 *   curve:    [{ years: 1..20, yield }]           all-tenor view
 *   standard: { "2": 8.36, "5": 8.84, ... }       labelled points
 *   monthly:  [{ date, y2, y5, y10, y15, y20 }]    tenor history (one point per month)
 */
const TENORS = [2, 5, 10, 15, 20];
const NAVY = "#004990";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (iso) => `${Number(iso.slice(8))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
const pretty = (iso) => `${Number(iso.slice(8))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

function Chart({ size, kind, tenor, data }) {
  const { W, H, L, R, T, B, fs } = size;
  const lo = 8, hi = kind === "all" ? 10 : 11.5;
  const ticks = kind === "all" ? [8, 9, 10] : [8, 9, 10, 11];
  const y = (v) => H - B - ((v - lo) / (hi - lo)) * (H - B - T);
  const grid = ticks.map((g) => (
    <g key={g}>
      <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke="#e5e7e5" />
      <text x={L - 6} y={y(g) + fs / 3} textAnchor="end" fontSize={fs} fill="#6b7280">{g}%</text>
    </g>
  ));
  let body;
  if (kind === "all") {
    const x = (t) => L + ((t - 1) / 19) * (W - L - R);
    body = (
      <>
        <polyline fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round"
          points={data.curve.map((p) => `${x(p.years)},${y(p.yield)}`).join(" ")} />
        {TENORS.map((t) => (
          <g key={t}>
            <circle cx={x(t)} cy={y(data.standard[t])} r="5" fill={NAVY} />
            <text x={x(t)} y={y(data.standard[t]) - 11} textAnchor="middle" fontSize={fs} fontWeight="600" fill="#111827">{data.standard[t].toFixed(2)}%</text>
            <text x={x(t)} y={H - B + fs + 8} textAnchor="middle" fontSize={fs} fontWeight="600" fill="#4b5563">{t}-Year</text>
          </g>
        ))}
        <text x={(L + W - R) / 2} y={H - 2} textAnchor="middle" fontSize={fs - 1} fill="#6b7280">Years remaining until the bond matures</text>
      </>
    );
  } else {
    const pts = data.monthly.map((m) => ({ d: m.date, v: m[`y${tenor}`] }));
    const n = pts.length;
    const x = (i) => L + 14 + (i / (n - 1)) * (W - L - R - 28);
    const vals = pts.map((p) => p.v);
    const show = size.compact ? new Set([0, n - 1, vals.indexOf(Math.max(...vals)), vals.indexOf(Math.min(...vals))]) : new Set(pts.map((_, i) => i));
    body = (
      <>
        <polyline fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" points={pts.map((p, i) => `${x(i)},${y(p.v)}`).join(" ")} />
        {pts.map((p, i) => (
          <g key={p.d}>
            <circle cx={x(i)} cy={y(p.v)} r={i === n - 1 ? 5 : 3.5} fill={NAVY} />
            {show.has(i) && <text x={x(i)} y={y(p.v) - 10} textAnchor="middle" fontSize={fs} fontWeight="600" fill="#111827">{p.v.toFixed(2)}%</text>}
            {(!size.compact || i % 2 === 0 || i === n - 1) && (
              <text x={x(i)} y={H - B + fs + 8} textAnchor="middle" fontSize={fs} fontWeight="600" fill="#4b5563">{label(p.d)}</text>
            )}
          </g>
        ))}
      </>
    );
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" className="w-full" aria-label={kind === "all" ? "Government bond yield curve" : `${tenor}-year yield by month`}>
      {grid}
      {body}
    </svg>
  );
}

export default function YieldCurve({ data = defaultData, initialView = "all" }) {
  const [view, setView] = useState(initialView);
  if (!data.monthly) data = { ...data, monthly: data.history };
  const last = data.monthly[data.monthly.length - 1];
  const sizes = {
    phone: { W: 300, H: 230, L: 38, R: 14, T: 26, B: 40, fs: 10, compact: true },
    wide: { W: 640, H: 270, L: 50, R: 24, T: 36, B: 44, fs: 11, compact: false },
  };

  return (
    <section className="rounded-lg border border-[#e5e7e5] bg-white p-3 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-[13px] font-medium md:text-sm">Government Bond Yields</h2>
        <span className="rounded border border-dashed border-[#c9cdc9] px-2 py-0.5 text-[10px] text-[#6b7280]">
          Bangladesh Bank, {pretty(data.asOf)}
        </span>
      </div>

      <div className="mb-3 mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Choose a tenor">
        {["all", ...TENORS].map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={
              "rounded-full border px-3 py-1.5 text-[11px] font-semibold " +
              (view === v ? "border-[#004990] bg-[#004990] text-white" : "border-[#c9cdc9] bg-white text-[#004990]")
            }
          >
            {v === "all" ? "All Tenors" : `${v}-Year`}
          </button>
        ))}
      </div>

      {view !== "all" && (
        <p className="mb-1 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-[#004990] md:text-3xl">{data.standard[view].toFixed(2)}%</span>
          <span className="text-[11px] text-[#4b5563]">{view}-Year yield, {pretty(data.asOf)}</span>
        </p>
      )}

      <div className="md:hidden"><Chart size={sizes.phone} kind={view === "all" ? "all" : "tenor"} tenor={view} data={data} /></div>
      <div className="hidden md:block"><Chart size={sizes.wide} kind={view === "all" ? "all" : "tenor"} tenor={view} data={data} /></div>

      <p className="mt-2 text-[11px] leading-relaxed text-[#6b7280]">
        {view === "all"
          ? `Secondary-market yield by years remaining to maturity, ${pretty(data.asOf)}. Choose a tenor above to see how it has moved.`
          : "Yield on or just after the 6th of each month, latest reading last. Yields move daily and past yields do not guarantee future returns."}
      </p>
      <p className="mt-1 text-[10px] text-[#6b7280]">Source: Bangladesh Bank, G-Sec YTM Curve. Latest monthly point: {pretty(last.date)}.</p>
    </section>
  );
}
