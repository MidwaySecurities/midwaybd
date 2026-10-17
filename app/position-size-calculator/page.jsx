'use client'
import { useState } from "react";
import defaultContent from "./position-size-content.json";
import { Icon } from "./icons";

/**
 * Position Size and Stop-Loss Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1da1f2 / #0b78bd / #e6f4fd Stocks accent, #1fa855 WhatsApp only.
 * Math (long trades only, whole shares, before fees, charges and tax; no fee fields by decision):
 *   loss limit = capital x risk% / 100;  distance per share = buy - stop
 *   shares by risk = floor(loss limit / distance);  shares by capital = floor(capital / buy)
 *   shares = min(both);  cost = shares x buy;  loss if stopped = shares x distance
 *   with a target: reward:risk = (target - buy) / distance;  break-even win rate = 1 / (1 + reward:risk)
 * The tool never suggests a risk percentage. Stop-loss is never described as guaranteed.
 * SEO: visible FAQ + JSON-LD (WebApplication, FAQPage, BreadcrumbList) from the same content.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
const GAIN = "text-[#1f7a4d]", LOSS = "text-[#b42318]";
// Bangladesh Taka (৳). "en-IN" is used only for lakh/crore digit grouping, e.g. ৳1,00,000.
const taka = (n, d = 2) => "৳" + n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const num = (v) => {
  const x = parseFloat(String(v).replace(/,/g, "").trim());
  return isNaN(x) ? 0 : x;
};

function Field({ id, label, unit, left, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-semibold">{label}</label>
      <div className="mt-1 flex items-center rounded-lg border border-[#c9cdc9] bg-white px-3 focus-within:border-[#004990]">
        {left && <span className="mr-1 text-[#6b7280]">{left}</span>}
        <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent py-3 text-[16px] font-semibold outline-none" />
        {unit && <span className="ml-1 whitespace-nowrap text-[12px] text-[#6b7280]">{unit}</span>}
      </div>
    </div>
  );
}

function Chip({ on, onClick, children }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      className={"rounded-full border px-3 py-1.5 text-[12px] font-semibold " + (on ? "border-[#004990] bg-[#004990] text-white" : "border-[#c9cdc9] bg-white text-[#004990]")}>
      {children}
    </button>
  );
}

export default function PositionSizeCalculator({ content = defaultContent }) {
  const { meta, links, header, inputs, warnings, results, how, faq, glossary, related, legal, cta } = content;
  const [capital, setCapital] = useState(inputs.capital.default);
  const [risk, setRisk] = useState(inputs.risk.default);
  const [entry, setEntry] = useState(inputs.entry.default);
  const [stop, setStop] = useState(inputs.stop.default);
  const [target, setTarget] = useState(inputs.target.default);
  const [preset, setPreset] = useState(null);
  const set = (fn) => (v) => { setPreset(null); fn(v); };
  const applyPreset = (x) => { setPreset(x.label); setCapital(x.capital); setRisk(x.risk); setEntry(x.entry); setStop(x.stop); setTarget(x.target); };

  const cap = num(capital), rp = num(risk), E = num(entry), S = num(stop), T = num(target);
  const msgs = [];
  if (cap <= 0) msgs.push(warnings.capital);
  if (rp <= 0 || rp > 100) msgs.push(warnings.risk); else if (rp > 10) msgs.push(warnings.riskHigh);
  if (E <= 0) msgs.push(warnings.entry);
  else if (S <= 0 || S >= E) msgs.push(warnings.stop);
  if (target.trim() !== "" && E > 0 && T <= E) msgs.push(warnings.target);

  const ok = cap > 0 && rp > 0 && rp <= 100 && E > 0 && S > 0 && S < E;
  const riskAmt = cap * rp / 100;
  const dist = E - S;
  const byRisk = ok ? Math.floor(riskAmt / dist + 1e-9) : 0;
  const byCap = ok ? Math.floor(cap / E + 1e-9) : 0;
  const N = Math.min(byRisk, byCap);
  const limited = ok && byRisk > byCap;
  const cost = N * E, loss = N * dist;
  const hasT = ok && T > E;
  const rr = hasT ? (T - E) / dist : 0;
  const gain = hasT ? N * (T - E) : 0;
  const win = hasT ? 100 / (1 + rr) : 0;

  const R = results.rows;
  const rows = [];
  if (ok) {
    rows.push([R.riskAmt, taka(riskAmt)], [R.stopDist, taka(dist) + " (" + (dist / E * 100).toFixed(2) + "%)"]);
    if (N > 0) {
      rows.push([R.loss, taka(loss)], [R.lossPct, (loss / cap * 100).toFixed(2) + "%"], [R.posPct, (cost / cap * 100).toFixed(1) + "%"]);
      if (hasT) rows.push([R.gain, taka(gain)], [R.rr, rr.toFixed(2) + " : 1"], [R.win, win.toFixed(1) + "%"]);
    }
  }

  let insight = "";
  if (ok && N > 0) {
    insight = results.insight.replace("{risk}", taka(riskAmt)).replace("{dist}", taka(dist)).replace("{n}", N.toLocaleString("en-IN"))
      .replace("{cost}", taka(cost)).replace("{loss}", taka(loss)).replace("{lossPct}", (loss / cap * 100).toFixed(2) + "%");
    if (hasT) insight += results.insightTarget.replace("{gain}", taka(gain)).replace("{rr}", rr.toFixed(1) + " times");
  }

  const url = (meta.origin || "") + meta.path;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: header.headline, url, description: meta.description,
      applicationCategory: "FinanceApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
      provider: { "@type": "Organization", name: "Midway Securities Ltd.", url: meta.origin } },
    { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: header.breadcrumb.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b })) },
  ];

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-6 text-[#111827]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        <h1 className="text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      <section className="grid gap-4 px-4 py-6 md:grid-cols-2 md:gap-6 md:px-10 md:py-10">
        <div className={card + " p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{inputs.title}</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <p className="text-[13px] font-semibold">{inputs.presets.label}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {inputs.presets.items.map((x) => <Chip key={x.label} on={preset === x.label} onClick={() => applyPreset(x)}>{x.label}</Chip>)}
              </div>
            </div>
            <div>
              <Field id="capital" label={inputs.capital.label} left={inputs.capital.left} value={capital} onChange={set(setCapital)} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.capital.chips.map((v) => <Chip key={v} on={cap === v} onClick={() => set(setCapital)(String(v))}>{taka(v, 0)}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.capital.hint}</p>
            </div>
            <div>
              <Field id="risk" label={inputs.risk.label} unit={inputs.risk.unit} value={risk} onChange={set(setRisk)} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.risk.chips.map((v) => <Chip key={v} on={rp === num(v)} onClick={() => set(setRisk)(v)}>{v}%</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.risk.hint}</p>
            </div>
            <div>
              <Field id="entry" label={inputs.entry.label} left={inputs.entry.left} value={entry} onChange={set(setEntry)} />
              <p className="mt-1 text-[12px] text-[#6b7280]">
                {inputs.entry.hint}{" "}
                <a href={links.dsePrices} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004990]">{inputs.entry.dseLink} ↗</a>
              </p>
            </div>
            <div>
              <Field id="stop" label={inputs.stop.label} left={inputs.stop.left} value={stop} onChange={set(setStop)} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.stop.hint}</p>
              <p className="mt-2 text-[12px] font-semibold">{inputs.stop.chipsLabel}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {inputs.stop.chips.map((v) => (
                  <Chip key={v} on={E > 0 && Math.abs(S - E * (1 - v / 100)) < 0.005} onClick={() => E > 0 && set(setStop)((Math.round(E * (1 - v / 100) * 100) / 100).toString())}>{v}%</Chip>
                ))}
              </div>
            </div>
            <div>
              <Field id="target" label={inputs.target.label} left={inputs.target.left} value={target} onChange={set(setTarget)} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.target.hint}</p>
            </div>
            {msgs.length > 0 && (
              <p role="alert" className="rounded-lg border border-[#fad870] bg-[#fdf6e3] p-3 text-[13px] text-[#4b5563]">{msgs.join(" ")}</p>
            )}
          </div>
        </div>

        <div className={card + " h-fit border-t-[3px] border-t-[#1da1f2] p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{results.title}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#e6f4fd] p-4" aria-live="polite">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.sharesLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[30px]">{ok ? N.toLocaleString("en-IN") : "—"}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.valueLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[30px]">{ok && N > 0 ? taka(cost, cost >= 1000 ? 0 : 2) : "—"}</p>
            </div>
            <p className="col-span-2 text-[12px] text-[#4b5563]">{ok ? results.sub : results.empty}</p>
          </div>
          {ok && N === 0 && <p className="mt-3 rounded-lg bg-[#fdf6e3] p-3 text-[13px] leading-relaxed text-[#4b5563]">{results.noShares}</p>}
          <dl className="mt-3 divide-y divide-[#e5e7e5]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[13px] text-[#4b5563]">{k}</dt>
                <dd className={"text-right text-[14px] font-semibold " + (k === R.loss ? LOSS : k === R.gain ? GAIN : "")}>{v}</dd>
              </div>
            ))}
          </dl>
          {hasT && N > 0 && <p className="mt-2 text-[12px] leading-relaxed text-[#6b7280]">{results.winNote}</p>}
          {limited && N > 0 && <p className="mt-3 rounded-lg bg-[#fdf6e3] p-3 text-[13px] leading-relaxed text-[#4b5563]">{results.limited}</p>}
          {ok && N > 0 && (
            <div className="mt-4 rounded-lg bg-[#f3f4f6] p-3">
              <p className="text-[14px] font-semibold">{results.insightTitle}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{insight}</p>
            </div>
          )}
          <div className="mt-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-3">
            <p className="text-[13px] font-semibold">{results.caution.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{results.caution.body}</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <h2 className="text-xl font-semibold md:text-2xl">{how.title}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {how.items.map((h, i) => (
            <li key={h.title} className={card + " p-4"}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#004990] text-[13px] font-semibold text-white">{i + 1}</span>
              <p className="mt-3 text-[15px] font-semibold">{h.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{h.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[14px] leading-relaxed text-[#4b5563]">{how.example}</p>
      </section>

      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <h2 className="text-xl font-semibold md:text-2xl">{faq.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {faq.items.map((f) => (
            <div key={f.q} className={card + " p-4"}>
              <dt className="text-[15px] font-semibold">{f.q}</dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{glossary.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {glossary.items.map((g) => (
            <div key={g.term} className={card + " p-4"}>
              <dt className="text-[14px] font-semibold text-[#0b78bd]">{g.term}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="px-4 pb-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:text-xs">{legal}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 px-4 pb-6 md:px-10">
        {related.map((l) => (
          <li key={l.href}><a href={l.href} className="text-[14px] font-semibold text-[#004990]">{l.label} →</a></li>
        ))}
      </ul>

      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <a href={links.openBo} className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</a>
          <a href={links.whatsapp} className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </a>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</a>
        <a href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></a>
      </div>
    </div>
  );
}
