// 'use client'

// import { useModalClose } from "../close-button-provider";
// import bangladeshFlag from '../../../public/images/bangladesh.png';
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const SubNav = () => {
//   const { openModal } = useModalClose();
//   const pathname = usePathname();

//   const navItems = [
//     { href: "/deposit", label: "Deposits" },
//     { href: "/withdrawals", label: "Withdrawals" },
//   ];

//   const isActive = (path) => pathname === path;

//   return (
//     <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
      
//       {/* External link → use <a>, not Next.js Link */}
//       <a
//         href="https://portal.midwaybd.com/bo/portal-login"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-block px-4 py-2 rounded-lg shadow-md mr-2 bg-[#004990] text-white"
//       >
//         Open BO A/C
//       </a>

//       {/* Internal links */}
//       {navItems.map((item) => (
//         <Link
//           key={item.href}
//           href={item.href}
//           prefetch = {false}
//           className={`inline-block px-4 py-2 rounded-lg shadow-md mr-2 ${
//             isActive(item.href)
//               ? "bg-qtp_btn_bg_color text-white"
//               : "bg-white"
//           }`}
//         >
//           {item.label}
//         </Link>
//       ))}

//       {/* Language switch */}
//       <Link
//         href="/"
//         className="px-4 py-2 bg-white rounded-lg shadow-md mr-2 flex gap-1 items-center"
//       >
//         <Image
//           src={bangladeshFlag}
//           alt="bangladesh"
//           height={18}
//           width={18}
//           className="inline-block"
//         />
//         <span className="inline-block pr-4">বাংলা</span>
//       </Link>

//       {/* Modal trigger */}
//       <button
//         onClick={openModal}
//         className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2"
//       >
//         More
//       </button>
//     </div>
//   );
// };

// export default SubNav;


'use client'
import React, { useState } from 'react'
import { useModalClose } from '../close-button-provider'
import Link from 'next/link'
import BodyScrollLock from '../BodyScrollLock'
import { useRouter, usePathname } from 'next/navigation'
import CloseButton from '../modal/components/cross-button'

const Navigation = () => {
    const { isModalOpen, closeModal } = useModalClose()
    const [activeDropdown, setActiveDropdown] = useState(null)
    const router = useRouter()
    const pathname = usePathname()

    const handleNavigate = (path) => {
        router.push(path)
        closeModal()
    }

    const isActive = (path) => pathname === path

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }

    const linkClass = (path) =>
        `block w-full text-left py-3 px-4 rounded-lg border transition-all duration-200 hover:border-green-500 hover:text-green-500 ${
            isActive(path) 
                ? 'bg-qtp_btn_bg_color text-white border-qtp_btn_bg_color' 
                : 'bg-white text-gray-700 border-gray-300'
        }`

    const dropdownClass = `border rounded-lg bg-white border-gray-300 transition-all duration-200`

    const navigationItems = [
        { path: '/', label: 'Home', type: 'link' },
        { path: '/about-us', label: 'About Us', type: 'link' },
        { path: '/mobile-app', label: 'Mobile App', type: 'link' },
        { path: '/link-bo-account', label: 'Link BO Account', type: 'link' },
        {
            label: 'Investments',
            type: 'dropdown',
            key: 'investments',
            items: [
                { href: '/ipo', label: 'Apply for IPO' },
                { href: '/stocks', label: 'Stocks' },
                { href: '/mutual-funds', label: 'Mutual Funds' },
                { href: '/block-trade', label: 'Block Trade' },
                { href: '/sme-atb', label: 'SME/ATB' },
                { href: '/govt-securities', label: 'Government Securities' },
                { href: '/otc-market', label: 'OTC Market' },
            ]
        },
        { path: '/client-services', label: 'Client Services', type: 'link' },
        { path: '/our-branches', label: 'Our Branches', type: 'link' },
        { path: '/form-download', label: 'Forms & Downloads', type: 'link' },
        { path: '/visual-research', label: 'Research & Analysis', type: 'link' },
        { path: '/learn-about-share-market', label: 'Learning Center', type: 'link' },
        { path: '/frequently-asked-question', label: 'FAQ', type: 'link' },
        { path: '/contact-us', label: 'Contact Us', type: 'link' },
        { path: '/blogs', label: 'Blog', type: 'link' },
        { path: '/foreign-investors', label: 'Foreign Investors', type: 'link' },
    ]

    if (!isModalOpen) return null

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[100]"
                onClick={closeModal}
            />
            <div className="fixed inset-0 z-[101] overflow-y-auto">
                <BodyScrollLock lock={isModalOpen} />
                <div className="min-h-full flex items-start justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Navigation Menu</h2>
                            <CloseButton />
                        </div>

                        {/* Navigation Content */}
                        <div className="p-6">
                            <nav className="space-y-3">
                                {navigationItems.map((item, index) => (
                                    <div key={item.path || item.key || index}>
                                        {item.type === 'link' ? (
                                            <button
                                                onClick={() => handleNavigate(item.path)}
                                                className={linkClass(item.path)}
                                            >
                                                {item.label}
                                            </button>
                                        ) : (
                                            <div className={dropdownClass}>
                                                <button
                                                    onClick={() => toggleDropdown(item.key)}
                                                    className="w-full flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-green-500 transition-colors duration-200"
                                                >
                                                    <span className="font-medium">{item.label}</span>
                                                    <svg 
                                                        className={`w-5 h-5 transition-transform duration-200 ${
                                                            activeDropdown === item.key ? 'rotate-180' : ''
                                                        }`}
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                
                                                {activeDropdown === item.key && (
                                                    <div className="border-t bg-gray-50">
                                                        {item.items.map((subItem) => (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                onClick={closeModal}
                                                                className="block px-6 py-2 text-sm text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Footer Actions */}
                        <div className="border-t bg-gray-50 px-6 py-4">
                            <div className="flex gap-3">
                                <Link 
                                    href="https://portal.midwaybd.com/register"
                                    className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-lg text-center text-gray-700 hover:border-green-500 hover:text-green-500 transition-all duration-200"
                                    onClick={closeModal}
                                >
                                    Sign Up
                                </Link>
                                <Link 
                                    href="https://portal.midwaybd.com/"
                                    className="flex-1 py-2 px-4 bg-qtp_btn_bg_color text-white rounded-lg text-center hover:bg-opacity-90 transition-all duration-200"
                                    onClick={closeModal}
                                >
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// SubNav Component
const SubNav = () => {
    const { openModal } = useModalClose()
    const pathname = usePathname()

    const navItems = [
        { 
            href: "https://portal.midwaybd.com/bo/portal-login", 
            label: "Open BO Account", 
            external: true,
            primary: true 
        },
        { href: "/deposit", label: "Deposits" },
        { href: "/withdrawals", label: "Withdrawals" },
    ]

    const isActive = (path) => pathname === path

    const getLinkClass = (item) => {
        const baseClass = "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
        
        if (item.primary) {
            return `${baseClass} bg-[#004990] text-white hover:bg-[#003875] shadow-md`
        }
        
        if (item.external) {
            return `${baseClass} bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-500 shadow-sm`
        }
        
        return `${baseClass} ${
            isActive(item.href)
                ? "bg-qtp_btn_bg_color text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-500 shadow-sm"
        }`
    }

    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-3 p-4 overflow-x-auto">
                {navItems.map((item) => (
                    item.external ? (
                        <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={getLinkClass(item)}
                        >
                            {item.label}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    ) : (
                        <Link
                            key={item.href}
                            href={item.href}
                            prefetch={false}
                            className={getLinkClass(item)}
                        >
                            {item.label}
                        </Link>
                    )
                ))}

                {/* Language Switcher */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-green-500 transition-all duration-200 shadow-sm"
                >
                    <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">BD</span>
                    </div>
                    <span className="text-gray-700">বাংলা</span>
                </Link>

                {/* More Menu */}
                <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-green-500 hover:text-green-500 transition-all duration-200 shadow-sm text-gray-700"
                >
                    <span>More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export { Navigation as default, SubNav }