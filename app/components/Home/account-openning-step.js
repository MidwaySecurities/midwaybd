import React from 'react'

const AccountOpenningSteps = () => {
    return (
        <div className=' bg-green-300 rounded-lg py-12 border-1 border-black relative text-black'>
            <div className='absolute w-[70%] left-[50%] translate-x-[-50%] text-center bg-white z-[10] top-[-10px]'>
                <h1 className='text-black'>Three Simple Steps</h1>
            </div>

            <div>
                <div>
                    <div className='flex flex-col justify-center items-center md:flex-row gap-12'>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='bg-white p-4 rounded-full shadow-md w-16 h-16 md:w-1/3 flex items-center justify-center'>
                                <h2 className='text-xl font-bold'>1</h2>
                            </div>
                            <h1>Register account</h1>
                        </div>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='bg-white p-4 rounded-full shadow-md w-16 h-16 md:w-1/3 flex items-center justify-center'>
                                <h2 className='text-xl font-bold'>2</h2>
                            </div>
                            <h1>Fund your account</h1>
                        </div>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='bg-white p-4 rounded-full shadow-md w-16 h-16 md:w-1/3 flex items-center justify-center'>
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