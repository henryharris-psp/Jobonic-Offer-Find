"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface CompletedFindServicesCardProps {
  title: string;
  earned: string;
  description: {
    avatar: string;
    username: string;
    review: string;
  }[];
}

const CompletedFindServicesCard: React.FC<CompletedFindServicesCardProps> = ({ title, earned, description }) => {
  const router = useRouter();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation
    router.push('/chat');
  };

  return (
    <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-xl flex items-center">
          {title}
          <span className="ml-2" onClick={handleChatClick}>
            <svg className="w-6 h-6 text-[#0B2147] hover:text-[#D0693B] dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
            </svg>
          </span>
        </h3>
      </div>
      <p className="text-gray-600 mb-4">{earned}</p>
      {description.map((desc, index) => (
        <div key={index} className="flex items-center mb-2">
          <img className="w-8 h-8 rounded-full mr-2" src={desc.avatar} alt={desc.username} />
          <div>
            <p className="text-sm text-gray-600">
              <a href="#" className="font-medium text-gray-900 hover:underline">{desc.username}</a> review
            </p>
            <p className="text-sm text-gray-700">{desc.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedFindServicesCard;
