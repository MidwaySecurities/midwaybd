'use client'
import Link from 'next/link'
import { ArrowLeft, Home, Search, Mail, TrendingUp } from 'lucide-react'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-2xl mx-auto text-center relative z-10">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-none select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-blue-600 opacity-10 blur-sm leading-none select-none animate-pulse">
                            404
                        </div>
                    </div>
                    
                    {/* Floating elements */}
                    {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping absolute -top-16 -left-8"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce absolute -top-20 right-12 animation-delay-1000"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse absolute -bottom-12 -right-16 animation-delay-2000"></div>
                    </div> */}
                </div>

                {/* Error message */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed">
                        The page you're looking for seems to have wandered off into the digital void. 
                        Don't worry, it happens to the best of us!
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link 
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                    >
                        <Home className="w-5 h-5 group-hover:animate-bounce" />
                        Go Home
                    </Link>
                    
                    <Link 
                        href="javascript:history.back()"
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </Link>
                </div>

                {/* Helpful links */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Maybe you were looking for:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link 
                            href="/about-us"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 group"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <Search className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-gray-800">About Us</div>
                                <div className="text-sm text-gray-500">Learn more</div>
                            </div>
                        </Link>

                        <Link 
                            href="/visual-research"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 group"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-gray-800">Research</div>
                                <div className="text-sm text-gray-500">Market insights</div>
                            </div>
                        </Link>

                        <Link 
                            href="/contact-us"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 group"
                        >
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <Mail className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-gray-800">Contact</div>
                                <div className="text-sm text-gray-500">Get help</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Fun fact */}
                <div className="mt-8 text-sm text-gray-500">
                    <p>💡 Fun fact: The term "404" comes from the room number at CERN where the first web server was located!</p>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    )
}

export default NotFound