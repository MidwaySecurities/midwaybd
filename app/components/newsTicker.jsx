'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NewsTicker = ({ newsData, messages = [] }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    // Update time every minute
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            }))
        }
        
        updateTime()
        const interval = setInterval(updateTime, 60000)
        
        return () => clearInterval(interval)
    }, [])

    // Process news items
    const processedNews = messages.length > 0 
        ? messages.map((message, index) => ({
            id: `msg-${index}`,
            title: newsData?.news?.[0]?.title || 'Breaking News',
            content: message,
            link: newsData?.news?.[0]?.link || '/'
        }))
        : [
            {
                id: 'default-1',
                title: 'Market Update',
                content: 'Stock market shows positive momentum as key indices gain ground',
                link: '/'
            },
            {
                id: 'default-2', 
                title: 'Economic News',
                content: 'GDP growth expected to accelerate in the coming quarter',
                link: '/'
            },
            {
                id: 'default-3',
                title: 'Investment Alert',
                content: 'New IPO applications now open for retail investors',
                link: '/'
            }
        ]

    // Create seamless loop with multiple repetitions
    const tickerData = [...processedNews, ...processedNews, ...processedNews]

    const NewsItem = ({ item, index }) => (
        <li 
            key={`${item.id}-${index}`}
            className="flex items-center gap-3 whitespace-nowrap"
        >
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse flex-shrink-0"></div>
            <Link 
                href={item.link}
                className="hover:text-yellow-400 transition-colors duration-200 text-sm md:text-base"
            >
                <span className="font-semibold text-red-300">{item.title}:</span>{' '}
                <span className="font-normal">{item.content}</span>
            </Link>
        </li>
    )

    return (
        <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 border-y border-gray-700 shadow-lg overflow-hidden relative w-[80%] m-auto">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-repeat" style={{
                    backgroundImage: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                    backgroundSize: "20px 20px"
                }}></div>
            </div>

            <div className="flex relative">
                {/* Breaking News Label */}
                <div className="flex items-center bg-gradient-to-r from-red-600 to-red-700 px-4 md:px-6 py-3 min-w-fit z-10 shadow-lg relative">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">
                            Breaking News
                        </span>
                        {currentTime && (
                            <span className="text-red-100 text-xs font-medium ml-2 hidden md:inline">
                                {currentTime}
                            </span>
                        )}
                    </div>
                    {/* Arrow pointing right */}
                    <div className="absolute -right-2 top-0 bottom-0 w-4">
                        <div className="w-0 h-0 border-t-[22px] border-b-[22px] border-l-[16px] border-t-transparent border-b-transparent border-l-red-700"></div>
                    </div>
                </div>

                {/* Scrolling News Content */}
                <div 
                    className="flex-1 overflow-hidden relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Edge fade gradients */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
                    
                    <ul 
                        className={`flex gap-8 py-3 px-6 text-white news-ticker ${
                            isHovered ? 'news-ticker-slow' : ''
                        }`}
                        style={{ width: 'max-content' }}
                    >
                        {tickerData.map((item, index) => (
                            <NewsItem key={`${item.id}-${index}`} item={item} index={index} />
                        ))}
                    </ul>
                </div>

                Live Indicator
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium border border-green-400/30 hidden md:flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes news-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                
                .news-ticker {
                    animation: news-scroll 45s linear infinite;
                    animation-fill-mode: none;
                    animation-delay: 0s;
                    will-change: transform;
                }
                
                .news-ticker-slow {
                    animation-duration: 90s;
                }
                
                @media (max-width: 768px) {
                    .news-ticker {
                        animation-duration: 35s;
                    }
                    .news-ticker-slow {
                        animation-duration: 70s;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .news-ticker {
                        animation: none;
                    }
                }

                /* Hover pause effect */
                .news-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}

export default NewsTicker

// Usage example:
// <NewsTicker newsData={newsData} messages={messages} />