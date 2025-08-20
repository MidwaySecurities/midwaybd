// 'use client'
import Image from 'next/image'
// import React, { useEffect } from 'react'
import style from './tickers.module.css';
// import parse from 'html-dom-parser';
const Tickers = async () => {

    // useEffect(() => {
    //     const data = fetch(`https://www.dsebd.org/latest_share_price_scroll_by_value.php`)
    //         .then(res => res.text())
    //         .then(data => {
    //             const parser = new DOMParser();
    //             const doc = parser.parseFromString(data, 'text/html');
    //             console.log('haha ', doc);
    //             const table = doc.querySelector('.table');
    //             const rows = table.querySelectorAll('tr');
    //             const tickers = Array.from(rows).map(row => {
    //                 const cells = row.querySelectorAll('td');
    //                 if (cells.length > 0) {
    //                     return {
    //                         name: cells[0].textContent.trim(),
    //                         price: cells[1].textContent.trim(),
    //                     };
    //                 }
    //                 return null;
    //             }).filter(ticker => ticker !== null);
    //             console.log('tickers ', tickers);
    //             const tickerElements = tickers.map(ticker => {
    //                 return `<div class="${style.card}">
    //                             <span>${ticker.name}</span>
    //                             <span class="flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md">${ticker.price}</span>
    //                         </div>`;
    //             }).join('');
    //             const tickerGroup = `<div class="${style.group}">${tickerElements}</div>`;
    //             const tickerContainer = document.querySelector(`.${style.carousel}`);
    //             tickerContainer.innerHTML = tickerGroup;
    //             const groupElements = document.querySelectorAll(`.${style.group}`);
    //             groupElements.forEach(group => {
    //                 group.addEventListener('click', () => {
    //                     group.classList.toggle(`${style.active}`);
    //                 });
    //             });
    //             const cards = document.querySelectorAll(`.${style.card}`);
    //             cards.forEach(card => {
    //                 card.addEventListener('click', () => {
    //                     card.classList.toggle(`${style.active}`);
    //                 });
    //             });
    //             const carousel = document.querySelector(`.${style.carousel}`);
    //             carousel.addEventListener('click', () => {
    //                 carousel.classList.toggle(`${style.active}`);
    //             });
    //             const activeGroup = document.querySelector(`.${style.active}`);
    //             if (activeGroup) {
    //                 activeGroup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    //             }
    //         })
    // }, []);

    const response = await fetch(`https://platform.biniyog.com.bd/core/sharemarket/getPriceDataTableByAllSector`);
    const data = await response.json();
    const refineData = data.filter(item => {
        if (item.MKISTAT_INSTRUMENT_CODE === 'BRACBANK' || item.MKISTAT_INSTRUMENT_CODE === 'SQURPHARMA' || item.MKISTAT_INSTRUMENT_CODE === 'GP' || item.MKISTAT_INSTRUMENT_CODE === 'MARICO') {
            return true;
        }
    })
    console.log('refineData ', refineData);
    return (
        <div className='uppercase text-sm'>
            <div className={`${style.carousel} text-black`}>
                <div className={`${style.group}`}>
                    {refineData.map((item, index) => {
                        return (
                            <div key={index} className={`${style.card}`}>
                                {/* <Image src={`https://www.bracbank.com/client_end/img/bb/Bracbank-sm-logo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' /> */}
                                <h1>{item.MKISTAT_INSTRUMENT_CODE}</h1>

                                <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>{Number(item.MKISTAT_PUB_LAST_TRADED_PRICE).toFixed(2)}</span>
                            </div>
                        )
                    })}
                    {/* <div className={`${style.card}`}>
                        <Image src={`https://www.bracbank.com/client_end/img/bb/Bracbank-sm-logo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>100000</span></div>
                    <div className={`${style.card}`}>
                        <Image src={`https://www.squarepharma.com.bd/images/squarelogo.png`} alt='brac bank' height={50} width={50} className='w-[80px] bg-black' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>300000</span></div>
                    <div className={`${style.card}`}>{refineData[0].MKISTAT_INSTRUMENT_CODE}<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>150000</span></div>
                    <div className={`${style.card}`}>{refineData[3].MKISTAT_INSTRUMENT_CODE}<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>{Number(refineData[3].MKISTAT_HIGH_PRICE).toFixed(2)}</span></div> */}
                </div>

                <div aria-hidden className={`${style.group}`}>
                    {/* <div className={`${style.card}`}>
                        <Image src={`https://www.bracbank.com/client_end/img/bb/Bracbank-sm-logo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>100000</span></div>
                    <div className={`${style.card}`}>
                        <Image src={`https://www.squarepharma.com.bd/images/squarelogo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' />
                        <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>300000</span></div>
                    <div className={`${style.card}`}>{refineData[0].MKISTAT_INSTRUMENT_CODE}<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>150000</span></div>
                    <div className={`${style.card}`}>{refineData[3].MKISTAT_INSTRUMENT_CODE}<span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>{Number(refineData[3].MKISTAT_HIGH_PRICE).toFixed(2)}</span></div> */}
                    {refineData.map((item, index) => {
                        return (
                            <div key={index} className={`${style.card}`}>
                                {/* <Image src={`https://www.bracbank.com/client_end/img/bb/Bracbank-sm-logo.png`} alt='brac bank' height={50} width={50} className='w-[80px]' /> */}
                                <h1>{item.MKISTAT_INSTRUMENT_CODE}</h1>
                                <span className='flex justify-center w-16 bg-qtp_btn_bg_color text-white mx-2 rounded-md'>{Number(item.MKISTAT_PUB_LAST_TRADED_PRICE).toFixed(2)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tickers