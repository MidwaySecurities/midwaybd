'use client'
import { useState } from "react";
import defaultContent from "./bond-calculator-content.json";
import { Icon } from "./icons";

/**
 * Bond Interest Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1f7a4d / #e7f3ec Government Bonds accent, #1fa855 WhatsApp only.
 * Math: gross per 6 months = face x rate / 2; AIT = gross x AIT%; net = gross - AIT.
 * Payments = floor(years x 2). No fee fields: bond fees are never published (WhatsApp only).
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
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
        {unit && <span className="ml-1 text-[#6b7280]">{unit}</span>}
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

export default function BondInterestCalculator({ content = defaultContent }) {
  const { links, header, inputs, warnings, results, legal, cta, related } = content;
  const [face, setFace] = useState(String(inputs.face.default));
  const [rate, setRate] = useState(inputs.rate.default);
  const [yrs, setYrs] = useState(inputs.years.default);
  const [ait, setAit] = useState(inputs.ait.default);

  const f = num(face), r = num(rate), y = num(yrs), a = num(ait);
  const msgs = [];
  if (f > 0 && f < 100000) msgs.push(warnings.min);
  else if (f > 0 && f % 100000 !== 0) msgs.push(warnings.multiple);
  if (r > 25) msgs.push(warnings.rate);
  if (y > 0 && (y * 2) % 1 !== 0) msgs.push(warnings.years);

  const gross = (f * r) / 100 / 2, tax = (gross * a) / 100, net = gross - tax;
  const n = Math.floor(y * 2);
  const rows = [
    [results.gross, taka(gross)],
    [`${results.ait} (${a}%)`, "− " + taka(tax), true],
    [results.yearly, taka(net * 2)],
    [results.count, `${n} payments`],
    [results.total, taka(net * n)],
    [results.principal, taka(f, 0)],
  ];

  return (
    <div className="mx-auto max-w-6xl bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav>
        <h1 className="mt-4 text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      <section className="grid gap-4 px-4 py-6 md:grid-cols-2 md:gap-6 md:px-10 md:py-10">
        <div className={card + " p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{inputs.title}</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <Field id="face" label={inputs.face.label} left="৳" value={face} onChange={setFace} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.face.chips.map(([l, v]) => <Chip key={v} on={f === v} onClick={() => setFace(String(v))}>{l}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.face.hint}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field id="rate" label={inputs.rate.label} unit={inputs.rate.unit} value={rate} onChange={setRate} />
              <Field id="yrs" label={inputs.years.label} unit={inputs.years.unit} value={yrs} onChange={setYrs} />
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5">
                {inputs.years.chips.map((v) => <Chip key={v} on={y === v} onClick={() => setYrs(String(v))}>{v}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.years.hint}</p>
            </div>
            <div>
              <Field id="ait" label={inputs.ait.label} unit={inputs.ait.unit} value={ait} onChange={setAit} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.ait.hint}</p>
            </div>
            {msgs.length > 0 && (
              <p role="alert" className="rounded-lg border border-[#fad870] bg-[#fdf6e3] p-3 text-[13px] text-[#4b5563]">{msgs.join(" ")}</p>
            )}
          </div>
        </div>

        <div className={card + " border-t-[3px] border-t-[#1f7a4d] p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{results.title}</h2>
          <div className="mt-4 rounded-lg bg-[#e7f3ec] p-4">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#1f7a4d]">{results.bigLabel}</p>
            <p className="mt-1 text-[32px] font-semibold leading-tight text-[#1f7a4d] md:text-4xl">{taka(net)}</p>
            <p className="mt-1 text-[12px] text-[#4b5563]">{results.bigSub}</p>
          </div>
          <dl className="mt-3 divide-y divide-[#e5e7e5]">
            {rows.map(([k, v, neg]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[13px] text-[#4b5563]">{k}</dt>
                <dd className={"text-right text-[14px] font-semibold " + (neg ? "text-[#b42318]" : "")}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[13px] leading-relaxed text-[#4b5563]">
            <b className="text-[#111827]">{results.lifePrefix}</b> {results.lifeMiddle} <b className="text-[#111827]">{taka(net * n + f)}</b>. {results.lifeSuffix}
          </p>
        </div>
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
          <a href={links.openBo} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</a>
          <a href={links.portal} className="rounded-lg border border-white px-5 py-3.5 text-center text-[15px] font-semibold text-white md:px-6 md:py-3">{cta.secondary}</a>
          <a href={links.whatsapp} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
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
