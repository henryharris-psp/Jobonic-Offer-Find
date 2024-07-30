'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { baseURL, SERVER_AUTH } from "@/baseURL";
import { AxiosError } from 'axios';

type Category = {
    id: string;
    name: string;
};

type UserData = {
    id?: number;
    email?: string;
    phoneNumber?: string;
    address?: string;
};

const CustomiseService: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [newLanguage, setNewLanguage] = useState('');
    const [location, setLocation] = useState('');
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [askingPrice, setAskingPrice] = useState<number | null>(null);
    const [priceUnit, setPriceUnit] = useState('hour');
    const [user, setUser] = useState<UserData>({});
    const router = useRouter();

    useEffect(() => {
        const fetchUserIdAndData = async () => {
            try {
                const response = await httpClient.get(`${SERVER_AUTH}/v1/user/init-data`);
                const userData = response.data;
                const userId = userData.id;

                setUser({
                    id: userId,
                    email: userData.email,
                });

                const userDetailsResponse = await httpClient.get(`http://localhost:8081/api/v1/user?id=${userId}`);
                const userDetails = userDetailsResponse.data;

                setUser(prevUser => ({
                    ...prevUser,
                    phoneNumber: userDetails.phoneNumber || null,
                    address: userDetails.address || null,
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserIdAndData().catch(console.error);
    }, []);

    const fetchCategory = async () => {
        const response = await httpClient.get(`${baseURL}/api/v1/category/all`);
        setCategoryList(response.data);
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleAddLanguage = () => {
        if (newLanguage.trim() !== '') {
            setLanguages([...languages, newLanguage]);
            setNewLanguage('');
        }
    };

    const handleSaveDescription = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (!user.id) {
            console.error('User ID is not available.');
            return;
        }

        const serviceData = {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            serviceOfferDTO: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                description,
                bankCardNumber: null,
                email: user.email,
                startDate: null,
                phone: user.phoneNumber,
                address: user.address,
                skills: null,
                experience: null,
                draftCount: 0,
            },
            serviceRequestDTO: {
                id: null,
                description: null,
                bankCardNumber: null,
                email: null,
                startDate: null,
                phone: null,
                address: null,
                skills: null,
                experience: null,
                draftCount: null,
            },
            profileId: user.id,
            title,
            employmentType,
            description1,
            description2,
            description3,
            languageSpoken: languages,
            location,
            categoryId: selectedCategoryId,
            price: askingPrice,
            priceUnit,
        };

        console.log('Service Data:', JSON.stringify(serviceData, null, 2));

        try {
            const response = await httpClient.post('http://localhost:8081/api/v1/service', serviceData);

            const savedServiceId = response.data.id;

            console.log('Response Data:', response.data);
            console.log(savedServiceId);
            router.push(`/aiServiceMatches`);
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
            <h2 className="text-6xl font-bold text-gray-900 mb-4 text-center">Describe your service offer</h2>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="service-title">Service Title</label>
                <input
                    type="text"
                    id="service-title"
                    placeholder="e.g. Web developer"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="service-description">Detailed description of your service (to be displayed in your profile)</label>
                <input
                    type="text"
                    id="service-description"
                    placeholder="e.g. I can design websites such as..."
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="employment-type">Employment Type</label>
                <select
                    id="employment-type"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setEmploymentType(e.target.value)}
                >
                    <option value="" disabled>Select an option</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="FULL_TIME">Full-time</option>
                    <option value="CONTRACT">Contract</option>
                </select>
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="description1">3 summarised points of service offered (to be displayed in your service offer card)</label>
                <input
                    type="text"
                    id="description1"
                    placeholder="Job Description 1"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDescription1(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <input
                    type="text"
                    id="description2"
                    placeholder="Job Description 2"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDescription2(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <input
                    type="text"
                    id="description3"
                    placeholder="Job Description 3"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDescription3(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="languages">Languages Spoken</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        id="new-language"
                        placeholder="Add a language"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddLanguage}
                        className="bg-[#0B2147] text-white rounded-lg px-4 py-2 hover:bg-[#D0693B] text-sm"
                    >
                        Add
                    </button>
                </div>
                <div className="mt-4">
                    {languages.map((language, index) => (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {language}
            </span>
                    ))}
                </div>
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    placeholder="e.g. Phra Khanong"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="category">Category</label>
                <select
                    id="category"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                    <option value="" disabled>Select a category</option>
                    {categoryList.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="asking-price">Asking Price</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="number"
                        id="asking-price"
                        placeholder="Asking Price"
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setAskingPrice(parseFloat(e.target.value))}
                    />
                    <select
                        className="block p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setPriceUnit(e.target.value)}
                    >
                        <option value="hour">Hour</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="project">Project</option>
                    </select>
                </div>
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
};

export default CustomiseService;
