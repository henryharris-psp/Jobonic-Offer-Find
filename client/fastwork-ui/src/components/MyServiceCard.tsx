'use client';

import React from 'react';

interface MyServiceCardProps {
  title: string;
  name: string;
  description: string[];
  image: string;
  rating: number;
  style?: React.CSSProperties;
}

const MyServiceCard: React.FC<MyServiceCardProps> = ({ title, name, description, image, rating, style }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="py-4 px-6 rounded-lg shadow-md flex-shrink-0" style={{ backgroundColor: '#CFEDF4', ...style }}>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={image} // Use the image prop
          alt={title}
        />
        <div>
          <p className="text-black font-semibold">{name}</p>
          <h3 className="text-lg font-bold text-black">{title}</h3>
          <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
              <svg key={`full-${index}`} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.788 1.403 8.176L12 18.896 5.66 23.175l1.403-8.176-5.938-5.788 8.207-1.193L12 .587z"/>
              </svg>
            ))}
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
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
              <svg key={`empty-${index}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.788 1.403 8.176L12 18.896 5.66 23.175l1.403-8.176-5.938-5.788 8.207-1.193L12 .587z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
      <ul className="text-gray-700">
        {description.map((item, index) => (
          <li key={index} className="mb-2 flex items-start">
            <span className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyServiceCard;




