'use client'
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BoFeatures = () => {
  const settings = {
    className: "slider",
    infinite: true,
    centerMode: true,
    centerPadding: "40px",
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
        }
      }
    ]
  };

  const features = [
    {
      title: "Fast Process",
      description: "BO Account opening in minutes",
      bgColor: "bg-blue-100",
      iconColor: "text-secondary_color",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
    },
    {
      title: "Secure & Safe",
      description: "Bank-level security",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      title: "24/7 Access",
      description: "Always here to help",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
    },
    {
      title: "Low Fees",
      description: "Competitive pricing",
      bgColor: "bg-yellow-100",
      isText: true,
      textContent: "৳",
    },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-2 sm:px-12 overflow-hidden">
        <Slider {...settings}>
          {features.map((feature) => (
            <div key={feature.title} className="px-2 sm:px-3">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 ${feature.isText ? "font-bold text-xl" : ""}`}>
                  {feature.isText ? (
                    feature.textContent
                  ) : (
                    <svg className={`w-7 h-7 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .slick-track {
          display: flex;
          align-items: stretch;
        }

        .slick-slide {
          height: auto;
        }

        .slick-slide > div {
          height: 100%;
        }

        .slick-dots {
          bottom: -50px;
        }

        .slick-dots li button:before {
          color: #3B82F6;
          opacity: 0.5;
        }

        .slick-dots li.slick-active button:before {
          color: #3B82F6;
          opacity: 1;
        }

        .slick-prev:before,
        .slick-next:before {
          color: #3B82F6;
          font-size: 20px;
        }

        .slick-prev {
          left: -10px;
          z-index: 1;
        }

        .slick-next {
          right: -10px;
          z-index: 1;
        }

        @media (max-width: 640px) {
          .slick-prev {
            left: 0px;
          }

          .slick-next {
            right: 0px;
          }
        }
      `}</style>
    </>
  );
};

export default BoFeatures;