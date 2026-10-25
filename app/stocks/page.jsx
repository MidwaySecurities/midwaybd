'use client'
import { useState } from "react";
import defaultContent from "./stocks-content.json";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * Stocks: MOBILE-FIRST. Base classes = phone, `md:` = desktop.
 * Colors (arbitrary values): #004990 navy, #fad870 gold, #e8f0f8 tint,
 *   #1da1f2 / #0b78bd / #e6f4fd Stocks accent (asset-class color system), #1fa855 WhatsApp only.
 * Policy: no commission, minimum balance or other fee is shown here (WhatsApp / Pricing page only).
 * Video: set part2.video.youtubeId in the JSON. Empty = "Video coming soon" placeholder.
 * The video loads only after a click (no third-party request until then).
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

function Video({ video }) {
  const [on, setOn] = useState(false);
  const id = video.youtubeId;
  return (
    <div className="overflow-hidden rounded-lg border border-[#e5e7e5] bg-[#004990]">
      <div className="relative aspect-video">
        {on && id ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            disabled={!id}
            onClick={() => setOn(true)}
            aria-label={id ? video.playLabel : video.comingSoon}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fad870] text-[#004990]">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="text-[13px] font-semibold">{id ? video.playLabel : video.comingSoon}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function StocksPage({ content = defaultContent }) {
  const { links, header, part1, part2, cta, disclaimer } = content;
  const { what, prices, earn, categories, settlement, goodToKnow } = part1;
  const { video, need } = part2;

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b78bd] md:text-xs">{header.eyebrow}</p>
        <h1 className="max-w-3xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      {/* Part 1: what a stock is + terms + price movement */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part1.label}</p>
        <div className="md:grid md:grid-cols-2 md:gap-10">
          <div>
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">{what.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">{what.body}</p>
          </div>
          <div className="mt-8 md:mt-0">
            <h2 className="text-xl font-semibold md:mt-2 md:text-2xl">{prices.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">{prices.body}</p>
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {prices.points.map((p) => (
                <li key={p.label} className={card + " border-t-[3px] border-t-[#1da1f2] p-3 text-center"}>
                  <p className="text-[14px] font-semibold text-[#0b78bd]">{p.label}</p>
                  <p className="text-[12px] text-[#4b5563]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-[#e6f4fd] p-4 md:p-6">
          <h3 className="text-[17px] font-semibold text-[#0b78bd]">{what.terms.title}</h3>
          <p className="mt-1 text-[14px] text-[#4b5563]">{what.terms.body}</p>
          <dl className="mt-3 grid gap-3 md:grid-cols-3 md:gap-4">
            {what.terms.items.map((t) => (
              <div key={t.term} className="rounded-lg bg-white p-4">
                <dt className="text-[15px] font-semibold text-[#0b78bd]">{t.term}</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{t.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How a stock can pay you */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{earn.title}</h2>
        <p className="mt-2 text-[14px] text-[#4b5563]">{earn.body}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {earn.ways.map((w) => (
            <li key={w.title} className={card + " bg-[#f7f8f7] p-4 md:p-5"}>
              <span className="text-[#0b78bd]"><Icon name={w.icon} className="h-6 w-6" /></span>
              <p className="mt-2 text-[16px] font-semibold">{w.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{w.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-[17px] font-semibold">{earn.dividends.title}</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-2 md:gap-4">
          {earn.dividends.items.map((d) => (
            <li key={d.name} className={card + " border-t-[3px] border-t-[#1da1f2] p-4"}>
              <p className="text-[15px] font-semibold text-[#0b78bd]">{d.name}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{d.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] leading-relaxed text-[#4b5563]">{earn.dividends.note}</p>

        <div className="mt-5 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4 md:p-5">
          <h3 className="text-[16px] font-semibold">{earn.record.title}</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{earn.record.body}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{categories.title}</h2>
        <p className="mt-2 max-w-3xl text-[14px] text-[#4b5563]">{categories.body}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-4 md:gap-4">
          {categories.items.map((c) => (
            <li key={c.letter} className={card + " flex items-start gap-3 p-4 md:flex-col"}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4fd] text-[18px] font-semibold text-[#0b78bd]">{c.letter}</span>
              <div>
                <p className="text-[14px] leading-relaxed text-[#4b5563]">{c.body}</p>
                <p className="mt-2 inline-block rounded-full bg-[#e6f4fd] px-2.5 py-0.5 text-[11px] font-semibold text-[#0b78bd]">Settles {c.settle}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Settlement */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{settlement.title}</h2>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-[#4b5563]">{settlement.body}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {settlement.rows.map((r) => (
            <li key={r.label} className={card + " flex items-center justify-between bg-[#f7f8f7] p-4"}>
              <div>
                <p className="text-[15px] font-semibold">{r.label}</p>
                <p className="text-[12px] text-[#6b7280]">{r.body}</p>
              </div>
              <span className="text-[22px] font-semibold text-[#0b78bd]">{r.days}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-[16px] font-semibold">{settlement.exampleTitle}</h3>
        <ol className="mt-3 grid gap-3 md:grid-cols-3 md:gap-4">
          {settlement.days.map((d, i) => (
            <li key={d.day} className={card + " p-4 " + (i === 2 ? "border-t-[3px] border-t-[#1da1f2]" : "")}>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">{d.day}</p>
              <p className="mt-1 text-[17px] font-semibold text-[#0b78bd]">{d.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{d.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[12px] text-[#6b7280]">{settlement.note}</p>
      </section>

      {/* Good to know */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className={card + " p-4 md:p-6"}>
          <h2 className="text-[18px] font-semibold">{goodToKnow.title}</h2>
          <ul className="mt-3 grid gap-2">
            {goodToKnow.items.map((g) => (
              <li key={g} className="flex gap-2 text-[14px] leading-relaxed text-[#4b5563]">
                {/* <span className="mt-0.5 text-[#0b78bd]"><Icon name="check" className="h-4 w-4" /></span> */}
                <span className="mt-0.5 text-[#0b78bd]"></span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Part 2 */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part2.label}</p>
        <div className="mt-3 md:grid md:grid-cols-2 md:items-center md:gap-10">
          <Video video={video} />
          <div className="mt-5 md:mt-0">
            <h2 className="text-xl font-semibold md:text-2xl">{video.title}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{video.body}</p>
            <div className="mt-4 rounded-lg bg-[#e6f4fd] p-4">
              <h3 className="text-[16px] font-semibold text-[#0b78bd]">{need.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{need.body}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <Link href={links.quicktrade} className="text-[14px] font-semibold text-[#004990]">{need.quicktradeLink} →</Link>
                <Link href={links.pricing} className="text-[14px] font-semibold text-[#004990]">{need.pricingLink} →</Link>
              </div>
            </div>
          </div>
        </div>
        <Link href={links.blog} className="mt-5 inline-block text-[14px] font-semibold text-[#004990]">{part2.blogLink} →</Link>
      </section>

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.openBo} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</Link>
          <Link href={links.whatsapp} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            {/* <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp} */}
            {cta.whatsapp}
          </Link>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        {/* <Link href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></Link> */}
        <Link href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"></Link>
      </div>
    </div>
  );
}
