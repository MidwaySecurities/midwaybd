'use client'
import React, { useState } from 'react'
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
            client_code: formData.get('clientCode'),
            name: formData.get('name'),
            amount: formData.get('amount'),
            payment_method: formData.get('method'),
            deposit_slip: formData.get('depositSlip'),
        };

        try {
            const response = await axios.post('https://midway-wip.tanbinislam.com/api/web/deposit/request', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

    return (
        <>
            <AlertModal alert={alert} onClose={() => setAlert(null)} />

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="clientCode" className='block mb-2'>Client Code</label>
                    <input type="text" id="clientCode" name="clientCode" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="name" className='block mb-2'>Name</label>
                    <input type="text" id="name" name="name" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="amount" className='block mb-2'>Deposit Amount</label>
                    <input type="number" id="amount" name="amount" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="depositSlip" className='block mb-2'>Deposit Slip</label>
                    <input type="file" id="depositSlip" name="depositSlip" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="method" className='block mb-2'>Payment Method</label>
                    <select id="method" name="method" className='border border-gray-300 p-2 w-full' required>
                        <option value="">Select Bank</option>
                        <option value="bkash">City Bank</option>
                        <option value="nagad">Dutch Bangla</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase
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