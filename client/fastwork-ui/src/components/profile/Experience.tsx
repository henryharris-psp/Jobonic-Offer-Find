"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BookmarkSquareIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import httpClient from '@/client/httpClient';
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Experience {
  id?: string; // Optional for response data
  profileId?: number; // Optional for response data
  company: string;
  startDate: string;
  endDate: string;
}

const ExperienceComponent = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [formData, setFormData] = useState<Experience>({
    company: '',
    startDate: '',
    endDate: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [enabledInputs, setEnabledInputs] = useState<{ [key: string]: boolean }>({
    "user-experience": false,
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const experienceStartDateRef = useRef<HTMLInputElement>(null);
  const experienceEndDateRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchExperienceData = async () => {
    try {
      const response = await httpClient.get(`/user-experience/all?userId=${authUser?.profile.id}`);
      setExperienceList(response.data);
    } catch (error) {
      console.error('Failed to fetch experience data:', error);
    }
  };

  useEffect(() => {
    if (authUser?.profile.id) {
      fetchExperienceData();
    }
  }, [authUser?.profile.id]);

  const handleSave = async () => {
    if (!formData.company || !formData.startDate || !formData.endDate) {
      setFeedbackMessage('Please fill in all fields.');
      return;
    }

    const newExperience: Experience = {
      profileId: authUser?.profile.id,
      ...formData,
    };

    try {
      if (editIndex !== null) {
        // Update existing experience
        await httpClient.put(`/user-experience?id=${experienceList[editIndex].id}`, newExperience);
        const updatedExperienceList = [...experienceList];
        updatedExperienceList[editIndex] = newExperience;
        setExperienceList(updatedExperienceList);
        setFeedbackMessage('Experience updated successfully!');
      } else {
        await httpClient.post('/user-experience', newExperience);
        setExperienceList((prev) => [...prev, newExperience]);
        setFeedbackMessage('Experience saved successfully!');
      }

      setShowNewEntry(false);
      setFormData({ company: '', startDate: '', endDate: '' });
      setEditIndex(null);
      fetchExperienceData();
    } catch (error) {
      console.error('Error saving experience:', error);
      setFeedbackMessage('Failed to save experience.');
    }
  };

  const addMode = (type: string, e: React.MouseEvent) => {
    setEnabledInputs((prev) => ({ ...prev, [type]: !prev[type] }));
    setShowNewEntry((prev) => !prev);
  };
  const handleEdit = (index: number) => {
    setFormData(experienceList[index]);
    setShowNewEntry(true);
    setEditIndex(index);
  };

  const handleRemoveClick = (index: number) => {
    setShowConfirmDelete(index);
  };

  const handleConfirmDelete = async () => {
    if (showConfirmDelete !== null) {
      try {
        await httpClient.delete(`/user-experience?id=${experienceList[showConfirmDelete].id}`);
        setExperienceList((prev) => prev.filter((_, i) => i !== showConfirmDelete));
        setFeedbackMessage('Experience deleted successfully!');
      } catch (error) {
        console.error('Error deleting experience:', error);
        setFeedbackMessage('Failed to delete experience.');
      } finally {
        setShowConfirmDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(null);
  };

  return (
    <section className="flex flex-col w-[60%] justify-start ml-16 mt-4 pb-4">
      <div className="flex space-x-3 mb-6 justify-start items-center animate-pulse">
        <h2 className="text-2xl font-bold text-cyan-950">Experience</h2>
        <PlusCircleIcon
          className="w-6 h-6 cursor-pointer text-yellow-700"
          onClick={(e) => addMode("user-experience", e)}
        />
        <h3 className="text-xs text-gray-400 items-center select-none">Add Experience</h3>
      </div>
      {showNewEntry && (
        <div className="space-y-3 rounded-lg p-6 bg-gray-100 mt-4">
          {['company', 'startDate', 'endDate'].map((field, index) => (
            <div key={index} className="grid grid-cols-3 items-center p-2">
              <h3 className="flex flex-col font-bold">
                {field === 'startDate' ? 'Start Date' : field === 'endDate' ? 'End Date' : 'Company'}
              </h3>
              <input
                type={field.includes('Date') ? 'date' : 'text'}
                id={`experience.${field}`}
                name={field}
                value={formData[field as keyof Experience]}
                onChange={handleInputChange}
                placeholder={`Enter your ${field}`}
                className={`text-black col-span-2 ${enabledInputs["user-experience"]
                  ? "border-none bg-white"
                  : "border-none bg-transparent"} rounded-lg`}
                ref={field === 'startDate' ? experienceStartDateRef : field === 'endDate' ? experienceEndDateRef : companyRef}
                disabled={!enabledInputs["user-experience"]}
              />
            </div>
          ))}
          <div
            onClick={handleSave}
            className="flex justify-center items-center mt-2 p-2 w-28 shadow-lg bg-[#0B2147] text-white font-bold rounded-md cursor-pointer"
          >
            <BookmarkSquareIcon className="w-6 h-6 mr-2" />
            <span>Save</span>
          </div>
        </div>
      )}
      <ul className="flex justify-start flex-wrap ">
        {experienceList.map((experience, index) => (
          <li key={index} className="px-8 py-4 mt-4 mr-6 bg-gray-100 rounded-lg relative ">
            <button
              onClick={() => handleRemoveClick(index)}
              className="absolute top-2 right-2 text-white p-1  rounded-full hover:bg-white transition duration-300"
            >
              <TrashIcon className="w-4 h-4 text-red-700" />
            </button>
            <button
              onClick={() => handleEdit(index)}
              className="absolute top-2 right-10 text-white p-1  rounded-full hover:bg-[#77E3C8] transition duration-300"
            >
              <PencilSquareIcon className="w-4 h-4 text-yellow-700" />
            </button>
            <ul className="space-y-2 mr-10">
              {Object.entries(experience).map(([key, value]) => {
                // Hide the 'id' and 'profileId' fields
                if (key === 'id' || key === 'profileId') return null;

                return (
                  <li key={key} className="flex flex-col">
                    <strong className="capitalize">
                      {key.replace('startDate', 'Start Date').replace('endDate', 'End Date')}:
                    </strong>
                    <span className="text-black text-sm ml-2">{value}</span>
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
          <div className="bg-gray-100 py-8 px-6 rounded-lg shadow-lg">
            <p>Are you sure you want to remove this experience?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 px-4 py-2 rounded"
              >
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

export default ExperienceComponent;
