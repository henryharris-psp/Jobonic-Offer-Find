'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import httpClient from '@/client/httpClient';
import { baseURL, token } from "@/baseURL";

const countryCodes = [
    { code: '+65', name: 'Singapore' },
    { code: '+66', name: 'Thailand' },
    { code: '+91', name: 'India' },
    // Add more country codes here
];

export default function CreateProfile(): React.ReactNode {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [page1, setPage1] = useState(false);
    const [page2, setPage2] = useState(false);
    const [page3, setPage3] = useState(false);

    const [countryCode, setCountryCode] = useState(countryCodes[0].code);
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [emailOtp, setEmailOtp] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await axios.get(`https://api-auths.laconic.co.th/v1/user/init-data`, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //         'accept': 'application/json'
                //     }
                // });
                const response = await httpClient.get(`https://api-auths.laconic.co.th/v1/user/init-data`);
                const userData = response.data;
                setUserId(userData.id);
                setContactNumber(userData.phoneNumber);
                setAddress(userData.address);
                setRoles(userData.roles);
                console.log(userData.id);
                console.log(userData.roles);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        setPage3(true);
        event.preventDefault();

        if (!userId) {
            console.error('User ID is not available.');
            return;
        }

        const fullPhoneNumber = `${countryCode}${contactNumber}`;

        const userData = {
            "id": userId,
            "companyName": "string",
            "phoneNumber": fullPhoneNumber,
            "address": address,
            "image": "string",
            "cardNumber": "string",
            "cardExpiryDate": "2024-07-16",
            "walletAddress": "string",
            "review": 0,
            "userExperienceList": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "profileId": userId,
                    "company": "string",
                    "startDate": "2024-07-16",
                    "endDate": "2024-07-16"
                }
            ],
            "userEducationList": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "profileId": 0,
                    "institute": "string",
                    "degree": "string",
                    "startDate": "2024-07-16",
                    "endDate": "2024-07-16"
                }
            ],
            "skills": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": "string"
                }
            ],
            "roles": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "roleType": "ADMIN"
                }
            ],
            "userId": userId
        };

        try {
            //console.log(userData);
            // const response = await axios.put(`${baseURL}/api/v1/user?id=${userId}`, userData, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json',
            //     },
            // });

            //console.log('User updated successfully:', response.data);

            const response = await httpClient.put(`${baseURL}/api/v1/user?id=${userId}`, userData);
            console.log('User created successfully:', response.data);
            //router.push('/myProfile');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error updating user from Axios:', error.response?.data || error.message);
            } else {
                console.error('Error updating user:', error);
            }
        }
    };

    if (!page1 && !page2 && !page3) {
        return (
            <div className="common-bg min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">It seems like you do not have a profile yet.</h2>
                <h2 className="text-3xl font-medium text-gray-900 mb-4 text-center">Let&apos;s make a Jobonic profile!</h2>
                <div className="max-w-4xl mx-auto w-full mt-8 flex items-center gap-4">
                    <div className="w-32">
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                        >
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <input type="tel" id="contact-number" placeholder="Contact Number"
                               value={contactNumber}
                               onChange={(e) => setContactNumber(e.target.value)}
                               className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" />
                    </div>
                </div>
                <div className="max-w-4xl mx-auto w-full mt-4">
                    <input type="text" id="address" placeholder="home/company address"
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}
                           className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" />
                </div>
                <div className="mt-4">
                    <button onClick={() => setPage1(true)}
                            className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg"
                            style={{ borderColor: 'transparent' }}>Next
                    </button>
                </div>
            </div>
        );
    } else if (page1 && !page2 && !page3) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Verify your phone number</h2>
                <div className="max-w-xl mx-auto w-full mt-8 mb-8 grid grid-cols-1">
                    <div className="max-w-4xl mx-auto w-full mb-4"
                         style={{ display: 'inline-grid', gridTemplateColumns: '3fr 1fr' }}>
                        <input type="text" id="phone-number-otp" placeholder="Phone number OTP"
                               value={phoneOtp}
                               onChange={(e) => setPhoneOtp(e.target.value)}
                               className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"/>
                        <button
                            className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-1 pr-1 rounded-lg text-lg"
                            style={{ borderColor: 'transparent' }}>Verify OTP
                        </button>
                    </div>
                    <div className="max-w-xl mx-auto w-full mb-4"
                         style={{ display: 'inline-grid', gridTemplateColumns: '3fr 1fr' }}>
                        <input type="text" id="email-otp" placeholder="Email OTP"
                               value={emailOtp}
                               onChange={(e) => setEmailOtp(e.target.value)}
                               className="p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4" />
                        <button className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-1 pr-1 rounded-lg text-lg" style={{ borderColor: 'transparent' }}>Verify OTP</button>
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={() => setPage2(true)} className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-lg text-lg" style={{ borderColor: 'transparent' }}>Next</button>
                </div>
            </div>
        );
    } else if (page1 && page2 && !page3) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Verify your identity</h2>
                <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                </div>
                <Image src={'/thai-national-id.jpg'} alt="thai-id" width={200} height={200} />
                <div className="mt-4">
                    <button onClick={(event: React.FormEvent<HTMLButtonElement>) => handleSubmit(event)} className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-2 pb-2 pl-4 pr-4 rounded-lg text-md" style={{ borderColor: 'transparent' }}>Next</button>
                </div>
            </div>
        );
    } else if (page1 && page2 && page3) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Share more about yourself!</h2>
                <h2 className="text-xl font-medium text-gray-400 mb-4 text-center">A detailed profile adds to your credibility as you offer services.</h2>
                <div className="mt-4 grid grid-cols-1">
                    <button onClick={() => router.push('/myProfile')} className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-4 pb-4 pl-8 pr-8 rounded-lg text-md mb-4" style={{ borderColor: 'transparent' }}>Upload from LinkedIn</button>
                    <button onClick={() => router.push('/myProfile')} className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-4 pb-4 pl-8 pr-8 rounded-lg text-md mb-4" style={{ borderColor: 'transparent' }}>Upload resume</button>
                    <button onClick={() => router.push('/myProfile')} className="text-white bg-[#0B2147] hover:bg-[#D0693B] pt-4 pb-4 pl-8 pr-8 rounded-lg text-md mb-4" style={{ borderColor: 'transparent' }}>Create profile manually</button>
                </div>
            </div>
        );
    }

    return null;
}


