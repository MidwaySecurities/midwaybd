'use client';

import Link from 'next/link';
// import transmissionForm from '../../../public/files/Transmission-Request-Form.pdf'
import download_icon from '../../../public/images/icons/download_button.png';
import Image from 'next/image';

export default function DownloadTransmissionForm() {
    return (
        <Link  className='flex button_shadow gap-1 p-2 rounded-lg bg-qtp_btn_bg_color text-white' rel='noopener noreferrer' download={`/files/Transmission-Request-Form.pdf`} href={`/files/Transmission-Request-Form.pdf`} target='_blank'>
            <span>Share Transmission Form</span>
            <Image src={download_icon} width={100} height={100} className='w-5' />
        </Link>

    );
}
