'use client'
import { useState } from "react";
import defaultContent from "./bonus-adjustment-content.json";
import { Icon } from "./icons";

/**
 * Bonus Share Adjustment Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1da1f2 / #0b78bd / #e6f4fd Stocks accent, #1fa855 WhatsApp only.
 * Math (estimate, the DSE sets the real adjusted price):
 *   bonus shares = floor(shares x bonus% / 100);  shares after = shares + bonus
 *   cash per share = face x cash% / 100
 *   adjusted price = (price - cash per share) / (1 + bonus% / 100)
 *   new cost price = total cost / shares after   (total cost unchanged)
 * No tax on bonus shares. No fee fields.
 * No fractional shares on the DSE: the fraction is not issued; the company pays cash instead (amount set by the company, not modelled).
 * Price: entered by the client. If content.priceFeed.items has {symbol, ltp}, a symbol search fills it
 *   (feed must come from an approved Midway/DSE data source, never scraped in the browser).
 * SEO: visible FAQ + JSON-LD (WebApplication, FAQPage, BreadcrumbList) from the same content.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
// Bangladesh Taka (৳). "en-IN" is used only for lakh/crore digit grouping, e.g. ৳1,00,000.
const taka = (n, d = 2) => "৳" + n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const num = (v) => {
  const x = parseFloat(String(v).replace(/,/g, "").trim());
  return isNaN(x) ? 0 : x;
};

function Field({ id, label, unit, left, value, onChange, list }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-semibold">{label}</label>
      <div className="mt-1 flex items-center rounded-lg border border-[#c9cdc9] bg-white px-3 focus-within:border-[#004990]">
        {left && <span className="mr-1 text-[#6b7280]">{left}</span>}
        <input id={id} list={list} inputMode={list ? "text" : "decimal"} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent py-3 text-[16px] font-semibold outline-none" />
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

export default function BonusAdjustmentCalculator({ content = defaultContent }) {
  const { meta, links, priceFeed, header, inputs, warnings, results, how, faq, glossary, related, legal, cta } = content;
  const [shares, setShares] = useState(inputs.shares.default);
  const [cost, setCost] = useState(inputs.cost.default);
  const [price, setPrice] = useState(inputs.price.default);
  const [face, setFace] = useState(inputs.face.default);
  const [cash, setCash] = useState(inputs.cash.default);
  const [stock, setStock] = useState(inputs.stock.default);
  const [symbol, setSymbol] = useState("");
  const [fed, setFed] = useState(false);

  const feed = priceFeed && priceFeed.items && priceFeed.items.length > 0;
  const pickSymbol = (v) => {
    setSymbol(v);
    const hit = feed && priceFeed.items.find((i) => i.symbol.toLowerCase() === v.trim().toLowerCase());
    if (hit) { setPrice(String(hit.ltp)); setFed(true); }
  };

  const sh = num(shares), c0 = num(cost), p = num(price), fv = num(face), c = num(cash), s = num(stock);
  const msgs = [];
  if (p <= 0) msgs.push(warnings.price);
  if (fv <= 0) msgs.push(warnings.face);
  if (c > 100 || s > 100) msgs.push(warnings.pct);
  const perShare = (fv * c) / 100;
  if (p > 0 && perShare >= p) msgs.push(warnings.cashHigh);

  const ok = p > 0 && fv > 0 && perShare < p && sh > 0;
  const exact = (sh * s) / 100;
  const bonus = Math.floor(exact + 1e-9), total = sh + bonus;
  const frac = Math.max(exact - bonus, 0), hasFrac = frac > 0.0001; // no fractional shares on the DSE
  const adj = ok ? (p - perShare) / (1 + s / 100) : 0;
  const chg = ok ? (adj / p - 1) * 100 : 0;
  const valBefore = sh * p, valAfter = total * adj, cashGross = sh * perShare;
  const newCost = c0 > 0 && total > 0 ? (c0 * sh) / total : 0;

  const R = results.rows;
  const rows = [[R.bonus, bonus.toLocaleString("en-IN")]];
  if (hasFrac) rows.push([R.fraction, results.fractionValue.replace("{n}", frac.toFixed(2))]);
  if (ok) {
    rows.push([R.chg, (chg > 0 ? "+" : "") + chg.toFixed(2) + "%"]);
    rows.push([R.before, taka(valBefore)], [R.after, taka(valAfter)]);
    if (cashGross > 0) rows.push([R.cash, taka(cashGross)]);
  }
  if (c0 > 0) {
    rows.push([R.totalCost, taka(c0 * sh)], [R.costBefore, taka(c0)]);
    if (ok) rows.push([R.costAfter, taka(newCost)]);
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

  const insight = results.insight
    .replace("{chg}", Math.abs(chg).toFixed(2) + "%").replace("{extra}", bonus.toLocaleString("en-IN"))
    .replace("{after}", taka(valAfter)).replace("{before}", taka(valBefore));

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-6 text-[#111827] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        <h1 className="mt-0 text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      <section className="grid gap-4 px-4 py-6 md:grid-cols-2 md:gap-6 md:px-10 md:py-10">
        <div className={card + " p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{inputs.title}</h2>
          <div className="mt-4 grid gap-4">
            {feed && (
              <div>
                <Field id="symbol" list="symbols" label={inputs.price.symbolLabel} value={symbol} onChange={pickSymbol} />
                <datalist id="symbols">{priceFeed.items.map((i) => <option key={i.symbol} value={i.symbol} />)}</datalist>
                <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.price.symbolHint}</p>
              </div>
            )}
            <div>
              <Field id="price" label={inputs.price.label} left={inputs.price.left} value={price} onChange={(v) => { setPrice(v); setFed(false); }} />
              <p className="mt-1 text-[12px] text-[#6b7280]">
                {fed ? inputs.price.feedNote.replace("{source}", priceFeed.source).replace("{asOf}", priceFeed.asOf) : inputs.price.hint}{" "}
                <a href={links.dsePrices} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004990]">{inputs.price.dseLink} ↗</a>
              </p>
            </div>
            <div>
              <Field id="shares" label={inputs.shares.label} value={shares} onChange={setShares} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.shares.chips.map((v) => <Chip key={v} on={sh === v} onClick={() => setShares(String(v))}>{v.toLocaleString("en-IN")}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.shares.hint}</p>
            </div>
            <div>
              <Field id="cost" label={inputs.cost.label} left={inputs.cost.left} value={cost} onChange={setCost} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.cost.hint}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold">{inputs.presets.label}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {inputs.presets.items.map((x) => (
                  <Chip key={x.label} on={c === num(x.cash) && s === num(x.stock)} onClick={() => { setCash(x.cash); setStock(x.stock); }}>{x.label}</Chip>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field id="stock" label={inputs.stock.label} unit={inputs.stock.unit} value={stock} onChange={setStock} />
              <Field id="cash" label={inputs.cash.label} unit={inputs.cash.unit} value={cash} onChange={setCash} />
            </div>
            <p className="-mt-2 text-[12px] text-[#6b7280]">{inputs.stock.hint} {inputs.cash.hint}</p>
            <div>
              <Field id="face" label={inputs.face.label} left={inputs.face.left} value={face} onChange={setFace} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.face.hint}</p>
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
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.priceLabel}</p>
              <p className="mt-1 text-[24px] font-semibold leading-tight text-[#0b78bd] md:text-[30px]">{ok ? taka(adj) : results.empty}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.sharesLabel}</p>
              <p className="mt-1 text-[24px] font-semibold leading-tight text-[#0b78bd] md:text-[30px]">{total.toLocaleString("en-IN")}</p>
            </div>
            <p className="col-span-2 text-[12px] text-[#4b5563]">{results.sub}</p>
          </div>
          <dl className="mt-3 divide-y divide-[#e5e7e5]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[13px] text-[#4b5563]">{k}</dt>
                <dd className="text-right text-[14px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {hasFrac && <p className="mt-3 rounded-lg bg-[#fdf6e3] p-3 text-[13px] leading-relaxed text-[#4b5563]">{results.fractionNote}</p>}
          {ok && (
            <div className="mt-4 rounded-lg bg-[#f3f4f6] p-3">
              <p className="text-[14px] font-semibold">{bonus === 0 && hasFrac ? results.insightNoneTitle : results.insightTitle}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">
                {bonus === 0 && hasFrac ? results.insightNone : insight + (hasFrac ? " " + results.gapNote : "")}
                {cashGross > 0 && " " + results.insightCash.replace("{cash}", taka(cashGross))}
                {bonus > 0 && c0 > 0 && " " + results.costInsight}
              </p>
            </div>
          )}
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
        <div className="mt-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4">
          <p className="text-[15px] font-semibold">{how.record.title}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{how.record.body}</p>
          <a href={links.stocks} className="mt-2 inline-block text-[14px] font-semibold text-[#004990]">{how.record.link} →</a>
        </div>
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

      <section className="bg-[#004990] px-4 py-6 lg:mb-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <a href={links.openBo} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</a>
          <a href={links.whatsapp}  target="_blank"  className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
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
