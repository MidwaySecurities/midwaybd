'use client'

import { useModalClose } from "../close-button-provider";
import bangladeshFlag from '../../../public/images/bangladesh.png'
import Image from "next/image";
const SubNav = () => {
    const { isModalOpen, closeModal, openModal } = useModalClose()
    return (
        <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
            <div className="inline-block px-4 py-2 bg-qtp_btn_bg_color text-white rounded-lg shadow-md mr-2 bg-opacity-0 backdrop-blur-lg">
                Open Bo
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                Deposits
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                Withdrawals
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-md mr-2 flex gap-1 items-center">
                <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[18px] h-[18px] inline-block' />
                <span className="inline-block pr-4">বাংলা</span>
            </div>
            <div onClick={() => {
                openModal()
            }} className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                More
            </div>
        </div>
    );

}

export default SubNav;