'use client';

import React from 'react';

interface CreateServiceRequestCardProps {
  title: string;
  earned: string;
  description: { avatar: string; username: string; review: string }[];
  details: string[];
}

const CreateServiceRequestCard: React.FC<CreateServiceRequestCardProps> = ({ title, earned, description, details }) => {
  return (
    <div className="shadow-lg rounded-lg p-6 mb-6 w-72 bg-[#CFEDF4] hover:shadow-xl transition-shadow duration-300 ease-in-out h-72 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 rounded-full object-cover mr-4"
            src={description[0].avatar}
            alt={description[0].username}
          />
          <div className="text-gray-700 leading-tight">
            <h4 className="text-lg font-semibold">{description[0].username}</h4>
            <p className="text-sm text-gray-600">is looking for</p>
          </div>
        </div>
        <h3 className="text-md font-semibold text-gray-800 mb-4">{title}</h3>
        <ul className="list-disc list-inside text-gray-600 font-semibold text-sm space-y-1 mb-4 overflow-y-auto max-h-16">
          {details.map((detail, index) => (
            <li key={index} className="truncate">{detail}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <svg
            className="w-6 h-6 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" />
          </svg>
        </button>
        <button className="px-4 py-2 ml-2 bg-[#0B2147] hover:bg-[#D0693B] text-white rounded-lg text-sm font-medium transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default CreateServiceRequestCard;
