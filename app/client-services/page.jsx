import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ClientServices = () => {
    return (
        <div>
            <div className='p-2'>
                <h1 className='text-2xl font-semibold mb-8'>QuickTrade Pro mobile app</h1>
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/quicktrade-pro-reel-1-facebook-ad.jpg?1737528553`} className='w-full pb-6' width={500} height={500} />
                <p>
                    With QuickTrade Pro Mobile App (for Android and iPhone) you can Buy or Sell from the phone, create your Portfolio, track individual stocks, create Alerts and Watchlists, get the latest Exchange News and many more.
                    Download the app from the <Link href = "" className='font-bold text-[#A88D2E]'>Apple App Store</Link> by clicking here and from the Android Play Store by clicking here.
                    We also have a desktop version for clients who wish to trade over their own computers.
                </p>
                <div>
                    <ol className='list-disc ml-12 mt-4'>
                        <li>Download the app from the Apple App Store by clicking here and from the <Link href = "" className='font-bold text-[#A88D2E]'>Android Play Store</Link> by clicking here. </li>
                        <li>We also have a desktop version for clients who wish to trade over their own computers.</li>
                    </ol>
                </div>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>​MIDWAY PORTAL</h1>
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-4_orig.png`} className='w-full pb-6' width={500} height={500} />
                <p>All our services are available online. Get full control of your BO Account. Trade Online, deposit funds, withdraw funds, IPO, SME, ATB and so on. </p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>BO Account Opening</h1>
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/bo-image_orig.png`} className='w-full pb-6' width={500} height={500} />
                <p>Open a BO Account with us through one of our convenient locations in many parts of the country. Or you can start the process <Link href={`https://www.midwaybd.com/open-a-bo-account.html`} target='_blank' className='text-[##A88D2E]' >online.</Link></p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>Apply for IPO</h1>
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/ipo-11_orig.png`}  className='w-full pb-6' width={500} height={500} />
                <p>You can now apply for any IPO through us via this website. We even offer an IPO membership club.</p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>Share Trading</h1>
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/buy-and-sell_orig.png`} className='w-full pb-6' width={500} height={500} />
                <p>Buy and Sell shares through us over the phone, the internet or visiting any of our offices.</p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>IPO Membership Club</h1>
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/ipo-club-membership-logo-2.png?1617384776`} className='w-full pb-6' width={500} height={500} />  
                <p>​Join our IPO membership club and you will never have to worry about missing an IPO application. We will automatically apply for all the IPOs for you (depending on your available balance). Please be aware, we will not automatically apply for Mutual Funds. Call or visit us to find out more. </p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>Easy Deposits</h1>
                <Image src={``} />  
                <p>​Join our IPO membership club and you will never have to worry about missing an IPO application. We will automatically apply for all the IPOs for you (depending on your available balance). Please be aware, we will not automatically apply for Mutual Funds. Call or visit us to find out more. </p>
            </div>
        </div>
    )
}

export default ClientServices