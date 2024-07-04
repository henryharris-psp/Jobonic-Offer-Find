'use client';

import React, { useState } from 'react';
import ServiceRequestCard from '@/components/ServiceRequestCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OfferServicesPage(): React.ReactNode {
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(true);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Best Match');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [deadline, setDeadline] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    deadline: ''
  });

  const categories = [
    "Development and IT",
    "AI Services",
    "HR and Training",
    "Graphic and Design",
    "Marketing and Advertising",
    "Write and Translate"
  ];

  const jobDataList = [
    {
      title: 'Software Engineer',
      category: 'Programming and Tech',
      company: 'ABC Technologies',
      location: 'New York',
      type: 'Freelance',
      bullet1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bullet2: 'Minimum 3 years of experience in software development.',
      bullet3: 'Proficiency in Python, R, and machine learning algorithms.'
    },
    {
      title: 'Data Scientist',
      category: 'Programming and Tech',
      company: 'XYZ Brothers Ultimate Corporation',
      location: 'San Francisco',
      type: 'Part-Time',
      bullet1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bullet2: 'Minimum 3 years of experience in software development.',
      bullet3: 'Proficiency in Python, R, and machine learning algorithms.'
    },
    {
      title: 'AI Scientist',
      category: 'Programming and Tech',
      company: 'ABC Brothers Corporation',
      location: 'Kathmandu',
      type: 'Contract',
      bullet1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bullet2: 'Minimum 3 years of experience in software development.',
      bullet3: 'Proficiency in Python, R, and machine learning algorithms.'
    },
    {
      title: 'Content Writer',
      category: 'Marketing and Advertising',
      company: 'KGF Publishing',
      location: 'Pokhara',
      type: 'Freelance',
      bullet1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bullet2: 'Minimum 3 years of experience in software development.',
      bullet3: 'Proficiency in Python, R, and machine learning algorithms.'
    },
  ];

  const handleSortClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortOptionClick = (option: string) => {
    setSelectedSortOption(option);
    console.log(`Selected sorting option: ${option}`);
    setIsSortDropdownOpen(false);
  };

  const handleFilterClick = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleFilterApply = () => {
    setAppliedFilters({
      minPrice: minPrice,
      maxPrice: maxPrice,
      deadline: deadline
    });
    console.log(`Filter applied with Min Price: ${minPrice}, Max Price: ${maxPrice}, Deadline: ${deadline}`);
    setIsFilterDropdownOpen(false);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setDeadline('');
    setAppliedFilters({
      minPrice: '',
      maxPrice: '',
      deadline: ''
    });
    console.log('Filters cleared');
    setIsFilterDropdownOpen(false);
  };

  const areFiltersApplied = appliedFilters.minPrice !== '' || appliedFilters.maxPrice !== '' || appliedFilters.deadline !== '';

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-7xl px-8">
        <h2 className="flex flex-col justify-center items-center font-bold text-5xl text-black pt-16">Service Requests</h2>
        <form className="max-w-2xl mx-auto pt-8">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" 
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="e.g. I have a service to offer" required />
            <button type="submit" onClick={() => router.push("/offerServices")} className="text-white absolute right-2.5 bottom-2.5 bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Search
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center pt-8 text-black">
          <h2 className="text-xl font-semibold">
            No matches for your skills?
            <span>
              <Link href="/createProfile" passHref>
                <button className="px-2 py-1 bg-[#0C2348] text-white rounded-lg font-semibold hover:bg-[#D0693B] focus:outline-none ml-2">
                  Create Profile
                </button>
              </Link>
            </span>
          </h2>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <div className="relative">
            <button
              className="flex items-center justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
              onMouseEnter={() => setIsFilterDropdownOpen(true)}
              onMouseLeave={() => setIsFilterDropdownOpen(false)}
              style={{ borderColor: 'transparent' }}>
              <span>
                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z"/>
                </svg>
              </span>Filter
              {areFiltersApplied && (
                <svg className="w-4 h-4 text-[#0C2348] ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute right-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4"
                onMouseEnter={() => setIsFilterDropdownOpen(true)}
                onMouseLeave={() => setIsFilterDropdownOpen(false)}>
                <h3 className="font-semibold mb-2">Filter by:</h3>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Min Price/hr</label>
                  {appliedFilters.minPrice && <span className="text-[#0C2348]">✔</span>}
                </div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) >= 0 ? e.target.value : '')}
                />
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Max Price/hr</label>
                  {appliedFilters.maxPrice && <span className="text-[#0C2348]">✔</span>}
                </div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) >= 0 ? e.target.value : '')}
                />
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Latest Deadline</label>
                  {appliedFilters.deadline && <span className="text-[#0C2348]">✔</span>}
                </div>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <div className="flex space-x-2 mt-4">
                  <button
                    className="w-full bg-[#0B2147] text-white py-2 rounded-lg hover:bg-[#D0693B] focus:outline-none"
                    onClick={handleFilterApply}
                    style={{ borderColor: 'transparent' }}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
              onMouseEnter={() => setIsSortDropdownOpen(true)}
              onMouseLeave={() => setIsSortDropdownOpen(false)}
              style={{ borderColor: 'transparent' }}>
              <span>
                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z" clipRule="evenodd"/>
                </svg>
              </span>Sort
            </button>
            {isSortDropdownOpen && (
              <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                onMouseEnter={() => setIsSortDropdownOpen(true)}
                onMouseLeave={() => setIsSortDropdownOpen(false)}>
                <ul className="py-1 text-sm text-gray-700">
                  {['Best Match', 'Popularity', 'Price: Lowest to Highest', 'Price: Highest to Lowest'].map(option => (
                    <li key={option} className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedSortOption === option ? 'font-bold' : ''}`} onClick={() => handleSortOptionClick(option)}>
                      {option}
                      {selectedSortOption === option && (
                        <svg className="w-4 h-4 text-[#0C2348]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-start pt-8 w-full">
          <div className="w-full max-w-xs job-category overflow-y-auto">
            <h2 className="font-semibold text-center">Work Category</h2>
            {categories.map((category, index) => (
              <div key={index} className="py-2 border-b border-gray-400 hover:text-blue-500 cursor-pointer">{category}</div>
            ))}
          </div>
          <div className="w-full max-w-3xl">
            {jobDataList.map((jobData, index) => (
              <div key={index} className="w-full pb-4 flex justify-center">
                <ServiceRequestCard serviceRequest={jobData} hasProfile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

