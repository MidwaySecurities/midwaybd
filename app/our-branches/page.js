import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import BranchesFilter from './BranchesFilter'
import { branches, faqs } from './branches-data'

// ── SEO metadata ────────────────────────────────────────────────
// This replaces `next/head`, which does nothing useful inside the App Router.
// `metadata` can only be exported from a Server Component, which is why this
// file has no 'use client' at the top — that's the whole fix.
export const metadata = {
    title: 'Midway Securities Branch Locations | Stock Broker Offices in Bangladesh',
    description: 'Find Midway Securities branch locations across Bangladesh. Visit our head office in Motijheel, Dhaka or branches in Uttara, Comilla, Chowk Bazar. Get contact details and directions.',
    keywords: ['Midway Securities branches', 'stock broker offices Bangladesh', 'DSE member locations', 'trading office addresses', 'Motijheel head office', 'Uttara branch', 'Comilla branch'],
    authors: [{ name: 'Midway Securities Limited' }],
    alternates: {
        canonical: 'https://midwaybd.com/our-branches',
    },
    openGraph: {
        title: 'Midway Securities Branch Locations | Stock Broker Offices in Bangladesh',
        description: 'Find Midway Securities branch locations across Bangladesh. Get contact details and directions to our offices.',
        url: 'https://midwaybd.com/our-branches',
        type: 'website',
        images: [{ url: 'https://midwaybd.com/images/branches-og.jpg' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Midway Securities Branch Locations',
        description: 'Find our branch locations across Bangladesh with contact details and directions.',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function OurBranchesPage() {
    const headOffice = branches.find(b => b.type === 'head')
    const branchCount = branches.filter(b => b.type === 'branch').length

    // ── Structured data ─────────────────────────────────────────
    // Split into focused schemas rather than one blob — this is what
    // Google's rich results AND AI answer engines (AI Overviews, ChatGPT
    // browsing, Perplexity, etc.) parse for direct answers.
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://midwaybd.com/" },
            { "@type": "ListItem", "position": 2, "name": "Our Branches", "item": "https://midwaybd.com/our-branches" }
        ]
    }

    const branchListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": branches.sort((a,b)=>a.id-b.id).map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "FinancialService",
                "name": `Midway Securities - ${b.name}`,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": `${b.building}, ${b.room ? b.room + ', ' : ''}${b.address}`,
                    "addressLocality": b.locality,
                    "postalCode": b.postalCode,
                    "addressCountry": "BD"
                },
                ...(b.coordinates ? {
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": b.coordinates.lat,
                        "longitude": b.coordinates.lng
                    }
                } : {}),
                "telephone": [...b.tel, ...b.mobile][0] || undefined,
                "openingHours": "Mo,Tu,We,Th 09:00-17:00",
                "parentOrganization": {
                    "@type": "Organization",
                    "name": "Midway Securities Limited",
                    "url": "https://midwaybd.com"
                }
            }
        }))
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    }

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="branch-list-schema" type="application/ld+json" strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(branchListSchema) }} />
            <Script id="faq-schema" type="application/ld+json" strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <header className="relative">
                    <div className="relative min-h-[400px]">
                        <Image
                            src="https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/358471256.jpg"
                            alt="Midway Securities office building exterior"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-[#004990] bg-opacity-50"></div>
                        <div className="relative flex items-center justify-center h-[400px] text-white">
                            <div className="text-center px-4">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                                    Our <span className="text-[#1da1f2]">Branches</span>
                                </h1>
                                <p className="text-xl lg:text-2xl mb-6 max-w-3xl">
                                    Visit us at convenient locations across Bangladesh for professional trading services
                                </p>
                                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <div className="bg-white bg-opacity-20 text-black backdrop-blur-sm rounded-full px-6 py-3">
                                        <span className="font-semibold">{branches.length} Branches Nationwide</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Breadcrumb */}
                {/* <nav className="bg-white border-b py-3" aria-label="Breadcrumb">
                    <div className="max-w-6xl mx-auto px-4">
                        <ol className="flex items-center space-x-2 text-sm">
                            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500">/</li>
                            <li className="text-gray-700 font-medium" aria-current="page">Our Branches</li>
                        </ol>
                    </div>
                </nav> */}

                {/* Interactive filter + branch list (Client Component) */}
                <BranchesFilter branches={branches} />

                {/* FAQ Section — static, server-rendered, mirrors the FAQPage JSON-LD above */}
                <section className="max-w-6xl mx-auto px-4 pb-12">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq, i) => (
                                <div key={i}>
                                    <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}