'use client'
import defaultContent from "./tools-content.json";
import site from "../seo/site.json";
import { buildGraph, graphToString } from "../seo/structured-data";
import { Icon } from "./icons";
import { waProps } from "./whatsapp";
import { trackTool, toolSlug } from "./track";
import { WhatsAppFab } from "./WhatsAppFab";
import { toolsModel, seoContent } from "./toolsRules";

/** For the page head: buildHead(seoContent(content), site). The description and structured data follow what is live. */
export { seoContent };

/**
 * Tools hub (/tools): MOBILE-FIRST. Base classes = phone, `md:` = desktop. Static page, no state.
 * Design: flat and clean. White cards, neutral hairline border, dark headings. No colored bars or colored edges.
 *   Color only on buttons, links and the small icon tiles. #004990 navy, #fad870 gold, #1fa855 WhatsApp button only.
 * Add a tool: append to groups[].tools. `live: false` shows it as Coming Soon (not a link, not in the structured data);
 *   remove the flag or set it true to launch. Groups, shortcuts, counts and the search description follow (see toolsRules.js).
 * SEO (standard in /seo/README.md): JSON-LD @graph (Organization, WebSite, WebPage+CollectionPage, ItemList of live tools, FAQPage, BreadcrumbList)
 *   is built from this content by ../seo/structured-data, so it always matches the visible text. Head tags: buildHead / toNextMetadata.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
// Icon tile tint per group (small chip only). An unknown group accent falls back to neutral.
const ICON = {
  stocks: "bg-[#e6f4fd] text-[#0b78bd]",
  bonds: "bg-[#e7f3ec] text-[#1f7a4d]",
  neutral: "bg-[#f3f4f6] text-[#374151]",
};

export default function ToolsHubPage({ content = defaultContent }) {
  const c = seoContent(content);
  const { links, header, start, soon, faq, related, legal, cta } = c;
  const { groups, pending, start: startItems } = toolsModel(c);
  const graph = buildGraph(c, site);

  return (
    <div className="mx-auto container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphToString(graph) }} />

      {/* Header */}
      <header className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span aria-current="page" className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280] md:text-xs">{header.eyebrow}</p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>
      </header>

      {/* Start here */}
      {startItems.length > 0 && <section className="px-4 pt-6 md:px-10 md:pt-10">
        <h2 className="text-xl font-semibold md:text-2xl">{start.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {startItems.map((s) => (
            <li key={s.tool}>
              <a href={s.href} onClick={() => trackTool(toolSlug(s.href), "start_here", "start_here")} className={card + " flex h-full flex-col justify-between p-4"}>
                <span className="text-[14px] text-[#4b5563]">{s.situation}</span>
                <span className="mt-2 flex items-center justify-between gap-3 text-[15px] font-semibold text-[#004990]">
                  {s.tool}<Icon name="arrow" className="h-4 w-4 shrink-0" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>}

      {/* Live tool groups */}
      {groups.map((g) => {
        const icon = ICON[g.accent] || ICON.neutral;
        return (
          <section key={g.id} aria-labelledby={g.id} className="px-4 pt-8 md:px-10 md:pt-12">
            <h2 id={g.id} className="text-xl font-semibold md:text-2xl">{g.title}</h2>
            <p className="mt-1 text-[14px] text-[#4b5563] md:text-[15px]">{g.intro}</p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
              {g.tools.map((t) => (
                <li key={t.name} className={card + " flex flex-col p-4 md:p-5"}>
                  <span className={"flex h-10 w-10 items-center justify-center rounded-lg " + icon}><Icon name={t.icon} className="h-5 w-5" /></span>
                  <h3 className="mt-3 text-[17px] font-semibold leading-snug">{t.name}</h3>
                  <p className="mt-1 flex-1 text-[14px] leading-relaxed text-[#4b5563]">{t.body}</p>
                  <a href={t.href} onClick={() => trackTool(toolSlug(t.href), g.id, "group_card")} className="mt-4 block rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{t.cta}</a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* Coming soon */}
      <section className="px-4 pt-8 md:px-10 md:pt-12">
        <h2 className="text-xl font-semibold md:text-2xl">{pending.length ? soon.title : soon.emptyTitle}</h2>
        <p className="mt-1 text-[14px] text-[#4b5563] md:text-[15px]">{pending.length ? soon.intro : soon.emptyIntro}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {pending.map((t) => (
            <li key={t.name} className="rounded-lg border border-dashed border-[#c9cdc9] bg-[#f3f4f6] p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#6b7280]"><Icon name={t.icon} className="h-5 w-5" /></span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{soon.tag}</span>
              </div>
              <h3 className="mt-3 text-[16px] font-semibold leading-snug text-[#374151]">{t.name}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-[#6b7280]">{t.body}</p>
            </li>
          ))}
          <li className={card + " flex flex-col justify-center p-4 md:p-5"}>
            <p className="text-[15px] font-semibold">{soon.suggest.body}</p>
            <a {...waProps(links.whatsapp, "tools", "page_cta")} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] py-3 text-[14px] font-semibold text-white">
              <Icon name="whatsapp" className="h-5 w-5" />{soon.suggest.cta}
            </a>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="px-4 py-8 md:px-10 md:py-12">
        <h2 id="faq" className="text-xl font-semibold md:text-2xl">{faq.title}</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
          {faq.items.map((f, i) => (
            <div key={f.q} id={"q" + (i + 1)} className={card + " p-4"}>
              <dt className="text-[15px] font-semibold">{f.q}</dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="px-4 pb-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:text-xs">{legal}</p>
      <nav aria-label="Related pages">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 px-4 pb-6 md:px-10">
          {related.map((l) => (
            <li key={l.href}><a href={l.href} className="text-[14px] font-semibold text-[#004990]">{l.label} →</a></li>
          ))}
        </ul>
      </nav>

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row">
          <a href={links.openBo} className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:px-6 md:py-3">{cta.primary}</a>
          <a {...waProps(links.whatsapp, "tools", "page_cta")} className="flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:px-6 md:py-3">
            <Icon name="whatsapp" className="h-5 w-5" />{cta.whatsapp}
          </a>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</a>
        <a {...waProps(links.whatsapp, "tools", "mobile_bar")} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></a>
      </div>
      <WhatsAppFab pageKey="tools" />
    </div>
  );
}
