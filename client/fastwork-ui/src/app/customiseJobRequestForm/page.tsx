'use client';

import React, { useState, useEffect } from 'react';
import CreateServiceRequestCard from '@/components/CreateServiceRequestCard';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { baseURL } from "@/baseURL";
import { AxiosError } from 'axios';
import { getProfileId, getProfile } from '../../functions/helperFunctions';

interface CardProps {
  title: string;
  earned: string;
  description: {
    avatar: string;
    username: string;
    review: string;
  }[];
  details: string[];
}

type UserData = {
  id?: number;
  email?: string;
  username?: string;
};

type Category = {
  id: number;
  name: string;
};

const CustomiseJobRequestForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData>({});
  //const [profileId, setProfileId] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    workCategory: '',
    employmentType: '',
    detailedDescription: '',
    requirement1: '',
    requirement2: '',
    requirement3: '',
    exampleWork: '',
    deadline: '',
    budget: '',
    priceUnit: '',
    language: [] as string[],
    location: '',
  });

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch category list on component mount
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await httpClient.get(`http://localhost:8081/api/v1/category/all`);
      setCategoryList(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setFormState(prevState => ({ ...prevState, language: selectedOptions }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedCategory = categoryList.find(category => category.name === formState.workCategory);
    const profileId = await getProfileId();
    console.log(profileId);
    const serviceData = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      serviceRequestDTO: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        submissionDeadline: formState.deadline,
        workExample: formState.exampleWork,
      },
      profileId: profileId, // Use the state variable
      title: formState.title,
      employmentType: formState.employmentType,
      description: formState.detailedDescription,
      description1: formState.requirement1,
      description2: formState.requirement2,
      description3: formState.requirement3,
      languageSpoken: formState.language.join(', '),
      location: formState.location,
      categoryId: selectedCategory ? selectedCategory.id : '',
      price: parseInt(formState.budget),
      priceUnit: formState.priceUnit
    };

    console.log('Service Data:', JSON.stringify(serviceData, null, 2));

    try {
      const response = await httpClient.post(`http://localhost:8081/api/v1/service`, serviceData);
      const savedServiceId = response.data.id;
      console.log('Response Data:', response.data);
      router.push(`/myProfile`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error posting service data:', error.response?.data || error.message);
      } else {
        console.error('Error posting service data:', error);
      }
    }
  };

  const cardProps: CardProps = {
    title: formState.title,
    earned: '',
    description: [
      {
        avatar: '/group-image.jpg',
        username: user.username || '',
        review: '',
      },
    ],
    details: [
      formState.requirement1,
      formState.requirement2,
      formState.requirement3,
      formState.budget ? `Budget: $${formState.budget}` : '',
    ],
  };

  return (
      <div className="p-16 max-w-6xl mx-auto flex justify-center">
        <div className="w-2/3 pr-8">
          <h1 className="text-4xl font-bold text-center mb-8">Create Service Request</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="title">Title</label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Math Tutor"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="workCategory">Work Category</label>
              <select
                  id="workCategory"
                  name="workCategory"
                  value={formState.workCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select an option</option>
                {categoryList.map((category: Category, index: number) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="employmentType">Employment Type</label>
              <select
                  id="employmentType"
                  name="employmentType"
                  value={formState.employmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select an option</option>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div>
              For the fields below, please fill in the necessary job information e.g. job scope, skills requirement, personality fit.
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="detailedDescription">Detailed Job Description</label>
              <textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  value={formState.detailedDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Detailed description of the job"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="requirement1">Job Description 1</label>
              <input
                  type="text"
                  id="requirement1"
                  name="requirement1"
                  value={formState.requirement1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Teach Middle School students"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="requirement2">Job Description 2</label>
              <input
                  type="text"
                  id="requirement2"
                  name="requirement2"
                  value={formState.requirement2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Familiar with GCE O Levels"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="requirement3">Job Description 3</label>
              <input
                  type="text"
                  id="requirement3"
                  name="requirement3"
                  value={formState.requirement3}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Able to travel to my house"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2" htmlFor="exampleWork">Examples of Work</label>
              <input
                  type="text"
                  id="exampleWork"
                  name="exampleWork"
                  value={formState.exampleWork}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://www.netflix.com"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2" htmlFor="deadline">Submission Deadline</label>
              <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formState.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Select a date"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="budget">Budget</label>
              <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="$14"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="priceUnit">Price Unit</label>
              <select
                  id="priceUnit"
                  name="priceUnit"
                  value={formState.priceUnit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select a unit</option>
                <option value="HOUR">Hour</option>
                <option value="WEEK">Week</option>
                <option value="MONTH">Month</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="language">Language Spoken</label>
              <select multiple
                      id="language"
                      name="language"
                      onChange={handleLanguageChange}
                      defaultValue={[]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select a language</option>
                <option value="Thai">ภาษาไทย</option>
                <option value="English">English</option>
                <option value="Chinese">中文</option>
              </select>
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="location">Location</label>
              <input
                  type="text"
                  id="location"
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Online / Phra Khanong / On Nut"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-[#0B2147] hover:bg-[#D0693B] text-white font-semibold py-2 px-4 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center">
          {/* Card should update as form is filled in */}
          <CreateServiceRequestCard {...cardProps} />
          <h3 className="px-6 text-gray-500 text-justify text-xs">* how your service request card will look like</h3>
        </div>
      </div>
  );
};

export default CustomiseJobRequestForm;
