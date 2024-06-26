"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PaymentInfoCrypto = () => {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    setIsPopupVisible(true);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="p-16">
      {/* Stepper */}
      <ol className="mb-16 items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        <li className="flex items-center text-gray-500 space-x-2.5 rtl:space-x-reverse">
          <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
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
        <li className="flex items-center text-[#71BAC7] space-x-2.5 rtl:space-x-reverse">
          <span className="flex items-center justify-center w-8 h-8 border border-[#71BAC7] rounded-full shrink-0">
            3
          </span>
          <span>
            <h3 className="font-medium leading-tight">Payment Info</h3>
            <p className="text-sm">Step details here</p>
          </span>
        </li>
      </ol>

      <h2 className="text-2xl font-bold text-center mb-4 text-black">Digital Currency Payment Info</h2>

      <form className="space-y-6" onSubmit={handleNext}>
        <div>
          <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-900">
            Wallet Address
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#71BAC7] focus:ring-[#71BAC7]"
          />
        </div>
        <div>
          <label htmlFor="cryptoType" className="block text-sm font-medium text-gray-900">
            Cryptocurrency Type
          </label>
          <select
            id="cryptoType"
            name="cryptoType"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#71BAC7] focus:ring-[#71BAC7]"
          >
            <option selected disabled>Select cryptocurrency for your payment</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="litecoin">Litecoin</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="transactionId" className="block text-sm font-medium text-gray-900">
            Transaction ID
          </label>
          <input
            id="transactionId"
            name="transactionId"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#71BAC7] focus:ring-[#71BAC7]"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#71BAC7] focus:ring-[#71BAC7]"
          />
        </div>
        <div className="flex items-center justify-start mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-[#0C2348] text-white text-sm font-medium rounded-md hover:bg-[#D0693B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2348]"
          >
            Confirm Payment
          </button>
        </div>
      </form>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Payment successful</h2>
            <button
              onClick={handleGoHome}
              className="px-4 py-2 bg-[#0C2348] text-white text-sm font-medium rounded-md hover:bg-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2348]"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfoCrypto;


