// app/client-services/page.jsx

import Image from 'next/image'
import Link from 'next/link'
import { Poppins, Roboto } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
// ─── SEO: Metadata ─────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.midwaybd.com'
const PAGE_URL = `${BASE_URL}/client-services`

export const metadata = {
  title: 'Client Services | Midway Securities Ltd. — DSE Broker Bangladesh',
  description:
    'Explore all client services at Midway Securities: QuickTrade Pro app, online BO account opening, IPO applications, share trading, BEFTN withdrawals, tax reports, SMS alerts and more.',

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Midway Securities Ltd.',
    title: 'Client Services | Midway Securities Ltd. — DSE Broker Bangladesh',
    description:
      'From mobile trading and IPO applications to dividend statements and BEFTN withdrawals — discover the full suite of investor services at Midway Securities.',
    images: [
      {
        url: `${BASE_URL}/og/client-services.png`, // 1200×630 recommended
        width: 1200,
        height: 630,
        alt: 'Midway Securities client services overview',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Client Services | Midway Securities Ltd.',
    description:
      'QuickTrade Pro, BO account opening, IPO club, BEFTN withdrawals, daily email alerts and more — all from Midway Securities.',
    images: [`${BASE_URL}/og/client-services.png`],
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
    'Midway Securities Bangladesh',
    'DSE broker Bangladesh',
    'BO account opening Bangladesh',
    'QuickTrade Pro app',
    'IPO application Bangladesh',
    'share trading Bangladesh',
    'BEFTN withdrawal',
    'CDBL SMS alert',
    'Dhaka Stock Exchange broker',
    'online stock trading Bangladesh',
  ],
  authors: [{ name: 'Midway Securities Ltd.' }],
  category: 'Finance & Investment',
}

// ─── SEO: JSON-LD ─────────────────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FinancialService',
      '@id': `${BASE_URL}/#organization`,
      name: 'Midway Securities Ltd.',
      url: BASE_URL,
      description:
        'Midway Securities Ltd. is a DSE-authorized stockbroker offering mobile trading, BO account opening, IPO applications, and full investment management services in Bangladesh.',
      areaServed: { '@type': 'Country', name: 'Bangladesh' },
      serviceType: 'Stockbroker',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      sameAs: [
        'https://www.facebook.com/midwaybd',
      ],
    },

    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Client Services',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      description: metadata.description,
      inLanguage: 'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Client Services', item: PAGE_URL },
        ],
      },
    },

    // ItemList lets Google understand the page as a structured list of services
    {
      '@type': 'ItemList',
      name: 'Midway Securities Client Services',
      description: 'Full list of investment and trading services offered by Midway Securities Ltd.',
      numberOfItems: 16,
      itemListElement: [
        { '@type': 'ListItem', position: 1,  name: 'QuickTrade Pro Mobile App',   url: `${PAGE_URL}#quicktrade` },
        { '@type': 'ListItem', position: 2,  name: 'Midway Portal',               url: `${PAGE_URL}#portal` },
        { '@type': 'ListItem', position: 3,  name: 'BO Account Opening',          url: `${PAGE_URL}#bo-account` },
        { '@type': 'ListItem', position: 4,  name: 'Apply for IPO',               url: `${PAGE_URL}#ipo` },
        { '@type': 'ListItem', position: 5,  name: 'Share Trading',               url: `${PAGE_URL}#trading` },
        { '@type': 'ListItem', position: 6,  name: 'IPO Membership Club',         url: `${PAGE_URL}#ipo-club` },
        { '@type': 'ListItem', position: 7,  name: 'Easy Deposits',               url: `${PAGE_URL}#deposits` },
        { '@type': 'ListItem', position: 8,  name: 'Tax Report',                  url: `${PAGE_URL}#tax-report` },
        { '@type': 'ListItem', position: 9,  name: 'Daily Emails',                url: `${PAGE_URL}#emails` },
        { '@type': 'ListItem', position: 10, name: 'Easy Withdrawal via BEFTN',   url: `${PAGE_URL}#withdrawal` },
        { '@type': 'ListItem', position: 11, name: 'Dividend Statement',          url: `${PAGE_URL}#dividend` },
        { '@type': 'ListItem', position: 12, name: 'CDBL SMS Alert',              url: `${PAGE_URL}#cdbl-sms` },
        { '@type': 'ListItem', position: 13, name: 'Daily Emails & SMS Alert',    url: `${PAGE_URL}#daily-alerts` },
        { '@type': 'ListItem', position: 14, name: 'Professional Staff',          url: `${PAGE_URL}#staff` },
        { '@type': 'ListItem', position: 15, name: 'DSE Training Academy',        url: `${PAGE_URL}#dse-training` },
        { '@type': 'ListItem', position: 16, name: 'DSE Info App',                url: `${PAGE_URL}#dse-app` },
      ],
    },

    // SoftwareApplication schema for QuickTrade Pro — enables app rich results
    {
      '@type': 'MobileApplication',
      name: 'QuickTrade Pro',
      operatingSystem: 'Android, iOS',
      applicationCategory: 'FinanceApplication',
      description:
        'Buy or sell shares from your phone, create portfolios, track stocks, set alerts and watchlists, and get the latest exchange news.',
      author: { '@id': `${BASE_URL}/#organization` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BDT' },
    },
  ],
}

