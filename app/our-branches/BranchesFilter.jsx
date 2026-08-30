'use client'
import { useState } from 'react'

const BranchesFilter = ({ branches }) => {
    const [activeFilter, setActiveFilter] = useState('all')

    const filteredLocations =
        activeFilter === 'all' ? branches :
            activeFilter === 'digital' ? branches.filter(b => b.type === 'digital') :
                activeFilter === 'head' ? branches.filter(b => b.type === 'head') :
                    branches.filter(b => b.type === 'branch')

    const digitalCount = branches.filter(b => b.type === 'digital').length
    const branchCount = branches.filter(b => b.type === 'branch').length

    return (
        <>
            {/* Filter Tabs */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                    <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Filter branch locations">
                        {[
                            { id: 'all', label: 'All Locations', count: branches.length },
                            { id: 'head', label: 'Head Office', count: 1 },
                            { id: 'branch', label: 'Branches', count: branchCount },
                            ...(digitalCount > 0 ? [{ id: 'digital', label: 'Digital Booths', count: digitalCount }] : [])
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                role="tab"
                                aria-selected={activeFilter === tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-xs sm:text-base transition-all duration-200 whitespace-nowrap ${activeFilter === tab.id
                                    ? 'bg-[#1da1f2] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Branches List */}
                    <section className="lg:col-span-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                            {activeFilter === 'all' ? 'All Locations' :
                                activeFilter === 'head' ? 'Head Office' :
                                    activeFilter === 'digital' ? 'Digital Service Centers' : 'Branch Locations'}
                        </h2>

                        <div className="space-y-4 sm:space-y-6">
                            {filteredLocations.map((location) => (
                                <article
                                    key={location.id}
                                    className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 ${location.type === 'head' ? 'border-l-4 border-primary_color' : ''
                                        }`}
                                    itemScope
                                    itemType="https://schema.org/LocalBusiness"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words" itemProp="name">
                                                    {location.name}
                                                </h3>
                                                {location.type === 'head' && (
                                                    <span className="bg-[#003875]/75 text-white text-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                                                        HEAD OFFICE
                                                    </span>
                                                )}
                                                {location.type === 'digital' && (
                                                    <span className="text-center bg-primary_color/75 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                                                        DIGITAL BOOTH
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-1 text-sm sm:text-base text-gray-700" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                                <p className="break-words"><strong itemProp="name">{location.building}</strong> {location.room && `(${location.room})`}</p>
                                                <p itemProp="streetAddress" className="break-words">{location.address}</p>
                                                {location.locality && <meta itemProp="addressLocality" content={location.locality} />}
                                                {location.postalCode && <meta itemProp="postalCode" content={location.postalCode} />}
                                                <meta itemProp="addressCountry" content="BD" />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto lg:shrink-0">
                                            {location.link}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {/* Contact Information */}
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                                                <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                Contact Information
                                            </h4>
                                            <div className="space-y-2">
                                                {location.tel.map((tel, index) => (
                                                    <a
                                                        key={index}
                                                        href={`tel:${tel}`}
                                                        className="flex items-center text-[#1da1f2] hover:text-blue-800 transition-colors text-sm sm:text-base break-all"
                                                        itemProp="telephone"
                                                    >
                                                        <svg className="w-3 h-3 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        Tel: {tel}
                                                    </a>
                                                ))}
                                                {location.mobile.map((mobile, index) => (
                                                    <a
                                                        key={index}
                                                        href={`tel:${mobile}`}
                                                        className="flex items-center text-primary_color hover:text-green-800 transition-colors text-sm sm:text-base break-all"
                                                        itemProp="telephone"
                                                    >
                                                        <svg className="w-3 h-3 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        Cell: {mobile}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Services */}
                                        {/* <div>
                                            {location.services?.length > 0 && (
                                                <>
                                                    <h4 className="font-semibold text-gray-800 mb-3">Available Services</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {location.services.map((service, index) => (
                                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div> */}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Contact Support */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                            <div className="space-y-3">
                                <a href="tel:09609100142" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                    <div className="w-10 h-10 bg-[#1da1f2] rounded-full flex items-center justify-center mr-3 shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-base">Call Support</h4>
                                        <p className="text-sm text-gray-600">09609 100 142</p>
                                    </div>
                                </a>

                                <a href="https://wa.me/+8801874444816" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mr-3 shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.79 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-base">WhatsApp</h4>
                                        <p className="text-sm text-gray-600">Chat with us on WhatsApp</p>
                                    </div>
                                </a>

                                <a href="https://m.me/yourpagename" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                                    <div className="w-10 h-10 bg-[#0084ff] rounded-full flex items-center justify-center mr-3 shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 2C6.48 2 2 6.13 2 11.5c0 3.03 1.43 5.72 3.68 7.48V22l3.37-1.85c.9.25 1.85.38 2.95.38 5.52 0 10-4.13 10-9.5S17.52 2 12 2zm1.01 12.79l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-base">Messenger</h4>
                                        <p className="text-sm text-gray-600">Chat with us on Messenger</p>
                                    </div>
                                </a>

                                <a href="/contact-us" className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3 shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-base">Contact Form</h4>
                                        <p className="text-sm text-gray-600">Send us a message</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between gap-2">
                                    <span>Sunday - Thursday</span>
                                    <span className="font-medium text-green-600 text-right">9:30 AM - 5:30 PM</span>
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
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Our Services</h3>
                            <ul className="space-y-2 text-sm">
                                {["Account Opening", "Trading Support", "Investment Advisory", "Customer Service"].map((s) => (
                                    <li key={s} className="flex items-center">
                                        <svg className="w-4 h-4 text-green-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    )
}

export default BranchesFilter