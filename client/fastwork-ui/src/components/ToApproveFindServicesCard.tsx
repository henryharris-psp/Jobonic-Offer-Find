'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Define the interface for the component props
interface ToApproveFindServicesCardProps {
    title: string; // Title of the service
    earned: string; // Earnings related to the service
    description: { avatar: string; username: string; review: string }[]; // Array of objects containing avatar, username, and review details
    details: string[]; // Array of strings for additional details about the service
}

// Functional component for displaying a card for services that need approval
const ToApproveFindServicesCard: React.FC<ToApproveFindServicesCardProps> = ({ title, earned, description, details }) => {
    const router = useRouter(); // useRouter hook from Next.js for navigation

    // Handler function for when the chat button is clicked
    const handleChatClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click event from propagating to parent elements
        router.push('/chat'); // Navigate to the chat page
    };

    return (
        // Card container with shadow, rounded corners, padding, and fixed width
        <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>

            {/* Header section with avatar and username */}
            <div className="flex items-center mb-2">
                <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={description[0].avatar} // Avatar image of the person you hired
                    alt={description[0].username} // Alt text for the avatar image
                />
                <div className="text-black text-sm">
                    You hired <span className="font-bold">{description[0].username}</span> for
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

            {/* Approve and Reject buttons */}
            <div className="flex justify-center space-x-4">
                <button className="px-2 py-1 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]">
                    Approve
                </button>
                <button className="px-2 py-1 bg-[#E1824F] text-white rounded-lg font-semibold hover:bg-red-800">
                    Reject
                </button>
            </div>

            {/* Chat and Milestone buttons */}
            <div className="flex justify-center space-x-4 mt-4 items-center">
                <button onClick={handleChatClick} className="flex-shrink-0">
                    <svg className="w-10 h-10 text-[#0B2147] hover:text-[#D0693B] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
                    </svg>
                </button>
                <button className="px-2 py-1 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]">
                    Milestone 1
                </button>
            </div>
        </div>
    );
};

export default ToApproveFindServicesCard;
