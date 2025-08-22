import React from 'react'

const Loading = () => {
    return (
        // make a stysish loading component with tailwind css
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-qtp_btn_bg_color"></div>
            <p className='text-xl text-gray-600 mt-4'>Loading...</p>
        </div>
        
    )
}

export default Loading