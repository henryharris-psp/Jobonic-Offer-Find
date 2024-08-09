"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// Define the props interface for the CompletedOfferServiceCard component
interface CompletedCardProps {
  title: string; // The title of the completed service
  earned: string; // The earnings or amount earned for the service
  description: {
    avatar: string; // URL to the user's avatar image
    username: string; // The username of the person who provided the review
    review: string; // The actual review text
  }[];
}

// Functional component for displaying a completed offer service card
const CompletedOfferServiceCard: React.FC<CompletedCardProps> = ({ title, earned, description }) => {
  const router = useRouter(); // Use Next.js router for navigation

  // Function to handle chat icon click
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation to avoid triggering other click events
    router.push('/chat'); // Navigate to the chat page
  };

  return (
      <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
        {/* Title section with chat icon */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-xl flex items-center">
            {title}
            <span className="ml-2" onClick={handleChatClick} style={{ cursor: 'pointer' }}>
            <svg className="w-6 h-6 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
            </svg>
          </span>
          </h3>
        </div>

        {/* Display earnings */}
        <p className="text-black mb-4">{earned}</p>

        {/* Iterate over the description array to display reviews */}
        {description.map((desc, index) => (
            <div key={index} className="flex items-start">
              <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={desc.avatar} // Avatar image
                  alt={desc.username} // Alt text for avatar image
              />
              <div>
                <div className="text-sm text-black">
                  <span className="font-bold">{desc.username}</span> review
                </div>
                <p className="text-black">{desc.review}</p> {/* Review text */}
              </div>
            </div>
        ))}
      </div>
  );
};

export default CompletedOfferServiceCard;
