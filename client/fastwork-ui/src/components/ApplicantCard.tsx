"use client";
import React from "react";

interface ApplicantCardProps {
    title: string;
    description: string[];
    avatar: string;
    username: string;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
                                                         title,
                                                         description,
                                                         avatar,
                                                         username,
                                                     }) => {
    return (
        <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
            <div className="flex items-center mb-2">
                <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={avatar}
                    alt={username}
                />
                <p className="text-black">{username}</p>
            </div>
            <h3 className="font-bold text-xl mb-2 text-black">
                offering service for <span className="text-black">{title}</span>
            </h3>
            <ul className="list-disc list-inside text-black mb-4">
                {description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                ))}
            </ul>
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
