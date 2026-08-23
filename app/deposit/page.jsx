import Link from 'next/link'
import DepositTab from '../components/deposit/depositTab'
import DepositForm from '../components/depositForm'
import MobileDeposit from '../components/mobileDeposit'
import CreditCardDeposit from '../components/creditCardDeposit'
import Bkash from './Assets/Svg/bkash'
import Nagad from './Assets/Svg/nagad'
import Rocket from './Assets/Svg/rocket'
import VisaMasterCard from './Assets/Svg/visa-mastercard'
import AmericanExpress from './Assets/Svg/americanExpress'
import CityBank from './Assets/Svg/cityBank'
import DutchBangla from './Assets/Svg/dutchBangla'
import { Poppins, Roboto } from "next/font/google";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});
// ─── SEO Metadata (Next.js App Router) ───────────────────────────────────────
// Place this in the same file or a sibling layout.js for shared metadata.

const BASE_URL = 'https://www.midwaybd.com'

export const metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Deposit | Midway Securities Limited — Bank, Mobile & Card',
    description:
        'Deposit funds into your Midway Securities BO account easily via bank transfer (The City Bank, Dutch Bangla Bank), mobile banking (bKash, Nagad, Rocket), or credit card (Visa, MasterCard, Amex). Fast, secure, paperless.',
    keywords: [
        'Midway Securities deposit',
        'BO account deposit Bangladesh',
        'bKash stock market deposit',
        'Nagad BO account',
        'DSE deposit online',
        'Midway Securities bank transfer',
        'share market deposit Bangladesh',
        'mobile banking securities deposit',
    ],
    alternates: {
        canonical: `${BASE_URL}/deposit`,
        languages: {
            'en-BD': `${BASE_URL}/deposit`,
            'bn-BD': `${BASE_URL}/deposit`,
        },
    },
    openGraph: {
        title: 'Deposit Funds — Midway Securities Limited',
        description:
            'Fund your trading account instantly via bank transfer, bKash, Nagad, Rocket, or credit card. Safe & paperless deposit for Midway Securities clients.',
        url: `${BASE_URL}/deposit`,
        siteName: 'Midway Securities Limited',
        locale: 'en_BD',
        type: 'website',
        images: [
            {
                url: `${BASE_URL}/images/og/deposit-og.png`,
                width: 1200,
                height: 630,
                alt: 'Deposit into your Midway Securities BO account',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Deposit Funds — Midway Securities Limited',
        description:
            'Fund your trading account instantly via bank transfer, bKash, Nagad, Rocket, or credit card.',
        images: [`${BASE_URL}/images/og/deposit-og.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-snippet': -1 },
    },
}

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            // Organization
            {
                '@type': 'FinancialService',
                '@id': `${BASE_URL}/#organization`,
                name: 'Midway Securities Limited',
                url: BASE_URL,
                logo: `${BASE_URL}/images/logo.png`,
                telephone: '+8809609100142',
                email: 'accounts@midwaybd.com',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Dhaka',
                    addressCountry: 'BD',
                },
                sameAs: ['https://www.facebook.com/midwaytrec142'],
            },
            // Web page
            {
                '@type': 'WebPage',
                '@id': `${BASE_URL}/deposit#webpage`,
                url: `${BASE_URL}/deposit`,
                name: 'Deposit | Midway Securities Limited',
                description:
                    'Deposit funds into your Midway Securities BO account via bank transfer, mobile banking, or credit card.',
                isPartOf: { '@id': `${BASE_URL}/#website` },
                inLanguage: ['en-BD', 'bn-BD'],
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Home',
                            item: BASE_URL,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Deposit',
                            item: `${BASE_URL}/deposit`,
                        },
                    ],
                },
            },
            // FAQ — answers common deposit questions directly in SERPs
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How do I deposit money into my Midway Securities BO account?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'You can deposit via bank transfer to The City Bank (A/C: 3101093011001) or Dutch Bangla Bank (A/C: 1011200006385), mobile banking through bKash (01845222333), Nagad (01776106410), or Rocket (017761064101), or by credit/debit card online. Always include your Midway Client Code in the reference field.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the bKash number for Midway Securities deposit?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The bKash merchant number for Midway Securities Limited is 01845222333. Use your Midway Client Code as the reference and set the counter number to 01.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What bank account details are needed to deposit into Midway Securities?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'For The City Bank: Account Name — Midway Securities Limited, A/C: 3101093011001, Branch: Principal Branch, Dhaka South, Routing: 225275357. For Dutch Bangla Bank: A/C: 1011200006385, Branch: Local Branch, Dhaka South, Routing: 090273889.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How long does a deposit take to reflect in my BO account?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Once payment verification is complete, the deposited amount will be credited to your BO account. Processing times may vary depending on the payment method.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What credit cards are accepted for deposit?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Visa and MasterCard are accepted with a 2.2% processing fee. American Express is accepted with a 3.5% processing fee.',
                        },
                    },
                ],
            },
            // HowTo — step-by-step deposit instructions
            {
                '@type': 'HowTo',
                name: 'How to deposit funds into your Midway Securities BO account',
                description:
                    'Step-by-step guide to depositing money into a Midway Securities trading account.',
                step: [
                    {
                        '@type': 'HowToStep',
                        position: 1,
                        name: 'Choose your payment method',
                        text: 'Select from bank transfer (The City Bank or Dutch Bangla Bank), mobile banking (bKash, Nagad, Rocket), or credit card.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 2,
                        name: 'Include your Midway Client Code',
                        text: 'When making the payment, enter your Midway Client Code in the Reference, Remarks, or Comments field.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 3,
                        name: 'Submit your confirmation',
                        text: 'Fill out the deposit confirmation form on this page with your transaction details so the team can verify your payment.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 4,
                        name: 'Funds credited to BO account',
                        text: 'Once verification is complete, the deposited amount will be added to your BO account.',
                    },
                ],
            },
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ─── Reusable sub-components ─────────────────────────────────────────────────

