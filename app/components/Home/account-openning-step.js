import React from 'react';

const AccountOpeningSteps = () => {
    const steps = [
        {
            number: "1",
            title: "Open BO Account",
            description: "Create your Beneficiary Owner account in minutes with our streamlined process",
            link: "https://portal.midwaybd.com/bo/portal-login",
            icon: (
                <svg className="w-8 h-8 text-secondary_color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            bgColor: "bg-secondary_color",
            hoverColor: "hover:from-blue-600 hover:to-blue-700"
        },
        {
            number: "2",
            title: "Fund Your Account",
            description: "Deposit funds securely through bank transfer, mobile banking, or credit card",
            link: "https://portal.midwaybd.com/dashboard/fund/deposit/add",
            icon: (
                <div className="text-xl font-bold text-primary_color">৳</div>
            ),
            bgColor: "bg-gradient-to-br from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700"
        },
        {
            number: "3",
            title: "Start Investing",
            description: "Begin your investment journey with our advanced trading platforms and tools",
            link: "https://oms.midwaybd.com",
            icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            bgColor: "bg-primary_color",
            hoverColor: "hover:from-purple-600 hover:to-purple-700"
        }
    ];

    const StepCard = ({ step, index, isLast }) => {
        const CardContent = () => (
            <div className="group relative h-full">
                <div className="text-center space-y-6 h-full flex flex-col">
                    {/* Step Number Circle */}
                    <div className="relative mx-auto">
                        <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br'} ${step.bgColor} ${step.hoverColor} shadow-lg group-hover:shadow-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110`}>
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
                    <div className="space-y-3 flex-grow flex flex-col justify-between">
                        <div>
                            <button className='bg-primary_color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>{step.title}</button>
                            <p className="text-gray-600 leading-relaxed max-w-xs mx-auto mt-3">
                                {step.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Connecting Line - Desktop */}
                {!isLast && (
                    <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 xl:-right-8 xl:w-16">
                        <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400"></div>
                    </div>
                )}
            </div>
        );

        return (
            <div className="relative w-full">
                {step.link ? (
                    <a href={step.link} target="_blank" rel="noopener noreferrer" className="block transition-transform duration-300 hover:scale-105 h-full">
                        <CardContent />
                    </a>
                ) : (
                    <div className="transition-transform duration-300 hover:scale-105 h-full">
                        <CardContent />
                    </div>
                )}

                {/* Mobile Connecting Line */}
                {!isLast && (
                    <div className="lg:hidden flex justify-center mt-8 mb-8">
                        <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-400"></div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full bg-gray-50 py-4 lg:py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-blue-100 text-primary_color px-4 py-2 rounded-full font-medium text-sm mb-6 text-xl">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Simple Process
                    </div>

                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                        Start Investing In{" "}
                        <span className="text-secondary_color">
                            Three Simple Steps
                        </span>
                    </h2>

                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of successful investors with our streamlined BO account opening
                        process. Get started in minutes and begin your investment journey today.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative mb-16">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-12">
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
                    <div className="lg:hidden space-y-0">
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
                {/* <div className="text-center pt-12 border-t border-gray-200">
                    <div className="space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                            Ready to Get Started?
                        </h3>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Open your BO account today and join the growing community of successful
                            traders in Bangladesh's capital market.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://portal.midwaybd.com/bo/portal-login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Open Account Now
                            </a>
                            <Link href="/contact-us">
                                <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-secondary_color font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-blue-50">
                                    Contact Support
                                </button>
                            </Link>
                        </div>
                    </div>
                </div> */}

                {/* Features */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-7 h-7 text-secondary_color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Fast Process</h4>
                        <p className="text-sm text-gray-600">BO Account opening in minutes</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Secure & Safe</h4>
                        <p className="text-sm text-gray-600">Bank-level security</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">24/7 Access</h4>
                        <p className="text-sm text-gray-600">Always here to help</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                            ৳
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Low Fees</h4>
                        <p className="text-sm text-gray-600">Competitive pricing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountOpeningSteps;