import React from 'react'
import SearchIcon from './components/search-icon'

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-8 px-4 rounded-lg'>
      <SearchIcon />
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Stay Connected</h2>
        <p className='mb-4'>Follow us on our social media channels for the latest updates.</p>
        <div className='flex justify-center space-x-4'>
          <a href="#" className='text-blue-400 hover:text-blue-600'>Facebook</a>
          <a href="#" className='text-blue-400 hover:text-blue-600'>Twitter</a>
          <a href="#" className='text-blue-400 hover:text-blue-600'>Instagram</a>
        </div>
      </div>

      <div className='mt-4 px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <ul>
            <li className='mt-4'><a href="#" className='text-gray-300 hover:text-white'>Privacy Policy</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Terms of Service</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Contact Us</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Support</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Careers</a></li>
          </ul>

          <ul>
            <li className='mt-4'><a href="#" className='text-gray-300 hover:text-white'>Privacy Policy</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Terms of Service</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Contact Us</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Support</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Careers</a></li>
          </ul>

          <ul>
            <li className='mt-4'><a href="#" className='text-gray-300 hover:text-white'>Privacy Policy</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Terms of Service</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Contact Us</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Support</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Careers</a></li>
          </ul>
        </div>
      </div>

      {/* contact information */}
      <div className='text-center mt-8 text-[12px]'>
        <p>Dhaka Stock Exchange Building (Room No: 508)</p>
        <p>9/F, Motijheel C/A, Dhaka 1000</p>
        <p>Hotline: 09609 100 142</p>
        <p>​info@midwaybd.com</p>
      </div>

      <div className='mt-8 text-center'>
        <p>&copy; Midway Securities LTD. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer