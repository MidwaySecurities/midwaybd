'use client'
import React from 'react'

const CreditCardDeposit = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            clientCode: formData.get('clientCode'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            amount: formData.get('amount'),
        };
        // Here you would typically send the data to your server or API
    }
    return (
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
                <label htmlFor="email" className='block mb-2'>Email</label>
                <input type="text" id="email" name="email" className='border border-gray-300 p-2 w-full' required />
            </div>
            <div className='mb-4'>
                <label htmlFor="phone" className='block mb-2'>Phone</label>
                <input type="text" id="phone" name="phone" className='border border-gray-300 p-2 w-full' required />
            </div>
            <div className='mb-4'>
                <label htmlFor="amount" className='block mb-2'>Deposit Amount</label>
                <input type="number" id="amount" name="amount" className='border border-gray-300 p-2 w-full' required />
            </div>
            <button type="submit" className='bg-secondary_color text-white rounded-lg p-1 px-3 block uppercase'>Submit Deposit</button>
        </form>
    )
}

export default CreditCardDeposit