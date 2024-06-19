import React from "react";
import "flowbite";
import "flowbite/dist/flowbite.css";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row md:w-full">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-l-lg"
          src="/work-collaboration.svg"
          alt="Laconic Technology Co,. Ltd"
        />
        <div className="mr-16 flex flex-col justify-between p-4 leading-normal w-full">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            What do we do?
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            We are a company established in 2024 and hope to make services easily accessible for businesses and job offers easy to find for service providers.
            Our payment system gives the option to pay in cryptocurrency so no transaction fees are needed. This is beneficial for both the employer and service provider!
          </p>
        </div>
      </div>

      <section className="dark:bg-gray-900 mx-16">

        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We make accessing and offering services easy.</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">What are you waiting for? If you are an employer, click on find services. If you are a service provider, click on offer services.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="/findServices" className="py-3 px-5 sm:ms-4 text-sm font-medium text-white bg-[#0B2147] rounded-lg hover:bg-[#D0693B] focus:z-10 focus:ring-4 focus:ring-[#D0693B] dark:focus:ring-[#D0693B]">
              Find services
            </a>  
            <a href="/offerServices" className="py-3 px-5 sm:ms-4 text-sm font-medium text-white bg-[#0B2147] rounded-lg hover:bg-[#D0693B] focus:z-10 focus:ring-4 focus:ring-[#D0693B] dark:focus:ring-[#D0693B]">
              Offer services
            </a>  
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;




