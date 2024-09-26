"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BookmarkSquareIcon, PencilIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import httpClient from '@/client/httpClient';
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Education {
    id?: string;
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
}

const EducationComponent = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null);
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

            if (editIndex !== null) {
                // Update existing education entry
                const updatedEducation = { ...educationList[editIndex], ...newEducation };

                //the endpoint is correct and matches the backend route
                const response = await httpClient.put(`/user-education?id=${updatedEducation.id}`, updatedEducation);

                setEducationList((prev) => {
                    const updatedList = [...prev];
                    updatedList[editIndex] = response.data;
                    return updatedList;
                });
                setFeedbackMessage('Education updated successfully!');
            }

            else {

                await httpClient.post('/user-education', newEducation);
                setEducationList((prev) => [...prev, newEducation]);
                setFeedbackMessage('Education saved successfully!');
            }

            setShowNewEntry(false);
            setFormData({ institute: '', degree: '', startDate: '', endDate: '' });
            setEditIndex(null);
            fetchEducationData();

        } catch (error) {
            console.error('Error saving education:', error);
            setFeedbackMessage('Failed to save education.');
        }
    };

    const handleRemoveClick = (index: number) => {
        setShowConfirmDelete(index); // Show confirmation popup
    };

    const handleConfirmDelete = async () => {
        if (showConfirmDelete !== null) {
            const educationToDelete = educationList[showConfirmDelete];

            try {
                await httpClient.delete(`/user-education?id=${educationToDelete.id}`);
                setEducationList((prev) => prev.filter((_, i) => i !== showConfirmDelete));
                setFeedbackMessage('Education deleted successfully!');
            } catch (error) {
                console.error('Error deleting education:', error);
                setFeedbackMessage('Failed to delete education.');
            }
        }

        setShowConfirmDelete(null); // Hide confirmation popup
    };

    const handleCancelDelete = () => {
        setShowConfirmDelete(null); // Hide confirmation popup
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setFormData(educationList[index]);
        setShowNewEntry(true);
    };



    return (
        <section className="flex flex-col justify-start lg:w-[65%] mt-4 pb-4 ">
            <div className="flex flex-row space-x-3 items-center mb-6">
                <h2 className="text-xl font-bold text-cyan-950">Education</h2>
                <PlusCircleIcon
                    className="w-5 h-5 cursor-pointer text-black"
                    onClick={() => setShowNewEntry((prev) => !prev)}
                />
                <h3 className="text-xs text-gray-400 items-center select-none">Add Education</h3>
            </div>
            {showNewEntry && (
                <div className="space-y-3 rounded-lg p-6 bg-gray-50">
                    {['institute', 'degree', 'startDate', 'endDate'].map((field, index) => (
                        <div key={index} className="grid grid-cols-3 items-center p-3">
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
                                className="text-black text-sm font-semibold p-4 col-span-2 border-none bg-white rounded-lg"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSave}
                        className="flex justify-center items-center mt-2 p-3 text-sm w-28 shadow-lg bg-[#0B2147] text-white font-bold rounded-2xl cursor-pointer"
                    >
                        <BookmarkSquareIcon className="w-6 h-6 mr-2" />
                        <span>Save</span>
                    </button>
                </div>
            )}
            <ul className="flex justify-start flex-wrap">
                {educationList.map((education, index) => (
                    <li key={index} className="px-8 py-4 mt-4 mr-6 bg-gray-50 rounded-lg relative">
                        <button
                            onClick={() => handleRemoveClick(index)}
                            className="absolute top-2 right-2 text-white p-1 rounded-full hover:bg-white transition duration-300"
                        >
                            <TrashIcon className="w-4 h-4 text-red-700" />
                        </button>
                        <button
                            onClick={() => handleEdit(index)}
                            className="absolute top-2 right-7 text-white p-1 rounded-full hover:bg-[#77E3C8] transition duration-300"
                        >
                            <PencilSquareIcon className="w-4 h-4 text-yellow-700" />
                        </button>
                        <ul className="space-y-1">
                            {Object.entries(education).map(([key, value]) => {
                                if (key === 'id' || key === 'profileId') return null;
                                return (
                                    <li key={key} className="list-disc mr-5 mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-black text-sm font-semibold ml-2">
                                                {value}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* Confirmation Modal */}
            {showConfirmDelete !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-100 py-8 px-6 rounded-lg shadow-lg font-bold">
                        <p>Are you sure you want to remove this education?</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 rounded-lg px-6">
                                OK
                            </button>
                            <button onClick={handleCancelDelete} className="bg-gray-300 px-4 py-2 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {feedbackMessage && (
                <p className={`text-sm mt-2 p-2 border rounded ${feedbackMessage.includes('success') ? 'text-green-800 bg-green-100 border-green-400' : 'text-red-800 bg-red-100 border-red-400'}`}>
                    {feedbackMessage}
                </p>
            )}
        </section>
    );
};

export default EducationComponent;
