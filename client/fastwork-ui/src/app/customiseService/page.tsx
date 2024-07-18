'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { baseURL, token } from "@/baseURL";
import { AxiosError } from 'axios';

type UserData = {
    "id"?: number;
    "email"?: string;
    "phoneNumber"?: string;
    "address"?: string;
};

export default function CustomiseService(): React.ReactNode {
    const [description, setDescription] = useState('');
    const [user, setUser] = useState<UserData>({});
    const router = useRouter();

    useEffect(() => {
        const fetchUserIdAndData = async () => {
            try {
                // Fetch user ID and email from init-data
                const response = await httpClient.get(`https://api-auths.laconic.co.th/v1/user/init-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json'
                    }
                });
                const userData = response.data;
                const userId = userData.id;

                // Set initial user data with id and email
                setUser({
                    "id": userId,
                    "email": userData.email
                });

                // Fetch additional user data using the userId
                const userDetailsResponse = await httpClient.get(`${baseURL}/api/v1/user?id=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json'
                    }
                });
                const userDetails = userDetailsResponse.data;

                // Update user state with additional data
                setUser(prevUser => ({
                    ...prevUser,
                    "phoneNumber": userDetails.phoneNumber || null,
                    "address": userDetails.address || null
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserIdAndData();
    }, []);

    const handleSaveDescription = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (!user["id"]) {
            console.error('User ID is not available.');
            return;
        }

        const serviceData = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "serviceOfferDTO": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "description": description,
                "bankCardNumber": null,
                "email": user["email"],
                "startDate": null,
                "phone": user["phoneNumber"],
                "address": user["address"],
                "skills": null,
                "experience": null,
                "draftCount": 0
            },
            "serviceRequestDTO": {
                "id": null,
                "description": null,
                "bankCardNumber": null,
                "email": null,
                "startDate": null,
                "phone": null,
                "address": null,
                "skills": null,
                "experience": null,
                "draftCount": null
            },
            "profileId": user["id"],
            "title": null
        };

        console.log('Service Data:', JSON.stringify(serviceData, null, 2)); // Log the service data to verify

        try {
            const response = await httpClient.post(`${baseURL}/api/v1/service`, serviceData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const savedServiceId = response.data.id; // Capture the service ID from the response

            console.log('Response Data:', response.data);
            console.log(savedServiceId);
            router.push(`/selectSkills?serviceId=${savedServiceId}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error posting service data:', error.response?.data || error.message);
            } else {
                console.error('Error posting service data:', error);
            }
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col justify-center items-center p-4">
            <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">In 1-2 sentences, describe</h2>
            <h2 className="text-6xl font-bold text-gray-900 mb-4 text-center">what services do you offer?</h2>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <input
                    type="text"
                    id="describe-service-offered"
                    placeholder="e.g. I can design websites"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <button
                    onClick={(e) => handleSaveDescription(e)}
                    className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
}




