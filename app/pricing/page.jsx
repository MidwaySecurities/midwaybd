import defaultContent from "./pricing-content.json";
import { Icon } from "./icons";

/**
 * Pricing page — MOBILE-FIRST (v5.1: desktop layout polished).
 * Base classes = phone layout (stacked cards, 15px type, 48px tap targets,
 * sticky bottom bar). `md:` classes arrange the same blocks in columns.
 *
 * Brand colors (arbitrary values, no Tailwind config needed):
 *   #004990 navy · #fad870 gold · #e8f0f8 navy tint
 *   #1f7a4d / #e7f3ec green = "Free" · #fdf6e3 / #c99a1a refund callout
 *   #1fa855 WhatsApp green (WhatsApp actions only)
 *
 * Policy: no commission figure and no bond/Sukuk pricing appear here.
 * Edit copy, figures and links in pricing-content.json only.
 * Set a free-service item's "show": false to hide it without deleting it.
 */
function Badge({ free, children }) {
  return (
    <span
      className={
        "inline-block rounded-full px-3 py-1 text-[13px] font-semibold " +
        (free ? "bg-[#e7f3ec] text-[#1f7a4d]" : "bg-[#e8f0f8] text-[#004990]")
      }
    >
      {children}
    </span>
  );
}

export default function PricingPage({ content = defaultContent }) {
  const { header, trading, boAccount, deposits, ipo, otherFees, freeServices, help, disclaimer } = content;
  const card = "rounded-lg border border-[#e5e7e5] bg-white p-4 md:p-5";

  return (
    <div className="mx-auto max-w-6xl lg:container lg:px-4 bg-[#f7f8f7] pb-4 text-[#111827] md:pb-0">
      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-6 md:px-10 md:pb-12 md:pt-14">
        <h1 className="mt-2 max-w-2xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      {/* Trading charges: text left, action right on desktop */}
      <section className="bg-primary_color px-4 py-6 text-white md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{trading.title}</h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{trading.body}</p>
        </div>
        <a
          href={trading.cta.href}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold text-white md:mt-0 md:px-6 md:py-3"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          {trading.cta.label}
        </a>
      </section>

      {/* BO Account: fees left, refund callout right on desktop */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{boAccount.title}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-6">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {boAccount.items.map((it) => (
              <div key={it.label} className="rounded-lg border border-[#e5e7e5] border-t-[3px] border-t-[#004990] bg-white p-4 md:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280] md:text-[11px]">{it.label}</p>
                <p className="mt-1 text-2xl font-semibold text-[#004990] md:mt-2 md:text-3xl">{it.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4 md:items-center md:p-5">
            <Icon name="gift" className="mt-0.5 h-6 w-6 shrink-0 text-[#c99a1a] md:mt-0" />
            <div>
              <p className="text-[15px] font-semibold">{boAccount.refund.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563] md:text-sm">{boAccount.refund.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deposits & withdrawals: rows on phones, four cards on desktop */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{deposits.title}</h2>
        <ul className="mt-3 divide-y divide-[#e5e7e5] md:mt-5 md:grid md:grid-cols-4 md:gap-4 md:divide-y-0">
          {deposits.rows.map((r) => (
            <li
              key={r.method}
              className="flex items-center justify-between gap-3 py-3.5 md:flex-col md:items-start md:justify-between md:gap-4 md:rounded-lg md:border md:border-[#e5e7e5] md:bg-[#f7f8f7] md:p-5"
            >
              <span className="text-[14px] font-medium text-[#374151]">{r.method}</span>
              <Badge free={r.free}>{r.charge}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-relaxed text-[#6b7280]">{deposits.note}</p>
      </section>

      {/* IPO (two items) + Other fees */}
      <div className="grid gap-3 px-4 py-6 md:grid-cols-3 md:gap-6 md:px-10 md:py-10">
        <section className={card + " md:col-span-2"}>
          <h2 className="text-xl font-semibold md:text-2xl">{ipo.title}</h2>
          <ul className="mt-2 divide-y divide-[#e5e7e5] md:mt-4 md:grid md:grid-cols-2 md:gap-4 md:divide-y-0">
            {ipo.items.map((it) => (
              <li key={it.label} className="flex items-start justify-between gap-3 py-3 md:rounded-lg md:bg-[#f7f8f7] md:p-4">
                <div>
                  <p className="text-[14px] font-medium">{it.label}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-[#6b7280]">{it.sub}</p>
                </div>
                <Badge free={it.free}>{it.value}</Badge>
              </li>
            ))}
          </ul>
        </section>
        <section className={card}>
          <h2 className="text-xl font-semibold md:text-2xl">{otherFees.title}</h2>
          <ul className="mt-2 divide-y divide-[#e5e7e5] md:mt-4 md:divide-y-0">
            {otherFees.items.map((it) => (
              <li key={it.label} className="flex items-start justify-between gap-3 py-3 md:flex-col md:rounded-lg md:bg-[#f7f8f7] md:p-4">
                <div>
                  <p className="text-[14px] font-medium">{it.label}</p>
                  <p className="mt-0.5 text-[12px] text-[#6b7280]">{it.note}</p>
                </div>
                <Badge free={false}>{it.value}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Free services */}
      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <h2 className="text-xl font-semibold md:text-2xl">{freeServices.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {freeServices.items
            .filter((s) => s.show !== false)
            .map((s) => (
              <li key={s.title} className="rounded-lg border border-[#e5e7e5] border-t-[3px] border-t-[#004990] bg-white p-4 md:p-5">
                <span className="text-[#004990]">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <p className="mt-2 text-[15px] font-semibold">{s.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#4b5563] md:text-[13px]">{s.body}</p>
              </li>
            ))}
        </ul>
      </section>

      {/* Help CTA: text left, buttons side by side on desktop */}
      <section className="bg-primary_color px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{help.title}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{help.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <a href={help.whatsapp.href} className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />
            {help.whatsapp.label}
          </a>
          <a href={help.primary.href} className="rounded-lg bg-secondary_color px-5 py-3.5 text-center text-[15px] font-semibold text-white md:px-6 md:py-3">
            {help.primary.label}
          </a>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href={help.primary.href} className="flex-1 rounded-lg bg-primary_color py-3 text-center text-[14px] font-semibold text-white">
          {help.primary.label}
        </a>
        <a href={help.whatsapp.href} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-secondary_color text-white">
          <Icon name="whatsapp" className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
