'use client'
import React from 'react'
import { useModalClose } from '../../close-button-provider'
import Image from 'next/image'
import style from '../../../../app/components/Home/first-nav-bar.module.css'
import Link from 'next/link'

const CloseButton = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    console.log(isModalOpen)
    return (
        <div style={{ backdropFilter: 'blur(20px)' }} className='z-[100] h-[50px] sticky top-0 w-full bg-gray-100 flex justify-between items-center border-b-[.5px] border-b-gray-200'>
            <div>
                <div className='flex gap-3'>
                    <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/midway-logo-moto.png`} alt='midway logo' className='ml-6 box-border' height={30} width={30} />
                    <Link className={`${style.logoZoom} flex items-center font-bold text-gray-800 text-[14px]`} href={`/`}>
                        {/* <h1 className="">Midway Securities Ltd.</h1> */}
                        {/* <h1 className="flex flex-col leading-5 justify-center uppercase"><span className="tracking-[12.4px]">Midway</span><span className="tracking-[.9px]">Securities Ltd.</span></h1> */}
                        <h1 className="flex flex-col leading-0 justify-center uppercase mt-[-.30rem]"><span className="text-lg tracking-[2px]">Midway</span><span className="tracking-[.93px] text-[.6rem] leading-2">Securities Ltd.</span></h1>
                    </Link>
                </div>
            </div>
            <button onClick={() => {
                closeModal()
            }} className='cursor-pointer hover:scale-110 transition-transform duration-300  p-2 rounded-full text-right'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#172b4d" />
                </svg>
            </button>
        </div>
    )
}

export default CloseButton