'use client'
import defaultContent from "./withdraw-content.json";
import site from "../seo/site.json";
import { buildGraph, graphToString } from "../seo/structured-data";
import { Icon } from "./icons";

/**
 * Withdraw Funds (/withdrawals) — DRAFT v1, MOBILE-FIRST. Base = phone, `md:` = desktop.
 * Brand: #004990 navy, #fad870 gold, #e8f0f8 tint, #1f7a4d green (ok), #8a6a0f on #fdf6e3 (pilot / to-confirm), #1fa855 WhatsApp only.
 * Two request methods use native <details> (no JS). Wire the form fields to the existing portal and manual-request endpoints
 * (field names unchanged from the live page: client code, portal password, amount; manual: name, client code, amount, phone, email, signature, comment).
 * SEO: JSON-LD @graph built from content (FAQ in schema = visible FAQ). See ../seo/README.md.
 */
const card = "rounded-lg border border-[#e5e7e5] bg-white";
const input = "mt-1 w-full rounded-lg border border-[#c9cdc9] bg-white px-3 py-3 text-[14px] text-[#111827]";

useEffect(() => {
  if (!portalData.client_code || !portalData.password) {
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PORTAL_URL}/check-ledger/${portalData.client_code}/${portalData.password}`
      );

      console.log(response.data);
      setLedgerBalance(response.data['ledger_balance'])
    } catch (error) {
      console.error("Error checking ledger:", error);
      setLedgerBalance(null)
    }
  }, 400);

  return () => {
    clearTimeout(timer);
  };
}, []);
function Field({ f }) {
  return (
    <label className={"block text-[11px] font-semibold uppercase tracking-wide text-[#004990] " + (f.wide ? "md:col-span-2" : "")}>
      {f.label}
      {f.type === "textarea" ? (
        <textarea rows={3} placeholder={f.placeholder} className={input} />
      ) : (
        <input onChange={(e) => {
          console.log(e.target.value)
        }} type={f.type} placeholder={f.placeholder} className={input} />
      )}
    </label>
  );
}

function Method({ m, cols }) {
  return (
    <details className="group rounded-lg border-2 border-[#004990] bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="flex items-center gap-2">
            <span className="text-[16px] font-semibold">{m.title}</span>
            <span className="rounded bg-[#e8f0f8] px-2 py-[2px] text-[10px] font-semibold text-[#004990]">{m.badge}</span>
          </span>
          <span className="mt-0.5 block text-[13px] text-[#4b5563]">{m.body}</span>
        </span>
        <Icon name="chevron" className="h-4 w-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" />
      </summary>
      <form className="border-t border-[#c9d9ea] p-4" action="#" method="post" onSubmit={(e) => {
        e.preventDefault()
        console.log(
          e.target[0].value,
          e.target[1].value,
          e.target[2].value,
          e.target[3].value
        )
      }}>
        <div className={"grid gap-3 " + (cols === 2 ? "md:grid-cols-2" : "")}>
          {m.fields.map((f) => <Field key={f.label} f={f} />)}
        </div>
        <button type="submit" className="mt-4 w-full rounded-lg bg-[#004990] px-5 py-3.5 text-[15px] font-semibold text-white">{m.submit}</button>
        <p className="mt-3 text-[12px] leading-relaxed text-[#6b7280]">{m.note}</p>
      </form>
    </details>
  );
}

export default function WithdrawPage({ content = defaultContent }) {
  const { links, hero, keyFacts, eod, steps, request, rtgs, account, faq, finalCta, related, disclaimer } = content;
  const graph = buildGraph(content, site);
  return (
    <div className="mx-auto max-w-5xl lg:container bg-[#f7f8f7] pb-24 text-[#111827] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphToString(graph) }} />

      <header className="border-b border-[#e5e7e5] bg-white px-4 pb-6 pt-6 md:px-10 md:pb-10 md:pt-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#004990] md:text-xs">{hero.eyebrow}</p>
        <h1 className="mt-2 max-w-2xl text-[26px] font-semibold leading-tight md:text-5xl md:leading-tight">{hero.headline}</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] md:text-lg">{hero.subhead}</p>
        <ul className="mt-5 flex flex-wrap gap-2">{hero.badges.map((b) => <li key={b} className="rounded-full bg-[#e8f0f8] px-3 py-1 text-[11px] font-semibold text-[#004990]">{b}</li>)}</ul>
      </header>

      <section id="request" aria-labelledby="req" className="px-4 py-6 md:px-10 md:py-8">
        <h2 id="req" className="text-xl font-semibold md:text-2xl">{request.title}</h2>
        <p className="mt-1 text-[14px] text-[#4b5563]">{request.intro}</p>
        <div className="mt-4 grid items-start gap-3 md:grid-cols-2 md:gap-4">
          <Method m={request.portal} cols={1} />
          <Method m={request.manual} cols={1} />
        </div>
      </section>

      <section aria-label="Key facts" className="px-4 py-5 md:px-10 md:py-8">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {keyFacts.map((f) => (
            <li key={f.label} className="rounded-lg border border-[#e5e7e5] border-t-[3px] border-t-[#004990] bg-white p-3.5 md:p-4">
              <Icon name={f.icon} className="h-5 w-5 text-[#004990]" />
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">{f.label}</p>
              <p className="text-[15px] font-semibold leading-snug md:text-base">{f.value}</p>
              <p className="mt-0.5 text-[11px] text-[#4b5563]">{f.sub}</p>
            </li>
          ))}
        </ul>
      </section>

      <details className="group mx-4 rounded-lg border border-[#fad870] bg-[#fdf6e3] md:mx-10">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 md:px-6 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 text-[16px] font-semibold text-[#8a6a0f]"><Icon name="clock" className="h-5 w-5" />{eod.title}</span>
          <Icon name="chevron" className="h-4 w-4 shrink-0 text-[#8a6a0f] transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4 md:px-6 md:pb-6">
          <p className="text-[14px] leading-relaxed text-[#374151]">{eod.body}</p>
          <p className="mt-2 text-[13px] font-semibold text-[#374151]">{eod.example}</p>
        </div>
      </details>

      <section aria-labelledby="steps" className="mb-5 border-y border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 id="steps" className="text-xl font-semibold md:text-2xl">{steps.title}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4 md:gap-4">
          {steps.items.map((s, i) => (
            <li key={s.title} className="flex gap-3 md:flex-col">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004990] text-sm font-semibold text-[#fad870]">{i + 1}</span>
              <div><h3 className="text-[15px] font-semibold">{s.title}</h3><p className="mt-0.5 text-[13px] leading-relaxed text-[#4b5563]">{s.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="rtgs" className="mx-4 rounded-lg border border-[#e5e7e5] border-l-[4px] border-l-[#fad870] bg-white p-4 md:mx-10 md:p-6">
        <span className="rounded bg-[#fdf6e3] px-2 py-[3px] text-[10px] font-semibold text-[#8a6a0f]">{rtgs.badge}</span>
        <h2 id="rtgs" className="mt-2 text-[18px] font-semibold md:text-xl">{rtgs.title}</h2>
        <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[#4b5563]">{rtgs.body}</p>
        <ul className="mt-3 grid grid-cols-3 gap-2 md:max-w-xl">
          {rtgs.facts.map((f) => (
            <li key={f.label} className="rounded-lg bg-[#e8f0f8] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">{f.label}</p>
              <p className="text-[14px] font-semibold text-[#004990]">{f.value}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] font-semibold text-[#8a6a0f]">{rtgs.how}</p>
        <p className="mt-1 text-[12px] text-[#6b7280]">{rtgs.note}</p>
      </section>

      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className="rounded-lg bg-[#004990] p-5 text-white">
          <Icon name="bank" className="h-6 w-6 text-[#fad870]" />
          <h2 className="mt-2 text-lg font-semibold">{account.title}</h2>
          <ul className="mt-2 space-y-2">{account.items.map((t) => <li key={t} className="flex gap-2.5 text-[14px] text-[#dbe7f3]"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#fad870]" />{t}</li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="faq" className="border-t border-[#e5e7e5] bg-white px-4 py-6 md:px-10 md:py-10">
        <h2 id="faq" className="text-xl font-semibold md:text-2xl">{faq.title}</h2>
        <div className="mt-4 space-y-2 md:max-w-3xl">
          {faq.items.slice(0, faq.visible).map((f) => (
            <details key={f.q} className="group rounded-lg border border-[#e5e7e5] bg-[#f7f8f7]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">{f.q}<Icon name="chevron" className="h-4 w-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" /></summary>
              <p className="px-4 pb-4 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</p>
            </details>
          ))}
          {faq.items.length > faq.visible && (
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-1.5 py-3 text-[14px] font-semibold text-[#0b78bd] [&::-webkit-details-marker]:hidden">More Questions ({faq.items.length - faq.visible})<Icon name="chevron" className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
              <div className="space-y-2">
                {faq.items.slice(faq.visible).map((f) => (
                  <details key={f.q} className="group rounded-lg border border-[#e5e7e5] bg-[#f7f8f7]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">{f.q}<Icon name="chevron" className="h-4 w-4 shrink-0 text-[#004990] transition-transform group-open:rotate-180" /></summary>
                    <p className="px-4 pb-4 text-[14px] leading-relaxed text-[#4b5563]">{f.a}</p>
                  </details>
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      <section className="mx-4 my-4 rounded-xl bg-[#004990] p-5 text-white md:mx-10 md:my-8 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div><h2 className="text-xl font-semibold md:text-2xl">{finalCta.title}</h2><p className="mt-1 text-[14px] text-[#dbe7f3]">{finalCta.body}</p></div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:shrink-0">
          <a href={links.whatsapp} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-5 py-3.5 text-[15px] font-semibold text-white md:py-3"><Icon name="whatsapp" className="h-5 w-5" />{finalCta.whatsapp.label}</a>
          <a href={links.portal} className="rounded-lg bg-[#fad870] px-5 py-3.5 text-center text-[15px] font-semibold text-[#004990] md:py-3">{finalCta.secondary.label}</a>
        </div>
      </section>

      <nav aria-label={related.title} className="px-4 pb-2 text-[14px] font-semibold text-[#0b78bd] md:px-10">
        {related.items.map((r, i) => <span key={r.href}>{i > 0 && " · "}<a href={r.href}>{r.label}</a></span>)}
      </nav>
      <p className="mx-4 mb-6 mt-3 rounded-lg border border-dashed border-[#c9cdc9] p-3 text-[11px] leading-relaxed text-[#6b7280] md:mx-10">{disclaimer}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-[#e5e7e5] bg-white p-3 md:hidden">
        <a href="#request" className="flex-1 rounded-lg bg-[#004990] px-4 py-3 text-center text-[14px] font-semibold text-white">Request a Withdrawal</a>
        <a href={links.whatsapp} aria-label="WhatsApp" className="flex w-12 items-center justify-center rounded-lg bg-[#1fa855] text-white"><Icon name="whatsapp" className="h-5 w-5" /></a>
      </div>
    </div>
  );
}
