// FILE 2: app/frequently-asked-question/FAQClient.tsx (Client Component)
'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function FAQClient({ faqData, categories }) {
    const [activeCategory, setActiveCategory] = useState('started')
    const [openItems, setOpenItems] = useState({})
    const [searchTerm, setSearchTerm] = useState('')

    // need to know the device width to handle scroll into view for smaller devices
    const deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
    console.log('Device Width:', deviceWidth)

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const filteredFAQs = faqData[activeCategory]?.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Search Bar */}
            <div id='categories' className="max-w-2xl mx-auto mb-12 -mt-24 relative z-10">
                <div className="relative mt-5">
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-2xl focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Categories Sidebar */}
                <aside className="lg:col-span-1">
                    <nav className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Categories</h2>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <Link href={`#${category.id}`} key={category.id}>
                                    <button
                                        onClick={() => {
                                            setActiveCategory(category.id)
                                            setSearchTerm('')
                                        }}

                                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left ${activeCategory === category.id
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className={`${activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {category.icon}
                                        </div>
                                        <span className="text-sm">{category.name}</span>
                                        <div className={`ml-auto w-2 h-2 rounded-full ${activeCategory === category.id ? 'bg-blue-600' : ''
                                            }`}></div>
                                    </button>
                                </Link>
                            ))}
                        </div>

                        {/* Contact Support */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-800 mb-4">Still need help?</h3>
                            <div className="space-y-3">
                                <Link
                                    href="tel:09609100142"
                                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>09609 100 142</span>
                                </Link>

                                <Link
                                    href="mailto:support@midwaybd.com"
                                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Email Support</span>
                                </Link>

                                <Link
                                    id={`${deviceWidth < 1024 ? activeCategory : ''}`}
                                    href="/contact-us"
                                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Visit Branch</span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </aside>

                {/* FAQ Content */}
                <main className="lg:col-span-3">
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Category Header */}
                        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200 flex flex-col gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-blue-600">
                                    {categories.find(cat => cat.id === activeCategory)?.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {categories.find(cat => cat.id === activeCategory)?.name}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} available
                                    </p>
                                </div>
                            </div>
                            <div className={deviceWidth < 1024 ? "block self-center" : "hidden"}>
                                <Link href={'#categories'}>
                                    <svg className='w-8 h-8 rotate-180' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{pointerEvents: 'none', display: 'inherit'}}><path d="M12 2a1 1 0 00-1 1v11.586l-4.293-4.293a1 1 0 10-1.414 1.414L12 18.414l6.707-6.707a1 1 0 10-1.414-1.414L13 14.586V3a1 1 0 00-1-1Zm7 18H5a1 1 0 000 2h14a1 1 0 000-2Z"></path></svg>
                                </Link>
                            </div>
                        </div>

                        {/* FAQ Items */}
                        <div className="divide-y divide-gray-200">
                            {filteredFAQs.length > 0 ? (
                                filteredFAQs.map((faq) => (
                                    <div key={faq.id} className="p-8">
                                        <button
                                            onClick={() => toggleItem(faq.id)}
                                            className="w-full flex items-center justify-between text-left group"
                                            aria-expanded={openItems[faq.id]}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors pr-4">
                                                {faq.question}
                                            </h3>
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-all duration-200 ${openItems[faq.id] ? 'rotate-180 bg-blue-100' : ''
                                                }`}>
                                                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </button>

                                        <div className={`mt-4 transition-all duration-300 overflow-hidden ${openItems[faq.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-8-7.109c0-1.864.613-3.584 1.645-4.973L12 20.4l6.355-12.082A7.963 7.963 0 0120 12.291z" />
                                    </svg>
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
                                    <p className="text-gray-600">Try adjusting your search terms or browse other categories.</p>
                                </div>
                            )}
                        </div>
                    </article>

                    {/* Quick Links */}
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href="/mobile-app" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Mobile App</h4>
                                    <p className="text-sm text-gray-600">Download QuickTrade Pro</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/deposit" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Fund Account</h4>
                                    <p className="text-sm text-gray-600">Deposit funds instantly</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/our-branches" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Visit Branch</h4>
                                    <p className="text-sm text-gray-600">Find nearest location</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}