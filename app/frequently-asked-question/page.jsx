'use client'
import { useState, useEffect, useMemo } from "react";
import defaultContent from "./faq-content.json";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  IconByName,
} from "./icons";

/**
 * FAQ: MOBILE-FIRST. Base classes = phone, `md:` = desktop.
 * Colors: #004990 navy, #1da1f2 sky, #fad870 gold, #e8f0f8 tint, #1fa855 WhatsApp only.
 * Content: faq-content.json (items[].a = paragraphs, optional list and links).
 * Behavior: search, category chips, one open answer at a time, deep links (#question-id).
 * SEO: FAQPage JSON-LD is built from the same items, so markup always matches visible text.
 * Language: English only. For Bangla later, add a `bn` object per item and a toggle.
 * Policy: no commission, bond fees or margin loans; no returns promised.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";

const plain = (it) => [...it.a, ...(it.list || [])].join(" ");

function Answer({ it, links }) {
  return (
    <div className="border-t border-[#eef0ee] px-4 pb-4 pt-3 md:px-5">
      {it.a.map((p) => (
        <p key={p} className="mt-2 text-[14px] leading-relaxed text-[#4b5563] first:mt-0 md:text-[15px]">{p}</p>
      ))}
      {it.list && (
        <ul className="mt-2 grid gap-1.5">
          {it.list.map((l) => (
            <li key={l} className="flex gap-2 text-[14px] leading-relaxed text-[#4b5563] md:text-[15px]">
              {/* <span className="mt-0.5 shrink-0 text-[#1da1f2]"><Icon name="check" className="h-4 w-4" /></span>{l} */}
              <span className="mt-0.5 shrink-0 text-[#1da1f2]"></span>{l}
            </li>
          ))}
        </ul>
      )}
      {it.links && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {it.links.map((l) => (
            <a key={l.label} href={links[l.key]} className="text-[14px] font-semibold text-[#004990]">{l.label} →</a>
          ))}
        </div>
      )}
    </div>
  );
}

