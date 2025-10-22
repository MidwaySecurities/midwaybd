// FILE 1: app/frequently-asked-question/page.tsx (Server Component)
import FAQClient from './FAQClient'
import { faqData, categories } from './faqData'

export const metadata = {
  title: 'Frequently Asked Questions - Midway Securities | Trading, Account & Support',
  description: 'Get answers to common questions about trading, account management, deposits, withdrawals, fees, and technical support at Midway Securities.',
  keywords: 'FAQ, trading questions, account management, Midway Securities, DSE trading, brokerage help',
  openGraph: {
    title: 'Frequently Asked Questions - Midway Securities',
    description: 'Get answers to common questions about trading, account management, and our services.',
    type: 'website',
  },
}

export default function FAQPage() {
  // Generate JSON-LD structured data for SEO
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.entries(faqData).flatMap(([category, questions]) =>
      questions.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* SEO-friendly static content */}
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

        {/* Server-rendered content for SEO */}
        <noscript>
          <div className="max-w-6xl mx-auto px-4 py-12">
            <nav aria-label="FAQ Categories" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href={`#${category.id}`} className="text-blue-600 hover:underline">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {Object.entries(faqData).map(([categoryId, questions]) => {
              const category = categories.find(cat => cat.id === categoryId)
              return (
                <section key={categoryId} id={categoryId} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">{category?.name}</h2>
                  <div className="space-y-6">
                    {questions.map((faq) => (
                      <article key={faq.id} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </noscript>

        {/* Client-side interactive component */}
        <FAQClient faqData={faqData} categories={categories} />
      </div>
    </>
  )
}