'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import MyServiceCard from '@/components/MyServiceCard';

type User = {
    name: string;
    services: string[];
    description: string;
    skills: string[];
    experience: string[];
    education: string[];
    otherInformation: string[];
    rating: number;
};

export default function AIServiceMatches(): React.ReactNode {
    const router = useRouter();
    const user: User = {
        name: "emm",
        services: ["Service 1", "Service 2", "Service 3"],
        description: "This is a dummy description.",
        skills: ["UI/UX Design", "Photography", "Pottery", "Driving"],
        experience: ["UI/UX Designer in Google", "Freelance Photographer for 5 years", "Pottery Certificate"],
        education: ["School 1", "School 2", "School 3"],
        otherInformation: ["random", "languages", "certifications"],
        rating: 4.5,
    };

    return (
        <div className="m-16">
            <h3 className="text-xl font-medium text-gray-900 mb-4 text-center">From your profile and the information you've provided</h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">AI has written a description for you</h2>

            {/* MyServiceCard Component */}
            <div className="flex flex-col items-center grid grid-cols-1 w-full" style={{paddingLeft: '20rem', paddingRight: '20rem'}}>
                <MyServiceCard
                    title="Plumber"
                    name={user.name}
                    description={user.skills}
                    image="/profile-pic.jpg"
                    rating={user.rating}
                />
                <div className="flex justify-between gap-16 py-8">
                    <button onClick={() => router.push('/selectSkills')} className='w-1/3 text-white bg-[#0B2147] hover:bg-[#D0693B] py-3 px-4 rounded-lg text-sm'>Add another service offer</button>
                    <button onClick={() => router.push('/myProfile')} className='w-1/3 text-white bg-[#0B2147] hover:bg-[#D0693B] py-3 px-4 rounded-lg text-sm'>View my full profile</button>
                </div>
            </div>
        </div>
    )
}