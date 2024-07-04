"use client";
import React from "react";

interface AppliedCardProps {
  title: string;
  description: string[];
  avatar: string;
  username: string;
}

const AppliedCard: React.FC<AppliedCardProps> = ({
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
        looking for <span className="text-black">{title}</span>
      </h3>
      <ul className="list-disc list-inside text-black mb-4">
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button className="mt-4 px-4 py-2 bg-[#0B2147] text-white rounded-lg font-semibold hover:bg-[#D0693B]">
          Cancel Application
        </button>
      </div>
    </div>
  );
};

export default AppliedCard;

