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

                <div className={`flex items-center gap-1 min-w-fit ${
                    change.isPositive 
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
                        <path d="M7 14l5-5 5 5H7z"/>
                    </svg>
                    <span className="text-xs font-medium">
                        {Math.abs(change.percent).toFixed(1)}%
                    </span>
                </div>
            </div>
        );
    };

    // Create exactly 3 sets for smooth infinite scroll
    const tripleData = [...tickerData, ...tickerData, ...tickerData];

    return (
        <div className="relative w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-y border-slate-700/50 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent"></div>
            </div>
            
            {/* Status indicators */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20 bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white/80 hidden md:inline uppercase tracking-wider">Live</span>
            </div>

            {hasError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-400/30 backdrop-blur-sm">
                        Cached Data
                    </div>
                </div>
            )}

            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling ticker content */}
            <div className="ticker-container py-3">
                <div 
                    ref={scrollRef}
                    className={`ticker-content ${isHovered ? 'ticker-paused' : ''}`}
                    style={{
                        '--scroll-width': `${scrollWidth}px`,
                    }}
                >
                    {tripleData.map((item, index) => (
                        <TickerItem key={`${item.MKISTAT_INSTRUMENT_CODE}-${index}`} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Smooth CSS-only animations */}
            <style jsx>{`
                .ticker-container {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }
                
                .ticker-content {
                    display: flex;
                    width: max-content;
                    animation: scroll-smooth 20s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    transform: translate3d(0, 0, 0);
                }
                
                .ticker-paused {
                    animation-play-state: paused;
                }
                
                @keyframes scroll-smooth {
                    0% {
                        transform: translate3d(300, 0, 0);
                    }
                    100% {
                        transform: translate3d(calc(var(--scroll-width, 1000px) * -1), 0, 0);
                    }
                }
                
                /* Smoother animation on mobile */
                @media (max-width: 768px) {
                    .ticker-content {
                        animation-duration: 40s;
                    }
                }
                
                /* Respect user preferences */
                @media (prefers-reduced-motion: reduce) {
                    .ticker-content {
                        animation-duration: 120s;
                    }
                }
                
                /* Hardware acceleration optimizations */
                .ticker-content {
                    -webkit-transform: translate3d(0, 0, 0);
                    -webkit-backface-visibility: hidden;
                    -webkit-perspective: 1000;
                }
                
                /* Smooth hover transitions */
                .ticker-content:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default SmoothTickerClient;