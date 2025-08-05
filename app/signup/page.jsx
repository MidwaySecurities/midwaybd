'use client'

import { createUser } from "@/lib/actions/user/createUser";
import { useActionState } from "react";
const initialState = {
    loading: false,
    error: null
};
const Signup = () => {
    const [state, formActions] = useActionState(
        async (_state, formData) => createUser(formData), initialState
    )
    return (
        <div>
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-3xl text-center font-bold'>Sign Up</h1>
                <p className='text-center mt-4'>Please fill in the form below to create an account.</p>
                <form action={formActions} className='mt-8 max-w-md mx-auto'>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2' htmlFor='name'>Name</label>
                        <input type='text' id='name' name="name" className='w-full p-2 border rounded' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2' htmlFor='email'>Email</label>
                        <input type='email' id='email' name="email" className='w-full p-2 border rounded' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2' htmlFor='password'>Password</label>
                        <input type='password' id='password' name="password" className='w-full p-2 border rounded' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2' htmlFor='phone'>Phone</label>
                        <input type='tel' id='phone' name="phone" className='w-full p-2 border rounded' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2' htmlFor='address'>Address</label>
                        <input type='text' id='address' name="address" className='w-full p-2 border rounded' required />
                    </div>
                    <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;