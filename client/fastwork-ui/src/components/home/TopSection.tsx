"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const TopSection: React.FC = (): React.ReactNode => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("Find Service");
    const [placeholder, setPlaceholder] = useState("e.g. I need a plumber");

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setPlaceholder(
            category === "Find Service"
                ? "e.g. I need a plumber"
                : "e.g. I can be a plumber"
        );
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
        <section className="flex flex-col items-center justify-center py-14 px-10 text-black">
            <Image
                src="/jobonic-black.svg"
                alt="Jobonic"
                width={600}
                height={600}
            />

            <p className="mt-4 text-lg md:text-xl mb-12">Where skills meet needs</p>

            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col rounded-l-lg overflow-hidden sm:flex-row space-y-1 sm:space-y-0">
                <div className="flex-1 flex flex-row min-h-14">
                    <div className="flex-1">
                        <button 
                            className={`p-3 w-full h-full bg-[#0B2147] font-medium text-sm border border-gray-300 rounded-l-lg
                                ${ selectedCategory === "Find Service" ? 'bg-[#0B2147] text-white' : 'bg-white text-[#0B2147]'}
                            `}
                            onClick={() => handleCategorySelect("Find Service")}
                        >
                            Find Service
                        </button>
                    </div>
                    <div className="flex-1">
                        <button 
                            className={`p-3 w-full h-full bg-[#0B2147] font-medium text-sm border border-gray-300 rounded-r-lg sm:rounded-none
                                ${ selectedCategory === "Offer Service" ? 'bg-[#0B2147] text-white' : 'bg-white text-[#0B2147]'}
                            `}
                            onClick={() => handleCategorySelect("Offer Service")}
                        >
                            Offer Service
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-row overflow-hidden min-h-14">
                    <div className="flex-1">
                        <input 
                            className="w-full h-full bg-white border border-gray-300 placeholder:text-sm rounded-l-lg sm:rounded-none"
                            type="text" 
                            placeholder={placeholder}
                        />
                    </div>
                    <div>
                        <button className="px-4 w-full h-full border bg-[#D0693B] border-[#D0693B] text-white rounded-r-lg">
                            <MagnifyingGlassIcon className="size-6 font-bold text-white"/>
                        </button>
                    </div>
                </div>
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

{
    /*
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
            */
}

{
    /*
<section className="text-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-lg md:text-xl mb-8">Search through thousands of job listings and find the perfect fit for you.</p>
          <div className="flex flex-col md:flex-row justify-center items-center">
          <Link href='/login' className='btn btn-primary text-white w-48 rounded-lg h-12 mb-4 md:mr-4 md:mb-0 flex items-center justify-center'>Get Started</Link>
          </div>
        </div>
      </section>
*/
}
