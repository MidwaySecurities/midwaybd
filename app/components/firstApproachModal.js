import React from 'react'

const FirstApproachModal = () => {
    return (
        <div className='fixed bottom-0 left-0 right-0 bg-black/50 z-50'>
            <div className='bg-white w-full flex justify-center items-center relative'>
                <div className='absolute right-0 top-[-15px] bg-black text-white w-6 h-6 flex justify-center items-center rounded-full p-1'>x</div>
                <div className='bg-green-500 w-full py-2'>FirstApproachModal</div>
            </div>
        </div>
    )
}

export default FirstApproachModal