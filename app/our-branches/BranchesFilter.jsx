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
                <div className="max-w-6xl mx-auto px-4 py-4">
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
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${activeFilter === tab.id
                                        ? 'bg-[#1da1f2] text-white shadow-lg'
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
                                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${location.type === 'head' ? 'border-l-4 border-yellow-500' : ''
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
                                                {location.locality && <meta itemProp="addressLocality" content={location.locality} />}
                                                {location.postalCode && <meta itemProp="postalCode" content={location.postalCode} />}
                                                <meta itemProp="addressCountry" content="BD" />
                                            </div>
                                        </div>

                                        <a
                                            href={location.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 lg:mt-0 inline-flex bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition-colors"
                                            title={`Get directions to ${location.name}`}
                                            aria-label={`Get directions to ${location.name}`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Contact Information */}
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                Contact Information
                                            </h4>
                                            <div className="space-y-2">
                                                {location.tel.map((tel, index) => (
                                                    <a
                                                        key={index}
                                                        href={`tel:${tel}`}
                                                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                                        itemProp="telephone"
                                                    >
                                                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        Tel: {tel}
                                                    </a>
                                                ))}
                                                {location.mobile.map((mobile, index) => (
                                                    <a
                                                        key={index}
                                                        href={`tel:${mobile}`}
                                                        className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                                                        itemProp="telephone"
                                                    >
                                                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        Cell: {mobile}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Services */}
                                        <div>
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
                                <a href="tel:09609100142" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Call Support</h4>
                                        <p className="text-sm text-gray-600">09609 100 142</p>
                                    </div>
                                </a>

                                <a href="/contact-us" className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Contact Form</h4>
                                        <p className="text-sm text-gray-600">Send us a message</p>
                                    </div>
                                </a>
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
                                {["Account Opening", "Trading Support", "Investment Advisory", "Customer Service"].map((s) => (
                                    <li key={s} className="flex items-center">
                                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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