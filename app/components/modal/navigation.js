'use client'
import React from 'react'
import CloseButton from './components/cross-button'
import { useModalClose } from '../close-button-provider'

const Navigation = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    console.log(isModalOpen, closeModal, openModal)
    return (
        <div style={{ backdropFilter: 'blur(20px)' }} className={`fixed ${isModalOpen ? '' : 'hidden'} top-0 bottom-0 flex justify-center items-center left-0 right-0 z-[100] text-foreground text-3xl overscroll-none`}>
            <CloseButton />
            <div>
                <div className='flex justify-between items-center flex-col p-4 gap-8 rounded-lg'>
                    <div className='flex space-y-2 flex-col mt-8'>
                        <a href="#" className='hover:text-gray-300'>Home</a>
                        <div>
                            <div className='flex items-center gap-2 hover:text-gray-300 cursor-pointer'>
                                <a href="#" className='hover:text-gray-300'>Services</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                </svg>
                            </div>
                        </div>
                        <a href="#" className='hover:text-gray-300'>About Us</a>
                        <a href="#" className='hover:text-gray-300'>Contact</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation