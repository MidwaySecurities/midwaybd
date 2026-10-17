'use client'
import { useState } from "react";
import defaultContent from "./rights-issue-content.json";
import { Icon } from "./icons";

/**
 * Rights Issue Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1da1f2 / #0b78bd / #e6f4fd Stocks accent, #1fa855 WhatsApp only.
 * Math (theoretical price; the exchange and the company set the real figures; before fees and charges; no fee fields):
 *   per = shares owned per offer (A), new = new shares per offer (B)
 *   rights shares = floor(shares x B / A)   (no fractional shares on the DSE; the leftover is handled per the company's announcement, not modelled)
 *   amount to pay = rights x offer price;  shares after = shares + rights
 *   estimated price after (TERP) = (A x price + B x offer) / (A + B)
 *   value of holding after = shares after x TERP;  net change = value after - money paid - shares x price
 *   new average cost = (cost x shares + amount paid) / shares after
 * Rights are never described as sellable or tradable (rules differ by issue); the page says to check the announcement.
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

export default function RightsIssueCalculator({ content = defaultContent }) {
  const { meta, links, header, inputs, warnings, results, how, faq, glossary, related, legal, cta } = content;
  const [shares, setShares] = useState(inputs.shares.default);
  const [price, setPrice] = useState(inputs.price.default);
  const [per, setPer] = useState(inputs.ratio.perDefault);
  const [nw, setNw] = useState(inputs.ratio.newDefault);
  const [offer, setOffer] = useState(inputs.offer.default);
  const [cost, setCost] = useState(inputs.cost.default);
  const [preset, setPreset] = useState(null);
  const set = (fn) => (v) => { setPreset(null); fn(v); };
  const applyPreset = (x) => { setPreset(x.label); setShares(x.shares); setPrice(x.price); setPer(x.per); setNw(x.new); setOffer(x.offer); setCost(x.cost); };

  const sh = Math.floor(Math.max(num(shares), 0)), p = num(price), A = num(per), B = num(nw), o = num(offer), c0 = num(cost);
  const msgs = [];
  if (sh <= 0) msgs.push(warnings.shares);
  if (p <= 0) msgs.push(warnings.price);
  if (A <= 0 || B <= 0) msgs.push(warnings.ratio);
  if (o <= 0) msgs.push(warnings.offer); else if (p > 0 && o >= p) msgs.push(warnings.offerHigh);

  const ok = sh > 0 && p > 0 && A > 0 && B > 0 && o > 0;
  const exact = ok ? (sh * B) / A : 0;
  const rights = Math.floor(exact + 1e-9);
  const frac = Math.max(exact - rights, 0), hasFrac = frac > 0.0001;
  const pay = rights * o;
  const total = sh + rights;
  const tp = ok ? (A * p + B * o) / (A + B) : 0;
  const chg = ok ? (tp / p - 1) * 100 : 0;
  const rightVal = ok ? Math.max(tp - o, 0) : 0;
  const before = sh * p;
  const afterTake = total * tp, afterSkip = sh * tp;
  const netTake = afterTake - pay - before, netSkip = afterSkip - before;
  const newCost = c0 > 0 && total > 0 ? (c0 * sh + pay) / total : 0;
  const sgn = (n) => (n > 0.005 ? "+" : n < -0.005 ? "−" : "") + taka(Math.abs(n));

  const R = results.rows;
  const table = ok ? [
    [R.shares, total.toLocaleString("en-IN"), sh.toLocaleString("en-IN")],
    [R.pay, taka(pay), taka(0)],
    [R.value, taka(afterTake), taka(afterSkip)],
    [R.net, sgn(netTake), sgn(netSkip)],
  ] : [];
  if (ok && c0 > 0) table.push([R.cost, taka(rights > 0 ? newCost : c0), taka(c0)]);

  let insight = "";
  if (ok) {
    const f = (t, after) => t.replace("{n} rights", rights.toLocaleString("en-IN") + (rights === 1 ? " right" : " rights")).replace("{n}", rights.toLocaleString("en-IN"))
      .replace("{pay}", taka(pay)).replace("{total}", total.toLocaleString("en-IN")).replace("{tprice}", taka(tp)).replace("{after}", taka(after))
      .replace("{shares}", sh.toLocaleString("en-IN")).replace("{drop}", taka(Math.abs(netSkip)));
    insight = rights === 0 ? f(results.insightNone, afterSkip) : f(results.insightTake, afterTake) + " " + f(results.insightSkip, afterSkip);
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
              <Field id="shares" label={inputs.shares.label} value={shares} onChange={set(setShares)} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.shares.chips.map((v) => <Chip key={v} on={sh === v} onClick={() => set(setShares)(String(v))}>{v.toLocaleString("en-IN")}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.shares.hint}</p>
            </div>
            <div>
              <Field id="price" label={inputs.price.label} left={inputs.price.left} value={price} onChange={set(setPrice)} />
              <p className="mt-1 text-[12px] text-[#6b7280]">
                {inputs.price.hint}{" "}
                <a href={links.dsePrices} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004990]">{inputs.price.dseLink} ↗</a>
              </p>
            </div>
            <div>
              <p className="text-[13px] font-semibold">{inputs.ratio.label}</p>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <Field id="per" label={inputs.ratio.perLabel} value={per} onChange={set(setPer)} />
                <Field id="new" label={inputs.ratio.newLabel} value={nw} onChange={set(setNw)} />
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.ratio.hint}</p>
            </div>
            <div>
              <Field id="offer" label={inputs.offer.label} left={inputs.offer.left} value={offer} onChange={set(setOffer)} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.offer.hint}</p>
            </div>
            <div>
              <Field id="cost" label={inputs.cost.label} left={inputs.cost.left} value={cost} onChange={set(setCost)} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.cost.hint}</p>
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
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.rightsLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[28px]">{ok ? rights.toLocaleString("en-IN") : results.empty}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.payLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[28px]">{ok ? taka(pay, pay >= 1000 ? 0 : 2) : "—"}</p>
            </div>
            <p className="col-span-2 text-[12px] text-[#4b5563]">{results.sub}</p>
          </div>
          {ok && (
            <div className="mt-3">
              <dl className="divide-y divide-[#e5e7e5] border-b border-[#e5e7e5]">
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-[13px] text-[#4b5563]">{R.price}</dt>
                  <dd className="text-right text-[14px] font-semibold">{taka(tp)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-[13px] text-[#4b5563]">{R.chg}</dt>
                  <dd className="text-right text-[14px] font-semibold">{(chg > 0.005 ? "+" : chg < -0.005 ? "−" : "") + Math.abs(chg).toFixed(2)}%</dd>
                </div>
                {hasFrac && (
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[13px] text-[#4b5563]">{results.fractionRow}</dt>
                    <dd className="text-right text-[14px] font-semibold">{results.fractionValue.replace("{n}", frac.toFixed(2))}</dd>
                  </div>
                )}
              </dl>
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 border-b border-[#e5e7e5] pb-2 pt-3 text-[11px] font-semibold uppercase leading-tight tracking-wide">
                <span />
                <span className="text-right text-[#0b78bd]">{results.colTake}</span>
                <span className="text-right text-[#004990]">{results.colSkip}</span>
              </div>
              {table.map(([k, a, b]) => (
                <div key={k} className="grid grid-cols-[1.2fr_1fr_1fr] items-baseline gap-2 border-b border-[#e5e7e5] py-2.5">
                  <span className="text-[12px] leading-snug text-[#4b5563]">{k}</span>
                  <span className="text-right text-[13px] font-semibold">{a}</span>
                  <span className="text-right text-[13px] font-semibold">{b}</span>
                </div>
              ))}
              {hasFrac && <p className="mt-3 rounded-lg bg-[#fdf6e3] p-3 text-[13px] leading-relaxed text-[#4b5563]">{results.fractionNote}</p>}
              <div className="mt-4 rounded-lg bg-[#f3f4f6] p-3">
                <p className="text-[14px] font-semibold">{results.insightTitle}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{insight}</p>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[#6b7280]">{results.assume}</p>
            </div>
          )}
          <div className="mt-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-3">
            <p className="text-[13px] font-semibold">{results.caution.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{results.caution.body}</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <div className="rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4">
          <p className="text-[15px] font-semibold">{how.record.title}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{how.record.body}</p>
          <a href={links.stocks} className="mt-2 inline-block text-[14px] font-semibold text-[#004990]">{how.record.link} →</a>
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
