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
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${
                        isActiveItem 
                            ? 'bg-blue-600 text-white shadow-lg scale-[0.98]' 
                            : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 hover:shadow-md active:scale-[0.98]'
                    }`}
                >
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                            isActiveItem ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'
                        }`}>
                            <div className={`transition-colors ${isActiveItem ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}>
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
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0'
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
            className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm transition-all duration-200 ${
                isActive(path)
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
        >
            {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
            <span>{label}</span>
        </button>
    )

    return (
        <div 
            className={`fixed inset-0 z-[9999] transition-all duration-300 ${
                isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
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
            <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gray-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
                isModalOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                
                {/* Header */}
                <div className="bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div> */}
                            {/* <div>
                                <h1 className="font-bold text-lg text-gray-900">Midway Securities</h1>
                                <p className="text-sm text-gray-500">Investment Platform</p>
                            </div> */}
                        </div>
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
                        badge="Trading Options"
                        onClick={() => setOpenInvestments(!openInvestments)}
                        isExpanded={openInvestments}
                    >
                        <SubNavItem 
                            label="Apply for IPO" 
                            path="/ipo" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                        <SubNavItem 
                            label="Stocks" 
                            path="/stocks" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        />
                        <SubNavItem 
                            label="Mutual Funds" 
                            path="/mutual-funds" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        />
                        <SubNavItem 
                            label="Block Trade" 
                            path="/block-trade" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        />
                        <SubNavItem 
                            label="SME/ATB" 
                            path="/sme-atb" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        />
                        <SubNavItem 
                            label="Govt. Securities" 
                            path="/govt-securities" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        />
                        <SubNavItem 
                            label="OTC Market" 
                            path="/otc-market" 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
                        />
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
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        label="Visual Research"
                        path="/visual-research"
                        badge="Market Analysis"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        label="Learn Share Market"
                        path="/learn-about-share-market"
                        badge="Education"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="FAQ"
                        path="/frequently-asked-question"
                        badge="Help & Support"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
                        label="Blogs"
                        path="/blogs"
                        badge="Market Insights"
                    />

                    <NavItem
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="Foreign Investor"
                        path="/foreign-investors"
                        badge="International"
                    />

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
                            className="w-full flex items-center justify-center space-x-3 p-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl transition-all font-semibold active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Call Support</span>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <Link 
                                href="https://portal.midwaybd.com/register" 
                                className="text-center py-3 px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all active:scale-95"
                            >
                                Sign Up
                            </Link>
                            <Link 
                                href="https://portal.midwaybd.com/" 
                                className="text-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-95"
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