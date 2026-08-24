'use client'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

// Update this if your API is served from a different host in production.
// Falls back to the local dev URL if the env var isn't set.
const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || 'https://portal.midwaybd.com/api/contact-support'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  // 'success' | 'error' | null
  const [submitStatus, setSubmitStatus] = useState(null)
  // Server-side/Laravel validation errors, keyed by field name
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear the error for this field as soon as the user edits it
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setFieldErrors({})
    setGeneralError('')

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // Laravel validation failure
      if (response.status === 422) {
        const data = await response.json()
        setFieldErrors(data.errors || {})
        setGeneralError(data.message || 'Please check the fields below and try again.')
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      // Success
      setSubmitStatus('success')
      setFormData({
        full_name: '',
        phone_number: '',
        email: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setSubmitStatus(null), 4000)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setGeneralError('Something went wrong while sending your message. Please try again in a moment.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Small helper to render a field-level error message under an input
  const FieldError = ({ name }) => {
    if (!fieldErrors[name] || fieldErrors[name].length === 0) return null
    return (
      <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {fieldErrors[name][0]}
      </p>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <Send className="w-6 h-6 text-blue-600 mr-3" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3" role="status">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
          <p className="text-green-800 font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && generalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
          <p className="text-red-800 font-medium">{generalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${fieldErrors.full_name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                }`}
              required
            />
            <FieldError name="full_name" />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${fieldErrors.phone_number ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            <FieldError name="phone_number" />
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${fieldErrors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
              }`}
            required
          />
          <FieldError name="email" />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${fieldErrors.subject ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
              }`}
            required
          >
            <option value="">Select a subject</option>
            <option value="trading">Trading Support</option>
            <option value="ipo">IPO Information</option>
            <option value="account">Account Issues</option>
            <option value="technical">Technical Support</option>
            <option value="general">General Inquiry</option>
          </select>
          <FieldError name="subject" />
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
            maxLength={5000}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors resize-none ${fieldErrors.message ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
              }`}
            placeholder="Please describe how we can help you..."
            required
          ></textarea>
          <FieldError name="message" />
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
              <Send className="w-4 h-4" aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm