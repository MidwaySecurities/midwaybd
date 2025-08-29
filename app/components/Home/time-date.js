'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import bangladeshFlag from '../../../public/images/bangladesh.png';
import Timer from '../timer';

export default function TimeDate() {
    
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
            // hello this is test comment
            const bangladeshTime = now.toLocaleTimeString('en-US', options);
            setTime(bangladeshTime);

            const dhakaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
            const hours = dhakaTime.getHours();   // 24-hour format
            const minutes = dhakaTime.getMinutes();

            setIsAfterTwoThirty((hours > 14 || (hours === 14 && minutes >= 30)) || hours < 9 || (hours === 9 && minutes < 30));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
        
    }, []);
    
    useEffect(() => {
        const marketStatus = () => {
            fetch(`https://www.amarstock.com/info/market/status-ex`).then(res => {
                return res.json()
            }).then(data => {
                console.log(data)
            })
            
        }
        marketStatus()
    }, [])
    
    return (
        <div className='flex justify-between py-1 px-4 bg-white'>
            <div>
                <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[20px]' />
                <Timer />
            </div>
            {/* <p className='font-bold'>DSE: <span className={`${isAfterTwoThirty ? 'text-black' : 'text-[#22C55E]'}`}>{isAfterTwoThirty?'CLOSE':'OPEN'}</span></p> */}
        </div>
    );
}
