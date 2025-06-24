'use client';

import { useEffect, useState } from 'react';

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
            <p className="font-bold">{time}</p>
            <p>DSE: <span className="text-green-500 font-bold">OPEN</span></p>
        </div>
    );
}
