'use client'
import { useState } from "react";
import defaultContent from "./bond-vs-deposit-content.json";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * Bond vs Bank Deposit Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1f7a4d / #e7f3ec Government Bonds accent, #1fa855 WhatsApp only.
 * Math (simple interest paid out, not reinvested; both return the original amount; before fees and other charges):
 *   per year before tax = amount x rate / 100;  tax = that x tax% / 100;  after tax = difference
 *   total = after tax x years;  after-tax return = rate x (1 - tax%)
 *   deposit rate that matches the bond = bond rate x (1 - bond tax%) / (1 - deposit tax%)
 * Bond: min Tk 1,00,000 in multiples of Tk 1,00,000; AIT 10% (editable); interest every 6 months (years in steps of 0.5).
 * Deposit tax at source is a client-editable field (default 10%, hint says it depends on tax status): CONFIRM the default with Midway.
 * No fee fields. Numbers on the page are examples, not current rates.
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

export default function BondVsDepositCalculator({ content = defaultContent }) {
  const { meta, links, header, inputs, warnings, results, how, faq, glossary, related, legal, cta } = content;
  const [amount, setAmount] = useState(inputs.amount.default);
  const [years, setYears] = useState(inputs.years.default);
  const [bondRate, setBondRate] = useState(inputs.bondRate.default);
  const [bondTax, setBondTax] = useState(inputs.bondTax.default);
  const [depRate, setDepRate] = useState(inputs.depRate.default);
  const [depTax, setDepTax] = useState(inputs.depTax.default);
  const [preset, setPreset] = useState(null);
  const set = (fn) => (v) => { setPreset(null); fn(v); };
  const applyPreset = (x) => { setPreset(x.label); setAmount(x.amount); setYears(x.years); setBondRate(x.bondRate); setDepRate(x.depRate); setBondTax(x.bondTax); setDepTax(x.depTax); };

  const amt = num(amount), y = num(years), br = num(bondRate), bt = num(bondTax), dr = num(depRate), dt = num(depTax);
  const msgs = [];
  if (amt <= 0) msgs.push(warnings.amount);
  else if (amt < 100000 || amt % 100000 !== 0) msgs.push(warnings.bondMin);
  if (br > 25 || dr > 25) msgs.push(warnings.rate);
  if (y <= 0) msgs.push(warnings.years); else if ((y * 2) % 1 !== 0) msgs.push(warnings.yearsStep);
  if (bt < 0 || bt > 100 || dt < 0 || dt > 100) msgs.push(warnings.tax);

  const ok = amt > 0 && y > 0 && bt >= 0 && bt <= 100 && dt >= 0 && dt <= 100;
  const calc = (rate, tax) => { const g = amt * rate / 100, t = g * tax / 100, n = g - t; return { g, t, n, total: n * y, ret: rate * (1 - tax / 100) }; };
  const B = calc(br, bt), D = calc(dr, dt);
  const diff = B.total - D.total;
  const match = dt < 100 ? br * (1 - bt / 100) / (1 - dt / 100) : 0;
  const R = results.rows;
  const yTxt = y.toString();
  const table = ok ? [
    [R.yearGross, taka(B.g), taka(D.g)],
    [R.yearTax, "− " + taka(B.t), "− " + taka(D.t)],
    [R.yearNet, taka(B.n), taka(D.n)],
    [R.total, taka(B.total), taka(D.total)],
    [R.rate, B.ret.toFixed(2) + "%", D.ret.toFixed(2) + "%"],
  ] : [];
  const fill = (t) => t.replace("{diff}", taka(Math.abs(diff))).replace(/\{y\}/g, yTxt).replace("{match}", match.toFixed(2) + "%");
  const insight = ok ? (Math.abs(diff) < 0.5 ? fill(results.same) : diff > 0 ? fill(results.bondMore) : fill(results.depMore)) : "";

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
              <Field id="amount" label={inputs.amount.label} left={inputs.amount.left} value={amount} onChange={set(setAmount)} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.amount.chips.map(([l, v]) => <Chip key={v} on={amt === v} onClick={() => set(setAmount)(String(v))}>{l}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.amount.hint}</p>
            </div>
            <div>
              <Field id="years" label={inputs.years.label} unit={inputs.years.unit} value={years} onChange={set(setYears)} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.years.chips.map((v) => <Chip key={v} on={y === v} onClick={() => set(setYears)(String(v))}>{v} {inputs.years.unit}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.years.hint}</p>
            </div>
            <div className="rounded-lg border border-[#1f7a4d] bg-[#e7f3ec] p-3">
              <p className="text-[14px] font-semibold text-[#1f7a4d]">{inputs.bondTitle}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Field id="bondRate" label={inputs.bondRate.label} unit={inputs.bondRate.unit} value={bondRate} onChange={set(setBondRate)} />
                <Field id="bondTax" label={inputs.bondTax.label} unit={inputs.bondTax.unit} value={bondTax} onChange={set(setBondTax)} />
              </div>
              <p className="mt-2 text-[12px] text-[#4b5563]">{inputs.bondRate.hint} {inputs.bondTax.hint}</p>
            </div>
            <div className="rounded-lg border border-[#c9cdc9] bg-[#f7f8f7] p-3">
              <p className="text-[14px] font-semibold text-[#004990]">{inputs.depTitle}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Field id="depRate" label={inputs.depRate.label} unit={inputs.depRate.unit} value={depRate} onChange={set(setDepRate)} />
                <Field id="depTax" label={inputs.depTax.label} unit={inputs.depTax.unit} value={depTax} onChange={set(setDepTax)} />
              </div>
              <p className="mt-2 text-[12px] text-[#4b5563]">{inputs.depRate.hint} {inputs.depTax.hint}</p>
            </div>
            <p className="text-[12px] text-[#6b7280]">{inputs.exampleNote}</p>
            {msgs.length > 0 && (
              <p role="alert" className="rounded-lg border border-[#fad870] bg-[#fdf6e3] p-3 text-[13px] text-[#4b5563]">{msgs.join(" ")}</p>
            )}
          </div>
        </div>

        <div className={card + " h-fit border-t-[3px] border-t-[#1f7a4d] p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{results.title}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#e7f3ec] p-4" aria-live="polite">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1f7a4d]">{results.bondLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#1f7a4d] md:text-[28px]">{ok ? taka(B.total, B.total >= 1000 ? 0 : 2) : results.empty}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#004990]">{results.depLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#004990] md:text-[28px]">{ok ? taka(D.total, D.total >= 1000 ? 0 : 2) : "—"}</p>
            </div>
            <p className="col-span-2 text-[12px] text-[#4b5563]">{results.subTotal.replace("{y}", yTxt)}</p>
          </div>
          {ok && (
            <div className="mt-3">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 border-b border-[#e5e7e5] pb-2 text-[11px] font-semibold uppercase tracking-wide">
                <span />
                <span className="text-right text-[#1f7a4d]">{results.colBond}</span>
                <span className="text-right text-[#004990]">{results.colDep}</span>
              </div>
              {table.map(([k, b, d]) => (
                <div key={k} className="grid grid-cols-[1.2fr_1fr_1fr] items-baseline gap-2 border-b border-[#e5e7e5] py-2.5">
                  <span className="text-[12px] leading-snug text-[#4b5563]">{k}</span>
                  <span className="text-right text-[13px] font-semibold">{b}</span>
                  <span className="text-right text-[13px] font-semibold">{d}</span>
                </div>
              ))}
              <dl className="divide-y divide-[#e5e7e5]">
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-[13px] font-semibold">{results.diffLabel}</dt>
                  <dd className="text-right text-[14px] font-semibold">{diff > 0.5 ? "Bond +" : diff < -0.5 ? "Deposit +" : ""}{taka(Math.abs(diff))}</dd>
                </div>
                {dt < 100 && (
                  <div className="py-2.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[13px] text-[#4b5563]">{results.matchLabel}</dt>
                      <dd className="text-right text-[14px] font-semibold">{match.toFixed(2)}%</dd>
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#6b7280]">{results.matchHint}</p>
                  </div>
                )}
              </dl>
              <div className="mt-4 rounded-lg bg-[#f3f4f6] p-3">
                <p className="text-[14px] font-semibold">{results.insightTitle}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{insight}</p>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[#6b7280]">{results.assume}</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <h2 className="text-xl font-semibold md:text-2xl">{results.beyond.title}</h2>
        <p className="mt-1 text-[14px] text-[#4b5563]">{results.beyond.intro}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {results.beyond.rows.map((r) => (
            <li key={r[0]} className={card + " p-4"}>
              <p className="text-[14px] font-semibold">{r[0]}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4b5563]"><span className="font-semibold text-[#1f7a4d]">{results.colBond}: </span>{r[1]}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]"><span className="font-semibold text-[#004990]">{results.colDep}: </span>{r[2]}</p>
            </li>
          ))}
        </ul>
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
              <dt className="text-[14px] font-semibold text-[#1f7a4d]">{g.term}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="px-4 pb-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:text-xs">{legal}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 px-4 pb-6 md:px-10">
        {related.map((l) => (
          <li key={l.href}><Link href={l.href} className="text-[14px] font-semibold text-[#004990]">{l.label} →</Link></li>
        ))}
      </ul>

      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.openBo} className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</Link>
          <Link href={links.whatsapp} className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </Link>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.openBo} target="_blank" className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        <Link href={links.whatsapp} target="_blank" aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></Link>
      </div>
    </div>
  );
}
