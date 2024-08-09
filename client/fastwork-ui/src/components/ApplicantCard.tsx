"use client";
import React from "react";

// Define the interface for the ApplicantCard props
interface ApplicantCardProps {
    title: string; // The title of the service the applicant is offering
    description: string[]; // A list of descriptions provided by the applicant
    avatar: string; // The avatar image URL of the applicant
    username: string; // The username of the applicant
}

// Functional component for displaying an applicant card
const ApplicantCard: React.FC<ApplicantCardProps> = ({
                                                         title,
                                                         description,
                                                         avatar,
                                                         username,
                                                     }) => {
    return (
        // Card container with shadow, rounded corners, padding, and fixed width
        <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>

            {/* Header section with avatar and username */}
            <div className="flex items-center mb-2">
                <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={avatar} // Applicant's avatar image
                    alt={username} // Alt text for the avatar image
                />
                <p className="text-black">{username}</p> {/* Display the applicant's username */}
            </div>

            {/* Title of the service being offered */}
            <h3 className="font-bold text-xl mb-2 text-black">
                offering service for <span className="text-black">{title}</span>
            </h3>

            {/* List of service descriptions */}
            <ul className="list-disc list-inside text-black mb-4">
                {description.map((desc, index) => (
                    <li key={index}>{desc}</li> // Render each description as a list item
                ))}
            </ul>

            {/* Action buttons for accepting or rejecting the applicant */}
            <div className="flex justify-center space-x-4">
                <button className="mt-4 px-2 py-1 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]">
                    Accept
                </button>
                <button className="mt-4 px-2 py-1 bg-[#E1824F] text-white rounded-lg font-semibold hover:bg-red-800">
                    Reject
                </button>
            </div>
        </div>
    );
};

export default ApplicantCard;
