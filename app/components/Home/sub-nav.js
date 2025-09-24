// 'use client'

// import { useModalClose } from "../close-button-provider";
// import bangladeshFlag from '../../../public/images/bangladesh.png';
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const SubNav = () => {
//     const { isModalOpen, closeModal, openModal } = useModalClose();
//     const pathname = usePathname(); // Current path

//     // Helper to determine active tab
//     const isActive = (path) => pathname === path;

//     return (
//         <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
//             <div className={`inline-block px-4 py-2 rounded-lg shadow-md mr-2 cursor-pointer ${isActive('/bo') ? 'bg-qtp_btn_bg_color text-white' : 'bg-[#004990] text-white'}`}>
//                 <Link href={`https://portal.midwaybd.com/bo/portal-login`} target="_blank">Open BO A/C</Link>
//             </div>
//             <div className={`inline-block px-4 py-2 rounded-lg shadow-md mr-2 cursor-pointer ${isActive('/deposit') ? 'bg-qtp_btn_bg_color text-white' : 'bg-white'}`}>
//                 <Link href={'/deposit'}>Deposits</Link>
//             </div>
//             <div className={`inline-block px-4 py-2 rounded-lg shadow-md mr-2 cursor-pointer ${isActive('/withdrawals') ? 'bg-qtp_btn_bg_color text-white' : 'bg-white'}`}>
//                 <Link href={`/withdrawals`}>Withdrawals</Link>
//             </div>
//             <div className="px-4 py-2 bg-white rounded-lg shadow-md mr-2 flex gap-1 items-center">
//                 <Link href={`/`} className="flex items-center gap-1">
//                     <Image src={bangladeshFlag} alt='bangladesh' height={15} width={15} className='w-[18px] h-[18px] inline-block' />
//                     <span className="inline-block pr-4">বাংলা</span>
//                 </Link>
//             </div>
//             <div onClick={openModal} className="inline-block cursor-default px-4 py-2 bg-white rounded-lg shadow-md mr-2">
//                 More
//             </div>
//         </div>
//     );
// }

// export default SubNav;

'use client'

import { useModalClose } from "../close-button-provider";
import bangladeshFlag from '../../../public/images/bangladesh.png';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubNav = () => {
  const { openModal } = useModalClose();
  const pathname = usePathname();

  const navItems = [
    { href: "/deposit", label: "Deposits" },
    { href: "/withdrawals", label: "Withdrawals" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
      
      {/* External link → use <a>, not Next.js Link */}
      <a
        href="https://portal.midwaybd.com/bo/portal-login"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 rounded-lg shadow-md mr-2 bg-[#004990] text-white"
      >
        Open BO A/C
      </a>

      {/* Internal links */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          prefetch = {false}
          className={`inline-block px-4 py-2 rounded-lg shadow-md mr-2 ${
            isActive(item.href)
              ? "bg-qtp_btn_bg_color text-white"
              : "bg-white"
          }`}
        >
          {item.label}
        </Link>
      ))}

      {/* Language switch */}
      <Link
        href="/"
        className="px-4 py-2 bg-white rounded-lg shadow-md mr-2 flex gap-1 items-center"
      >
        <Image
          src={bangladeshFlag}
          alt="bangladesh"
          height={18}
          width={18}
          className="inline-block"
        />
        <span className="inline-block pr-4">বাংলা</span>
      </Link>

      {/* Modal trigger */}
      <button
        onClick={openModal}
        className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2"
      >
        More
      </button>
    </div>
  );
};

export default SubNav;
