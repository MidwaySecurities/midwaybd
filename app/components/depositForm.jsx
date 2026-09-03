'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios';

// ── Alert Modal ──────────────────────────────────────────────────────────────
const AlertModal = ({ alert, onClose }) => {
    if (!alert) return null;

    const isSuccess = alert.type === 'success';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                className={`
                    relative z-10 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden
                    transform transition-all duration-300
                    ${isSuccess ? 'bg-white' : 'bg-white'}
                `}
            >
                {/* Colored top bar */}
                <div className={`h-1.5 w-full ${isSuccess ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                <div className="p-6 flex flex-col items-center text-center gap-4">
                    {/* Icon circle */}
                    <div
                        className={`
                            w-16 h-16 rounded-full flex items-center justify-center text-3xl
                            ${isSuccess
                                ? 'bg-emerald-50 text-emerald-500'
                                : 'bg-rose-50 text-rose-500'}
                        `}
                    >
                        {isSuccess ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                strokeLinejoin="round" className="w-8 h-8">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                strokeLinejoin="round" className="w-8 h-8">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className={`text-xl font-semibold tracking-tight ${isSuccess ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {isSuccess ? 'Deposit Submitted' : 'Submission Failed'}
                    </h2>

                    {/* Message */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {alert.message}
                    </p>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className={`
                            mt-1 w-full py-2.5 rounded-xl text-sm font-medium tracking-wide
                            transition-colors duration-200
                            ${isSuccess
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                : 'bg-rose-500 hover:bg-rose-600 text-white'}
                        `}
                    >
                        {isSuccess ? 'Done' : 'Try Again'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = () => (
    <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
    </svg>
);

// ── Main Form ────────────────────────────────────────────────────────────────
const DepositForm = () => {
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            client_code: formData.get('clientCode').toUpperCase(),
            client_name: formData.get('client_name'),
            email: formData.get('email'),
            phone_number: formData.get('phone_number'),
            amount: formData.get('amount'),
            bank_name: formData.get('bank_name'),
            deposit_slip: formData.get('depositSlip'),
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_PORTAL_URL}/web/deposit/bank/request`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PORTAL_API_BEARER_TOKEN}`
                }
            });
            const result = await response.data;

            setAlert({ type: 'success', message: result.message });
            e.target.reset();
        } catch (error) {
            console.error('Deposit Error:', error);
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            setAlert({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const [depositSlipPreview, setDepositSlipPreview] = useState(null);

    const handleDepositSlipChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setDepositSlipPreview(URL.createObjectURL(file));
        } else {
            setDepositSlipPreview(null);
        }
    };

    const starMark = <span className='text-red-500'>*</span>;
    return (
        <>
            <AlertModal alert={alert} onClose={() => setAlert(null)} />

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="clientCode" className='block mb-2'>Client Code {starMark}</label>
                    <input type="text" id="clientCode" name="clientCode" className='border border-gray-300 p-2 w-full uppercase' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="client_name" className='block mb-2'>Name {starMark}</label>
                    <input type="text" id="client_name" name="client_name" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='block mb-2'>Email {starMark}</label>
                    <input type="text" id="email" name="email" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="phone_number" className='block mb-2'>Phone {starMark}</label>
                    <input type="phone_number" id="phone_number" name="phone_number" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="amount" className='block mb-2'>Deposit Amount {starMark}</label>
                    <input type="number" id="amount" name="amount" className='border border-gray-300 p-2 w-full' required />
                </div>

                {/* deposit slip preview image */}
                {/* <div className='mb-4'>
                    <label htmlFor="depositSlip" className='block mb-2'>Deposit Slip {starMark}</label>
                    <input type="file" id="depositSlip" name="depositSlip" className='border border-gray-300 p-2 w-full' required />
                </div> */}
                <div className="mb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-start gap-2">
                        <div className="flex-[.5]">
                            <label htmlFor="depositSlip" className="block mb-2">
                                Deposit Slip {starMark}
                            </label>
                            <input
                                type="file"
                                id="depositSlip"
                                name="depositSlip"
                                accept="image/*"
                                onChange={handleDepositSlipChange}
                                className="hidden border border-gray-300 p-2 w-full"
                                required
                            />
                            <label
                                htmlFor="depositSlip"
                                className="inline-block bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {depositSlipPreview ? "Change Deposit Slip" : "Choose Deposit Slip"}
                            </label>
                        </div>
                        {depositSlipPreview && (
                            <div className="mt-3">
                                <div className="border border-gray-300 rounded-lg inline-block">
                                    <Image
                                        width={50}
                                        height={50}
                                        src={depositSlipPreview}
                                        alt="Deposit Slip Preview"
                                        className="h-[100px] w-auto object-contain rounded"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="bank_name" className='block mb-2'>Select Midway Bank Account {starMark}</label>
                    <select id="bank_name" name="bank_name" className='border border-gray-300 p-2 w-full' required>
                        <option value="">Select Bank</option>
                        <option value="The City Bank">The City Bank</option>
                        <option value="Dutch Bangla">Dutch Bangla</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        bg-secondary_color text-white rounded-lg p-1 px-3 block uppercase
                        inline-flex items-center gap-2
                        transition-opacity duration-200
                        ${loading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                    `}
                >
                    {loading && <Spinner />}
                    {loading ? 'Submitting…' : 'Submit Deposit'}
                </button>
            </form>
        </>
    );
};

export default DepositForm;