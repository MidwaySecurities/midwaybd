// import React from 'react'

// const Platform = () => {
//     return (
//         <div className='p-6 py-14 bg-background text-gray-800 rounded-lg shadow-md flex flex-col items-start justify-center h-full border border-gray-300'>
//             <p>Available on multiple platform</p>
//             <h1 className='font-bold text-xl mt-8'>World class platform, Trade without a doubt.</h1>
//             <p className='pt-4 text-sm'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
//             <div className='flex gap-4 mt-8'>
//                 <div>
//                     <div className='w-16 h-16 border border-gray-400 rounded-xl flex justify-center items-center'>
//                         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
//                             <path d="M 7.125 2 L 28.78125 23.5 L 34.71875 17.5625 L 8.46875 2.40625 C 8.03125 2.152344 7.5625 2.011719 7.125 2 Z M 5.3125 3 C 5.117188 3.347656 5 3.757813 5 4.21875 L 5 46 C 5 46.335938 5.070313 46.636719 5.1875 46.90625 L 27.34375 24.90625 Z M 36.53125 18.59375 L 30.1875 24.90625 L 36.53125 31.1875 L 44.28125 26.75 C 45.382813 26.113281 45.539063 25.304688 45.53125 24.875 C 45.519531 24.164063 45.070313 23.5 44.3125 23.09375 C 43.652344 22.738281 38.75 19.882813 36.53125 18.59375 Z M 28.78125 26.3125 L 6.9375 47.96875 C 7.300781 47.949219 7.695313 47.871094 8.0625 47.65625 C 8.917969 47.160156 26.21875 37.15625 26.21875 37.15625 L 34.75 32.25 Z"></path>
//                         </svg>
//                     </div>
//                     <h1 className='text-center mt-2'>Android</h1>
//                 </div>
//                 <div>
//                     <div className='w-16 h-16 border border-gray-400 rounded-xl flex justify-center items-center'>
//                         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
//                             <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
//                         </svg>
//                     </div>
//                     <h1 className='text-center mt-2'>Apple</h1>
//                 </div>
//                 <div>
//                     <div className='w-16 h-16 border border-gray-400 rounded-xl flex justify-center items-center'>
//                         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
//                             <path d="M19.852 7.761l-15 2.25C4.362 10.085 4 10.505 4 11v12c0 .553.448 1 1 1h15c.552 0 1-.447 1-1V8.75c0-.291-.127-.567-.348-.758C20.432 7.803 20.139 7.721 19.852 7.761zM45.652 4.242c-.22-.189-.512-.271-.801-.231l-21 3.15C23.362 7.235 23 7.655 23 8.15V23c0 .553.448 1 1 1h21c.552 0 1-.447 1-1V5C46 4.709 45.873 4.433 45.652 4.242zM20 26H5c-.552 0-1 .447-1 1v12c0 .495.362.915.852.989l15 2.25c.05.007.099.011.148.011.238 0 .47-.085.652-.242C20.873 41.817 21 41.541 21 41.25V27C21 26.447 20.552 26 20 26zM45 26H24c-.552 0-1 .447-1 1v14.85c0 .495.362.915.852.989l21 3.15C44.901 45.996 44.951 46 45 46c.238 0 .47-.085.652-.242C45.873 45.567 46 45.291 46 45V27C46 26.447 45.552 26 45 26z"></path>
//                         </svg>
//                     </div>
//                     <h1 className='text-center mt-2'>Web</h1>
//                 </div>
                
//             </div>
//         </div>
//     )
// }

// export default Platform


import React from 'react'

