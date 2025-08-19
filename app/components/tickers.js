// 'use client'
import Image from 'next/image'
import React from 'react'
import style from './tickers.module.css';
import parse from 'html-dom-parser';
const Tickers = () => {
    // const data = fetch(`https://www.dsebd.org/latest_share_price_scroll_by_value.php`)
    //     .then(res => res.text())
    //     .then(data => {
    //         const parsedData = parse(data);
    //         const table = parsedData.find(element => element.name === 'table' && element.attribs.class === 'table table-bordered table-striped table-hover');
    //         if (!table) return [];
    //         const rows = table.children.filter(child => child.name === 'tr');
    //         console.log('my Rows ', rows)
    //         return rows.map(row => {
    //             const cells = row.children.filter(cell => cell.name === 'td');
    //             if (cells.length < 2) return null;
    //             return {
    //                 name: cells[0].children[0].data,
    //                 price: cells[1].children[0].data
    //             };
    //         }).filter(item => item !== null);
    //     })
    return (
        <div className='uppercase text-sm'>
            <div className={`${style.carousel} text-black`}>
                <div className={`${style.group}`}>
                    <div className={`${style.card}`}>
                        <Image src={`https://www.bracbank.com/client_end/img/bb/Bracbank-sm-logo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>100000</span></div>
                    <div className={`${style.card}`}>
                        <Image src={`https://www.squarepharma.com.bd/images/squarelogo.png`} alt='brac bank' height={50} width={50} className='w-[80px] bg-black' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>300000</span></div>
                    <div className={`${style.card}`}>Grameen Phone<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>150000</span></div>
                    <div className={`${style.card}`}>Marico<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>230000</span></div>
                </div>

                <div aria-hidden className={`${style.group}`}>
                    <div className={`${style.card}`}>
                        <Image src={`https://www.bracbank.com/client_end/img/bb/Bracbank-sm-logo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>100000</span></div>
                    <div className={`${style.card}`}>
                        <Image src={`https://www.squarepharma.com.bd/images/squarelogo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>300000</span></div>
                    <div className={`${style.card}`}>Grameen Phone<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>150000</span></div>
                    <div className={`${style.card}`}>Marico<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>230000</span></div>
                </div>
            </div>
        </div>
    )
}

export default Tickers