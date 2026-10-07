import defaultContent from "./switching-brokers-content.json";
import { Icon } from "./icons";

/**
 * Switching Brokers page — MOBILE-FIRST.
 * Base classes are the phone layout (single column, thumb-sized buttons,
 * sticky bottom action bar). `md:` classes enlarge it for tablet/desktop.
 *
 * Brand colors (arbitrary Tailwind values, no config changes needed):
 *   #004990 navy · #1da1f2 sky · #fad870 gold · #e8f0f8 navy tint
 *   #1fa855 WhatsApp green (WhatsApp actions only)
 *
 * All copy lives in switching-brokers-content.json.
 * Render inside your site layout (header/footer wrap this component).
 */
export default function SwitchingBrokersPage({ content = defaultContent }) {
  const {
    hero,
    keyFacts,
    steps,
    stayTheSame,
    yourRights,
    beforeYouStart,
    whatYouGet,
    faq,
    finalCta,
    disclaimer,
  } = content;

  return (
    <div className="mx-auto container bg-[#f7f8f7] pb-24 md:pb-0 text-[#111827]">
      {/* Hero */}
      <section className="bg-white px-4 pt-6 pb-6 md:px-10 md:pt-12 md:pb-10 border-b border-[#e5e7e5]">
        <p className="text-[11px] md:text-xs font-semibold uppercase tracking-wide text-[#004990]">
          {hero.eyebrow}
        </p>
        <h1 className="mt-2 text-[26px] leading-tight md:text-5xl md:leading-tight font-semibold max-w-2xl">
          {hero.headline}
        </h1>
        <p className="mt-3 text-[15px] md:text-lg leading-relaxed text-[#4b5563] max-w-xl">
          {hero.subhead}
        </p>
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004990] px-5 py-3.5 text-[15px] font-semibold text-white md:py-3"
          >
            {hero.primaryCta.label}
            <Icon name="arrow" className="w-4 h-4" />
          </a>
          <a
            href={hero.whatsapp.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-[#1fa855] md:py-3"
          >
            <Icon name="whatsapp" className="w-5 h-5" />
            {hero.whatsapp.label}
          </a>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {hero.badges.map((b) => (
            <li
              key={b}
              className="rounded-full bg-[#e8f0f8] px-3 py-1 text-[11px] font-semibold text-[#004990]"
            >
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Key facts */}
      <section className="px-4 py-5 md:px-10 md:py-8">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {keyFacts.map((f) => (
            <li
              key={f.label}
              className="rounded-lg border border-[#e5e7e5] border-t-[3px] border-t-[#004990] bg-white p-3.5 md:p-4"
            >
              <Icon name={f.icon} className="w-5 h-5 text-[#004990]" />
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                {f.label}
              </p>
              <p className="text-[15px] md:text-base font-semibold leading-snug">{f.value}</p>
              <p className="mt-0.5 text-[11px] text-[#4b5563]">{f.sub}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-6 md:px-10 md:py-10 border-y border-[#e5e7e5]">
        <h2 className="text-xl md:text-2xl font-semibold">{steps.title}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4 md:gap-4">
          {steps.items.map((s, i) => (
            <li key={s.title} className="flex gap-3 md:flex-col">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-sm font-semibold text-[#fad870]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold">{s.title}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-[#4b5563]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* What stays the same */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold">{stayTheSame.title}</h2>
        <p className="mt-1 text-[14px] text-[#4b5563]">{stayTheSame.intro}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {stayTheSame.items.map((it) => (
            <li key={it.title} className="flex gap-3 rounded-lg border border-[#e5e7e5] bg-white p-4">
              <Icon name={it.icon} className="w-6 h-6 shrink-0 text-[#1f7a4d]" />
              <div>
                <h3 className="text-[15px] font-semibold">{it.title}</h3>
                <p className="mt-0.5 text-[13px] text-[#4b5563]">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Your rights + before you start */}
      <section className="grid gap-3 px-4 pb-6 md:grid-cols-2 md:gap-4 md:px-10 md:pb-10">
        <div className="rounded-lg bg-[#004990] p-5 text-white">
          <Icon name="shield" className="w-6 h-6 text-[#fad870]" />
          <h2 className="mt-2 text-lg font-semibold">{yourRights.title}</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-[#dbe7f3]">{yourRights.body}</p>
          <p className="mt-3 text-[12px] text-[#fad870]">{yourRights.note}</p>
        </div>
        <div className="rounded-lg border border-[#e5e7e5] bg-white p-5">
          <h2 className="text-lg font-semibold">{beforeYouStart.title}</h2>
          <ul className="mt-3 space-y-2.5">
            {beforeYouStart.items.map((t) => (
              <li key={t} className="flex gap-2.5 text-[14px] text-[#4b5563]">
                <Icon name="check" className="mt-0.5 w-4 h-4 shrink-0 text-[#1f7a4d]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white px-4 py-6 md:px-10 md:py-10 border-y border-[#e5e7e5]">
        <h2 className="text-xl md:text-2xl font-semibold">{whatYouGet.title}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {whatYouGet.items.map((it) => (
            <li key={it.title} className="flex gap-3 rounded-lg bg-[#f7f8f7] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f0f8] text-[#004990]">
                <Icon name={it.icon} className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold">{it.title}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-[#4b5563]">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ — native details/summary: works without JS, content stays crawlable */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold">{faq.title}</h2>
        <div className="mt-4 space-y-2">
          {faq.items.map((f) => (
            <details key={f.q} className="group rounded-lg border border-[#e5e7e5] bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <Icon name="chevron" className="w-4 h-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-4 pb-4 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-4 mb-4 rounded-xl bg-[#004990] p-5 text-white md:mx-10 md:mb-8 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">{finalCta.title}</h2>
          <p className="mt-1 text-[14px] text-[#dbe7f3]">{finalCta.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0">
          <a href={finalCta.primaryCta.href} className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:py-3">
            {finalCta.primaryCta.label}
          </a>
          <a href={finalCta.whatsapp.href} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-5 py-3.5 text-[15px] font-semibold md:py-3">
            <Icon name="whatsapp" className="w-5 h-5 text-[#25D366]" />
            {finalCta.whatsapp.label}
          </a>
        </div>
      </section>

      <p className="mx-4 mb-6 rounded-lg border border-dashed border-[#c9cdc9] p-3 text-[11px] leading-relaxed text-[#6b7280] md:mx-10">
        {disclaimer}
      </p>

      {/* Mobile sticky action bar (hidden on md and up) */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href={hero.primaryCta.href} className="flex-1 rounded-lg bg-[#004990] py-3 text-center text-[14px] font-semibold text-white">
          {hero.primaryCta.label}
        </a>
        <a href={hero.whatsapp.href} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white">
          <Icon name="whatsapp" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
