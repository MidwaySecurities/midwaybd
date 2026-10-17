'use client'
import { useState } from "react";
import defaultContent from "./order-type-content.json";
import { Icon } from "./icons";

/**
 * Which Order Type?: MOBILE-FIRST guided picker. Base classes = phone, `md:` = two columns.
 * Colors: #004990 navy, #fad870 gold, #1da1f2 / #0b78bd / #e6f4fd Stocks accent, #1fa855 WhatsApp only.
 * Three questions (buy or sell, what matters most, how long) pick one of the confirmed QuickTrade Pro order types:
 * Limit, Market at Best, Stop Loss, Take Profit, Pre-Market; Good Till Date is added when the client wants a date.
 * Never recommends a trade. Plain-language definitions are generic: CHECK each against QuickTrade Pro's own wording.
 * SEO: visible FAQ and all-types list + JSON-LD (WebApplication, FAQPage, BreadcrumbList) from the same content.
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

export default function WhichOrderType({ content = defaultContent }) {
  const { meta, links, header, inputs, results, how, faq, glossary, related, legal, cta } = content;
  const [action, setAction] = useState("buy");
  const [need, setNeed] = useState("limit");
  const [dur, setDur] = useState("today");

  const options = inputs.q2.options.filter((o) => o.for.includes(action));
  const pickAction = (a) => { setAction(a); if (!inputs.q2.options.find((o) => o.id === need).for.includes(a)) setNeed("limit"); };
  const t = results.types[need];
  const gtd = results.types.gtd;

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
          <div className="mt-4 grid gap-5">
            <div>
              <p className="text-[14px] font-semibold">{inputs.q1.label}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {inputs.q1.options.map((o) => (
                  <button key={o.id} type="button" aria-pressed={action === o.id} onClick={() => pickAction(o.id)}
                    className={"rounded-lg border py-3 text-[14px] font-semibold " + (action === o.id ? "border-[#004990] bg-[#004990] text-white" : "border-[#c9cdc9] bg-white text-[#004990]")}>{o.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[14px] font-semibold">{inputs.q2.label}</p>
              <div className="mt-2 grid gap-2">
                {options.map((o) => (
                  <button key={o.id} type="button" aria-pressed={need === o.id} onClick={() => setNeed(o.id)}
                    className={"rounded-lg border px-4 py-3 text-left text-[14px] font-semibold " + (need === o.id ? "border-[#004990] bg-[#e8f0f8] text-[#004990]" : "border-[#c9cdc9] bg-white text-[#111827]")}>{o[action]}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[14px] font-semibold">{inputs.q3.label}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {inputs.q3.options.map((o) => (
                  <button key={o.id} type="button" aria-pressed={dur === o.id} onClick={() => setDur(o.id)}
                    className={"rounded-lg border px-3 py-3 text-[14px] font-semibold " + (dur === o.id ? "border-[#004990] bg-[#004990] text-white" : "border-[#c9cdc9] bg-white text-[#004990]")}>{o.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={card + " h-fit border-t-[3px] border-t-[#1da1f2] p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{results.title}</h2>
          <div className="mt-4 rounded-lg bg-[#e6f4fd] p-4" aria-live="polite">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd]">{results.bestLabel}</p>
            <p className="mt-1 text-[26px] font-semibold leading-tight text-[#0b78bd] md:text-[32px]">{t.name}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#111827]">{t.does}</p>
          </div>
          <p className="mt-4 text-[14px] font-semibold">{results.knowLabel}</p>
          <ul className="mt-1 grid gap-2">
            {t.know.map((k) => (
              <li key={k} className="flex gap-2 text-[13px] leading-relaxed text-[#4b5563]">
                <span className="mt-0.5 text-[#0b78bd]"><Icon name="check" className="h-4 w-4" /></span><span>{k}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] leading-relaxed text-[#4b5563]">{results.place}</p>
          <div className="mt-4 rounded-lg bg-[#f3f4f6] p-3">
            <p className="text-[14px] font-semibold">{results.alsoTitle}</p>
            {dur === "date" && (
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]"><span className="font-semibold text-[#004990]">{gtd.name}. </span>{results.alsoDate}</p>
            )}
            <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{results.alsoChange}</p>
          </div>
          <div className="mt-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-3">
            <p className="text-[13px] font-semibold">{results.caution.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{results.caution.body}</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <h2 className="text-xl font-semibold md:text-2xl">{results.glanceTitle}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {Object.values(results.types).map((x) => (
            <li key={x.name} className={card + " p-4"}>
              <p className="text-[15px] font-semibold text-[#0b78bd]">{x.name}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#111827]">{x.short}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{results.glanceCols[2]}: {x.best}</p>
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
