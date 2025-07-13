'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '../../public/./qtp_logo.webp'
import Link from 'next/link'
import { useBottomModalClose } from '../context/firstApproachModalContext'
const FirstApproachModal = () => {
    const {isModalOpen, closeModal, openModal } = useBottomModalClose()
    return (
        <>
            <div className={`csr112 p-8 z-[5000000] ${isModalOpen ? '' : 'hidden'}`}>
                <Image src={Logo} alt="" className="csr115 p-2 py-3" />
                <div className="csr114 text-[17px] leading-4">Now trade from anywhere.</div>
                <div className="csr116 bg-qtp_btn_bg_color">
                    <Link target='_blank' href={`https://play.google.com/store/apps/details?id=com.midwaybd.quick_trade_pro&hl=en`}>Download</Link>
                </div>
                <i onClick={() => closeModal()} className="csr113"></i>
            </div>
        </>
    )
}

export default FirstApproachModal