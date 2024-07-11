'use client'

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {baseURL, token} from "@/baseURL";

export default function CustomiseService(): React.ReactNode {
    //const [hasProfile, setHasProfile] = useState(true)
    const [description, setDescription] = useState('')
    const router = useRouter();

    const handleSaveDescription = async (event: React.MouseEvent) => {
        event.preventDefault();
        const serviceData = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "serviceOfferDTO": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "description": description,
                "bankCardNumber": "string",
                "email": "string",
                "startDate": "2024-07-11",
                "phone": "string",
                "address": "string",
                "draftCount": 0
        },
            "serviceRequestDTO": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "workCategory": "DEVELOPMENT",
                "employmentType": "PART_TIME",
                "description1": "string",
                "description2": "string",
                "description3": "string",
                "submissionDeadline": "2024-07-11",
                "budget": 0,
                "workExample": "string",
                "languageSpoken": "string",
                "location": "string"
        },
            "profileId": "9bf58ef5-9b61-4cdd-808d-3c6ceb5c16f1",
            "title": "string"
        }
        try {
            const response = await axios.get(`${baseURL}/api/v1/user`,
                {headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }, params: {
                        id: '9bf58ef5-9b61-4cdd-808d-3c6ceb5c16f1'}
                });
            console.log(response.data);
            const savedDescription = await axios.post(`${baseURL}/api/v1/service`, serviceData,
                {headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            console.log(savedDescription.data);
            router.push('/selectSkills');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                router.push('/createProfile');
            } else {
                console.error('Error fetching search results:', error);
            }
        }
    };
    return (
        <>
            <div className="bg-white min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">In 1-2 sentences, describe</h2>
                <h2 className="text-6xl font-bold text-gray-900 mb-4 text-center">what services do you offer?</h2>
                <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                    <input type="text" id="describe-service-offered" placeholder='e.g. I can design websites'
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="mt-4">
                    <button onClick={(e) => handleSaveDescription(e)} className='text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg'>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
