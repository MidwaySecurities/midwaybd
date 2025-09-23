// 'use client'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { Suspense } from 'react'
// import DepositTab from '../components/deposit/depositTab'
// import DepositForm from '../components/depositForm'
// import MobileDeposit from '../components/mobileDeposit'
// import CreditCardDeposit from '../components/creditCardDeposit'

// const Deposit = ({ searchParams }) => {

//     const tabs = [
//         {
//             id: "online", label: "Navigating the Evolving Bangladesh Capital Market: Key Trends for Q3 2025", content: <>
//                 <div>
//                     <div>Dear <strong>Midway Client</strong> Select any of the Banks  below to deposit into your <strong>BO account.</strong> Please include your <strong>Midway Client Code</strong> in the <strong>Reference/Remarks/Comments</strong> sections of your Bank.</div>
//                     <div className='mt-2 mb-2 font-bold'>
//                         Midway Securities Limited<br />
//                         The City Bank (Principal Office Branch)<br />
//                         A/C: 3101093011001, Routing: 225275357
//                     </div>
//                     <div className='mt-2 mb-2 font-bold'>
//                         Midway Securities Limited<br />
//                         Dutch Bangla Bank (Local Office Branch)<br />
//                         A/C: 1011200006385, Routing: 090273889
//                     </div>
//                     <p>Want to deposit now?</p>

//                     <DepositForm />
//                 </div>
//             </>, createdAt: "2025-08-01"
//         },
//         {
//             id: "mobile", label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025", content: <>
//                 <div>Dear <strong>Midway Client</strong> Select any of the <strong>Mobile Money</strong> below to deposit into your <strong>BO account.</strong> Please include your <strong>Midway Client Code</strong> in the <strong>Reference/Remarks/Comments</strong> sections of your bKash, Nagad or Rocket account.</div>
//                 <div className='ml-4 mt-2 mb-2`'>
//                     <ul className='list-disc mt-2 ml-4'>
//                         <li>bKash Account No: <strong>01845222333</strong></li>
//                         <li>Nagad Account No: <strong>01776106410</strong></li>
//                         <li>Rocket Account No: <strong>017761064101</strong></li>
//                         <li>Reference : <strong>Your <strong>Midway Client Code</strong></strong></li>
//                         <li>Counter no : <strong>01</strong></li>
//                     </ul>
//                 </div>
//                 <div className='mt-4'>
//                     <ul>
//                         <li>Email: <strong>accounts@midwaybd.com</strong></li>
//                         <li>Phone: <strong>09609 100 142</strong></li>
//                         <li>​Facebook: <strong><Link href={`http://m.me/midwaytrec142`} target='_blank'>Facebook</Link></strong></li>
//                     </ul>
//                 </div>
//                 <p>Want to deposit now?</p>
//                 <MobileDeposit />
//             </>, createdAt: "2025-08-02"
//         },
//         {
//             id: "credit", label: "DSE Market Update – August 2025", content: <>
//                 <div>
//                     <h1 className='text-xl font-semibold mb-2'>Credit Card fees:</h1>
//                     <ul>
//                         <li><strong>2.2%</strong> for <strong>Visa, MasterCard</strong> other payment channels</li>
//                         <li><strong>3.5% for <strong>American Express</strong></strong></li>
//                     </ul>
//                 </div>
//                 <p>Want to deposit now?</p>
//                 <CreditCardDeposit />
//             </>, createdAt: "2025-08-03"
//         },
//     ];
//     const activeCity = searchParams.tab?.toLowerCase() || "Hello";
//     const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];
//     return (
//         <div className='pt-4'>
//             <div className={`bg-[url('/images/deposit/deposit.png')]  bg-contain bg-no-repeat bg-center h-[300px] flex flex-col gap-3 items-center justify-center relative`}>
//                 {/* <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Bkash, Nagad, Rocket</button>
//                 <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Credit Card</button>
//                 <button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'><Link href="tel:09609100142">09609100142</Link></button> */}
//             </div>
//             <img src={`/images/deposit/deposit.png`} width={100} height={100} className='w-screen h-auto' alt='deposit' />
//             {/* <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1201520934.png)] bg-cover bg-center h-[200px] flex flex-col gap-3 items-center justify-center relative'>
//                 <div className='flex justify-center items-center flex-col gap-4 bg-[#3387a24d] p-4 rounded-lg mx-4'>
//                     <h1 className='text-2xl text-center font-semibold text-white'>Make your deposits using Midway Portal</h1>
//                     <Link href={`https://portal.midwaybd.com/register`} target='_blank'><button className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Register</button></Link>
//                 </div>
//             </div>  */}
//             <div className='m-4'>
//                 <DepositTab activeCity={activeTab.id} />
//                 <div className='mt-4 p-4 border border-gray-300 rounded-lg'>
//                     {activeTab.content}
//                 </div>
//             </div>
//             <div className='mt-8 mb-8 mx-4'>
//                 <img src='/images/deposit/sslcommerz-pay-with-logo-all-size-05_orig.png' alt='sslcommerz' className='w-full mx-auto' />
//             </div>
//             <div className='mt-8 mb-8 mx-4'>
//                 <div className='mt-8 flex justify-center'>
//                     <iframe width="560" height="315" src="https://www.youtube.com/embed/KkBCBNHRL2A?si=v4UhTaSbcuCBIagM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Deposit

