"use client";
/**
 * DSE AGM / EGM Calendar: v1.4
 * Source: Dhaka Stock Exchange PLC, "Company's AGM/EGM and Record Date Information"
 *         https://old.dsebd.org/Company_AGM_EGM.pdf  (Last Updated 15-Sep-26 · 70 entries · 11 pages)
 *
 * Target: Next.js 16 (App Router) client component · React 19/18 · the site's own TailwindCSS (v3 or v4).
 * Dark mode uses the `.dark` class (the component adds it to its own wrapper):
 *   Tailwind v3  tailwind.config.js  →  darkMode: "class"   (+ add this file's folder to `content`)
 *   Tailwind v4  globals.css         →  @custom-variant dark (&:where(.dark, .dark *));
 * Data lives in ./dseAgmData.js (SOURCE, RAW, MARKET).
 *
 * Props
 *   theme            "light" | "dark" | undefined. Pass your site theme (e.g. next-themes resolvedTheme) to control it.
 *                    Left undefined, the component follows the device setting and shows its own toggle.
 *   showThemeToggle  default true. Hidden automatically when `theme` is passed.
 *   className        extra classes for the outer wrapper.
 *
 * Version history
 *   v1.0 (24-Sep-2026) Initial build: month calendar, filters, weekly load chart, record-gap histogram,
 *                      dividend mix by group, unscheduled watchlist, derived insights, full sortable table.
 *   v1.1 (24-Sep-2026) Removed weekly-load chart, record-gap histogram and dividend-mix bars. Compact watchlist.
 *                      Added DSE market data: price reaction ±5 trading days around each past record date
 *                      (prev-close reference, dividend-adjusted view) and EPS / NAV / payout / yield per entry.
 *   v1.1.1 (25-Sep-2026) Fixes: blank values sort last; invalid source times shown as "—"; agenda sorted by clock
 *                      time; tooltip kept on-screen; Stat tile hoisted; chart hover resets on company change.
 *   v1.2 (25-Sep-2026) Pure white light theme; dark theme unchanged. Removed three KPI tiles and the DSE
 *                      fundamentals card. "Insights" limited to 4.
 *   v1.3 (25-Sep-2026) "Dividends proposed" section. KPI cards side by side (swipe on phones). Long lists show 3
 *                      with "Show more". KPI strip and price chart always dark. Company-wide payout for dividends
 *                      that exclude sponsors.
 *   v1.4 (30-Sep-2026) Production build for Next.js 16: "use client", data split into dseAgmData.js, hydration-safe
 *                      (date and theme resolved after mount; "today" is Dhaka time), `theme` prop, inherits the
 *                      site font, Tailwind v3/v4-safe classes, no fixed-position layers. Mobile-first down to 320px:
 *                      collapsible filters, 40px tap targets, 11px minimum text, chart scales to 240px with
 *                      touch scrubbing and in-plot labels, tap-to-expand watchlist, complete list as cards below
 *                      1024px (table on desktop) with a sort menu.
 */
import React, { useMemo, useState, useEffect, useRef } from "react";
import { SOURCE, RAW, MARKET } from "./dseAgmData";

const VERSION = "v1.4";

/* ─────────────────────────── Helpers ─────────────────────────── */
const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  January: 0, February: 1, March: 2, April: 3, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };
const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
function parseDate(s) {
  if (!s) return null;
  let m = s.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2})$/);
  if (m) return iso(2000 + +m[3], MON[m[2]], +m[1]);
  m = s.match(/^(\d{1,2}) ([A-Za-z]+), (\d{4})$/);
  if (m) return iso(+m[3], MON[m[2]], +m[1]);
  m = s.match(/^([A-Za-z]+) (\d{1,2}), (\d{4}),?$/);
  if (m) return iso(+m[3], MON[m[1]], +m[2]);
  return null;
}
const toDate = (s) => new Date(s + "T00:00:00");
const dayDiff = (a, b) => Math.round((toDate(b) - toDate(a)) / 864e5);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fmtD = (s) => { if (!s) return "—"; const d = toDate(s); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const fmtShort = (s) => { const d = toDate(s); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; };
const weekday = (s) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][toDate(s).getDay()];
/** Indian (South Asian) digit grouping: 1,00,000 (lac) and 1,00,00,000 (crore). */
const fmtIN = (n, dp = 0) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp });
const localISO = (d) => iso(d.getFullYear(), d.getMonth(), d.getDate());
/** Today's date in Dhaka (DSE's calendar), whatever the viewer's time zone. Client-only. */
const dhakaToday = () => {
  try { return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
  catch { return localISO(new Date()); }
};
/** Parse "11.00 AM", "3:00 PM", "11.00 A.M", "12:00 Noon" → minutes after midnight; null if not a clock time. */
const parseTime = (t) => {
  const m = String(t || "").match(/^(\d{1,2})[.:](\d{2})\s*(A\.?M|P\.?M|Noon)/i);
  if (!m) return null;
  let h = +m[1] % 12; if (/^p/i.test(m[3]) || /noon/i.test(m[3])) h += 12;
  return h * 60 + +m[2];
};
const isClock = (t) => parseTime(t) != null;

function parseDividend(p) {
  if (!p) return { cash: null, stock: null };
  const cash = p.match(/([\d.]+)%\s*cash/i)?.[1] ?? p.match(/(?:@|of )([\d.]+)%/)?.[1] ?? null;
  const stock = p.match(/([\d.]+)%\s*(?:stock|bonus)/i)?.[1] ?? null;
  return { cash: cash != null ? +cash : null, stock: stock != null ? +stock : null };
}

const EVENTS = RAW.map((r, i) => {
  const [company, type, group, yearEnd, purpose, meetingRaw, recordRaw, venue, mode, time] = r;
  const div = parseDividend(purpose);
  return {
    id: i, company, type, group, yearEnd, purpose, meetingRaw, recordRaw, venue, mode, time,
    meeting: parseDate(meetingRaw), record: parseDate(recordRaw), ...div,
    noDividend: /^no dividend/i.test(purpose),
    sponsorExcluded: /except|excluding|only for general/i.test(purpose),
    courtPending: /court/i.test(meetingRaw + " " + venue),
    m: MARKET[i] || null,
  };
});

function statusOf(e, today) {
  if (e.type === "REC") return "Record only";
  if (e.meeting) return e.meeting < today ? "Date passed" : e.meeting === today ? "Today" : "Upcoming";
  if (/postponed/i.test(e.meetingRaw)) return "Postponed";
  if (e.courtPending) return "Court-pending";
  return "Date TBA";
}

/* ─────────────────────────── Visual tokens ─────────────────────────── */
const TYPE_STYLE = {
  AGM: { chip: "bg-teal-500/15 text-teal-800 ring-teal-600/25 dark:text-teal-200 dark:ring-teal-300/25", dot: "bg-teal-500", label: "AGM" },
  EGM: { chip: "bg-amber-500/15 text-amber-800 ring-amber-600/25 dark:text-amber-200 dark:ring-amber-300/25", dot: "bg-amber-500", label: "EGM" },
  REC: { chip: "bg-violet-500/15 text-violet-800 ring-violet-600/25 dark:text-violet-200 dark:ring-violet-300/25", dot: "bg-violet-500", label: "Record" },
};
const STATUS_STYLE = {
  Upcoming: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Today: "bg-teal-500 text-white",
  "Date passed": "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Postponed: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "Court-pending": "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  "Date TBA": "bg-slate-500/15 text-slate-700 dark:text-slate-300",
  "Record only": "bg-violet-500/15 text-violet-700 dark:text-violet-300",
};
const GROUPS = ["Bank", "NBFI", "Life Ins", "Gen Ins", "Other"];
const MODES = ["Hybrid", "Digital", "Physical", "TBA", "Postponed"];
const glass = "rounded-2xl border border-slate-200 bg-white shadow-sm dark:backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]";
const muted = "text-slate-500 dark:text-slate-400";
/** Always-dark card, used for sections that keep a dark look in both themes (wrapped in a `.dark` scope). */
const darkGlass = "rounded-2xl border border-white/10 bg-[#0d1f28] bg-[linear-gradient(135deg,#0b1b22,#0d1f28_50%,#121a2e)] text-slate-200 shadow-[0_12px_40px_-18px_rgba(2,12,20,0.7)]";
const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500";
const ctrl = `min-h-[40px] rounded-xl border-0 bg-slate-900/5 text-xs font-semibold text-slate-800 dark:bg-white/5 dark:text-slate-200 sm:min-h-[34px] ${focusRing}`;
const shortName = (c) => c.replace(/\b(PLC|Ltd|Limited|Company|Co)\b\.?/gi, "").replace(/\s+/g, " ").trim();
const fyLabel = (ye) => ((ye.match(/(\d{4})$/)?.[1]) || ("20" + ye.slice(-2))).slice(2);

/* ─────────────────────────── Small components ─────────────────────────── */
const Pill = ({ className = "", children }) => (
  <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${className}`}>{children}</span>
);
const SectionInner = ({ title, kicker, right, children, className = "", darkInner = false, id }) => (
  <section id={id} className={`${darkInner ? darkGlass : glass} min-w-0 p-3 sm:p-5 ${className}`}>
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
      <div className="min-w-0">
        {kicker && <div className={`text-[11px] font-bold uppercase tracking-[0.12em] ${muted}`}>{kicker}</div>}
        <h2 className="text-base font-bold leading-snug text-slate-900 dark:text-white">{title}</h2>
      </div>
      {right}
    </div>
    {children}
  </section>
);
const Section = ({ dark = false, className = "", ...p }) => dark ? (
  <div className={`dark min-w-0 ${className}`}><SectionInner {...p} className="h-full" darkInner /></div>
) : <SectionInner {...p} className={className} />;

/** Segmented control. `full` stretches it across narrow screens. Options: strings or {v, l}. */
function Seg({ value, onChange, options, id, full = false }) {
  return (
    <div role="group" aria-label={id}
      className={`${full ? "flex w-full sm:inline-flex sm:w-auto" : "inline-flex max-w-full"} overflow-x-auto rounded-xl bg-slate-900/5 p-0.5 [scrollbar-width:none] dark:bg-white/5 [&::-webkit-scrollbar]:hidden`}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.v, l = typeof o === "string" ? o : o.l, on = value === v;
        return (
          <button key={v} type="button" aria-pressed={on} onClick={() => onChange(v)}
            className={`${full ? "flex-1 sm:flex-none" : ""} min-h-[36px] shrink-0 whitespace-nowrap rounded-[10px] px-2 text-xs font-semibold transition sm:min-h-[30px] sm:px-2.5 ${focusRing} ${
              on ? "bg-white text-slate-900 shadow-sm dark:bg-white/15 dark:text-white" : `${muted} hover:text-slate-900 dark:hover:text-white`}`}>
            {l}
          </button>
        );
      })}
    </div>
  );
}
/** "Show more" drop-down toggle for lists capped at LIST_CAP items. */
const LIST_CAP = 3;
const MoreToggle = ({ total, open, onToggle, label = "" }) => total <= LIST_CAP ? null : (
  <button type="button" onClick={onToggle} aria-expanded={open}
    className={`mt-2 flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 sm:min-h-[34px] ${focusRing}`}>
    {open ? "Show less" : `Show more${label ? " " + label : ""} (${total - LIST_CAP})`}
    <Chevron open={open} />
  </button>
);
const Chevron = ({ open, className = "" }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""} ${className}`}><path d="M6 9l6 6 6-6" /></svg>
);

/** Desktop-only (mouse) tooltip; touch users get the same details by tapping. */
const EventTooltip = ({ tip, today }) => {
  if (!tip) return null;
  const e = tip.e;
  const vw = window.innerWidth, vh = window.innerHeight, w = Math.min(280, vw - 16);
  const left = Math.max(8, Math.min(tip.x + 14, vw - w - 8));
  const top = tip.y + 250 > vh ? Math.max(8, tip.y - 230) : tip.y + 14;
  const days = e.meeting ? dayDiff(today, e.meeting) : null;
  return (
    <div className="pointer-events-none fixed z-50 rounded-xl border border-white/20 bg-slate-900/95 p-3 text-xs text-slate-100 shadow-2xl"
      style={{ left, top, width: w }}>
      <div className="mb-1 flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${TYPE_STYLE[e.type].dot}`} /><b className="text-sm leading-tight">{e.company}</b></div>
      <div className="grid grid-cols-[76px_1fr] gap-x-2 gap-y-0.5 text-slate-300">
        <span>{e.type === "REC" ? "Action" : "Meeting"}</span><span className="text-white">{e.type === "REC" ? "Record date" : e.meeting ? `${fmtD(e.meeting)}${isClock(e.time) ? ` · ${e.time}` : ""}` : e.meetingRaw}</span>
        <span>Record date</span><span className="font-mono text-white">{e.record ? fmtD(e.record) : e.recordRaw}</span>
        {e.type !== "REC" && <><span>Mode</span><span className="text-white">{e.mode}</span></>}
        <span>{e.type === "EGM" ? "Purpose" : "Dividend"}</span><span className="text-white">{e.purpose}</span>
        {e.m && (e.m.eps != null || e.m.nav != null) && <><span>EPS · NAV</span><span className="font-mono text-white">{e.m.eps == null ? "—" : fmtIN(e.m.eps, 2)} · {e.m.nav == null ? "—" : fmtIN(e.m.nav, 2)}</span></>}
        {e.m && e.m.yield != null && <><span>Yield</span><span className="font-mono text-white">{fmtIN(e.m.yield, 2)}%{e.m.payoutCo != null ? ` · payout ${fmtIN(e.m.payoutCo, 0)}%` : ""}</span></>}
        {days != null && <><span>Countdown</span><span className="font-mono text-white">{days === 0 ? "Today" : days > 0 ? `in ${days} d` : `${-days} d ago`}</span></>}
      </div>
    </div>
  );
};

const Stat = ({ l, v, sub, cls = "" }) => (
  <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-2.5 py-2 dark:border-transparent dark:bg-white/[0.035] sm:px-3">
    <div className={`text-[11px] font-bold uppercase leading-tight tracking-[0.06em] ${muted}`}>{l}</div>
    <div className={`font-mono text-base font-bold tabular-nums ${cls || "text-slate-900 dark:text-white"}`}>{v}</div>
    {sub && <div className={`text-[11px] leading-snug ${muted}`}>{sub}</div>}
  </div>
);

/* ─────────────────────────── Price reaction chart ─────────────────────────── */
const fmtPx = (v) => (v == null ? "—" : fmtIN(v, 2));
const fmtPct = (v, dp = 1) => (v == null ? "—" : `${v > 0 ? "+" : ""}${fmtIN(v, dp)}%`);
const pctClass = (v) => (v == null ? "" : v > 0 ? "text-emerald-600 dark:text-emerald-400" : v < 0 ? "text-rose-600 dark:text-rose-400" : "");

