// app/faq/FAQList.js
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQList({ faqs }) {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
        >
          <button
            onClick={() => toggle(faq.id)}
            className="w-full text-left flex justify-between items-center"
          >
            <span className="font-semibold text-lg">{faq.question}</span>
            <span>{openId === faq.id ? '−' : '+'}</span>
          </button>

          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-gray-700"
              >
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
