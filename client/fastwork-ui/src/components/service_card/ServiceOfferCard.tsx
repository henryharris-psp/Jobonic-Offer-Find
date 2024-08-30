// ServiceCard.tsx
import Image from "next/image";
import React from "react";
import StarRating from "../StarRating";

interface ServiceCardProps {
    id: string
    title: string;
    description: string[];
    rating: number;
    image: string;
    onClick?: (serviceId: string) => void
}

const ServiceOfferCard = ({
    id, 
    title, 
    description, 
    rating, 
    image,
    onClick
}: ServiceCardProps) => {

    const handleOnClick = () => {
        onClick?.(id);
    }

    return (
        <div 
            className={`flex min-w-60 bg-[#CFEDF4] rounded-xl overflow-hidden
                ${ onClick ? 'cursor-pointer hover:bg-sky-200' : ''}
            `}
            onClick={handleOnClick}
        >
            <div className="flex flex-col m-5 space-y-4">

                <div className="flex flex-row space-x-3">
                    <Image
                        width={60}
                        height={60}
                        src="/profile.png" 
                        alt={title}
                        className="rounded-full w-14 h-14 mt-1"
                    />
                    <div className="flex-1 flex flex-col">
                        <span className="text-lg font-bold">
                            { title }
                        </span>
                        <StarRating value={rating}/>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    { description && description.length !== 0 ? (
                        description.map( (desc, index) => 
                            <div key={index} className="flex flex-row space-x-2">
                                <span className="text-gray-500">•</span>
                                <span className="mt-1 text-sm text-gray-500">
                                    { desc }
                                </span>
                            </div>
                        )
                    ) : ''}
                </div>

            </div>
        </div>
    )
};

export default ServiceOfferCard;
