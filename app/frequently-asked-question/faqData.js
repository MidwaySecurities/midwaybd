// FILE 3: app/frequently-asked-question/faqData.ts (Shared data file)

import Link from "next/link"
import PriceLimitTable from "./CircuitBreaker"

export const categories = [
  {
    id: 'started',
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
  // {
  //   id: 'deposits',
  //   name: 'Deposits & Withdrawals',
  //   icon: (
  //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  //     </svg>
  //   )
  // },
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

export const faqData = {
  'started': [
    {
      id: 'dep4',
      question: 'How do I withdraw funds from my account?',
      answer: <>Submit a withdrawal request through our <Link className="text-secondary_color font-bold" href="https://portal.midwaybd.com/dashboard/fund/witdrawl/add">Midway Portal</Link>. Funds are transferred to your registered bank account within 1-3 business days.</>
    },
    {
      id: 'dep5',
      question: 'Are there any charges for deposits or withdrawals?',
      // answer: <div>Bank transfers: Free. Mobile banking: 1% fee. Credit cards: 2.2% (Visa/MasterCard), 3.5% (American Express).</div>
      answer: <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"><li>Bank transfers: Free.</li> <li>Mobile banking: 1% processing fee.</li><li>Credit cards: 2.2% (Visa/MasterCard), 3.5% (American Express) processing fee.</li><li>Withdraw: free</li></ul>
    }
  ],
  'fees': [
    // {
    //   id: 'fee1',
    //   question: 'What is your brokerage commission structure?',
    //   answer: 'Our brokerage commission is 0.40% for equity transactions, 0.10% for government securities, and 0.25% for corporate bonds. Volume-based discounts are available for high-frequency traders.'
    // },
    // {
    //   id: 'fee2',
    //   question: 'Are there any hidden charges?',
    //   answer: 'No hidden charges. All fees are transparently displayed: Brokerage commission, LAGA fee (0.002%), BSEC fee (0.006%), and VAT (15% on brokerage). These are standard regulatory charges applicable to all brokers.'
    // },
    // {
    //   id: 'fee3',
    //   question: 'Do you offer any fee waivers or discounts?',
    //   answer: 'Yes, we offer volume-based discounts for active traders, promotional rates for new clients, and special packages for institutional investors. Contact our relationship manager for personalized pricing.'
    // },
    // {
    //   id: 'fee4',
    //   question: 'How is the margin interest calculated?',
    //   answer: 'Margin interest is calculated daily at 12% annual rate (1% monthly). Interest is charged only on the utilized margin amount and debited monthly from your account.'
    // }

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
    // {
    //   id: 'tech3',
    //   question: 'Do you provide market data and research reports?',
    //   answer: 'Yes, we provide Real-time market trading, daily market analysis, company research reports, sector analysis, and investment recommendations. Premium research is available for active traders.'
    // },
    
    {
      id: 'tech4',
      question: 'Is my personal and financial data secure?',
      answer: 'Absolutely. We use bank-level SSL encryption, two-factor authentication, and comply with international data security standards. Your data is stored in secure servers and never shared with third parties without consent.'
    },
    {
      id: 'tech5',
      question: 'How do I enable biometric aaccess?',
      answer: 'Log into your account, go to Security Settings, and select "Enable 2FA". Download Google Authenticator or use SMS-based verification. This adds an extra layer of security to your account.'
    }
  ],
  'account': [
    {
      id: 'acc1',
      question: 'How do I reset my QuickTrade Pro password?',
      answer: 'Open QuickTrade Pro mobile app or go to the login page and click "Forgot Password". Enter your registered email address. You will receive a OTP via email or SMS. Now you can create a new password.'
    },
    {
      id: 'acc2',
      question: 'Can I change my registered mobile number or email?',
      answer: <>Yes, you can update your contact information by visiting any of our branches with proper identification, or through our <Link className="text-secondary_color font-bold" href="https://portal.midwaybd.com">Midway Portal</Link>. For security reasons, online changes require additional verification.</>
    },
    {
      id: 'acc3',
      question: 'How do I update my bank account information?',
      answer: <>Yes, you can update your bank account information by visiting any of our branches with proper identification, or through our <Link className="text-secondary_color font-bold" href="https://portal.midwaybd.com">Midway Portal</Link>. For security reasons, online changes require additional verification.</>
    },
    {
      id: 'acc4',
      question: 'What should I do if my account is temporarily locked?',
      answer: 'Account locks usually occur due to multiple failed login attempts or suspicious activity. Contact our customer service at 09609 100 142 or visit any branch with your ID for immediate assistance.'
    },
    {
      id: 'acc5',
      question: 'How can I view my account statement and transaction history?',
      answer: <>Log into your <Link className="text-secondary_color font-bold" href="https://portal.midwaybd.com">Midway Portal</Link> and navigate to the "Portfolio" or "Ledger Balance" section. You can view and download portfolio statements and transaction history also dividend history, transaction history. Statements are also sent to your registered email at the end of the day.</>
    },
    {
      id: 'acc6',
      question: 'Can I have multiple trading accounts?',
      answer: 'Yes, you can open multiple accounts for different purposes such as personal trading, family members, or investment strategies. Each account requires separate KYC documentation and will have its own BO (Beneficiary Owner) account number.'
    },
    {
      id: 'acc7',
      question: 'How do I update my nominee information?',
      answer: <>Visit any Midway Securities branch or <Link className="text-secondary_color font-bold" href="https://portal.midwaybd.com">Midway Portal</Link> with your updated nominee details(CDBL by laws form-23), their National ID copy, and recent photographs. Nominee changes must be done in person for security and legal compliance. The update process takes 2-7 business days.</>
    },
    {
      id: 'acc8',
      question: 'What is a BO account and why do I need one?',
      answer: 'A BO (Beneficiary Owner) account is mandatory for trading in Bangladesh stock market. It is a dematerialized account that holds your shares electronically. Midway Securities will help you open a BO account with CDBL (Central Depository Bangladesh Limited) during the account opening process.'
    },
    {
      id: 'acc9',
      question: 'How can I close my trading account?',
      answer: 'To close your account, visit our branch with a written closure request, your National ID, and account details. Ensure all outstanding dues are settled and shares are either sold or transferred. Account closure typically takes 7-10 business days after all requirements are met.'
    }
  ],
  'trading': [
    {
      id: 'tr1',
      question: 'What types of orders can I place?',
      answer: 'You can place Market Orders (immediate execution at current price), Limit Orders (execution at specified price or better), and Busket order (triggered every day within your provided specific date range), SL&TP(Stop loss & Take profit), Offline trading and pre market order. Advanced traders can also use conditional orders.'
    },
    {
      id: 'tr2',
      question: 'What are the trading hours for DSE?',
      answer: 'Dhaka Stock Exchange (DSE) trading hours are Sunday to Thursday, 10:00 AM to 2:30 PM. The market is closed on Fridays, Saturdays, and public holidays. Trading hours may be changed or adjusted due to Ramadan, or government decisions. Pre-market and after-market sessions may have different timings.'
    },
    {
      id: 'tr3',
      question: 'How do I track my portfolio performance?',
      answer: 'Use our QuickTrade Pro mobile app or web platform to monitor real-time portfolio values, profit/loss, and detailed performance analytics. You can also set up notification alerts for price movements.'
    },
    {
      id: 'tr4',
      question: 'Can I trade IPOs through your platform?',
      answer: 'Yes, we provide IPO application services. You can apply for IPOs through our platform during the subscription period. We also provide research and recommendations on upcoming IPOs.'
    },
    {
      id: 'tr5',
      question: 'How long does it take for my order to execute?',
      answer: 'Market at best orders typically execute within seconds during trading hours if liquidity is available. Limit orders execute when the market price reaches your specified price. Order execution depends on market conditions, available buyers/sellers, and order priority.'
    },
    {
      id: 'tr6',
      question: 'Can I cancel or modify my order after placing it?',
      answer: <>Yes, you can cancel or modify Pending/<span className="text-blue-700 font-semibold">Accepted</span> orders that have not yet been executed. Log into your QuickTrade Pro, go to "Order List" under portfolio, and select the order you wish to cancel or modify. Already executed(<span className="text-green-700 font-bold">Filled</span>) orders cannot be reversed.</>
    },
    // {
    //   id: 'tr7',
    //   question: 'What happens if I do not have enough funds to pay for my purchase?',
    //   answer: 'You must ensure sufficient funds are available in your account before placing buy orders. If you fail to pay within T+2 settlement period (2 business days after trade), your account may be suspended, penalty charges applied, and the trade may be squared off by the exchange.'
    // },
    {
      id: 'tr8',
      question: 'How do I receive dividends from my shareholdings?',
      answer: 'Cash dividends are automatically credited to your registered bank account within 30–45 days after the record date. If you do not receive the cash dividend, you can claim it directly from the company after the “Dividend Disbursement” notice is published.Please make sure your bank account and BO account details are up to date to avoid any delays. Stock dividends are credited directly to your BO account.'
    },
    {
      id: 'tr9',
      question: 'What are circuit breakers and trading halts?',
      answer: <>Circuit breakers are automatic trading halts triggered when a stock price moves beyond a certain percentage (usually ±10% in DSE) within a day.
        <PriceLimitTable />
      </>
    }
  ],
}