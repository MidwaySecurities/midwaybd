// import Link from 'next/link'
// import React from 'react'

// const AccountOpenningSteps = () => {
//     return (
//         <div className=' bg-background rounded-xl py-12 border-1 border-gray-300 relative text-black'>
//             <div className='absolute w-[70%] left-[50%] translate-x-[-50%] text-center bg-white p-1 z-[10] top-[-15px]'>
//                 <h1 className='text-black text-[20px] uppercase'>Three Simple Steps</h1>
//             </div>

//             <div>
//                 <div>
//                     <div className='flex flex-col justify-center items-center md:flex-row gap-12'>
//                         <div className='flex flex-col items-center gap-4'>
//                             <Link href={`https://portal.midwaybd.com/bo/portal-login`}>
//                                 <div className='bg-white p-4 rounded-full cercle-shadow w-18 h-18 md:w-1/3 flex items-center justify-center'>
//                                     <h2 className='text-xl font-bold'>1</h2>
//                                 </div>
//                             </Link>
//                             <Link href={`https://portal.midwaybd.com/bo/portal-login`}>
//                                 <h1>Open BO A/C</h1>
//                             </Link>
//                         </div>
//                         <div className='flex flex-col items-center gap-4'>

//                             <Link href={`https://portal.midwaybd.com/dashboard/fund/deposit/add`}>
//                                 <div className='bg-white p-4 rounded-full cercle-shadow w-18 h-18 md:w-1/3 flex items-center justify-center'>
//                                     <h2 className='text-xl font-bold'>2</h2>
//                                 </div>
//                             </Link>

//                             <Link href={`https://portal.midwaybd.com/dashboard/fund/deposit/add`}>
//                                 <h1>Fund your account</h1>
//                             </Link>
//                         </div>
//                         <div className='flex flex-col items-center gap-4'>
//                             <div className='bg-white p-4 rounded-full cercle-shadow w-18 h-18 md:w-1/3 flex items-center justify-center'>
//                                 <h2 className='text-xl font-bold'>3</h2>
//                             </div>
//                             <h1>Start your trade</h1>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AccountOpenningSteps

import Link from 'next/link'
import React from 'react'

