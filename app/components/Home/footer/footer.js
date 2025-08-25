import React from 'react'
import SearchIcon from './components/search-icon'
import Link from 'next/link'
import Image from 'next/image'
import facebook from '../../../../public/images/social-media-icons/facebook.png'
import instagram from '../../../../public/images/social-media-icons/Instragram.png'
import youtube from '../../../../public/images/social-media-icons/youtube.png'
import linkedIn from '../../../../public/images/social-media-icons/linkedin.png'
import email from '../../../../public/images/social-media-icons/email.png'

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-8 px-4 rounded-lg'>
      <SearchIcon />
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Stay Connected</h2>
        <p className='mb-4'>Follow us on our social media channels for the latest updates.</p>
        <div className='flex justify-center space-x-4'>
          <div className='flex items-center space-x-2'>
            {/* <svg style={{ stroke: 'white', strokeWidth: '2px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px"><path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 32.380773 34.967178 39.306373 27 40.720703 L 27 29 L 30.625 29 C 31.129 29 31.555188 28.623047 31.617188 28.123047 L 31.992188 25.123047 C 32.028188 24.839047 31.938047 24.553891 31.748047 24.337891 C 31.559047 24.122891 31.287 24 31 24 L 27 24 L 27 20.5 C 27 19.397 27.897 18.5 29 18.5 L 31 18.5 C 31.552 18.5 32 18.053 32 17.5 L 32 14.125 C 32 13.607 31.604844 13.174906 31.089844 13.128906 C 31.030844 13.123906 29.619984 13 27.833984 13 C 23.426984 13 21 15.616187 21 20.367188 L 21 24 L 17 24 C 16.448 24 16 24.447 16 25 L 16 28 C 16 28.553 16.448 29 17 29 L 21 29 L 21 40.720703 C 13.032822 39.306373 7 32.380773 7 24 C 7 14.593391 14.593385 7 24 7 z" /></svg> */}

            <Link href="https://www.facebook.com/midwaytrec142" target='_blank' className='text-blue-400 hover:text-blue-600'>
              {/* <svg style={{ stroke: 'white' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z" /></svg> */}
              <Image src={facebook} width={100} height={100} className='w-[40px]' alt='midway facebook' />
            </Link>
          </div>
          <div className='flex items-center space-x-2'>
            <Link href="https://www.youtube.com/c/MidwaySecuritiesLtd" target='_blank' className='text-blue-400 hover:text-blue-600'>
              {/* <svg style={{ stroke: 'white' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg> */}
              <Image src={youtube} width={100} height={100} className='w-[40px]' alt = 'midway youtube' />
            </Link>
          </div>
          <div className='flex items-center space-x-2'>
            <Link href="mailto:info@midwaybd.com" target='_blank' className='text-blue-400 hover:text-blue-600'>
              <Image src={email} width={100} height={100} className='w-[35px]' alt = 'midway mail' />
            </Link>
          </div>
          <div className='flex items-center space-x-2'>
            <Link href="https://www.linkedin.com/company/midway-securities-ltd-?trk=biz-companies-cym" target='_blank' className='text-blue-400 hover:text-blue-600'>
              {/* <svg style={{ stroke: 'white' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg> */}
              <Image src={linkedIn} width={92} height={92} className='w-[35px]' alt = 'midway linkedin' />
            </Link>
          </div>
          <div className='flex items-center space-x-2'>

            <Link href="https://www.instagram.com/midwaytrec142" className='text-blue-400 hover:text-blue-600'>
              <Image src={instagram} width={100} height={100} className='w-[40px]' />
            </Link>

          </div>
          

          
          
        </div>
      </div>

      <div className='mt-4 px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <ul>
            <li className='mt-4'><a href="#" className='text-gray-300 hover:text-white'>​Open BO Account</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Terms of Service</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>​Link Account</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>IPO</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Mobile App</a></li>
          </ul>

          <ul>
            <li className='mt-4'><a href="#" className='text-gray-300 hover:text-white'>Pricing</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Withdraw</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Deposit</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Branches</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>FAQ</a></li>
          </ul>

          <ul>
            <li className='mt-4'><a href="#" className='text-gray-300 hover:text-white'>Contact Us</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Our Services</a></li>
            <li className='mt-2'><Link href="/contact-us" className='text-gray-300 hover:text-white'>About Us</Link></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Blog</a></li>
            <li className='mt-2'><a href="#" className='text-gray-300 hover:text-white'>Market News</a></li>
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
        <p>&copy; Midway Securities Ltd. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer