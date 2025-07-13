import Image from 'next/image'
import React from 'react'
import Logo from '../../public/./qtp_logo.webp'
const FirstApproachModal = () => {
    return (
        // <div className='fixed bottom-0 left-0 right-0 bg-black/50 z-50'>
        //     <div className='bg-white w-full flex justify-center items-center relative'>
        //         <div className='absolute right-0 top-[-15px] bg-black text-white w-6 h-6 flex justify-center items-center rounded-full p-1'>x</div>
        //         <div className='bg-green-500 w-full py-2'>FirstApproachModal</div>
        //     </div>
        // </div>
        <>
            <div className="csr112 p-8 z-[5000000]">
                <Image src={Logo} alt="" className="csr115 p-2 py-3" />
                <div className="csr114 text-sm">Invest in Stocks, ETFs, Options
                    All Commission Free
                </div>
                <div className="csr116">Download</div>
                <i className="csr113"></i>
            </div>
        </>
    )
}

export default FirstApproachModal