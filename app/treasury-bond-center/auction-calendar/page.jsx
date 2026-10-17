import Link from "next/link";
import defaultContent from "./auction-calendar-content.json";
import { Icon } from "./icons";

/**
 * Treasury Bond Auction Calendar: MOBILE-FIRST.
 * Base classes = phone (cards, sticky action bar). `md:` = tables and columns.
 *
 * Colors (arbitrary values, no Tailwind config needed):
 *   #004990 navy, #fad870 gold, #e8f0f8 navy tint
 *   #1f7a4d / #e7f3ec  Government Bonds accent
 *   #1fa855 WhatsApp green (WhatsApp actions only)
 *
 * Monthly update: run gsec-daily-update/gsec_update.py --publish (it rewrites the data sections of
 * auction-calendar-content.json), or edit the JSON by hand
 * (header.month, calendar.*, lastResults.*, bills.*).
 * Policy: no bond fee is shown here. Clients are told charges on WhatsApp.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

function Reissue({ children }) {
  return (
    <span className="inline-block rounded-full bg-[#e7f3ec] px-2 py-0.5 text-[11px] font-semibold text-[#1f7a4d]">
      {children}
    </span>
  );
}

function Th({ children, right }) {
  return (
    <th className={"px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280] " + (right ? "text-right" : "text-left")}>
      {children}
    </th>
  );
}

export default function AuctionCalendarPage({ content = defaultContent }) {
  const { links, header, calendar, lastResults, afterYouBuy, bills, glossary, cta, disclaimer } = content;

  // Mobile view of the matrix: one card per auction date.
  const auctions = calendar.dates.map((date, i) => ({
    date,
    total: calendar.totals[i],
    items: calendar.rows.filter((r) => r.amounts[i]).map((r) => ({ tenor: r.tenor, amount: r.amounts[i] })),
  }));

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
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1f7a4d] md:text-xs">
          {header.eyebrow} · {header.month}
        </p>
        <h1 className="mt-2 max-w-2xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
        <Link href={links.treasuryCenter} className="mt-4 inline-block text-[14px] font-semibold text-[#004990]">
          ← {header.back}
        </Link>
      </section>

      {/* Calendar */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-1">
          <h2 className="text-xl font-semibold md:text-2xl">
            {calendar.title} · {calendar.month}
          </h2>
          <p className="text-[12px] text-[#6b7280]">{calendar.unit}</p>
        </div>

        {/* Phone: one card per auction date */}
        <ul className="mt-4 grid gap-3 md:hidden">
          {auctions.map((a) => (
            <li key={a.date} className={card + " border-t-[3px] border-t-[#1f7a4d] p-4"}>
              <p className="text-[16px] font-semibold">{a.date}</p>
              <ul className="mt-2 divide-y divide-[#e5e7e5]">
                {a.items.map((it) => (
                  <li key={it.tenor} className="flex justify-between py-2 text-[14px]">
                    <span>{it.tenor}</span>
                    <span className="font-semibold">৳{it.amount} Cr</span>
                  </li>
                ))}
              </ul>
              {a.items.length > 1 && (
                <p className="mt-1 flex justify-between border-t border-[#e5e7e5] pt-2 text-[13px] font-semibold text-[#1f7a4d]">
                  <span>{calendar.totalLabel}</span>
                  <span>৳{a.total} Cr</span>
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop: matrix */}
        <div className={card + " mt-5 hidden overflow-hidden md:block"}>
          <table className="w-full text-[15px]">
            <thead className="bg-[#f7f8f7]">
              <tr>
                <Th>Tenor</Th>
                {calendar.dates.map((d) => (
                  <Th key={d} right>{d}</Th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7e5]">
              {calendar.rows.map((r) => (
                <tr key={r.tenor}>
                  <td className="px-4 py-3.5 font-semibold">{r.tenor}</td>
                  {r.amounts.map((a, i) => (
                    <td key={i} className={"px-4 py-3.5 text-right " + (a ? "font-semibold text-[#1f7a4d]" : "text-[#c9cdc9]")}>
                      {a || "—"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-[#e7f3ec]">
                <td className="px-4 py-3.5 font-semibold">{calendar.totalLabel}</td>
                {calendar.totals.map((t, i) => (
                  <td key={i} className="px-4 py-3.5 text-right font-semibold text-[#1f7a4d]">{t}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* How to apply */}
        <div className={card + " mt-4 p-4 md:mt-6 md:p-6"}>
          <h3 className="text-[16px] font-semibold">{calendar.howToApply.title}</h3>
          <ol className="mt-3 grid gap-3 md:grid-cols-3 md:gap-6">
            {calendar.howToApply.steps.map((s, i) => (
              <li key={s} className="flex gap-3 md:flex-col">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-[14px] font-semibold text-[#fad870]">
                  {i + 1}
                </span>
                <p className="text-[14px] leading-relaxed text-[#4b5563]">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[12px] text-[#6b7280]">{calendar.howToApply.note}</p>
        </div>
      </section>

      {/* Last results */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">
          {lastResults.title} · {lastResults.month}
        </h2>

        {/* Phone cards */}
        <ul className="mt-4 grid gap-3 md:hidden">
          {lastResults.rows.map((r) => (
            <li key={r.tenor} className={card + " bg-[#f7f8f7] p-4"}>
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-semibold">{r.tenor}</p>
                {r.reissue && <Reissue>{lastResults.reissueTag}</Reissue>}
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{lastResults.columns[1]}</dt><dd className="font-semibold">{r.yearsLeft}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{lastResults.columns[2]}</dt><dd className="font-semibold">{r.auctionDate}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{lastResults.columns[3]}</dt><dd className="font-semibold">{r.issueDate}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{lastResults.columns[4]}</dt><dd className="font-semibold">{r.coupon}</dd></div>
                <div className="col-span-2"><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{lastResults.columns[5]}</dt><dd className="font-semibold text-[#1f7a4d]">{r.cutoff}</dd></div>
              </dl>
            </li>
          ))}
        </ul>

        {/* Desktop table */}
        <div className={card + " mt-5 hidden overflow-hidden md:block"}>
          <table className="w-full text-[15px]">
            <thead className="bg-[#f7f8f7]">
              <tr>
                <Th>{lastResults.columns[0]}</Th>
                <Th right>{lastResults.columns[1]}</Th>
                <Th>{lastResults.columns[2]}</Th>
                <Th>{lastResults.columns[3]}</Th>
                <Th right>{lastResults.columns[4]}</Th>
                <Th right>{lastResults.columns[5]}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7e5]">
              {lastResults.rows.map((r) => (
                <tr key={r.tenor}>
                  <td className="px-4 py-3.5 font-semibold">{r.tenor}</td>
                  <td className="px-4 py-3.5 text-right">{r.yearsLeft}</td>
                  <td className="px-4 py-3.5">{r.auctionDate}</td>
                  <td className="px-4 py-3.5">
                    {r.issueDate} {r.reissue && <Reissue>{lastResults.reissueTag}</Reissue>}
                  </td>
                  <td className="px-4 py-3.5 text-right">{r.coupon}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-[#1f7a4d]">{r.cutoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4 md:p-5">
          <h3 className="text-[15px] font-semibold">{lastResults.reissueNote.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563] md:text-sm">{lastResults.reissueNote.body}</p>
          <Link href={links.reissuedExplainer} className="mt-2 inline-block text-[14px] font-semibold text-[#004990]">
            {lastResults.reissueNote.link} →
          </Link>
        </div>
      </section>

      {/* After you buy */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{afterYouBuy.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {afterYouBuy.items.map((it) => (
            <li key={it.title} className={card + " border-t-[3px] border-t-[#1f7a4d] p-4 md:p-5"}>
              <span className="text-[#1f7a4d]"><Icon name={it.icon} className="h-6 w-6" /></span>
              <p className="mt-2 text-[15px] font-semibold">{it.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{it.body}</p>
            </li>
          ))}
        </ul>
        <Link href={links.calculator} className="mt-4 inline-block text-[14px] font-semibold text-[#004990]">
          {afterYouBuy.calculatorLabel} →
        </Link>
      </section>

      {/* Bills: information only */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold md:text-2xl">{bills.title}</h2>
          <span className="rounded-full bg-[#e8f0f8] px-3 py-1 text-[12px] font-semibold text-[#004990]">{bills.badge}</span>
        </div>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#4b5563] md:text-sm">{bills.note}</p>

        <ul className="mt-4 grid gap-3 md:hidden">
          {bills.rows.map((r) => (
            <li key={r.tenor} className={card + " bg-[#f7f8f7] p-4"}>
              <p className="text-[15px] font-semibold">{r.tenor}</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
                <div className="col-span-2"><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{bills.columns[1]}</dt><dd className="font-semibold">{r.auctionDate}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{bills.columns[2]}</dt><dd className="font-semibold">{r.issueDate}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-[#6b7280]">{bills.columns[3]}</dt><dd className="font-semibold">{r.cutoff}</dd></div>
              </dl>
            </li>
          ))}
        </ul>

        <div className={card + " mt-5 hidden overflow-hidden md:block"}>
          <table className="w-full text-[15px]">
            <thead className="bg-[#f7f8f7]">
              <tr>
                <Th>{bills.columns[0]}</Th>
                <Th>{bills.columns[1]}</Th>
                <Th>{bills.columns[2]}</Th>
                <Th right>{bills.columns[3]}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7e5]">
              {bills.rows.map((r) => (
                <tr key={r.tenor}>
                  <td className="px-4 py-3.5 font-semibold">{r.tenor}</td>
                  <td className="px-4 py-3.5">{r.auctionDate}</td>
                  <td className="px-4 py-3.5">{r.issueDate}</td>
                  <td className="px-4 py-3.5 text-right font-semibold">{r.cutoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.portal} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">
            {cta.primary}
          </Link>
          <Link href={links.whatsapp} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />
            {cta.whatsapp}
          </Link>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.portal} target="_blank" className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">
          {cta.primary}
        </Link>
        <Link href={links.whatsapp} target="_blank" aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white">
          <Icon name="whatsapp" className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
