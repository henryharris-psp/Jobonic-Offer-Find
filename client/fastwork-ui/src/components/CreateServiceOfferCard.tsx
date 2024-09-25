'use client';

import React from 'react';

interface ServiceOfferCardProps {
  title: string;
  price: number;
  currency: string;
  description1?: string;
  description2?: string;
  description3?: string;
  avatar: string;
  rating: number;
  reviews: number;
  sold: number;
}

const ServiceOfferCard: React.FC<ServiceOfferCardProps> = ({ 
  title, 
  price, 
  currency, 
  description1, 
  description2, 
  description3, 
  avatar, 
  rating, 
  reviews, 
  sold 
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);

  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="shadow-lg rounded-lg p-6 mb-6 w-72 bg-[#CFEDF4] hover:shadow-xl transition-shadow duration-300 ease-in-out h-72 flex flex-col justify-between">
      {/* Avatar and Title */}
      <div className="flex items-center mb-2">
        <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
      </div>

      {/* Rating, Reviews, and Sold Info */}
      <div className="flex items-start flex-col text-sm text-gray-600 mb-4">
        <div className="flex items-center mr-2">
          {renderStars(rating)} {/* Display star rating */}
        </div>
        <span className="font-semibold">{reviews} reviews | {sold} sold</span>
      </div>

      {/* Description */}
      <ul className="list-disc list-inside text-gray-700 font-semibold text-sm mb-4 overflow-y-auto space-y-1">
        {description1 && <li>{description1}</li>}
        {description2 && <li>{description2}</li>}
        {description3 && <li>{description3}</li>}
      </ul>

      {/* Price */}
      <p className="font-semibold text-gray-800 text-md mb-4">{formattedPrice}</p>

      {/* Engage button */}
      <div className="flex items-center justify-center">
        <button className="px-6 py-3 bg-[#0B2147] hover:bg-[#D0693B] text-white rounded-2xl text-sm font-semibold transition-colors duration-200">
          Engage in Service
        </button>
      </div>
    </div>
  );
};

export default ServiceOfferCard;
