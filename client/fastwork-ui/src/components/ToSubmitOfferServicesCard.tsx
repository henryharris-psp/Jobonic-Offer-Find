'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Define the props interface for the component
interface ToSubmitOfferServicesCard {
    title: string; // Title of the service
    earned: string; // Earnings information
    description: { avatar: string; username: string; review: string }[]; // Array containing user details (avatar, username, and review)
    details: string[]; // Array of details related to the service
}

// Functional component for the ToSubmitOfferServicesCard
const ToSubmitOfferServicesCard: React.FC<ToSubmitOfferServicesCard> = ({ title, earned, description, details }) => {
    const router = useRouter(); // Use the Next.js router for navigation

    // Handler function for clicking on the chat button
    const handleChatClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the event from bubbling up to parent elements
        router.push('/chat'); // Navigate to the chat page
    };

    return (
        <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
            {/* Header section displaying the avatar and username */}
            <div className="flex items-center mb-2">
                <img
                    className="w-8 h-8 rounded-full mr-2" // Styling for the avatar image
                    src={description[0].avatar} // Source of the avatar image
                    alt={description[0].username} // Alt text using the username
                />
                <div className="text-black text-sm">
                    <span className="font-bold">{description[0].username}</span> hired you for {/* Display username and context */}
                </div>
            </div>

            {/* Title section */}
            <h3 className="font-bold text-xl mb-2">{title}</h3> {/* Display the service title */}

            {/* Details list */}
            <ul className="list-disc list-inside text-black mb-4">
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li> // Display each detail item
                ))}
            </ul>

            {/* Footer section with action buttons */}
            <div className="flex items-center">
                {/* Chat button */}
                <button onClick={handleChatClick}>
                    <svg className="w-10 h-10 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
                    </svg>
                </button>

                {/* Submit File button */}
                <input type="file" id="file-input" className="hidden" /> {/* Hidden file input */}
                <label htmlFor="file-input" className="file-input-label ml-2 px-4 py-2 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B] cursor-pointer">
                    Submit File
                </label>
            </div>
        </div>
    );
};

export default ToSubmitOfferServicesCard;
