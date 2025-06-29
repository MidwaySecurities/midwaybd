'use client'
import React, { useEffect, useState } from 'react'
import Navigation from './modal/navigation'
import TimeDate from './Home/time-date'
import FirstNavBar from './Home/first-nav-bar'
import SubNav from './Home/sub-nav'

const NavigationBar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    console.log(lastScrollY)
    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            setIsMobileMenuOpen(false);
            setLastScrollY(currentScrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [lastScrollY]);

    return (
        // <nav className={`bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
        <nav className={`bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-[106px]'} ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
            <Navigation />
            <TimeDate />
            <div>
                <FirstNavBar />
            </div>
            <div className="sticky top-0 z-50">
                <SubNav />
            </div>
        </nav>
    )
}

export default NavigationBar