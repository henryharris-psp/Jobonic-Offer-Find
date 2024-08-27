// ServiceCard.tsx
import React from "react";

interface ServiceCardProps {
    title: string;
    description: string[];
    rating: string;
    image: string;
}

const ServiceOfferCard: React.FC<ServiceCardProps> = ({ title, description, rating, image }) => (
    <div className="bg-[#CFEDF4] rounded-xl flex flex-col p-6 shadow-lg text-center">
        <div className="flex flex-wrap justify-start items-center">
            <img src="/profile.png" alt={title} className="rounded-full w-12 h-12 mr-2"/>
            <h3 className="text-md font-bold mt-2 mr-2">{title}</h3>
            <div className="flex items-center mt-2">
                <span className="text-orange-500">{rating}</span>
            </div>
        </div>

        <ul className="mt-4 flex flex-col justify-start items-start font-bold text-sm space-y-2">
            {description.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700 text-left ml-2">
                    <span className="mr-3 text-lg" style={{marginRight: '8px'}}>•</span>
                    <span style={{paddingLeft: '4px'}}>{item}</span>
                </li>
            ))}
        </ul>
    </div>

);

export default ServiceOfferCard;
