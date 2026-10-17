'use client'
import { useState } from "react";
import defaultContent from "./pnl-content.json";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * Profit and Loss Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1da1f2 / #0b78bd / #e6f4fd Stocks accent, #1fa855 WhatsApp only.
 * Gain #1f7a4d, loss #b42318 (always shown with a + / − sign and a word, never by color alone).
 * Math (average cost method, before fees, charges and tax; no fee fields by decision):
 *   total shares T = sum(shares); total cost C = sum(shares x price); average cost A = C / T
 *   profit or loss = (P - A) x shares;  return = (P / A - 1) x 100
 *   selling S of T shares leaves the average cost of the rest at A.
 * Bonus shares: add as a buy at 0 (price may be 0).
 * Shares are whole numbers only (no fractional shares on the DSE), decimals are rounded down.
 * SEO: visible FAQ + JSON-LD (WebApplication, FAQPage, BreadcrumbList) from the same content.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
const GAIN = "text-[#1f7a4d]", LOSS = "text-[#b42318]";
// Bangladesh Taka (৳). "en-IN" is used only for lakh/crore digit grouping, e.g. ৳1,00,000.
const taka = (n, d = 2) => "৳" + n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const signed = (n, d = 2) => (n > 0.005 ? "+" : n < -0.005 ? "−" : "") + taka(Math.abs(n), d);
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

let uid = 0;
const mk = (l) => ({ id: ++uid, shares: l.shares, price: l.price });

