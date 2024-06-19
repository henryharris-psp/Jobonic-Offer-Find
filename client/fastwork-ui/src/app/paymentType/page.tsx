"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const PaymentType = () => {
  const router = useRouter();

  const handleNext = (event, route) => {
    event.preventDefault();
    router.push(route);
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
        <li className="flex items-center text-[#71BAC7] space-x-2.5 rtl:space-x-reverse">
          <span className="flex items-center justify-center w-8 h-8 border border-[#71BAC7] rounded-full shrink-0">
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

      <h2 className="text-2xl font-bold text-center mb-8 text-black">Select Payment Type</h2>

      <div className="space-y-6">
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoCrypto')}
        >
          <svg aria-hidden="true" className="w-6 h-5 me-2 -ms-1" viewBox="0 0 2405 2501" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* MetaMask SVG paths */}
          </svg>
          Connect with MetaMask
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoCrypto')}
        >
          <svg aria-hidden="true" className="w-5 h-5 me-2 -ms-1" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            {/* Opera Wallet SVG paths */}
          </svg>
          Connect with Opera Wallet
        </button>
        <button
          type="button"
          className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoCrypto')}
        >
          <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="bitcoin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* Bitcoin SVG paths */}
          </svg>
          Pay with Bitcoin
        </button>
        <button
          type="button"
          className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoTraditional')}
        >
          <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* PayPal SVG paths */}
          </svg>
          Check out with PayPal
        </button>
        <button
          type="button"
          className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoTraditional')}
        >
          <svg className="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* Apple Pay SVG paths */}
          </svg>
          Check out with Apple Pay
        </button>
        <button
          type="button"
          className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoTraditional')}
        >
          <svg aria-hidden="true" className="w-10 h-3 me-2 -ms-1" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* American Express SVG paths */}
          </svg>
          Pay with American Express
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoTraditional')}
        >
          <svg aria-hidden="true" className="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Visa SVG paths */}
          </svg>
          Pay with Visa
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoTraditional')}
        >
          <svg aria-hidden="true" className="h-4 me-2 -ms-1 w-7" viewBox="0 0 601 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* MasterCard SVG paths */}
          </svg>
          Pay with MasterCard
        </button>
        <button
          type="button"
          className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
          onClick={(event) => handleNext(event, '/paymentInfoCrypto')}
        >
          <svg className="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            {/* Ethereum SVG paths */}
          </svg>
          Pay with Ethereum
        </button>
      </div>
    </div>
  );
};

export default PaymentType;



