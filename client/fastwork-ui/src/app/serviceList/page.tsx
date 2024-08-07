'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ServiceMatchCard from '@/components/ServiceMatchCard'; // Ensure this path is correct
import { Service } from '@/types';
import httpClient from '@/client/httpClient';
import { baseURL } from '@/baseURL';

const ServiceMatches = (): React.ReactElement => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const router = useRouter();
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchCategory = async () => {
    const response = await httpClient.get(`${baseURL}/api/v1/category/all`);
    setCategoryList(response.data);
  };

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
      const filteredServices = response.data.content.filter((service: any) => service.serviceRequestDTO !== null);

      // Map filtered services to match the expected structure for ServiceMatchCard
      const mappedServices: Service[] = filteredServices.map((service: any) => ({
        id: service.id,
        name: service.title,
        image: '/profile-pic.jpg', // Placeholder image
        rating: 0, // Default rating
        reviews: 20, // Assuming a static number of reviews for now
        price: `$${service.serviceOfferDTO?.price}/hr` || 'N/A',
        description: service.serviceRequestDTO.description1,
        reviewsDetail: [
          {
            reviewer: 'John',
            comment: 'Great service!',
            rating: 5,
          },
          {
            reviewer: 'Timmy',
            comment: 'Very professional.',
            rating: 4,
          },
        ],
        numSold: 10, // Assuming a static number sold for now
        bullet1: service.serviceOfferDTO?.descriptionI || '',
        bullet2: service.serviceOfferDTO?.descriptionII || '',
        bullet3: service.serviceOfferDTO?.descriptionIII || '',
      }));
      setServices(filteredServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation
    router.push('/chat'); // Navigate to the ChatMessage component
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

  useEffect(() => {
    fetchCategory();
    fetchServices();
  }, []);

  return (
      <div className="min-h-screen flex flex-col">
        <div className="py-16 px-16">
          <section className="flex-grow">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-black">Services List</h1>
              <button onClick={() => router.push("/customiseJobRequestForm")} className="mt-8 text-white py-2 px-4 rounded-lg inline-block hover:bg-[#D0693B] bg-[#0B2147]">
                Not what you are looking for?
              </button>

              {/* Filter and Sort buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <div className="relative">
                  <button
                      className="flex items-center justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
                      onClick={handleFilterClick}
                  >
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
                      <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
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
                              className="w-full bg-[#0C2348] text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                              onClick={handleFilterApply}
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
                      onClick={handleSortClick}
                  >
                  <span>
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z" clipRule="evenodd"/>
                    </svg>
                  </span>Sort
                  </button>
                  {isSortDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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

              <div className="flex pt-8">
                <div className="job-category overflow-y-auto w-1/5 pr-4">
                  <h2 className='font-semibold text-center'>Work Category</h2>
                  {categoryList.map((category, index) => (
                      <div key={index} className="py-2 border-b border-gray-400 hover:text-blue-500 cursor-pointer">{category.name}</div>
                  ))}
                </div>
                <div className="flex flex-wrap w-4/5">
                  {services.map((service, index) => (
                      <div key={index} className="pb-8">
                        <ServiceMatchCard
                            service = {service}  // Pass the service object
                            user = {service.profileDTO} // Pass the user object
                            onClick = {handleServiceClick}
                            onChatClick = {handleChatClick}
                        />
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {isModalOpen && selectedService && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-full overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{selectedService.title}</h2>
                    <button className="text-gray-600 hover:text-gray-900" onClick={closeModal}>✖</button>
                  </div>
                  <div className="flex items-center mb-4">
                    <Image src={selectedService.profileDTO.image} alt={selectedService.title} width={50} height={50} className="rounded-full" />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{selectedService.title}</h3>
                      <p>{selectedService.description}</p>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {selectedService.reviewsDetail?.map((review, index) => (
                        <div key={index} className="flex items-start mb-4">
                          <Image src="/group-image.jpg" alt={review.reviewer} width={40} height={40} className="rounded-full" /> {/* Replace with actual reviewer image */}
                          <div className="ml-4">
                            <h4 className="text-md font-bold">{review.reviewer}</h4>
                            <p>{review.comment}</p>
                            <div className="flex items-center">
                              <span className="text-yellow-500">{Array(review.rating).fill('★').join('')}</span>
                              {review.rating < 5 && <span className="text-gray-300">{Array(5 - review.rating).fill('★').join('')}</span>}
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default ServiceMatches;
