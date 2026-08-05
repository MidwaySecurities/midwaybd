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

const services = [
    { image: stock_image, alt: 'stocks', label: 'Stocks' },
    { image: ipo_image, alt: 'ipos', label: 'IPOs' },
    { image: mutual_fund_image, alt: 'mutual funds', label: 'Mutual Funds' },
    { image: block_image, alt: 'block trade', label: 'Block Trade' },
    { image: sme_image, alt: 'sme/atb', label: 'SME/ATB' },
    { image: bond_image, alt: 'govt. securities', label: 'Govt. Securities' },
]

const OurServiceCard = () => {

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 3200,
        pauseOnHover: true,
        speed: 600,
    };

    return (
        <>
            <style jsx global>{`
                #service-slider .slick-dots {
                    position: static;
                    margin-top: 1.75rem;
                }
                #service-slider .slick-dots li {
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                }
                #service-slider .slick-dots li button {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                }
                #service-slider .slick-dots li button:before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background: #cbd5e1;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                #service-slider .slick-dots li.slick-active button:before {
                    background: #f5b301;
                    width: 22px;
                    border-radius: 9999px;
                    transform: translateX(-7px);
                }
            `}</style>

            <motion.div className="my-10 overflow-hidden lg:hidden text-gray-700">
                <div className="flex justify-center flex-col px-6" id="service">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl sm:text-3xl font-bold py-0 my-0 text-white text-center uppercase tracking-wide leading-snug"
                    >
                        One App, Multiple Solutions, One App!
                    </motion.h1>

                    <div className="w-16 h-1 bg-[#f5b301] rounded-full mx-auto mt-4"></div>

                    <div className="flex justify-center py-7">
                        <Link
                            href="https://portal.midwaybd.com/bo/portal-login"
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-[#004990] text-white text-[16px] font-semibold no-underline py-3 px-8 rounded-full shadow-lg shadow-blue-900/30 active:scale-95 transition-transform duration-200"
                        >
                            Open BO Account
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div id="service-slider">
                    <Slider {...settings}>
                        {services.map((service, index) => (
                            <div key={service.label} className="mx-2.5 inline-block">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.06 }}
                                    className="w-[220px] py-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-100 duration-300 flex justify-center items-center flex-col group cursor-pointer"
                                >
                                    <div className="w-20 h-20 rounded-full bg-[#F0F6FF] flex items-center justify-center group-hover:bg-[#DBEAFE] transition-colors duration-300">
                                        <Image src={service.image} alt={service.alt} className="w-10 h-10 object-contain" width={40} />
                                    </div>
                                    <h6 className="font-poppins text-[15px] font-medium text-gray-800 mt-5 group-hover:text-[#004990] transition-colors duration-300">
                                        {service.label}
                                    </h6>
                                </motion.div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </motion.div>
        </>
    )
}

export default OurServiceCard