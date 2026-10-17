import defaultContent from "./mutual-funds-content.json";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * Mutual Funds: MOBILE-FIRST. Base classes = phone, `md:` = desktop.
 * Colors (arbitrary values): #004990 navy, #fad870 gold, #e8f0f8 tint,
 *   #6b46c1 / #f1ecfa Mutual Funds accent (asset-class color system), #1fa855 WhatsApp only.
 * Policy: the Transfer fee is "Standard CDBL Fee" with no number. No commission or other Midway fee is shown.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

function Steps({ title, steps, note }) {
  return (
    <div className={card + " border-t-[3px] border-t-[#6b46c1] p-4 md:p-6"}>
      <h3 className="text-[18px] font-semibold">{title}</h3>
      <ol className="mt-4 grid gap-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6b46c1] text-[14px] font-semibold text-white">{i + 1}</span>
            <div>
              <p className="text-[15px] font-semibold">{s.title}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#4b5563]">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      {note && <p className="mt-4 rounded-lg bg-[#f1ecfa] p-3 text-[12px] leading-relaxed text-[#4b5563]">{note}</p>}
    </div>
  );
}

export default function MutualFundsPage({ content = defaultContent }) {
  const { links, header, part1, part2, glossary, cta, disclaimer } = content;

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        {/* <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#6b46c1] md:text-xs">{header.eyebrow}</p> */}
        <h1 className="max-w-3xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      {/* Part 1 */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part1.label}</p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">{part1.what.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{part1.what.body}</p>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{part1.types.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {part1.types.items.map((t) => (
            <li key={t.name} className={card + " border-t-[3px] border-t-[#6b46c1] p-4 md:p-5"}>
              <p className="text-[17px] font-semibold text-[#6b46c1]">{t.name}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{t.body}</p>
              <p className="mt-3 inline-block rounded-full bg-[#f1ecfa] px-3 py-1 text-[12px] font-semibold text-[#6b46c1]">{t.how}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Part 2: two ways */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{part2.label}</p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">{part2.ways.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {part2.ways.items.map((w) => (
            <li key={w.name} className={card + " bg-[#f7f8f7] p-4 md:p-5"}>
              <span className="text-[#6b46c1]"><Icon name={w.icon} className="h-6 w-6" /></span>
              <p className="mt-2 text-[16px] font-semibold">{w.name}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Open-ended flows */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <Steps title={part2.buy.title} steps={part2.buy.steps} />
          <Steps title={part2.sell.title} steps={part2.sell.steps} note={part2.sell.note} />
        </div>

        <div className="mt-4 rounded-lg bg-[#e8f0f8] p-4 md:flex md:items-center md:justify-between md:gap-6 md:p-5">
          <div>
            <p className="text-[15px] font-semibold text-[#004990]">{part2.whatsappHelp.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{part2.whatsappHelp.body}</p>
          </div>
          <Link href={links.whatsapp} target="_blank" className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3 text-[14px] font-semibold text-white md:mt-0 md:shrink-0">
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </Link>
        </div>
      </section>

      {/* Weekly report */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:flex md:items-center md:justify-between md:gap-10 md:px-10 md:py-8">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{part2.report.title}</h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#4b5563]">{part2.report.body}</p>
        </div>
        <Link href={links.weeklyReport} className="mt-4 inline-block text-[14px] font-semibold text-[#004990] md:mt-0 md:shrink-0">{part2.report.cta} →</Link>
      </section>

      {/* Glossary */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{glossary.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {glossary.items.map((g) => (
            <div key={g.term} className={card + " p-4"}>
              <dt className="text-[14px] font-semibold text-[#6b46c1]">{g.term}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{g.def}</dd>
            </div>
          ))}
        </dl>
        <Link href={links.blog} className="mt-4 inline-block text-[14px] font-semibold text-[#004990]">{part2.blogLink} →</Link>
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
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </Link>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.openBo} target="_blank" className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        <Link href={links.whatsapp} target="_blank" aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></Link>
      </div>
    </div>
  );
}
