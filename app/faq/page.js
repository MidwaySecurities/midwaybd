// app/faq/page.js
import FAQList from './FAQList'

export const metadata = {
  title: 'Frequently Asked Questions | Midway Securities Limited',
  description:
    'Find answers to common questions about BO accounts, trading, deposits, withdrawals, and more from Midway Securities Limited.',
  keywords:
    'BO Account, Trading, Stock Market, Midway Securities, Brokerage, Bangladesh, FAQ',
}

export default function FAQPage() {
  const faqData = [
    {
      id: 1,
      question: 'How do I open a BO account with Midway Securities?',
      answer:
        'You can open a BO account by visiting our office or completing the online application through our website. Once submitted, you will receive your user ID and password via email.',
    },
    {
      id: 2,
      question: 'What is the BO account opening fee?',
      answer:
        'The BO account opening fee is BDT 150 only. Payment can be made online or at our office counter.',
    },
    {
      id: 3,
      question: 'Can I trade shares using the QuickTrade Pro app?',
      answer:
        'Yes, QuickTrade Pro allows you to trade directly from your smartphone. You can buy, sell, and monitor your portfolio anytime.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions (FAQ)
      </h1>

      <FAQList faqs={faqData} />

      {/* ✅ SEO FAQ Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  )
}
