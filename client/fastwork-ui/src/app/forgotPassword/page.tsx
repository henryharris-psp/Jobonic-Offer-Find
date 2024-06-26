'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassword = (): React.ReactNode => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your forgot password logic here.
    // For demo purposes, we'll just set a message.
    setMessage('If an account with that email exists, a password reset link will be sent.');
    setTimeout(() => {
      setMessage('');
      router.push('/login');
    }, 3000); // Redirect to login page after 3 seconds
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#0C2348' }}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0B2147] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-[#D0693B]"
            >
              Reset Password
            </button>
            <button
              type="button"
              className="bg-[#0B2147] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-[#D0693B]"
              onClick={() => router.push('/login')}
            >
              Cancel
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;



