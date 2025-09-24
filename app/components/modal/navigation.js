// 'use client'
// import React, { useState } from 'react'
// import CloseButton from './components/cross-button'
// import { useModalClose } from '../close-button-provider'
// import Link from 'next/link'
// import BodyScrollLock from '../BodyScrollLock'
// import { useRouter, usePathname } from 'next/navigation'

// const Navigation = () => {
//     const { isModalOpen, closeModal } = useModalClose()
//     const [openService, setOpenService] = useState(false)
//     const [openPricing, setOpenPricing] = useState(false)
//     const [openDeposit, setOpenDeposit] = useState(false)
//     const [openBo, setOpenBo] = useState(false)
//     const router = useRouter()
//     const pathname = usePathname() // Current route

//     const handleNavigate = (path) => {
//         router.push(path)
//         // setTimeout(() => closeModal(), 1000)
//     }

//     // Helper to check if tab is active
//     const isActive = (path) => pathname === path

//     const linkClass = (path) =>
//         `hover:text-green-500 border-2 border-[#004990] rounded-lg px-3 text-left ${isActive(path) ? 'bg-qtp_btn_bg_color text-white' : 'bg-white'
//         }`

//     return (
//         <div style={{ backdropFilter: 'blur(20px)' }} className={`fixed ${isModalOpen ? '' : 'hidden'} top-0 bottom-0 left-0 right-0 z-[100] text-foreground text-2xl overflow-scroll uppercase`}>
//             <BodyScrollLock lock={isModalOpen} />
//             <CloseButton />
//             <div className='w-full px-4 mt-2 mb-8'>
//                 <div className='flex justify-between items-center flex-col px-2 gap-8 rounded-lg w-full'>
//                     <div className='flex space-y-2 flex-col mt-6 w-full'>
//                         <button onClick={() => handleNavigate("/")} className={linkClass('/')}>Home</button>

//                         {/* <div className='border-2 border-[#004990] rounded-lg px-3'>
//                             <div
//                                 onClick={() => {
//                                     setOpenBo(prev => !prev)
//                                     setOpenService(false)
//                                     setOpenPricing(false)
//                                     setOpenDeposit(false)
//                                 }}
//                                 className='flex items-center justify-between gap-2 hover:text-green-500 cursor-pointer'
//                             >
//                                 <span className='hover:text-green-500'>About us</span>
//                             </div>
//                         </div> */}
//                         <button onClick={() => handleNavigate("/about-us")} className={linkClass('/about-us')}>About Us</button>


//                         {/* <a href="#" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Mobile app</a> */}
//                         <button onClick={() => handleNavigate("/mobile-app")} className={linkClass('/mobile-app')}>Mobile App</button>

//                         <button onClick={() => handleNavigate("/link-bo-account")} className={linkClass('/link-bo-account')}>Link BO A/C</button>


//                         <div className='border-2 border-[#004990] rounded-lg px-3'>
//                             <div
//                                 onClick={() => {
//                                     setOpenService(prev => !prev)
//                                     setOpenPricing(false)
//                                     setOpenDeposit(false)
//                                     setOpenBo(false)
//                                 }}
//                                 className='flex items-center justify-between gap-2 hover:text-green-500 cursor-pointer'
//                             >
//                                 <span className='hover:text-green-500'>Investments</span>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
//                                     <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
//                                 </svg>
//                             </div>
//                             <div className={`text-2xl text-gray-700 shadow-lg ${openService ? 'p-4 py-0 pb-2 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-2 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
//                                 <a href="#" className='block hover:text-green-500'>Apply for IPO</a>
//                                 <a href="#" className='block hover:text-green-500'>Stocks</a>
//                                 <a href="#" className='block hover:text-green-500'>Mutual funds</a>
//                                 <a href="#" className='block hover:text-green-500'>Block trade</a>
//                                 <a href="#" className='block hover:text-green-500'>SME/ATB</a>
//                                 <a href="#" className='block hover:text-green-500'>Govt. Securities</a>
//                                 <a href="#" className='block hover:text-green-500'>OTC market</a>
//                             </div>
//                         </div>

//                         {/* <Link href="/client-services" className={linkClass('/client-services')}>Client Services</Link> */}
//                         <button onClick={() => handleNavigate("/client-services")} className={linkClass('/client-services')}>Client Services</button>

//                         <button onClick={() => handleNavigate("/our-branches")} className={linkClass('/our-branches')}>Branches</button>

//                         <button onClick={() => handleNavigate("/form-download")} className={linkClass('/form-download')}>Form download</button>

//                         {/* <Link href="/visual-research" className={linkClass('/visual-research')}>Visual research</Link> */}
//                         <button onClick={() => handleNavigate("/visual-research")} className={linkClass('/visual-research')}>Visual research</button>

//                         {/* <a href="#" className='block hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Learn about share market</a> */}
//                         <button onClick={() => handleNavigate("/learn-about-share-market")} className={linkClass('/learn-about-share-market')}>Learn about share market</button>
//                         <button onClick={() => handleNavigate("/frequently-asked-question")} className={linkClass('/frequently-asked-question')}>FAQ</button>
//                         <Link href="/contact-us" className={linkClass('/contact-us')}>Contact us</Link>
//                         <button onClick={() => handleNavigate("/blogs")} className={linkClass('/blogs')}>Blogs</button>
//                         <button onClick={() => handleNavigate("/foreign-investors")} className={linkClass('/foreign-investors')}>Foreign Investor</button>

//                     </div>
//                 </div>
//             </div>

//             <div className="sticky bottom-0 flex justify-center bg-white text-lg gap-4 py-3 border-t border-t-gray-300 ">
//                 <Link href={`https://portal.midwaybd.com/register`} className="p-1 px-2 rounded-lg border-1 w-[100px] font-semibold flex justify-center">
//                     <button>Sign up</button>
//                 </Link>
//                 <Link href={`https://portal.midwaybd.com/`} className="p-1 px-2 rounded-lg w-[100px] bg-qtp_btn_bg_color text-white font-semibold flex justify-center">
//                     <button>Log in</button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Navigation


// 'use client'
// import React, { useState } from 'react'
// import CloseButton from './components/cross-button'
// import { useModalClose } from '../close-button-provider'
// import Link from 'next/link'
// import BodyScrollLock from '../BodyScrollLock'
// import { useRouter, usePathname } from 'next/navigation'

// const Navigation = () => {
//     const { isModalOpen, closeModal } = useModalClose()
//     const [openService, setOpenService] = useState(false)
//     const [openPricing, setOpenPricing] = useState(false)
//     const [openDeposit, setOpenDeposit] = useState(false)
//     const [openBo, setOpenBo] = useState(false)
//     const router = useRouter()
//     const pathname = usePathname()

//     const handleNavigate = (path) => {
//         router.push(path)
//         setTimeout(() => closeModal(), 300)
//     }

//     const isActive = (path) => pathname === path

//     const linkClass = (path) =>
//         `group relative overflow-hidden rounded-xl px-4 py-3 transition-all duration-300 font-medium ${
//             isActive(path) 
//                 ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
//                 : 'bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 hover:shadow-md'
//         }`

//     const investmentOptions = [
//         { label: 'Apply for IPO', href: '/ipo' },
//         { label: 'Stocks', href: '/stocks' },
//         { label: 'Mutual funds', href: '/mutual-funds' },
//         { label: 'Block trade', href: '/block-trade' },
//         { label: 'SME/ATB', href: '/sme-atb' },
//         { label: 'Govt. Securities', href: '/govt-securities' },
//         { label: 'OTC market', href: '/otc-market' },
//     ]

//     const navigationItems = [
//         { label: 'Home', path: '/' },
//         { label: 'About Us', path: '/about-us' },
//         { label: 'Mobile App', path: '/mobile-app' },
//         { label: 'Link BO A/C', path: '/link-bo-account' },
//     ]

//     const servicesItems = [
//         { label: 'Client Services', path: '/client-services' },
//         { label: 'Branches', path: '/our-branches' },
//         { label: 'Form Download', path: '/form-download' },
//     ]

//     const resourcesItems = [
//         { label: 'Visual Research', path: '/visual-research' },
//         { label: 'Learn Share Market', path: '/learn-about-share-market' },
//         { label: 'FAQ', path: '/frequently-asked-question' },
//         { label: 'Blogs', path: '/blogs' },
//         { label: 'Foreign Investor', path: '/foreign-investors' },
//         { label: 'Contact Us', path: '/contact-us' },
//     ]

//     return (
//         <div 
//             className={`fixed ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} top-0 bottom-0 left-0 right-0 z-[100] transition-all duration-300`}
//             style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
//         >
//             <BodyScrollLock lock={isModalOpen} />
            
//             {/* Overlay */}
//             <div 
//                 className="absolute inset-0"
//                 onClick={closeModal}
//             />
            
//             {/* Navigation Panel */}
//             <div className={`relative bg-gradient-to-br from-gray-50 via-white to-blue-50 h-full w-full max-w-sm ml-auto shadow-2xl transform transition-transform duration-300 ${
//                 isModalOpen ? 'translate-x-0' : 'translate-x-full'
//             }`}>
                
//                 {/* Header */}
//                 <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
//                                 <span className="text-white font-bold text-sm">M</span>
//                             </div>
//                             <h2 className="font-bold text-gray-800">Menu</h2>
//                         </div>
//                         <CloseButton />
//                     </div>
//                 </div>

//                 {/* Navigation Content */}
//                 <div className="h-full overflow-y-auto pb-20">
//                     <div className="p-4 space-y-6">
                        
//                         {/* Main Navigation */}
//                         <div className="space-y-2">
//                             {navigationItems.map((item, index) => (
//                                 <button 
//                                     key={index}
//                                     onClick={() => handleNavigate(item.path)} 
//                                     className={linkClass(item.path)}
//                                 >
//                                     <span className="relative z-10">{item.label}</span>
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Investments Dropdown */}
//                         <div className="space-y-2">
//                             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//                                 <button
//                                     onClick={() => {
//                                         setOpenService(prev => !prev)
//                                         setOpenPricing(false)
//                                         setOpenDeposit(false)
//                                         setOpenBo(false)
//                                     }}
//                                     className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors duration-200 group"
//                                 >
//                                     <span className="font-medium text-gray-700 group-hover:text-blue-600">Investments</span>
//                                     <svg 
//                                         className={`w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-all duration-300 ${openService ? 'rotate-180' : ''}`}
//                                         fill="none" 
//                                         stroke="currentColor" 
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </button>
                                
//                                 <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                                     openService ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                                 }`}>
//                                     <div className="px-4 pb-4 space-y-1 border-t border-gray-100">
//                                         {investmentOptions.map((option, index) => (
//                                             <Link
//                                                 key={index}
//                                                 href={option.href}
//                                                 className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//                                                 onClick={() => setTimeout(() => closeModal(), 300)}
//                                             >
//                                                 {option.label}
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Services Section */}
//                         <div className="space-y-2">
//                             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Services</h3>
//                             {servicesItems.map((item, index) => (
//                                 <button 
//                                     key={index}
//                                     onClick={() => handleNavigate(item.path)} 
//                                     className={linkClass(item.path)}
//                                 >
//                                     <span className="relative z-10">{item.label}</span>
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Resources Section */}
//                         <div className="space-y-2">
//                             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Resources</h3>
//                             {resourcesItems.map((item, index) => (
//                                 <button 
//                                     key={index}
//                                     onClick={() => handleNavigate(item.path)} 
//                                     className={linkClass(item.path)}
//                                 >
//                                     <span className="relative z-10">{item.label}</span>
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Quick Actions */}
//                         <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
//                             <h3 className="font-semibold mb-3">Quick Actions</h3>
//                             <div className="space-y-2">
//                                 <Link 
//                                     href="tel:09609100142"
//                                     className="flex items-center space-x-3 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                     </svg>
//                                     <span className="text-sm">Call Support</span>
//                                 </Link>
//                                 <Link 
//                                     href="/deposit"
//                                     className="flex items-center space-x-3 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
//                                     onClick={() => setTimeout(() => closeModal(), 300)}
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                     <span className="text-sm">Quick Deposit</span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Action Buttons */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
//                     <div className="flex gap-3">
//                         <Link 
//                             href="https://portal.midwaybd.com/register" 
//                             className="flex-1 text-center py-3 px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200"
//                         >
//                             Sign Up
//                         </Link>
//                         <Link 
//                             href="https://portal.midwaybd.com/" 
//                             className="flex-1 text-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
//                         >
//                             Log In
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navigation


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
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-gray-900">Midway Securities</h1>
                                <p className="text-sm text-gray-500">Investment Platform</p>
                            </div>
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