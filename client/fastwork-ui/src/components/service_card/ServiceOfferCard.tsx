// ServiceCard.tsx
import Image from "next/image";
import React, { useMemo } from "react";
import StarRating from "../StarRating";
import { TailwindSize } from "@/types/general";

interface ServiceCardProps {
    id: string
    title: string;
    description: string[];
    rating: number;
    image: string;
    size?: TailwindSize;
    onClick?: (serviceId: string) => void
}

interface ServiceOfferCardSizeProps {
    image: number;
    title: string;
    star: TailwindSize;
    description: string;
}

const sizeMap: Record<string, ServiceOfferCardSizeProps> = {
    sm: {
        image: 50,
        title: '',
        star: 'sm',
        description: 'xs'
    },
    md: {
        image: 60,
        title: 'lg',
        star: '',
        description: 'sm'
    },
    lg: {
        image: 70,
        title: 'xl',
        star: 'lg',
        description: ''
    },
};


const ServiceOfferCard = ({
    id, 
    title, 
    description, 
    rating, 
    image,
    size = '',
    onClick
}: ServiceCardProps) => {

    const handleOnClick = () => {
        onClick?.(id);
    }

    const sizeConfig: ServiceOfferCardSizeProps = useMemo(() => {
        return sizeMap[size] || sizeMap.md;
    }, [size]);

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
                        width={sizeConfig.image}
                        height={sizeConfig.image}
                        src="/profile.png" 
                        alt={title}
                        className="rounded-full w-14 h-14"
                    />
                    <div className="flex-1 flex flex-col">
                        <span className={`font-bold text-${sizeConfig.title}`}>
                            { title }
                        </span>
                        
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    { description && description.length !== 0 ? (
                        description.map( (desc, index) => 
                            <div key={index} className="flex flex-row space-x-2">
                                <span className="text-gray-500">•</span>
                                <span className={`mt-1 text-gray-500 text-${sizeConfig.description}`}>
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
