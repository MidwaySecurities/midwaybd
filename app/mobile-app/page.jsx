'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileAppTabSection from '../components/MobileAppTabSection'
import DownloadAppbutton from '../components/DownloadAppbutton'

const MobileAppPage = () => {
  const [activeFeature, setActiveFeature] = useState('trading')

  const tabs = [
    {
      id: "invest",
      blog_id: 1,
      label: 'blog',
      content: 'hELLO WORLD',
      createdAt: '2026-08-25',
    },
    {
      id: "news",
      blog_id: 2,
      label: 'news',
      content: 'News',
      createdAt: '2026-08-25',
    },
  ];

  const features = [
    {
      id: 'trading',
      title: 'Invest',
      description: 'Execute trades instantly with live market data and advanced order types',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgImage: '/images/mobile-app/mobile-backgroud.jpg',
      image: `/images/mobile-app/Invest.png`
    },
    {
      id: 'portfolio',
      title: 'Trade',
      description: 'Track your investments, analyze performance, and monitor profit & loss',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgImage: '/images/mobile-app/mobile-backgroud.jpg',
      image: `/images/mobile-app/Trade.png`
    },
    {
      id: 'research',
      title: 'Tools',
      description: 'Access expert analysis, company reports, and market insights',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bgImage: '/images/mobile-app/mobile-backgroud.jpg',
      image: `/images/mobile-app/Tools.png`
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
    }
  ]

  const screenshots = [
    {
      id: 1,
      title: 'Dashboard',
      image: '/images/mobile-app/Invest.png'
    },
    {
      id: 2,
      title: 'Portfolio',
      image: '/images/mobile-app/Trade.png'
    },
    {
      id: 3,
      title: 'Charts',
      image: '/images/mobile-app/Tools.png'
    },
    {
      id: 4,
      title: 'Charts',
      image: '/images/mobile-app/Tools.png'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-primary_color text-white overflow-hidden relative">
        <div className="absolute inset-0">
          {/* <div className="absolute top-10 left-4 w-40 h-40 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-24 right-4 w-52 h-52 sm:top-40 sm:right-10 sm:w-96 sm:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-16 left-10 w-44 h-44 sm:-bottom-32 sm:left-20 sm:w-80 sm:h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div> */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">

            {/* Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center bg-secondary_color bg-opacity-50 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
                  Now Available on Mobile
                </div>

                <h1 style={{ fontFamily: 'Mokoto' }} className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  QuickTrade Pro
                  <span className="block text-yellow-400">Mobile App</span>
                </h1>

                <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Trade stocks on-the-go with Bangladesh's most advanced mobile trading platform.
                  Real-time data, instant execution, and professional tools in your pocket.
                </p>
              </div>

              {/* Download Buttons */}
              <DownloadAppbutton />
            </div>

            {/* App Mockup */}
            <div className="relative z-0">
              <div className="relative flex justify-center">
                <div className="relative">
                  <div className="w-75 h-137.5 sm:w-72 sm:h-135 lg:w-80 lg:h-150 p-2">
                    <div className="w-full h-full relative">
                      {/* Phone mockup content */}
                      <div className="absolute inset-0 flex flex-col">
                        <img src={`/images/qtp/portfolio.gif`} className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <MobileAppTabSection tabs={tabs} /> */}

      {/* Features Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Everything You Need to Trade Smart
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              QuickTrade Pro brings the power of professional trading to your mobile device with
              cutting-edge features and intuitive design.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* Feature Tabs */}
            <div className="space-y-4 sm:space-y-6 shadow-lg sm:shadow-none rounded-2xl overflow-hidden order-0 lg:order-2 lg:order-1 flex items-center lg:block">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left flex items-center justify-center mb-0 sm:mb-6 p-3 sm:p-6 sm:rounded-2xl sm:border-2 transition-all duration-300 ${activeFeature === feature.id
                    ? 'border-blue-500 bg-blue-50 sm:shadow-lg border-b-4'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`hidden shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl md:flex items-center justify-center ${activeFeature === feature.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-sm md:text-xl font-bold md:mb-2 ${activeFeature === feature.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                        {feature.title}
                      </h3>
                      <p className={`hidden lg:block text-sm md:text-base ${activeFeature === feature.id ? 'text-blue-700' : 'text-gray-600'
                        }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Visual */}
            <div className="relative order-1 lg:order-2">
              <div className="">
                <div style={{
                  backgroundImage: `url(${features.find(f => f.id === activeFeature)?.bgImage})`
                }} className={`300:h-[550] 321:h-[600] 376:h-[650] bg-white rounded-2xl flex items-center justify-center bg-cover bg-top`}>
                  <figure className="w-full h-full flex items-center justify-center">
                    <Image src={`${features.find(f => f.id === activeFeature)?.image}`} width={270} height={300} className='absolute lg:static top-[20px] max-w-[75%] lg:max-w-[38%]' />
                    <figcaption className='lg:hidden absolute bottom-0 text-center px-2 pb-5'>{features.find(f => f.id === activeFeature)?.description}</figcaption>
                  </figure>
                  {/* <p className='block lg:hidden absolute text-center mb-5 lg:mb-10 bottom-0 text-sm sm:text-lg'>{features.find(f => f.id === activeFeature)?.description}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Features Grid */}
      <div className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Packed with Powerful Features
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature is designed to give you a competitive edge in the market
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 sm:gap-8">
            {appFeatures.map((feature, index) => (
              <div key={index} className="sm:bg-white lg:rounded-2xl p-3 lg:p-6 sm:p-8 lg:shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="text-xl sm:text-4xl -ml-1.25 lg:ml-0 mb-0 sm:mb-4 inline-block">{feature.icon}</div>
                <h3 className="inline-block lg:block text-lg sm:text-xl font-bold text-gray-900 mb-0 sm:mb-3 group-hover:text-secondary_color transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              See QuickTrade Pro in Action
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              Experience the intuitive interface and powerful features
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {screenshots.map((screenshot) => (
              <div key={screenshot.id} className="group">
                <div className="">
                  <div className="">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center w-full">
                        <img className="w-full" src={screenshot.image} width={100} height={100} />
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
      <div className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Trusted by Thousands of Investors
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              See what our users are saying about QuickTrade Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Sayed Akber Hoshen",
                role: "Client",
                content: "Great app! It would be even better if we could view Stocks and Mutual Funds in separate, dedicated tabs on the dashboard. Also, please add a feature to \"Hide\" specific stocks from the main portfolio display for privacy. This would make portfolio tracking much more flexible!",
                rating: 5
              },
              {
                name: "mr hasan",
                role: "Client",
                content: "QuickTrade Pro makes trading on DSE extremely easy. Real time updates and fast order execution are impressive. Very user friendly interface.",
                rating: 5
              },
              {
                name: "Muzahidur Rahman",
                role: "Client",
                content: "Simple interface, easy to use, and a lot of information about each stock. Thank you.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-primary_color text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Start Trading Today
          </h2>
          <p className="text-base sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Download QuickTrade Pro and join thousands of successful traders who trust
            Midway Securities for their investment journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
            <DownloadAppbutton />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-blue-100 text-sm sm:text-base">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Free to Download</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>24/7 Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-10 sm:py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">System Requirements</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Android: 10 or later</p>
                <p>iOS: 12.0 or later</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: info@midwaybd.com</p>
                <p>Phone: 09609 100 142</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <Link href="/privacy-policy" className="text-secondary_color hover:underline block">Privacy Policy</Link>
                <Link href="/terms-of-service" className="text-secondary_color hover:underline block">Terms of Service</Link>
                <Link href="/user-agreement" className="text-secondary_color hover:underline block">User Agreement</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAppPage