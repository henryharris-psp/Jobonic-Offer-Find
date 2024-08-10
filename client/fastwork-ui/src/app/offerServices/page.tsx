'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import ServiceRequestCard from '@/components/ServiceRequestCard'; // Importing the ServiceRequestCard component
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { checkProfile, getCategoryName } from '@/functions/helperFunctions';
import httpClient from "@/client/httpClient";

type UserData = {
  id?: number;
  email?: string;
};

interface ServiceRequestDTO {
  id: string;
  submissionDeadline: string;
  workExample: string;
}

interface CategoryDTO {
  id: string;
  name: string;
}

interface Service {
  id: string;
  serviceOfferDTO?: any;
  serviceRequestDTO?: ServiceRequestDTO;
  profileId: number;
  title: string;
  employmentType: string,
  description: string,
  description1: string,
  description2: string,
  description3: string,
  languageSpoken: string,
  location: string,
  categoryDTO: CategoryDTO,
  price: number,
  priceUnit: string
}

export default function OfferServicesPage(): ReactNode {
  const router = useRouter(); // Using Next.js router for navigation
  const [user, setUser] = useState<UserData>({});
  const [userID, setUserID] = useState<number>(0);
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

  const [jobDataList, setJobDataList] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [serviceDisplay, setServiceDisplay] = useState<Service[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // Fetch all services from the backend API
  const fetchServices = async () => {
    try {
      const response = await httpClient.post(`http://localhost:8081/api/v1/service/all`, {
        pageNumber: 1,
        pageSize: 100,
        sortBy: '',
        sortOrder: 'DESC',
        filter: {
          searchKeyword: ''
        }
      });
      // Filter out services that do not have a serviceRequestDTO
      const filteredServices = response.data.content.filter((service: Service) => service.serviceRequestDTO !== null);
      setJobDataList(filteredServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Fetch services by their IDs from the search results
  const fetchServicesById = async () => {
    const temp: Service[] = []; // Temporary array to store fetched services
    const fetchPromises = searchResults.map(async (service) => {
      try {
        const response = await httpClient.get(`http://localhost:8081/api/v1/service/get?serviceId=${service.id}`);
        const servicesResponse = response.data;
        console.log(servicesResponse);
        temp.push(servicesResponse);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    });
    await Promise.all(fetchPromises);
    setServiceDisplay(temp);
  };

  // Fetch all categories from the backend API
  const fetchCategory = async () => {
    const response = await httpClient.get(`http://localhost:8081/api/v1/category/all`);
    setCategoryList(response.data);
  };

  // Fetch user data and user ID on component mount
  useEffect(() => {
    fetchServices();
    fetchCategory();
    fetchUserIdAndData();
  }, []);

  // Fetch services by ID whenever search results change
  useEffect(() => {
    fetchServicesById();
    console.log(searchResults);
  }, [searchResults]);

  // Handle the search form submission
  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Fetch user ID and data from the backend API
  const fetchUserIdAndData = async () => {
    try {
      const response = await httpClient.get(`https://api-auths.laconic.co.th/v1/user/init-data`);
      const userData = response.data;
      const userId = userData.id;

      setUser({
        id: userId,
        email: userData.email
      });
      setUserID(userId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle the creation of a new service offer
  const handleCreateServiceOffer = async (event: React.FormEvent) => {
    event.preventDefault();
    const profile = await checkProfile(userID);
    if (profile) {
      router.push('/customiseService');
    } else {
      router.push('/createProfile');
    }
  };

  // Toggle sort dropdown visibility
  const handleSortClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  // Handle selection of a sort option
  const handleSortOptionClick = (option: string) => {
    setSelectedSortOption(option);
    console.log(`Selected sorting option: ${option}`);
    setIsSortDropdownOpen(false);
  };

  // Toggle filter dropdown visibility
  const handleFilterClick = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  // Apply filters and update appliedFilters state
  const handleFilterApply = () => {
    setAppliedFilters({
      minPrice: minPrice,
      maxPrice: maxPrice,
      deadline: deadline
    });
    console.log(`Filter applied with Min Price: ${minPrice}, Max Price: ${maxPrice}, Deadline: ${deadline}`);
    setIsFilterDropdownOpen(false);
  };

  // Clear all filters and reset states
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

  // Check if any filters are applied
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
                      {['Best Match', 'Popularity', 'Price: Lowest to Highest', 'Price: Highest to Lowest', 'Rating'].map(option => (
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
              {categoryList.map((category, index) => (
                  <div key={index} className="py-1 border-b border-gray-400 hover:text-blue-500 cursor-pointer text-sm">{category.name}</div>
              ))}
            </div>

            {/* Display services based on search query */}
            {searchQuery.trim() === '' ? (
                <div className="flex flex-wrap pr-0 mr-0 w-4/5">
                  {jobDataList.map((jobData, index) => (
                      <div key={index} className="w-full sm:w-1/2 md:w-1/3 pb-4 flex justify-stretch">
                        <ServiceRequestCard serviceRequest={{
                          title: jobData.title, // Correctly pass the title from the service object
                          work_category: jobData.categoryDTO.name,
                          //company: map profileId to username or firstName + lastName in User table
                          company: "Jeremy",
                          location: jobData.location ?? 'a',
                          employment_type: jobData.employmentType ?? 'a',
                          description_1: jobData.description1 ?? '',
                          description_2: jobData.description2 ?? '',
                          description_3: jobData.description3 ?? '',
                          examples_of_work: jobData.serviceRequestDTO?.workExample ?? 'a',
                          submission_deadline: jobData.serviceRequestDTO?.submissionDeadline ?? '11/08',
                          budget: jobData.price.toString() ?? '0',
                          //add priceUnit here and in ServiceRequestCard component
                          language: jobData.languageSpoken ?? 'English',
                          days_left: '', // This would need calculation based on the current date and submission_deadline
                        }} hasProfile={true} profilePic={'/jobonic.svg'} />
                      </div>
                  ))}
                </div>
            ) : (
                <div className="flex flex-wrap pr-0 mr-0 w-4/5">
                  {serviceDisplay.map((result, index) => (
                      <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 pb-4 flex justify-end">
                        <ServiceRequestCard serviceRequest={{
                          title: result.title, // Correctly pass the title from the service object
                          work_category: result.categoryDTO.name,
                          //company: map profileId to username or firstName + lastName in User table
                          company: "Jeremy",
                          location: result.location ?? '',
                          employment_type: result.employmentType ?? '',
                          description_1: result.description1 ?? '',
                          description_2: result.description2 ?? '',
                          description_3: result.description3 ?? '',
                          examples_of_work: result.serviceRequestDTO?.workExample ?? '',
                          submission_deadline: result.serviceRequestDTO?.submissionDeadline ?? '11/08',
                          //budget: '0',
                          budget: result.price.toString() ?? '0',
                          //add priceUnit here and in ServiceRequestCard component
                          language: result.languageSpoken ?? '',
                          days_left: '', // This would need calculation based on the current date and submission_deadline
                        }} hasProfile={true} profilePic={'/jobonic.svg'} />
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
