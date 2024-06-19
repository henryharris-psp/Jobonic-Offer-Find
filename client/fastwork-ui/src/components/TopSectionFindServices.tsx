'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const TopSectionFindServices = (): React.ReactNode => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Perform any other actions here, like form validation or API calls
        router.push('/serviceList');
    }

    return (
      <section className="text-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">What would you like to do?</h1>
            <p className="text-lg md:text-xl mb-8 text-black">Don't miss out on the great trade</p>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="e.g. I want to find a service" required />
                    {/*Supposed to submit search details to AI and bring to a page which lists recommended jobs*/}
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-[#D0693B] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#0B2147] dark:hover:bg-[#D0693B] dark:focus:ring-[#D0693B]">
                        Let's collab!
                    </button>
                </div>
            </form>
        </div>
      </section>
    )
}

export default TopSectionFindServices;




// was originally in Mandeep's code. It led to the log in page
/*
<div className="flex flex-col md:flex-row justify-center items-center">
          <Link href='/login' className='btn btn-primary text-white w-48 rounded-lg h-12 mb-4 md:mr-4 md:mb-0 flex items-center justify-center'>Get Started</Link>
</div>
*/