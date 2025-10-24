import Image from 'next/image'
import React from 'react'

const Logo = ({width, height}) => {
  return (
    <div>
        <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/midway-logo-moto.png`} width={width || 30} height={height || 30} alt='midway logo' />
    </div>
  )
}

export default Logo