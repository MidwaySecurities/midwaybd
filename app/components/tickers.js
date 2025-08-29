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
    //                             <span class="flex justify-center w-16 bg-qtp_btn_bg_color items-center text-white mx-2 rounded-md">${ticker.price}</span>
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
                                <Image src={`https://platform.biniyog.com.bd/assets/logo/company/${item.MKISTAT_INSTRUMENT_CODE}.png`} alt='brac bank' width={45} height={25} className='w-[45px] px-2' />
                                <span className='flex gap-2 justify-center w-24 bg-qtp_btn_bg_color items-center text-white mx-0 rounded-md'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 512 512"
                                        className={`${(Number(item.MKISTAT_PUB_LAST_TRADED_PRICE) - Number(item.MKISTAT_YDAY_CLOSE_PRICE) > 0 ? '' : 'rotate-180')}`}
                                    >
                                        <path
                                            fill="white"
                                            d="M269 113.563c8.269 4.692 14.852 12.14 21.515 18.805l2.809 2.797q3.829 3.816 7.653 7.637 4.137 4.13 8.278 8.256 9.974 9.947 19.94 19.902l9.401 9.386a94442 94442 0 0 1 39.345 39.3l2.032 2.03a41541 41541 0 0 0 32.64 32.574 35440 35440 0 0 1 33.535 33.48q9.401 9.402 18.82 18.784a7679 7679 0 0 1 16.008 15.989q4.076 4.084 8.168 8.15c2.96 2.94 5.905 5.895 8.849 8.852l2.613 2.58c8.287 8.377 11.697 15.908 11.709 27.724-.172 9.002-3.352 14.855-9.456 21.402-6.837 6.578-13.234 9.1-22.819 9.046-1.181.006-1.181.006-2.386.01-2.644.01-5.287.005-7.93 0l-5.738.014c-5.26.012-10.519.012-15.778.01-5.671 0-11.342.01-17.013.02-11.112.017-22.223.022-33.335.023q-13.545.002-27.091.012a87226 87226 0 0 1-76.787.025h-6.276q-32.558-.002-65.114.04-36.579.048-73.158.047c-12.912-.001-25.823.005-38.735.026q-16.489.029-32.977.009c-5.61-.007-11.219-.007-16.828.01a2385 2385 0 0 1-15.405-.004q-2.786-.005-5.572.012c-12.553.07-21.633-.8-31.128-9.652-7.16-7.44-9.207-14.55-9.153-24.814.375-14.495 11.095-22.925 20.732-32.56l2.797-2.809q3.816-3.829 7.637-7.653 4.13-4.137 8.256-8.278 9.947-9.974 19.902-19.94l9.386-9.401a94442 94442 0 0 1 39.3-39.345l2.03-2.032a41541 41541 0 0 0 32.574-32.64 35440 35440 0 0 1 33.48-33.535q9.402-9.401 18.784-18.82a7679 7679 0 0 1 15.989-16.008q4.084-4.076 8.15-8.168c2.94-2.96 5.895-5.905 8.852-8.849l2.58-2.613c10.222-10.112 24.82-15.618 38.915-9.832"
                                        />
                                    </svg>
                                    <p className={`font-bold ${(Number(item.MKISTAT_PUB_LAST_TRADED_PRICE) - Number(item.MKISTAT_YDAY_CLOSE_PRICE) > 0 ? 'text-green-500' : 'text-red-500')}`}>{Number(item.MKISTAT_PUB_LAST_TRADED_PRICE).toFixed(2)}</p></span>
                            </div>
                        )
                    })}
                </div>

                <div aria-hidden className={`${style.group}`}>
                    {refineData.map((item, index) => {
                        return (
                            <div key={index} className={`${style.card}`}>
                                <Image src={`https://platform.biniyog.com.bd/assets/logo/company/${item.MKISTAT_INSTRUMENT_CODE}.png`} alt='brac bank' width={45} height={25} className='w-[45px] px-2' />
                                <span className='flex gap-2 justify-center w-24 bg-qtp_btn_bg_color items-center text-white mx-0 rounded-md '>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 512 512"
                                        className={`${(Number(item.MKISTAT_PUB_LAST_TRADED_PRICE) - Number(item.MKISTAT_YDAY_CLOSE_PRICE) > 0 ? '' : 'rotate-180')}`}
                                    >
                                        <path
                                            fill="white"
                                            d="M269 113.563c8.269 4.692 14.852 12.14 21.515 18.805l2.809 2.797q3.829 3.816 7.653 7.637 4.137 4.13 8.278 8.256 9.974 9.947 19.94 19.902l9.401 9.386a94442 94442 0 0 1 39.345 39.3l2.032 2.03a41541 41541 0 0 0 32.64 32.574 35440 35440 0 0 1 33.535 33.48q9.401 9.402 18.82 18.784a7679 7679 0 0 1 16.008 15.989q4.076 4.084 8.168 8.15c2.96 2.94 5.905 5.895 8.849 8.852l2.613 2.58c8.287 8.377 11.697 15.908 11.709 27.724-.172 9.002-3.352 14.855-9.456 21.402-6.837 6.578-13.234 9.1-22.819 9.046-1.181.006-1.181.006-2.386.01-2.644.01-5.287.005-7.93 0l-5.738.014c-5.26.012-10.519.012-15.778.01-5.671 0-11.342.01-17.013.02-11.112.017-22.223.022-33.335.023q-13.545.002-27.091.012a87226 87226 0 0 1-76.787.025h-6.276q-32.558-.002-65.114.04-36.579.048-73.158.047c-12.912-.001-25.823.005-38.735.026q-16.489.029-32.977.009c-5.61-.007-11.219-.007-16.828.01a2385 2385 0 0 1-15.405-.004q-2.786-.005-5.572.012c-12.553.07-21.633-.8-31.128-9.652-7.16-7.44-9.207-14.55-9.153-24.814.375-14.495 11.095-22.925 20.732-32.56l2.797-2.809q3.816-3.829 7.637-7.653 4.13-4.137 8.256-8.278 9.947-9.974 19.902-19.94l9.386-9.401a94442 94442 0 0 1 39.3-39.345l2.03-2.032a41541 41541 0 0 0 32.574-32.64 35440 35440 0 0 1 33.48-33.535q9.402-9.401 18.784-18.82a7679 7679 0 0 1 15.989-16.008q4.084-4.076 8.15-8.168c2.94-2.96 5.895-5.905 8.852-8.849l2.58-2.613c10.222-10.112 24.82-15.618 38.915-9.832"
                                        />
                                    </svg>
                                    <p className={`font-bold ${(Number(item.MKISTAT_PUB_LAST_TRADED_PRICE) - Number(item.MKISTAT_YDAY_CLOSE_PRICE) > 0 ? 'text-green-500' : 'text-red-500')}`}>{Number(item.MKISTAT_PUB_LAST_TRADED_PRICE).toFixed(2)}</p></span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tickers