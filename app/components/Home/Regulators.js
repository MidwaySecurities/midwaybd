'use client'
import Image from "next/image";
import Slider from "react-slick"


const Regulators = () => {
  const settings = {
    className: "slider variable-width",
    // dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };
  
  return (
    <div className="text-black mb-12 mt-12">
      <h1 className="text-center text-black pb-4 text-2xl mt-8">Our Regulators</h1>
      <Slider {...settings}>
        <div className="mx-2 inline-block">
          <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
            <Image src={`https://cdbl.com.bd/assets/img/CDBL%20Logo.png`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
          </div>
        </div>

        <div className="mx-2 inline-block">
          <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
            <Image src={`https://www.dsebd.org/assets/images/plc-logo.png`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
          </div>
        </div>

        <div className="mx-2 inline-block">
          <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
            <Image src={`https://sec.gov.bd/images/BSEC-LOGO.png`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
          </div>
        </div>

        <div className="mx-2 inline-block">
          <div className='w-[100px] h-[100px] py-3 rounded-full bg-[#F8F7F5] hover:bg-[#DBEAFE] hover:drop-shadow-lg duration-500 flex justify-center items-center flex-col'>
            <Image src={`https://upload.wikimedia.org/wikipedia/commons/6/63/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%82%E0%A6%95%E0%A7%87%E0%A6%B0_%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A7%80%E0%A6%95.svg`} alt="cdbl image" width={80} height={80} className="w-[70px]" />
          </div>
        </div>

      </Slider>
    </div>
  )
}

export default Regulators