function NoticeBanner({ children }) {
    return (
        <div
            role="note"
            className="border-l-[3px] border-blue-700 bg-blue-50 rounded-r-lg px-4 py-3 my-5"
        >
            <p className="text-sm text-blue-900 leading-relaxed">{children}</p>
        </div>
    )
}

function VerificationNote() {
    return (
        <div
            role="note"
            className="flex gap-2 items-start bg-gray-50 rounded-lg px-4 py-3 my-5 text-sm text-gray-500 leading-relaxed"
        >
            <svg
                aria-hidden="true"
                className="w-4 h-4 mt-0.5 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
            </svg>
            <span>
                যাচাই সম্পন্ন হলে আপনার জমা করা টাকা বিও অ্যাকাউন্টে যোগ করা হবে।
                <br />
                <span className={`text-gray-400 text-xs`}>
                    Funds will be credited to your BO account once verification is complete.
                </span>
            </span>
        </div>
    )
}

function ContactChips() {
    return (
        <address className="not-italic mt-1">
            <p className="text-xs text-gray-400 mb-2">Need help?</p>
            <div className="flex flex-wrap gap-2">
                <a
                    href="tel:+8809609100142"
                    aria-label="Call Midway Securities support"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-300 hover:bg-gray-50 transition-colors no-underline"
                >
                    <PhoneIcon /> 09609 100 142
                </a>
                <Link
                    href="http://m.me/midwaytrec142"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with Midway Securities on Facebook Messenger"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-300 hover:bg-gray-50 transition-colors no-underline"
                >
                    <MessengerIcon /> Facebook Messenger
                </Link>
                <a
                    href="mailto:accounts@midwaybd.com"
                    aria-label="Email Midway Securities accounts team"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-300 hover:bg-gray-50 transition-colors no-underline"
                >
                    <MailIcon /> accounts@midwaybd.com
                </a>
            </div>
        </address>
    )
}

function FieldRow({ label, value, mono = false }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <dt className="text-xs text-gray-400">{label}</dt>
            <dd
                className={`text-xs font-medium text-gray-800 ${mono ? 'font-mono bg-gray-100 px-2 py-0.5 rounded' : ''
                    }`}
            >
                {value}
            </dd>
        </div>
    )
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function PhoneIcon() {
    return (
        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
    )
}

function MailIcon() {
    return (
        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    )
}

function MessengerIcon() {
    return (
        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.914 1.359 5.52 3.498 7.28V22l3.184-1.75c.85.236 1.75.364 2.68.364 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.006 12.44l-2.548-2.718-4.97 2.718 5.467-5.802 2.61 2.718 4.908-2.718-5.467 5.802z" />
        </svg>
    )
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

function Breadcrumb() {
    return (
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pt-5 pb-1">
            <ol
                className="flex items-center gap-1.5 text-xs text-gray-400"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                    <Link
                        href="/"
                        itemProp="item"
                        className="hover:text-gray-600 transition-colors no-underline"
                    >
                        <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </li>
                <li aria-hidden="true" className="text-gray-300">/</li>
                <li
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/ListItem"
                    aria-current="page"
                >
                    <span itemProp="name" className="text-gray-600">
                        Deposit
                    </span>
                    <meta itemProp="position" content="2" />
                </li>
            </ol>
        </nav>
    )
}

// ─── FAQ accordion (visible on page — helps SEO and users) ───────────────────

function FaqSection() {
    const faqs = [
        {
            q: 'How do I deposit into my Midway Securities BO account?',
            a: 'Choose any of the three methods: bank transfer to The City Bank or Dutch Bangla Bank, mobile banking via bKash / Nagad / Rocket, or online credit/debit card payment. Always include your Midway Client Code in the reference field.',
        },
        {
            q: 'What is the bKash number for Midway Securities?',
            a: 'Send to bKash number 01845222333. Use your Midway Client Code as the reference and counter no. 01.',
        },
        {
            q: 'How long does a deposit take to reflect?',
            a: 'Once payment verification is complete, the amount is credited to your BO account. Processing times vary by method but are typically completed within the same business day.',
        },
        {
            q: 'What are the credit card processing fees?',
            a: 'Visa and MasterCard: 2.2% fee. American Express: 3.5% fee. These fees are charged by the payment gateway.',
        },
    ]

    return (
        <section
            aria-labelledby="faq-heading"
            className="bg-white py-14 px-4 border-t border-gray-100"
        >
            <div className="max-w-3xl mx-auto">
                <h2
                    id="faq-heading"
                    className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center"
                >
                    Frequently asked questions
                </h2>
                <p className="text-sm text-gray-500 text-center mb-8">
                    সাধারণ প্রশ্ন ও উত্তর
                </p>
                <dl className="divide-y divide-gray-100">
                    {faqs.map(({ q, a }) => (
                        <div key={q} className="py-5">
                            <dt className="text-sm font-semibold text-gray-800 mb-1">{q}</dt>
                            <dd className="text-sm text-gray-500 leading-relaxed">{a}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}

// ─── Tab content ─────────────────────────────────────────────────────────────

function BankTransferContent() {
    const banks = [
        {
            initials: <CityBank width={30} height={30} />,
            colorClass: 'bg-blue-50 text-blue-800',
            name: 'The The City Bank',
            fields: [
                { label: 'Account name', value: 'Midway Securities Limited', mono: false },
                { label: 'Account no.', value: '3101093011001', mono: true },
                { label: 'Branch', value: 'Principal Branch, Dhaka South', mono: false },
                { label: 'Routing no.', value: '225275357', mono: true },
            ],
        },
        {
            initials: <DutchBangla width={30} height={30} />,
            colorClass: 'bg-green-50 text-green-800',
            name: 'Dutch Bangla Bank',
            fields: [
                { label: 'Account name', value: 'Midway Securities Limited', mono: false },
                { label: 'Account no.', value: '1011200006385', mono: true },
                { label: 'Branch', value: 'Local Branch, Dhaka South', mono: false },
                { label: 'Routing no.', value: '090273889', mono: true },
            ],
        },
    ]

    return (
        <section aria-labelledby="bank-heading" className="space-y-6">
            <header>
                <h2 id="bank-heading" className="text-xl font-semibold text-gray-900">
                    Bank transfer{' '}
                    <span className="text-base font-normal text-gray-400">— ব্যাংক ট্রান্সফার</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Deposit directly into our bank accounts. নিচের যেকোনো ব্যাংক অ্যাকাউন্টে টাকা জমা দিন।
                </p>
            </header>

            <NoticeBanner>
                <strong>Important:</strong> Please include your{' '}
                <strong>Midway Client Code</strong> in the{' '}
                <strong>Reference / Remarks / Comments</strong> section of your bank transfer.
                <br />
                টাকা জমা দেওয়ার সময় অবশ্যই আপনার <strong>Midway Client Code</strong> উল্লেখ করুন।
            </NoticeBanner>

            <div className="grid sm:grid-cols-2 gap-3">
                {banks.map((bank) => (
                    <article
                        key={bank.name}
                        aria-label={`${bank.name} bank account details`}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                    >
                        <div
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold mb-3 ${bank.colorClass}`}
                            aria-hidden="true"
                        >
                            {bank.initials}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">{bank.name}</h3>
                        <dl>
                            {bank.fields.map((f) => (
                                <FieldRow key={f.label} {...f} />
                            ))}
                        </dl>
                    </article>
                ))}
            </div>

            <VerificationNote />
            <ContactChips />
            <hr className="border-gray-100" />

            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Submit deposit confirmation
                </h3>
                <DepositForm />
            </div>
        </section>
    )
}

function MobileBankingContent() {
    const services = [
        { initials: <Bkash width={30} height={30} />, colorClass: 'text-pink-800', name: 'bKash', number: '01845302333', href: 'tel:01845302333' },
        { initials: <Nagad width={30} height={30} />, colorClass: 'text-amber-800', name: 'Nagad', number: '01776106410', href: 'tel:01776106410' },
        { initials: <Rocket width={30} height={30} />, colorClass: 'text-purple-800', name: 'Rocket', number: '017761064101', href: 'tel:017761064101' },
    ]

    return (
        <section aria-labelledby="mobile-heading" className="space-y-6">
            <header>
                <h2 id="mobile-heading" className="text-xl font-semibold text-gray-900">
                    Mobile banking{' '}
                    <span className="text-base font-normal text-gray-400">— মোবাইল ব্যাংকিং</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Deposit via bKash, Nagad, or Rocket. bKash, Nagad বা Rocket-এ পেমেন্ট পাঠান।
                </p>
            </header>

            <NoticeBanner>
                <strong>Important:</strong> Include your <strong>Midway Client Code</strong> as the
                reference and set counter no. to <strong>01</strong>.
                <br />
                টাকা পাঠানোর সময় অবশ্যই আপনার <strong>Midway Client Code</strong> রেফারেন্স হিসেবে উল্লেখ করুন।
            </NoticeBanner>

            <div className="grid grid-cols-3 gap-3">
                {services.map((s) => (
                    <article
                        key={s.name}
                        aria-label={`${s.name} deposit number`}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                    >
                        <div
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold mb-3 ${s.colorClass}`}
                            aria-hidden="true"
                        >
                            {s.initials}
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{s.name}</p>
                        <a
                            href={s.href}
                            className="text-sm font-bold bg-gray-100 text-gray-500 hover:text-gray-700 no-underline"
                            aria-label={`${s.name} number: ${s.number}`}
                        >
                            {s.number}
                        </a>
                    </article>
                ))}
            </div>

            <dl className="bg-white border border-gray-200 rounded-xl p-4">
                <FieldRow label="Reference" value="Your Midway Client Code" mono={false} />
                <FieldRow label="Counter no." value="01" mono={true} />
            </dl>

            <VerificationNote />
            <ContactChips />
            <hr className="border-gray-100" />

            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Submit deposit confirmation
                </h3>
                <MobileDeposit />
            </div>
        </section>
    )
}

function CreditCardContent() {
    const fees = [
        { initials: <VisaMasterCard />, colorClass: 'bg-blue-50 text-blue-800', label: 'Visa / MasterCard', fee: '2.2%' },
        { initials: <AmericanExpress />, colorClass: 'bg-green-50 text-green-800', label: 'American Express', fee: '3.5%' },
    ]

    return (
        <section aria-labelledby="card-heading" className="space-y-6">
            <header>
                <h2 id="card-heading" className="text-xl font-semibold text-gray-900">
                    Credit card{' '}
                    <span className="text-base font-normal text-gray-400">— ক্রেডিট কার্ড</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Deposit online using Visa, MasterCard, or American Express.
                    Visa, MasterCard বা American Express দিয়ে জমা দিন।
                </p>
            </header>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-400 mb-3">Processing fees</p>
                <dl>
                    {fees.map((f, i) => (
                        <div
                            key={f.label}
                            className={`flex justify-between items-center py-3 ${i < fees.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold ${f.colorClass}`}
                                    aria-hidden="true"
                                >
                                    {f.initials}
                                </div>
                                <dt className="text-sm text-gray-800">{f.label}</dt>
                            </div>
                            <dd className="text-lg font-semibold text-gray-900">{f.fee}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <VerificationNote />
            <ContactChips />
            <hr className="border-gray-100" />

            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Proceed to payment</h3>
                <CreditCardDeposit />
            </div>
        </section>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

const Deposit = async ({ searchParams }) => {
    const tabs = [
        {
            id: 'online',
            label: 'Bank transfer',
            content: <BankTransferContent />,
        },
        {
            id: 'mobile',
            label: 'Mobile banking',
            content: <MobileBankingContent />,
        },
        {
            id: 'credit',
            label: 'Credit card',
            content: <CreditCardContent />,
        },
    ]

    const params = await searchParams
    const activeId = params.tab?.toLowerCase() || 'online'
    const activeTab = tabs.find((t) => t.id === activeId) || tabs[0]

    // Dynamic title suffix per tab for better per-URL SEO
    const tabTitles = {
        online: 'Bank Transfer Deposit',
        mobile: 'Mobile Banking Deposit — bKash, Nagad, Rocket',
        credit: 'Credit Card Deposit',
    }

    return (
        <>
            {/* JSON-LD structured data in <head> */}
            <JsonLd />

            <div className={`min-h-screen bg-gray-50 ${poppins.className}`}>

                {/* ── Hero ── */}
                <header className="bg-[#0C447C] px-6 py-14 sm:py-20 text-center">
                    {/* Hidden H1 variant for screen readers / crawlers with keyword context */}
                    <h1 className="font-robboto text-3xl sm:text-4xl font-bold text-[#E6F1FB] leading-tight mb-3">
                        Deposit into your BO account{' '}
                        {/* use sonarbangla font */}
                        <span className={`font_sonar_bangla block sm:inline font-normal text-[#85B7EB] text-2xl sm:text-3xl`}>
                            — সহজ ডিপোজিট
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#85B7EB] mb-8 max-w-lg mx-auto leading-relaxed">
                        Fund your Midway Securities trading account easily — bank transfer, mobile banking, or credit card.
                        অফিসে না এসে সহজেই আপনার বিও অ্যাকাউন্টে টাকা জমা দিন।
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap" aria-label="Available deposit methods">
                        {[
                            { label: 'Bank transfer' },
                            { label: 'bKash / Nagad / Rocket' },
                            { label: 'Visa / MasterCard / Amex' },
                        ].map(({ label }) => (
                            <div
                                key={label}
                                className="text-xs text-[#B5D4F4] border border-[#185FA5] rounded-full px-4 py-2 bg-white/5"
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </header>

                {/* ── Breadcrumb ── */}
                <Breadcrumb />

                {/* ── Main content ── */}
                <main id="main-content" className="max-w-4xl mx-auto px-4 py-6">
                    {/* Tab navigation */}
                    <nav aria-label="Deposit method tabs" className="mb-6">
                        <DepositTab activeCity={activeTab.id} />
                    </nav>

                    {/* Tab content */}
                    <div
                        role="region"
                        aria-label={tabTitles[activeTab.id] || 'Deposit information'}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8"
                    >
                        {activeTab.content}
                    </div>
                </main>

                {/* ── Tutorial video ── */}
                <section
                    aria-labelledby="video-heading"
                    className="bg-gray-900 py-14 px-4 mt-4"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2
                            id="video-heading"
                            className="text-xl sm:text-2xl font-semibold text-white mb-2"
                        >
                            How to deposit — step-by-step tutorial
                        </h2>
                        <p className="text-gray-400 text-sm mb-8">
                            Watch our guide to making your first deposit into Midway Securities.
                        </p>
                        <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/KkBCBNHRL2A?si=v4UhTaSbcuCBIagM"
                                title="How to deposit funds into Midway Securities BO account — step by step tutorial"
                                frameBorder="0"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>

                {/* ── FAQ (visible + structured data) ── */}
                <FaqSection />

                {/* ── Support / contact ── */}
                <section
                    aria-labelledby="support-heading"
                    className="bg-blue-50 py-14 px-4"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2
                            id="support-heading"
                            className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
                        >
                            Need help? We're here.
                        </h2>
                        <p className="text-sm text-gray-500 mb-8">
                            আপনার যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন।
                        </p>

                        <address className="not-italic grid sm:grid-cols-3 gap-4">
                            {[
                                {
                                    href: 'tel:+8809609100142',
                                    label: 'Call Midway Securities support line',
                                    icon: (
                                        <svg aria-hidden="true" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    ),
                                    title: 'Call us',
                                    value: '09609 100 142',
                                    external: false,
                                },
                                {
                                    href: 'mailto:accounts@midwaybd.com',
                                    label: 'Email Midway Securities accounts team',
                                    icon: (
                                        <svg aria-hidden="true" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    ),
                                    title: 'Email us',
                                    value: 'accounts@midwaybd.com',
                                    external: false,
                                },
                                {
                                    href: 'http://m.me/midwaytrec142',
                                    label: 'Chat with Midway Securities on Facebook Messenger',
                                    icon: (
                                        <svg aria-hidden="true" className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.914 1.359 5.52 3.498 7.28V22l3.184-1.75c.85.236 1.75.364 2.68.364 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.006 12.44l-2.548-2.718-4.97 2.718 5.467-5.802 2.61 2.718 4.908-2.718-5.467 5.802z" />
                                        </svg>
                                    ),
                                    title: 'Live chat',
                                    value: 'Facebook Messenger',
                                    external: true,
                                },
                            ].map(({ href, label, icon, title, value, external }) => (
                                <a
                                    key={title}
                                    href={href}
                                    aria-label={label}
                                    target={external ? '_blank' : undefined}
                                    rel={external ? 'noopener noreferrer' : undefined}
                                    className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-3 hover:border-blue-200 hover:shadow-sm transition-all no-underline"
                                >
                                    <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center">
                                        {icon}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-800">{title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 break-all">{value}</p>
                                    </div>
                                </a>
                            ))}
                        </address>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Deposit