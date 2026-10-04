import Image from 'next/image'
import React from 'react'

const Logo = ({width, height}) => {
  return (
    <div>
        <Image src={`/images/midway-logo-moto.png`} width={width || 30} height={height || 30} alt='midway logo' />
    </div>
  )
}

export default Logo