import defaultContent from "./sme-atb-content.json";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * SME & ATB: MOBILE-FIRST. Base classes = phone, `md:` = desktop.
 * Colors (arbitrary values): #004990 navy, #fad870 gold, #e8f0f8 tint,
 *   #c2720c / #fdf1e3 SME & ATB accent (asset-class color system), #1fa855 WhatsApp only.
 * SME threshold: ৳30 lakh per BSEC Directive of 19 May 2026 (sme.who.threshold.amount).
 *   If emptied, the page falls back to a WhatsApp message.
 * Policy: no fees on this page.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

function Good({ block }) {
  return (
    <div className="mt-5 rounded-lg border border-[#fad870] bg-[#fdf6e3] p-4 md:p-5">
      <h3 className="text-[16px] font-semibold">{block.title}</h3>
      <ul className="mt-2 grid gap-2">
        {block.items.map((g) => (
          <li key={g} className="flex gap-2 text-[14px] leading-relaxed text-[#4b5563]">
            <span className="mt-0.5 text-[#c2720c]"><Icon name="check" className="h-4 w-4" /></span>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SmeAtbPage({ content = defaultContent }) {
  const { links, header, overview, sme, atb, start, dse, glossary, cta, disclaimer } = content;
  const th = sme.who.threshold;

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-6 text-[#111827]">
      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        {/* <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#c2720c] md:text-xs">{header.eyebrow}</p> */}
        <h1 className="max-w-3xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      {/* Overview */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{overview.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {overview.items.map((o) => (
            <li key={o.name} className={card + " p-4 md:p-5 " + (o.name !== "Main Board" ? "border-t-[3px] border-t-[#c2720c]" : "")}>
              <p className="text-[17px] font-semibold">{o.name}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{o.body}</p>
              <p className="mt-3 inline-block rounded-full bg-[#fdf1e3] px-3 py-1 text-[12px] font-semibold text-[#c2720c]">{o.tag}</p>
              {o.link && <Link href={o.link.href} className="mt-3 block text-[14px] font-semibold text-[#004990]">{o.link.label} →</Link>}
            </li>
          ))}
        </ul>
      </section>

      {/* SME */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{sme.label}</p>
        <div className="md:grid md:grid-cols-2 md:gap-10">
          <div>
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">{sme.what.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">{sme.what.body}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <h2 className="text-xl font-semibold md:mt-2 md:text-2xl">{sme.who.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">{sme.who.body}</p>
            <p className="mt-3 rounded-lg bg-[#fdf1e3] p-3 text-[14px] font-semibold text-[#c2720c]">
              {th.amount ? `${th.prefix} ${th.amount}.` : th.fallback}
            </p>
            {th.amount && th.note && <p className="mt-2 text-[13px] leading-relaxed text-[#6b7280]">{th.note}</p>}
          </div>
        </div>
        <Good block={sme.good} />
      </section>

      {/* ATB */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{atb.label}</p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">{atb.what.title}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#4b5563]">{atb.what.body}</p>

        <h3 className="mt-6 text-[17px] font-semibold">{atb.types.title}</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-4 md:gap-4">
          {atb.types.items.map((t) => (
            <li key={t.name} className={card + " border-t-[3px] border-t-[#c2720c] p-4"}>
              <span className="text-[#c2720c]"><Icon name={t.icon} className="h-6 w-6" /></span>
              <p className="mt-2 text-[15px] font-semibold">{t.name}</p>
              {t.status && (
                <span className={"mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold " + (t.status === "Trading now" ? "bg-[#fdf1e3] text-[#c2720c]" : "bg-[#f3f4f6] text-[#6b7280]")}>{t.status}</span>
              )}
              <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{t.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 md:grid md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="text-[17px] font-semibold">{atb.who.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">{atb.who.body}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <h3 className="text-[17px] font-semibold">{atb.rules.title}</h3>
            <ul className="mt-3 grid gap-3">
              {atb.rules.items.map((r) => (
                <li key={r.label} className={card + " flex items-center justify-between p-3"}>
                  <div>
                    <p className="text-[14px] font-semibold">{r.label}</p>
                    <p className="text-[12px] text-[#6b7280]">{r.body}</p>
                  </div>
                  <span className="text-[22px] font-semibold text-[#c2720c]">{r.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Good block={atb.good} />
      </section>

      {/* Start with Midway */}
      <section className="border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl font-semibold md:text-2xl">{start.title}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3 md:gap-6">
          {start.steps.map((s, i) => (
            <li key={s} className="flex gap-3 md:flex-col">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-[14px] font-semibold text-[#fad870]">{i + 1}</span>
              <p className="text-[14px] font-semibold leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl rounded-lg bg-[#e8f0f8] p-4 text-[13px] leading-relaxed text-[#4b5563]">{start.note}</p>
      </section>

      {/* DSE links + glossary */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className={card + " p-4 md:flex md:items-center md:justify-between md:gap-8 md:p-6"}>
          <div>
            <h2 className="text-[18px] font-semibold">{dse.title}</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{dse.body}</p>
          </div>
          <div className="mt-3 flex flex-col gap-2 md:mt-0 md:shrink-0 md:flex-row md:gap-5">
            <Link href={links.smeSite} className="text-[14px] font-semibold text-[#004990]">{dse.smeLabel} →</Link>
            <Link href={links.atbSite} className="text-[14px] font-semibold text-[#004990]">{dse.atbLabel} →</Link>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-semibold md:text-2xl">{glossary.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {glossary.items.map((g) => (
            <div key={g.term} className={card + " p-4"}>
              <dt className="text-[14px] font-semibold text-[#c2720c]">{g.term}</dt>
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
