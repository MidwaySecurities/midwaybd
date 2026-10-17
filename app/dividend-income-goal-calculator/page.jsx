'use client'
import { useState } from "react";
import defaultContent from "./dividend-goal-content.json";
import { Icon } from "./icons";

/**
 * Dividend Income Goal Calculator: MOBILE-FIRST. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1da1f2 / #0b78bd / #e6f4fd Stocks accent, #1fa855 WhatsApp only.
 * Math (cash dividends only, same dividend every year as an assumption, whole shares, no fee fields):
 *   per share = face x cash% / 100;  after tax = per share x (1 - tax%)
 *   yearly goal = goal x 12 if monthly;  shares = ceil(yearly goal / after tax per share)
 *   cost = shares x price;  yield = per share / price
 * Companies usually declare dividends once a year: the monthly figure is the yearly amount / 12 (stated on the page).
 * Tax default 15% at source (editable). Bonus shares not counted.
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

export default function DividendGoalCalculator({ content = defaultContent }) {
  const { meta, links, header, inputs, warnings, results, how, faq, glossary, related, legal, cta } = content;
  const [period, setPeriod] = useState("month");
  const [goal, setGoal] = useState(inputs.goal.default);
  const [cash, setCash] = useState(inputs.cash.default);
  const [face, setFace] = useState(inputs.face.default);
  const [tax, setTax] = useState(inputs.tax.default);
  const [price, setPrice] = useState(inputs.price.default);
  const [owned, setOwned] = useState(inputs.owned.default);

  const g = num(goal), c = num(cash), fv = num(face), t = num(tax), p = num(price);
  const own = Math.floor(Math.max(num(owned), 0));
  const msgs = [];
  if (g <= 0) msgs.push(warnings.goal);
  if (c <= 0) msgs.push(warnings.cash); else if (c > 100) msgs.push(warnings.cashHigh);
  if (fv <= 0) msgs.push(warnings.face);
  if (t < 0 || t >= 100) msgs.push(warnings.tax);
  if (price.trim() !== "" && p <= 0) msgs.push(warnings.price);

  const perShare = (fv * c) / 100, taxPS = (perShare * t) / 100, net = perShare - taxPS;
  const ok = g > 0 && c > 0 && fv > 0 && t >= 0 && t < 100 && net > 0;
  const goalYear = period === "month" ? g * 12 : g;
  const N = ok ? Math.ceil(goalYear / net - 1e-9) : 0;
  const incomeYear = N * net, incomeMonth = incomeYear / 12;
  const hasPrice = p > 0;
  const cost = N * p;
  const more = Math.max(N - own, 0);
  const yld = hasPrice && perShare > 0 ? (perShare / p) * 100 : 0;

  const R = results.rows;
  const rows = [];
  if (ok) {
    rows.push([R.perShare, taka(perShare)], [R.tax, "− " + taka(taxPS)], [R.net, taka(net)],
      [R.incomeYear, taka(incomeYear)], [R.incomeMonth, taka(incomeMonth)]);
    if (hasPrice) rows.push([R.yield, yld.toFixed(2) + "%"]);
    if (own > 0) {
      rows.push([R.owned, own.toLocaleString("en-IN")], [R.more, more.toLocaleString("en-IN")]);
      if (hasPrice) rows.push([R.moreCost, taka(more * p, 0)]);
    }
  }
  let insight = "";
  if (ok) {
    insight = results.insight.replace("{goal}", taka(g, 0)).replace("{period}", period === "month" ? "a month" : "a year")
      .replace("{cash}", c + "%").replace("{tax}", t + "%").replace("{n}", N.toLocaleString("en-IN")).replace("{year}", taka(incomeYear, 0));
    if (hasPrice) insight += results.insightCost.replace("{price}", taka(p)).replace("{cost}", taka(cost, 0));
    if (own > 0) insight += more > 0 ? results.insightMore.replace("{owned}", own.toLocaleString("en-IN")).replace("{more}", more.toLocaleString("en-IN")) : results.insightHave;
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
        <h1 className="mt-4 text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      <section className="grid gap-4 px-4 py-6 md:grid-cols-2 md:gap-6 md:px-10 md:py-10">
        <div className={card + " p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{inputs.title}</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <div className="flex gap-1.5" role="group" aria-label="Goal period">
                {["month", "year"].map((k) => <Chip key={k} on={period === k} onClick={() => setPeriod(k)}>{inputs.goal.period[k]}</Chip>)}
              </div>
              <div className="mt-3"><Field id="goal" label={inputs.goal.label} left={inputs.goal.left} value={goal} onChange={setGoal} /></div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.goal.chips[period].map((v) => <Chip key={v} on={g === v} onClick={() => setGoal(String(v))}>{taka(v, 0)}</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.goal.hint}</p>
            </div>
            <div>
              <Field id="cash" label={inputs.cash.label} unit={inputs.cash.unit} value={cash} onChange={setCash} />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inputs.cash.chips.map((v) => <Chip key={v} on={c === v} onClick={() => setCash(String(v))}>{v}%</Chip>)}
              </div>
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.cash.hint}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field id="face" label={inputs.face.label} left={inputs.face.left} value={face} onChange={setFace} />
              <Field id="tax" label={inputs.tax.label} unit={inputs.tax.unit} value={tax} onChange={setTax} />
            </div>
            <p className="-mt-2 text-[12px] text-[#6b7280]">{inputs.face.hint} {inputs.tax.hint}</p>
            <div>
              <Field id="price" label={inputs.price.label} left={inputs.price.left} value={price} onChange={setPrice} />
              <p className="mt-1 text-[12px] text-[#6b7280]">
                {inputs.price.hint}{" "}
                <a href={links.dsePrices} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004990]">{inputs.price.dseLink} ↗</a>
              </p>
            </div>
            <div>
              <Field id="owned" label={inputs.owned.label} value={owned} onChange={setOwned} />
              <p className="mt-1 text-[12px] text-[#6b7280]">{inputs.owned.hint}</p>
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
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[28px]">{ok ? N.toLocaleString("en-IN") : "—"}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.costLabel}</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-semibold leading-tight text-[#0b78bd] md:text-[28px]">{ok && hasPrice ? taka(cost, 0) : ok ? results.noPrice : "—"}</p>
            </div>
            <p className="col-span-2 text-[12px] text-[#4b5563]">{ok ? results.sub : results.empty}</p>
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
