'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MobileAppPage = () => {
  const [activeFeature, setActiveFeature] = useState('trading')

  const features = [
    {
      id: 'trading',
      title: 'Real-Time Trading',
      description: 'Execute trades instantly with live market data and advanced order types',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'portfolio',
      title: 'Portfolio Management',
      description: 'Track your investments, analyze performance, and monitor profit & loss',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'research',
      title: 'Market Research',
      description: 'Access expert analysis, company reports, and market insights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'alerts',
      title: 'Smart Alerts',
      description: 'Get notified about price changes, news, and market opportunities',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 7h3a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2h.01M14 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7" />
        </svg>
      )
    }
  ]

  const appFeatures = [
    {
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our optimized trading engine',
      icon: '⚡'
    },
    {
      title: 'Advanced Charting',
      description: 'Professional charts with 50+ technical indicators and drawing tools',
      icon: '📊'
    },
    {
      title: 'Secure Authentication',
      description: 'Biometric login, PIN protection, and bank-level security',
      icon: '🔒'
    },
    {
      title: 'Offline Access',
      description: 'View your portfolio and market data even without internet',
      icon: '📱'
    },
    {
      title: 'News & Analysis',
      description: 'Real-time market news, earnings reports, and expert insights',
      icon: '📰'
    },
    {
      title: 'Multi-Language',
      description: 'Available in Bengali and English for your convenience',
      icon: '🌐'
    }
  ]

  const screenshots = [
    {
      id: 1,
      title: 'Dashboard',
      image: '/images/app/dashboard.png'
    },
    {
      id: 2,
      title: 'Trading',
      image: '/images/app/trading.png'
    },
    {
      id: 3,
      title: 'Portfolio',
      image: '/images/app/portfolio.png'
    },
    {
      id: 4,
      title: 'Charts',
      image: '/images/app/charts.png'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-blue-800 bg-opacity-50 rounded-full px-4 py-2 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  Now Available on Mobile
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  QuickTrade Pro
                  <span className="block text-yellow-400">Mobile App</span>
                </h1>
                
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Trade stocks on-the-go with Bangladesh's most advanced mobile trading platform. 
                  Real-time data, instant execution, and professional tools in your pocket.
                </p>
              </div>
              
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#" className="group">
                  <div className="bg-black hover:bg-gray-800 transition-all duration-300 rounded-2xl p-4 flex items-center space-x-4 transform group-hover:scale-105">
                    <div className="w-12 h-12">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                        <path fill="currentColor" d="M17.523 15.3414c-.4906-.8136-1.0455-1.5618-1.6637-2.2345-.6181-.6726-1.2994-1.2698-2.0438-1.7916-.7443-.5217-1.5515-.9682-2.4217-1.3394-.8701-.3712-1.8029-.6271-2.7985-.7676v-1.824h-1.2V9.237c-.9956.1405-1.9284.3964-2.7985.7676-.8702.3712-1.6774.8177-2.4217 1.3394-.7444.5218-1.4257 1.119-2.0438 1.7916-.6182.6727-1.1731 1.4209-1.6637 2.2345L12 21.35l11.523-6.0086z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </div>
                </Link>
                
                <Link href="#" className="group">
                  <div className="bg-black hover:bg-gray-800 transition-all duration-300 rounded-2xl p-4 flex items-center space-x-4 transform group-hover:scale-105">
                    <div className="w-12 h-12">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                        <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50K+</div>
                  <div className="text-blue-200 text-sm">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">4.8</div>
                  <div className="text-blue-200 text-sm">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">99.9%</div>
                  <div className="text-blue-200 text-sm">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* App Mockup */}
            <div className="relative">
              <div className="relative z-10 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      {/* Phone mockup content */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
                        <div className="flex-1 p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-20 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">QTP</span>
                            </div>
                            <div className="flex space-x-2">
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Portfolio Value</span>
                                <span className="text-green-600 text-sm">+2.4%</span>
                              </div>
                              <div className="text-2xl font-bold text-gray-900">৳4,52,340</div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <div className="text-sm text-gray-600 mb-2">Today's Gainers</div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">BRACBANK</span>
                                  <span className="text-green-600 text-sm">+3.2%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">GP</span>
                                  <span className="text-green-600 text-sm">+1.8%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Trade Smart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              QuickTrade Pro brings the power of professional trading to your mobile device with 
              cutting-edge features and intuitive design.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Feature Tabs */}
            <div className="space-y-6">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeFeature === feature.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        activeFeature === feature.id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`${
                        activeFeature === feature.id ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {features.find(f => f.id === activeFeature)?.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {features.find(f => f.id === activeFeature)?.title}
                    </h3>
                    <p className="text-gray-600">
                      {features.find(f => f.id === activeFeature)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Features Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Packed with Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature is designed to give you a competitive edge in the market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              See QuickTrade Pro in Action
            </h2>
            <p className="text-xl text-gray-600">
              Experience the intuitive interface and powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {screenshots.map((screenshot) => (
              <div key={screenshot.id} className="group">
                <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium">{screenshot.title} Screen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Thousands of Traders
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about QuickTrade Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Ahmed",
                role: "Day Trader",
                content: "The speed of execution is incredible. I can place orders instantly and never miss market opportunities. Best trading app in Bangladesh!",
                rating: 5
              },
              {
                name: "Sarah Khan",
                role: "Investment Advisor",
                content: "Professional-grade charts and analysis tools right on my phone. It's like having a trading terminal in my pocket.",
                rating: 5
              },
              {
                name: "Mohammad Hassan",
                role: "Long-term Investor",
                content: "Portfolio tracking is excellent. I love the detailed performance analytics and easy-to-understand reports.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Trading Today
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Download QuickTrade Pro and join thousands of successful traders who trust 
            Midway Securities for their investment journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="#" className="group">
              <div className="bg-white hover:bg-gray-100 text-gray-900 transition-all duration-300 rounded-2xl p-4 flex items-center space-x-4 transform group-hover:scale-105">
                <div className="w-12 h-12">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="currentColor" d="M17.523 15.3414c-.4906-.8136-1.0455-1.5618-1.6637-2.2345-.6181-.6726-1.2994-1.2698-2.0438-1.7916-.7443-.5217-1.5515-.9682-2.4217-1.3394-.8701-.3712-1.8029-.6271-2.7985-.7676v-1.824h-1.2V9.237c-.9956.1405-1.9284.3964-2.7985.7676-.8702.3712-1.6774.8177-2.4217 1.3394-.7444.5218-1.4257 1.119-2.0438 1.7916-.6182.6727-1.1731 1.4209-1.6637 2.2345L12 21.35l11.523-6.0086z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </div>
            </Link>
            
            <Link href="#" className="group">
              <div className="bg-white hover:bg-gray-100 text-gray-900 transition-all duration-300 rounded-2xl p-4 flex items-center space-x-4 transform group-hover:scale-105">
                <div className="w-12 h-12">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center text-blue-100">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Free to Download</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">System Requirements</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Android: 7.0 or later</p>
                <p>iOS: 12.0 or later</p>
                <p>Storage: 50MB free space</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: support@midwaybd.com</p>
                <p>Phone: 09609 100 142</p>
                <p>Live Chat: Available 24/7</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <Link href="/privacy-policy" className="text-blue-600 hover:underline block">Privacy Policy</Link>
                <Link href="/terms-of-service" className="text-blue-600 hover:underline block">Terms of Service</Link>
                <Link href="/user-agreement" className="text-blue-600 hover:underline block">User Agreement</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Midway Securities Limited. All rights reserved. Licensed by BSEC.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAppPage