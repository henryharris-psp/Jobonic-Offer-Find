'use client';

import React, { useState, useEffect } from 'react';
import CreateServiceRequestCard from '@/components/CreateServiceRequestCard';
import { useRouter } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { AxiosError } from 'axios';
import { getProfileId, getProfile } from '../../functions/helperFunctions';
import { CardProps, ServiceRequestDTO, Service } from '@/types/general';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [formStateLanguage, setFormStateLanguage] = useState({ language: [] });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { value: "Thai", display: "ภาษาไทย" },
    { value: "English", display: "English" },
    { value: "Chinese", display: "中文" },
    { value: "Spanish", display: "Español" },
    { value: "French", display: "Français" },
    { value: "German", display: "Deutsch" },
    { value: "Japanese", display: "日本語" },
    { value: "Korean", display: "한국어" },
    { value: "Russian", display: "Русский" },
    { value: "Arabic", display: "العربية" },
  ];

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch category list on component mount
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await httpClient.get('/category/all');
      setCategoryList(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setFormState(prevState => ({ ...prevState, language: selectedOptions }));
  };
  const handleLanguageCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setFormState(prevState => {
      // Update the selected languages array
      const updatedLanguages = checked
        ? [...prevState.language, value] // Add the selected language
        : prevState.language.filter(lang => lang !== value); // Remove the deselected language

      // Clear the error if there is at least one selected language
      if (updatedLanguages.length > 0) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          language: '', // Clear the error message
        }));
      }

      return {
        ...prevState,
        language: updatedLanguages,
      };
    });
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset error messages before submission
    setFormErrors({});

    const budgetValue = parseFloat(formState.budget);
    let errors: Record<string, string> = {};
    // Validation checks
    if (!formState.title) errors.title = 'Title is required...';
    if (!formState.workCategory) errors.workCategory = 'Work Category is required...';
    if (!formState.employmentType) errors.employmentType = 'Employment Type is required...';
    if (!formState.detailedDescription) errors.detailedDescription = 'Detailed Job Description is required...';
    if (!formState.requirement1) errors.requirement1 = 'Job Description 1 is required...';
    if (!formState.requirement2) errors.requirement2 = 'Job Description 2 is required...';
    if (!formState.requirement3) errors.requirement3 = 'Job Description 3 is required...';
    if (isNaN(budgetValue) || budgetValue < 0) errors.budget = 'Please enter a valid budget...';
    if (!formState.priceUnit) errors.priceUnit = 'Price Unit is required...';
    if (formState.language.length === 0) errors.language = 'At least one language must be selected...';
    if (!formState.location) errors.location = 'Location is required...';
    if (!formState.deadline) errors.deadline = 'Submission Deadline is required...';
    if (!formState.exampleWork) errors.exampleWork = 'Examples of Work are required...';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Set validation errors
      return; // Prevent submission if there are validation errors
    }

    const selectedCategory = categoryList.find(category => category.name === formState.workCategory);
    const profileId = await getProfileId();

    const serviceData = {
      serviceRequestDTO: {
        submissionDeadline: formState.deadline,
        workExample: formState.exampleWork,
      },
      profileId: profileId,
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
      priceUnit: formState.priceUnit,
      serviceType: "request"
    };

    console.log('Service Data:', JSON.stringify(serviceData, null, 2));

    try {
      const response = await httpClient.post('service', serviceData);
      const savedService = response.data;

      console.log('Response Data:', savedService);

      const serviceForCSV = {
        id: savedService.id,
        title: savedService.title,
        description1: savedService.description1,
        description2: savedService.description2,
        description3: savedService.description3,
        categoryName: savedService.categoryDTO.name,
      };

      await saveDataToCsv(serviceForCSV);
      router.push(`/myDashboard`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error posting service data:', error.response?.data || error.message);
        setErrorMessage('Failed to submit service data. Please try again.'); // Display user-friendly error
      } else {
        console.error('Error posting service data:', error);
        setErrorMessage('An unexpected error occurred. Please try again.'); // Display user-friendly error
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    // Clear error messages for the specific field
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '' // Clear the error for the field being edited
      }));
    }
  };

  const saveDataToCsv = async (data: any) => {
    try {
      const response = await fetch('/api/writeCsv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Failed to save data', error);
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
    <div className=" flex flex-col lg:flex-row justify-between sm:flex-wrap md:flex-wrap">
      <div className="flex flex-col justify-around items-center w-full lg:w-[80%] my-6 lg:mt-12 md:mt-12">
        <h1 className="text-4xl font-bold text-cyan-900 text-center">Create Service Request</h1>
        <form className='w-full rounded-md' onSubmit={handleSubmit}>
          <div className=" p-8 xs:p-8 xs:p-8 sm:p-16 lg:px-36 lg:py-10 flex flex-col gap-6">
            <div className="flex md:flex-row lg:flex-row flex-col gap-4">
              <div className="flex flex-col w-full lg:w-1/2 mb-4">
                <label htmlFor="title" className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold bg-gray-50 text-sm rounded-lg"
                  placeholder="Service Title"
                />
                {formErrors.title && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.title}</p>}
              </div>
              <div className="flex flex-col w-full lg:w-1/2 mb-4">
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="workCategory">Work Category</label>
                <select
                  id="workCategory"
                  name="workCategory"
                  value={formState.workCategory}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold bg-gray-50 text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-100">
                  <option value="" disabled>Select an option</option>
                  {categoryList.map((category: Category, index: number) => (
                    <option key={index} value={category.name}>{category.name}</option>
                  ))}
                </select>
                {formErrors.workCategory && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.workCategory}</p>}
              </div>
            </div>
            <div className="flex md:flex-row lg:flex-row flex-col gap-4">
              <div className="flex flex-col w-full lg:w-1/2 mb-4">
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="employmentType">Employment Type</label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formState.employmentType}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold bg-gray-50 text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-100">
                  <option value="" disabled>Select an option</option>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                </select>
                {formErrors.employmentType && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.employmentType}</p>}
              </div>
              <div className='flex flex-col w-full lg:w-1/2 mb-4'>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="detailedDescription">Detailed Job Description</label>
                <textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  value={formState.detailedDescription}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold bg-gray-50 text-sm rounded-lg"
                  placeholder="Detailed description of the job"
                />
                {formErrors.detailedDescription && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.detailedDescription}</p>}
              </div>
            </div>
            <div className="flex md:flex-row lg:flex-row flex-col gap-4">
              <div className='flex flex-col w-full lg:w-1/2 mb-4'>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="requirement1">Job Description 1</label>
                <input
                  type="text"
                  id="requirement1"
                  name="requirement1"
                  value={formState.requirement1}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold rounded-lg text-sm bg-gray-50"
                  placeholder="Teach Middle School students"
                />
                {formErrors.requirement1 && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.requirement1}</p>}
              </div>
              <div className='flex flex-col w-full lg:w-1/2 mb-4'>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="requirement2">Job Description 2</label>
                <input
                  type="text"
                  id="requirement2"
                  name="requirement2"
                  value={formState.requirement2}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold rounded-lg text-sm bg-gray-50"
                  placeholder="Familiar with GCE O Levels"
                />
                {formErrors.requirement2 && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.requirement2}</p>}
              </div>
            </div>
            <div className="flex md:flex-row lg:flex-row flex-col gap-4">
              <div className='flex flex-col w-full lg:w-1/2 mb-4'>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="requirement3">Job Description 3</label>
                <input
                  type="text"
                  id="requirement3"
                  name="requirement3"
                  value={formState.requirement3}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold rounded-lg text-sm bg-gray-50"
                  placeholder="Able to travel to my house"
                />
                {formErrors.requirement3 && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.requirement3}</p>}
              </div>
              <div className='flex flex-col w-full lg:w-1/2 mb-4'>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="exampleWork">Examples of Work</label>
                <input
                  type="text"
                  id="exampleWork"
                  name="exampleWork"
                  value={formState.exampleWork}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 font-semibold rounded-lg text-sm bg-gray-50"
                  placeholder="https://www.netflix.com"
                />
                {formErrors.exampleWork && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.exampleWork}</p>}
              </div>
            </div>
            <div className="flex md:flex-row lg:flex-row flex-col gap-4">
              <div className='flex flex-col w-full lg:w-1/2 mb-4 '>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="deadline">Submission Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formState.deadline}
                  onChange={handleChange}
                  className="w-full border p-4 border-gray-300 font-semibold rounded-lg text-sm bg-gray-50"
                  placeholder="Select a date"
                />
                {formErrors.deadline && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.deadline}</p>}
              </div>
              <div className='flex flex-row w-full lg:w-1/2 mb-4'>
                <div className='mb-4 w-[60%] mr-2'>
                  <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="budget">Budget</label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formState.budget}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 font-semibold text-sm rounded-lg bg-gray-50"
                    placeholder="$14"
                  />
                  {formErrors.budget && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.budget}</p>}
                </div>
                <div className='mb-4 w-[38%]'>
                  <label className="block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="priceUnit">Price Unit</label>
                  <select
                    id="priceUnit"
                    name="priceUnit"
                    value={formState.priceUnit}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 font-semibold rounded-lg text-sm bg-gray-50 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-100">
                    <option value="" disabled>Select a unit</option>
                    <option value="HOUR">Hour</option>
                    <option value="WEEK">Week</option>
                    <option value="MONTH">Month</option>
                    <option value="PROJECT">Project</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex md:flex-row lg:flex-row flex-col gap-4">
              <div className="flex flex-col w-full lg:w-1/2 mb-4">
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="language">
                  Language Spoken
                </label>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-between items-center p-4 w-full text-sm font-medium text-center bg-gray-100 text-black rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-100"
                    type="button"
                  >
                    Select Languages
                    <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="z-10 absolute w-full bg-gray-100 rounded-lg shadow mt-2 dark:bg-gray-700 max-h-42 overflow-y-auto">
                      <ul className="h-32 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                        {languages.map((language, index) => (
                          <li key={index}>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                id={`checkbox-item-${index}`}
                                type="checkbox"
                                value={language.value}
                                onChange={handleLanguageCheckboxChange}
                                checked={formState.language.includes(language.value)} // Check if language is selected
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                              />
                              <label htmlFor={`checkbox-item-${index}`} className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {language.display}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Display selected languages */}
                <div className="mt-2 text-sm text-gray-700 font-semibold ml-2">
                  Selected Languages: {formState.language.join(', ') || 'None'}
                </div>
                {formErrors.language && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.language}</p>}
              </div>
              <div className='flex flex-col w-full lg:w-1/2 mb-4'>
                <label className="required block font-semibold mb-2 ml-2 text-sm sm:text-sm md:text-md lg:text-lg" htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 text-sm rounded-lg font-semibold bg-gray-50"
                  placeholder="Online / Phra Khanong / On Nut"
                />
                {formErrors.location && <p className="text-red-500 text-sm font-semibold mt-1">{formErrors.location}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-6 text-center items-center">
            <button type="submit" className="bg-[#0B2147] hover:bg-[#D0693B] text-white font-semibold py-3 px-12 text-sm rounded-2xl">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="lg:fixed lg:-top-16 lg:-end-16 w-full lg:w-[30%] px-4 py-8 flex flex-col items-center lg:h-screen sm:h-auto justify-center">
        <CreateServiceRequestCard {...cardProps} />
        <h3 className="px-6 text-gray-500 text-justify text-xs">* how your service request card will look like</h3>
      </div>

    </div>
  );
};

export default CustomiseJobRequestForm;
