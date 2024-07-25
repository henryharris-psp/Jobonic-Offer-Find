'use client';

import React, { useState, useEffect } from 'react';
import CreateServiceRequestCard from '@/components/CreateServiceRequestCard';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { baseURL, SERVER_AUTH } from "@/baseURL";
import { AxiosError } from 'axios';

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
};

type Category = {
  id: number;
  name: string;
};

const CustomiseJobRequestForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData>({});
  const [formState, setFormState] = useState({
    title: '',
    workCategory: '',
    employmentType: '',
    requirement1: '',
    requirement2: '',
    requirement3: '',
    exampleWork: '',
    deadline: '',
    budget: '',
    language: [] as string[],
    location: '',
  });

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchCategory = async () => {
    const response = await httpClient.get(`${baseURL}/api/v1/category/all`);
    setCategoryList(response.data);
  };

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      try {
        const response = await httpClient.get(`${SERVER_AUTH}/v1/user/init-data`);
        const userData = response.data;
        const userId = userData.id;

        setUser({
          id: userId,
          email: userData.email
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserIdAndData();
  }, []);

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

    if (!user.id) {
      console.error('User ID is not available.');
      return;
    }

    const serviceData = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      serviceRequestDTO: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //workCategory: formState.workCategory,
        workCategory: "DEVELOPMENT",
        employmentType: formState.employmentType,
        description1: formState.requirement1,
        description2: formState.requirement2,
        description3: formState.requirement3,
        submissionDeadline: formState.deadline,
        budget: parseInt(formState.budget),
        workExample: formState.exampleWork,
        languageSpoken: formState.language.join(', '),
        location: formState.location
      },
      profileId: user.id,
      title: formState.title
    };

    console.log('Service Data:', JSON.stringify(serviceData, null, 2));

    try {
      const response = await httpClient.post(`http://localhost:8081/api/v1/service`, serviceData);
      const savedServiceId = response.data.id;
      console.log('Response Data:', response.data);
      console.log(savedServiceId);
      router.push(`/myProfile`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error posting service data:', error.response?.data || error.message);
      } else {
        console.error('Error posting service data:', error);
      }
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const cardProps: CardProps = {
    title: formState.title,
    earned: '',
    description: [
      {
        avatar: '/group-image.jpg',
        username: 'taytayxy',
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
            <div>For the fields below, please fill in the necessary job information e.g. job scope, skills requirement, personality fit.</div>
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
                  placeholder="$14 / hour"
              />
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
              <button type="submit" className="bg-[#0B2147] hover:bg-[#D0693B] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#D0693B]">
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