const AccountOpenningSteps = () => {
    const steps = [
        {
            number: "1",
            title: "Open BO Account",
            description: "Create your beneficiary owner account in minutes with our streamlined process",
            link: "https://portal.midwaybd.com/bo/portal-login",
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            bgColor: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700"
        },
        {
            number: "2",
            title: "Fund Your Account",
            description: "Deposit funds securely through bank transfer, mobile banking, or credit card",
            link: "https://portal.midwaybd.com/dashboard/fund/deposit/add",
            icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            bgColor: "from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700"
        },
        {
            number: "3",
            title: "Start Trading",
            description: "Begin your investment journey with our advanced trading platforms and tools",
            link: null, // No link for this step
            icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            bgColor: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700"
        }
    ];

    const StepCard = ({ step, index, isLast }) => {
        const CardContent = () => (
            <div className="group relative">
                <div className="text-center space-y-6">
                    {/* Step Number Circle */}
                    <div className="relative mx-auto">
                        <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${step.bgColor} ${step.hoverColor} shadow-lg group-hover:shadow-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110`}>
                            <span className="text-2xl lg:text-3xl font-bold text-white">
                                {step.number}
                            </span>
                        </div>

                        {/* Icon overlay */}
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                            {step.icon}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                            {step.description}
                        </p>

                        {step.link && (
                            <div className="pt-4">
                                <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                                    Get Started
                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Connecting Line */}
                {!isLast && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5">
                        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-full animate-pulse"></div>
                        </div>
                    </div>
                )}

                {/* Mobile Connecting Line */}
                {!isLast && (
                    <div className="lg:hidden flex justify-center mt-8 mb-8">
                        <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-full animate-pulse"></div>
                        </div>
                    </div>
                )}
            </div>
        );

        return (
            <div className="relative">
                {step.link ? (
                    <Link href={step.link} className="block transition-transform duration-300 hover:scale-105">
                        <CardContent />
                    </Link>
                ) : (
                    <div className="transition-transform duration-300 hover:scale-105">
                        <CardContent />
                    </div>
                )}
            </div>
        );
    };

    return (
        // <div className="max-w-7xl mx-auto px-4 py-16">
        //     {/* Header */}
        //     <div className="text-center mb-16">
        //         <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-6">
        //             <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
        //             Simple Process
        //         </div>

        //         <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
        //             Start Trading in 
        //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Three Simple Steps</span>
        //         </h2>

        //         <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        //             Join thousands of successful traders with our streamlined account opening process. 
        //             Get started in minutes and begin your investment journey today.
        //         </p>
        //     </div>

        //     {/* Steps */}
        //     <div className="relative">
        //         {/* Desktop Layout */}
        //         <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
        //             {steps.map((step, index) => (
        //                 <StepCard 
        //                     key={index} 
        //                     step={step} 
        //                     index={index} 
        //                     isLast={index === steps.length - 1}
        //                 />
        //             ))}
        //         </div>

        //         {/* Mobile Layout */}
        //         <div className="lg:hidden space-y-0">
        //             {steps.map((step, index) => (
        //                 <StepCard 
        //                     key={index} 
        //                     step={step} 
        //                     index={index} 
        //                     isLast={index === steps.length - 1}
        //                 />
        //             ))}
        //         </div>
        //     </div>

        //     {/* Call to Action */}
        //     <div className="text-center mt-16 pt-12 border-t border-gray-200">
        //         <div className="space-y-6">
        //             <h3 className="text-2xl font-bold text-gray-800">
        //                 Ready to Get Started?
        //             </h3>
        //             <p className="text-gray-600 max-w-2xl mx-auto">
        //                 Open your BO account today and join the growing community of successful traders in Bangladesh's capital market.
        //             </p>
        //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
        //                 <Link href="https://portal.midwaybd.com/bo/portal-login">
        //                     <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
        //                         Open Account Now
        //                     </button>
        //                 </Link>
        //                 <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-bold px-8 py-4 rounded-full transition-all duration-300">
        //                     Contact Support
        //                 </button>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Features */}
        //     <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        //         <div className="text-center p-4">
        //             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
        //                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        //                 </svg>
        //             </div>
        //             <h4 className="font-semibold text-gray-800">Fast Process</h4>
        //             <p className="text-sm text-gray-600">Account opening in minutes</p>
        //         </div>

        //         <div className="text-center p-4">
        //             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
        //                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        //                 </svg>
        //             </div>
        //             <h4 className="font-semibold text-gray-800">Secure & Safe</h4>
        //             <p className="text-sm text-gray-600">Bank-level security</p>
        //         </div>

        //         <div className="text-center p-4">
        //             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
        //                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        //                 </svg>
        //             </div>
        //             <h4 className="font-semibold text-gray-800">24/7 Support</h4>
        //             <p className="text-sm text-gray-600">Always here to help</p>
        //         </div>

        //         <div className="text-center p-4">
        //             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
        //                 <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        //                 </svg>
        //             </div>
        //             <h4 className="font-semibold text-gray-800">Low Fees</h4>
        //             <p className="text-sm text-gray-600">Competitive pricing</p>
        //         </div>
        //     </div>
        // </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-6">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Simple Process
                </div>

                <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                    Start Trading in{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Three Simple Steps
                    </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of successful traders with our streamlined account opening
                    process. Get started in minutes and begin your investment journey today.
                </p>
            </div>

            {/* Steps */}
            <div className="relative">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            step={step}
                            index={index}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-8">
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            step={step}
                            index={index}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16 pt-12 border-t border-gray-200">
                <div className="space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        Ready to Get Started?
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Open your BO account today and join the growing community of successful
                        traders in Bangladesh's capital market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://portal.midwaybd.com/bo/portal-login"
                            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Open Account Now
                        </Link>
                        <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-blue-50">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                            className="w-7 h-7 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Fast Process</h4>
                    <p className="text-sm text-gray-600">Account opening in minutes</p>
                </div>

                <div className="text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                            className="w-7 h-7 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Secure & Safe</h4>
                    <p className="text-sm text-gray-600">Bank-level security</p>
                </div>

                <div className="text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                            className="w-7 h-7 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Always here to help</p>
                </div>

                <div className="text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                            className="w-7 h-7 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Low Fees</h4>
                    <p className="text-sm text-gray-600">Competitive pricing</p>
                </div>
            </div>
        </div>

    );
};

export default AccountOpenningSteps;