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
        <div style={{ backdropFilter: 'blur(20px)' }} className={`fixed ${isModalOpen ? '' : 'hidden'} top-0 bottom-0 justify-center left-0 right-0 z-[100]  text-foreground text-3xl overflow-scroll`}>
            <CloseButton />
            <div className='w-full px-8 mt-2'>
                <div className='flex justify-between items-center flex-col px-4 gap-8 rounded-lg w-full'>
                    <div className='flex space-y-2 flex-col mt-8 w-full'>
                        <a href="#" className='hover:text-gray-300'>Home</a>
                        <div>
                            <div onClick={() => {
                                setOpenBo(prev => !prev)
                                setOpenService(false)
                                setOpenPricing(false)
                                setOpenDeposit(false)

                            }} className='flex items-center justify-between gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>About us</a>
                            </div>

                        </div>
                        <a href="#" className='hover:text-gray-300'>Mobile app</a>

                        <div>
                            <div onClick={() => {
                                setOpenService(prev => !prev)
                                setOpenPricing(false)
                                setOpenDeposit(false)
                                setOpenBo(false)
                            }} className='flex items-center justify-between gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>Investments</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                            {/* dropdown */}
                            <div className={`text-2xl text-gray-700 shadow-lg ${openService ? 'p-4 mt-2 px-0' : 'max-h-0 overflow-y-hidden'} px-2 rounded-lg group-hover:block transition-all duration-300 ease-in-out`}>
                                <a href="#" className='block hover:text-gray-300'>Apply for IPO</a>
                                <a href="#" className='block hover:text-gray-300'>Stocks</a>
                                <a href="#" className='block hover:text-gray-300'>Mutual funds</a>
                                <a href="#" className='block hover:text-gray-300'>Block trade</a>
                                <a href="#" className='block hover:text-gray-300'>SME/ATB</a>
                                <a href="#" className='block hover:text-gray-300'>Govt. Securities</a>
                                <a href="#" className='block hover:text-gray-300'>OTC market</a>
                            </div>
                        </div>

                        <a href="#" className='hover:text-gray-300'>Client Services</a>
                        <a href="#" className='hover:text-gray-300'>Branches</a>
                        <a href="#" className='block hover:text-gray-300'>Form download</a>
                        <a href="#" className='block hover:text-gray-300'>Visual research</a>
                        <a href="#" className='block hover:text-gray-300'>Learn about share market</a>

                        <a href="#" className='hover:text-gray-300'>FAQ</a>
                        <a href="#" className='hover:text-gray-300'>Contact us</a>
                        <a href="#" className='hover:text-gray-300'>Foreigh Investor</a>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation