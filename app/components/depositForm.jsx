import React from 'react'

const DepositForm = () => {
    return (
        <div>
            <form>
                <div className='mb-4'>
                    <label htmlFor="name" className='block mb-2'>Name</label>
                    <input type="text" id="name" name="name" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="amount" className='block mb-2'>Deposit Amount</label>
                    <input type="number" id="amount" name="amount" className='border border-gray-300 p-2 w-full' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="method" className='block mb-2'>Payment Method</label>
                    <select id="method" name="method" className='border border-gray-300 p-2 w-full' required>
                        <option value="">Select Method</option>
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                        <option value="rocket">Rocket</option>
                    </select>
                </div>
                <button type="submit" className='bg-qtp_btn_bg_color text-white rounded-lg p-1 px-3 block uppercase'>Submit Deposit</button>
            </form>
        </div>
    )
}

export default DepositForm