// ─── Page Data ─────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'quicktrade',
    title: 'QuickTrade Pro Mobile App',
    description:
      'With QuickTrade Pro Mobile App (for Android and iPhone) you can buy or sell from your phone, create your portfolio, track individual stocks, create alerts and watchlists, get the latest exchange news and much more.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/quicktrade-pro-reel-1-facebook-ad.jpg?1737528553',
    imageAlt: 'QuickTrade Pro mobile trading app interface for Android and iPhone',
    features: [
      'Buy and sell shares directly from your phone',
      'Real-time portfolio tracking and watchlists',
      'Custom stock price alerts',
      'Available on Apple App Store and Google Play Store',
      'Desktop version also available',
    ],
    links: [
      { text: 'Download for Android', href: 'https://play.google.com/store/apps/details?id=com.midwaybd.quick_trade_pro&hl=en', external: false },
      { text: 'Download for iOS', href: 'https://apps.apple.com/us/app/quicktrade-pro/id6740322022', external: false },
    ],
  },
  {
    id: 'portal',
    title: 'Midway Online Portal',
    description:
      'All our services are available online through the Midway Portal. Get full control of your BO Account — trade online, deposit funds, withdraw funds, apply for IPO, SME, ATB and more, all from one place.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-4_orig.png',
    imageAlt: 'Midway Securities online portal dashboard for BO account management',
    features: [
      'Complete BO account management online',
      'Online share trading',
      'Fund deposits and withdrawals',
      'IPO, SME, and ATB applications',
    ],
  },
  {
    id: 'bo-account',
    title: 'BO Account Opening',
    description:
      'Open a Beneficiary Owner (BO) Account with Midway Securities through one of our convenient branch locations across Bangladesh, or start the process entirely online.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/bo-image_orig.png',
    imageAlt: 'BO account opening process at Midway Securities Bangladesh',
    features: [
      'Branch locations in multiple cities',
      'Online account opening available',
      'Fast and straightforward process',
      'Dedicated support throughout',
    ],
    links: [
      { text: 'Open a BO Account Online', href: 'https://portal.midwaybd.com/bo/portal-login', external: true },
    ],
  },
  {
    id: 'ipo',
    title: 'Apply for IPO',
    description:
      'Apply for any IPO listed on the Dhaka Stock Exchange directly through Midway Securities. We also offer an exclusive IPO Membership Club to ensure you never miss an opportunity.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/ipo-11_orig.png',
    imageAlt: 'IPO application service at Midway Securities DSE Bangladesh',
    features: [
      'Online IPO applications',
      'All DSE-listed IPOs covered',
      'IPO Membership Club available',
      'Simple and quick application process',
    ],
  },
  {
    id: 'trading',
    title: 'Share Trading',
    description:
      'Buy and sell shares on the Dhaka Stock Exchange through Midway Securities via phone, the internet, or by visiting any of our offices. Multiple channels ensure you can always trade on your terms.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/buy-and-sell_orig.png',
    imageAlt: 'Share trading buy and sell service at Midway Securities Bangladesh',
    features: [
      'Phone-based trading support',
      'Online trading via portal and app',
      'In-person trading at any branch',
      'Competitive brokerage rates',
    ],
  },
  {
    id: 'ipo-club',
    title: 'IPO Membership Club',
    description:
      'Join the Midway IPO Membership Club and never miss an IPO application again. We automatically apply for all eligible IPOs on your behalf based on your available balance.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/ipo-club-membership-logo-2.png?1617384776',
    imageAlt: 'Midway Securities IPO Membership Club logo Bangladesh',
    features: [
      'Automatic IPO applications',
      'Balance-based application management',
      'Never miss a DSE IPO',
      'Mutual Funds excluded from auto-apply',
    ],
    note: 'Note: We will not automatically apply for Mutual Funds. Contact us for details.',
  },
  {
    id: 'deposits',
    title: 'Easy Deposits',
    description:
      'Fund your trading account conveniently using a range of deposit methods including bank transfer, mobile banking, and credit card — with fast processing times.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/bank-mobile-money-credit-card-1_orig.png',
    imageAlt: 'Easy deposit methods for Midway Securities trading account Bangladesh',
    features: [
      'Bank transfer deposits',
      'Mobile banking support',
      'Credit card deposits',
      'Fast processing times',
    ],
  },
  {
    id: 'tax-report',
    title: 'Tax Report',
    description:
      'Receive your yearly tax report on all your investments through Midway Securities. All documents are available online for easy access and filing.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/tax-report_orig.png',
    imageAlt: 'Annual investment tax report from Midway Securities Bangladesh',
    features: [
      'Yearly investment tax reports',
      'All documents accessible online',
      'Tax-ready statements',
      'Complete transaction records',
    ],
  },
  {
    id: 'emails',
    title: 'Daily Emails',
    description:
      'Receive free daily email updates covering your portfolio performance, ledger balance, and trading confirmations — keeping you fully informed every day.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/_________4719675.jpg',
    imageAlt: 'Daily portfolio email service from Midway Securities',
    features: [
      'Daily portfolio summary emails',
      'Ledger statements',
      'Trade confirmation notices',
      'Completely free service',
    ],
  },
  {
    id: 'withdrawal',
    title: 'Easy Withdrawal: BEFTN',
    description:
      'Withdraw funds from the comfort of your home. Email us your signed Cheque Requisition Form and we will deposit funds directly into your bank account via the Bangladesh Electronic Fund Transfer Network (BEFTN).',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/bangladesh-bank-logo-vector-tranparent.png?1617383868',
    imageAlt: 'Bangladesh Bank BEFTN electronic fund transfer for Midway Securities withdrawals',
    features: [
      'Withdraw from home via email',
      'Bangladesh Bank–approved BEFTN network',
      'Direct deposit to your bank account',
      'Secure and reliable processing',
    ],
  },
  {
    id: 'dividend',
    title: 'Dividend Statement',
    description:
      'Never miss your dividends. Midway Securities provides a comprehensive yearly statement of all dividends credited to your account.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-5_orig.png',
    imageAlt: 'Yearly dividend statement from Midway Securities Bangladesh',
    features: [
      'Comprehensive yearly dividend tracking',
      'Full dividend history on record',
      'Online document access',
      'Never miss a dividend payment',
    ],
  },
  {
    id: 'cdbl-sms',
    title: 'CDBL SMS Alert',
    description:
      'CDBL offers free SMS alerts to Beneficiary Owner (BO) account holders, notifying you of every debit and credit transaction that takes place in your account — in real time.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/cdbl-sms-alerts.png?1504609219',
    imageAlt: 'CDBL SMS alert service for BO account holders in Bangladesh',
    features: [
      'Free SMS alert service from CDBL',
      'Real-time debit and credit notifications',
      'Available to all BO account holders',
      'Easy online registration',
    ],
  },
  {
    id: 'daily-alerts',
    title: 'Daily Emails',
    description:
      'Stay completely informed with free daily email updates on your portfolio, ledger.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/email-sms-alert_orig.jpg',
    imageAlt: 'Daily email and SMS trading alert service from Midway Securities',
    features: [
      'Daily portfolio and ledger emails',
      'Instant SMS on every trade',
      'Buy and sell confirmations',
      'All completely free',
    ],
  },
  {
    id: 'staff',
    title: 'Professional Staff',
    description:
      'Every member of the Midway Securities team is professionally trained to help you succeed in your investment journey. Contact us for personalized guidance and investment planning.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/team_orig.png',
    imageAlt: 'Professional investment advisory team at Midway Securities Bangladesh',
    features: [
      'Professionally trained advisors',
      'Personalized investment planning',
      'Expert market knowledge',
      'Dedicated client support',
    ],
  },
  {
    id: 'dse-training',
    title: 'DSE Training Academy',
    description:
      'Develop your market knowledge at the DSE Training Academy. Monthly courses cover Fundamental Stock Analysis, Technical Stock Trading, Equity Portfolio Management, Valuation of Shares, and more — open to everyone.',
    image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/__557534_orig.jpg',
    imageAlt: 'DSE Training Academy courses for stock market education Bangladesh',
    features: [
      'Fundamental Stock Analysis',
      'Technical Stock Trading',
      'Equity Portfolio Management',
      'Valuation of Shares and diplomas',
    ],
    links: [
      { text: 'View Monthly Schedule', href: 'https://www.dsebd.org/Training_Academy_2.b.php', external: true },
      // { text: 'Register for a Course', href: 'https://main.dsebd.org/online_login.php', external: true },
    ],
  }
]

