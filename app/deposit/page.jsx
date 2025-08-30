import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import DepositTab from '../components/deposit/depositTab'
const tabs = [
    { id: "online", label: "Navigating the Evolving Bangladesh Capital Market: Key Trends for Q3 2025", content: "In this post, we explore the latest movements in Bangladesh’s capital market as of Q3 2025. Covering top-performing brokerage firms, emerging investor preferences, and innovative service models like mobile trading and digital onboarding, this article offers actionable insights for investors, analysts, and industry stakeholders—backed by data on turnover rankings and technology-driven changes in brokerage offerings.", createdAt: "2025-08-01" },
    { id: "mobile", label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025", content: "Stay ahead of the curve with our in-depth research on Bangladesh’s capital market. This report highlights the latest market trends, sector performance, and policy changes shaping investment opportunities in 2025. Backed by data and expert analysis, it provides valuable guidance for retail and institutional investors to make informed trading decisions.", createdAt: "2025-08-02" },
    { id: "credit", label: "DSE Market Update – August 2025", content: "Daily highlights of trading activity from Dhaka and Chittagong Stock Exchanges, including index performance, top gainers, and turnover leaders.", createdAt: "2025-08-03" },
];
const Deposit =  ({searchParams}) => {
    console.log(searchParams)
    const activeCity = searchParams.tab?.toLowerCase() || "Hello";
    const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];
    console.log('haha',activeCity)
    return (
        <div className='pt-4'>
            <div className={`bg-[url('/images/deposit/deposit.png')]  bg-contain bg-no-repeat bg-center h-[300px] flex flex-col gap-3 items-center justify-center relative`}>
                {/* <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Bkash, Nagad, Rocket</button>
                <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Credit Card</button>
                <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'><Link href="tel:09609100142">09609100142</Link></button> */}
            </div>
            <img src={`/images/deposit/deposit.png`} width={100} height={100} className='w-screen h-auto' alt='deposit' />
            {/* <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1201520934.png)] bg-cover bg-center h-[200px] flex flex-col gap-3 items-center justify-center relative'>
                <div className='flex justify-center items-center flex-col gap-4 bg-[#3387a24d] p-4 rounded-lg mx-4'>
                    <h1 className='text-2xl text-center font-semibold text-white'>Make your deposits using Midway Portal</h1>
                    <Link href={`https://portal.midwaybd.com/register`} target='_blank'><button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Register</button></Link>
                </div>
            </div>  */}
            <div className='mt-8 mb-8 mx-4'>
                <h1 className='text-2xl mb-3'>FUND DEPOSIT</h1>
                <p className='mb-6'><Link href='https://portal.midwaybd.com/' target='_blank' className='underline text-qtp_btn_bg_color'>মিডওয়ে পোর্টাল</Link> ব্যবহার করে ডিপোজিট করুন</p>
                <p>For bKash, Nagad, Rocket: Click here</p>
                <div>
                    <form>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block mb-2'>Name</label>
                            <input type="text" id="name" name="name" className='border border-gray-300 p-2 w-full' required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="amount" className='block mb-2'>Deposit Amount</label>
                            <input type="number" id="amount" name="amount" className='border border-gray-300 p-2 w-full' required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="method" className='block mb-2'>Payment Method</label>
                            <select id="method" name="method" className='border border-gray-300 p-2 w-full' required>
                                <option value="">Select Method</option>
                                <option value="bkash">bKash</option>
                                <option value="nagad">Nagad</option>
                                <option value="rocket">Rocket</option>
                            </select>
                        </div>
                        <button type="submit" className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Submit Deposit</button>
                    </form>
                </div>
            </div>
            <div className='m-4'>
                <DepositTab activeCity={activeTab.id} />
                <div>
                    <Suspense fallback = 'Hello world'>
                        {activeTab.label}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Deposit