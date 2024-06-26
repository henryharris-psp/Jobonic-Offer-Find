'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/paymentType');
  };

  return (
    <div className="p-16">
      {/* Stepper */}
      <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        <li className="flex items-center text-[#71BAC7] space-x-2.5 rtl:space-x-reverse">
          <span className="flex items-center justify-center w-8 h-8 border border-[#71BAC7] rounded-full shrink-0">
            1
          </span>
          <span>
            <h3 className="font-medium leading-tight">User Info</h3>
            <p className="text-sm">Step details here</p>
          </span>
        </li>
        <li className="flex items-center text-gray-500 space-x-2.5 rtl:space-x-reverse">
          <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
            2
          </span>
          <span>
            <h3 className="font-medium leading-tight">Payment Type</h3>
            <p className="text-sm">Step details here</p>
          </span>
        </li>
        <li className="flex items-center text-gray-500 space-x-2.5 rtl:space-x-reverse">
          <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
            3
          </span>
          <span>
            <h3 className="font-medium leading-tight">Payment Info</h3>
            <p className="text-sm">Step details here</p>
          </span>
        </li>
      </ol>

      <form className="mt-8 space-y-6" onSubmit={handleNext}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#71BAC7] focus:border-[#71BAC7] sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#71BAC7] focus:border-[#71BAC7] sm:text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#71BAC7] focus:border-[#71BAC7] sm:text-sm"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#71BAC7] focus:border-[#71BAC7] sm:text-sm"
            placeholder="Enter your address"
          />
        </div>

        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#71BAC7] hover:bg-[#5BA8B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71BAC7]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
