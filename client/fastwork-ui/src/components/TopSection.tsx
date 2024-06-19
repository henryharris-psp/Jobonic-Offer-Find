'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

const TopSection: React.FC = (): React.ReactNode => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Find Service');
  const [placeholder, setPlaceholder] = useState('e.g. I need a plumber');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setPlaceholder(category === 'Find Service' ? 'e.g. I need a plumber' : 'e.g. I can be a plumber');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedCategory === "Find Service") {
      router.push("/serviceList");
    } else {
      router.push("/offerServices");
    }
  };

  return (
    <section className="text-black py-16 px-4 md:px-0 flex flex-col md:flex-row items-center lg:px-16">
      <div className="max-w-9xl mx-auto text-center">
        <div className="mb-4 flex justify-center">
          <Image src="/jobonic-black.svg" alt="Jobonic" width={600} height={600} />
        </div>
        <p className="text-lg md:text-xl mb-12">Where skills meet needs</p>
        <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <div className="flex w-full">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => handleCategorySelect("Find Service")}
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-l-lg focus:z-10 dark:text-white
                  ${selectedCategory === "Find Service"
                  ? "bg-[#0B2147] text-white border-gray-300 dark:bg-gray-300"
                  : "bg-white text-[#0B2147] border-gray-300 dark:border-white"
                  }`}
              >
                Find Service
              </button>
              <button
                onClick={() => handleCategorySelect("Offer Service")}
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium border focus:z-10 dark:text-white
                  ${selectedCategory === "Offer Service"
                  ? "bg-[#0B2147] text-white border-gray-300 dark:bg-gray-300"
                  : "bg-white text-[#0B2147] border-gray-300 dark:border-white"
                  }`}
              >
                Offer Service
              </button>
            </div>

            <div className="relative flex-grow">
              <input
                type="search"
                id="search-dropdown"
                className="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-r-md"
                placeholder={placeholder}
                required
              />
              <button
                type="submit"
                className="rounded-r-md absolute top-0 right-0 px-4 py-3 text-sm font-medium h-full text-white bg-[#D0693B] border border-[#D0693B] hover:bg-[#C05E35] focus:ring-4 focus:outline-none focus:ring-[#D0693B]"
              >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TopSection;






// const handleSubmit = (event: React.FormEvent) => {
//   event.preventDefault();
//   // Perform any other actions here, like form validation or API calls
//   router.push('/serviceMatches');
// };

{/*
            <button
              id="dropdown-button"
              className="w-40 flex-shrink-0 z-10 inline-flex items-center py-4 px-6 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              {selectedCategory}
              <svg className="w-3 h-3 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                id="dropdown"
                className="absolute top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCategorySelect('Find service')}>Find service</button>
                  </li>
                  <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCategorySelect('Offer service')}>Offer service</button>
                  </li>

                </ul>
              </div>
            )}
            */}


{/*
<section className="text-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-lg md:text-xl mb-8">Search through thousands of job listings and find the perfect fit for you.</p>
          <div className="flex flex-col md:flex-row justify-center items-center">
          <Link href='/login' className='btn btn-primary text-white w-48 rounded-lg h-12 mb-4 md:mr-4 md:mb-0 flex items-center justify-center'>Get Started</Link>
          </div>
        </div>
      </section>
*/}