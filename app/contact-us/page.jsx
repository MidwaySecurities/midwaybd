import Link from 'next/link'
import React from 'react'

const ContactUs = () => {
    return (
        <div>
            <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/338544438.jpg)] h-[350px] bg-bg-cover bg-center'>

            </div>
            <div className='pt-8 px-2 text-gray-700'>
                <div>
                    <h1 className='font-semibold text-2xl uppercase mb-4'>Contact Us</h1>
                    <p className='font-semibold text-sm'>Office time: Sunday to Thursday 9:30 am to 5:30​ pm</p>
                    <p><span className='font-bold'>Trading Hotline:</span> 09609 100 142, +88 01874444815, +88 0241040007, +88 0241040008​</p>
                    <p><span className='font-bold'>Email:</span> <span className='text-[#E7B280]'>info@midwaybd.com​</span></p>
                    <p><span className='font-bold'>IPO Hotline:</span>09609 100 142​</p>
                    <p><span className='font-bold'>Facebook:</span> <Link href="www.facebook.com/midwaytrec142" className='text-[#E7B280]'>www.facebook.com/midwaytrec142</Link></p>
                    <p><span className='font-bold'>​Accounts: </span><span className='text-[#E7B280]'>09609 100 142</span></p>
                    <p><span className='font-bold'>DSE Mobile App: </span>09609 100 142, +88 01874444816</p>
                </div>

                <div className='mt-10 font-bold'>
                    <ul>
                        <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Head Office @ Motijheel</Link></li>
                        <li><Link href={'/our-branches'} className='text-[#a88d2e]'>Swantex @ Motijheel</Link></li>
                        <li><Link href={`/our-branches`} className='text-[#a88d2e]'>DSE Tower @ Nikunja 2</Link></li>
                        <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Jabbar Tower @ Gulshan</Link></li>
                        <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Chowk Bazar Office</Link></li>
                        <li><Link href={`/our-branches`} className='text-[#a88d2e]'>HM Plaza @ Uttara</Link></li>
                        <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Comilla Office</Link></li>
                    </ul>
                </div>
            </div>

            <div>
                <h1 className='font-semibold text-2xl uppercase mt-8 px-2'>Contact Form</h1>
                <form className='px-2'>
                    <div className='mb-4'>
                        <label className='block mb-2' htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" className='w-full p-2 border border-gray-300 rounded' required />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2' htmlFor="phone">Phone:</label>
                        <input type="telephone" id="phone" name="phone" className='w-full p-2 border border-gray-300 rounded' required />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2' htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" className='w-full p-2 border border-gray-300 rounded' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2' htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" className='w-full p-2 border border-gray-300 rounded' required></textarea>
                    </div>
                    <button type="submit" className='bg-[#a88d2e] text-white px-4 py-2 rounded'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs