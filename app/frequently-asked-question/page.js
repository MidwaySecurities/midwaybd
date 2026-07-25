// FILE 1: app/frequently-asked-question/page.tsx (Server Component)
import FAQClient from './FAQClient'
import { faqData, categories } from './faqData'

// TODO: replace with your real production domain
const SITE_URL = 'https://www.midwaybd.com'
const PAGE_PATH = '/frequently-asked-question'

export const metadata = {
  title: 'Frequently Asked Questions - Midway Securities | Trading, Account & Support',
  description: 'Get answers to common questions about trading, account management, deposits, withdrawals, fees, and technical support at Midway Securities.',
  keywords: 'FAQ, trading questions, account management, Midway Securities, DSE trading, brokerage help',
  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
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
  openGraph: {
    title: 'Frequently Asked Questions - Midway Securities',
    description: 'Get answers to common questions about trading, account management, and our services.',
    type: 'website',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
}

export default function FAQPage() {
  // FAQPage structured data — every Q&A across every category, regardless of
  // which tab is visually active. This is what Google's rich results and AI
  // answer engines (which often parse JSON-LD directly) rely on.
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Object.entries(faqData).flatMap(([category, questions]) =>
      questions.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      }))
    ),
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: `${SITE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Get quick answers to common questions about trading, account management, and our services
              </p>
            </div>
          </div>
        </header>

        {/*
          No <noscript> duplicate block needed anymore: FAQClient below is a
          'use client' component, but Next.js still server-renders it for the
          initial HTML response. Since FAQClient now renders every category's
          Q&A into the DOM (toggling visibility with CSS instead of filtering
          data out), the full content — not just the active tab — is already
          present in the HTML that both search engines and non-JS AI crawlers
          receive on first load.
        */}
        <FAQClient faqData={faqData} categories={categories} />
      </div>
    </>
  )
}