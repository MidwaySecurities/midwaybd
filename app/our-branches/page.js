'use client'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

const OurBranches = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    // Branch data with SEO optimization
    const branches = [
        {
            id: 1,
            name: "HEAD OFFICE @ MOTIJHEEL",
            type: "head",
            building: "Dhaka Stock Exchange Building",
            room: "Room No: 508",
            address: "9/F, Motijheel C/A, Dhaka 1000",
            tel: ["9559925", "9576291", "9551960"],
            mobile: ["01874444816"],
            coordinates: { lat: 23.7332, lng: 90.4203 },
            services: ["Account Opening", "Trading Support", "Investment Advisory", "Corporate Services"]
        },
        {
            id: 2,
            name: "SWANTEX @ MOTIJHEEL",
            type: "branch",
            building: "SwanTex Building",
            room: "3rd Floor",
            address: "9/I, Motijheel C/A, Dhaka 1000",
            tel: ["47115806", "47115761", "47115318"],
            mobile: ["01845222333", "01874444815"],
            coordinates: { lat: 23.7331, lng: 90.4199 },
            services: ["Account Opening", "Trading Support", "Customer Service"]
        },
        {
            id: 3,
            name: "Uttara Branch",
            type: "branch",
            building: "HM Plaza",
            room: "Plot 34, Room 7 (6th Floor)",
            address: "Sector 3, Uttara, Dhaka 1230",
            tel: [],
            mobile: ["01971227340", "01715325978"],
            coordinates: { lat: 23.8759, lng: 90.3795 },
            services: ["Account Opening", "Trading Support", "Investment Advisory"]
        },
        {
            id: 4,
            name: "Chowk Bazar Branch",
            type: "branch",
            building: "Shahjahan Imam Tower",
            room: "29-31 Water Works Road",
            address: "Chawkbazar, Dhaka-1211",
            tel: ["7342560", "7342561"],
            mobile: ["01857777529", "01823416181"],
            coordinates: { lat: 23.7104, lng: 90.4074 },
            services: ["Account Opening", "Trading Support", "Customer Service"]
        },
        {
            id: 5,
            name: "COMILLA BRANCH",
            type: "branch",
            building: "Makka Tower",
            room: "3rd Floor",
            address: "AK Fazlul Haq Rd, Rajgong, Comilla 3500",
            tel: ["+8802334400508", "+8802334400509"],
            mobile: ["01711148727"],
            coordinates: { lat: 23.4607, lng: 91.1809 },
            services: ["Account Opening", "Trading Support", "Investment Advisory"]
        },
        {
            id: 6,
            name: "NiKunjA 2 Branch",
            type: "branch",
            building: "DSE TOWER",
            room: "Room 219",
            address: "Plot 46, Road 21, Nikunja 2, Level 11",
            tel: ["41040008", "41040009"],
            mobile: [],
            coordinates: { lat: 23.8103, lng: 90.4125 },
            services: ["Account Opening", "Trading Support"]
        }
    ]

    const digitalBooths = [
        {
            id: 7,
            name: "Kalapara Digital Booth",
            type: "digital",
            building: "Digital Service Center",
            room: "Ground Floor",
            address: "Main Road, Kalapara, Patuakhali",
            tel: ["41040008"],
            mobile: ["01711148727"],
            coordinates: { lat: 21.8313, lng: 90.2265 },
            services: ["Digital Account Opening", "Online Support", "Document Verification"]
        }
    ]

    const allLocations = [...branches, ...digitalBooths]
    const filteredLocations = activeFilter === 'all' ? allLocations : 
                             activeFilter === 'digital' ? digitalBooths :
                             activeFilter === 'head' ? branches.filter(b => b.type === 'head') :
                             branches.filter(b => b.type === 'branch')

    const handleCall = (number) => {
        window.open(`tel:${number}`, '_self')
    }

    const handleDirections = (coords) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`, '_blank')
    }

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Midway Securities Limited",
        "url": "https://midwaybd.com",
        "logo": "https://midwaybd.com/images/logo.png",
        "description": "Leading stock brokerage firm in Bangladesh with multiple branch locations across the country",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+880-9609-100-142",
            "contactType": "customer service",
            "areaServed": "BD",
            "availableLanguage": ["en", "bn"]
        },
        "location": allLocations.map(location => ({
            "@type": "LocalBusiness",
            "name": `Midway Securities ${location.name}`,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": `${location.building}, ${location.room}, ${location.address}`,
                "addressCountry": "BD"
            },
            "telephone": location.tel.concat(location.mobile),
            "openingHours": "Mo-Th 09:00-17:00",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": location.coordinates.lat,
                "longitude": location.coordinates.lng
            }
        }))
    }

    return (
        <>
            <Head>
                <title>Midway Securities Branch Locations | Stock Broker Offices in Bangladesh</title>
                <meta name="description" content="Find Midway Securities branch locations across Bangladesh. Visit our head office in Motijheel, Dhaka or branches in Uttara, Comilla, Chowk Bazar. Get contact details and directions." />
                <meta name="keywords" content="Midway Securities branches, stock broker offices Bangladesh, DSE member locations, trading office addresses, Motijheel head office, Uttara branch, Comilla branch" />
                
                {/* Open Graph */}
                <meta property="og:title" content="Midway Securities Branch Locations | Stock Broker Offices in Bangladesh" />
                <meta property="og:description" content="Find Midway Securities branch locations across Bangladesh. Get contact details and directions to our offices." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://midwaybd.com/our-branches" />
                <meta property="og:image" content="https://midwaybd.com/images/branches-og.jpg" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Midway Securities Branch Locations" />
                <meta name="twitter:description" content="Find our branch locations across Bangladesh with contact details and directions." />
                
                {/* SEO */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Midway Securities Limited" />
                <link rel="canonical" href="https://midwaybd.com/our-branches" />
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <header className="relative">
                    <div 
                        className="bg-[url('https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/358471256.jpg')] min-h-[400px] bg-cover bg-center relative"
                        role="img"
                        aria-label="Midway Securities office building"
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="relative flex items-center justify-center h-[400px] text-white">
                            <div className="text-center px-4">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                                    Our <span className="text-yellow-400">Branches</span>
                                </h1>
                                <p className="text-xl lg:text-2xl mb-6 max-w-3xl">
                                    Visit us at convenient locations across Bangladesh for professional trading services
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <div className="bg-white bg-opacity-20 text-black backdrop-blur-sm rounded-full px-6 py-3">
                                        <span className="font-semibold">{branches.length} Branches Nationwide</span>
                                    </div>
                                    <div className="bg-white bg-opacity-20 text-black backdrop-blur-sm rounded-full px-6 py-3">
                                        <span className="font-semibold">{digitalBooths.length} Digital Service Centers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Breadcrumb */}
                <nav className="bg-white border-b py-3" aria-label="Breadcrumb">
                    <div className="max-w-6xl mx-auto px-4">
                        <ol className="flex items-center space-x-2 text-sm">
                            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500">/</li>
                            <li className="text-gray-700 font-medium">Our Branches</li>
                        </ol>
                    </div>
                </nav>

                {/* Filter Tabs */}
                <div className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { id: 'all', label: 'All Locations', count: allLocations.length },
                                { id: 'head', label: 'Head Office', count: 1 },
                                { id: 'branch', label: 'Branches', count: branches.length - 1 },
                                { id: 'digital', label: 'Digital Booths', count: digitalBooths.length }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                                        activeFilter === tab.id
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Branches List */}
                        <section className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {activeFilter === 'all' ? 'All Locations' : 
                                 activeFilter === 'head' ? 'Head Office' :
                                 activeFilter === 'digital' ? 'Digital Service Centers' : 'Branch Locations'}
                            </h2>
                            
                            <div className="space-y-6">
                                {filteredLocations.map((location) => (
                                    <article 
                                        key={location.id}
                                        className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${
                                            location.type === 'head' ? 'border-l-4 border-yellow-500' : ''
                                        }`}
                                        itemScope
                                        itemType="https://schema.org/LocalBusiness"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900" itemProp="name">
                                                        {location.name}
                                                    </h3>
                                                    {location.type === 'head' && (
                                                        <span className="ml-3 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                                                            HEAD OFFICE
                                                        </span>
                                                    )}
                                                    {location.type === 'digital' && (
                                                        <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                                            DIGITAL BOOTH
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="space-y-1 text-gray-700" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                                    <p><strong itemProp="name">{location.building}</strong> {location.room && `(${location.room})`}</p>
                                                    <p itemProp="streetAddress">{location.address}</p>
                                                </div>
                                            </div>
                                            
                                            <button
                                                onClick={() => handleDirections(location.coordinates)}
                                                className="mt-4 lg:mt-0 bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition-colors"
                                                title={`Get directions to ${location.name}`}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Contact Information */}
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    Contact Information
                                                </h4>
                                                <div className="space-y-2">
                                                    {location.tel.map((tel, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleCall(tel)}
                                                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                                            itemProp="telephone"
                                                        >
                                                            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            Tel: {tel}
                                                        </button>
                                                    ))}
                                                    {location.mobile.map((mobile, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleCall(mobile)}
                                                            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                                                            itemProp="telephone"
                                                        >
                                                            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                            </svg>
                                                            Cell: {mobile}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Services */}
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-3">Available Services</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {location.services.map((service, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            {/* Contact Support */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                                <div className="space-y-3">
                                    <Link href="tel:09609100142" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Call Support</h4>
                                            <p className="text-sm text-gray-600">09609 100 142</p>
                                        </div>
                                    </Link>
                                    
                                    <Link href="/contact-us" className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Contact Form</h4>
                                            <p className="text-sm text-gray-600">Send us a message</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Sunday - Thursday</span>
                                        <span className="font-medium text-green-600">9:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Friday</span>
                                        <span className="text-red-600">Closed</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="text-red-600">Closed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Services</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Account Opening
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Trading Support
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Investment Advisory
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Customer Service
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Where is the head office located?</h3>
                                <p className="text-gray-600 text-sm mb-4">Our head office is at Dhaka Stock Exchange Building, Room 508, 9/F Motijheel C/A, Dhaka 1000.</p>
                                
                                <h3 className="font-semibold text-gray-800 mb-2">What services are available at branches?</h3>
                                <p className="text-gray-600 text-sm">All branches offer account opening, trading support, and customer service. Select locations provide investment advisory.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">How many branches do you have?</h3>
                                <p className="text-gray-600 text-sm mb-4">We have {branches.length} branches across Bangladesh plus digital service centers.</p>
                                
                                <h3 className="font-semibold text-gray-800 mb-2">What are the operating hours?</h3>
                                <p className="text-gray-600 text-sm">Most branches operate Sunday-Thursday 9:00 AM - 5:00 PM. Closed on weekends.</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default OurBranches