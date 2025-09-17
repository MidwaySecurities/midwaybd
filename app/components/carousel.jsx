'use client';

import { useState, useEffect } from "react";
import Image from "next/image";


export default function Carousel({images}) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (index) => setCurrent(index);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
  const nextSlide = () => setCurrent((current + 1) % length);

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-contain"
              priority={index === 0} // preload first image
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute flex space-x-3 -translate-x-1/2 bottom-[-2rem] left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-qtp_btn_bg_color" : "bg-gray-300"
            //   "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50">
          <svg
            className="w-4 h-4 text-qtp_btn_bg_color"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50">
          <svg
            className="w-4 h-4 text-qtp_btn_bg_color"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
        </span>
      </button>
    </div>
  );
}
