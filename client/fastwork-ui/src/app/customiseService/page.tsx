'use client'

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import {useState} from 'react';
import { useRouter } from 'next/navigation';

export default function CustomiseService(): React.ReactNode {
    const [hasProfile, setHasProfile] = useState(true);
    const router = useRouter();
    return (
        <>
            <div className="bg-white min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">In 1-2 sentences, describe</h2>
                <h2 className="text-6xl font-bold text-gray-900 mb-4 text-center">what services do you offer?</h2>
                <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                    <input type="text" id="describe-service-offered" placeholder='e.g. I can design websites'
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mt-4">
                    <button onClick={() => hasProfile ? router.push('/selectSkills') : router.push('/createProfile')} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg'>Next</button>
                </div>
            </div>
        </>
    );
}
