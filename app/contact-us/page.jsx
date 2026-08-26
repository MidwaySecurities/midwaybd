import Link from 'next/link'
import Script from 'next/script'
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Building2,
  Users,
  Headphones
} from 'lucide-react'

import ContactForm from './Contactform'
import Image from 'next/image'

// ── SEO metadata ────────────────────────────────────────────────
// Replaces `next/head` (which is a no-op in the App Router). This can only
// be exported from a Server Component, which is why the interactive form
// was split out into its own 'use client' file.
export const metadata = {
  title: 'Contact Us | Midway Securities - Stock Broker in Bangladesh',
  description: 'Get in touch with Midway Securities. Call our trading hotline, email support, or visit one of our branches across Bangladesh. Office hours: Sunday to Thursday, 9:30 AM - 5:30 PM.',
  keywords: ['contact Midway Securities', 'stock broker Bangladesh support', 'trading hotline', 'Midway Securities branches', 'DSE member contact'],
  authors: [{ name: 'Midway Securities Limited' }],
  alternates: {
    canonical: 'https://midwaybd.com/contact-us',
  },
  openGraph: {
    title: 'Contact Us | Midway Securities',
    description: 'Get in touch with Midway Securities. Trading hotline, email support, and branch locations across Bangladesh.',
    url: 'https://midwaybd.com/contact-us',
    type: 'website',
    images: [{ url: 'https://midwaybd.com/images/contact-og.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Midway Securities',
    description: 'Trading hotline, email support, and branch locations across Bangladesh.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const contactInfo = [
  {
    icon: Clock,
    title: 'Office Hours',
    details: 'Sunday to Thursday\n9:30 AM to 5:30 PM',
    color: 'text-blue-600'
  },
  {
    icon: Phone,
    title: 'Trading Hotline',
    details: '09609 100 142\n+88 01874444815\n+88 0241040007',
    color: 'text-green-600'
  },
  {
    icon: Mail,
    title: 'Email Support',
    details: 'info@midwaybd.com',
    color: 'text-purple-600',
    link: 'mailto:info@midwaybd.com'
  },
  {
    icon: Headphones,
    title: 'Whatsapp',
    details: '+8801874444816',
    color: 'text-orange-600'
  }
]

const branches = [
  { name: 'Head Office', location: 'Motijheel', type: 'main', link: 'https://maps.app.goo.gl/CejsjTizDFiYTRne8' },
  { name: 'Swantex Branch', location: 'Motijheel', type: 'branch', link: 'https://maps.app.goo.gl/3EfzNxo9LjRqS72Q8' },
  { name: 'DSE Tower', location: 'Nikunja 2', type: 'branch', link: 'https://maps.app.goo.gl/JouBCqzRK38NezC66' },
  { name: 'Jabbar Tower', location: 'Gulshan', type: 'branch', link: 'https://maps.app.goo.gl/ybF7DHFnz6pNeQcF7' },
  { name: 'Chowk Bazar Office', location: 'Chowk Bazar', type: 'branch', link: 'https://maps.app.goo.gl/V9HxeuESvzKhujVa9' },
  { name: 'HM Plaza', location: 'Uttara', type: 'branch', link: 'https://maps.app.goo.gl/QeCuCQAQFhZTQ42J8' },
  { name: 'Comilla Office', location: 'Comilla', type: 'branch', link: 'https://maps.app.goo.gl/FLvBNGfNyQem2H6JA' }
]

export default function ContactUs() {
  // ── Structured data ─────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://midwaybd.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://midwaybd.com/contact-us" }
    ]
  }

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://midwaybd.com/contact-us",
    "name": "Contact Midway Securities",
    "mainEntity": {
      "@type": "Organization",
      "name": "Midway Securities Limited",
      "url": "https://midwaybd.com",
      "email": "info@midwaybd.com",
      "sameAs": ["https://www.facebook.com/midwaytrec142"],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+880-9609-100-142",
          "areaServed": "BD",
          "availableLanguage": ["en", "bn"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "09:30",
            "closes": "17:30"
          }
        },
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "+88-01874444815",
          "areaServed": "BD",
          "availableLanguage": ["en", "bn"]
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="contact-breadcrumb-schema" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="contact-page-schema" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />

      {/* Breadcrumb (visually hidden trigger for nav, kept out of hero to preserve design) */}
      <nav className="sr-only" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">Contact Uss</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="relative h-105 overflow-hidden">
        <div className="absolute inset-0"></div>
        <div
          className="flex items-center absolute bg-[url(/images/contact-us/contact-us--Mobile.png)] lg:bg-[url(/images/contact-us/contact-us.jpg)] inset-0 bg-cover bg-bottom bg-no-repeat"
          role="img"
          aria-label="Midway Securities office"
        >
          <div className='h-full w-full flex items-end justify-start'>
            <Image src="/images/contact-us/contact-us-forground.png" width={600} height={200} className='w-3/4 sm:w-auto mb-26 sm:mb-25 ml-8 md:ml-18 lg:ml-50 xl:ml-62.5' />
          </div>
        </div>

        {/* <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl font-light">We&apos;re here to help you succeed</p>
          </div>
        </div> */}

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${info.color}`}>
                  <info.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 ml-3">{info.title}</h2>
              </div>
              {info.link ? (
                <a href={info.link} className="text-blue-600 hover:text-blue-800 font-medium">
                  {info.details}
                </a>
              ) : (
                <p className="text-gray-600 whitespace-pre-line font-medium">
                  {info.details}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form (Client Component — the only part that needs interactivity) */}
          <ContactForm />

          {/* Branch Locations & Additional Info */}
          <div className="space-y-8">
            {/* Branch Locations */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Building2 className="w-6 h-6 text-blue-600 mr-3" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-gray-900">Our Locations</h2>
              </div>

              <div className="space-y-4">
                {branches.map((branch, index) => (
                  <a
                    key={index}
                    href={branch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${branch.type === 'main' ? 'bg-blue-600' : 'bg-gray-400'
                        }`}></div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {branch.name}
                        </h3>
                        <p className="text-sm text-gray-600">{branch.location}</p>
                      </div>
                    </div>
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-600" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media & Additional Support */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-blue-600 mr-3" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-gray-900">Connect With Us</h2>
              </div>

              <div className="space-y-4">
                <a
                  href="https://www.facebook.com/midwaytrec142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                    <Facebook className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Facebook</h3>
                    <p className="text-sm text-gray-600">Follow us for updates</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mobile App Support</h3>
                    <p className="text-sm text-gray-600">09609 100 142, +88 01874444816</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Accounts Department</h3>
                    <p className="text-sm text-gray-600">09609 100 142</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}