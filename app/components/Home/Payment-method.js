import Image from 'next/image'
import React from 'react'

const PaymentMethod = () => {
  return (
    <div className='p-6 py-24 bg-[url(/images/home/payment-image/bg-image.png)] bg-bottom rounded-lg shadow-md flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold mb-14'>Payment methods.</h1>
        <div className='flex flex-col items-center justify-center w-full gap-12'>
            <Image src = "/images/home/payment-image/bkash.webp" width={167} height={55} className='w-[36%]' alt='bkash' />
            <Image src = "/images/home/payment-image/rocket.png" width={167} height={55} className='w-[36%]' alt='bkash' />
            <Image src = "/images/home/payment-image/visa-card.png" width={167} height={55} className='w-[36%]' alt='bkash' />
        </div>
    </div>
  )
}

export default PaymentMethod