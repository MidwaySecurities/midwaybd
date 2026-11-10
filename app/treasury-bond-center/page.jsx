import defaultContent from "./treasury-bond-center-content.json";
import defaultYield from "./yield-curve.json";
import YieldCurve from "./YieldCurve";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * Treasury Bond Center: MOBILE-FIRST.
 * Base classes = phone (cards, sticky action bar). `md:` = tables and columns.
 *
 * Colors (arbitrary values, no Tailwind config needed):
 *   #004990 navy, #fad870 gold, #e8f0f8 navy tint
 *   #1f7a4d / #e7f3ec  Government Bonds accent
 *   #1fa855 WhatsApp green (WhatsApp actions only)
 *
 * Data: gsec-daily-update/gsec_update.py --publish-center <this folder> rewrites
 *   yield-curve.json, results.rows / results.subtitle and nextAuction in the content JSON.
 * Policy: no bond fee is shown here. Clients are told charges on WhatsApp.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

function Th({ children, right }) {
  return (
    <th className={"px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280] " + (right ? "text-right" : "text-left")}>
      {children}
    </th>
  );
}

export default function TreasuryBondCenterPage({ content = defaultContent, yieldData = defaultYield }) {
  const { links, header, results, nextAuction, frequency, calculator, reissue, glossary, howToApply, cta, disclaimer } = content;
  const ex = reissue.example;

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>
              {i > 0 && " / "}
              {i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}
            </span>
          ))}
        </nav> */}
        {/* <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1f7a4d] md:text-xs">{header.eyebrow}</p> */}
        <h1 className="max-w-2xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
        <Link href={links.guide} className="mt-4 inline-block text-[14px] font-semibold text-[#004990]">{header.guideLink} →</Link>
      </section>

      {/* Yield curve with tenor toggle */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <YieldCurve data={yieldData} />
      </section>

      {/* Next auction + recent results */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <div className="rounded-lg border-t-[3px] border-t-[#1f7a4d] bg-[#e7f3ec] p-4 md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1f7a4d]">{nextAuction.label}</p>
            <p className="mt-1 text-[18px] font-semibold md:text-2xl">
              {nextAuction.tenor} · {nextAuction.date} · {nextAuction.amount}
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[#1f7a4d]">Apply by {nextAuction.applyBy}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#4b5563]">{nextAuction.applyNote}</p>
          </div>
          <Link href={links.portal} target="_blank" className="mt-4 block rounded-lg bg-[#004990] px-6 py-3.5 text-center text-[15px] font-semibold text-white md:mt-0 md:shrink-0 md:py-3">
            {nextAuction.cta}
          </Link>
        </div>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{results.title}</h2>
        <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#4b5563] md:text-sm">{results.subtitle}</p>

        {/* Phone cards */}
        <ul className="mt-4 grid gap-3 md:hidden">
          {results.rows.map((r) => (
            <li key={r.tenor + r.auctionDate} className={card + " bg-[#f7f8f7] p-4"}>
              <p className="text-[16px] font-semibold">{r.tenor}</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{results.columns[1]}</dt><dd className="font-semibold">{r.auctionDate}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{results.columns[2]}</dt><dd className="font-semibold">{r.yearsLeft}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{results.columns[3]}</dt><dd className="font-semibold">{r.amount}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{results.columns[4]}</dt><dd className="font-semibold text-[#1f7a4d]">{r.cutoff}</dd></div>
              </dl>
            </li>
          ))}
        </ul>

        {/* Desktop table */}
        <div className={card + " mt-5 hidden overflow-hidden md:block"}>
          <table className="w-full text-[15px]">
            <thead className="bg-[#f7f8f7]">
              <tr>
                <Th>{results.columns[0]}</Th>
                <Th>{results.columns[1]}</Th>
                <Th right>{results.columns[2]}</Th>
                <Th right>{results.columns[3]}</Th>
                <Th right>{results.columns[4]}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7e5]">
              {results.rows.map((r) => (
                <tr key={r.tenor + r.auctionDate}>
                  <td className="px-4 py-3.5 font-semibold">{r.tenor}</td>
                  <td className="px-4 py-3.5">{r.auctionDate}</td>
                  <td className="px-4 py-3.5 text-right">{r.yearsLeft}</td>
                  <td className="px-4 py-3.5 text-right">{r.amount}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-[#1f7a4d]">{r.cutoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href={links.calendar} className="mt-4 inline-block text-[14px] font-semibold text-[#004990]">{results.calendarLink} →</Link>
      </section>

      {/* Frequency + calculator */}
      <section className="px-4 py-6 md:grid md:grid-cols-2 md:gap-6 md:px-10 md:py-10">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{frequency.title}</h2>
          <p className="mt-1 text-[13px] text-[#4b5563]">{frequency.subtitle}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
            {frequency.items.map((f) => (
              <li key={f.tenor} className={card + " p-3"}>
                <p className="text-[14px] font-semibold">{f.tenor}</p>
                <p className="text-[12px] font-semibold text-[#1f7a4d]">{f.cadence}</p>
              </li>
            ))}
          </ul>
        </div>
        <Link href={links.calculator} className={card + " mt-6 flex flex-col justify-center border-t-[3px] border-t-[#004990] p-5 md:mt-0"}>
          <span className="text-[#004990]"><Icon name="percent" className="h-6 w-6" /></span>
          <p className="mt-2 text-[17px] font-semibold">{calculator.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{calculator.body}</p>
          <span className="mt-3 text-[14px] font-semibold text-[#004990]">{calculator.cta} →</span>
        </Link>
      </section>

      {/* Reissued bonds explainer */}
      <section id="reissued-bonds" className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{reissue.title}</h2>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-[#4b5563] md:text-[15px]">{reissue.intro}</p>

        <div className="mt-5 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[16px] font-semibold">{ex.title}</h3>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#004990]">{ex.badge}</span>
          </div>
          <dl className="mt-3 divide-y divide-[#f0e4bd] md:grid md:grid-cols-2 md:gap-x-10 md:divide-y-0">
            {ex.rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2 md:border-b md:border-[#f0e4bd]">
                <dt className="text-[13px] text-[#4b5563]">{k}</dt>
                <dd className="text-right text-[14px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[12px] leading-relaxed text-[#6b7280]">{ex.note}</p>
        </div>

        <ul className="mt-5 grid gap-3 md:grid-cols-4 md:gap-4">
          {reissue.points.map((p) => (
            <li key={p.title} className={card + " border-t-[3px] border-t-[#1f7a4d] p-4"}>
              <span className="text-[#1f7a4d]"><Icon name={p.icon} className="h-6 w-6" /></span>
              <p className="mt-2 text-[15px] font-semibold">{p.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Glossary */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{glossary.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {glossary.items.map((g) => (
            <div key={g.term} className={card + " p-4"}>
              <dt className="text-[14px] font-semibold text-[#004990]">{g.term}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How to apply */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{howToApply.title}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4 md:gap-6">
          {howToApply.steps.map((s, i) => (
            <li key={s} className="flex gap-3 md:flex-col">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-[14px] font-semibold text-[#fad870]">{i + 1}</span>
              <p className="text-[14px] leading-relaxed text-[#4b5563]">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-lg bg-[#e8f0f8] p-4">
          <h3 className="text-[14px] font-semibold text-[#004990]">{howToApply.note.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{howToApply.note.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.portal} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</Link>
          <Link href={links.whatsapp} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />
            {cta.whatsapp}
          </Link>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.portal} target="_blank" className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        <Link href={links.whatsapp} target="_blank" aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white">
          <Icon name="whatsapp" className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
