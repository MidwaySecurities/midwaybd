import ipoContent from "./ipo-content.json";
import CurrentlyOpenIPOCard from "./CurrentlyOpenIPOCard";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  IconByName,
} from "./icons";

/**
 * IPO page — brand colors: #004990 navy / #1da1f2 sky / #fad870 gold,
 * with the IPO asset-class accent (#c99a1a deep gold / #fdf6e3 tint)
 * per the site's color system. Content is driven entirely by
 * ipo-content.json so marketing can update copy, the live IPO, and
 * figures without touching this component.
 *
 * Drop this inside your existing page layout (it assumes your site's
 * own header/nav/footer wrap around it) — it renders only the IPO
 * page's own content column.
 */
export default function IPOPage({ content = ipoContent }) {
  const {
    hero,
    currentlyOpen,
    whoCanApply,
    confirmedNote,
    pricingMethods,
    allocation,
    howToApply,
    lockIn,
    membershipClub,
    finalCta,
  } = content;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top accent border — IPO asset-class color */}
      {/* <div className="h-1 w-full bg-[#c99a1a]" /> */}

      {/* Hero */}
      <section className="px-5 py-8 sm:py-10">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary_color/10 px-2.5 py-1 text-xs font-semibold text-secondary_color mb-4">
          {hero.eyebrow}
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 max-w-xl">
          {hero.headline}
        </h1>
        <p className="text-sm text-gray-600 mt-3 max-w-xl leading-relaxed">
          {hero.subhead}
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-md bg-[#004990] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </section>

      {/* Currently Open — dedicated component, supports a company image */}
      <CurrentlyOpenIPOCard data={currentlyOpen} />

      {/* Who Can Apply */}
      <section className="px-5 py-6 border-b border-gray-200">
        <h2 className="text-xs font-medium text-gray-500 mb-3">Who Can Apply</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whoCanApply.map((item) => (
            <div key={item.title} className="rounded-lg border border-gray-200 p-3.5">
              <IconByName name={item.icon} className="w-5 h-5 text-secondary_color" />
              <div className="text-sm font-medium text-gray-900 mt-2">{item.title}</div>
              <div className="text-xs text-gray-600 mt-1">{item.description}</div>
            </div>
          ))}
        </div>

        {confirmedNote && (
          <div className="flex items-start gap-2 rounded-md border border-[#cfe7da] bg-[#e7f3ec] px-3 py-2.5 mt-3">
            <CheckCircleIcon className="w-4 h-4 text-[#1f7a4d] mt-0.5 shrink-0" />
            <p className="text-xs text-[#1f7a4d]">{confirmedNote}</p>
          </div>
        )}
      </section>

      {/* How Pricing Works */}
      <section className="px-5 py-6 border-b border-gray-200">
        <h2 className="text-xs font-medium text-gray-500 mb-3">How Pricing Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pricingMethods.map((method) => (
            <div key={method.title} className="rounded-lg border border-gray-200 p-3.5">
              <div className="text-sm font-medium text-gray-900">{method.title}</div>
              <div className="text-xs text-gray-600 mt-1">{method.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Allocation Rules & Quota Distribution */}
      <section className="px-5 py-6 border-b border-gray-200">
        <h2 className="text-xs font-medium text-gray-500 mb-1">
          Allocation Rules &amp; Quota Distribution
        </h2>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">{allocation.note}</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 bg-secondary_color/10 px-2.5 py-2">
                  Investor Category
                </th>
                <th className="text-right text-[10px] font-semibold uppercase tracking-wide text-gray-500 bg-secondary_color/10 px-2.5 py-2">
                  Fixed Price Quota
                </th>
                <th className="text-right text-[10px] font-semibold uppercase tracking-wide text-gray-500 bg-secondary_color/10 px-2.5 py-2">
                  Book Building Quota
                </th>
              </tr>
            </thead>
            <tbody>
              {allocation.rows.map((row) => (
                <tr key={row.category} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-2.5 py-2.5 font-medium text-secondary_color">{row.category}</td>
                  <td className="px-2.5 py-2.5 text-right text-gray-900">{row.fixedPrice}</td>
                  <td className="px-2.5 py-2.5 text-right text-gray-900">{row.bookBuilding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {allocation.warning && (
          <p className="text-[11px] text-gray-500 border border-dashed border-gray-300 rounded-md px-2.5 py-2 mt-3 leading-relaxed">
            {allocation.warning}
          </p>
        )}
      </section>

      {/* How to Apply */}
      <section className="px-5 py-6 border-b border-gray-200">
        <h2 className="text-xs font-medium text-gray-500 mb-3">How to Apply</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {howToApply.steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-6 h-6 rounded-full bg-secondary_color/10 text-secondary_color text-xs font-semibold flex items-center justify-center mx-auto mb-1.5">
                {step.number}
              </div>
              <div className="text-xs text-gray-700">{step.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mt-3">{howToApply.note}</p>
      </section>

      {/* Lock-In callout */}
      <section className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-start gap-2.5 rounded-lg bg-secondary_color/10 p-3.5">
          <AlertTriangleIcon className="w-4 h-4 text-secondary_color mt-0.5 shrink-0" />
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>{lockIn.gi.split(":")[0]}:</strong> {lockIn.gi.split(":").slice(1).join(":").trim()}{" "}
            <strong>{lockIn.nrb.split(":")[0]}:</strong> {lockIn.nrb.split(":").slice(1).join(":").trim()}
          </p>
        </div>
      </section>

      {/* Membership Club */}
      <section className="px-5 py-6 border-b border-gray-200">
        <h2 className="text-xs font-medium text-gray-500 mb-3">Never Miss an IPO</h2>
        <a
          href={membershipClub.href}
          className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3.5 hover:border-[#c99a1a] transition"
        >
          <div>
            <div className="text-sm font-medium text-gray-900">{membershipClub.title}</div>
            <div className="text-xs text-gray-600 mt-1">{membershipClub.description}</div>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-secondary_color shrink-0" />
        </a>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-6 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-sm text-gray-600">{finalCta.label}</span>
        <a
          href={finalCta.href}
          className="inline-flex items-center justify-center rounded-md bg-[#004990] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
        >
          {finalCta.buttonLabel}
        </a>
      </section>
    </div>
  );
}
