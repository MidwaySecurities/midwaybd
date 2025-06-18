import React from 'react'

const Platform = () => {
    return (
        <div className='p-6 py-16 bg-blue-500 text-white rounded-lg shadow-md flex flex-col items-start justify-center h-full border'>
            <p>Available on multiple platform</p>
            <h1 className='font-bold text-xl mt-8'>World class platform, Trade without a doubt.</h1>
            <p className='pt-4 text-sm'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
            <div className='flex gap-4 mt-8'>
                <div>
                    <div className='w-16 h-16 bg-blue-300 rounded-xl'></div>
                    <h1 className='text-center mt-2'>Web</h1>
                </div>
                <div>
                    <div className='w-16 h-16 bg-blue-300 rounded-xl'></div>
                    <h1 className='text-center mt-2'>Desktop</h1>
                </div>
                <div>
                    <div className='w-16 h-16 bg-blue-300 rounded-xl'></div>
                    <h1 className='text-center mt-2'>Mobile</h1>
                </div>
            </div>
        </div>
    )
}

export default Platform