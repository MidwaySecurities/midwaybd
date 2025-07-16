import Image from 'next/image'
import React from 'react'
import LinkBo from '../../public/images/link-bo/Link-BO-2.jpg'
import Link from 'next/link'
const LinkBoAccount = () => {
  return (
    <div>
      <div>
        <img className='w-full' src={`images/link-bo/Link-BO-2.jpg`} alt='Link BO account' width={100} height={100} />
      </div>
      <p className='px-4 mt-4'>
        You can easily transfer your BO account from any Dhaka Stock Exchange (DSE) or Chittagong Stock Exchange (CSE) through a Free Link BO Account. You do not need to sell your shares.

        আপনি খুব সহজেই যেকোন স্টক এক্সচেঞ্জ, যেমন ঢাকা স্টক এক্সচেঞ্জ (ডিএসই) বা চট্টগ্রাম স্টক এক্সচেঞ্জ (সিএসই), থেকে  লিংক বিও অ্যাকাউন্টের মাধ্যমে (বিনামূল্যে) আপনার বিও অ্যাকাউন্টের শেয়ার ট্রান্সফার করতে পারেন। এর জন্য আপনার শেয়ার বিক্রি করার প্রয়োজন নাই। আপনি খুব সহজে আমাদের মাধ্যমে এই সেবাটা গ্রহন করতে পারবেন।
      </p>

      <div className='p-4'>
        <Link className='inline-block p-2 rounded-lg bg-qtp_btn_bg_color text-white' href = {`https://portal.midwaybd.com/bo/portal-login`} target='_blank'>Link Account (​লিংক অ্যাকাউন্ট)</Link>
      </div>
      <div className='h-96'>

      </div>
    </div>
  )
}

export default LinkBoAccount