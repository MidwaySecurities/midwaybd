import React from 'react'

const CreditCardDeposit = () => {
    return (
            <form>
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
                <button type="submit" className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Submit Deposit</button>
            </form>
    )
}

export default CreditCardDeposit