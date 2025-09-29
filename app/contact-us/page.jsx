// import Link from 'next/link'
// import React from 'react'

// const ContactUs = () => {
//     return (
//         <div>
//             <div className='bg-[url(https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/338544438.jpg)] h-[350px] bg-bg-cover bg-center'>

//             </div>
//             <div className='px-4'>
//                 <div className='p-4 text-gray-700 card-shadow rounded-lg mt-8'>
//                     <div>
//                         <h1 className='font-semibold text-2xl uppercase mb-4'>Contact Us</h1>
//                         <p className='font-semibold text-sm'>Office time: Sunday to Thursday 9:30 am to 5:30​ pm</p>
//                         <p><span className='font-bold'>Trading Hotline:</span> 09609 100 142, +88 01874444815, +88 0241040007, +88 0241040008​</p>
//                         <p><span className='font-bold'>Email:</span> <span className='text-[#E7B280]'>info@midwaybd.com​</span></p>
//                         <p><span className='font-bold'>IPO Hotline:</span>09609 100 142​</p>
//                         <p><span className='font-bold'>Facebook:</span> <Link href="www.facebook.com/midwaytrec142" className='text-[#E7B280]'>www.facebook.com/midwaytrec142</Link></p>
//                         <p><span className='font-bold'>​Accounts: </span><span className='text-[#E7B280]'>09609 100 142</span></p>
//                         <p><span className='font-bold'>DSE Mobile App: </span>09609 100 142, +88 01874444816</p>
//                     </div>

//                     <div className='mt-10 font-bold'>
//                         <ul>
//                             <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Head Office @ Motijheel</Link></li>
//                             <li><Link href={'/our-branches'} className='text-[#a88d2e]'>Swantex @ Motijheel</Link></li>
//                             <li><Link href={`/our-branches`} className='text-[#a88d2e]'>DSE Tower @ Nikunja 2</Link></li>
//                             <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Jabbar Tower @ Gulshan</Link></li>
//                             <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Chowk Bazar Office</Link></li>
//                             <li><Link href={`/our-branches`} className='text-[#a88d2e]'>HM Plaza @ Uttara</Link></li>
//                             <li><Link href={`/our-branches`} className='text-[#a88d2e]'>Comilla Office</Link></li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div>
//                     <h1 className='font-semibold text-2xl uppercase mt-8 px-2'>Contact Form</h1>
//                     <form className='px-2'>
//                         <div className='mb-4'>
//                             <label className='block mb-2' htmlFor="name">Name:</label>
//                             <input type="text" id="name" name="name" className='w-full p-2 border border-gray-300 rounded' required />
//                         </div>

//                         <div className='mb-4'>
//                             <label className='block mb-2' htmlFor="phone">Phone:</label>
//                             <input type="telephone" id="phone" name="phone" className='w-full p-2 border border-gray-300 rounded' required />
//                         </div>

//                         <div className='mb-4'>
//                             <label className='block mb-2' htmlFor="email">Email:</label>
//                             <input type="email" id="email" name="email" className='w-full p-2 border border-gray-300 rounded' required />
//                         </div>
//                         <div className='mb-4'>
//                             <label className='block mb-2' htmlFor="message">Message:</label>
//                             <textarea id="message" name="message" rows="4" className='w-full p-2 border border-gray-300 rounded' required></textarea>
//                         </div>
//                         <button type="submit" className='bg-qtp_btn_bg_color text-white px-4 py-2 rounded-lg'>Submit</button>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default ContactUs
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Facebook, 
  Send,
  Building2,
  Headphones,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Sunday to Thursday\n9:30 AM to 5:30 PM',
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Trading Hotline',
      details: '09609 100 142\n+88 01874444815\n+88 0241040007',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'info@midwaybd.com',
      color: 'text-purple-600',
      link: 'mailto:info@midwaybd.com'
    },
    {
      icon: Headphones,
      title: 'IPO Hotline',
      details: '09609 100 142',
      color: 'text-orange-600'
    }
  ]

  const branches = [
    { name: 'Head Office', location: 'Motijheel', type: 'main' },
    { name: 'Swantex Branch', location: 'Motijheel', type: 'branch' },
    { name: 'DSE Tower', location: 'Nikunja 2', type: 'branch' },
    { name: 'Jabbar Tower', location: 'Gulshan', type: 'branch' },
    { name: 'Chowk Bazar Office', location: 'Chowk Bazar', type: 'branch' },
    { name: 'HM Plaza', location: 'Uttara', type: 'branch' },
    { name: 'Comilla Office', location: 'Comilla', type: 'branch' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: "url('https://www.midwaybd.com/uploads/6/0/4/6/60462737/background-images/338544438.jpg')" 
          }}
        ></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl font-light">We're here to help you succeed</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${info.color}`}>
                  <info.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{info.title}</h3>
              </div>
              {info.link ? (
                <a href={info.link} className="text-blue-600 hover:text-blue-800 font-medium">
                  {info.details}
                </a>
              ) : (
                <p className="text-gray-600 whitespace-pre-line font-medium">
                  {info.details}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <Send className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="trading">Trading Support</option>
                  <option value="ipo">IPO Information</option>
                  <option value="account">Account Issues</option>
                  <option value="technical">Technical Support</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Please describe how we can help you..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Branch Locations & Additional Info */}
          <div className="space-y-8">
            {/* Branch Locations */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Locations</h2>
              </div>

              <div className="space-y-4">
                {branches.map((branch, index) => (
                  <Link
                    key={index}
                    href="/our-branches"
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        branch.type === 'main' ? 'bg-blue-600' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {branch.name}
                        </h4>
                        <p className="text-sm text-gray-600">{branch.location}</p>
                      </div>
                    </div>
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media & Additional Support */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Connect With Us</h2>
              </div>

              <div className="space-y-4">
                <a
                  href="https://www.facebook.com/midwaytrec142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Facebook</h4>
                    <p className="text-sm text-gray-600">Follow us for updates</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">DSE Mobile App Support</h4>
                    <p className="text-sm text-gray-600">09609 100 142, +88 01874444816</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Accounts Department</h4>
                    <p className="text-sm text-gray-600">09609 100 142</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs