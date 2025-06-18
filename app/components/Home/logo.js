import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/midway-logo-moto.png`} width={30} height={30} alt='midway logo' />
    </div>
  )
}

export default Logo