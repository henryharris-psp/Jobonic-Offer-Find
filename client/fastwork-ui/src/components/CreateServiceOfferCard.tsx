'use client';

import React from 'react';

interface ServiceOfferCardProps {
  title: string;
  price: number;
  currency: string;
  description1?: string; // Optional description
  description2?: string; // Optional description
  description3?: string; // Optional description
}

const ServiceOfferCard: React.FC<ServiceOfferCardProps> = ({ title, price,currency, description1, description2, description3 }) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency, // Use the currency prop
      }).format(price);

  return (
    <div className="shadow-md rounded-md p-4 mb-4 w-72 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
      <h3 className="font-bold  text-lg mb-2">{title}</h3>
      
      
      {/* Conditionally rendering each description if it exists */}
      <ul className="list-disc list-inside text-gray-600 font-semibold text-sm mb-4">
        {description1 && <li>{description1}</li>}
        {description2 && <li>{description2}</li>}
        {description3 && <li>{description3}</li>}
      </ul>
      <p className="font-semibold text-gray-800 text-sm mb-2">{formattedPrice}</p>
      <div className="flex items-center justify-center">
          
        <button className="ml-2 px-8 py-3 bg-[#0B2147] hover:bg-[#D0693B] text-white rounded-2xl text-sm font-semibold">
          Engage in service
        </button>
      </div>
    </div>
  );
};

export default ServiceOfferCard;
