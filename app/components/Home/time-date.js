'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import bangladeshFlag from '../../../public/images/bangladesh.png';

export default function TimeDate() {
    const [time, setTime] = useState(null);
    const [dseStatus, setDseStatus] = useState(null)

    const [isAfterTwoThirty, setIsAfterTwoThirty] = useState(null);

    useEffect(() => {
        const fetchDseStatus = async () => {
            const data = await fetch(`https://www.amarstock.com/info/market/status-ex`)
            const res = await data.json()
            setDseStatus(res.status)
        }
        fetchDseStatus()
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
                // log
            })

        }
        marketStatus()
    }, [])

    return (
        <div className='flex justify-between py-1 px-4 bg-white'>
            <div className={`font-bold flex gap-2 justify-center items-center ${isAfterTwoThirty ? 'text-black' : 'text-[#22C55E]'}`}>
                <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[20px]' />
                {time === null ? <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div> : time}
            </div>
            <div className={`font-bold w-[5.3rem] flex ${(isAfterTwoThirty === null || dseStatus === null)?'justify-start gap-2':'justify-between'} items-center`}><span>DSE:</span> <span className={`${(isAfterTwoThirty === null || dseStatus === null)?'':''} text-right ${isAfterTwoThirty || dseStatus === 'Closed' ? 'text-black' : 'text-[#22C55E]'}`}>{isAfterTwoThirty || dseStatus === 'Closed' ? 'CLOSE' : (isAfterTwoThirty === null || dseStatus === null) ? <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div> : 'OPEN'}</span></div>
        </div>
    );
}
