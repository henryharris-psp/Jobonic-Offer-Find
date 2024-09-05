"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import httpClient from '@/client/httpClient';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface Education {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
}

const EducationComponent = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [formData, setFormData] = useState<Education>({
        institute: '',
        degree: '',
        startDate: '',
        endDate: '',
    });
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const fetchEducationData = async () => {
        try {
            const response = await httpClient.get(`/user-education/all?userId=${authUser?.profile.id}`);
            setEducationList(response.data);
        } catch (error) {
            console.error('Failed to fetch education data:', error);
        }
    };

    useEffect(() => {
        // Fetch data whenever the component mounts
        if (authUser?.profile.id) {
            fetchEducationData();
        }
    }, [authUser?.profile.id]); // Dependency array with authUser profile ID



    const handleSave = async () => {
        if (!formData.institute || !formData.degree || !formData.startDate || !formData.endDate) {
            setFeedbackMessage('Please fill in all fields.');
            return;
        }

        const newEducation = {
            profileId: authUser?.profile.id,
            ...formData,
        };

        try {
            // Send POST request to API
            await httpClient.post('/user-education', newEducation);
            setEducationList((prev) => [...prev, newEducation]);
            setFeedbackMessage('Education saved successfully!');
            setShowNewEntry(false);
            setFormData({ institute: '', degree: '', startDate: '', endDate: '' });

            fetchEducationData();

        } catch (error) {
            console.error('Error saving education:', error);
            setFeedbackMessage('Failed to save education.');
        }
    };


    return (
        <section className="flex flex-col w-[60%] justify-start ml-16 mt-4 pb-4 ">
            <div className="flex flex-row space-x-4 items-center">
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                <PlusCircleIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setShowNewEntry((prev) => !prev)}
                />
                <h3 className="text-xs text-gray-400 items-center select-none">Add Education</h3>
            </div>
            {showNewEntry && (
                <div className="space-y-3 rounded-lg p-4 bg-gray-100 mt-4">
                    {['institute', 'degree', 'startDate', 'endDate'].map((field, index) => (
                        <div key={index} className="grid grid-cols-3 items-center">
                            <label htmlFor={`education.${field}`} className="flex flex-col font-bold capitalize">
                                {field.replace('startDate', 'Start Date').replace('endDate', 'End Date')}
                            </label>
                            <input
                                type={field.includes('Date') ? 'date' : 'text'}
                                id={`education.${field}`}
                                name={field}
                                value={formData[field as keyof Education]}
                                onChange={handleInputChange}
                                placeholder={`Enter your ${field}`}
                                className="text-black col-span-2 border-none bg-white rounded-lg"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSave}
                        className="bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 rounded-lg w-64 mt-4 mb-4"
                    >
                        Save
                    </button>
                </div>
            )}
            {educationList.map((education, index) => (
                <div key={index} className="space-y-3 rounded-lg p-4 bg-gray-100 mt-4">
                    {Object.entries(education).map(([key, value]) => {
                        // Hide the 'id' and 'profileId' fields
                        if (key === 'id' || key === 'profileId') return null;

                        return (
                            <div key={key} className="flex flex-col justify-start">
                                <h3 className="font-bold mr-6 capitalize">
                                    {key.replace('startDate', 'Start Date').replace('endDate', 'End Date')}:
                                </h3>
                                <input
                                    type={key.includes('Date') ? 'date' : 'text'}
                                    value={value}
                                    className="text-black w-[60%] col-span-2 border-none rounded-lg"
                                    disabled
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
            {feedbackMessage && (
                <p className={`text-sm mt-2 p-2 border rounded ${feedbackMessage.includes('success') ? 'text-green-800 bg-green-100 border-green-400' : 'text-red-800 bg-red-100 border-red-400'}`}>
                    {feedbackMessage}
                </p>
            )}
        </section>
    );
};

export default EducationComponent;
