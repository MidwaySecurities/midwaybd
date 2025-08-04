import Link from 'next/link'
import React from 'react'

const FormDownload = () => {
    return (
        <div>
            <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1286135119.jpg)] h-[350px] bg-bg-cover bg-center' >
                
            </div>
            <div>
                <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>BO Account</h1>
                <div className='grid grid-cols-1 gap-4 px-8'>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>BO Account Opening Form</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Authorization Form</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change সঞ্চয় to Active</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change Address</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change Mobile Number</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change Email Address</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change সঞ্চয় to Active</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change Address</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change Mobile Number</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change Email Address</Link></button>
                </div>
            </div>

            <div>
                <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>Link BO Account</h1>
                <div className='grid grid-cols-1 gap-4 px-8'>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>DPA 6 (CDBL)</Link></button>
                </div>
            </div>

            <div>
                <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>Accounts</h1>
                <div className='grid grid-cols-1 gap-4 px-8'>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>
                        Change Bank Account</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Cheque Requisition Form</Link></button>
                </div>
            </div>

            <div>
                <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>IPO</h1>
                <div className='grid grid-cols-1 gap-4 px-8'>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>IPO Membership Club Form</Link></button>
                </div>
            </div>

            <div>
                <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>DSE Mobile</h1>
                <div className='grid grid-cols-1 gap-4 px-8'>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>DSE Mobile App Registration</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>DSE Mobile User Manual</Link></button>
                </div>
            </div>

            <div>
                <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>Corporate</h1>
                <div className='grid grid-cols-1 gap-4 px-8'>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Acquisition Cost Declaration</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Declaration of Sponsors/Directors</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Declearation of Placement Holder</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Change Commission</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Share Transfer (Gift)</Link></button>
                    <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Share Transfer (non Gift)</Link></button>
                </div>
            </div>
        </div>
    )
}

export default FormDownload