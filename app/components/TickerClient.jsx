'use client'
import Image from 'next/image'

const TickerClient = ({ tickerData, hasError }) => {
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

    const TickerItem = ({ item }) => {
        const change = calculateChange(item.MKISTAT_PUB_LAST_TRADED_PRICE, item.MKISTAT_YDAY_CLOSE_PRICE);
        
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                <div className="relative w-4 h-4 md:w-5 md:h-5 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                    <Image 
                        src={`https://platform.biniyog.com.bd/assets/logo/company/${item.MKISTAT_INSTRUMENT_CODE}.png`} 
                        alt={`${item.MKISTAT_INSTRUMENT_CODE} logo`} 
                        width={20} 
                        height={20} 
                        className="object-contain"
                    />
                </div>

                <span className="text-xs md:text-sm font-semibold text-white/90 tracking-wide">
                    {item.MKISTAT_INSTRUMENT_CODE}
                </span>

                <span className="text-xs md:text-sm font-bold text-white">
                    ৳{formatPrice(item.MKISTAT_PUB_LAST_TRADED_PRICE)}
                </span>

                <div className={`flex items-center gap-1 ${
                    change.isPositive 
                        ? 'text-emerald-400' 
                        : 'text-red-400'
                }`}>
                    <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`transition-transform duration-300 ${!change.isPositive ? 'rotate-180' : ''}`}
                    >
                        <path d="M7 14l5-5 5 5H7z"/>
                    </svg>
                    <span className="text-xs font-medium">
                        {Math.abs(change.percent).toFixed(1)}%
                    </span>
                </div>
            </div>
        );
    };

    // Create seamless loop data
    const duplicatedData = [...tickerData, ...tickerData, ...tickerData, ...tickerData];

    return (
        <div className="relative w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-y border-slate-700/50 overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10"></div>
            
            {/* Status indicators */}
            <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10 bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white/80 hidden md:inline">LIVE</span>
            </div>

            {hasError && (
                <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full text-xs font-medium border border-amber-400/30">
                        Cached
                    </div>
                </div>
            )}

            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling ticker content */}
            <div 
                className="flex items-center py-2 md:py-3 ticker-scroll hover:ticker-pause"
                style={{
                    width: 'max-content',
                }}
            >
                <div className="flex gap-3 md:gap-4 pl-16 md:pl-24 pr-16 md:pr-24">
                    {duplicatedData.map((item, index) => (
                        <TickerItem key={`${item.MKISTAT_INSTRUMENT_CODE}-${index}`} item={item} />
                    ))}
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes ticker-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-25%);
                    }
                }
                
                .ticker-scroll {
                    animation: ticker-scroll 60s linear infinite;
                    animation-fill-mode: none;
                    animation-delay: 0s;
                    will-change: transform;
                }
                
                .ticker-pause:hover {
                    animation-play-state: paused;
                }
                
                @media (max-width: 768px) {
                    .ticker-scroll {
                        animation-duration: 45s;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .ticker-scroll {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default TickerClient;