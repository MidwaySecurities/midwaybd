'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import DownloadTransmissionForm from './components/transmission-form-download'
import Accordion from './components/link-bo-accordion'

const features = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="5" width="10" height="7" rx="1.5" stroke="#85B7EB" strokeWidth="1.4" />
        <path d="M6 5V4a2 2 0 014 0v1" stroke="#85B7EB" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Keep all your shares',
    desc: 'No need to sell before or during the transfer',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M8 3v10" stroke="#85B7EB" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Any DSE & CSE broker',
    desc: 'Transfer from any registered DSE & CSE brokerage',
  },
]

const steps = [
  {
    label: '1',
    title: 'Visit the Midway portal',
    desc: 'Go to portal.midwaybd.com and log in with your registered mobile number and password.',
    done: false,
  },
  {
    label: '2',
    title: 'Download the Transmission Form',
    desc: 'Find the Link BO section and download the PDF transmission form to your device.',
    done: false,
  },
  {
    label: '3',
    title: 'Fill in your BO account details',
    desc: 'Enter your BOID, current broker name, and personal details exactly as registered.',
    done: false,
  },
  {
    label: '4',
    title: 'Sign and upload the form',
    desc: 'Sign the completed form and upload it back through the portal submission page.',
    done: false,
  },
  {
    label: '✓',
    title: 'Transfer complete',
    desc: 'Your BO account will be linked within the standard DSE processing period. No shares are sold.',
    done: true,
  },
]

const faqs = [
  {
    q: 'What is a Link BO Account?',
    a: 'A Link BO Account lets you electronically transfer your Beneficiary Owner (BO) account from any DSE & CSE-registered broker to Midway Securities without selling any shares in your portfolio. Your shares remain intact.',
  },
  {
    q: 'Do I need to sell my shares first?',
    a: 'No. You can transfer all existing shares directly. You do not need to sell or liquidate any position before or during the link process.',
  },
  {
    q: 'Which brokers are eligible?',
    a: "Any BO account held at a DSE & CSE registered brokerage is eligible for transfer.",
  },
  {
    q: 'How long does the transfer take?',
    a: 'Processing times follow standard CDBL guidelines. Once your form is submitted and verified, the transfer is typically completed within a two business days.',
  },
]

const transferDetails = [
  { label: 'Link BO A/C fee', value: 'Free', badge: 'green' },
  { label: 'Sell shares required', value: 'No', badge: 'green' },
  { label: 'Eligible exchanges', value: 'DSE & CSE', badge: 'blue' },
]

const Badge = ({ type, children }) => {
  const styles = {
    green: 'bg-[#EAF3DE] text-[#3B6D11]',
    blue: 'bg-[#E6F1FB] text-[#185FA5]',
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles[type]}`}>
      {children}
    </span>
  )
}

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-3.5 flex justify-between items-center gap-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {q}
        <span className={`text-xs text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-[13px] text-gray-500 leading-relaxed">{a}</div>
      )}
    </div>
  )
}

const LinkBoAccount = () => {
  return (
    <div className="font-sans max-w-6xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="bg-[#0C447C] rounded-2xl p-10 mb-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-[11px] font-medium text-[#B5D4F4] tracking-wide uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-[#85B7EB] rounded-full" />
            CDBL Registered Service
          </div>
          <h1 className="font-serif text-4xl font-semibold text-white leading-tight mb-4">
            Link Your BO Account
          </h1>
          <p className="text-sm text-white/70 leading-relaxed mb-7 max-w-md">
            Transfer your Beneficiary Owner account from any Dhaka Stock Exchange broker —
            completely free, without selling a single share.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://portal.midwaybd.com/bo/portal-login"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-[#0C447C] rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#0C447C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              লিংক অ্যাকাউন্ট — Link Account
            </Link>
            <DownloadTransmissionForm className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-white/20 transition-colors" />
          </div>
        </div>

        <div className="bg-white/[0.07] border border-white/[0.15] rounded-xl p-6 space-y-4">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{title}</p>
                <p className="text-xs text-white/60 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body: two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

        {/* Left column */}
        <div className="space-y-5">

          {/* Steps */}
          <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-black/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-[#E6F1FB] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h8M2 12h5" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">How to link your account</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Complete these steps in order</p>
              </div>
            </div>
            {steps.map(({ label, title, desc, done }) => (
              <div key={title} className="flex gap-3.5 items-start px-5 py-3.5 border-b border-black/[0.06] last:border-b-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 mt-0.5 ${done ? 'bg-[#EAF3DE] text-[#3B6D11]' : 'bg-[#E6F1FB] text-[#185FA5]'}`}>
                  {label}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-900 leading-snug">{title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-black/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-[#FAEEDA] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="#854F0B" strokeWidth="1.4" />
                  <path d="M8 5.5v3" stroke="#854F0B" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="8" cy="10.5" r=".6" fill="#854F0B" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Frequently asked questions</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Common questions about Link BO</p>
              </div>
            </div>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>

        </div>

        {/* Right sidebar */}
        <div className="space-y-4">

          {/* CTA card */}
          <div className="bg-[#185FA5] rounded-xl p-5">
            <p className="text-[15px] font-semibold text-white mb-1.5">Ready to get started?</p>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              Log in to the Midway portal to link your BO account or download the transmission form.
            </p>
            <Link
              href="https://portal.midwaybd.com/link-bo/portal-login"
              target="_blank"
              className="block text-center bg-white text-[#185FA5] rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Create Link BO A/C →
            </Link>
            <div className="mt-2">
              <DownloadTransmissionForm className="block text-center bg-white/10 border border-white/30 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/20 transition-colors w-full" />
            </div>
          </div>

          {/* Transfer details */}
          <div className="bg-white border border-black/[0.08] rounded-xl p-5">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
              Transfer details
            </p>
            {transferDetails.map(({ label, value, badge }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-black/[0.06] last:border-b-0 first:pt-0 last:pb-0">
                <span className="text-xs text-gray-500">{label}</span>
                {badge ? <Badge type={badge}>{value}</Badge> : <span className="text-xs font-medium text-gray-900">{value}</span>}
              </div>
            ))}
          </div>

          {/* Help note */}
          <div className="bg-gray-50 border border-black/[0.06] rounded-xl p-4 flex gap-2.5 items-start">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="5.5" stroke="#185FA5" strokeWidth="1.4" />
              <path d="M8 7v3.5" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="8" cy="5.5" r=".6" fill="#185FA5" />
            </svg>
            <p className="text-xs text-gray-500 leading-relaxed">
              Need help? Contact Midway Securities support through the portal after logging in.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LinkBoAccount