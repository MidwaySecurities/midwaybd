'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '../../public/./qtp_logo.webp'
import Link from 'next/link'
import { useBottomModalClose } from '../context/firstApproachModalContext'
import { useDeviceDetect } from '../context/deviceDetectContext'
const FirstApproachModal = () => {
    const { isModalOpen, closeModal, openModal } = useBottomModalClose()
    const { os } = useDeviceDetect()
    return (
        <>
            <div className={`backdrop-blur-sm csr112 p-8 z-[5000000] ${isModalOpen ? '' : 'hidden'}`}>
                <Image src={Logo} alt="" className="csr115 p-2 py-3" />
                <div className="csr114 text-[14px] leading-4">Now trade from anywhere.</div>
                <div className="csr116 bg-secondary_color">
                    <Link target='_blank' href={`${(os === 'iOS' || os === 'macOS') ? 'https://apps.apple.com/us/app/quicktrade-pro/id6740322022' : 'https://play.google.com/store/apps/details?id=com.midwaybd.quick_trade_pro&hl=en'}`}>Download</Link>
                </div>
                <i onClick={() => closeModal()} className="csr113 cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="black" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </i>
            </div>
        </>
    )
}

export default FirstApproachModal