"use client";
import React from "react";

// Define the props interface for the AppliedCard component
interface AppliedCardProps {
    title: string;          // The title of the job or service applied for
    description: string[];  // An array of description strings for the job/service
    avatar: string;         // URL of the avatar image for the user
    username: string;       // The username of the person who posted the job/service
}

// Functional component for AppliedCard
const AppliedCard: React.FC<AppliedCardProps> = ({
                                                     title,
                                                     description,
                                                     avatar,
                                                     username,
                                                 }) => {
    return (
        <div
            className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0"
            style={{ backgroundColor: '#CFEDF4' }} // Inline styling for background color
        >
            {/* Header section with avatar and username */}
            <div className="flex items-center mb-2">
                <img
                    className="w-8 h-8 rounded-full mr-2" // Styling for avatar image
                    src={avatar} // Source of the avatar image
                    alt={username} // Alt text using the username
                />
                <p className="text-black">{username}</p> {/* Display the username */}
            </div>

            {/* Title section */}
            <h3 className="font-bold text-xl mb-2 text-black">
                looking for <span className="text-black">{title}</span> {/* Display the title */}
            </h3>

            {/* Description list */}
            <ul className="list-disc list-inside text-black mb-4">
                {description.map((desc, index) => (
                    <li key={index}>{desc}</li> // Display each description item
                ))}
            </ul>

            {/* Cancel Application button */}
            <div className="flex justify-center">
                <button className="mt-4 px-4 py-2 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]">
                    Cancel Application
                </button>
            </div>
        </div>
    );
};

export default AppliedCard;
