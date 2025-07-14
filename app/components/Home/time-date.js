'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import bangladeshFlag from '../../../public/images/bangladesh.png'
export default function TimeDate() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const bangladeshTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(bangladeshTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex justify-between py-1 px-4 bg-white'>
            <div className="font-bold text-[#22C55E] flex gap-2 justify-center items-center">
                <Image src={bangladeshFlag}  alt='bangladesh' height={15} width={15} className='w-[20px]' />{time}
            </div>
            <p>DSE: <span className="text-[#22C55E] font-bold">OPEN</span></p>
        </div>
    );
}
