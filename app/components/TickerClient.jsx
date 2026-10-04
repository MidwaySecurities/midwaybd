'use client'
import { useState, useEffect, useRef } from 'react'

const SmoothTickerClient = ({ tickerData, hasError }) => {
    const [isHovered, setIsHovered] = useState(false)

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

    const TickerItem = ({ item, index }) => {
        const change = calculateChange(item.MKISTAT_PUB_LAST_TRADED_PRICE, item.MKISTAT_YDAY_CLOSE_PRICE);

        return (
            <div
                className="inline-flex items-center gap-3 px-5 py-3 backdrop-blur-md rounded-xl border border-[#D9E5F0] hover:border-white/40 hover:from-white/15 hover:to-white/8 transition-all duration-300 cursor-pointer flex-shrink-0 mx-1 hover:scale-105 group"
            >
                {/* Company Logo */}
                <div className="relative w-10 h-10 overflow-hidden flex-shrink-0 flex justify-center items-center rounded-lg bg-white shadow-md group-hover:shadow-lg transition-shadow">
                    <img
                        src={`https://platform.biniyog.com.bd/assets/logo/company/${item.MKISTAT_INSTRUMENT_CODE}.png`}
                        alt={`${item.MKISTAT_INSTRUMENT_CODE} logo`}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none'
                        }}
                    />
                </div>

                {/* Company Code */}
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-black tracking-wider">
                        {item.MKISTAT_INSTRUMENT_CODE}
                    </span>
                    <span className="text-xs text-white/60">
                        DSE
                    </span>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-white/20"></div>

                {/* Price Section */}
                <div className="flex flex-col items-end">
                    <span className="text-base font-bold text-black">
                        ৳{formatPrice(item.MKISTAT_PUB_LAST_TRADED_PRICE)}
                    </span>
                    <div className={`flex items-center gap-1.5 ${change.isPositive
                        ? 'text-green-500'
                        : 'text-red-500/75'
                        }`}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`transition-transform duration-300 ${!change.isPositive ? 'rotate-180' : ''}`}
                        >
                            <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                        <span className="text-xs font-semibold">
                            {change.isPositive ? '+' : ''}{change.value.toFixed(2)}
                        </span>
                        <span className="text-xs font-medium">
                            ({change.isPositive ? '+' : ''}{change.percent.toFixed(2)}%)
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    // Create double data for seamless loop
    const doubleData = [...tickerData, ...tickerData];

    return (
        <div 
            className="relative w-full overflow-hidden bg-[#F4F8FC]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32  z-10 pointer-events-none"></div>
            
            {/* Error indicator */}
            {hasError && (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
                    <span className="text-xs text-amber-400 px-2 py-0.5 rounded-full border border-amber-400/30">
                        Using cached data
                    </span>
                </div>
            )}

            {/* Scrolling container */}
            <div className="flex">
                <div
                    className={`flex ${isHovered ? '' : 'animate-scroll'}`}
                >
                    {doubleData?.length > 0 && doubleData.map((item, index) => (
                        <TickerItem key={`${item.MKISTAT_INSTRUMENT_CODE}-${index}`} item={item} index={index} />
                    ))}
                </div>
                <div
                    className={`flex ${isHovered ? '' : 'animate-scroll'}`}
                    aria-hidden="true"
                >
                    {doubleData?.length > 0 && doubleData.map((item, index) => (
                        <TickerItem key={`duplicate-${item.MKISTAT_INSTRUMENT_CODE}-${index}`} item={item} index={index} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default SmoothTickerClient;

// Demo with sample data