export default function ProfitLossCalculator({ content = defaultContent }) {
  const { meta, links, header, inputs, warnings, results, how, faq, glossary, related, legal, cta } = content;
  const [lots, setLots] = useState(() => inputs.lots.defaults.map(mk));
  const [price, setPrice] = useState(inputs.price.default);
  const [sold, setSold] = useState(inputs.sold.default);
  const [preset, setPreset] = useState(null);

  const setLot = (id, k, v) => { setPreset(null); setLots((ls) => ls.map((l) => (l.id === id ? { ...l, [k]: v } : l))); };
  const addLot = () => { setPreset(null); setLots((ls) => (ls.length >= inputs.lots.max ? ls : [...ls, mk({ shares: "", price: "" })])); };
  const delLot = (id) => { setPreset(null); setLots((ls) => (ls.length > 1 ? ls.filter((l) => l.id !== id) : ls)); };
  const applyPreset = (x) => { setPreset(x.label); setLots(x.lots.map(mk)); setPrice(x.price); setSold(x.sold); };

  // ---- math ----
  const rawShares = lots.map((l) => num(l.shares));
  const rawPrices = lots.map((l) => num(l.price));
  const whole = rawShares.every((s) => s === Math.floor(s));
  const neg = rawShares.some((s) => s < 0) || rawPrices.some((p) => p < 0);
  const valid = lots.map((l, i) => ({ sh: Math.floor(Math.max(rawShares[i], 0)), pr: Math.max(rawPrices[i], 0) })).filter((l) => l.sh > 0);
  const T = valid.reduce((a, l) => a + l.sh, 0);
  const C = valid.reduce((a, l) => a + l.sh * l.pr, 0);
  const A = T > 0 ? C / T : 0;
  const P = num(price);
  const ok = T > 0 && P > 0;
  const soldRaw = Math.floor(Math.max(num(sold), 0));
  const S = Math.min(soldRaw, T), rem = T - S;
  const partial = S > 0;

  const msgs = [];
  if (T <= 0) msgs.push(warnings.lots);
  if (P <= 0) msgs.push(warnings.price);
  if (!whole) msgs.push(warnings.whole);
  if (neg) msgs.push(warnings.negative);
  if (soldRaw > T && T > 0) msgs.push(warnings.sold);

  const basis = partial ? S : T;
  const pl = ok ? basis * (P - A) : 0;
  const pct = ok && A > 0 ? (P / A - 1) * 100 : null;
  const pctTxt = pct === null ? "" : (pct > 0.005 ? "+" : pct < -0.005 ? "−" : "") + Math.abs(pct).toFixed(2) + "%";
  const tone = pl > 0.005 ? GAIN : pl < -0.005 ? LOSS : "text-[#111827]";
  const word = pl > 0.005 ? "Profit" : pl < -0.005 ? "Loss" : "Break-even";

  const R = results.rows;
  const rows = [];
  if (T > 0) {
    rows.push([R.shares, T.toLocaleString("en-IN")], [R.invested, taka(C)]);
  }
  if (ok && !partial) {
    rows.push([R.value, taka(T * P)]);
    if (pct !== null) rows.push([R.pct, pctTxt]);
  }
  if (ok && partial) {
    rows.push([R.sold, S.toLocaleString("en-IN")], [R.proceeds, taka(S * P)], [R.plSold, signed(S * (P - A))]);
    if (pct !== null) rows.push([R.pct, pctTxt]);
    rows.push([R.held, rem.toLocaleString("en-IN")]);
    if (rem > 0) rows.push([R.heldCost, taka(rem * A)], [R.heldValue, taka(rem * P)], [R.heldPl, signed(rem * (P - A))]);
  }
  if (T > 0 && A > 0) rows.push([R.breakeven, taka(A) + " (" + results.breakevenNote + ")"]);

  const fill = (t) => t
    .replace("{price}", taka(P)).replace("{amt}", taka(Math.abs(pl))).replace(" ({pct})", pct === null ? "" : " (" + pctTxt + ")")
    .replace("{n}", T.toLocaleString("en-IN")).replace("{avg}", taka(A)).replace("{sold}", S.toLocaleString("en-IN"))
    .replace("{rem}", rem.toLocaleString("en-IN")).replace("{word}", word.toLowerCase());
  let insight = "";
  if (ok) {
    if (!partial) insight = pl > 0.005 ? fill(A === 0 ? results.gainAllFree : results.gain) : pl < -0.005 ? fill(results.loss) : fill(results.flat);
    else if (rem === 0) insight = fill(results.soldEverything);
    else insight = pl > 0.005 ? fill(results.soldGain) : pl < -0.005 ? fill(results.soldLoss) : fill(results.soldFlat);
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
              <p className="text-[15px] font-semibold">{inputs.lots.title}</p>
              <ul className="mt-2 grid gap-3">
                {lots.map((l, i) => {
                  const sh = Math.floor(Math.max(num(l.shares), 0)), pr = Math.max(num(l.price), 0);
                  return (
                    <li key={l.id} className="rounded-lg border border-[#e5e7e5] bg-[#f7f8f7] p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0b78bd]">{inputs.lots.buy} {i + 1}</p>
                        {lots.length > 1 && (
                          <button type="button" onClick={() => delLot(l.id)} aria-label={inputs.lots.remove.replace("{n}", i + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[#6b7280]">
                            <Icon name="x" className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="mt-1 grid grid-cols-2 gap-3">
                        <Field id={"shares-" + l.id} label={inputs.lots.shares} value={l.shares} onChange={(v) => setLot(l.id, "shares", v)} />
                        <Field id={"price-" + l.id} label={inputs.lots.price} left={inputs.lots.left} value={l.price} onChange={(v) => setLot(l.id, "price", v)} />
                      </div>
                      {sh > 0 && <p className="mt-2 text-right text-[12px] text-[#6b7280]">{inputs.lots.cost}: <span className="font-semibold text-[#111827]">{taka(sh * pr)}</span></p>}
                    </li>
                  );
                })}
              </ul>
              {lots.length < inputs.lots.max && (
                <button type="button" onClick={addLot}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#004990] py-3 text-[14px] font-semibold text-[#004990]">
                  <Icon name="plus" className="h-4 w-4" />{inputs.lots.add}
                </button>
              )}
              <p className="mt-2 text-[12px] text-[#6b7280]">{inputs.lots.hint}</p>
            </div>

            <div>
              <Field id="price" label={inputs.price.label} left={inputs.price.left} value={price} onChange={setPrice} />
              <p className="mt-1 text-[12px] text-[#6b7280]">
                {inputs.price.hint}{" "}
                <Link href={links.dsePrices} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004990]">{inputs.price.dseLink} ↗</Link>
              </p>
            </div>

            <div>
              <Field id="sold" label={inputs.sold.label} value={sold} onChange={setSold} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.sold.chips.map((c) => (
                  <Chip key={c.mode} on={(c.mode === "all" && T > 0 && S === T && S > 0) || (c.mode === "none" && sold === "") || (c.mode === "half" && T > 1 && S === Math.floor(T / 2))}
                    onClick={() => setSold(c.mode === "all" ? String(T) : c.mode === "half" ? String(Math.floor(T / 2)) : "")}>{c.label}</Chip>
                ))}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.sold.hint}</p>
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
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.avgLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[30px]">{T > 0 ? taka(A) : results.empty}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.plLabel}</p>
              <p className={"mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight md:text-[30px] " + (ok ? tone : "text-[#0b78bd]")}>{ok ? signed(pl, Math.abs(pl) >= 1000 ? 0 : 2) : "—"}</p>
              {ok && pctTxt && <p className={"text-[13px] font-semibold " + tone}>{pctTxt}</p>}
            </div>
            <p className="col-span-2 text-[12px] text-[#4b5563]">{partial ? results.plSubSold : results.plSubAll}. {results.avgNote}</p>
          </div>
          <dl className="mt-3 divide-y divide-[#e5e7e5]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[13px] text-[#4b5563]">{k}</dt>
                <dd className="text-right text-[14px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {ok && (
            <div className="mt-4 rounded-lg bg-[#f3f4f6] p-3">
              <p className="text-[14px] font-semibold">{results.insightTitle}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{insight}</p>
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
          <Link href={links.bonus} className="mt-2 inline-block text-[14px] font-semibold text-[#004990]">{how.record.link} →</Link>
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
          <li key={l.href}><Link href={l.href} className="text-[14px] font-semibold text-[#004990]">{l.label} →</Link></li>
        ))}
      </ul>

      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.openBo} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</Link>
          <Link href={links.whatsapp} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </Link>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        <Link href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></Link>
      </div>
    </div>
  );
}
