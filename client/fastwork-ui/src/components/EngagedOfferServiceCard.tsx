"use client";
import React from 'react';

interface EngagedCardProps {
  title: string;
  description: string[];
  avatar: string;
  username: string;
}

const EngagedOfferServiceCard: React.FC<EngagedCardProps> = ({ title, description, avatar, username }) => {
  return (
    <div className="shadow-md rounded-md p-4 mb-4 max-w-xs" style={{ backgroundColor: '#CFEDF4' }}>
      <div className="flex items-center mb-2">
        <img src={avatar} alt={username} className="w-10 h-10 rounded-full mr-2" />
        <div className="text-sm">
          <p className="text-gray-700 font-bold">{username}</p>
          <p className="text-gray-500">is looking for</p>
        </div>
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <ul className="list-none mb-4">
        {description.map((desc, index) => (
          <li key={index} className="text-gray-700 flex items-start">
            <span className="mr-2">•</span>
            {desc}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V6h12v2z"/></svg>
        <button className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-700">
          Update Progress
        </button>
      </div>
    </div>
  );
};

export default EngagedOfferServiceCard;
