"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface CurrentlyEngagedCardProps {
  title: string;
  earned: string;
  description: { avatar: string; username: string; review: string }[];
}

const CurrentlyEngagedCard: React.FC<CurrentlyEngagedCardProps> = ({ title, earned, description }) => {
  const router = useRouter();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation
    router.push('/chat');
  };

  return (
    <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
      <div className="flex items-center mb-2">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="ml-2 hover:text-gray-500" onClick={handleChatClick} style={{ cursor: 'pointer' }}>
          <svg className="w-6 h-6 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{earned}</p>
      <div className="flex items-center mb-2">
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={description[0].avatar} // Use the avatar from description
          alt={description[0].username}
        />
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-bold">{description[0].username}</span> review
          </p>
          <p className="text-sm text-gray-600">{description[0].review}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyEngagedCard;


