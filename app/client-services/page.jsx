import Image from 'next/image'
import React from 'react'

const ClientServices = () => {
    return (
        <div>
            <div className='p-2'>
                <h1 className='text-2xl font-semibold mb-8'>QuickTrade Pro mobile app</h1>
                <Image src={``} />
                <p>
                    With QuickTrade Pro Mobile App (for Android and iPhone) you can Buy or Sell from the phone, create your Portfolio, track individual stocks, create Alerts and Watchlists, get the latest Exchange News and many more.
                    Download the app from the Apple App Store by clicking here and from the Android Play Store by clicking here.
                    We also have a desktop version for clients who wish to trade over their own computers.
                </p>
                <div>
                    <ol className='list-disc pl-4 mt-4'>
                        <li>Download the app from the Apple App Store by clicking here and from the Android Play Store by clicking here. </li>
                        <li>We also have a desktop version for clients who wish to trade over their own computers.</li>
                    </ol>
                </div>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>​MIDWAY PORTAL</h1>
                <Image src={``} />
                <p>All our services are available online. Get full control of your BO Account. Trade Online, deposit funds, withdraw funds, IPO, SME, ATB and so on. </p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>BO Account Opening</h1>
                <Image src={``} />
                <p>Open a BO Account with us through one of our convenient locations in many parts of the country. Or you can start the process online.</p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>Apply for IPO</h1>
                <Image src={``} />
                <p>You can now apply for any IPO through us via this website. We even offer an IPO membership club.</p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>Share Trading</h1>
                <Image src={``} />
                <p>Buy and Sell shares through us over the phone, the internet or visiting any of our offices.</p>
            </div>

            <div className='mt-8 px-2'>
                <h1 className='text-2xl font-semibold mb-4'>IPO Membership Club</h1>
                <Image src={``} />  
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