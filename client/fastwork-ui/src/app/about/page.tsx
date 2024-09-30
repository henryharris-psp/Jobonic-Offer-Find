import React from "react";
import "flowbite";
import "flowbite/dist/flowbite.css";

const About = () => {
  return (
    <div className="p-16">
      <div className="flex flex-col items-center md:flex-row md:w-full mb-16">
        <div className="flex flex-col justify-between leading-normal w-full">
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Who are we?
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            As a proud subsidiary of our parent company, Laconic, we carry forward the legacy of making professional interactions straightforward and smooth. “Laconic” refers to a concise expression. Here at Jobonic, we embody the simplicity in matching collaborations between skills and needs.
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            In today&apos;s world, shopping for products has been so convenient, with all ecommerce platforms at your fingertips. As for services? It&apos;s not as simple. To hire a freelancer, one has to go through long texts in contracts, terms and agreements. We want to make this process laconic -- simple and seamless.
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            Shopping for services ought to be as convenient as shopping for products! Same goes for offering services!
          </p>
        </div>
      </div>

      <section className="dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Offering services?</h3>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              <strong>A</strong>sk about their service needs
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>Understand what your potential employer is looking for</li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              <strong>B</strong>uild your proposal
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>Select your relevant skills and experience that meet their needs</li>
              <li>Highlight relevant past work and provide a clear plan for how you will complete the project</li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              <strong>C</strong>ollaborate effectively
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>Maintain regular communication with your employer</li>
              <li>Provide updates, ask for feedback, make necessary edits</li>
              <li>Upon completion, Jobonic will release payment to you</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Looking for services?</h3>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              <strong>A</strong>sk about their experience and skills
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>Understand their background, past projects, and skills</li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              <strong>B</strong>uy the service
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>Make payment for their services and Jobonic will hold onto the payment until the service provider completes the work</li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              <strong>C</strong>ollaborate effectively
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>When you approve of the work, Jobonic will release payment to the freelancer</li>
              <li>If you do not respond in 48 hours, Jobonic will automatically release payment to the freelancer</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900 mx-16">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Simple, isn&apos;t it?
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Register for an account today and start shopping for services. 
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="/findServices"
              className="py-2 px-4 sm:ms-4 text-sm font-semibold text-white bg-[#0B2147] rounded-lg hover:bg-[#D0693B] focus:z-10 focus:ring-4 focus:ring-[#D0693B] dark:focus:ring-[#D0693B]"
            >
              Find services
            </a>
            <a
              href="/offerServices"
              className="py-2 px-4 sm:ms-4 text-sm font-semibold text-white bg-[#0B2147] rounded-lg hover:bg-[#D0693B] focus:z-10 focus:ring-4 focus:ring-[#D0693B] dark:focus:ring-[#D0693B]"
            >
              Offer services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;





