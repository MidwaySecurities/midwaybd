'use client'
import Slider from "react-slick"

import { motion } from 'framer-motion'

import stock_image from '../../../public/images/home/services/Stocks.png'
import mutual_fund_image from '../../../public/images/home/services/Mutual_Fund.png'
import block_image from '../../../public/images/home/services/Block.png'
import ipo_image from '../../../public/images/home/services/IPO.png'
import bond_image from '../../../public/images/home/services/Bond.png'
import sme_image from '../../../public/images/home/services/SME.png'

import Link from "next/link";
import Image from "next/image";
const OurServiceCard = () => {

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    };

    return (
        <>
            <motion.div className="slider-container my-8 overflow-hidden lg:hidden text-gray-700">
                <div className='flex justify-center flex-col' id='service'>
                    <h1 className={`text-3xl font-semibold sm:text-2xl md:text-3xl py-0 my-0 text-black text-center`}>Multiple Solutions, One App!</h1>
                    <div className='text-black rounded-full flex justify-center py-6 text-[20px]'>
                        <Link href="https://portal.midwaybd.com/bo/portal-login"
                            target='_blank' className={`border-2 bg-[#004990] text-white mt-3  font-bold no-underline p-3 px-8 rounded-full`}>Open BO Account</Link>
                    </div>
                </div>
                <Slider {...settings}>
                    <div className="mx-2 inline-block">
                        <div className='w-[240px] py-3 rounded-xl bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
                            <Image src={stock_image} alt='stocks' className='w-[50%]' width={180} />
                            <h6 className='font-poppins text-lg text-inherit mt-6'>Stocks</h6>
                        </div>
                    </div>
                    <div className="mx-2 inline-block">
                        <div className='w-[240px] py-3 rounded-xl bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
                            <Image src={ipo_image} alt='ipos' className='w-[50%]' width={180} />
                            <h6 className='font-poppins text-lg text-inherit mt-6'>IPOs</h6>
                        </div>
                    </div>

                    <div className="mx-2 inline-block">
                        <div className='w-[240px] py-3 rounded-xl bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
                            <Image src={mutual_fund_image} alt='mutual funds' className='w-[50%]' width={180} />
                            <h6 className='font-poppins text-lg text-inherit mt-6'>Mutual Funds</h6>
                        </div>
                    </div>

                    <div className="mx-2 inline-block">
                        <div className='w-[240px] py-3 rounded-xl bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
                            <Image src={block_image} alt='block trade' className='w-[50%]' width={180} />
                            <h6 className='font-poppins text-lg text-inherit mt-6'>Block Trade</h6>
                        </div>
                    </div>

                    <div className="mx-2 inline-block">
                        <div className='w-[240px] py-3 rounded-xl bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
                            <Image src={sme_image} alt='sme/atb' className='w-[50%]' width={180} />
                            <h6 className='font-poppins text-lg text-inherit mt-6'>SME/ATB</h6>
                        </div>
                    </div>

                    <div className="mx-2 inline-block">
                        <div className='w-[240px] py-3 rounded-xl bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 transition flex justify-center items-center flex-col group '>
                            <Image src={bond_image} alt='govt. securities' className='w-[50%]' width={180} />
                            <h6 className='font-poppins text-lg text-inherit mt-6'>Govt. Securities</h6>
                        </div>
                    </div>
                </Slider>
            </motion.div>
        </>
    )
}

export default OurServiceCard