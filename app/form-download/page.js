// import Link from 'next/link'
// import React from 'react'

// const FormDownload = () => {
//     return (
//         <div>
//             <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1286135119.jpg)] h-[350px] bg-cover bg-center' >
                
//             </div>
//             <div>
//                 <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>BO Account</h1>
//                 <div className='grid grid-cols-1 gap-4 px-8'>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>BO Account Opening Form</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Authorization Form</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change সঞ্চয় to Active</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change Address</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change Mobile Number</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​Change Email Address</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change সঞ্চয় to Active</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change Address</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change Mobile Number</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>​​Change Email Address</Link></button>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>Link BO Account</h1>
//                 <div className='grid grid-cols-1 gap-4 px-8'>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>DPA 6 (CDBL)</Link></button>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>Accounts</h1>
//                 <div className='grid grid-cols-1 gap-4 px-8'>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>
//                         Change Bank Account</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Cheque Requisition Form</Link></button>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>IPO</h1>
//                 <div className='grid grid-cols-1 gap-4 px-8'>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>IPO Membership Club Form</Link></button>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>DSE Mobile</h1>
//                 <div className='grid grid-cols-1 gap-4 px-8'>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>DSE Mobile App Registration</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>DSE Mobile User Manual</Link></button>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='text-2xl font-bold mb-6 mt-8 px-8'>Corporate</h1>
//                 <div className='grid grid-cols-1 gap-4 px-8'>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Acquisition Cost Declaration</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Declaration of Sponsors/Directors</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Declearation of Placement Holder</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Change Commission</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Share Transfer (Gift)</Link></button>
//                     <button className='p-3 bg-gray-300 text-gray-800 font-semibold uppercase rounded-lg'><Link href={`/`}>Share Transfer (non Gift)</Link></button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default FormDownload
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { 
  FileText, 
  Download, 
  Search, 
  User, 
  Wallet, 
  TrendingUp, 
  Smartphone, 
  Building2,
  ChevronRight,
  FileCheck,
  Link2
} from 'lucide-react'

const FormDownload = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const formCategories = [
    {
      id: 'bo-account',
      title: 'BO Account',
      icon: User,
      color: 'blue',
      forms: [
        { name: 'BO Account Opening Form', url: '/forms/BO_Account_Open_Form.pdf', popular: true },
        { name: 'Authorization Form', url: '/forms/letter_of_authorization_for_bo_account_form.pdf' },
        { name: 'Change সঞ্চয় to Active', url: '/forms/change_sanchay_to_active.pdf' },
        { name: 'Change Address', url: '/forms/change_address_form.pdf' },
        { name: 'Change Mobile Number', url: '/forms/change_phone_number_form.pdf' },
        { name: 'Change Email Address', url: '/forms/change_email_form.pdf' },
        { name: 'Nominee Information Update', url: '/' },
        { name: 'Joint Account Opening', url: '/' }
      ]
    },
    {
      id: 'link-bo',
      title: 'Link BO Account',
      icon: Link2,
      color: 'green',
      forms: [
        { name: 'DPA 6 (CDBL)', url: '/', popular: true }
      ]
    },
    {
      id: 'accounts',
      title: 'Accounts',
      icon: Wallet,
      color: 'purple',
      forms: [
        { name: 'Change Bank Account', url: '/', popular: true },
        { name: 'Cheque Requisition Form', url: '/' },
        { name: 'Fund Deposit Form', url: '/' },
        { name: 'Fund Withdrawal Request', url: '/' }
      ]
    },
    {
      id: 'ipo',
      title: 'IPO',
      icon: TrendingUp,
      color: 'orange',
      forms: [
        { name: 'IPO Membership Club Form', url: '/', popular: true },
        { name: 'IPO Application Form', url: '/' }
      ]
    },
    {
      id: 'dse-mobile',
      title: 'DSE Mobile',
      icon: Smartphone,
      color: 'indigo',
      forms: [
        { name: 'DSE Mobile App Registration', url: '/' },
        { name: 'DSE Mobile User Manual', url: '/', type: 'manual' }
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate',
      icon: Building2,
      color: 'red',
      forms: [
        { name: 'Acquisition Cost Declaration', url: '/' },
        { name: 'Declaration of Sponsors/Directors', url: '/' },
        { name: 'Declaration of Placement Holder', url: '/' },
        { name: 'Change Commission', url: '/' },
        { name: 'Share Transfer (Gift)', url: '/' },
        { name: 'Share Transfer (Non-Gift)', url: '/' }
      ]
    }
  ]

  // Filter forms based on search and category
  const filteredCategories = formCategories
    .map(category => ({
      ...category,
      forms: category.forms.filter(form =>
        form.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category =>
      (selectedCategory === 'all' || category.id === selectedCategory) &&
      category.forms.length > 0
    )

  const totalForms = formCategories.reduce((sum, cat) => sum + cat.forms.length, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/1286135119.jpg')" 
          }}
        ></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <FileText className="w-16 h-16 mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Form Downloads</h1>
          <p className="text-xl md:text-2xl font-light">Access all necessary forms and documents</p>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats and Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalForms}</p>
                <p className="text-gray-600">Available Forms</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {formCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Forms Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No forms found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Category Header */}
                <div className={`bg-gradient-to-r from-${category.color}-600 to-${category.color}-700 p-6`}>
                  <div className="flex items-center gap-3 text-white">
                    <div className={`p-3 bg-white/20 rounded-lg backdrop-blur-sm`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <p className="text-white/80">{category.forms.length} form{category.forms.length !== 1 ? 's' : ''} available</p>
                    </div>
                  </div>
                </div>

                {/* Forms List */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.forms.map((form, index) => (
                      <Link
                        key={index}
                        href={form.url}
                        download={form.url}
                        className="group flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {form.name}
                            </h3>
                            {form.popular && (
                              <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                            {form.type === 'manual' && (
                              <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                User Manual
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the form you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                Contact Support
              </Link>
              <Link
                href="/frequently-asked-question"
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-semibold transition-colors duration-200"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormDownload