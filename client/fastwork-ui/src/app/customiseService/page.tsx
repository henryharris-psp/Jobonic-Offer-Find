'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { AxiosError } from 'axios';
import { getProfileId } from "@/functions/helperFunctions";

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
    const [employmentType, setEmploymentType] = useState('PART_TIME'); // Default to first option
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [newLanguage, setNewLanguage] = useState('');
    const [location, setLocation] = useState('');
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState(''); // Initialize later
    const [askingPrice, setAskingPrice] = useState<number | null>(null);
    const [priceUnit, setPriceUnit] = useState('HOUR');
    const [user, setUser] = useState<UserData>({});
    const router = useRouter();

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        if (categoryList.length > 0) {
            setSelectedCategoryName(categoryList[0].name); // Default to first category name
        }
    }, [categoryList]);

    const fetchCategory = async () => {
        try {
            const response = await httpClient.get(`http://localhost:8081/api/v1/category/all`);
            setCategoryList(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddLanguage = () => {
        if (newLanguage.trim() !== '') {
            setLanguages([...languages, newLanguage]);
            setNewLanguage('');
        }
    };

    const handleSaveDescription = async (event: React.MouseEvent) => {
        event.preventDefault();
        const profileId = await getProfileId();
        const selectedCategory = categoryList.find(category => category.name === selectedCategoryName);
        const categoryId = selectedCategory ? selectedCategory.id : '';

        const serviceData = {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // This ID should typically be generated or provided
            ServiceOfferDTO: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            },
            profileId: profileId,
            title: title,
            employmentType: employmentType,
            description: description,
            description1: description1,
            description2: description2,
            description3: description3,
            languageSpoken: languages.join(', '),
            location: location,
            categoryId: categoryId,
            price: askingPrice,
            priceUnit: priceUnit
        };

        console.log('Service Data:', JSON.stringify(serviceData, null, 2));

        try {
            const response = await httpClient.post(`http://localhost:8081/api/v1/service`, serviceData);
            console.log('Response Data:', response.data);
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
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="service-description">Detailed description of your service (to be displayed in your profile)</label>
                <input
                    type="text"
                    id="service-description"
                    placeholder="e.g. I can design websites such as..."
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="employment-type">Employment Type</label>
                <select
                    id="employment-type"
                    value={employmentType}
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setEmploymentType(e.target.value)}
                >
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
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setDescription1(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <input
                    type="text"
                    id="description2"
                    placeholder="Job Description 2"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setDescription2(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <input
                    type="text"
                    id="description3"
                    placeholder="Job Description 3"
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
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
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
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
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                <label className="block text-lg font-semibold mb-2" htmlFor="category">Category</label>
                <select
                    id="category"
                    value={selectedCategoryName}
                    className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setSelectedCategoryName(e.target.value)}
                >
                    {categoryList.map((category) => (
                        <option key={category.id} value={category.name}>
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
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setAskingPrice(parseFloat(e.target.value))}
                    />
                    <select
                        className="block p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        value={priceUnit}
                        onChange={(e) => setPriceUnit(e.target.value)}
                    >
                        <option value="HOUR">Hour</option>
                        <option value="WEEK">Week</option>
                        <option value="MONTH">Month</option>
                        <option value="PROJECT">Project</option>
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
