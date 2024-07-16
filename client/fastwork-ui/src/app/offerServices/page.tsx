'use client';

import React, { useState, useEffect, ReactNode } from 'react'; // Ensure ReactNode is imported for the return type of the component
import ServiceRequestCard from '@/components/ServiceRequestCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Papa, { ParseResult } from 'papaparse';
import axios from 'axios';
import { baseURL, token } from "@/baseURL";
import { checkProfile } from '@/functions/helperFunctions';

interface JobData {
  title: string;
  work_category: string;
  company: string;
  location: string;
  employment_type: string;
  description_1: string;
  description_2: string;
  description_3: string;
  examples_of_work: string;
  submission_deadline: string;
  budget: string;
  language: string;
  days_left: string;
}

export default function OfferServicesPage(): ReactNode { // Use ReactNode for the return type of the component
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false);
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

  const [jobDataList, setJobDataList] = useState<JobData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<JobData[]>([]);
  const [inputValue, setInputValue] = useState('');

  const categories = [
    "Development & IT",
    "Admin & Customer Support",
    "HR & Training",
    "Graphic & Design",
    "Marketing & Advertising",
    "Writing & Translation",
    "Finance & Accounting"
  ];

  useEffect(() => {
    fetch('/updated_sample_data.csv')
        .then(response => response.text())
        .then(csvData => {
          Papa.parse<JobData>(csvData, {
            header: true,
            complete: function (results: ParseResult<JobData>) {
              setJobDataList(results.data);
            }
          });
        })
        .catch(error => console.error('Error fetching CSV file:', error));
  }, []);

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleCreateServiceOffer = async (event: React.FormEvent) => {
    event.preventDefault();
    const profile = await checkProfile("9bf58ef5-9b61-4cdd-808d-3c6ceb5c16f1", token);
    if (profile) {
      router.push('/customiseService');
    } else {
      router.push('/createProfile');
    }
  };

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
      <div>
        <div className="p-16">
          <h2 className="flex flex-col justify-center items-center font-bold text-5xl text-black">Service Requests</h2>
          <form className="max-w-2xl mx-auto pt-8" onSubmit={handleSearchSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search"
                     className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="e.g. I have a service to offer"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     required />
              <button type="submit" onClick={() => setSearchQuery(inputValue)} className="text-white absolute right-2.5 bottom-2.5 bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Search
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center pt-8 text-black">
            <h2 className="text-xl font-semibold">No requests match your skills?</h2>
            <span>
            <button onClick={(e) => handleCreateServiceOffer(e)} className="text-md px-3 py-2 bg-[#0C2348] text-white rounded-lg font-medium hover:bg-[#D0693B] focus:outline-none ml-2">
              Personalise your service offer
            </button>
          </span>
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
                  <path d="M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z" />
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
                  <path fillRule="evenodd" d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z" clipRule="evenodd" />
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

          {/* Work Category Sidebar and Service Requests */}
          <div className='flex pt-8'>
            <div className="job-category overflow-y-auto w-1/5">
              <h2 className='font-semibold text-center'>Work Category</h2>
              {categories.map((category, index) => (
                  <div key={index} className="py-1 border-b border-gray-400 hover:text-blue-500 cursor-pointer text-sm">{category}</div>
              ))}
            </div>

            {searchQuery.trim() === '' ? (
                <div className="flex flex-wrap pr-0 mr-0 w-4/5">
                  {jobDataList.map((jobData, index) => (
                      <div key={index} className="w-full sm:w-1/2 md:w-1/3 pb-4 flex justify-stretch">
                        <ServiceRequestCard serviceRequest={jobData} key={index} hasProfile={true} profilePic={'/jobonic.svg'} />
                      </div>
                  ))}
                </div>
            ) : (
                <div className="flex flex-wrap pr-0 mr-0 w-4/5">
                  {searchResults.map((result, index) => (
                      <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 pb-4 flex justify-end">
                        <ServiceRequestCard serviceRequest={result} key={index} hasProfile={true} profilePic={'/jobonic.svg'} />
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

