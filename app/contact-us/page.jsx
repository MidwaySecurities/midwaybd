import Link from 'next/link'
import React from 'react'

const ContactUs = () => {
    return (
        <div className='pt-8 px-2'>
            <div>
                <h1 className='font-semibold text-xl uppercase mb-4'>Contact Us</h1>
                <p className='font-semibold text-sm'>Office time: Sunday to Thursday 9:30 am to 5:30​ pm</p>
                <p><span className='font-bold'>Trading Hotline:</span> 09609 100 142, +88 01874444815, +88 0241040007, +88 0241040008​</p>
                <p><span className='font-bold'>Email:</span> info@midwaybd.com​</p>
                <p><span className='font-bold'>IPO Hotline:</span>09609 100 142​</p>
                <p><span className='font-bold'>Facebook:</span><Link href="www.facebook.com/midwaytrec142">www.facebook.com/midwaytrec142</Link></p>
                <p><span className='font-bold'>​Accounts: </span>09609 100 142</p>
                <p><span className='font-bold'>DSE Mobile App: </span>09609 100 142, +88 01874444816</p>
            </div>

            <div className='mt-8'>
                <ul>
                    <li><Link href={`/our-branches`}>Head Office @ Motijheel</Link></li>
                    <li><Link href={'/our-branches'}>Swantex @ Motijheel</Link></li>
                    <li><Link href={`/our-branches`}>DSE Tower @ Nikunja 2</Link></li>
                    <li>Jabbar Tower @ Gulshan</li>
                    <li>Chowk Bazar Office</li>
                    <li>HM Plaza @ Uttara</li>
                    <li>Comilla Office</li>
                </ul>
            </div>
        </div>
    )
}

export default ContactUs