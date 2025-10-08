'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

const SmoothTickerClient = ({ tickerData, hasError }) => {
    const [isHovered, setIsHovered] = useState(false)
    const scrollRef = useRef(null)
    const [scrollWidth, setScrollWidth] = useState(0)

    const formatPrice = (price) => {
        const num = Number(price);
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toFixed(2);
    };

    const calculateChange = (current, previous) => {
        const change = Number(current) - Number(previous);
        const changePercent = ((change / Number(previous)) * 100);
        return {
            value: change,
            percent: changePercent,
            isPositive: change > 0
        };
    };

    // Calculate scroll width on mount and resize
    useEffect(() => {
        const calculateWidth = () => {
            if (scrollRef.current) {
                const singleSetWidth = scrollRef.current.scrollWidth / 3; // We duplicate 3 times
                setScrollWidth(singleSetWidth)
            }
        }

        calculateWidth()
        window.addEventListener('resize', calculateWidth)
        return () => window.removeEventListener('resize', calculateWidth)
    }, [tickerData])

    const TickerItem = ({ item, index }) => {
        const change = calculateChange(item.MKISTAT_PUB_LAST_TRADED_PRICE, item.MKISTAT_YDAY_CLOSE_PRICE);

        return (
            <div
                key={`ticker-${item.MKISTAT_INSTRUMENT_CODE}-${index}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/12 transition-colors duration-200 cursor-pointer flex-shrink-0 mx-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white flex-shrink-0 flex justify-center items-center">
                    <Image
                        src={`https://platform.biniyog.com.bd/assets/logo/company/${item.MKISTAT_INSTRUMENT_CODE}.png`}
                        alt={`${item.MKISTAT_INSTRUMENT_CODE} logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none'
                        }}
                    />
                </div>

                <span className="text-sm font-semibold text-white/90 tracking-wide min-w-fit">
                    {item.MKISTAT_INSTRUMENT_CODE}
                </span>

                <span className="text-sm font-bold text-white min-w-fit">
                    ৳{formatPrice(item.MKISTAT_PUB_LAST_TRADED_PRICE)}
                </span>

                <div className={`flex items-center gap-1 min-w-fit ${change.isPositive
                    ? 'text-emerald-400'
                    : 'text-red-400'
                    }`}>
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`transition-transform duration-300 ${!change.isPositive ? 'rotate-180' : ''}`}
                    >
                        <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                    <span className="text-xs font-medium">
                        {Math.abs(change.percent).toFixed(1)}%
                    </span>
                </div>
            </div>
        );
    };

    // Create exactly 3 sets for smooth infinite scroll
    const tripleData = [...tickerData];
    return (
        <div className='marquee w-full'>
            <div className='flex gap-2'>{tripleData?.length>0&&tripleData.map(item => {
                return <span className='inline-block px-2'>{item.MKISTAT_INSTRUMENT_CODE}</span>
            })}</div>
        </div>
    );
};

export default SmoothTickerClient;