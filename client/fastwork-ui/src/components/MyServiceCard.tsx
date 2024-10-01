'use client';

import React from 'react';

// Define the props interface for the MyServiceCard component
interface MyServiceCardProps {
  title: string; // Title of the service
  name: string | undefined; // Name of the service provider
  description: string[]; // List of description points for the service
  image: string; // Image URL for the service provider's avatar
  rating: number; // Rating of the service out of 5
  style?: React.CSSProperties; // Optional custom styles for the card
}

// Functional component for MyServiceCard
const MyServiceCard: React.FC<MyServiceCardProps> = ({ title, name, description, rating, image, style }) => {
  // Calculate the number of full stars and whether there's a half star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="job-div">
      <div className="py-4 px-6 rounded-lg shadow-md w-full flex-shrink-0 bg-white transition-transform duration-100 ease-in-out transform hover:scale-105 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={image}
            alt={`${name}'s avatar`} // Improved alt text for accessibility
          />
          <div>
            <p className="text-black font-medium">{name}</p>
            <h3 className="text-lg font-bold text-black">{title}</h3>
            <div className="flex items-center">
              {/* Render full stars */}
              {[...Array(fullStars)].map((_, index) => (
                <svg key={`full-${index}`} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.788 1.403 8.176L12 18.896 5.66 23.175l1.403-8.176-5.938-5.788 8.207-1.193L12 .587z"/>
                </svg>
              ))}
              {/* Render a half star if applicable */}
              {hasHalfStar && (
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="half-grad">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#half-grad)" d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.788 1.403 8.176L12 18.896 5.66 23.175l1.403-8.176-5.938-5.788 8.207-1.193L12 .587z"/>
                </svg>
              )}
              {/* Render empty stars to fill up to 5 stars */}
              {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <svg key={`empty-${index}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.788 1.403 8.176L12 18.896 5.66 23.175l1.403-8.176-5.938-5.788 8.207-1.193L12 .587z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>
        {/* Render the service description as a list */}
        <ul className="text-gray-600 font-semibold max-h-[200px] overflow-auto">
          {description.map((item, index) => (
            <li key={index} className="mb-2 flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyServiceCard;