'use client'
import React, { useState } from 'react'
import CloseButton from './components/cross-button'
import { useModalClose } from '../close-button-provider'

const Navigation = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    const [openService, setOpenService] = useState(false)
    const [openPricing, setOpenPricing] = useState(false)
    const [openDeposit, setOpenDeposit] = useState(false)
    const [openBo, setOpenBo] = useState(false)
    return (
        <div style={{ backdropFilter: 'blur(20px)' }} className={`fixed ${isModalOpen ? '' : 'hidden'} top-0 bottom-0 flex justify-center left-0 right-0 z-[100] h-screen text-foreground text-3xl overflow-scroll`}>
            <CloseButton />
            <div className='w-full px-8 mt-4'>
                <div className='flex justify-between items-center flex-col p-4 gap-8 rounded-lg w-full'>
                    <div className='flex space-y-2 flex-col mt-8 w-full'>
                        <a href="#" className='hover:text-gray-300'>Home</a>
                        <div>
                            <div onClick={() => {
                                setOpenBo(prev => !prev)
                                setOpenService(false)
                                setOpenPricing(false)
                                setOpenDeposit(false)

                            }} className='flex items-center justify-between gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>Open Bo</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                            {/* dropdown */}
                            <div className={`text-2xl text-gray-700 shadow-lg ${openBo ? 'p-4 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-4 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
                                <a href="#" className='block hover:text-gray-300'>Open single BO</a>
                                <a href="#" className='block hover:text-gray-300'>Open joint BO</a>
                                <a href="#" className='block hover:text-gray-300'>NRB BO</a>
                                <a href="#" className='block hover:text-gray-300'>Link Account</a>
                            </div>
                        </div>
                        <a href="#" className='hover:text-gray-300'>Mobile app</a>
                        <a href="#" className='hover:text-gray-300'>Apply for IPO</a>
                        <a href="#" className='hover:text-gray-300'>Branches</a>
                        <div>
                            <div onClick={() => {
                                setOpenService(prev => !prev)
                                setOpenPricing(false)
                                setOpenDeposit(false)
                                setOpenBo(false)
                            }} className='flex items-center justify-between gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>Services</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                            {/* dropdown */}
                            <div className={`text-2xl text-gray-700 shadow-lg ${openService ? 'p-4 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-2 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
                                <a href="#" className='block hover:text-gray-300'>Trading</a>
                                <a href="#" className='block hover:text-gray-300'>Investment</a>
                                <a href="#" className='block hover:text-gray-300'>Research</a>
                                <a href="#" className='block hover:text-gray-300'>Advisory</a>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => {
                                setOpenPricing(prev => !prev)
                                setOpenService(false) // Close service dropdown if open
                                setOpenDeposit(false) // Close deposit dropdown if open
                            }} className='flex items-center justify-between gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>Pricing</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                            {/* dropdown */}
                            <div className={`text-2xl text-gray-700 shadow-lg ${openPricing ? 'p-4 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-2 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
                                <a href="#" className='block hover:text-gray-300'>Pricing</a>
                                <a href="#" className='block hover:text-gray-300'>প্রাইস</a>
                            </div>
                        </div>

                        <div>
                            <div onClick={() => {
                                setOpenDeposit(prev => !prev)
                                setOpenService(false) // Close service dropdown if open
                                setOpenPricing(false) // Close pricing dropdown if open
                            }} className='flex items-center justify-between gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>Deposit</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                            {/* dropdown */}
                            <div className={`text-2xl text-gray-700 shadow-lg ${openDeposit ? 'p-4 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-2 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
                                <a href="#" className='block hover:text-gray-300'>BKASH, NAGAD, ROCKET</a>
                                <a href="#" className='block hover:text-gray-300'>Credit card deposit</a>
                                <a href="#" className='block hover:text-gray-300'>Withdrow</a>
                            </div>
                        </div>

                        <a href="#" className='hover:text-gray-300'>FAQ</a>
                        <a href="#" className='hover:text-gray-300'>Foreigh Investor</a>
                        <a href="#" className='hover:text-gray-300'>About Us</a>
                        <a href="#" className='hover:text-gray-300'>Contact</a>
                        <a href="#" className='block hover:text-gray-300'>OTC market</a>
                        <a href="#" className='block hover:text-gray-300'>Form download</a>
                        <a href="#" className='block hover:text-gray-300'>Blog</a>
                        <a href="#" className='block hover:text-gray-300'>Visual research</a>
                        <a href="#" className='block hover:text-gray-300'>G-SEC</a>
                        <a href="#" className='block hover:text-gray-300'>Update your nominee</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation