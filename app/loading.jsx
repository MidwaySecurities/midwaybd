'use client'
import React, { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Logo from './components/Home/logo'

const SimpleLoader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-10">
      {/* Simple centered content */}
      <div className="text-center">
        {/* Logo */}
        <div className="mx-auto mb-6 rounded-xl flex items-center justify-center">
          {/* <TrendingUp className="w-8 h-8 text-white" /> */}
          <Logo width = {40} height={40} />
        </div>

        {/* Company Name */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Midway Securities
        </h1>
        
        {/* Simple loading text */}
        <p className="text-gray-600 mb-8">Loading...</p>

        {/* Progress bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Progress percentage */}
        <p className="text-sm text-gray-500">{progress}%</p>

        {/* Simple loading dots */}
        <div className="flex justify-center gap-1 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default SimpleLoader