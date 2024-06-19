'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CreateProfile(): React.ReactNode {
  const router = useRouter();
  const [page1, setPage1] = useState(false);
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(false);
  const [page4, setPage4] = useState(false);

  if (!page1 && !page2 && !page3 && !page4) {
    return (
      <>
        <div className="common-bg min-h-screen flex flex-col justify-center items-center p-4">
          <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">It seems like you do not have a profile yet.</h2>
          <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">Let's make a jobonic profile!</h2>
          <div className="max-w-4xl mx-auto w-full mt-8 grid grid-cols-2 e-disabled">
            <input type="text" id="full-name" placeholder='Your Full Name'
              className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4 ml-2 mr-2" />
            <input type="text" id="other-name" placeholder='How do you want others to call you?'
              className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4 ml-2 mr-2" />
            <input type="tel" id="contact-number" placeholder='Contact Number'
              className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4 ml-2 mr-2" />
            <input type="text" id="preentered-email" placeholder='test@test.com'
              className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4 ml-2 mr-2" disabled={true} />
          </div>
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1">
            <input type="text" id="home-address" placeholder='Home Address'
              className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2 mr-2" />
          </div>
          <div className="mt-4">
            <button onClick={() => setPage1(true)} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg' style={{ borderColor: 'transparent' }}>Next</button>
          </div>
        </div>
      </>
    );
  } else if (page1 && !page2 && !page3 && !page4) {
    return (
      <>
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Verify your phone number</h2>
          <div className="max-w-xl mx-auto w-full mt-8 mb-8 grid grid-cols-1">
            <div className="max-w-4xl mx-auto w-full mb-4" style={{ display: 'inline-grid', gridTemplateColumns: '3fr 1fr' }}>
              <input type="text" id="phone-number-otp" placeholder='Phone number OTP'
                className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4" />
              <button className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-1 pr-1 rounded-lg text-lg' style={{ borderColor: 'transparent' }}>Verify OTP</button>
            </div>
            <div className="max-w-xl mx-auto w-full mb-4" style={{ display: 'inline-grid', gridTemplateColumns: '3fr 1fr' }}>
              <input type="text" id="email-otp" placeholder='Email OTP'
                className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4" />
              <button className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-1 pr-1 rounded-lg text-lg' style={{ borderColor: 'transparent' }}>Verify OTP</button>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={() => setPage2(true)} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg' style={{ borderColor: 'transparent' }}>Next</button>
          </div>
        </div>
      </>
    );
  } else if (page1 && page2 && !page3 && !page4) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Verify your identity</h2>
        <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
        </div>
        <Image src={'/thai-national-id.jpg'} alt="thai-id" width={200} height={200} />
        <div className="mt-4">
          <button onClick={() => setPage3(true)} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-2 pb-2 pl-4 pr-4 rounded-lg text-md' style={{ borderColor: 'transparent' }}>Next</button>
        </div>
      </div>
    );
  } else if (page1 && page2 && page3 && !page4) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Share more about yourself!</h2>
        <h2 className="text-xl font-medium text-gray-400 mb-4 text-center">A detailed profile adds to your credibility as you offer services.</h2>
        <div className="mt-4 grid grid-cols-1">
          <button onClick={() => router.push('/myProfile')} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-4 pb-4 pl-8 pr-8 rounded-lg text-md mb-4' style={{ borderColor: 'transparent' }}>Upload from LinkedIn</button>
          <button onClick={() => router.push('/myProfile')} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-4 pb-4 pl-8 pr-8 rounded-lg text-md mb-4' style={{ borderColor: 'transparent' }}>Upload resume</button>
          <button onClick={() => router.push('/myProfile')} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-4 pb-4 pl-8 pr-8 rounded-lg text-md mb-4' style={{ borderColor: 'transparent' }}>Create profile manually</button>
        </div>
      </div>
    );
  }
}
