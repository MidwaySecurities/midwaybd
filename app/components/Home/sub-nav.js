'use client'

import { useModalClose } from "../close-button-provider";
import bangladeshFlag from '../../../public/images/bangladesh.png'
import Image from "next/image";
import Link from "next/link";
const SubNav = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    return (
        <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
            <div className="inline-block px-4 py-2 bg-qtp_btn_bg_color text-white rounded-lg shadow-md mr-2 bg-opacity-0 backdrop-blur-lg cursor-pointer">
                <Link href={`https://portal.midwaybd.com/bo/portal-login`} target="_blank" className="">Open BO A/C</Link>
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2 cursor-pointer">
                <Link href={'/'}>Deposits</Link>
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                <Link href={`/`}>Withdrawals</Link>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-md mr-2 flex gap-1 items-center">
                <Link href={`/`} className="flex items-center gap-1">
                    <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[18px] h-[18px] inline-block' />
                    <span className="inline-block pr-4">বাংলা</span>
                </Link>
            </div>
            <div onClick={() => {
                openModal()
            }} className="inline-block cursor-default px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                More
            </div>
        </div>
    );

}

export default SubNav;