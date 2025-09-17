import React from 'react'

const DepositForm = () => {
    return (
        <div className='mt-4 mb-4 p-4 border border-gray-300 rounded-lg'>
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
                <button type="submit" className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Submit Deposit</button>
            </form>
        </div>
    )
}

export default DepositForm