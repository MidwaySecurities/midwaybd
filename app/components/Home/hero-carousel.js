'use client'

import mobile_app1 from '../../../public/images/home/hero-carousel/H1.png'
import mobile_app2 from '../../../public/images/home/hero-carousel/H2.png'
import hero_image2 from '../../../public/images/home/hero-carousel/H3.png'
import hero_image4 from '../../../public/images/home/hero-carousel/H4.png'
import Image from "next/image";


import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderTitle from './slider-title'

function HeroCarousol() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: false,
        pauseOnHover: false,
        fade: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    focusOnSelect: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false,
                    focusOnSelect: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false,
                    focusOnSelect: false,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false,
                    focusOnSelect: false,
                    pauseOnHover: false,
                }
            }
        ]

    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <SliderTitle title={`Slider title one`} />
                    <Image className="w-full" src={mobile_app1} width={320} alt='QuickTrade Pro 1' />
                </div>
                <div>
                    <SliderTitle title={`Slider title two`} />
                    <Image className="w-full transform" src={hero_image4} width={320} alt='QuickTrade Pro 4' />
                </div>
                <div>
                    <SliderTitle title={`Slider title three`} />
                    <Image className="w-full" src={mobile_app2} width={320} alt='QuickTrade Pro 2' />
                </div>
                <div>
                    <SliderTitle title={`Slider title four`} />
                    <Image className="w-full transform" src={hero_image2} width={320} alt='QuickTrade Pro 3' />
                </div>

            </Slider>
        </div>
    );
}

export default HeroCarousol;