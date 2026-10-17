import Link from "next/link";
import defaultContent from "./govt-bonds-content.json";
import { Icon } from "./icons";

/**
 * Government Bonds: MOBILE-FIRST. Base classes = phone, `md:` = desktop.
 * Colors (arbitrary values): #004990 navy, #fad870 gold, #e8f0f8 tint,
 *   #1f7a4d / #e7f3ec Government Bonds accent, #1fa855 WhatsApp only.
 * Policy: no bond fee is shown (the 0.4% auction fee and trading fees are WhatsApp-only).
 * Anchor #reissued-bonds is linked from the Auction Calendar.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

function Cards({ items, cols }) {
  return (
    <ul className={"mt-4 grid gap-3 md:gap-4 " + cols}>
      {items.map((it) => (
        <li key={it.title} className={card + " border-t-[3px] border-t-[#1f7a4d] p-4 md:p-5"}>
          <span className="text-[#1f7a4d]"><Icon name={it.icon} className="h-6 w-6" /></span>
          <p className="mt-2 text-[15px] font-semibold">{it.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function GovernmentBondsPage({ content = defaultContent }) {
  const { links, header, part1, part2, cta, disclaimer } = content;
  const { how, afterYouBuy, reissue, trade, rules } = part2;

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
        <h1 className="max-w-3xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      {/* Part 1 */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part1.label}</p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">{part1.what.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{part1.what.body}</p>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{part1.tenor.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{part1.tenor.body}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {part1.tenor.tiles.map((t) => (
            <li key={t.range} className={card + " bg-[#e7f3ec] p-4 text-center"}>
              <p className="text-[18px] font-semibold text-[#1f7a4d]">{t.range}</p>
              <p className="text-[13px] text-[#4b5563]">{t.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-3xl text-[12px] leading-relaxed text-[#6b7280]">{part1.tenor.note}</p>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{part1.why.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{part1.why.body}</p>
      </section>

      {/* Part 2: how it works */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part2.label}</p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">{how.title}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4 md:gap-6">
          {how.steps.map((s, i) => (
            <li key={s} className="flex gap-3 md:flex-col">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-[14px] font-semibold text-[#fad870]">{i + 1}</span>
              <p className="text-[14px] font-semibold leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-[#4b5563]">{how.note}</p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link href={links.portal} className="rounded-lg bg-[#004990] px-6 py-3.5 text-center text-[15px] font-semibold text-white md:py-3">{how.applyCta}</Link>
          <Link href={links.calendar} className="text-[14px] font-semibold text-[#004990]">{how.calendarLink} →</Link>
        </div>
      </section>

      {/* After you buy */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{afterYouBuy.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{afterYouBuy.body}</p>
        <Cards items={afterYouBuy.items} cols="md:grid-cols-3" />
        <div className="mt-4 rounded-lg bg-[#e7f3ec] p-4 md:p-5">
          <p className="text-[15px] font-semibold text-[#1f7a4d]">{afterYouBuy.relax.title}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{afterYouBuy.relax.body}</p>
        </div>
        <p className="mt-3 max-w-3xl text-[12px] leading-relaxed text-[#6b7280]">{afterYouBuy.caveat}</p>
        <Link href={links.calculator} className={card + " mt-5 block border-t-[3px] border-t-[#004990] p-5 md:max-w-md"}>
          <span className="text-[#004990]"><Icon name="percent" className="h-6 w-6" /></span>
          <p className="mt-2 text-[17px] font-semibold">{afterYouBuy.calculator.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{afterYouBuy.calculator.body}</p>
          <span className="mt-3 inline-block text-[14px] font-semibold text-[#004990]">Open the Calculator →</span>
        </Link>
      </section>

      {/* Reissued bonds */}
      <section id="reissued-bonds" className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{reissue.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{reissue.intro}</p>
        <Cards items={reissue.points} cols="md:grid-cols-4" />
        <div className="mt-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4 md:p-5">
          <p className="text-[14px] leading-relaxed text-[#4b5563]">
            <b className="text-[#111827]">{reissue.good.title}</b> {reissue.good.body}
          </p>
          <Link href={links.center} className="mt-2 inline-block text-[14px] font-semibold text-[#004990]">{reissue.centerLink} →</Link>
        </div>
      </section>

      {/* Trade + rules */}
      <section className="px-4 py-6 md:grid md:grid-cols-2 md:gap-6 md:px-10 md:py-10">
        <div className={card + " p-5"}>
          <h2 className="text-[18px] font-semibold">{trade.title}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{trade.body}</p>
        </div>
        <div className={card + " mt-4 p-5 md:mt-0"}>
          <h2 className="text-[18px] font-semibold">{rules.title}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{rules.body}</p>
          <ul className="mt-3 grid gap-2">
            {rules.items.map((r) => (
              <li key={r} className="flex gap-2 text-[13px] leading-relaxed text-[#4b5563]">
                <span className="mt-0.5 text-[#1f7a4d]"><Icon name="check" className="h-4 w-4" /></span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <Link href={links.blog} className="mt-4 inline-block text-[14px] font-semibold text-[#004990] md:col-span-2">{part2.blogLink} →</Link>
      </section>

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.openBo} target="_blank" className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</Link>
          <Link href={links.portal} target="_blank" className="rounded-lg border border-white px-5 py-3.5 text-center text-[15px] font-semibold text-white md:px-6 md:py-3">{cta.secondary}</Link>
          <Link href={links.whatsapp} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />
            {cta.whatsapp}
          </Link>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.openBo} target="_blank" className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        <Link href={links.whatsapp} target="_blank" aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white">
          <Icon name="whatsapp" className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
