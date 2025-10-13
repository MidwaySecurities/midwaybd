
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const ClientServices = async () => {

//     return (
//         <>
//             <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1991781394.jpg)] min-h-[350px] bg-cover bg-center relative'>
//                 <div className='absolute top-0 bottom-0 right-0 left-0 bg-black opacity-40 w-full font-bold text-white'>
//                     <h1 className='text-3xl  mt-16 mx-auto text-center'>Midway Securities Ltd.</h1>
//                     <p className='text-center mt-4'>INVESTING, SIMPLIFIED.</p>
//                     <p className='mt-4 text-center'>Stocks. Mobile Trading. Bonds. Equity Investment. IPO. Research. Capital Management.</p>
//                 </div>
//             </div>
//             <div className='pt-8 px-2'>
//                 <div className='p-4 card-shadow rounded-lg'>
//                     <h1 className='text-2xl font-semibold mb-8'>QuickTrade Pro mobile app</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/quicktrade-pro-reel-1-facebook-ad.jpg?1737528553`} className='w-full pb-6' width={500} height={500} />
//                     <p>
//                         With QuickTrade Pro Mobile App (for Android and iPhone) you can Buy or Sell from the phone, create your Portfolio, track individual stocks, create Alerts and Watchlists, get the latest Exchange News and many more.
//                         Download the app from the <Link href="" className='font-bold text-[#A88D2E]'>Apple App Store</Link> by clicking here and from the Android Play Store by clicking here.
//                         We also have a desktop version for clients who wish to trade over their own computers.
//                     </p>
//                     <div>
//                         <ol className='list-disc ml-12 mt-4'>
//                             <li>Download the app from the Apple App Store by clicking here and from the <Link href="" className='font-bold text-[#A88D2E]'>Android Play Store</Link> by clicking here. </li>
//                             <li>We also have a desktop version for clients who wish to trade over their own computers.</li>
//                         </ol>
//                     </div>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>​MIDWAY PORTAL</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-4_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>All our services are available online. Get full control of your BO Account. Trade Online, deposit funds, withdraw funds, IPO, SME, ATB and so on. </p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>BO Account Opening</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/bo-image_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>Open a BO Account with us through one of our convenient locations in many parts of the country. Or you can start the process <Link href={`https://www.midwaybd.com/open-a-bo-account.html`} target='_blank' className='text-[##A88D2E]' >online.</Link></p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>Apply for IPO</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/ipo-11_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>You can now apply for any IPO through us via this website. We even offer an IPO membership club.</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>Share Trading</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/buy-and-sell_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>Buy and Sell shares through us over the phone, the internet or visiting any of our offices.</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>IPO Membership Club</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/ipo-club-membership-logo-2.png?1617384776`} className='w-full pb-6' width={500} height={500} />
//                     <p>​Join our IPO membership club and you will never have to worry about missing an IPO application. We will automatically apply for all the IPOs for you (depending on your available balance). Please be aware, we will not automatically apply for Mutual Funds. Call or visit us to find out more. </p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>Easy Deposits</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/bank-mobile-money-credit-card-1_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>​Join our IPO membership club and you will never have to worry about missing an IPO application. We will automatically apply for all the IPOs for you (depending on your available balance). Please be aware, we will not automatically apply for Mutual Funds. Call or visit us to find out more. </p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>Tax Report</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/tax-report_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>​Get your yearly tax report on your investments. Get all your documents online.</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>Daily Emails</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/_________4719675.jpg`} className='w-full pb-6' width={500} height={500} />
//                     <p>​Receive free daily emails of your portfolio, ledger and trading confirmation. </p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>Easy Withdrawal: BEFTN</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/bangladesh-bank-logo-vector-tranparent.png?1617383868`} className='w-2/3 pb-6 m-auto' width={500} height={500} />
//                     <p>​Withdraw your funds from the convenience of your home. Email us your signed Cheque Requisition Form and we will directly deposit your funds in your bank account through the approved Bangladesh Electronic Fund Transfer Network (BEFTN). </p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>​DIVIDEND STATEMENT</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-5_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>​​Never miss your dividends. We provide a yearly statement of all your dividends</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>​CDBL - SMS Alert</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/cdbl-sms-alerts.png?1504609219`} className='w-full pb-6' width={500} height={500} />
//                     <p>​​CDBL offers FREE SMS Alerts to the Beneficiary Owner (BO) Account holders' mobile phones giving details of debit-credit transactions that have taken place in their accounts.</p>
//                     <p className='mt-8 mb-4'>To register for the SMS Alerts Service BO Account holders may download the SMS Alerts Registration form by clicking here, fill up the form and send it back to CDBL.</p>
//                     <Link className='break-words text-[#C4982E]' href='https://www.cdbl.com.bd/sms_balance.php'>https://www.cdbl.com.bd/sms_balance.php</Link>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>​DAILY EMAILS & SMS ALERT</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/email-sms-alert_orig.jpg`} className='w-full pb-6' width={500} height={500} />
//                     <p>​​​​Receive free daily emails of your portfolio, ledger and trading confirmation. You will also receive free SMS alert service anytime you buy or sell stocks.</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4'>​​PROFESSIONAL STAFF</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/team_orig.png`} className='w-full pb-6' width={500} height={500} />
//                     <p>​​​​Each of our staff are professionally trained to help you succeed in your investment venture. Get in touch with us and we shall help you plan out an investment future.</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4 uppercase'>​​dse training academy</h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/__557534_orig.jpg`} className='w-full pb-6' width={500} height={500} />
//                     <p>​​​​Interested in learning more about the Stock Market? Wish to participate in training courses about Portfolio Management? Then the DSE Training Academy is the place for you. DSE Training Academy has faculties and the speakers drawn from the industry, a rich pool of professionals, practitioners and eminent personalities, who mix the theory with practical aspects through which participants get hands on knowledge & experiences shared by the experts. The organization conducts monthly training programs for anyone who is willing to learn or enhance their market knowledge. Regular courses include programs on <strong>Fundamental Stock Analysis, Technical Stock Trading, Equity Portfolio Management, Valuation of Shares</strong> and many more. There are a number of courses and diplomas available through this wonderful <strong>Training Academy</strong>. You can check out the monthly schedule by <Link href={`https://www.dsebd.org/Training_Academy_2.b.php`} target='_blank' className='text-[#C4982E]'>clicking here</Link>. And if you have selected the ones you like, just <Link className='text-[#C4982E]' href={`https://main.dsebd.org/online_login.php`}>click here</Link> to register. Anyone can apply.</p>
//                 </div>

//                 <div className='p-4 card-shadow rounded-lg mt-4'>
//                     <h1 className='text-2xl font-semibold mb-4 uppercase'>​​DSE Info App </h1>
//                     <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/dse-info-app-1.png?1559838881`} className='w-2/3 pb-6 m-auto' width={500} height={500} />
//                     <p>​​​​Download the <strong>DSE INFO App</strong> for your Android devices from the Google Play Store to stay up to date on the Market. This app is developed jointly by the <strong>Dhaka Stock Exchange</strong> and the <strong>ICT Division</strong> of the <strong>Government of Bangladesh</strong>. You can create your own portfolio, track individual stocks, view latest exchange news or look at the daily market snapshot. Download now by clicking <Link href={`https://play.google.com/store/apps/details?id=com.mcc.dhakastockexchangeinfo`}>here.</Link></p>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ClientServices

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { 
  Smartphone, 
  Globe, 
  UserPlus, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  FileText, 
  Mail, 
  Banknote, 
  Receipt, 
  MessageSquare, 
  GraduationCap, 
  Download,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

const ClientServices = () => {
    const services = [
        {
            id: 'quicktrade',
            title: 'QuickTrade Pro Mobile App',
            icon: Smartphone,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/quicktrade-pro-reel-1-facebook-ad.jpg?1737528553',
            description: 'With QuickTrade Pro Mobile App (for Android and iPhone) you can Buy or Sell from the phone, create your Portfolio, track individual stocks, create Alerts and Watchlists, get the latest Exchange News and many more.',
            features: [
                'Available on Apple App Store and Android Play Store',
                'Desktop version available for computer trading',
                'Real-time portfolio tracking',
                'Custom alerts and watchlists'
            ],
            links: [
                { text: 'Download for iOS', url: '#', type: 'apple' },
                { text: 'Download for Android', url: '#', type: 'android' }
            ]
        },
        {
            id: 'portal',
            title: 'Midway Portal',
            icon: Globe,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-4_orig.png',
            description: 'All our services are available online. Get full control of your BO Account. Trade Online, deposit funds, withdraw funds, IPO, SME, ATB and so on.',
            features: [
                'Complete BO account control',
                'Online trading capabilities',
                'Fund deposits and withdrawals',
                'IPO, SME, and ATB applications'
            ]
        },
        {
            id: 'bo-account',
            title: 'BO Account Opening',
            icon: UserPlus,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/bo-image_orig.png',
            description: 'Open a BO Account with us through one of our convenient locations in many parts of the country. Or you can start the process online.',
            features: [
                'Multiple branch locations nationwide',
                'Online account opening available',
                'Quick and easy process',
                'Professional assistance provided'
            ],
            links: [
                { text: 'Open Account Online', url: 'https://www.midwaybd.com/open-a-bo-account.html', type: 'external' }
            ]
        },
        {
            id: 'ipo',
            title: 'Apply for IPO',
            icon: TrendingUp,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/ipo-11_orig.png',
            description: 'You can now apply for any IPO through us via this website. We even offer an IPO membership club.',
            features: [
                'Easy online IPO applications',
                'IPO membership club available',
                'Never miss an opportunity',
                'Automated application process'
            ]
        },
        {
            id: 'trading',
            title: 'Share Trading',
            icon: ShoppingCart,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/buy-and-sell_orig.png',
            description: 'Buy and Sell shares through us over the phone, the internet or visiting any of our offices.',
            features: [
                'Multiple trading channels',
                'Phone trading support',
                'Internet-based trading',
                'In-person trading at branches'
            ]
        },
        {
            id: 'ipo-club',
            title: 'IPO Membership Club',
            icon: Users,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/ipo-club-membership-logo-2.png?1617384776',
            description: 'Join our IPO membership club and you will never have to worry about missing an IPO application. We will automatically apply for all the IPOs for you (depending on your available balance).',
            features: [
                'Automatic IPO applications',
                'Never miss an opportunity',
                'Balance-based applications',
                'Manual fund applications excluded'
            ],
            note: 'We will not automatically apply for Mutual Funds'
        },
        {
            id: 'deposits',
            title: 'Easy Deposits',
            icon: CreditCard,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/bank-mobile-money-credit-card-1_orig.png',
            description: 'Multiple convenient methods to deposit funds into your trading account.',
            features: [
                'Bank transfer options',
                'Mobile banking support',
                'Credit card deposits',
                'Quick processing times'
            ]
        },
        {
            id: 'tax-report',
            title: 'Tax Report',
            icon: FileText,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/tax-report_orig.png',
            description: 'Get your yearly tax report on your investments. Get all your documents online.',
            features: [
                'Yearly investment reports',
                'Online document access',
                'Tax-ready statements',
                'Comprehensive records'
            ]
        },
        {
            id: 'emails',
            title: 'Daily Emails',
            icon: Mail,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/_________4719675.jpg',
            description: 'Receive free daily emails of your portfolio, ledger and trading confirmation.',
            features: [
                'Daily portfolio updates',
                'Ledger statements',
                'Trading confirmations',
                'Free email service'
            ]
        },
        {
            id: 'withdrawal',
            title: 'Easy Withdrawal: BEFTN',
            icon: Banknote,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/bangladesh-bank-logo-vector-tranparent.png?1617383868',
            description: 'Withdraw your funds from the convenience of your home. Email us your signed Cheque Requisition Form and we will directly deposit your funds in your bank account through the approved Bangladesh Electronic Fund Transfer Network (BEFTN).',
            features: [
                'Remote withdrawal facility',
                'BEFTN integration',
                'Direct bank deposits',
                'Secure processing'
            ]
        },
        {
            id: 'dividend',
            title: 'Dividend Statement',
            icon: Receipt,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/homepage-5_orig.png',
            description: 'Never miss your dividends. We provide a yearly statement of all your dividends.',
            features: [
                'Comprehensive dividend tracking',
                'Yearly statements',
                'Complete dividend history',
                'Easy access online'
            ]
        },
        {
            id: 'cdbl-sms',
            title: 'CDBL - SMS Alert',
            icon: MessageSquare,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/editor/cdbl-sms-alerts.png?1504609219',
            description: 'CDBL offers FREE SMS Alerts to the Beneficiary Owner (BO) Account holders\' mobile phones giving details of debit-credit transactions that have taken place in their accounts.',
            features: [
                'Free SMS alert service',
                'Transaction notifications',
                'Real-time updates',
                'Easy registration process'
            ],
            links: [
                { text: 'Register for SMS Alerts', url: 'https://www.cdbl.com.bd/sms_balance.php', type: 'external' }
            ]
        },
        {
            id: 'daily-alerts',
            title: 'Daily Emails & SMS Alert',
            icon: Mail,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/email-sms-alert_orig.jpg',
            description: 'Receive free daily emails of your portfolio, ledger and trading confirmation. You will also receive free SMS alert service anytime you buy or sell stocks.',
            features: [
                'Daily email updates',
                'SMS trading alerts',
                'Portfolio reports',
                'Transaction confirmations'
            ]
        },
        {
            id: 'staff',
            title: 'Professional Staff',
            icon: Users,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/team_orig.png',
            description: 'Each of our staff are professionally trained to help you succeed in your investment venture. Get in touch with us and we shall help you plan out an investment future.',
            features: [
                'Professionally trained team',
                'Investment planning assistance',
                'Personalized guidance',
                'Expert market knowledge'
            ]
        },
        {
            id: 'dse-training',
            title: 'DSE Training Academy',
            icon: GraduationCap,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/__557534_orig.jpg',
            description: 'Interested in learning more about the Stock Market? DSE Training Academy offers comprehensive courses on portfolio management, fundamental analysis, technical trading, and more.',
            features: [
                'Fundamental Stock Analysis',
                'Technical Stock Trading',
                'Equity Portfolio Management',
                'Share Valuation courses'
            ],
            links: [
                { text: 'View Training Schedule', url: 'https://www.dsebd.org/Training_Academy_2.b.php', type: 'external' },
                { text: 'Register for Courses', url: 'https://main.dsebd.org/online_login.php', type: 'external' }
            ]
        },
        {
            id: 'dse-app',
            title: 'DSE Info App',
            icon: Download,
            image: 'https://www.midwaybd.com/uploads/6/0/4/6/60462737/published/dse-info-app-1.png?1559838881',
            description: 'Download the DSE INFO App for your Android devices from the Google Play Store to stay up to date on the Market. This app is developed jointly by the Dhaka Stock Exchange and the ICT Division of the Government of Bangladesh.',
            features: [
                'Create custom portfolios',
                'Track individual stocks',
                'Latest exchange news',
                'Daily market snapshots'
            ],
            links: [
                { text: 'Download from Play Store', url: 'https://play.google.com/store/apps/details?id=com.mcc.dhakastockexchangeinfo', type: 'external' }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ 
                        backgroundImage: "url('https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1991781394.jpg')" 
                    }}
                ></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Midway Securities Ltd.</h1>
                    <p className="text-xl md:text-2xl font-light mb-4">INVESTING, SIMPLIFIED.</p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base">
                        {['Stocks', 'Mobile Trading', 'Bonds', 'Equity Investment', 'IPO', 'Research', 'Capital Management'].map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Wave decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#f9fafb"/>
                    </svg>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {services.map((service, index) => (
                        <div 
                            key={service.id}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Image Section */}
                                <div className={`relative h-64 lg:h-auto ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <Image 
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                                </div>

                                {/* Content Section */}
                                <div className={`p-6 md:p-8 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <service.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h2>
                                    </div>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Note if exists */}
                                    {service.note && (
                                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                            <p className="text-sm text-amber-800">
                                                <strong>Note:</strong> {service.note}
                                            </p>
                                        </div>
                                    )}

                                    {/* Action Links */}
                                    {service.links && service.links.length > 0 && (
                                        <div className="flex flex-wrap gap-3">
                                            {service.links.map((link, i) => (
                                                <Link
                                                    key={i}
                                                    href={link.url}
                                                    target={link.type === 'external' ? '_blank' : '_self'}
                                                    rel={link.type === 'external' ? 'noopener noreferrer' : ''}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#004990] hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                                                >
                                                    {link.text}
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ClientServices