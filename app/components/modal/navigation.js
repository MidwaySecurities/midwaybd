'use client'
import React, { useState } from 'react'
import CloseButton from './components/cross-button'
import { useModalClose } from '../close-button-provider'
import Link from 'next/link'
import BodyScrollLock from '../BodyScrollLock'

const Navigation = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    const [openService, setOpenService] = useState(false)
    const [openPricing, setOpenPricing] = useState(false)
    const [openDeposit, setOpenDeposit] = useState(false)
    const [openBo, setOpenBo] = useState(false)
    return (
        <div style={{ backdropFilter: 'blur(20px)' }} className={`fixed ${isModalOpen ? '' : 'hidden'} top-0 bottom-0 justify-center left-0 right-0 z-[100]  text-foreground text-2xl overflow-scroll`}>
            <BodyScrollLock lock={isModalOpen} />
            <CloseButton />
            <div className='w-full px-4 mt-2 mb-8'>
                <div className='flex justify-between items-center flex-col px-2 gap-8 rounded-lg w-full'>
                    <div className='flex space-y-2 flex-col mt-8 w-full'>
                        <Link onClick={() => closeModal()} href="/" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Home</Link>
                        <div className='border-2 border-[#004990] rounded-lg px-3'>
                            <div onClick={() => {
                                setOpenBo(prev => !prev)
                                setOpenService(false)
                                setOpenPricing(false)
                                setOpenDeposit(false)
                            }} className='flex items-center justify-between gap-2 hover:text-green-500 cursor-pointer'>
                                <a href="#" className='hover:text-green-500 '>About us</a>
                            </div>

                        </div>
                        <a href="#" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Mobile app</a>
                        <Link onClick={() => closeModal()} href="/link-bo-account" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Link BO A/C</Link>

                        <div className='border-2 border-[#004990] rounded-lg px-3'>
                            <div onClick={() => {
                                setOpenService(prev => !prev)
                                setOpenPricing(false)
                                setOpenDeposit(false)
                                setOpenBo(false)
                            }} className='flex items-center justify-between gap-2 hover:text-green-500 cursor-pointer'>
                                <a href="#" className='hover:text-green-500'>Investments</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                            {/* dropdown */}
                            <div className={`text-2xl text-gray-700 shadow-lg ${openService ? 'p-4 py-0 pb-2 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-2 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
                                <a href="#" className='block hover:text-green-500'>Apply for IPO</a>
                                <a href="#" className='block hover:text-green-500'>Stocks</a>
                                <a href="#" className='block hover:text-green-500'>Mutual funds</a>
                                <a href="#" className='block hover:text-green-500'>Block trade</a>
                                <a href="#" className='block hover:text-green-500'>SME/ATB</a>
                                <a href="#" className='block hover:text-green-500'>Govt. Securities</a>
                                <a href="#" className='block hover:text-green-500'>OTC market</a>
                            </div>
                        </div>

                        <Link onClick={() => closeModal()} href="/client-services" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Client Services</Link>
                        <Link onClick={() => closeModal()} href="/our-branches" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Branches</Link>
                        <Link onClick={() => closeModal()} href="/form-download" className='block hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Form download</Link>
                        <a href="#" className='block hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Visual research</a>
                        <a href="#" className='block hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Learn about share market</a>

                        <a href="#" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>FAQ</a>
                        <Link onClick={() => closeModal()} href="contact-us" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Contact us</Link>
                        <Link onClick={() => closeModal()} href="/foreign-investors" className='hover:text-green-500 border-2 border-[#004990] rounded-lg px-3'>Foreign Investor</Link>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 flex justify-center bg-white text-lg gap-4 py-3 border-t border-t-gray-300 "><button className="p-1 px-2 rounded-lg border-1 w-[100px] font-semibold">Sign up</button><button className="p-1 px-2 rounded-lg w-[100px] bg-qtp_btn_bg_color text-white font-semibold">Log in</button></div>
        </div>
    )
}

export default Navigation