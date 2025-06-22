'use client'
import React from 'react'
import CloseButton from './components/cross-button'
import { useModalClose } from '../close-button-provider'

const Navigation = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    console.log(isModalOpen, closeModal, openModal)
    return (
        <div style={{ backdropFilter: 'blur(20px)' }} className={`fixed ${isModalOpen?'':'hidden'} top-0 bottom-0 flex justify-center items-center left-0 right-0 z-[100] text-foreground text-3xl overscroll-none`}>
            <CloseButton />
            <div>
                <div className='flex justify-between items-center flex-col p-4 gap-8 rounded-lg'>
                    <div className='flex space-y-2 flex-col mt-8'>
                        <a href="#" className='hover:text-gray-300'>Home</a>
                        <a href="#" className='hover:text-gray-300'>Services</a>
                        <a href="#" className='hover:text-gray-300'>About Us</a>
                        <a href="#" className='hover:text-gray-300'>Contact</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation