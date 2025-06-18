import Image from 'next/image'
import React from 'react'

const PaymentMethod = () => {
  return (
    <div className='p-6 py-24 bg-foreground text-white rounded-lg shadow-md flex flex-col items-center justify-center h-full border'>
        <h1 className='text-xl font-bold mb-14'>Payment methods.</h1>
        <div className='flex flex-col items-center justify-center w-full gap-12'>
            <Image src = 'https://www.indonez.com/html-demo/liquid/img/in-liquid-payment-1.svg' alt='Payment Method' width={167} height={55} className='w-[36%]' />
            <Image src = 'https://www.indonez.com/html-demo/liquid/img/in-liquid-payment-2.svg' alt='Payment Method' width={167} height={55} className='w-[36%]' />
            <Image src = 'https://www.indonez.com/html-demo/liquid/img/in-liquid-payment-3.svg' alt='Payment Method' width={167} height={55} className='w-[36%]' />
            <Image src = 'https://www.indonez.com/html-demo/liquid/img/in-liquid-payment-4.svg' alt='Payment Method' width={167} height={55} className='w-[36%]' />
            <Image src = 'https://www.indonez.com/html-demo/liquid/img/in-liquid-payment-5.svg' alt='Payment Method' width={167} height={55} className='w-[36%]' />
        </div>
    </div>
  )
}

export default PaymentMethod