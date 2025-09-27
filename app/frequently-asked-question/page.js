'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [openItems, setOpenItems] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'account',
      name: 'Account Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'trading',
      name: 'Trading & Orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'deposits',
      name: 'Deposits & Withdrawals',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      id: 'fees',
      name: 'Fees & Charges',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ]

  const faqData = {
    'getting-started': [
      {
        id: 'gs1',
        question: 'How do I open a trading account with Midway Securities?',
        answer: 'Opening an account is simple and can be done in 3 steps: 1) Visit our online portal at portal.midwaybd.com/register, 2) Complete the KYC verification process with required documents, 3) Fund your account and start trading. The entire process usually takes 1-2 business days.'
      },
      {
        id: 'gs2',
        question: 'What documents are required to open an account?',
        answer: 'You need: Valid National ID card or Passport, Recent passport-size photographs, Bank statement or salary certificate, Utility bill as proof of address, and Nominee information with their National ID copy.'
      },
      {
        id: 'gs3',
        question: 'Is there a minimum deposit requirement?',
        answer: 'Yes, the minimum initial deposit is BDT 10,000. This helps ensure you have adequate capital to begin trading and covers basic account maintenance.'
      },
      {
        id: 'gs4',
        question: 'How long does account approval take?',
        answer: 'Account approval typically takes 1-2 business days after we receive all required documents. During peak periods, it may take up to 3 business days. You will receive email and SMS notifications once approved.'
      }
    ],
    'account': [
      {
        id: 'acc1',
        question: 'How do I reset my trading platform password?',
        answer: 'Go to the login page and click "Forgot Password". Enter your registered email address or phone number. You will receive a password reset link via email or SMS. Follow the link to create a new password.'
      },
      {
        id: 'acc2',
        question: 'Can I change my registered mobile number or email?',
        answer: 'Yes, you can update your contact information by visiting any of our branches with proper identification, or through our customer service hotline. For security reasons, online changes require additional verification.'
      },
      {
        id: 'acc3',
        question: 'How do I update my bank account information?',
        answer: 'Visit our nearest branch with your updated bank account details, bank statement, and valid ID. Changes to bank information require manual verification for security purposes and typically take 1-2 business days to process.'
      },
      {
        id: 'acc4',
        question: 'What should I do if my account is temporarily locked?',
        answer: 'Account locks usually occur due to multiple failed login attempts or suspicious activity. Contact our customer service at 09609 100 142 or visit any branch with your ID for immediate assistance.'
      }
    ],
    'trading': [
      {
        id: 'tr1',
        question: 'What types of orders can I place?',
        answer: 'You can place Market Orders (immediate execution at current price), Limit Orders (execution at specified price or better), and Stop Orders (triggered when price reaches specified level). Advanced traders can also use conditional orders.'
      },
      {
        id: 'tr2',
        question: 'What are the trading hours for DSE?',
        answer: 'Dhaka Stock Exchange trading hours are Sunday to Thursday, 10:00 AM to 2:30 PM. The market is closed on Fridays, Saturdays, and public holidays. Pre-market and after-market sessions may have different timings.'
      },
      {
        id: 'tr3',
        question: 'How do I track my portfolio performance?',
        answer: 'Use our QuickTrade Pro mobile app or web platform to monitor real-time portfolio values, profit/loss, and detailed performance analytics. You can also set up SMS or email alerts for price movements.'
      },
      {
        id: 'tr4',
        question: 'Can I trade IPOs through your platform?',
        answer: 'Yes, we provide IPO application services. You can apply for IPOs through our platform during the subscription period. We also provide research and recommendations on upcoming IPOs.'
      },
      {
        id: 'tr5',
        question: 'What is margin trading and how does it work?',
        answer: 'Margin trading allows you to borrow funds to purchase more stocks than your available cash. We offer up to 2:1 leverage ratio. Interest is charged on the borrowed amount, and positions may be liquidated if margin requirements are not met.'
      }
    ],
    'deposits': [
      {
        id: 'dep1',
        question: 'What are the available deposit methods?',
        answer: 'You can deposit funds via Bank Transfer (City Bank, Dutch Bangla Bank), Mobile Banking (bKash, Nagad, Rocket), Credit Cards (Visa, MasterCard, American Express), and direct bank deposits at our partner branches.'
      },
      {
        id: 'dep2',
        question: 'How long do deposits take to reflect in my account?',
        answer: 'Bank transfers: 2-6 hours during business days. Mobile banking: Instant to 2 hours. Credit card: Instant. Cash deposits: 2-4 hours. Weekend deposits are processed on the next business day.'
      },
      {
        id: 'dep3',
        question: 'Is there a maximum deposit limit?',
        answer: 'Daily deposit limits vary by method: Bank transfer: BDT 10,00,000, Mobile banking: BDT 2,00,000, Credit card: BDT 5,00,000. Higher limits can be arranged by contacting customer service.'
      },
      {
        id: 'dep4',
        question: 'How do I withdraw funds from my account?',
        answer: 'Submit a withdrawal request through your trading platform or visit our branch. Funds are transferred to your registered bank account within 3-5 business days. Minimum withdrawal amount is BDT 1,000.'
      },
      {
        id: 'dep5',
        question: 'Are there any charges for deposits or withdrawals?',
        answer: 'Bank transfers: Free. Mobile banking: 1% fee. Credit cards: 2.2% (Visa/MasterCard), 3.5% (American Express). Withdrawal fees: BDT 50 for amounts below BDT 50,000, free for higher amounts.'
      }
    ],
    'fees': [
      {
        id: 'fee1',
        question: 'What is your brokerage commission structure?',
        answer: 'Our brokerage commission is 0.50% for equity transactions, 0.10% for government securities, and 0.25% for corporate bonds. Volume-based discounts are available for high-frequency traders.'
      },
      {
        id: 'fee2',
        question: 'Are there any hidden charges?',
        answer: 'No hidden charges. All fees are transparently displayed: Brokerage commission, LAGA fee (0.002%), BSEC fee (0.006%), and VAT (15% on brokerage). These are standard regulatory charges applicable to all brokers.'
      },
      {
        id: 'fee3',
        question: 'Do you offer any fee waivers or discounts?',
        answer: 'Yes, we offer volume-based discounts for active traders, promotional rates for new clients, and special packages for institutional investors. Contact our relationship manager for personalized pricing.'
      },
      {
        id: 'fee4',
        question: 'How is the margin interest calculated?',
        answer: 'Margin interest is calculated daily at 12% annual rate (1% monthly). Interest is charged only on the utilized margin amount and debited monthly from your account.'
      }
    ],
    'technical': [
      {
        id: 'tech1',
        question: 'My trading platform is not working. What should I do?',
        answer: 'First, check your internet connection and try refreshing the page. Clear your browser cache or restart the mobile app. If the problem persists, contact our technical support at 09609 100 142 or use our live chat feature.'
      },
      {
        id: 'tech2',
        question: 'Can I trade using mobile devices?',
        answer: 'Yes, our QuickTrade Pro mobile app is available for both Android and iOS devices. It offers full trading functionality, real-time quotes, portfolio monitoring, and market news. Download from Google Play Store or Apple App Store.'
      },
      {
        id: 'tech3',
        question: 'Do you provide market data and research reports?',
        answer: 'Yes, we provide real-time market data, daily market analysis, company research reports, sector analysis, and investment recommendations. Premium research is available for active traders.'
      },
      {
        id: 'tech4',
        question: 'Is my personal and financial data secure?',
        answer: 'Absolutely. We use bank-level SSL encryption, two-factor authentication, and comply with international data security standards. Your data is stored in secure servers and never shared with third parties without consent.'
      },
      {
        id: 'tech5',
        question: 'How do I enable two-factor authentication?',
        answer: 'Log into your account, go to Security Settings, and select "Enable 2FA". Download Google Authenticator or use SMS-based verification. This adds an extra layer of security to your account.'
      }
    ]
  }

  const filteredFAQs = faqData[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get quick answers to common questions about trading, account management, and our services
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-2xl focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setSearchTerm('')
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left ${
                      activeCategory === category.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className={`${activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {category.icon}
                    </div>
                    <span className="text-sm">{category.name}</span>
                    <div className={`ml-auto w-2 h-2 rounded-full ${
                      activeCategory === category.id ? 'bg-blue-600' : ''
                    }`}></div>
                  </button>
                ))}
              </div>

              {/* Contact Support */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Still need help?</h4>
                <div className="space-y-3">
                  <Link 
                    href="tel:09609100142"
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>09609 100 142</span>
                  </Link>
                  
                  <Link 
                    href="mailto:support@midwaybd.com"
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email Support</span>
                  </Link>

                  <Link 
                    href="/contact-us"
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Visit Branch</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              
              {/* Category Header */}
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">
                    {categories.find(cat => cat.id === activeCategory)?.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {categories.find(cat => cat.id === activeCategory)?.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} available
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-gray-200">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => (
                    <div key={faq.id} className="p-8">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors pr-4">
                          {faq.question}
                        </h3>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-all duration-200 ${
                          openItems[faq.id] ? 'rotate-180 bg-blue-100' : ''
                        }`}>
                          <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      <div className={`mt-4 transition-all duration-300 overflow-hidden ${
                        openItems[faq.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-8-7.109c0-1.864.613-3.584 1.645-4.973L12 20.4l6.355-12.082A7.963 7.963 0 0120 12.291z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse other categories.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/mobile-app" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Mobile App</h4>
                    <p className="text-sm text-gray-600">Download QuickTrade Pro</p>
                  </div>
                </div>
              </Link>

              <Link href="/deposit" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Fund Account</h4>
                    <p className="text-sm text-gray-600">Deposit funds instantly</p>
                  </div>
                </div>
              </Link>

              <Link href="/our-branches" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Visit Branch</h4>
                    <p className="text-sm text-gray-600">Find nearest location</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage