import Image from 'next/image'
import React from 'react'

const Card = ({title, cardImageSrc, cardDesc}) => {
    return (
        <div className=''>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                <div className='bg-white shadow-lg rounded-lg p-4 flex flex-col items-center'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <Image src={cardImageSrc} width={150} height={150} className='p-2' />
                    <p className='text-gray-600'>{cardDesc}</p>
                </div>
            </div>
        </div>
    )
}

export default Card