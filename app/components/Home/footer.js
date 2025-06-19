import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-8 px-4 rounded-lg'>
        <div className='h-8 bg-white my-6 mb-8 rounded-3xl'>
            <input type="text" placeholder='Search' className='w-full h-full px-4 rounded-3xl text-gray-800' />
        </div>
        <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>Stay Connected</h2>
            <p className='mb-4'>Follow us on our social media channels for the latest updates.</p>
            <div className='flex justify-center space-x-4'>
            <a href="#" className='text-blue-400 hover:text-blue-600'>Facebook</a>
            <a href="#" className='text-blue-400 hover:text-blue-600'>Twitter</a>
            <a href="#" className='text-blue-400 hover:text-blue-600'>Instagram</a>
            </div>
        </div>
        <div className='mt-8 text-center'>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer