'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PaymentInfoTraditional = () => {
  const router = useRouter(); // Initialize router for navigation
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to manage the visibility of the confirmation popup

  // Handle the form submission
  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Logic for handling form submission goes here (e.g., sending data to a server)
    setIsPopupVisible(true); // Show the confirmation popup after form submission
  };

  // Handle navigation to the homepage
  const handleGoHome = () => {
    router.push('/'); // Navigate to the homepage
  };

  return (
      <div className="p-16">
        {/* Stepper to indicate the current step in the payment process */}
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

        {/* Form to collect traditional payment information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-black">Payment Information</h2>
          <form onSubmit={handleNext} className="space-y-4">
            {/* Cardholder Name Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Cardholder Name</label>
              <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#71BAC7] focus:border-[#71BAC7] block w-full p-2.5"
                  placeholder="John Doe"
                  required
              />
            </div>
            {/* Card Number Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Card Number</label>
              <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#71BAC7] focus:border-[#71BAC7] block w-full p-2.5"
                  placeholder="1234 5678 9012 3456"
                  required
              />
            </div>
            {/* Expiration Date Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Expiration Date</label>
              <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#71BAC7] focus:border-[#71BAC7] block w-full p-2.5"
                  placeholder="MM/YY"
                  required
              />
            </div>
            {/* CVV Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">CVV</label>
              <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#71BAC7] focus:border-[#71BAC7] block w-full p-2.5"
                  placeholder="123"
                  required
              />
            </div>
            {/* Submit button to confirm the payment */}
            <div className="flex items-center justify-start mt-6">
              <button
                  type="submit"
                  className="px-4 py-2 bg-[#0C2348] text-white text-sm font-medium rounded-md hover:bg-[#D0693B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2348]"
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </div>

        {/* Popup for successful payment */}
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

export default PaymentInfoTraditional;