// ─── Sub-components ────────────────────────────────────────────────────────────

const Tag = ({ children }) => (
  <span className="inline-block font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-amber-600 border border-amber-500 px-2.5 py-1 rounded-sm mb-4">
    {children}
  </span>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ExternalArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

// ─── Page Component ────────────────────────────────────────────────────────────

export default function ClientServicesPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className={` text-slate-900 bg-white ${poppins.className}`}>

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="px-8 md:px-12 py-3 bg-stone-100 border-b border-stone-200">
          <ol className="flex items-center gap-2 font-sans text-xs text-slate-500 list-none p-0 m-0">
            <li><Link href="/" className="hover:text-slate-800 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-800 font-medium" aria-current="page">Client Services</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section
          className="relative bg-[#0d2b4e] px-8 md:px-12 py-20 md:py-28 overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Decorative background image — aria-hidden so screen readers skip it */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1991781394.jpg')" }}
            aria-hidden="true"
          />
          <div className="relative max-w-4xl mx-auto">
            <p className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-sky-300 mb-5">
              Midway Securities Ltd. · DSE-Authorized Broker
            </p>
            {/* h1 — primary keyword: "client services" + brand + location */}
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-white mb-5">
              Client Services<br />
              <span className="text-2xl md:text-3xl text-sky-200 font-light">Investing, Simplified.</span>
            </h1>
            <p className="font-sans text-base leading-relaxed text-sky-200 max-w-xl mb-8">
              Everything you need to invest on the Dhaka Stock Exchange — mobile
              trading, BO account opening, IPO applications, fund management,
              research, and more.
            </p>
            {/* Keyword chip list — visible content, not decorative */}
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Services overview">
              {['Mobile Trading', 'BO Accounts', 'IPO Applications', 'Share Trading', 'BEFTN Withdrawals', 'Research', 'SMS Alerts'].map((item) => (
                <li key={item}>
                  <span className="font-sans text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sky-100">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Service Cards ── */}
        {/* <ol> because the services have a meaningful order matching the JSON-LD ItemList */}
        <ol className="list-none p-0 m-0 max-w-5xl mx-auto px-8 md:px-12 py-16 space-y-20">
          {services.map((service, index) => (
            // <li> + <article> = semantically self-contained service entry
            <li key={service.id}>
              <article
                id={service.id}
                aria-labelledby={`${service.id}-heading`}
                className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
              >
                {/* Image — alternating left/right layout */}
                <div className={`relative rounded overflow-hidden border border-stone-200 bg-stone-50 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}  // descriptive alt text — not generic
                    width={600}
                    height={400}
                    className="w-full h-56 object-contain p-4"
                    // Lazy-load all images except the first (above the fold)
                    loading={index === 0 ? 'eager' : 'lazy'}
                    // First image gets high priority for LCP
                    priority={index === 0}
                  />
                </div>

                {/* Content */}
                <div className={index % 2 !== 0 ? 'md:order-1' : ''}>
                  <Tag>Service {String(index + 1).padStart(2, '0')}</Tag>
                  {/* h2 — one per service, keyword-rich */}
                  <h2 id={`${service.id}-heading`} className="text-2xl md:text-3xl font-normal text-[#0d2b4e] leading-snug mb-4">
                    {service.title}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-slate-500 mb-5">
                    {service.description}
                  </p>

                  {/* Feature list — <ul> is correct; unordered benefits */}
                  <ul className="space-y-2 mb-5 list-none p-0">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="font-sans text-xs leading-relaxed text-slate-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Advisory note */}
                  {service.note && (
                    <p className="font-sans text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-4 py-3 mb-5">
                      {service.note}
                    </p>
                  )}

                  {/* CTA links */}
                  {service.links && (
                    <div className="flex flex-wrap gap-3">
                      {service.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase bg-[#0d2b4e] text-white px-5 py-2.5 rounded-sm hover:bg-[#0a2240] transition-colors no-underline"
                        >
                          {link.text}
                          <ExternalArrow />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>

              {/* Visual divider between cards — hidden from assistive tech */}
              {index < services.length - 1 && (
                <div className="mt-20 border-b border-stone-100" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        {/* ── Bottom CTA ── */}
        <section aria-labelledby="cta-heading" className="bg-[#0d2b4e] px-8 md:px-12 py-16 text-center">
          <Tag>Get Started</Tag>
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-normal text-white leading-tight mb-4">
            Ready to start investing?
          </h2>
          <p className="font-sans text-sm leading-relaxed text-sky-200 max-w-lg mx-auto mb-8">
            Open a BO account today and access the full suite of Midway Securities
            services — from mobile trading to IPO applications and beyond.
          </p>
          <Link
            href="https://portal.midwaybd.com/bo/portal-login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase bg-amber-500 text-[#0d2b4e] px-8 py-3 rounded-sm hover:bg-amber-400 transition-colors no-underline"
          >
            Open a BO Account
            <ExternalArrow />
          </Link>
        </section>

      </main>
    </>
  )
}