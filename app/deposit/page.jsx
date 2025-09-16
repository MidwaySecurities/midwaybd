'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import DepositTab from '../components/deposit/depositTab'
import DepositForm from '../components/depositForm'
import MobileDeposit from '../components/mobileDeposit'
import CreditCardDeposit from '../components/creditCardDeposit'

const Deposit = ({ searchParams }) => {

    const tabs = [
        {
            id: "online", label: "Navigating the Evolving Bangladesh Capital Market: Key Trends for Q3 2025", content: <>
                <div>
                    <div>Dear <strong>Midway Client</strong> Select any of the Banks  below to deposit into your <strong>BO account.</strong> Please include your <strong>Midway Client Code</strong> in the <strong>Reference/Remarks/Comments</strong> sections of your Bank.</div>
                    <div className='mt-2 mb-2 font-bold'>
                        Midway Securities Limited<br />
                        The City Bank (Principal Office Branch)<br />
                        A/C: 3101093011001, Routing: 225275357
                    </div>
                    <div className='mt-2 mb-2 font-bold'>
                        Midway Securities Limited<br />
                        Dutch Bangla Bank (Local Office Branch)<br />
                        A/C: 1011200006385, Routing: 090273889
                    </div>
                    <p>Want to deposit now?</p>

                    <DepositForm />
                </div>
            </>, createdAt: "2025-08-01"
        },
        {
            id: "mobile", label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025", content: <>
                <div>Dear <strong>Midway Client</strong> Select any of the <strong>Mobile Money</strong> below to deposit into your <strong>BO account.</strong> Please include your <strong>Midway Client Code</strong> in the <strong>Reference/Remarks/Comments</strong> sections of your bKash, Nagad or Rocket account.</div>
                <div className='ml-4 mt-2 mb-2`'>
                    <ul className='list-disc mt-2 ml-4'>
                        <li>bKash Account No: <strong>01845222333</strong></li>
                        <li>Nagad Account No: <strong>01776106410</strong></li>
                        <li>Rocket Account No: <strong>017761064101</strong></li>
                        <li>Reference : <strong>Your <strong>Midway Client Code</strong></strong></li>
                        <li>Counter no : <strong>01</strong></li>
                    </ul>
                </div>
                <div className='mt-4'>
                    <ul>
                        <li>Email: <strong>accounts@midwaybd.com</strong></li>
                        <li>Phone: <strong>09609 100 142</strong></li>
                        <li>​Facebook: <strong><Link href={`http://m.me/midwaytrec142`} target='_blank'>Facebook</Link></strong></li>
                    </ul>
                </div>
                <p>Want to deposit now?</p>
                <MobileDeposit />
            </>, createdAt: "2025-08-02"
        },
        {
            id: "credit", label: "DSE Market Update – August 2025", content: <>
                <div>
                    <h1 className='text-xl font-semibold mb-2'>Credit Card fees:</h1>
                    <ul>
                        <li><strong>2.2%</strong> for <strong>Visa, MasterCard</strong> other payment channels</li>
                        <li><strong>3.5% for <strong>American Express</strong></strong></li>
                    </ul>
                </div>
                <p>Want to deposit now?</p>
                <CreditCardDeposit />
            </>, createdAt: "2025-08-03"
        },
    ];
    const activeCity = searchParams.tab?.toLowerCase() || "Hello";
    const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];
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
            <div className='m-4'>
                <DepositTab activeCity={activeTab.id} />
                <div className='mt-4 p-4 border border-gray-300 rounded-lg'>
                    {activeTab.content}
                </div>
            </div>
            <div className='mt-8 mb-8 mx-4'>
                <img src='/images/deposit/sslcommerz-pay-with-logo-all-size-05_orig.png' alt='sslcommerz' className='w-full mx-auto' />
            </div>
            <div className='mt-8 mb-8 mx-4'>
                <div className='mt-8 flex justify-center'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/KkBCBNHRL2A?si=v4UhTaSbcuCBIagM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>

        </div>
    )
}

export default Deposit