'use client'
import React, { useState } from 'react'
import CloseButton from './components/cross-button'
import { useModalClose } from '../close-button-provider'
import Link from 'next/link'
import BodyScrollLock from '../BodyScrollLock'
import { useRouter, usePathname } from 'next/navigation'

const Navigation = () => {
    const { isModalOpen, closeModal } = useModalClose()
    const [openInvestments, setOpenInvestments] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleNavigate = (path) => {
        closeModal()
        setTimeout(() => {
            router.push(path)
        }, 100)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const isActive = (path) => pathname === path

    const NavItem = ({ icon, label, path, onClick, children, isExpanded, badge }) => {
        const isActiveItem = isActive(path)

        const handleClick = (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (onClick) {
                onClick()
            } else {
                handleNavigate(path)
            }
        }

        return (
            <div className="space-y-1">
                <button
                    onClick={handleClick}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${isActiveItem
                        ? 'bg-secondary_color text-white shadow-lg scale-[0.98]'
                        : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-primary_color hover:shadow-md active:scale-[0.98]'
                        }`}
                >
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isActiveItem ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'
                            }`}>
                            <div className={`transition-colors ${isActiveItem ? 'text-white' : 'text-gray-600 group-hover:text-secondary_color'}`}>
                                {icon}
                            </div>
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-semibold text-base">{label}</div>
                            {badge && <div className="text-xs opacity-75">{badge}</div>}
                        </div>
                    </div>
                    {children && (
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </button>
                {children && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="ml-6 space-y-1 pb-2">
                            {children}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const SubNavItem = ({ label, path, icon }) => (
        <button
            onClick={() => handleNavigate(path)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm transition-all duration-200 ${isActive(path)
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-gray-600 hover:text-secondary_color hover:bg-gray-50'
                }`}
        >
            {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
            <span>{label}</span>
        </button>
    )

    return (
        <div
            className={`fixed inset-0 z-[9999] transition-all duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <BodyScrollLock lock={isModalOpen} />

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            />

            {/* Navigation Panel */}
            <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gray-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isModalOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>

                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <CloseButton />
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 space-y-2" style={{ maxHeight: 'calc(100vh - 180px)' }}>

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                        label="Home"
                        path="/"
                        badge="Dashboard"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="About Us"
                        path="/about-us"
                        badge="Company Info"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                        label="Mobile App"
                        path="/mobile-app"
                        badge="QuickTrade Pro"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                        label="Link BO Account"
                        path="/link-bo-account"
                        badge="Connect Account"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        label="Investments"
                        badge="Multi-Asset Class"
                        onClick={() => setOpenInvestments(!openInvestments)}
                        isExpanded={openInvestments}
                    >
                        <SubNavItem
                            label="Apply for IPO"
                            path="/ipo" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                        {/* <SubNavItem
                            label="Stocks"
                            // path="/stocks" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        />
                        <SubNavItem
                            label="Mutual Funds"
                            // path="/mutual-funds" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        />
                        <SubNavItem
                            label="Block Trade"
                            // path="/block-trade" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        />
                        <SubNavItem
                            label="SME/ATB"
                            // path="/sme-atb" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        />
                        <SubNavItem
                            label="Govt. Securities"
                            // path="/govt-securities" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        />
                        <SubNavItem
                            label="OTC Market"
                            // path="/otc-market" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
                        /> */}
                    </NavItem>

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        label="Client Services"
                        path="/client-services"
                        badge="Support"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        label="Our Branches"
                        path="/our-branches"
                        badge="Find Locations"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        label="Form Download"
                        path="/form-download"
                        badge="Documents"
                    />
                    <NavItem
                        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 50 50" > <path d="M37.82,21.07v3.86H21.18V33a10.23,10.23,0,0,0,.09,1.28,8.76,8.76,0,0,0,.31,1.43,6.23,6.23,0,0,0,.6,1.41,4.62,4.62,0,0,0,1,1.22,4.69,4.69,0,0,0,1.44.87,5.46,5.46,0,0,0,2,.33,8.87,8.87,0,0,0,2.57-.36,6.74,6.74,0,0,0,2.09-1,4.94,4.94,0,0,0,1.42-1.57,4.17,4.17,0,0,0,.51-2.06,4.61,4.61,0,0,0-.12-1,2.67,2.67,0,0,0-.44-1,2.47,2.47,0,0,0-.84-.76,2.62,2.62,0,0,0-1.31-.3,2.7,2.7,0,0,0-1,.17,1.85,1.85,0,0,0-.68.43,1.67,1.67,0,0,0-.4.59,1.88,1.88,0,0,0-.13.65,2.06,2.06,0,0,0,1,1.71l-2.89,2.44a5.06,5.06,0,0,1-2.3-4.41A4.61,4.61,0,0,1,24.6,31a5.27,5.27,0,0,1,1.34-1.68A6.66,6.66,0,0,1,28,28.2a8.28,8.28,0,0,1,2.65-.4,7.18,7.18,0,0,1,2.92.55,6.26,6.26,0,0,1,2.08,1.43,5.94,5.94,0,0,1,1.25,2,7,7,0,0,1,.41,2.34,9.21,9.21,0,0,1-.69,3.58,8,8,0,0,1-2,2.87,9.66,9.66,0,0,1-3.35,1.92,14.32,14.32,0,0,1-4.66.7,11.59,11.59,0,0,1-4.66-.81A7.57,7.57,0,0,1,19,40.25a8.09,8.09,0,0,1-1.52-3.13A14.7,14.7,0,0,1,17,33.45V24.93H12.07V21.07H17v-6a3.52,3.52,0,0,0-.68-2.24A2.33,2.33,0,0,0,14.39,12a3,3,0,0,0-1.25.23,2.37,2.37,0,0,0-.86.6,2.42,2.42,0,0,0-.48.88,3.57,3.57,0,0,0-.15,1H7.53A6.38,6.38,0,0,1,8.1,12,6.26,6.26,0,0,1,9.6,9.94a6.33,6.33,0,0,1,2.14-1.27,7,7,0,0,1,2.47-.44A8.47,8.47,0,0,1,17,8.68,6.1,6.1,0,0,1,19.23,10a6.17,6.17,0,0,1,1.44,2.14A7.63,7.63,0,0,1,21.18,15v6.05Z" /> </svg>}
                        label="Pricing"
                        path="/pricing"
                        badge="Transparent fees"
                    />

                    {/* <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        label="Visual Research"
                        path="/visual-research"
                        badge="Market Analysis"
                    /> */}

                    {/* <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        label="Learn Share Market"
                        path="/learn-about-share-market"
                        badge="Education"
                    /> */}

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="FAQ"
                        path="/frequently-asked-question"
                        badge="Help & Support"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
                        label="Blogs"
                        path="/blog"
                        badge="Market Insights"
                    />

                    {/* <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="Foreign Investor"
                        path="/foreign-investors"
                        badge="International"
                    /> */}

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        label="Contact Us"
                        path="/contact-us"
                        badge="Get in Touch"
                    />

                </div>

                {/* Bottom Actions */}
                <div className="bg-white p-4 border-t border-gray-200">
                    <div className="space-y-3">
                        <Link
                            href="tel:09609100142"
                            className="w-full flex items-center justify-center space-x-3 p-4 bg-primary_color/90 hover:bg-green-700 text-white rounded-2xl transition-all font-semibold active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Call Support</span>
                        </Link>

                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="https://portal.midwaybd.com/register"
                                className="text-center py-3 px-4 border-2 border-primary_color text-primary_color font-semibold rounded-xl hover:bg-blue-50 transition-all active:scale-95"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href="https://portal.midwaybd.com/"
                                className="text-center py-3 px-4 bg-secondary_color hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-95"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation