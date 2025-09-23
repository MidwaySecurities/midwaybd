// 'use client'
// import Image from "next/image";
// import Link from "next/link";
// import Slider from "react-slick"


// const Regulators = () => {
//   const settings = {
//     className: "slider variable-width",
//     // dots: true,
//     infinite: true,
//     centerMode: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     variableWidth: true
//   };

//   return (
//     <div className="text-black mb-12 mt-6 w-[92%] m-auto">
//       <Slider {...settings}>
//         <div className="mx-2 inline-block">
//           <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
//             <Link href={`https://www.dsebd.org/`} target="_blank">
//               <Image src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE_%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%95_%E0%A6%8F%E0%A6%95%E0%A7%8D%E0%A6%B8%E0%A6%9A%E0%A7%87%E0%A6%9E%E0%A7%8D%E0%A6%9C-%E0%A6%8F%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg/250px-%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE_%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%95_%E0%A6%8F%E0%A6%95%E0%A7%8D%E0%A6%B8%E0%A6%9A%E0%A7%87%E0%A6%9E%E0%A7%8D%E0%A6%9C-%E0%A6%8F%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg.png`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
//             </Link>
//           </div>
//         </div>

//         <div className="mx-2 inline-block">
//           <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
//             <Link href={`https://cdbl.com.bd`} target="_blank">
//               <Image src={`https://cdbl.com.bd/assets/img/CDBL%20Logo.png`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
//             </Link>
//           </div>
//         </div>

//         <div className="mx-2 inline-block">
//           <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
//             <Link href={`https://www.bb.org.bd/`} target="_blank">
//               <Image src={`https://upload.wikimedia.org/wikipedia/commons/6/63/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%82%E0%A6%95%E0%A7%87%E0%A6%B0_%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A7%80%E0%A6%95.svg`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
//             </Link>
//           </div>
//         </div>

//         <div className="mx-2 inline-block">
//           <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
//             <Link href={`https://sec.gov.bd/`} target="_blank">
//               <Image src={`https://sec.gov.bd/images/BSEC-LOGO.png`} alt="bsec logo" width={80} height={80} className="w-[70px]" />
//             </Link>
//           </div>
//         </div>
//       </Slider>
//     </div>
//   )
// }

// export default Regulators

'use client'
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const Regulators = () => {
  const settings = {
    className: "slider variable-width",
    infinite: true,
    centerMode: true,
    slidesToShow: 4,
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
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          variableWidth: true,
        }
      }
    ]
  };

  const regulators = [
    {
      name: "Dhaka Stock Exchange",
      url: "https://www.dsebd.org/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE_%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%95_%E0%A6%8F%E0%A6%95%E0%A7%8D%E0%A6%B8%E0%A6%9A%E0%A7%87%E0%A6%9E%E0%A7%8D%E0%A6%9C-%E0%A6%8F%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg/250px-%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE_%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%95_%E0%A6%8F%E0%A6%95%E0%A7%8D%E0%A6%B8%E0%A6%9A%E0%A7%87%E0%A6%9E%E0%A7%8D%E0%A6%9C-%E0%A6%8F%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg.png",
      alt: "Dhaka Stock Exchange"
    },
    {
      name: "Central Depository Bangladesh Limited",
      url: "https://cdbl.com.bd",
      logo: "https://cdbl.com.bd/assets/img/CDBL%20Logo.png",
      alt: "CDBL"
    },
    {
      name: "Bangladesh Bank",
      url: "https://www.bb.org.bd/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/63/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%82%E0%A6%95%E0%A7%87%E0%A6%B0_%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A7%80%E0%A6%95.svg",
      alt: "Bangladesh Bank"
    },
    {
      name: "Bangladesh Securities and Exchange Commission",
      url: "https://sec.gov.bd/",
      logo: "https://sec.gov.bd/images/BSEC-LOGO.png",
      alt: "BSEC"
    }
  ];

  return (
    <>
      {/* Desktop and Tablet View */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4">
          <Slider {...settings}>
            {regulators.map((regulator, index) => (
              <div key={index} className="px-3">
                <div className="group">
                  <Link 
                    href={regulator.url} 
                    target="_blank"
                    className="block"
                  >
                    <div className="w-32 h-32 lg:w-36 lg:h-36 mx-auto rounded-full bg-white shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 flex justify-center items-center group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50">
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                        <Image 
                          src={regulator.logo} 
                          alt={regulator.alt} 
                          fill
                          className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                          sizes="(max-width: 768px) 80px, 96px"
                        />
                      </div>
                    </div>
                    {/* <div className="text-center mt-4">
                      <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {regulator.name}
                      </h3>
                    </div> */}
                    <div className="h-8"></div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Mobile View - Grid Layout */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-6 px-4 max-w-sm mx-auto">
          {regulators.map((regulator, index) => (
            <div key={index} className="group">
              <Link 
                href={regulator.url} 
                target="_blank"
                className="block"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-500 flex justify-center items-center group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50">
                  <div className="relative w-16 h-16">
                    <Image 
                      src={regulator.logo} 
                      alt={regulator.alt} 
                      fill
                      className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                      sizes="64px"
                    />
                  </div>
                </div>
                <div className="text-center mt-3">
                  <h3 className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {regulator.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span className="text-sm font-medium">Regulated & Licensed</span>
        </div>
      </div>

      <style jsx>{`
        .slick-track {
          display: flex;
          align-items: center;
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
          left: -50px;
        }
        
        .slick-next {
          right: -50px;
        }
        
        @media (max-width: 640px) {
          .slick-prev {
            left: -25px;
          }
          
          .slick-next {
            right: -25px;
          }
        }
      `}</style>
    </>
  );
};

export default Regulators;