import Link from 'next/link'
import React from 'react'

const AccountOpenningSteps = () => {
    return (
        <div className=' bg-background rounded-xl py-12 border-1 border-gray-300 relative text-black'>
            <div className='absolute w-[70%] left-[50%] translate-x-[-50%] text-center bg-white p-1 z-[10] top-[-15px]'>
                <h1 className='text-black text-[20px]'>Three Simple Steps</h1>
            </div>

            <div>
                <div>
                    <div className='flex flex-col justify-center items-center md:flex-row gap-12'>
                        <div className='flex flex-col items-center gap-4'>
                            <Link href={`https://portal.midwaybd.com/bo/portal-login`}>
                                <div className='bg-white p-4 rounded-full cercle-shadow w-18 h-18 md:w-1/3 flex items-center justify-center'>
                                    <h2 className='text-xl font-bold'>1</h2>
                                </div>
                            </Link>
                            <Link href={`https://portal.midwaybd.com/bo/portal-login`}>
                                <h1>Open BO/AC</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center gap-4'>

                            <Link href={`https://portal.midwaybd.com/dashboard/fund/deposit/add`}>
                                <div className='bg-white p-4 rounded-full cercle-shadow w-18 h-18 md:w-1/3 flex items-center justify-center'>
                                    <h2 className='text-xl font-bold'>2</h2>
                                </div>
                            </Link>

                            <Link href={`https://portal.midwaybd.com/dashboard/fund/deposit/add`}>
                                <h1>Fund your account</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='bg-white p-4 rounded-full cercle-shadow w-18 h-18 md:w-1/3 flex items-center justify-center'>
                                <h2 className='text-xl font-bold'>3</h2>
                            </div>
                            <h1>Start your trade</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountOpenningSteps