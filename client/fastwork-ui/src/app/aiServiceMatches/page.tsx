'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MyServiceCard from '@/components/MyServiceCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ServiceData {
    title: string;
    profileId: string;
    description1?: string;
    description2?: string;
    description3?: string;
    rating?: number;
}

export default function AIServiceMatches() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get data from searchParams
    const serviceData: ServiceData = {
        title: searchParams.get('title') || '',
        profileId: searchParams.get('profileId') || '',
        description1: searchParams.get('description1') || '',
        description2: searchParams.get('description2') || '',
        description3: searchParams.get('description3') || '',
        rating: 0, // Set default rating or adjust as needed
    };

    const { authUser } = useSelector((state: RootState) => state.auth);

    return (
        <div className="m-16 flex flex-col justify-center items-center">
            <h3 className="text-xl font-medium text-gray-900 mb-4 text-center">
                Based on the service details you&apos;ve provided
            </h3>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                AI has matched you with the following service
            </h2>

            <div className="flex flex-col items-center grid-cols-1 sm:w-full md:w-[40%] lg:w-[40%] w-full">
                <MyServiceCard
                    title={serviceData.title || 'No title provided'}
                    name={authUser?.username || 'Anonymous'}
                    description={[
                        serviceData.description1 || '',
                        serviceData.description2 || '',
                        serviceData.description3 || ''
                    ]}
                    image="/profile-pic.jpg"
                    rating={serviceData.rating || 0}
                />

                <div className="flex justify-between w-full gap-4 py-6">
                    <button onClick={() => router.push('/customiseService')} className='w-1/2 text-white bg-[#0B2147] hover:bg-[#D0693B] py-3 px-4 rounded-lg text-sm'>
                        Add another service offer
                    </button>
                    <button onClick={() => router.push('/myProfile')} className='w-1/2 text-white bg-[#0B2147] hover:bg-[#D0693B] py-3 px-4 rounded-lg text-sm '>
                        View my full profile
                    </button>
                </div>
            </div>
        </div>
    );
}
