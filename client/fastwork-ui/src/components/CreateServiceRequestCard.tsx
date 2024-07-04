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
    <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
      <div className="flex items-center mb-2">
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={description[0].avatar}
          alt={description[0].username}
        />
        <div className="text-gray-600 text-sm">
          <span className="font-bold">{description[0].username}</span> is looking for
        </div>
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        <button className="text-gray-800">
        <svg className="w-12 h-12 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
        </svg>
        </button>
        <button className="ml-2 px-4 py-2 bg-[#0B2147] hover:bg-[#D0693B] text-white rounded-lg font-semibold">
          Apply
        </button>
      </div>
    </div>
  );
};

export default CreateServiceRequestCard;