const Platform = () => {
    const platforms = [
        {
            name: "Android",
            description: "Download from Google Play Store",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 lg:w-10 lg:h-10">
                    <path fill="currentColor" d="M 7.125 2 L 28.78125 23.5 L 34.71875 17.5625 L 8.46875 2.40625 C 8.03125 2.152344 7.5625 2.011719 7.125 2 Z M 5.3125 3 C 5.117188 3.347656 5 3.757813 5 4.21875 L 5 46 C 5 46.335938 5.070313 46.636719 5.1875 46.90625 L 27.34375 24.90625 Z M 36.53125 18.59375 L 30.1875 24.90625 L 36.53125 31.1875 L 44.28125 26.75 C 45.382813 26.113281 45.539063 25.304688 45.53125 24.875 C 45.519531 24.164063 45.070313 23.5 44.3125 23.09375 C 43.652344 22.738281 38.75 19.882813 36.53125 18.59375 Z M 28.78125 26.3125 L 6.9375 47.96875 C 7.300781 47.949219 7.695313 47.871094 8.0625 47.65625 C 8.917969 47.160156 26.21875 37.15625 26.21875 37.15625 L 34.75 32.25 Z"></path>
                </svg>
            ),
            color: "from-green-400 to-green-600",
            bgColor: "bg-green-50 group-hover:bg-green-100",
            textColor: "text-green-600"
        },
        {
            name: "iOS",
            description: "Available on App Store",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 lg:w-10 lg:h-10">
                    <path fill="currentColor" d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                </svg>
            ),
            color: "from-gray-600 to-gray-800",
            bgColor: "bg-gray-50 group-hover:bg-gray-100",
            textColor: "text-gray-700"
        },
        {
            name: "Web Platform",
            description: "Trade from any browser",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 lg:w-10 lg:h-10">
                    <path fill="currentColor" d="M19.852 7.761l-15 2.25C4.362 10.085 4 10.505 4 11v12c0 .553.448 1 1 1h15c.552 0 1-.447 1-1V8.75c0-.291-.127-.567-.348-.758C20.432 7.803 20.139 7.721 19.852 7.761zM45.652 4.242c-.22-.189-.512-.271-.801-.231l-21 3.15C23.362 7.235 23 7.655 23 8.15V23c0 .553.448 1 1 1h21c.552 0 1-.447 1-1V5C46 4.709 45.873 4.433 45.652 4.242zM20 26H5c-.552 0-1 .447-1 1v12c0 .495.362.915.852.989l15 2.25c.05.007.099.011.148.011.238 0 .47-.085.652-.242C20.873 41.817 21 41.541 21 41.25V27C21 26.447 20.552 26 20 26zM45 26H24c-.552 0-1 .447-1 1v14.85c0 .495.362.915.852.989l21 3.15C44.901 45.996 44.951 46 45 46c.238 0 .47-.085.652-.242C45.873 45.567 46 45.291 46 45V27C46 26.447 45.552 26 45 26z"></path>
                </svg>
            ),
            color: "from-blue-500 to-blue-700",
            bgColor: "bg-blue-50 group-hover:bg-blue-100",
            textColor: "text-blue-600"
        }
    ];

    const features = [
        "Real-time market data",
        "Advanced charting tools",
        "Lightning-fast execution",
        "Portfolio management",
        "Risk management tools",
        "24/7 customer support"
    ];

    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                                Multi-Platform Access
                            </div>
                            
                            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                                World-class platform,<br />
                                <span className="text-blue-600">Trade without a doubt</span>
                            </h2>
                            
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Experience seamless trading across all your devices with our cutting-edge technology. 
                                Whether you're on mobile, desktop, or web - your trading experience remains consistent and powerful.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Start Trading Now
                            </button>
                        </div>
                    </div>

                    {/* Platforms Side */}
                    <div className="space-y-6">
                        {platforms.map((platform, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 rounded-xl ${platform.bgColor} flex items-center justify-center transition-colors duration-300`}>
                                            <div className={platform.textColor}>
                                                {platform.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{platform.name}</h3>
                                            <p className="text-gray-600 text-sm">{platform.description}</p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-4">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            Available on Multiple Platforms
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                            World-class platform,<br />
                            <span className="text-blue-600">Trade without a doubt</span>
                        </h2>
                        
                        <p className="text-gray-600 mb-6">
                            Experience seamless trading across all your devices with our cutting-edge technology.
                        </p>
                    </div>

                    {/* Mobile Platforms Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {platforms.map((platform, index) => (
                            <div key={index} className="group">
                                <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100">
                                    <div className={`w-14 h-14 rounded-xl ${platform.bgColor} flex items-center justify-center mx-auto mb-3 transition-colors duration-300`}>
                                        <div className={platform.textColor}>
                                            {platform.icon}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">{platform.name}</h3>
                                    <p className="text-gray-600 text-xs">{platform.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Features */}
                    <div className="space-y-3 mb-8">
                        <h4 className="font-semibold text-gray-800 text-center mb-4">Key Features</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile CTA */}
                    <div className="text-center">
                        <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Start Trading Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Platform