function PriceChart({ m, adjusted }) {
  const [hover, setHover] = useState(null);
  const boxRef = useRef(null), svgRef = useRef(null);
  const [boxW, setBoxW] = useState(0);
  useEffect(() => {
    const el = boxRef.current; if (!el) return;
    setBoxW(Math.round(el.getBoundingClientRect().width));
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([en]) => setBoxW(Math.round(en.contentRect.width)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  if (!m || !m.px) return <p className={`text-sm ${muted}`}>No DSE price history for this entry.</p>;
  const recIdx = m.px.findIndex((p) => p[2] === 1);
  const dps = m.dps || 0, sp = m.stock || 0;
  const pts = m.px.map(([d, c, nt], i) => {
    const after = recIdx >= 0 && i > recIdx;
    const v = adjusted && after ? +(c * (1 + sp / 100) + dps).toFixed(2) : c;
    return { d, c, v, nt: !!nt, after };
  });
  const ref = m.ref;
  // Width follows the container (min 240); narrow layouts put reference labels inside the plot.
  const W = Math.max(240, boxW || 320), narrow = W < 480, H = narrow ? 210 : 260, L = narrow ? 40 : 52, R = narrow ? 8 : 92, T = 18, B = 30;
  const vals = pts.map((p) => p.v).concat(ref != null ? [ref] : [], !adjusted && m.theo != null ? [m.theo] : []);
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const padV = (hi - lo || hi * 0.02 || 1) * 0.14; lo -= padV; hi += padV;
  const step = (W - L - R) / Math.max(1, pts.length - 1);
  const x = (i) => L + i * step;
  const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const refY = ref != null ? y(ref) : y(pts[0].v);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
  const area = `M${x(0)},${refY} ` + pts.map((p, i) => `L${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ") + ` L${x(pts.length - 1)},${refY} Z`;
  const nT = narrow ? 4 : 5, ticks = Array.from({ length: nT }, (_, i) => lo + ((hi - lo) * i) / (nT - 1));
  const dpT = hi < 20 ? 2 : hi < 1000 ? 1 : 0;
  const hv = hover != null ? pts[hover] : null;
  const uid = "pc" + m.code.replace(/[^A-Z0-9]/gi, "");
  const xStep = narrow ? 3 : 2;
  const showX = (i) => i === recIdx || (i % xStep === 0 && Math.abs(i - recIdx) > (narrow ? 1 : 0));
  const idxAt = (clientX) => {
    const r = svgRef.current.getBoundingClientRect();
    const sx = ((clientX - r.left) * W) / r.width;
    return Math.max(0, Math.min(pts.length - 1, Math.round((sx - L) / step)));
  };
  const theoShown = !adjusted && m.theo != null && m.theo !== ref && recIdx >= 0;
  // In-plot labels (narrow): keep prev/theo labels apart.
  const leftSide = narrow && Math.abs(y(pts[0].v) - refY) > Math.abs(y(pts[pts.length - 1].v) - refY);
  const refLblY = refY - 6, theoLblY = theoShown ? (!leftSide && Math.abs(y(m.theo) + 13 - refLblY) < 12 ? refLblY + 26 : y(m.theo) + 13) : 0;
  const lblProps = narrow ? { x: leftSide ? L + 4 : W - R, textAnchor: leftSide ? "start" : "end", paintOrder: "stroke", stroke: "#0d1f28", strokeWidth: 3, strokeLinejoin: "round" } : { x: W - R + 6 };

  return (
    <div className="relative" ref={boxRef}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: "100%", height: "auto", touchAction: "pan-y" }} className="block h-auto w-full select-none"
        role="img" aria-label={`${m.code} closing prices around record date`}
        onPointerDown={(ev) => setHover(idxAt(ev.clientX))}
        onPointerMove={(ev) => { if (ev.pointerType === "mouse" || ev.buttons) setHover(idxAt(ev.clientX)); }}
        onPointerLeave={(ev) => { if (ev.pointerType === "mouse") setHover(null); }}>
        <defs>
          <linearGradient id={`${uid}up`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={T} y2={refY}><stop offset="0%" stopColor="#10b981" stopOpacity="0.5" /><stop offset="100%" stopColor="#10b981" stopOpacity="0.04" /></linearGradient>
          <linearGradient id={`${uid}dn`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={refY} y2={H - B}><stop offset="0%" stopColor="#f43f5e" stopOpacity="0.04" /><stop offset="100%" stopColor="#f43f5e" stopOpacity="0.45" /></linearGradient>
          <clipPath id={`${uid}ca`}><rect x="0" y="0" width={W} height={refY} /></clipPath>
          <clipPath id={`${uid}cb`}><rect x="0" y={refY} width={W} height={H - refY} /></clipPath>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="stroke-slate-400/20" strokeWidth="1" />
            <text x={L - 6} y={y(t) + 4} textAnchor="end" fontSize="11" className="fill-slate-400 font-mono">{fmtIN(t, dpT)}</text>
          </g>
        ))}
        <path d={area} fill={`url(#${uid}up)`} clipPath={`url(#${uid}ca)`} />
        <path d={area} fill={`url(#${uid}dn)`} clipPath={`url(#${uid}cb)`} />
        {recIdx >= 0 && (
          <g>
            <line x1={x(recIdx)} x2={x(recIdx)} y1={T} y2={H - B} stroke="#8b5cf6" strokeDasharray="3 4" strokeWidth="1.25" />
            <text x={x(recIdx)} y={T - 5} textAnchor={x(recIdx) > W - 90 ? "end" : "middle"} fontSize="11" className="fill-violet-300 font-semibold">Record date</text>
          </g>
        )}
        {ref != null && (
          <g>
            <line x1={L} x2={W - R} y1={refY} y2={refY} stroke="currentColor" className="text-slate-300" strokeDasharray="6 5" strokeWidth="1.25" />
            <text {...lblProps} y={narrow ? refLblY : refY + 4} fontSize="11" className="fill-slate-300 font-mono">prev {fmtIN(ref, dpT)}</text>
          </g>
        )}
        {theoShown && (
          <g>
            <line x1={x(recIdx)} x2={W - R} y1={y(m.theo)} y2={y(m.theo)} className="stroke-slate-400" strokeDasharray="1 4" strokeWidth="1.5" />
            <text {...lblProps} {...(narrow ? { x: W - R, textAnchor: "end" } : {})} y={narrow ? theoLblY : y(m.theo) + 4} fontSize="11" className="fill-slate-400 font-mono">theo {fmtIN(m.theo, dpT)}</text>
          </g>
        )}
        <path d={line} fill="none" stroke="#10b981" strokeWidth="2.25" strokeLinejoin="round" clipPath={`url(#${uid}ca)`} />
        <path d={line} fill="none" stroke="#f43f5e" strokeWidth="2.25" strokeLinejoin="round" clipPath={`url(#${uid}cb)`} />
        {hv && <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} className="stroke-slate-400/60" strokeWidth="1" />}
        {pts.map((p, i) => (
          <g key={p.d}>
            {showX(i) && <text x={x(i)} y={H - 9} textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"} fontSize="11" className={`font-mono ${i === recIdx ? "fill-violet-300" : "fill-slate-400"}`}>{fmtShort(p.d)}</text>}
            <circle cx={x(i)} cy={y(p.v)} r={hover === i || i === pts.length - 1 ? 4.5 : p.nt ? 3.5 : 2.5}
              className={p.nt ? "fill-violet-500 stroke-slate-900" : "fill-slate-900 stroke-white"} strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      {narrow && !hv && (
        <div className="mt-1 flex min-h-[92px] items-center justify-center rounded-xl border border-dashed border-white/15 p-2.5 text-center text-[11px] text-slate-400">Tap or drag across the chart for daily values.</div>
      )}
      {hv && (
        <div className={narrow ? "mt-1 min-h-[92px] rounded-xl border border-white/15 bg-slate-900/60 p-2.5 text-xs text-slate-100"
          : "pointer-events-none absolute top-0 z-10 w-[224px] max-w-full rounded-xl border border-white/20 bg-slate-900/95 p-2.5 text-xs text-slate-100 shadow-xl"}
          style={narrow ? undefined : { left: `clamp(0px, calc(${(x(hover) / W) * 100}% - 112px), calc(100% - 224px))` }}>
          <div className="font-semibold">{weekday(hv.d)}, {fmtD(hv.d)}</div>
          {hv.nt && <div className="text-[11px] text-violet-300">Record date · no trading (close carried)</div>}
          <div className="mt-1 flex items-baseline gap-2 font-mono">
            <span className="text-lg font-bold text-white">{fmtPx(hv.c)}</span>
            {ref != null && <span className={hv.v >= ref ? "text-emerald-400" : "text-rose-400"}>{hv.v >= ref ? "▲" : "▼"} {fmtPct(((hv.v / ref) - 1) * 100, 2)}</span>}
          </div>
          <div className="text-[11px] text-slate-400">vs prev close <span className="font-mono">{fmtPx(ref)}</span>{adjusted && hv.after && (dps || sp) ? " · dividend-adjusted" : ""}</div>
          {hv.after && (dps > 0 || sp > 0) && (
            <div className="mt-1 text-[11px] text-slate-300">Raw change <span className="font-mono">{fmtPct(((hv.c / ref) - 1) * 100, 2)}</span> · theoretical ex <span className="font-mono">{fmtPx(m.theo)}</span></div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Entry details (shared by table row and mobile card) ─────────────────────────── */
const EntryDetails = ({ e, onChart }) => (
  <div className="space-y-1 text-xs">
    <div><b>Venue / mode:</b> <span className={muted}>{e.venue || "—"}</span></div>
    {!e.meeting && e.type !== "REC" && <div><b>Meeting note:</b> <span className={muted}>{e.meetingRaw}</span></div>}
    {e.time && !isClock(e.time) && e.type !== "REC" && <div><b>Time (source):</b> <span className={muted}>{e.time}</span></div>}
    {e.m?.dps != null && <div><b>Cash per share:</b> <span className="font-mono">Tk {fmtIN(e.m.dps, 3)}</span> <span className={muted}>(face value Tk {fmtIN(e.m.face, 0)} per DSE{e.m.faceFlag ? ", assumed" : ""})</span></div>}
    {e.m?.sponsorPct ? <div><b>Payout basis:</b> <span className={muted}>company-wide; per share {fmtIN(e.m.payout, 0)}% with sponsors ({e.m.sponsorPct}%) excluded</span></div> : null}
    {e.m?.epsBasis && <div><b>EPS basis:</b> <span className={muted}>{e.m.epsBasis}</span></div>}
    {e.m && <div><b>DSE code:</b> <span className="font-mono">{e.m.code}</span>{e.m.px ? <> · <button type="button" onClick={(ev) => { ev.stopPropagation(); onChart(e); }} className="inline-flex min-h-[32px] items-center font-semibold text-teal-700 hover:underline dark:text-teal-300">Show price reaction ↑</button></> : null}</div>}
  </div>
);

/* ─────────────────────────── Loading shell (server render + first client render) ─────────────────────────── */
const Skeleton = () => (
  <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-5 sm:px-6" aria-busy="true" aria-label="Loading calendar">
    <div className="h-4 w-48 max-w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
    <div className="h-8 w-72 max-w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
    <div className="flex gap-3 overflow-hidden">{[0, 1, 2].map((i) => <div key={i} className="h-24 w-[72%] shrink-0 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10 sm:w-auto sm:flex-1" />)}</div>
    <div className="h-[420px] animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
  </div>
);

/* ─────────────────────────── Public component ─────────────────────────── */
export default function DseAgmCalendar({ theme, showThemeToggle = true, className = "" }) {
  // Date and device theme are read after mount, so server HTML and the first client render match.
  const [today, setToday] = useState(null);
  const [sysDark, setSysDark] = useState(false);
  const [userDark, setUserDark] = useState(null);
  useEffect(() => {
    setToday(dhakaToday());
    const onVis = () => { if (document.visibilityState === "visible") setToday(dhakaToday()); };
    document.addEventListener("visibilitychange", onVis);
    const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const onMq = (e) => setSysDark(e.matches);
    if (mq) { setSysDark(mq.matches); mq.addEventListener?.("change", onMq); }
    return () => { document.removeEventListener("visibilitychange", onVis); mq?.removeEventListener?.("change", onMq); };
  }, []);
  const controlled = theme === "light" || theme === "dark";
  const dark = controlled ? theme === "dark" : userDark ?? sysDark;
  const onToggleTheme = controlled || !showThemeToggle ? null : () => setUserDark(!dark);
  return (
    <div className={`${dark ? "dark" : ""} ${className}`}>
      <div className="relative isolate overflow-hidden bg-white text-slate-800 transition-colors dark:bg-[#08171d] dark:[color-scheme:dark] dark:bg-[linear-gradient(135deg,#061218,#0a1f26_50%,#121529)] dark:text-slate-200">
        <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden dark:block" aria-hidden="true">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        {today ? <Calendar today={today} dark={dark} onToggleTheme={onToggleTheme} /> : <Skeleton />}
      </div>
    </div>
  );
}

/* ─────────────────────────── Calendar (client state) ─────────────────────────── */
function Calendar({ today, dark, onToggleTheme }) {
  const [typeF, setTypeF] = useState("All");
  const [groupF, setGroupF] = useState("All");
  const [modeF, setModeF] = useState("All");
  const [statusF, setStatusF] = useState("All");
  const [q, setQ] = useState("");
  const [showRec, setShowRec] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [month, setMonth] = useState(() => { const d = toDate(today); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [sel, setSel] = useState(today);
  const [tip, setTip] = useState(null);
  const [sort, setSort] = useState({ key: "meeting", dir: 1 });
  const [open, setOpen] = useState(null);
  const [wOpen, setWOpen] = useState(null);
  const [selEv, setSelEv] = useState(() => {
    const c = EVENTS.filter((e) => e.m && e.m.px && e.m.exAdj != null).sort((a, b) => (b.record || "").localeCompare(a.record || "") || (b.m.dps || 0) - (a.m.dps || 0));
    return c[0]?.id ?? null;
  });
  const [adjusted, setAdjusted] = useState(true);
  const [rankMode, setRankMode] = useState("Latest");
  const [exp, setExp] = useState({});
  const toggle = (key) => setExp((s) => ({ ...s, [key]: !s[key] }));
  const cap = (key, arr) => (exp[key] ? arr : arr.slice(0, LIST_CAP));
  const [divSort, setDivSort] = useState("Record");
  const [divAhead, setDivAhead] = useState(false);
  const pick = (e) => { setSelEv(e.id); document.getElementById("price-reaction")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  useEffect(() => { setSel(today); }, [today]);

  const all = useMemo(() => EVENTS.map((e) => ({ ...e, status: statusOf(e, today) })), [today]);
  const filtered = useMemo(() => all.filter((e) =>
    (typeF === "All" || (typeF === "Record" ? e.type === "REC" : e.type === typeF)) &&
    (groupF === "All" || e.group === groupF) &&
    (modeF === "All" || e.mode === modeF) &&
    (statusF === "All" || (statusF === "Unscheduled" ? ["Postponed", "Court-pending", "Date TBA"].includes(e.status) : statusF === "Upcoming" ? ["Upcoming", "Today"].includes(e.status) : e.status === statusF)) &&
    (!q || e.company.toLowerCase().includes(q.toLowerCase()) || e.purpose.toLowerCase().includes(q.toLowerCase()))
  ), [all, typeF, groupF, modeF, statusF, q]);
  const activeFilters = [typeF, statusF, groupF, modeF].filter((v) => v !== "All").length;
  const resetFilters = () => { setTypeF("All"); setStatusF("All"); setGroupF("All"); setModeF("All"); setQ(""); };

  /* calendar index */
  const byDay = useMemo(() => {
    const m = {};
    filtered.forEach((e) => {
      if (e.meeting) (m[e.meeting] = m[e.meeting] || { meet: [], rec: [] }).meet.push(e);
      if (showRec && e.record) (m[e.record] = m[e.record] || { meet: [], rec: [] }).rec.push(e);
    });
    return m;
  }, [filtered, showRec]);

  /* KPIs (unfiltered, as-of today) */
  const k = useMemo(() => {
    const c = (f) => all.filter(f).length;
    return {
      total: all.length, egm: c((e) => e.type === "EGM"), rec: c((e) => e.type === "REC"),
      upcoming: c((e) => e.status === "Upcoming" || e.status === "Today"), today: c((e) => e.status === "Today"),
      next: all.filter((e) => e.meeting && e.meeting > today).sort((a, b) => a.meeting.localeCompare(b.meeting))[0],
    };
  }, [all, today]);

  /* derived analytics */
  const A = useMemo(() => {
    const agms = all.filter((e) => e.type === "AGM");
    const grp = GROUPS.map((g) => { const a = agms.filter((e) => e.group === g); return { g, n: a.length, none: a.filter((e) => e.noDividend).length }; });
    const unscheduled = all.filter((e) => ["Postponed", "Court-pending", "Date TBA"].includes(e.status))
      .map((e) => ({ e, age: e.record ? dayDiff(e.record, today) : null })).sort((a, b) => (b.age ?? -1e9) - (a.age ?? -1e9));
    const capEgm = all.filter((e) => e.type === "EGM" && /authori[sz]ed capital/i.test(e.purpose));
    const med = (arr) => { const a = [...arr].sort((x, y) => x - y); return a.length ? (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2) : null; };
    const payers = all.filter((e) => e.m && e.m.exAdj != null && ((e.m.dps || 0) > 0 || (e.m.stock || 0) > 0));
    const medRaw = med(payers.map((e) => e.m.exRaw)), medAdj = med(payers.map((e) => e.m.exAdj));
    const over100 = all.filter((e) => e.m && e.m.payoutCo != null && e.m.payoutCo > 100).sort((a, b) => b.m.payoutCo - a.m.payoutCo);
    const lossPayers = all.filter((e) => e.m && e.m.lossPayer);
    const walton = all.find((e) => e.m && e.m.code === "WALTONHIL" && e.m.exRaw != null);
    return { grp, unscheduled, capEgm, payers, medRaw, medAdj, over100, lossPayers, walton };
  }, [all, today]);

  /* calendar grid */
  const grid = useMemo(() => {
    const first = new Date(month.y, month.m, 1);
    const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7)); // Monday start
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return { iso: localISO(d), inMonth: d.getMonth() === month.m, day: d.getDate() }; });
  }, [month]);
  const shift = (n) => setMonth(({ y, m }) => { const d = new Date(y, m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const goToday = () => { const d = toDate(today); setMonth({ y: d.getFullYear(), m: d.getMonth() }); setSel(today); };
  const selDay = byDay[sel] || { meet: [], rec: [] };

  const SORTS = [["meeting", "Meeting"], ["record", "Record"], ["company", "Company"], ["cash", "Cash %"], ["eps", "EPS"], ["nav", "NAV"], ["payoutCo", "Payout"], ["yield", "Yield"], ["exAdj", "Ex-day adj."]];
  const rows = useMemo(() => {
    const key = sort.key;
    const MK = ["eps", "nav", "payoutCo", "yield", "exAdj"];
    const val = (e) => key === "company" ? e.company.toLowerCase() : key === "cash" ? e.cash : MK.includes(key) ? e.m?.[key] : e[key];
    return [...filtered].sort((a, b) => {
      const va = val(a), vb = val(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;   // blanks always last, whatever the direction
      if (vb == null) return -1;
      return (va > vb ? 1 : va < vb ? -1 : 0) * sort.dir;
    });
  }, [filtered, sort]);
  const th = (key, label, right = false) => (
    <th className={`whitespace-nowrap px-3 py-2 ${right ? "text-right" : "text-left"}`} aria-sort={sort.key === key ? (sort.dir > 0 ? "ascending" : "descending") : "none"}>
      <button type="button" className={`font-semibold uppercase hover:text-teal-600 dark:hover:text-teal-300 ${focusRing}`} onClick={() => setSort((s) => ({ key, dir: s.key === key ? -s.dir : 1 }))}>
        {label}{sort.key === key ? (sort.dir > 0 ? " ↑" : " ↓") : ""}
      </button>
    </th>
  );

  const upcoming = all.filter((e) => e.meeting && e.meeting >= today).sort((a, b) => a.meeting.localeCompare(b.meeting) || (parseTime(a.time) ?? 1e4) - (parseTime(b.time) ?? 1e4));
  /** Mouse-only hover tooltip (touch devices use tap: day panel / expandable rows). */
  const hoverProps = (e) => ({
    onPointerEnter: (ev) => { if (ev.pointerType === "mouse") setTip({ e, x: ev.clientX, y: ev.clientY }); },
    onPointerMove: (ev) => { if (ev.pointerType === "mouse") setTip({ e, x: ev.clientX, y: ev.clientY }); },
    onPointerLeave: () => setTip(null),
  });
  useEffect(() => { const h = () => setTip(null); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);

  const insights = [
    {
      t: `Ex-dividend drops are mostly mechanical`,
      b: `Across ${A.payers.length} dividend record dates with prices, the median ex-day move is ${fmtPct(A.medRaw, 2)} raw but ${fmtPct(A.medAdj, 2)} after adding back the dividend.${A.walton ? ` Walton fell ${fmtPct(A.walton.m.exRaw, 1)} on 21 Sep, yet ${fmtPct(A.walton.m.exAdj, 1)} against its theoretical ex-price of Tk ${fmtPx(A.walton.m.theo)}.` : ""}`,
    },
    {
      t: `${A.over100.length + A.lossPayers.length} dividends exceed earnings`,
      b: `Payout above 100% of EPS: ${A.over100.map((e) => `${shortName(e.company)} ${fmtIN(e.m.payoutCo, 0)}%`).join(", ")}. Paid despite a loss: ${A.lossPayers.map((e) => shortName(e.company)).join(", ")}. These come from reserves and may not repeat. Payout is company-wide: dividends that exclude sponsors are scaled by the public share (Chartered Life drops to 94%).`,
    },
    {
      t: `NBFIs and banks mostly skip dividends`,
      b: `${A.grp.find((g) => g.g === "NBFI").none} of ${A.grp.find((g) => g.g === "NBFI").n} NBFI AGMs and ${A.grp.find((g) => g.g === "Bank").none} of ${A.grp.find((g) => g.g === "Bank").n} bank AGMs declare no dividend, while every general insurer in the list pays one.`,
    },
    {
      t: `${A.capEgm.length} of ${k.egm} EGMs seek more authorized capital`,
      b: `${A.capEgm.map((e) => shortName(e.company)).join(", ")}. Three are banks and Runner also plans preference shares, which may point to upcoming capital raising.`,
    },
  ];

  return (
    <>
      <EventTooltip tip={tip} today={today} />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-5 sm:px-6 sm:py-6">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <div className="min-w-[min(100%,260px)] flex-1">
            <div className={`text-[11px] font-bold uppercase tracking-[0.14em] ${muted}`}>Dhaka Stock Exchange · Corporate calendar</div>
            <h1 className="text-[22px] font-extrabold leading-tight tracking-tight text-slate-900 [text-wrap:balance] dark:text-white sm:text-3xl">AGM · EGM · Record Dates</h1>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              DSE list updated <span className="font-mono">{fmtD(SOURCE.lastUpdated)}</span> · <span className="font-mono">{k.total}</span> entries · as of <span className="font-mono">{fmtD(today)}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Pill className="bg-slate-900/5 font-mono text-slate-700 dark:bg-white/10 dark:text-slate-200">{VERSION}</Pill>
            {onToggleTheme && (
              <button type="button" onClick={onToggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
                className={`flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold hover:bg-slate-50 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15 sm:min-h-[36px] ${focusRing}`}>
                {dark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
                )}
                {dark ? "Light" : "Dark"}
              </button>
            )}
          </div>
        </header>

        {/* KPI strip: always dark; swipe on phones */}
        <div className="dark -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {[
            { l: "Upcoming", v: k.upcoming, s: k.today ? `${k.today} today` : "from today", accent: "text-emerald-400" },
            { l: "Next meeting", v: k.next ? fmtShort(k.next.meeting) : "—", s: k.next ? shortName(k.next.company) : "none scheduled" },
            { l: "Record-date actions", v: k.rec, s: "GP & Marico interim, Intraco" },
          ].map((t) => (
            <div key={t.l} className={`${darkGlass} w-[72%] shrink-0 snap-start p-3.5 sm:w-auto sm:flex-1 sm:shrink`}>
              <div className={`truncate text-[11px] font-bold uppercase tracking-[0.1em] ${muted}`}>{t.l}</div>
              <div className={`mt-1 font-mono text-2xl font-bold tabular-nums ${t.accent || "text-white"}`}>{t.v}</div>
              <div className={`mt-0.5 truncate text-[11px] ${muted}`}>{t.s}</div>
            </div>
          ))}
        </div>

        {/* Filters: search always visible; the rest collapses on phones */}
        <div className={`${glass} p-3`}>
          <div className="flex items-center gap-2">
            <label htmlFor="agm-search" className="sr-only">Search company or purpose</label>
            <input id="agm-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search company…"
              className={`${ctrl} min-w-0 flex-1 px-3 font-normal placeholder:text-slate-400 sm:max-w-xs`} />
            <button type="button" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen} aria-controls="agm-filters"
              className={`${ctrl} flex shrink-0 items-center gap-1.5 px-3 sm:hidden`}>
              Filters{activeFilters ? <span className="rounded-full bg-teal-600 px-1.5 font-mono text-[11px] text-white">{activeFilters}</span> : null}
              <Chevron open={filtersOpen} />
            </button>
            <span className={`ml-auto hidden font-mono text-[11px] sm:inline ${muted}`}>{filtered.length}/{all.length}</span>
          </div>
          <div id="agm-filters" className={`${filtersOpen ? "flex" : "hidden"} mt-3 flex-col gap-2 sm:mt-2 sm:flex sm:flex-row sm:flex-wrap sm:items-center`}>
            <Seg full id="Type" value={typeF} onChange={setTypeF} options={["All", "AGM", "EGM", "Record"]} />
            <Seg full id="Status" value={statusF} onChange={setStatusF} options={["All", "Upcoming", { v: "Date passed", l: "Passed" }, { v: "Unscheduled", l: "No date" }]} />
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <select id="group-filter" value={groupF} onChange={(e) => setGroupF(e.target.value)} aria-label="Group" className={`${ctrl} min-w-0 px-2`}>
                <option value="All">All groups</option>{GROUPS.map((g) => <option key={g}>{g}</option>)}
              </select>
              <select id="mode-filter" value={modeF} onChange={(e) => setModeF(e.target.value)} aria-label="Mode" className={`${ctrl} min-w-0 px-2`}>
                <option value="All">All modes</option>{MODES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="flex min-h-[40px] items-center gap-2 text-xs font-semibold sm:min-h-[34px]">
                <input id="show-rec" type="checkbox" checked={showRec} onChange={(e) => setShowRec(e.target.checked)} className="h-4 w-4 rounded accent-violet-600" />
                Record dates on calendar
              </label>
              <span className={`font-mono text-[11px] sm:hidden ${muted}`}>{filtered.length}/{all.length}</span>
            </div>
            {(activeFilters > 0 || q) && (
              <button type="button" onClick={resetFilters} className={`min-h-[40px] rounded-xl px-3 text-xs font-semibold text-teal-700 hover:bg-teal-500/10 dark:text-teal-300 sm:min-h-[34px] ${focusRing}`}>Clear filters</button>
            )}
          </div>
        </div>

        {/* Calendar + day panel */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Section className="lg:col-span-2" kicker="Calendar" title={`${MONTHS_LONG[month.m]} ${month.y}`}
            right={
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className={`h-10 w-10 rounded-lg bg-slate-900/5 text-base font-bold hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 sm:h-8 sm:w-8 ${focusRing}`}>‹</button>
                <button type="button" onClick={goToday} className={`h-10 rounded-lg bg-slate-900/5 px-3 text-xs font-semibold hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 sm:h-8 sm:px-2.5 ${focusRing}`}>Today</button>
                <button type="button" onClick={() => shift(1)} aria-label="Next month" className={`h-10 w-10 rounded-lg bg-slate-900/5 text-base font-bold hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 sm:h-8 sm:w-8 ${focusRing}`}>›</button>
              </div>}>
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className={`pb-1 text-center text-[11px] font-bold uppercase ${muted} ${d === "Fri" || d === "Sat" ? "opacity-60" : ""} sm:px-1 sm:text-left sm:tracking-wider`}>
                  <span className="sm:hidden">{d.slice(0, 2)}</span><span className="hidden sm:inline">{d}</span>
                </div>
              ))}
              {grid.map((c) => {
                const d = byDay[c.iso]; const isT = c.iso === today; const isS = c.iso === sel;
                const meet = d?.meet || []; const rec = d?.rec || [];
                const n = meet.length + rec.length;
                return (
                  <button type="button" key={c.iso} onClick={() => setSel(c.iso)} aria-pressed={isS}
                    aria-label={`${fmtD(c.iso)}${n ? `: ${meet.length} meeting${meet.length === 1 ? "" : "s"}, ${rec.length} record date${rec.length === 1 ? "" : "s"}` : ""}`}
                    className={`relative flex min-h-[46px] min-w-0 flex-col items-center gap-0.5 rounded-lg border p-1 text-left transition sm:min-h-[92px] sm:items-stretch sm:rounded-xl sm:p-1.5 ${focusRing} ${
                      isS ? "border-teal-500 bg-white ring-1 ring-teal-500 dark:bg-white/[0.06]"
                        : c.inMonth ? "border-slate-200 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                        : "border-transparent bg-transparent opacity-40"}`}>
                    <span className={`font-mono text-[12px] font-bold leading-5 ${isT ? "flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white" : "text-slate-600 dark:text-slate-300"}`}>{c.day}</span>
                    <span className="flex max-w-full flex-wrap justify-center gap-0.5 sm:hidden" aria-hidden="true">
                      {meet.slice(0, 4).map((e) => <i key={e.id} className={`h-1.5 w-1.5 rounded-full ${TYPE_STYLE[e.type].dot}`} />)}
                      {rec.slice(0, Math.max(0, 4 - Math.min(4, meet.length))).map((e) => <i key={"r" + e.id} className="h-1.5 w-1.5 rounded-full bg-violet-500/60" />)}
                    </span>
                    {n > 4 && <span className="font-mono text-[11px] font-bold leading-none text-slate-500 dark:text-slate-400 sm:hidden" aria-hidden="true">+{n - 4}</span>}
                    {meet.slice(0, 3).map((e) => (
                      <span key={e.id} {...hoverProps(e)} className={`hidden truncate rounded-md px-1 py-[1px] text-[11px] font-semibold ring-1 ring-inset sm:block ${TYPE_STYLE[e.type].chip}`}>
                        {e.type === "EGM" ? "EGM · " : ""}{shortName(e.company)}
                      </span>
                    ))}
                    {meet.length > 3 && <span className={`hidden text-[11px] font-semibold sm:block ${muted}`}>+{meet.length - 3} more</span>}
                    {rec.length > 0 && (
                      <span className="mt-auto hidden items-center gap-1 text-[11px] font-semibold text-violet-700 dark:text-violet-300 sm:flex" {...(rec.length === 1 ? hoverProps(rec[0]) : {})}>
                        <i className="h-1.5 w-1.5 rounded-full bg-violet-500" />R × {rec.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] ${muted}`}>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-teal-500" />AGM</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-amber-500" />EGM</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-violet-500" />Record date</span>
              <span className="hidden sm:inline">Fri–Sat are Bangladesh weekend days (dimmed)</span><span className="lg:hidden">Tap a day: details below</span>
            </div>
          </Section>

          <div className="flex min-w-0 flex-col gap-4">
            <Section kicker={weekday(sel)} title={fmtD(sel)}>
              {selDay.meet.length + selDay.rec.length === 0 ? (
                <p className={`text-sm ${muted}`}>No meetings or record dates on this day{filtered.length < all.length ? " (with current filters)" : ""}.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {cap("day", selDay.meet).map((e) => (
                    <li key={"m" + e.id} className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-transparent dark:bg-white/[0.04]">
                      <div className="flex items-start justify-between gap-2">
                        <button type="button" onClick={() => pick(e)} className={`-my-1.5 min-w-0 py-1.5 text-left text-sm font-bold leading-snug text-slate-900 hover:text-teal-600 dark:text-white dark:hover:text-teal-300 ${focusRing}`}>{e.company}</button>
                        <Pill className={`ring-1 ring-inset ${TYPE_STYLE[e.type].chip}`}>{e.type}</Pill>
                      </div>
                      <div className={`mt-0.5 font-mono text-xs ${muted}`}>{isClock(e.time) ? e.time : "time n/a"} · {e.mode} · record {e.record ? fmtShort(e.record) : e.recordRaw}</div>
                      <div className="mt-1 text-xs">{e.purpose}</div>
                      <div className={`mt-1 break-words text-[11px] ${muted}`}>{e.venue}</div>
                    </li>
                  ))}
                  {cap("dayR", selDay.rec).map((e) => (
                    <li key={"r" + e.id} className="flex items-start gap-2 rounded-xl border border-dashed border-violet-400/50 p-2.5">
                      <i className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                      <div className="min-w-0 text-xs"><button type="button" onClick={() => pick(e)} className={`-my-1.5 py-1.5 text-left font-bold text-slate-900 hover:text-teal-600 dark:text-white dark:hover:text-teal-300 ${focusRing}`}>{e.company}</button> record date
                        <div className={muted}>{e.type === "REC" ? e.purpose : e.meeting ? `${e.type} on ${fmtD(e.meeting)} (${dayDiff(e.record, e.meeting)} d later)` : `${e.type}: ${e.status.toLowerCase()}`}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <MoreToggle total={selDay.meet.length} open={!!exp.day} onToggle={() => toggle("day")} label="meetings" />
              <MoreToggle total={selDay.rec.length} open={!!exp.dayR} onToggle={() => toggle("dayR")} label="record dates" />
            </Section>
            <Section kicker="Agenda" title="Today & upcoming">
              {upcoming.length === 0 && <p className={`text-sm ${muted}`}>No meetings scheduled from today in this list.</p>}
              <ul className="flex flex-col divide-y divide-slate-400/15">
                {cap("agenda", upcoming).map((e) => {
                  const dd = dayDiff(today, e.meeting);
                  return (
                    <li key={e.id} className="flex items-center gap-3 py-2">
                      <button type="button" aria-label={`Show ${fmtD(e.meeting)} on calendar`} onClick={() => { const d = toDate(e.meeting); setMonth({ y: d.getFullYear(), m: d.getMonth() }); setSel(e.meeting); }}
                        className={`w-12 shrink-0 rounded-lg bg-slate-900/5 py-1.5 text-center hover:bg-teal-500/15 dark:bg-white/5 ${focusRing}`}>
                        <div className="font-mono text-base font-bold leading-none text-slate-900 dark:text-white">{toDate(e.meeting).getDate()}</div>
                        <div className={`text-[11px] font-semibold uppercase ${muted}`}>{MONTHS[toDate(e.meeting).getMonth()]}</div>
                      </button>
                      <div className="min-w-0 flex-1">
                        <button type="button" onClick={() => pick(e)} className={`-my-1.5 block max-w-full truncate py-1.5 text-left text-sm font-semibold text-slate-900 hover:text-teal-600 dark:text-white dark:hover:text-teal-300 ${focusRing}`}>{shortName(e.company)}</button>
                        <div className={`truncate text-[11px] ${muted}`}>{e.type} · {isClock(e.time) ? e.time : "time n/a"} · {e.mode}</div>
                      </div>
                      <Pill className={dd === 0 ? STATUS_STYLE.Today : STATUS_STYLE.Upcoming}><span className="font-mono">{dd === 0 ? "Today" : `${dd} d`}</span></Pill>
                    </li>
                  );
                })}
              </ul>
              <MoreToggle total={upcoming.length} open={!!exp.agenda} onToggle={() => toggle("agenda")} />
            </Section>
          </div>
        </div>

        {/* Dividends proposed */}
        {(() => {
          const divs = all.filter((e) => e.type !== "EGM" && !e.noDividend && (e.cash != null || e.stock != null));
          const ahead = (e) => e.record && e.record > today;
          const list = divAhead ? divs.filter(ahead) : [...divs];
          list.sort(divSort === "Yield" ? (a, b) => (b.m?.yield ?? -1) - (a.m?.yield ?? -1)
            : divSort === "Cash %" ? (a, b) => (b.cash ?? -1) - (a.cash ?? -1)
            : (a, b) => (ahead(b) - ahead(a)) || (ahead(a) ? (a.record || "").localeCompare(b.record || "") : (b.record || "").localeCompare(a.record || "")));
          const nAhead = divs.filter(ahead).length, nStock = divs.filter((e) => e.stock).length, nInterim = divs.filter((e) => /interim/i.test(e.purpose)).length;
          const Flag = ({ c, children }) => <span className={`rounded px-1 py-px text-[11px] font-semibold ${c}`}>{children}</span>;
          return (
            <Section kicker="Dividends proposed" title={`${divs.length} dividends in the DSE list`}
              right={<div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 sm:w-auto">
                <Seg id="Sort dividends" value={divSort} onChange={setDivSort} options={["Record", "Yield", "Cash %"]} />
                <label className="flex min-h-[40px] items-center gap-2 text-xs font-semibold sm:min-h-[34px]"><input id="div-ahead" type="checkbox" checked={divAhead} onChange={(ev) => setDivAhead(ev.target.checked)} className="h-4 w-4 rounded accent-teal-600" />Record date ahead ({nAhead})</label>
              </div>}>
              <div className={`mb-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] ${muted}`}>
                <span><b className="font-mono text-slate-900 dark:text-white">{nStock}</b> include stock</span>
                <span><b className="font-mono text-slate-900 dark:text-white">{nInterim}</b> interim</span>
                <span><b className="font-mono text-slate-900 dark:text-white">{nAhead}</b> record date ahead</span>
                <span>Tk/share uses DSE face value · payout is company-wide</span>
              </div>
              <div className={`hidden grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] gap-3 border-b border-slate-400/20 px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider sm:grid ${muted}`}>
                <span>Company</span><span>Dividend</span><span>Record date</span><span className="text-right">Payout</span><span className="text-right">Yield</span>
              </div>
              {list.length === 0 && <p className={`py-2 text-sm ${muted}`}>No dividends match.</p>}
              <ul className="flex flex-col divide-y divide-slate-400/10">
                {cap("div", list).map((e) => {
                  const m = e.m || {}; const dd = e.record ? dayDiff(today, e.record) : null; const po = m.payoutCo;
                  return (
                    <li key={e.id}>
                      <button type="button" onClick={() => pick(e)} className={`grid w-full gap-1.5 rounded-lg px-1 py-2.5 text-left text-xs hover:bg-slate-50 dark:hover:bg-white/[0.04] sm:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] sm:items-center sm:gap-3 sm:px-2 sm:py-2 ${focusRing}`}>
                        <span className="min-w-0">
                          <b className="block truncate text-sm text-slate-900 dark:text-white">{shortName(e.company)}</b>
                          <span className="mt-0.5 flex flex-wrap gap-1">
                            {/interim/i.test(e.purpose) && <Flag c="bg-violet-500/15 text-violet-700 dark:text-violet-300">interim</Flag>}
                            {e.sponsorExcluded && <Flag c="bg-slate-500/10 text-slate-600 dark:text-slate-300">excl. sponsors</Flag>}
                            {e.cash != null && e.cash <= 0.25 && <Flag c="bg-amber-500/15 text-amber-700 dark:text-amber-300">token</Flag>}
                            {["Postponed", "Court-pending"].includes(e.status) && <Flag c={STATUS_STYLE[e.status]}>{e.status.toLowerCase()}</Flag>}
                            {m.lossPayer ? <Flag c="bg-rose-500/15 text-rose-700 dark:text-rose-300">paid from loss</Flag> : null}
                          </span>
                        </span>
                        <span className="grid grid-cols-2 gap-x-2 gap-y-1.5 sm:contents">
                          <span className="min-w-0">
                            <span className="block font-mono font-bold text-emerald-700 dark:text-emerald-400">{e.cash != null ? `${fmtIN(e.cash, e.cash % 1 ? 2 : 0)}% cash` : ""}{e.stock ? `${e.cash != null ? " + " : ""}${e.stock}% stock` : ""}</span>
                            <span className={`block font-mono text-[11px] ${muted}`}>{m.dps != null ? `Tk ${fmtIN(m.dps, m.dps < 0.1 ? 3 : 2)}/share` : "—"}</span>
                          </span>
                          <span className="min-w-0">
                            <span className="font-mono">{e.record ? fmtShort(e.record) : "TBA"}</span>
                            <span className={`block text-[11px] ${dd != null && dd > 0 ? "font-semibold text-emerald-600 dark:text-emerald-400" : muted}`}>{dd == null ? "not set" : dd > 0 ? `in ${dd} d` : dd === 0 ? "today" : "passed"}</span>
                          </span>
                          <span className={`font-mono sm:text-right ${m.lossPayer || (po || 0) > 100 ? "text-rose-600 dark:text-rose-400" : ""}`}><span className={`font-sans sm:hidden ${muted}`}>Payout </span>{po != null ? `${fmtIN(po, 0)}%${m.sponsorPct ? "*" : ""}` : m.lossPayer ? "loss" : "—"}</span>
                          <span className="font-mono sm:text-right"><span className={`font-sans sm:hidden ${muted}`}>Yield </span>{m.yield != null ? `${fmtIN(m.yield, 2)}%` : "—"}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <MoreToggle total={list.length} open={!!exp.div} onToggle={() => toggle("div")} label="dividends" />
            </Section>
          );
        })()}

        {/* Price reaction + ranking (DSE market data) */}
        {(() => {
          const se = all.find((e) => e.id === selEv) || null; const m = se?.m;
          const ranked = filtered.filter((e) => e.m && e.m.exAdj != null);
          ranked.sort(rankMode === "Latest" ? (a, b) => b.record.localeCompare(a.record) : rankMode === "Best" ? (a, b) => b.m.exAdj - a.m.exAdj : (a, b) => a.m.exAdj - b.m.exAdj);
          const maxAbs = Math.max(1, ...ranked.map((e) => Math.abs(e.m.exAdj)));
          const hasDiv = m && ((m.dps || 0) > 0 || (m.stock || 0) > 0);
          return (
            <div id="price-reaction" className="grid scroll-mt-24 gap-4 lg:grid-cols-3">
              <Section dark className="self-start lg:col-span-2" kicker={se ? `${m?.code || ""} · ${se.type === "REC" ? "Record date" : se.type + " record date"} ${se.record ? fmtD(se.record) : "TBA"}` : "Price reaction"}
                title={se ? se.company : "Select an entry"}
                right={m?.px && hasDiv ? <Seg id="Adjust" value={adjusted ? "Adjusted" : "Raw"} onChange={(v) => setAdjusted(v !== "Raw")} options={["Adjusted", "Raw"]} /> : null}>
                {m ? (
                  <>
                    <PriceChart key={se.id} m={m} adjusted={adjusted && hasDiv} />
                    {m.px && <p className={`mt-1 hidden text-[11px] sm:block ${muted}`}>Hover or drag across the chart for daily values.</p>}
                    {m.px && (
                      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                        <Stat l="Prev close" v={fmtPx(m.ref)} sub="last trade before record date" />
                        <Stat l="Theoretical ex" v={fmtPx(m.theo)} sub={hasDiv ? `less Tk ${fmtIN(m.dps || 0, 2)}${m.stock ? ` & ${m.stock}% stock` : ""}` : "no entitlement"} />
                        <Stat l="Ex-day move" v={fmtPct(adjusted && hasDiv ? m.exAdj : m.exRaw, 2)} cls={pctClass(adjusted && hasDiv ? m.exAdj : m.exRaw)} sub={adjusted && hasDiv ? `raw ${fmtPct(m.exRaw, 2)}` : `adjusted ${fmtPct(m.exAdj, 2)}`} />
                        <Stat l={`After ${m.nAfter} day${m.nAfter === 1 ? "" : "s"}`} v={fmtPct(m.d5Adj, 2)} cls={pctClass(m.d5Adj)} sub="vs theoretical ex" />
                      </div>
                    )}
                    <div className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] ${muted}`}>
                      <span className="flex items-center gap-1"><i className="h-2 w-3 rounded-sm bg-emerald-500/70" />above prev close</span>
                      <span className="flex items-center gap-1"><i className="h-2 w-3 rounded-sm bg-rose-500/70" />below prev close</span>
                      <span className="flex items-center gap-1"><i className="w-4 border-t border-dashed border-slate-400" />prev close</span>
                      <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-violet-500" />record date (no trading)</span>
                    </div>
                  </>
                ) : <p className={`text-sm ${muted}`}>No DSE data for this entry.</p>}
              </Section>
              <div className="flex min-w-0 flex-col gap-4">
                <Section kicker="Record-date reaction" title="Ex-day move, adjusted" right={<Seg id="Rank" value={rankMode} onChange={setRankMode} options={["Latest", "Best", "Worst"]} />}>
                  {ranked.length === 0 && <p className={`text-sm ${muted}`}>No priced record dates match the filters.</p>}
                  <ul className="flex flex-col">
                    {cap("rank", ranked).map((e) => (
                      <li key={e.id}>
                        <button type="button" onClick={() => setSelEv(e.id)} aria-pressed={selEv === e.id}
                          className={`grid min-h-[40px] w-full grid-cols-[minmax(0,1fr)_56px_52px] items-center gap-2 rounded-lg px-1.5 text-left text-xs hover:bg-slate-50 dark:hover:bg-white/[0.06] sm:min-h-[32px] ${focusRing} ${selEv === e.id ? "bg-teal-500/10 ring-1 ring-teal-500/40" : ""}`}>
                          <span className="truncate"><b className="text-slate-900 dark:text-white">{shortName(e.company)}</b> <span className={`font-mono ${muted}`}>{fmtShort(e.record)}</span></span>
                          <span className="relative h-2 rounded-full bg-slate-900/5 dark:bg-white/5">
                            <i className={`absolute top-0 h-2 rounded-full ${e.m.exAdj >= 0 ? "left-1/2 bg-emerald-500" : "right-1/2 bg-rose-500"}`} style={{ width: `${(Math.abs(e.m.exAdj) / maxAbs) * 50}%` }} />
                          </span>
                          <span className={`text-right font-mono tabular-nums ${pctClass(e.m.exAdj)}`}>{fmtPct(e.m.exAdj, 1)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <MoreToggle total={ranked.length} open={!!exp.rank} onToggle={() => toggle("rank")} />
                  <p className={`mt-2 text-[11px] ${muted}`}>{ranked.length} record dates with DSE prices. First trading day after the record date vs theoretical ex-price. Tap to chart.</p>
                </Section>
              </div>
            </div>
          );
        })()}

        {/* Insights + watchlist */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Section className="lg:col-span-2" kicker="Derived from the list and DSE data" title="Insights">
            <div className="grid gap-3 md:grid-cols-2">
              {insights.map((it, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-transparent dark:bg-white/[0.035]">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{it.t}</div>
                  <p className={`mt-1 text-xs leading-relaxed ${muted}`}>{it.b}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section className="self-start" kicker="Watchlist" title="No meeting date yet" right={<span className={`font-mono text-[11px] ${muted}`}>{A.unscheduled.length}</span>}>
            <ul className="flex flex-col divide-y divide-slate-400/10">
              {cap("watch", A.unscheduled).map(({ e, age }) => {
                const isO = wOpen === e.id;
                return (
                  <li key={e.id}>
                    <button type="button" onClick={() => setWOpen(isO ? null : e.id)} aria-expanded={isO}
                      className={`flex min-h-[40px] w-full items-center gap-2 text-left text-xs sm:min-h-[34px] ${focusRing}`}>
                      <i className={`h-2 w-2 shrink-0 rounded-full ${e.status === "Postponed" ? "bg-rose-500" : e.status === "Court-pending" ? "bg-orange-500" : "bg-slate-400"}`} aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate"><b className="text-slate-900 dark:text-white">{shortName(e.company)}</b> <span className={muted}>FY{fyLabel(e.yearEnd)}</span></span>
                      <span className={`font-mono tabular-nums ${age != null && age > 180 ? "text-rose-600 dark:text-rose-400" : muted}`}>{age == null ? "—" : age < 0 ? `in ${-age}d` : `${fmtIN(age)}d`}</span>
                      <Chevron open={isO} className={muted} />
                    </button>
                    {isO && (
                      <div className="mb-2 space-y-0.5 rounded-lg bg-slate-900/[0.03] p-2 text-[11px] dark:bg-white/[0.04]">
                        <div><Pill className={STATUS_STYLE[e.status]}>{e.status}</Pill> <span className={muted}>{e.type} · record {e.record ? fmtD(e.record) : e.recordRaw || "TBA"}</span></div>
                        <div>{e.purpose}</div>
                        <div className={`break-words ${muted}`}>{e.meetingRaw}</div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className={`mt-2 flex flex-wrap gap-2 text-[11px] ${muted}`}>
              <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-rose-500" />postponed</span>
              <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-orange-500" />court</span>
              <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-slate-400" />TBA</span>
            </div>
            <MoreToggle total={A.unscheduled.length} open={!!exp.watch} onToggle={() => toggle("watch")} />
            <p className={`mt-1 text-[11px] ${muted}`}>Days since record date. Tap a row for details.</p>
          </Section>
        </div>

        {/* Complete list: cards below lg, table on desktop */}
        <Section kicker="Complete list" title="All entries"
          right={<span className={`hidden text-[11px] lg:inline ${muted}`}>click a row for venue &amp; chart · sort by headers</span>}>
          <div className="mb-3 flex items-center gap-2 lg:hidden">
            <label htmlFor="agm-sort" className={`text-xs font-semibold ${muted}`}>Sort</label>
            <select id="agm-sort" value={sort.key} onChange={(ev) => setSort({ key: ev.target.value, dir: 1 })} className={`${ctrl} min-w-0 flex-1 px-2 sm:max-w-[200px]`}>
              {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <button type="button" onClick={() => setSort((s) => ({ ...s, dir: -s.dir }))} aria-label={sort.dir > 0 ? "Ascending; switch to descending" : "Descending; switch to ascending"}
              className={`${ctrl} w-12 shrink-0 font-mono`}>{sort.dir > 0 ? "↑" : "↓"}</button>
            <span className={`ml-auto font-mono text-[11px] ${muted}`}>{rows.length}</span>
          </div>
          {rows.length === 0 && <p className={`text-sm ${muted}`}>No entries match the filters.</p>}
          <ul className="grid gap-2 md:grid-cols-2 lg:hidden">
            {cap("table", rows).map((e) => {
              const isO = open === e.id, m = e.m;
              const metric = (l, v, cls = "") => (
                <div className="min-w-0"><div className={`text-[11px] ${muted}`}>{l}</div><div className={`truncate font-mono text-xs font-semibold ${cls}`}>{v}</div></div>
              );
              return (
                <li key={e.id} className={`min-w-0 rounded-xl border p-3 ${selEv === e.id ? "border-teal-500/50" : "border-slate-200 dark:border-white/10"} bg-white dark:bg-white/[0.03]`}>
                  <button type="button" onClick={() => { setOpen(isO ? null : e.id); if (m) setSelEv(e.id); }} aria-expanded={isO} className={`block w-full text-left ${focusRing}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-bold leading-snug text-slate-900 dark:text-white">{e.company}</div>
                        <div className={`text-[11px] ${muted}`}>{e.group}{e.yearEnd ? ` · YE ${e.yearEnd}` : ""}</div>
                      </div>
                      <Pill className={`ring-1 ring-inset ${TYPE_STYLE[e.type].chip}`}>{TYPE_STYLE[e.type].label}</Pill>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Pill className={STATUS_STYLE[e.status]}>{e.status}</Pill>
                      {e.type !== "REC" && e.mode !== "—" && <span className={`text-[11px] ${muted}`}>{e.mode}</span>}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {metric(e.type === "REC" ? "Meeting" : `Meeting${isClock(e.time) ? ` · ${e.time}` : ""}`, e.meeting ? fmtD(e.meeting) : e.type === "REC" ? "—" : "Not set")}
                      {metric("Record", e.record ? fmtD(e.record) : "TBA")}
                    </div>
                    <div className={`mt-2 text-xs ${e.noDividend ? "text-rose-600 dark:text-rose-400" : e.cash != null || e.stock != null ? "font-semibold text-emerald-700 dark:text-emerald-400" : ""}`}>{e.purpose}</div>
                    {m && (m.eps != null || m.nav != null || m.payoutCo != null || m.yield != null || m.exAdj != null || m.lossPayer) ? (
                      <div className="mt-2 grid grid-cols-3 gap-2 border-t border-slate-400/15 pt-2">
                        {metric("EPS", m.eps == null ? "—" : fmtIN(m.eps, 2), m.eps != null && m.eps < 0 ? "text-rose-600 dark:text-rose-400" : "")}
                        {metric("NAV", m.nav == null ? "—" : fmtIN(m.nav, 2), m.nav != null && m.nav < 0 ? "text-rose-600 dark:text-rose-400" : "")}
                        {metric("Payout", m.payoutCo != null ? `${fmtIN(m.payoutCo, 0)}%${m.sponsorPct ? "*" : ""}` : m.lossPayer ? "loss" : "—", m.lossPayer || (m.payoutCo || 0) > 100 ? "text-rose-600 dark:text-rose-400" : "")}
                        {metric("Yield", m.yield == null ? "—" : `${fmtIN(m.yield, 2)}%`)}
                        {metric("Ex-day adj.", m.exAdj == null ? "—" : fmtPct(m.exAdj, 1), pctClass(m.exAdj))}
                        <div className={`flex items-end justify-end text-[11px] font-semibold ${muted}`}>{isO ? "Less" : "More"}<Chevron open={isO} className="ml-1" /></div>
                      </div>
                    ) : (
                      <div className={`mt-2 flex items-center justify-end text-[11px] font-semibold ${muted}`}>{isO ? "Less" : "More"}<Chevron open={isO} className="ml-1" /></div>
                    )}
                  </button>
                  {isO && <div className="mt-2 border-t border-slate-400/15 pt-2"><EntryDetails e={e} onChart={pick} /></div>}
                </li>
              );
            })}
          </ul>
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1180px] text-xs">
              <thead className={`border-b border-slate-400/20 text-[11px] uppercase tracking-wide ${muted}`}>
                <tr>{th("company", "Company")}<th className="px-3 py-2 text-left">Type</th><th className="px-3 py-2 text-left">Group</th>
                  {th("meeting", "Meeting")}<th className="px-3 py-2 text-left">Time</th>{th("record", "Record")}{th("cash", "Dividend / purpose")}
                  {th("eps", "EPS", true)}{th("nav", "NAV", true)}{th("payoutCo", "Payout", true)}{th("yield", "Yield", true)}{th("exAdj", "Ex-day adj.", true)}
                  <th className="px-3 py-2 text-left">Mode</th><th className="px-3 py-2 text-left">Status</th></tr>
              </thead>
              <tbody>
                {cap("table", rows).map((e) => (
                  <React.Fragment key={e.id}>
                    <tr onClick={() => { setOpen(open === e.id ? null : e.id); if (e.m) setSelEv(e.id); }} aria-expanded={open === e.id} className={`cursor-pointer border-b border-slate-400/10 hover:bg-slate-50 dark:hover:bg-white/[0.04] ${selEv === e.id ? "bg-teal-500/[0.07]" : ""}`}>
                      <td className="min-w-[190px] px-3 py-2 font-semibold text-slate-900 dark:text-white">{e.company}<div className={`font-normal ${muted}`}>{e.yearEnd && `YE ${e.yearEnd}`}</div></td>
                      <td className="px-3 py-2"><Pill className={`ring-1 ring-inset ${TYPE_STYLE[e.type].chip}`}>{TYPE_STYLE[e.type].label}</Pill></td>
                      <td className={`px-3 py-2 ${muted}`}>{e.group}</td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono">{e.meeting ? fmtD(e.meeting) : <span className={`font-sans ${muted}`}>{e.type === "REC" ? "—" : e.meetingRaw.length > 40 ? e.meetingRaw.slice(0, 40) + "…" : e.meetingRaw}</span>}</td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono">{isClock(e.time) ? e.time : <span className={muted} title={e.time || ""}>—</span>}</td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono">{e.record ? fmtD(e.record) : <span className={`font-sans ${muted}`}>TBA</span>}</td>
                      <td className="max-w-[260px] px-3 py-2">
                        {e.cash != null && <span className="mr-1 font-mono font-bold text-emerald-700 dark:text-emerald-400">{fmtIN(e.cash, e.cash % 1 ? 2 : 0)}%</span>}
                        <span className={e.noDividend ? "text-rose-600 dark:text-rose-400" : ""}>{e.purpose}</span>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-2 text-right font-mono ${e.m?.eps != null && e.m.eps < 0 ? "text-rose-600 dark:text-rose-400" : ""}`} title={e.m?.epsBasis || ""}>{e.m?.eps == null ? <span className={muted}>—</span> : fmtIN(e.m.eps, 2)}</td>
                      <td className={`whitespace-nowrap px-3 py-2 text-right font-mono ${e.m?.nav != null && e.m.nav < 0 ? "text-rose-600 dark:text-rose-400" : ""}`}>{e.m?.nav == null ? <span className={muted}>—</span> : fmtIN(e.m.nav, 2)}</td>
                      <td className={`whitespace-nowrap px-3 py-2 text-right font-mono ${e.m?.lossPayer || (e.m?.payoutCo || 0) > 100 ? "text-rose-600 dark:text-rose-400" : ""}`}>{e.m?.payoutCo != null ? <span title={e.m.sponsorPct ? `Company-wide; per share ${fmtIN(e.m.payout, 0)}% (sponsors ${e.m.sponsorPct}% excluded)` : ""}>{fmtIN(e.m.payoutCo, 0)}%{e.m.sponsorPct ? "*" : ""}</span> : e.m?.lossPayer ? "loss" : <span className={muted}>—</span>}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-right font-mono" title={e.m?.yBasis || ""}>{e.m?.yield == null ? <span className={muted}>—</span> : `${fmtIN(e.m.yield, 2)}%`}</td>
                      <td className={`whitespace-nowrap px-3 py-2 text-right font-mono ${pctClass(e.m?.exAdj)}`}>{e.m?.exAdj == null ? <span className={muted}>—</span> : fmtPct(e.m.exAdj, 1)}</td>
                      <td className="px-3 py-2">{e.mode}</td>
                      <td className="px-3 py-2"><Pill className={STATUS_STYLE[e.status]}>{e.status}</Pill></td>
                    </tr>
                    {open === e.id && (
                      <tr className="bg-white dark:bg-white/[0.03]">
                        <td colSpan={14} className="px-3 py-2"><EntryDetails e={e} onChart={pick} /></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <MoreToggle total={rows.length} open={!!exp.table} onToggle={() => toggle("table")} label="entries" />
        </Section>

        <footer className={`pb-2 text-center text-[11px] leading-relaxed ${muted}`}>
          * Payout for dividends that exclude sponsors is company-wide (per-share payout × public share). {VERSION} · Source: <a className="underline hover:text-teal-600" href={SOURCE.url} target="_blank" rel="noreferrer">DSE Company_AGM_EGM.pdf</a> (last updated {fmtD(SOURCE.lastUpdated)}).
          Prices, EPS, NAV and face value: DSE company pages and day-end archive, fetched 24 Sep 2026. Type, group and mode tags are derived. &quot;Date passed&quot; means the scheduled date is before today; it does not confirm the meeting was held.
        </footer>
      </div>
    </>
  );
}