function Item({ it, open, onToggle, links, flash }) {
  return (
    <li id={it.id} style={{ scrollMarginTop: 16 }} className={"overflow-hidden rounded-lg border bg-white transition-colors " + (flash ? "border-[#1da1f2] bg-[#e8f0f8]" : "border-[#e5e7e5]")}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={"a-" + it.id} onClick={() => onToggle(it.id)}
          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left md:px-5">
          <span className="text-[15px] font-semibold leading-snug md:text-[16px]">{it.q}</span>
          <span className={"shrink-0 text-[#004990] " + (open ? "rotate-180" : "")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
          {/* <span className={"shrink-0 text-[#004990] " + (open ? "rotate-180" : "")}></span> */}
        </button>
      </h3>
      {open && <div id={"a-" + it.id}><Answer it={it} links={links} /></div>}
    </li>
  );
}

export default function FaqPage({ content = defaultContent }) {
  const { links, header, mostAsked, categories, items, noResults, contact, cta, disclaimer } = content;
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const [flashId, setFlashId] = useState(null);
  const [goId, setGoId] = useState(null);

  // Open an answer, make sure it is visible (reset search and category), scroll to it and flash it.
  const goTo = (id) => {
    setQuery("");
    setCat("all");
    setOpenId(id);
    setFlashId(id);
    setGoId(id);
    if (typeof window !== "undefined" && window.history?.replaceState) window.history.replaceState(null, "", "#" + id);
  };

  // Scroll after the list has re-rendered with the answer open
  useEffect(() => {
    if (!goId) return;
    const t = setTimeout(() => {
      const el = document.getElementById(goId);
      if (el) {
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }, 80);
    const f = setTimeout(() => setFlashId(null), 2200);
    return () => { clearTimeout(t); clearTimeout(f); };
  }, [goId]);

  // Deep link: /faq#withdraw-after-sale opens and scrolls to that answer
  useEffect(() => {
    const id = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (id && items.some((i) => i.id === id)) goTo(id);
  }, []);

  const toggle = (id) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", next ? "#" + next : window.location.pathname);
    }
  };

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () => items.filter((i) => (cat === "all" || i.cat === cat) && (!q || (i.q + " " + plain(i)).toLowerCase().includes(q))),
    [items, cat, q]
  );
  const popular = mostAsked.ids.map((id) => items.find((i) => i.id === id)).filter(Boolean);
  const showPopular = cat === "all" && !q;
  const catLabel = (id) => categories.find((c) => c.id === id)?.label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: plain(i) } })),
  };

  return (
    <div className="mx-auto max-w-6xl lg:container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* <nav aria-label="Breadcrumb" className="text-[12px] text-[#6b7280]">
          {header.breadcrumb.map((b, i) => (
            <span key={b}>{i > 0 && " / "}{i === header.breadcrumb.length - 1 ? <span className="text-[#111827]">{b}</span> : b}</span>
          ))}
        </nav> */}
        {/* <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#1da1f2] md:text-xs">{header.eyebrow}</p> */}
        <h1 className="mt-2 max-w-3xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{header.headline}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{header.subhead}</p>

        <label htmlFor="faq-search" className="mt-5 block text-[13px] font-semibold">{header.searchLabel}</label>
        <input id="faq-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={header.searchPlaceholder}
          className="mt-1 w-full max-w-xl rounded-lg border border-[#c9cdc9] bg-white px-3 py-3 text-[16px] outline-none focus:border-[#004990]" />
      </section>

      {/* Categories */}
      <section className="px-4 pt-5 md:px-10 md:pt-8">
        <div role="tablist" aria-label="Categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 scrollbar-none">
          {categories.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
              className={"shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold " + (cat === c.id ? "border-[#004990] bg-[#004990] text-white" : "border-[#c9cdc9] bg-white text-[#004990]")}>
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Most asked */}
      {showPopular && (
        <section className="px-4 pt-6 md:px-10 md:pt-8">
          <h2 className="text-xl font-semibold md:text-2xl">{mostAsked.title}</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2 md:gap-3">
            {popular.map((it) => (
              <li key={it.id}>
                <button type="button" onClick={() => goTo(it.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#cfe2f3] bg-[#e8f0f8] px-4 py-3 text-left text-[14px] font-semibold text-[#004990]">
                  {it.q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg>
                  {/* {it.q} */}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Questions */}
      <section className="px-4 py-6 md:px-10 md:py-8">
        {shown.length === 0 ? (
          <div className={card + " p-6 text-center"}>
            <p className="text-[17px] font-semibold">{noResults.title}</p>
            <p className="mt-1 text-[14px] text-[#4b5563]">{noResults.body}</p>
          </div>
        ) : (
          categories.filter((c) => c.id !== "all" && shown.some((i) => i.cat === c.id)).map((c) => (
            <div key={c.id} className="mb-7 last:mb-0">
              <h2 className="text-xl font-semibold md:text-2xl">{c.label}</h2>
              <ul className="mt-3 grid gap-2.5">
                {shown.filter((i) => i.cat === c.id).map((it) => (
                  <Item key={it.id} it={it} open={openId === it.id} onToggle={toggle} links={links} flash={flashId === it.id} />
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      {/* Contact */}
      <section className="px-4 pb-6 md:px-10 md:pb-10">
        <div className={card + " border-t-[3px] border-t-[#1da1f2] p-5 md:flex md:items-center md:justify-between md:gap-10 md:p-7"}>
          <div>
            <h2 className="text-xl font-semibold md:text-2xl">{contact.title}</h2>
            <p className="mt-1 text-[14px] text-[#4b5563]">{contact.body}</p>
            <dl className="mt-4 grid gap-3 text-[14px] md:grid-cols-3 md:gap-8">
              <div><dt className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">{contact.hotlineLabel}</dt><dd className="mt-0.5 font-semibold"><a href={contact.hotlineHref} className="text-[#004990]">{contact.hotline}</a></dd></div>
              <div><dt className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">{contact.emailLabel}</dt><dd className="mt-0.5 font-semibold"><a href={"mailto:" + contact.email} className="text-[#004990]">{contact.email}</a></dd></div>
              <div><dt className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">{contact.hoursLabel}</dt><dd className="mt-0.5 font-semibold">{contact.hours}</dd></div>
            </dl>
          </div>
          <a href={links.whatsapp} className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-6 py-3.5 text-[15px] font-semibold text-white md:mt-0 md:shrink-0">
            {/* <Icon name="whatsapp" className="h-5 w-5" />{contact.whatsapp} */}
            {contact.whatsapp}
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004990] px-4 py-6 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-9">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{cta.title}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#dbe7f3] md:text-base">{cta.body}</p>
        </div>
        <div className="mt-4 md:mt-0 md:shrink-0">
          <a href={links.openBo} className="block rounded-lg bg-[#fad870] px-6 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:py-3">{cta.primary}</a>
        </div>
      </section>

      <p className="px-4 py-4 text-[11px] leading-relaxed text-[#6b7280] md:px-10 md:py-6 md:text-xs">{disclaimer}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href={links.openBo} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">{cta.primary}</a>
        {/* <a href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-6 w-6" /></a> */}
        <a href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"></a>
      </div>
    </div>
  );
}
