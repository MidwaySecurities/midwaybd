import Link from 'next/link'
import React from 'react'

const Deposit = () => {
  return (
    <div>
        <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/883223583.jpg)] bg-cover bg-center h-[300px] flex flex-col gap-3 items-center justify-center relative'>
            <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Bkash, Nagad, Rocket</button>
            <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Credit Card</button>
            <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'><Link href = "tel:09609100142">09609100142</Link></button>
        </div>
        <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1201520934.png)] bg-cover bg-center h-[200px] flex flex-col gap-3 items-center justify-center relative'>
            <div className='flex justify-center items-center flex-col gap-4'>
                <h1 className='text-2xl text-center font-semibold text-white'>Make your deposits using Midway Portal</h1>
                <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Register</button>
            </div>
        </div>
    </div>
  )
}

export default Deposit