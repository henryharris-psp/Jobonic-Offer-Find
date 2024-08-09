'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Define the interface for the CancelledServiceCard props
interface CancelledServiceCardProps {
    title: string; // Title of the cancelled service
    earned: string; // Information about the amount earned or status
    description: { avatar: string; username: string; review: string }[]; // Array of descriptions including avatar, username, and review
    details: string[]; // Array of details about the service
}

// Functional component for displaying a card for cancelled services
const CancelledServiceCard: React.FC<CancelledServiceCardProps> = ({ title, earned, description, details }) => {
    const router = useRouter(); // Use Next.js router for navigation

    // Function to handle click on the chat icon, navigating to the chat page
    const handleChatClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event propagation to avoid triggering other click events
        router.push('/chat'); // Navigate to the chat page
    };

    return (
        // Card container with shadow, rounded corners, padding, and fixed width
        <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>

            {/* Header section with avatar and username */}
            <div className="flex items-center mb-2">
                <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={description[0].avatar} // User's avatar image
                    alt={description[0].username} // Alt text for the avatar image
                />
                <div className="text-black text-sm">
                    Cancelled service with <span className="font-bold">{description[0].username}</span>
                </div>
            </div>

            {/* Title of the service */}
            <h3 className="font-bold text-xl mb-2">{title}</h3>

            {/* List of service details */}
            <ul className="list-disc list-inside text-black mb-4">
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li> // Render each detail as a list item
                ))}
            </ul>

            {/* Chat button */}
            <div className="flex items-center">
                <button onClick={handleChatClick}>
                    <svg className="w-10 h-10 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CancelledServiceCard;
