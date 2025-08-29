
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import bangladeshFlag from '../../../public/images/bangladesh.png';
// import Timer from '../timer';

// export default function TimeDate() {
    
//     useEffect(() => {
//         const marketStatus = () => {
//             fetch(`https://www.amarstock.com/info/market/status-ex`).then(res => {
//                 return res.json()
//             }).then(data => {
//                 console.log(data)
//             })
            
//         }
//         marketStatus()
//     }, [])
    
//     return (
//         <div className='flex justify-between py-1 px-4 bg-white'>
//             <div className='flex gap-1'>
//                 <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[20px]' />
//                 <Timer />
//             </div>
//             {/* <p className='font-bold'>DSE: <span className={`${isAfterTwoThirty ? 'text-black' : 'text-[#22C55E]'}`}>{isAfterTwoThirty?'CLOSE':'OPEN'}</span></p> */}
//         </div>
//     );
// }



'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import bangladeshFlag from '../../../public/images/bangladesh.png';
import Timer from '../timer';

export default function TimeDate() {
  const [isMarketOpen, setIsMarketOpen] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      const res = await fetch(`https://www.amarstock.com/info/market/status-ex`);
      const status = await res.json();
      setIsMarketOpen(status?.status?.toLowerCase() === 'open');
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between py-1 px-4 bg-white">
      <div className="flex gap-1 items-center">
        <Image
          src={bangladeshFlag}
          alt="bangladesh"
          height={15}
          width={15}
          className="w-[20px]"
        />
        <Timer />
      </div>

      <p className="font-bold">
        DSE:{' '}
        <span
          className={
            isMarketOpen === null
              ? 'text-gray-400'
              : isMarketOpen
              ? 'text-[#22C55E]'
              : 'text-black'
          }
        >
          {isMarketOpen === null ? 'Loading...' : isMarketOpen ? 'OPEN' : 'CLOSE'}
        </span>
      </p>
    </div>
  );
}

