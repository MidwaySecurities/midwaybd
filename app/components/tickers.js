import Image from 'next/image'
import React from 'react'
import style from './tickers.module.css';
const Tickers = () => {
    return (
        <div className=''>
            <div className={`${style.carousel} text-black`}>
                <div className={`${style.group}`}>
                    <div className={`${style.card}`}>Brac Bank<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>100000</span></div>
                    <div className={`${style.card}`}>Square Pharma<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>300000</span></div>
                    <div className={`${style.card}`}>Grameen Phone<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>150000</span></div>
                    <div className={`${style.card}`}>Marico<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>230000</span></div>
                </div>

                <div aria-hidden className={`${style.group}`}>
                    <div className={`${style.card}`}>Brac Bank<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>100000</span></div>
                    <div className={`${style.card}`}>Square Pharma<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>300000</span></div>
                    <div className={`${style.card}`}>Grameen Phone<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>150000</span></div>
                    <div className={`${style.card}`}>Marico<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>230000</span></div>
                </div>
            </div>
        </div>
    )
}

export default Tickers