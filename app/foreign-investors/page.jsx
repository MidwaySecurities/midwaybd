// app/foreign-investor/page.jsx

import Link from 'next/link'

// ─── SEO: Metadata ─────────────────────────────────────────────────────────────
// Next.js App Router reads this export at build time and injects it into <head>.

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.yourbrokerage.com'
const PAGE_URL = `${BASE_URL}/foreign-investor`

export const metadata = {
  title: 'Foreign Investor Services | DSE-Authorized Broker Bangladesh',
  description:
    'End-to-end investment services for foreign individuals and institutions on the Dhaka Stock Exchange. BO account opening, trade execution, repatriation support, and strategic consulting.',

  alternates: {
    canonical: PAGE_URL,
    // Add hreflang if you serve a Bengali version:
    // languages: { 'bn-BD': `${BASE_URL}/bn/foreign-investor` },
  },

  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'YourBrokerage | Dhaka Stock Exchange',
    title: 'Foreign Investor Services | DSE-Authorized Broker Bangladesh',
    description:
      "Invest in Bangladesh's capital markets with confidence. We handle BO accounts, NITA & FC accounts, trade execution, and full repatriation support for foreign investors.",
    images: [
      {
        url: `${BASE_URL}/og/foreign-investor.png`, // 1200×630 recommended
        width: 1200,
        height: 630,
        alt: 'Foreign investor services on the Dhaka Stock Exchange',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Foreign Investor Services | DSE-Authorized Broker',
    description:
      'BO account, NITA, FC accounts, repatriation support, and strategic consulting for foreign investors in Bangladesh.',
    images: [`${BASE_URL}/og/foreign-investor.png`],
    // site: '@YourTwitterHandle',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  keywords: [
    'foreign investor Bangladesh',
    'DSE foreign investment',
    'Dhaka Stock Exchange broker',
    'BO account Bangladesh',
    'NITA account Bangladesh',
    'repatriation Bangladesh',
    'foreign institutional investor DSE',
    'invest Bangladesh stock market',
    'capital market Bangladesh',
  ],
  authors: [{ name: 'YourBrokerage Research Team' }],
  category: 'Finance & Investment',
}

// ─── SEO: JSON-LD Structured Data ─────────────────────────────────────────────
// Injected as <script type="application/ld+json"> — enables rich results in Google SERPs.

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. The brokerage as a FinancialService entity
    {
      '@type': 'FinancialService',
      '@id': `${BASE_URL}/#organization`,
      name: 'YourBrokerage',
      url: BASE_URL,
      description:
        'DSE-authorized stockbroker offering end-to-end services for foreign individual and institutional investors in Bangladesh.',
      areaServed: { '@type': 'Country', name: 'Bangladesh' },
      serviceType: 'Stockbroker',
      telephone: '+880-XX-XXXXXXXX', // replace
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'DSE Building, ...',  // replace
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      sameAs: [
        'https://www.facebook.com/yourbrokerage',   // replace
        'https://www.linkedin.com/company/yourbrokerage',
      ],
    },

    // 2. WebPage + BreadcrumbList — enables breadcrumb rich results
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Foreign Investor Services',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      description: metadata.description,
      inLanguage: 'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Foreign Investor Services', item: PAGE_URL },
        ],
      },
    },

    // 3. FAQPage — Google may expand these as rich results directly in SERPs
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What tax rates apply to foreign investors in Bangladesh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For foreign individuals, the tax on cash dividends is 25% and capital gains tax is 0%. For foreign companies, the dividend tax is 20% and capital gains tax is 10%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can foreign investors repatriate funds from Bangladesh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Foreign Investment Act of 1980 guarantees the right of repatriation of invested capital, profits, capital gains, post-tax dividends, and approved royalties and fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'What accounts does a foreign investor need to open on the DSE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Foreign investors typically need to open a Beneficiary Owner (BO) account, a Non-Resident Investor Taka (NITA) account, and a Foreign Currency (FC) account.',
          },
        },
        {
          '@type': 'Question',
          name: 'What documents are required to open a foreign investor account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Required documents include the completed foreign institutional form, memorandum and articles of association, certificate of incorporation, board resolution to open and operate the account, and authorization for named executives — all attested by the Bangladesh Embassy or notarized by a notary public.',
          },
        },
      ],
    },
  ],
}

