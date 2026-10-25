import defaultContent from "./ipo-v3-content.json";
import site from "../seo/site.json";
import { buildGraph, graphToString } from "../seo/structured-data";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * IPO (/ipo) v3: MOBILE-FIRST. Base classes = phone, `md:` = desktop.
 * Same layout system as SME & ATB, Stocks and Mutual Funds (breadcrumb header, white and grey bands, cards with accent top border,
 * navy numbered steps, glossary, navy CTA band, risk disclaimer, sticky mobile bar).
 * Colours: #004990 navy, #fad870 gold (brand, step numbers and CTA only), #e8f0f8 tint, IPO accent #1da1f2 sky on #e6f4fd (text #0b78bd), #1fa855 WhatsApp only.
 * `currentlyOpen.isOpen` switches the live-IPO card between the open state and the empty state (see ipo-v3-content.sample-open.json).
 * Policy: no fees on this page; no returns promised. SEO: JSON-LD @graph from content (FAQ in schema = visible FAQ).
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
const accent = "#1da1f2";

function fmtRange(a, b) {
  const f = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(d);
  };
  const x = f(a), y = f(b);
  return x && y ? x + " – " + y : x || y;
}

function Stat({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col rounded-lg bg-[#e6f4fd] px-3 py-2.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">{label}</dt>
      <dd className="mt-auto pt-0.5 text-[14px] md:mt-0.5 md:pt-0 font-semibold text-[#111827]">{value}</dd>
    </div>
  );
}

function CurrentlyOpen({ data }) {
  const range = fmtRange(data.openingSubscriptionDate, data.closingSubscriptionDate);
  return (
    <section id="currently-open" aria-labelledby="open" className="px-4 py-6 md:px-10 md:py-10">
      <h2 id="open" className="text-xl font-semibold md:text-2xl">{data.title}</h2>
      {!data.isOpen ? (
        <div className="mt-4 rounded-lg border border-dashed border-[#c9cdc9] bg-white px-4 py-6 text-center">
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-[#4b5563]">{data.noOpenIpoMessage}</p>
        </div>
      ) : (
        <div className={card + " mt-4 overflow-hidden border-t-[3px] border-t-[#1da1f2] md:grid md:grid-cols-[320px_1fr]"}>
          <div className="relative flex items-center justify-center bg-[#e6f4fd] text-[#0b78bd]" style={{ minHeight: 120 }}>
            {data.companyImage ? (
              <img src={data.companyImage} alt={data.companyName + " IPO"} className="h-full w-full object-cover" />
            ) : (
              <Icon name="bank" className="h-10 w-10" />
            )}
            {data.pricingMethod && <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#0b78bd]">{data.pricingMethod}</span>}
          </div>
          <div className="p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-semibold">{data.companyName}</h3>
                {range && <p className="mt-0.5 text-[13px] text-[#6b7280]">Subscription {range}</p>}
              </div>
              {data.applyUrl && <a href={data.applyUrl} className="w-full rounded-lg bg-[#004990] px-5 py-3 text-center text-[14px] font-semibold text-white md:w-auto">{data.applyLabel}</a>}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label="Shares Offered" value={data.sharesOffered} />
              <Stat label="Price" value={data.price} />
              <Stat label="Category" value={data.investorCategory} />
              <Stat label="Subscription Amount" value={data.subscriptionAmount} />
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}

export default function IPOPage({ content = defaultContent }) {
  const { links, header, glance, currentlyOpen, part1, part2, glossary, faq, related, cta, disclaimer } = content;
  const href = (h) => (links[h] ? links[h] : h);
  const { what, pricing, who, allocation } = part1;
  const { steps, good, club } = part2;

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphToString(buildGraph(content, site)) }} />

      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd] md:text-xs">{header.eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <a href={href(header.primary.href)} className="rounded-lg bg-[#004990] px-6 py-3.5 text-center text-[15px] font-semibold text-white md:py-3">{header.primary.label}</a>
          <a href={href(header.secondary.href)} className="rounded-lg border border-[#004990] bg-white px-6 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:py-3">{header.secondary.label}</a>
        </div>
        <nav aria-label="On this page" className="mt-5 flex gap-2 overflow-x-auto md:flex-wrap scrollbar-none">
          {header.jump.map((j) => <a key={j.href} href={j.href} className="whitespace-nowrap rounded-full border border-[#c9cdc9] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#004990]">{j.label}</a>)}
        </nav>
      </section>

      <CurrentlyOpen data={currentlyOpen} />

      <section aria-labelledby="glance" className="px-4 pt-6 md:px-10 md:pt-10">
        <h2 id="glance" className="text-xl font-semibold md:text-2xl">{glance.title}</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {glance.items.map((g) => (
            <li key={g.label} className={card + " border-t-[3px] border-t-[#1da1f2] p-3.5 md:p-4"}>
              <span className="text-[#0b78bd]"><Icon name={g.icon} className="h-5 w-5" /></span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{g.label}</p>
              <p className="mt-0.5 text-[16px] font-semibold leading-snug">{g.value}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Part 1 */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part1.label}</p>
        <div className="md:grid md:grid-cols-2 md:gap-10">
          <div id="how">
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">{what.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">{what.body}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <h2 className="text-xl font-semibold md:mt-2 md:text-2xl">{pricing.title}</h2>
            <ul className="mt-3 grid gap-3">
              {pricing.items.map((p) => (
                <li key={p.name} className={card + " border-t-[3px] border-t-[#1da1f2] p-4"}>
                  <p className="text-[16px] font-semibold">{p.name}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Membership Club */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className={card + " border-t-[3px] border-t-[#1da1f2] p-4 md:flex md:items-center md:justify-between md:gap-8 md:p-6"}>
          <div>
            <span className="text-[#0b78bd]"><Icon name="gift" className="h-6 w-6" /></span>
            <h2 className="mt-2 text-[18px] font-semibold md:text-xl">{club.title} {club.tag && <span className="ml-1 inline-block rounded-full bg-[#e7f3ec] px-2.5 py-0.5 align-middle text-[12px] font-semibold text-[#1f7a4d]">{club.tag}</span>}</h2>
            <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[#4b5563]">{club.body}</p>
          </div>
          <Link href={href(club.href)} target="_blank" className="mt-4 inline-block rounded-lg bg-[#004990] px-5 py-3 text-[14px] font-semibold text-white md:mt-0 md:shrink-0">{club.cta}</Link>
        </div>
      </section>

      {/* Who can apply + allocation */}
      <section id="who" className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{who.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {who.items.map((w) => (
            <li key={w.name} className={card + " border-t-[3px] border-t-[#1da1f2] p-4 md:p-5"}>
              <p className="text-[17px] font-semibold">{w.name}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{w.body}</p>
              <p className="mt-3 inline-block rounded-full bg-[#e6f4fd] px-3 py-1 text-[12px] font-semibold text-[#0b78bd]">{w.tag}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-[#e7f3ec] p-3.5 text-[14px] font-semibold text-[#1f7a4d]"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />{who.note}</p>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{allocation.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{allocation.body}</p>
        <div className={card + " mt-4 overflow-x-auto md:max-w-3xl"}>
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="bg-[#e6f4fd]">
                {allocation.headers.map((h, i) => <th key={h} className={"px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#4b5563] " + (i === 0 ? "text-left" : "text-right")}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {allocation.rows.map((r) => (
                <tr key={r.category} className={"border-t border-[#e5e7e5] " + (r.highlight ? "bg-[#e8f0f8]" : "")}>
                  <td className={"px-3 py-3 " + (r.highlight ? "font-semibold text-[#004990]" : "")}>{r.category}</td>
                  <td className="px-3 py-3 text-right text-[16px] font-semibold text-[#111827]">{r.fixed}</td>
                  <td className="px-3 py-3 text-right text-[16px] font-semibold text-[#111827]">{r.book}</td>
                </tr>
              ))}
              {allocation.total && (
                <tr className="border-t-2 border-[#1da1f2] bg-[#e6f4fd]">
                  <td className="px-3 py-3 font-semibold">{allocation.total.category}</td>
                  <td className="px-3 py-3 text-right text-[16px] font-semibold">{allocation.total.fixed}</td>
                  <td className="px-3 py-3 text-right text-[16px] font-semibold">{allocation.total.book}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-[#6b7280]">{allocation.foot}</p>
      </section>

      {/* Part 2 */}
      <section id="apply" className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part2.label}</p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">{steps.title}</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-4 md:gap-6">
          {steps.items.map((s, i) => (
            <li key={s.title} className="flex gap-3 md:flex-col">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-[14px] font-semibold text-[#fad870]">{i + 1}</span>
              <div>
                <h3 className="text-[15px] font-semibold">{s.title}</h3>
                <p className="mt-0.5 text-[14px] leading-relaxed text-[#4b5563]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl rounded-lg bg-[#e8f0f8] p-4 text-[13px] leading-relaxed text-[#4b5563]">{steps.note}</p>

        <div className="mt-5 rounded-lg border border-[#1da1f2] bg-[#e6f4fd] p-4 md:p-5">
          <h3 className="text-[16px] font-semibold">{good.title}</h3>
          <ul className="mt-2 grid gap-2 md:grid-cols-2 md:gap-x-8">
            {good.items.map((g) => (
              <li key={g} className="flex gap-2 text-[14px] leading-relaxed text-[#4b5563]">
                <span className="mt-0.5 text-[#0b78bd]"><Icon name="check" className="h-4 w-4" /></span>{g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="border-t border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 id="faq" className="text-xl font-semibold md:text-2xl">{faq.title}</h2>
        <div className="mt-4 space-y-2 md:max-w-3xl">
          {faq.items.slice(0, faq.visible).map((f) => (
            <details key={f.q} className="group rounded-lg border border-[#e5e7e5] bg-[#f7f8f7]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">{f.q}<Icon name="chevron" className="h-4 w-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" /></summary>
              <p className="px-4 pb-4 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</p>
            </details>
          ))}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-center gap-1.5 py-3 text-[14px] font-semibold text-[#0b78bd] [&::-webkit-details-marker]:hidden">More Questions ({faq.items.length - faq.visible})<Icon name="chevron" className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
            <div className="space-y-2">
          {faq.items.slice(faq.visible).map((f) => (
            <details key={f.q} className="group rounded-lg border border-[#e5e7e5] bg-[#f7f8f7]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">{f.q}<Icon name="chevron" className="h-4 w-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" /></summary>
              <p className="px-4 pb-4 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</p>
            </details>
          ))}
            </div>
          </details>
        </div>
        <nav aria-label={related.title} className="mt-6 text-[14px] font-semibold text-[#0b78bd]">
          {related.items.map((r, i) => <span key={r.href}>{i > 0 && " · "}<a href={href(r.href)}>{r.label}</a></span>)}
        </nav>
      </section>

      {/* Glossary (collapsed; all text stays in the HTML) */}
      <section aria-labelledby="glossary" className="px-4 py-6 md:px-10 md:py-10">
        <details className="group md:max-w-3xl">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg border border-[#e5e7e5] bg-white p-4 [&::-webkit-details-marker]:hidden">
            <h2 id="glossary" className="text-[18px] font-semibold md:text-xl">{glossary.title}</h2>
            <Icon name="chevron" className="h-4 w-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" />
          </summary>
          <dl className="mt-3 grid gap-3 md:grid-cols-2 md:gap-4">
            {glossary.items.map((g) => (
              <div key={g.term} className={card + " p-4"}>
                <dt className="text-[14px] font-semibold text-[#0b78bd]">{g.term}</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{g.def}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>

      {/* CTA */}
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

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</a>
        <a href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></a>
      </div>
    </div>
  );
}
