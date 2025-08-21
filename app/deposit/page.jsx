import Link from 'next/link'
import React from 'react'

const Deposit = () => {
    return (
        <div>
            <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/883223583.jpg)] bg-cover bg-center h-[300px] flex flex-col gap-3 items-center justify-center relative'>
                <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Bkash, Nagad, Rocket</button>
                <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Credit Card</button>
                <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'><Link href="tel:09609100142">09609100142</Link></button>
            </div>
            <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1201520934.png)] bg-cover bg-center h-[200px] flex flex-col gap-3 items-center justify-center relative'>
                <div className='flex justify-center items-center flex-col gap-4 bg-[#3387a24d] p-4 rounded-lg mx-4'>
                    <h1 className='text-2xl text-center font-semibold text-white'>Make your deposits using Midway Portal</h1>
                    <Link href={`https://portal.midwaybd.com/register`} target='_blank'><button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Register</button></Link>
                </div>
            </div>
            <div className='mt-8 mb-8 mx-4'>
                <h1 className='text-2xl mb-3'>FUND DePOSIT</h1>
                <p className='mb-6'>মিডওয়ে পোর্টাল ব্যবহার করে ডিপোজিট করুন</p>
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
        </div>
    )
}

export default Deposit