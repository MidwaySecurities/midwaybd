'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import bangladeshFlag from '../../../public/images/bangladesh.png';

export default function TimeDate() {
    const [time, setTime] = useState('');
    const [isAfterTwoThirty, setIsAfterTwoThirty] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };

            const bangladeshTime = now.toLocaleTimeString('en-US', options);
            setTime(bangladeshTime);

            const dhakaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
            const hours = dhakaTime.getHours();   // 24-hour format
            const minutes = dhakaTime.getMinutes();

            // Check if time is after 2:30 PM
            setIsAfterTwoThirty((hours > 14 || (hours === 14 && minutes >= 30)) || hours < 9 || (hours === 9 && minutes < 30));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex justify-between py-1 px-4 bg-white'>
            <div className={`font-bold flex gap-2 justify-center items-center ${isAfterTwoThirty ? 'text-black' : 'text-[#22C55E]'}`}>
                <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[20px]' />
                {time}
            </div>
            <p className='font-bold'>DSE: <span className={`${isAfterTwoThirty ? 'text-black' : 'text-[#22C55E]'}`}>{isAfterTwoThirty?'CLOSE':'OPEN'}</span></p>
        </div>
    );
}
