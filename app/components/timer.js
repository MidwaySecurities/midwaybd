import { useEffect, useState } from 'react';

const Timer = () => {
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

            setIsAfterTwoThirty((hours > 14 || (hours === 14 && minutes >= 30)) || hours < 9 || (hours === 9 && minutes < 30));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
        
    }, []);
    return (
        <>
            {time}
        </>
    )
}

export default Timer