// 'use client';

// import Link from 'next/link';
// import DepositTab from '../components/deposit/depositTab';
// import DepositForm from '../components/depositForm';
// import MobileDeposit from '../components/mobileDeposit';
// import CreditCardDeposit from '../components/creditCardDeposit';

// const Deposit = ({ searchParams }) => {
//   const tabs = [
//     {
//       id: "online",
//       label: "Navigating the Evolving Bangladesh Capital Market: Key Trends for Q3 2025",
//       content: (
//         <div className="space-y-4">
//           <p>
//             Dear <strong>Midway Client</strong>, select any of the banks below to deposit into your{" "}
//             <strong>BO account</strong>. Please include your{" "}
//             <strong>Midway Client Code</strong> in the{" "}
//             <strong>Reference/Remarks/Comments</strong> sections of your Bank.
//           </p>

//           <div className="font-bold space-y-2">
//             <p>
//               Midway Securities Limited <br />
//               The City Bank (Principal Office Branch) <br />
//               A/C: 3101093011001, Routing: 225275357
//             </p>
//             <p>
//               Midway Securities Limited <br />
//               Dutch Bangla Bank (Local Office Branch) <br />
//               A/C: 1011200006385, Routing: 090273889
//             </p>
//           </div>

//           <p className="font-medium">Want to deposit now?</p>
//           <DepositForm />
//         </div>
//       ),
//       createdAt: "2025-08-01",
//     },
//     {
//       id: "mobile",
//       label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025",
//       content: (
//         <div className="space-y-4">
//           <p>
//             Dear <strong>Midway Client</strong>, select any of the{" "}
//             <strong>Mobile Money</strong> options below to deposit into your{" "}
//             <strong>BO account</strong>. Please include your{" "}
//             <strong>Midway Client Code</strong> in the{" "}
//             <strong>Reference/Remarks/Comments</strong>.
//           </p>

//           <ul className="list-disc pl-6 space-y-1">
//             <li>
//               bKash Account No: <strong>01845222333</strong>
//             </li>
//             <li>
//               Nagad Account No: <strong>01776106410</strong>
//             </li>
//             <li>
//               Rocket Account No: <strong>017761064101</strong>
//             </li>
//             <li>
//               Reference: <strong>Your Midway Client Code</strong>
//             </li>
//             <li>
//               Counter no: <strong>01</strong>
//             </li>
//           </ul>

//           <div className="space-y-1">
//             <p>Email: <strong>accounts@midwaybd.com</strong></p>
//             <p>Phone: <strong>09609 100 142</strong></p>
//             <p>
//               Facebook:{" "}
//               <strong>
//                 <Link href="http://m.me/midwaytrec142" target="_blank">
//                   Messenger
//                 </Link>
//               </strong>
//             </p>
//           </div>

//           <p className="font-medium">Want to deposit now?</p>
//           <MobileDeposit />
//         </div>
//       ),
//       createdAt: "2025-08-02",
//     },
//     {
//       id: "credit",
//       label: "DSE Market Update – August 2025",
//       content: (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">Credit Card fees:</h2>
//           <ul className="list-disc pl-6">
//             <li>
//               <strong>2.2%</strong> for <strong>Visa, MasterCard</strong> and other channels
//             </li>
//             <li>
//               <strong>3.5%</strong> for <strong>American Express</strong>
//             </li>
//           </ul>

//           <p className="font-medium">Want to deposit now?</p>
//           <CreditCardDeposit />
//         </div>
//       ),
//       createdAt: "2025-08-03",
//     },
//   ];

//   const activeCity = searchParams.tab?.toLowerCase() || "online";
//   const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];

//   return (
//     <div className="pt-4">
//       {/* Hero Section */}
//       <div className="relative h-[250px] sm:h-[300px] bg-[url('/images/deposit/deposit.png')] bg-cover bg-center flex items-center justify-center">
//         <div className="bg-black/40 p-6 rounded-lg text-center">
//           <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
//             Make Your Deposits with Midway Securities
//           </h1>
//           <p className="text-gray-200 text-sm sm:text-base mt-2">
//             Easy, fast, and secure payment options for all clients
//           </p>
//         </div>
//       </div>

//       {/* Deposit Content */}
//       <div className="m-4">
//         <DepositTab activeCity={activeTab.id} />
//         <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
//           {activeTab.content}
//         </div>
//       </div>

//       {/* SSLCommerz Logo */}
//       <div className="mt-8 mb-8 mx-4 flex justify-center">
//         <img
//           src="/images/deposit/sslcommerz-pay-with-logo-all-size-05_orig.png"
//           alt="sslcommerz"
//           className="max-w-[300px] sm:max-w-[500px] w-full h-auto"
//         />
//       </div>

//       {/* Responsive YouTube Video */}
//       <div className="mx-4 mb-12">
//         <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ paddingTop: "56.25%" }}>
//           <iframe
//             className="absolute top-0 left-0 w-full h-full"
//             src="https://www.youtube.com/embed/KkBCBNHRL2A?si=v4UhTaSbcuCBIagM"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Deposit;


'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import DepositTab from '../components/deposit/depositTab'
import DepositForm from '../components/depositForm'
import MobileDeposit from '../components/mobileDeposit'
import CreditCardDeposit from '../components/creditCardDeposit'

const Deposit = ({ searchParams }) => {

    const tabs = [
        {
            id: "online", 
            label: "Bank Transfer", 
            icon: "🏦",
            content: <>
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <div className="text-gray-700 mb-4">
                            Dear <strong className="text-blue-600">Midway Client</strong>, select any of the banks below to deposit into your <strong className="text-blue-600">BO account</strong>. Please include your <strong className="text-blue-600">Midway Client Code</strong> in the <strong className="text-blue-600">Reference/Remarks/Comments</strong> sections of your bank transfer.
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-bold">CB</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-800">The City Bank</h3>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><span className="font-medium">Branch:</span> Principal Office</p>
                                    <p><span className="font-medium">A/C:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">3101093011001</span></p>
                                    <p><span className="font-medium">Routing:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">225275357</span></p>
                                </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-green-600 font-bold">DB</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Dutch Bangla Bank</h3>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><span className="font-medium">Branch:</span> Local Office</p>
                                    <p><span className="font-medium">A/C:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">1011200006385</span></p>
                                    <p><span className="font-medium">Routing:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">090273889</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Ready to deposit?</h3>
                        <DepositForm />
                    </div>
                </div>
            </>, 
            createdAt: "2025-08-01"
        },
        {
            id: "mobile", 
            label: "Mobile Banking", 
            icon: "📱",
            content: <>
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                        <div className="text-gray-700 mb-6">
                            Dear <strong className="text-green-600">Midway Client</strong>, select any of the <strong className="text-green-600">Mobile Money</strong> services below to deposit into your <strong className="text-green-600">BO account</strong>. Please include your <strong className="text-green-600">Midway Client Code</strong> in the <strong className="text-green-600">Reference/Remarks/Comments</strong> section.
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-pink-600 font-bold text-xs">bK</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800">bKash</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Account:</span><br />
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-lg">01845222333</span>
                                </p>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-orange-600 font-bold text-xs">Ng</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800">Nagad</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Account:</span><br />
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-lg">01776106410</span>
                                </p>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-purple-600 font-bold text-xs">Rc</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800">Rocket</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Account:</span><br />
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-lg">017761064101</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-3">Important Details:</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-700">Reference:</span> Your Midway Client Code</p>
                                <p><span className="font-medium text-gray-700">Counter No:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">01</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-4">Need Help? Contact Us</h4>
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-500">✉️</span>
                                <span>accounts@midwaybd.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500">📞</span>
                                <span>09609 100 142</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600">📘</span>
                                <Link href="http://m.me/midwaytrec142" target="_blank" className="text-blue-600 hover:underline">
                                    Facebook Chat
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Ready to deposit?</h3>
                        <MobileDeposit />
                    </div>
                </div>
            </>, 
            createdAt: "2025-08-02"
        },
        {
            id: "credit", 
            label: "Credit Card", 
            icon: "💳",
            content: <>
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Credit Card Deposit</h2>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Processing Fees:</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 text-sm font-bold">V/M</span>
                                        </div>
                                        <span className="font-medium text-gray-700">Visa / MasterCard</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">2.2%</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-sm font-bold">AE</span>
                                        </div>
                                        <span className="font-medium text-gray-700">American Express</span>
                                    </div>
                                    <span className="text-lg font-bold text-green-600">3.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Ready to deposit?</h3>
                        <CreditCardDeposit />
                    </div>
                </div>
            </>, 
            createdAt: "2025-08-03"
        },
    ];
    
    const activeCity = searchParams.tab?.toLowerCase() || "online";
    const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative px-4 py-16 sm:py-20 lg:py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Secure & Easy <span className="text-yellow-300">Deposits</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Multiple convenient ways to fund your trading account
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                                <span className="text-sm font-medium">🏦 Bank Transfer</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                                <span className="text-sm font-medium">📱 Mobile Banking</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                                <span className="text-sm font-medium">💳 Credit Card</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Tabs Navigation */}
                <div className="mb-8">
                    <DepositTab activeCity={activeTab.id} />
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
                    <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">{activeTab.icon}</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{activeTab.label}</h2>
                    </div>
                    {activeTab.content}
                </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
                        Secure Payment Processing
                    </h2>
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <img 
                            src='/images/deposit/sslcommerz-pay-with-logo-all-size-05_orig.png' 
                            alt='SSLCommerz Secure Payment' 
                            className='max-w-full h-auto mx-auto filter hover:brightness-110 transition-all duration-300' 
                        />
                        <p className="text-gray-600 mt-4 text-sm">
                            Your transactions are protected by industry-standard SSL encryption
                        </p>
                    </div>
                </div>
            </div>

            {/* Tutorial Video Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        How to Deposit - Tutorial
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Watch our step-by-step guide to make your first deposit
                    </p>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                        <div className="aspect-video">
                            <iframe 
                                className="w-full h-full" 
                                src="https://www.youtube.com/embed/KkBCBNHRL2A?si=v4UhTaSbcuCBIagM" 
                                title="How to Deposit - Midway Securities" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-blue-50 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
                        Need Help? We're Here for You
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl">📞</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                            <p className="text-gray-600">09609 100 142</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-2xl">✉️</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                            <p className="text-gray-600 break-all">accounts@midwaybd.com</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl">💬</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
                            <Link 
                                href="http://m.me/midwaytrec142" 
                                target="_blank" 
                                className="text-blue-600 hover:underline"
                            >
                                Facebook Messenger
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deposit