import defaultContent from "./tools-content.json";
import { Icon } from "./icons";
import Link from "next/link";

/**
 * Tools hub (/tools): MOBILE-FIRST. Base classes = phone, `md:` = desktop. Static page, no state.
 * Colors: #004990 navy, #fad870 gold, Stocks #1da1f2 / #0b78bd / #e6f4fd, Government Bonds #1f7a4d / #e7f3ec,
 *   #1fa855 WhatsApp only.
 * Add a tool: append to groups[].tools (live) or soon.items (not yet built). Live tools appear in the
 *   ItemList structured data; Coming Soon items do not and are not links.
 * SEO: visible FAQ + JSON-LD (CollectionPage, ItemList of live tools, FAQPage, BreadcrumbList).
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
const ACCENT = {
  stocks: { bar: "border-t-[#1da1f2]", icon: "bg-[#e6f4fd] text-[#0b78bd]", chip: "bg-[#e6f4fd] text-[#0b78bd]", head: "text-[#0b78bd]" },
  bonds: { bar: "border-t-[#1f7a4d]", icon: "bg-[#e7f3ec] text-[#1f7a4d]", chip: "bg-[#e7f3ec] text-[#1f7a4d]", head: "text-[#1f7a4d]" },
};

export default function ToolsHubPage({ content = defaultContent }) {
  const { meta, links, header, start, groups, soon, faq, related, legal, cta } = content;
  const origin = meta.origin || "";
  const live = groups.flatMap((g) => g.tools);

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: header.headline, url: origin + meta.path, description: meta.description,
      isPartOf: { "@type": "WebSite", name: "Midway Securities Ltd.", url: origin } },
    { "@context": "https://schema.org", "@type": "ItemList", name: header.headline,
      itemListElement: live.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: origin + t.href, description: t.body })) },
    { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: header.breadcrumb.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b })) },
  ];

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-6 text-[#111827]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#1da1f2] md:text-xs">{header.eyebrow}</p> */}
        <h1 className="text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </section>

      {/* Start here */}
      <section className="px-4 pt-6 md:px-10 md:pt-10">
        <h2 className="text-xl font-semibold md:text-2xl">{start.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {start.items.map((s) => (
            <li key={s.tool}>
              <Link href={s.href} className="flex h-full flex-col justify-between rounded-lg border border-[#cfe2f3] bg-[#e8f0f8] p-4">
                <span className="text-[14px] text-[#4b5563]">{s.situation}</span>
                <span className="mt-2 flex items-center justify-between gap-3 text-[15px] font-semibold text-[#004990]">
                  {s.tool}<Icon name="arrow" className="h-4 w-4 shrink-0" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Live tool groups */}
      {groups.map((g) => {
        const a = ACCENT[g.accent];
        return (
          <section key={g.id} className="px-4 pt-8 md:px-10 md:pt-12">
            <h2 className={"text-xl font-semibold md:text-2xl " + a.head}>{g.title}</h2>
            <p className="mt-1 text-[14px] text-[#4b5563] md:text-[15px]">{g.intro}</p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
              {g.tools.map((t) => (
                <li key={t.name} className={card + " flex flex-col border-t-[3px] p-4 md:p-5 " + a.bar}>
                  <span className={"flex h-10 w-10 items-center justify-center rounded-lg " + a.icon}><Icon name={t.icon} className="h-5 w-5" /></span>
                  <h3 className="mt-3 text-[17px] font-semibold leading-snug">{t.name}</h3>
                  <p className="mt-1 flex-1 text-[14px] leading-relaxed text-[#4b5563]">{t.body}</p>
                  <Link href={t.href} className="mt-4 block rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{t.cta}</Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* Coming soon */}
      <section className="px-4 pt-8 md:px-10 md:pt-12">
        <h2 className="text-xl font-semibold md:text-2xl">{soon.title}</h2>
        <p className="mt-1 text-[14px] text-[#4b5563] md:text-[15px]">{soon.intro}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {soon.items.map((t) => (
            <li key={t.name} className="rounded-lg border border-dashed border-[#c9cdc9] bg-[#f3f4f6] p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#6b7280]"><Icon name={t.icon} className="h-5 w-5" /></span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{soon.tag}</span>
              </div>
              <h3 className="mt-3 text-[16px] font-semibold leading-snug text-[#374151]">{t.name}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-[#6b7280]">{t.body}</p>
            </li>
          ))}
          <li className={card + " flex flex-col justify-center border-[#1fa855] p-4 md:p-5"}>
            <p className="text-[15px] font-semibold">{soon.suggest.body}</p>
            <Link href={links.whatsapp} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] py-3 text-[14px] font-semibold text-white">
              <Icon name="whatsapp" className="h-5 w-5" />{soon.suggest.cta}
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="px-4 py-8 md:px-10 md:py-12">
        <h2 className="text-xl font-semibold md:text-2xl">{faq.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {faq.items.map((f) => (
            <div key={f.q} className={card + " p-4"}>
              <dt className="text-[15px] font-semibold">{f.q}</dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="px-4 pb-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:text-xs">{legal}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 px-4 pb-6 md:px-10">
        {related.map((l) => (
          <li key={l.href}><Link href={l.href} className="text-[14px] font-semibold text-[#004990]">{l.label} →</Link></li>
        ))}
      </ul>

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <Link href={links.openBo} className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</Link>
          <Link href={links.whatsapp} className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </Link>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <Link href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</Link>
        <Link href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></Link>
      </div>
    </div>
  );
}
