'use client'
import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, Building2, User, Phone, Mail, CreditCard, Wallet } from 'lucide-react';

export default function IPOApplicationForm() {
  const [formData, setFormData] = useState({
    ipoName: '',
    applicantName: '',
    fatherName: '',
    motherName: '',
    boAccountNo: '',
    email: '',
    phone: '',
    nid: '',
    bankName: '',
    bankBranch: '',
    accountNumber: '',
    depositMethod: '',
    applicationAmount: '',
    lotSize: '',
    numberOfLots: '1'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ipoName.trim()) newErrors.ipoName = 'IPO name is required';
    if (!formData.applicantName.trim()) newErrors.applicantName = 'Applicant name is required';
    if (!formData.boAccountNo.trim()) newErrors.boAccountNo = 'BO account number is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Valid BD phone number is required (01XXXXXXXXX)';
    }
    if (!formData.nid.trim()) newErrors.nid = 'NID number is required';
    if (!formData.depositMethod) newErrors.depositMethod = 'Please select a deposit method';
    if (!formData.numberOfLots || formData.numberOfLots < 1) {
      newErrors.numberOfLots = 'Number of lots must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  useEffect(() => {
    const upcommingIpos = fetch('http://midway-app.test/api/ipos')
      .then(response => response.json())
      .then(data => data.data)
      .catch(error => {
        console.error('Error fetching IPOs:', error);
        return [];
      });
  }, [])
  const ipos = [
    'Techno Drugs Limited',
    'Select IPO Company',
    'Other'
  ];

  const depositMethods = [
    { value: 'bkash', label: 'bKash' },
    { value: 'rocket', label: 'Rocket' },
    { value: 'nagad', label: 'Nagad' },
    { value: 'beftn', label: 'BEFTN/Online Banking' },
    { value: 'direct', label: 'Direct Bank Deposit' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full">
              <FileText className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Apply for IPO Online
          </h1>
          <p className="text-lg text-gray-600">
            আমাদের ওয়েবসাইটের মাধ্যমে আই.পি.ও অনলাইনে আবেদন করুন
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-green-800 font-semibold">Application Submitted Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your IPO application has been received. We'll contact you shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* IPO Info Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4">
            <div className="flex items-center text-white">
              <Building2 className="h-6 w-6 mr-3" />
              <div>
                <p className="text-sm font-medium opacity-90">Latest IPO</p>
                <p className="text-lg font-bold">Techno Drugs Limited</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* IPO Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select IPO Company *
              </label>
              <select
                name="ipoName"
                value={formData.ipoName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.ipoName ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Choose IPO Company</option>
                {ipos.map((ipo) => (
                  <option key={ipo} value={ipo}>{ipo}</option>
                ))}
              </select>
              {errors.ipoName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.ipoName}
                </p>
              )}
            </div>

            {/* Personal Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Applicant Name *
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.applicantName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.applicantName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.applicantName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Father's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Mother's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NID Number *
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.nid ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="National ID number"
                  />
                  {errors.nid && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.nid}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* BO Account & Banking */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                BO Account & Banking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    BO Account Number *
                  </label>
                  <input
                    type="text"
                    name="boAccountNo"
                    value={formData.boAccountNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.boAccountNo ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="BO Account Number"
                  />
                  {errors.boAccountNo && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.boAccountNo}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Your bank name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    name="bankBranch"
                    value={formData.bankBranch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Branch name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Account number"
                  />
                </div>
              </div>
            </div>

            {/* Deposit Method */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                Deposit Method
              </h3>
              <div className="space-y-3">
                {depositMethods.map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${formData.depositMethod === method.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="depositMethod"
                      value={method.value}
                      checked={formData.depositMethod === method.value}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{method.label}</span>
                  </label>
                ))}
                {errors.depositMethod && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.depositMethod}
                  </p>
                )}
              </div>
            </div>

            {/* Application Amount */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Application Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Lots *
                  </label>
                  <input
                    type="number"
                    name="numberOfLots"
                    value={formData.numberOfLots}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.numberOfLots ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter number of lots"
                  />
                  {errors.numberOfLots && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.numberOfLots}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lot Size
                  </label>
                  <input
                    type="text"
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Per lot amount"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit IPO Application
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2">Important Information:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Mobile banking deposits (bKash, Rocket, Nagad) incur a 1% service fee</li>
            <li>• Ensure your BO account is active before applying</li>
            <li>• Keep your transaction receipt for reference</li>
            <li>• Application processing takes 1-2 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}