"use client";
import React from "react";

interface ApplicationPopupCardProps {
  image: string;
  name: string;
  jobTitle: string;
  rating: number;
  description: string[];
}

const ApplicationPopupCard: React.FC<ApplicationPopupCardProps> = ({
  image,
  name,
  jobTitle,
  rating,
  description,
}) => {
  return (
    <div className="py-4 px-8 rounded-lg shadow-md flex-shrink-0 w-72 flex flex-col justify-between" style={{ backgroundColor: '#CFEDF4' }}>
      <div>
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={image}
            alt={name}
          />
          <div>
            <p className="text-black font-semibold">{name}</p>
            <h3 className="text-lg font-bold text-black">{jobTitle}</h3>
            <div className="flex items-center">
              <span className="text-orange-500">
                {'★'.repeat(Math.floor(rating))}
              </span>
            </div>
          </div>
        </div>
        <ul className="text-gray-700 mb-4">
          {description.map((item, index) => (
            <li key={index} className="mb-2 flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center space-x-2 mt-auto">
        <button className="px-6 py-2 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]">
          Hire
        </button>
        <button className="text-gray-800 hover:text-gray-500">
        <svg className="w-12 h-12 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
        </svg>
        </button>
      </div>
    </div>
  );
};

export default ApplicationPopupCard;
