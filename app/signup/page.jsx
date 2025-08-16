'use client';

import { createUser } from "@/lib/actions/user/createUser";
import { useActionState, useTransition } from "react";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const Signup = () => {
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    async (prevState, formData) => {
      try {
        const result = await createUser(formData);
        if (result?.error) {
          return {
            loading: false,
            error: result.error,
            success: false,
          };
        }
        return {
          loading: false,
          error: null,
          success: true,
        };
      } catch (error) {
        return {
          loading: false,
          error: 'Something went wrong.',
          success: false,
        };
      }
    },
    initialState
  );
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl text-center font-bold'>Sign Up</h1>
      <p className='text-center mt-4'>Please fill in the form below to create an account.</p>

      <form action={formAction} className='mt-8 max-w-md mx-auto'>
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

        {state.error && (
          <p className='text-red-500 text-sm mb-4'>{state.error}</p>
        )}
        {state.success && (
          <p className='text-green-600 text-sm mb-4'>User created successfully!</p>
        )}
        
        <button
          type='submit'
          disabled={isPending || state.loading}
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50'
        >
          {isPending || state.loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