// ─── Page Data ─────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Economic Freedom Score',    value: '55.0', sub: '128th globally' },
  { label: 'Annual GDP Growth',          value: '6.5%', sub: 'Past 5 years avg.' },
  { label: 'Asia-Pacific Rank',          value: '28th', sub: 'Out of 43 nations' },
  { label: 'Dividend Tax (Foreign Co.)', value: '20%',  sub: 'Capital gain: 10%' },
]

const services = [
  {
    title: 'Investor Relations',
    desc: 'Direct dealings with foreign individual and institutional investors at every stage of the investment lifecycle.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Strategic Consulting',
    desc: 'Business plan and sales strategy development tailored for foreign market entry into Bangladesh.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Account Operations',
    desc: 'Full operational support for BO, NITA, and FC account opening, plus ongoing custodial activity management.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Trade Execution & Repatriation',
    desc: 'Seamless trade execution on the DSE and full repatriation of proceeds with complete documentation support.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Research Data',
    desc: 'On-demand market research and proprietary data delivered to specific foreign clients upon request.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'End-to-End Solutions',
    desc: 'Comprehensive A-to-Z advisory covering every regulatory, operational, and strategic aspect of your investment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

const documents = [
  'Collect and complete the foreign institutional account form, signed by authorized personnel',
  'Memorandum and articles of association of the company',
  'Certificate of incorporation of the company',
  'Authorization or board resolution to open and operate the account',
  'Board resolution authorizing named executives to operate the account, including their photographs',
  'Hard copy submission required — all documents must be attested by the Bangladesh Embassy or notarized by a notary public',
]

const taxRows = [
  { type: 'Foreign Individual', dividend: '25%', capitalGain: '0%' },
  { type: 'Foreign Company',    dividend: '20%', capitalGain: '10%' },
]

const faqs = [
  {
    q: 'Can foreign investors repatriate funds from Bangladesh?',
    a: 'Yes. The Foreign Investment Act of 1980 guarantees the right of repatriation of invested capital, profits, capital gains, post-tax dividends, and approved royalties and fees, provided the appropriate documentation is in order.',
  },
  {
    q: 'What tax rates apply to foreign investors on the DSE?',
    a: 'Foreign individuals pay 25% tax on cash dividends and 0% on capital gains. Foreign companies pay 20% on cash dividends and 10% on capital gains.',
  },
  {
    q: 'What accounts does a foreign investor need to open?',
    a: 'Foreign investors typically open a Beneficiary Owner (BO) account, a Non-Resident Investor Taka (NITA) account, and a Foreign Currency (FC) account.',
  },
]

// ─── Sub-component ─────────────────────────────────────────────────────────────

const Tag = ({ children }) => (
  <span className="inline-block font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-amber-600 border border-amber-500 px-2.5 py-1 rounded-sm mb-4">
    {children}
  </span>
)

// ─── Page Component ────────────────────────────────────────────────────────────

export default function ForeignInvestorPage() {
  return (
    <>
      {/* JSON-LD injected into <head> by Next.js */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* <main> landmark — crawlers treat this as primary page content */}
      <main id="main-content" className="font-serif text-slate-900 bg-white max-w-5xl mx-auto">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="px-8 md:px-12 py-3 bg-stone-100 border-b border-stone-200">
          <ol className="flex items-center gap-2 font-sans text-xs text-slate-500 list-none p-0 m-0">
            <li><Link href="/" className="hover:text-slate-800 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-800 font-medium" aria-current="page">Foreign Investor Services</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section className="bg-[#0d2b4e] px-8 md:px-12 py-16 md:py-20">
          {/* <p> eyebrow — not a heading, preserves h1 prominence */}
          <p className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-sky-300 mb-5">
            Dhaka Stock Exchange · Authorized Broker
          </p>
          {/* Single h1 per page, keyword-rich */}
          <h1 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-white mb-5">
            Foreign Investor Services<br />
            <span className="text-2xl md:text-3xl text-sky-200 font-light">on the Dhaka Stock Exchange</span>
          </h1>
          <p className="font-sans text-base leading-relaxed text-sky-200 max-w-md mb-8">
            End-to-end support for international individuals and institutions
            investing in Bangladesh's capital markets — from account opening
            to trade execution and full repatriation of proceeds.
          </p>
          <a
            href="http://www.dsebd.org/pdf/facilities%20for%20for%20foreign%20investors.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download the DSE facilities guide for foreign investors (opens PDF)"
            className="inline-block font-sans text-xs font-bold tracking-widest uppercase bg-amber-500 text-[#0d2b4e] px-7 py-3 rounded-sm hover:bg-amber-400 transition-colors no-underline"
          >
            DSE Investor Guide ↗
          </a>
        </section>

        {/* ── Stats — <dl> is semantically correct for label/value pairs ── */}
        <section aria-label="Key economic indicators">
          <dl className="grid grid-cols-2 md:grid-cols-4 border-b border-stone-200">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-stone-50 px-6 py-7 ${i < stats.length - 1 ? 'border-r border-stone-200' : ''}`}
              >
                <dd className="text-3xl font-normal text-[#0d2b4e] tracking-tight mb-1">{s.value}</dd>
                <dt className="font-sans text-xs font-semibold text-slate-800 mb-1">{s.label}</dt>
                <dd className="font-sans text-[11px] text-slate-400">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Investment Freedom ── */}
        <section aria-labelledby="investment-freedom-heading" className="px-8 md:px-12 py-16">
          <div className="grid md:grid-cols-2 gap-14 items-start max-w-4xl mx-auto">
            <div>
              <Tag>Investment Freedom</Tag>
              <h2 id="investment-freedom-heading" className="text-3xl font-normal text-[#0d2b4e] leading-snug mb-4">
                Guaranteed right of repatriation for foreign investors
              </h2>
              <p className="font-sans text-sm leading-relaxed text-slate-500 mb-3">
                The Foreign Investment Act of 1980 guarantees the right of repatriation
                of invested capital, profits, capital gains, post-tax dividends, and
                approved royalties and fees. Foreign firms may repatriate funds from
                Bangladesh with minimal difficulty provided the appropriate documentation
                is in order.
              </p>
              <p className="font-sans text-sm leading-relaxed text-slate-500">
                Bangladesh's economic freedom score stands at 55.0, ranking it 128th globally
                and 28th in the Asia-Pacific region, with GDP growth averaging 6.5% annually
                over the past five years.
              </p>
            </div>

            {/* Proper <table> with <caption> and scope attrs for accessibility + crawlability */}
            <div className="bg-white border border-stone-200 rounded p-7 self-start">
              <table className="w-full font-sans text-sm border-collapse">
                <caption className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-4 text-left caption-top pb-3">
                  Applicable Tax Rates for Foreign Investors in Bangladesh
                </caption>
                <thead>
                  <tr className="border-b border-stone-200">
                    <th scope="col" className="text-left font-semibold text-[11px] tracking-wide uppercase text-slate-400 pb-3 pr-4">Investor Type</th>
                    <th scope="col" className="text-left font-semibold text-[11px] tracking-wide uppercase text-slate-400 pb-3 pr-4">Cash Dividend</th>
                    <th scope="col" className="text-left font-semibold text-[11px] tracking-wide uppercase text-slate-400 pb-3">Capital Gain</th>
                  </tr>
                </thead>
                <tbody>
                  {taxRows.map((r, i) => (
                    <tr key={r.type} className={i < taxRows.length - 1 ? 'border-b border-stone-100' : ''}>
                      <th scope="row" className="py-3 pr-4 text-slate-600 text-xs font-normal text-left">{r.type}</th>
                      <td className="py-3 pr-4 text-xl font-normal text-[#0d2b4e]">{r.dividend}</td>
                      <td className="py-3 text-xl font-normal text-[#0d2b4e]">{r.capitalGain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Services — <article> per card: each is independently meaningful content ── */}
        <section aria-labelledby="services-heading" className="bg-stone-50 px-8 md:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <Tag>What We Offer</Tag>
            <h2 id="services-heading" className="text-3xl font-normal text-[#0d2b4e] leading-snug mb-8">
              Investment services for foreign clients on the DSE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded overflow-hidden">
              {services.map((s) => (
                <article key={s.title} className="bg-white px-6 py-7 hover:bg-stone-50 transition-colors">
                  <div className="text-amber-500 mb-3">{s.icon}</div>
                  {/* h3 — correctly nested under this section's h2 */}
                  <h3 className="font-sans text-sm font-bold text-[#0d2b4e] mb-2">{s.title}</h3>
                  <p className="font-sans text-xs leading-relaxed text-slate-500 m-0">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Required Documents ── */}
        <section aria-labelledby="documents-heading" className="px-8 md:px-12 py-16">
          <div className="grid md:grid-cols-2 gap-14 items-start max-w-4xl mx-auto">
            <div>
              <Tag>Onboarding</Tag>
              <h2 id="documents-heading" className="text-3xl font-normal text-[#0d2b4e] leading-snug mb-4">
                Required documents to open a foreign investor account
              </h2>
              <p className="font-sans text-sm leading-relaxed text-slate-500 mb-6">
                Submit a complete application package to get started. All documents
                must be attested by the Bangladesh Embassy or notarized by a
                notary public before submission.
              </p>
              <a
                href="http://www.dsebd.org/pdf/facilities%20for%20for%20foreign%20investors.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View full DSE guidelines for foreign investors (opens PDF)"
                className="inline-block font-sans text-xs font-bold tracking-widest uppercase border border-[#0d2b4e] text-[#0d2b4e] px-6 py-2.5 rounded-sm hover:bg-[#0d2b4e] hover:text-white transition-colors no-underline"
              >
                View full DSE guidelines ↗
              </a>
            </div>

            {/* <ol> — ordered list is semantically correct; document sequence matters */}
            <ol className="list-none p-0 m-0 divide-y divide-stone-200">
              {documents.map((d, i) => (
                <li key={i} className="flex gap-4 py-4 items-start">
                  <span className="font-sans text-[11px] font-bold text-amber-500 min-w-[24px] mt-0.5 shrink-0" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-xs leading-relaxed text-slate-600">{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ — content in DOM (not JS-hidden) so fully crawlable ── */}
        {/* Mirrors the FAQPage JSON-LD above for rich result eligibility      */}
        <section aria-labelledby="faq-heading" className="bg-stone-50 px-8 md:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <Tag>Common Questions</Tag>
            <h2 id="faq-heading" className="text-3xl font-normal text-[#0d2b4e] leading-snug mb-8">
              Frequently asked questions about foreign investment in Bangladesh
            </h2>
            <dl className="divide-y divide-stone-200 border border-stone-200 rounded overflow-hidden">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white">
                  <dt>
                    <details className="group">
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-sans text-sm font-semibold text-[#0d2b4e] hover:bg-stone-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <svg
                          className="w-4 h-4 text-amber-500 shrink-0 ml-4 transition-transform group-open:rotate-180"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </summary>
                      <dd className="px-6 pb-5 font-sans text-sm leading-relaxed text-slate-500 m-0">
                        {faq.a}
                      </dd>
                    </details>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── International Broker CTA ── */}
        <section aria-labelledby="partner-heading" className="px-8 md:px-12 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Tag>International Partnerships</Tag>
            <h2 id="partner-heading" className="text-4xl font-normal text-[#0d2b4e] leading-tight mb-4">
              Partner with a leading DSE broker
            </h2>
            <p className="font-sans text-sm leading-relaxed text-slate-500 mb-8">
              As a leading broker of the Dhaka Stock Exchange, we welcome international
              brokers on a partnership basis for mutual benefit. We look forward to
              serving your clients' and investors' interests together.
            </p>
            <blockquote
              cite={BASE_URL}
              className="border-l-4 border-amber-500 bg-stone-50 text-left px-6 py-4 text-base leading-relaxed text-[#0d2b4e] rounded-r"
            >
              <p className="italic m-0">
                "We have several lucrative product designs to satisfy our foreign
                individual and institutional investors."
              </p>
            </blockquote>
          </div>
        </section>

      </main>
    </>
  )
}