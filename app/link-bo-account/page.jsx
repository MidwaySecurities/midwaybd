import Image from 'next/image'
import React from 'react'
import LinkBo from '../../public/images/link-bo/Link-BO-2.jpg'
import Link from 'next/link'
import download_icon from '../../public/images/icons/download_button.png';
import DownloadTransmissionForm from './components/transmission-form-download';
const LinkBoAccount = () => {
  return (
    <div>
      <div className=''>
        <img className='w-full rounded-lg' src={`images/link-bo/Link-BO-2.jpg`} alt='Link BO account' width={100} height={100} />
      </div>
      <p className='px-4 mt-4'>
        You can easily transfer your BO account from any Dhaka Stock Exchange (DSE) or Chittagong Stock Exchange (CSE) through a Free Link BO Account. You do not need to sell your shares.
      </p>

      <div className='p-4 flex justify-center'>
        <Link className='inline-block p-2 rounded-lg bg-qtp_btn_bg_color text-white' href={`https://portal.midwaybd.com/bo/portal-login`} target='_blank'>Link Account (​লিংক অ্যাকাউন্ট)</Link>
      </div>

      <div className='p-4 flex justify-center pt-1 items-center'>

        <DownloadTransmissionForm />
      </div>
    </div>
  )
}

export default LinkBoAccount