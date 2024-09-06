"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
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
      await httpClient.post('/user-experience', newExperience);
      setExperienceList((prev) => [...prev, newExperience]);
      setFeedbackMessage('Experience saved successfully!');
      setShowNewEntry(false);
      setFormData({ company: '', startDate: '', endDate: '' });

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

  return (
    <section className="flex flex-col w-[60%] justify-start ml-16 mt-4 pb-4">
      <div className="flex space-x-4 justify-start items-center">
        <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
        <PlusCircleIcon
          className="w-6 h-6 cursor-pointer"
          onClick={(e) => addMode("user-experience", e)}
        />
        <h3 className="text-xs text-gray-400 items-center select-none">Add Experience</h3>
      </div>
      {showNewEntry && (
        <div className="space-y-3 rounded-lg p-4 bg-gray-100 mt-4">
          {['company', 'startDate', 'endDate'].map((field, index) => (
            <div key={index} className="grid grid-cols-3 items-center">
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
                  ? "border bg-white"
                  : "border-none bg-transparent"} rounded-lg`}
                ref={field === 'startDate' ? experienceStartDateRef : field === 'endDate' ? experienceEndDateRef : companyRef}
                disabled={!enabledInputs["user-experience"]}
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
      {experienceList.map((exp, index) => (
        <div key={index} className="space-y-3 rounded-lg p-4 bg-gray-100 mt-4">
          <div className="flex flex-col justify-start">
            <h3 className="font-bold mr-6">Company:</h3>
            <input
              type="text"
              value={exp.company}
              className="text-black col-span-2 border w-[60%] border-none bg-white rounded-lg"
              disabled
            />
          </div>
          <div className="flex flex-col justify-start">
            <h3 className="font-bold mr-6">Start Date:</h3>
            <input
              type="date"
              value={exp.startDate}
              className="text-black w-[60%] col-span-2 border-none bg-white rounded-lg"
              disabled
            />
          </div>
          <div className="flex flex-col justify-start">
            <h3 className="font-bold mr-6">End Date:</h3>
            <input
              type="date"
              value={exp.endDate}
              className="text-black w-[60%] col-span-2 border-none bg-white rounded-lg"
              disabled
            />
          </div>
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

export default ExperienceComponent;
