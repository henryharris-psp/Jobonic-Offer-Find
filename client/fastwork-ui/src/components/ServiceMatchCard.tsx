"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toast from "./Toast";
import { Service } from "@/types/service";
import { Profile } from "@/types/users";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ServiceMatchCardProps {
    service: Service;
    profile: Profile;
    onClick: (service: Service) => void;
    onChatClick: (e: React.MouseEvent) => void;
}

const ServiceMatchCard: React.FC<ServiceMatchCardProps> = ({
    service,
    profile,
    onClick,
    onChatClick,
}) => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const [isWishlisted, setIsWishlisted] = useState(false); // State to track if the service is wishlisted
    const [toastMessage, setToastMessage] = useState<string | null>(null); // State for displaying toast messages

    // Handle click event for adding/removing the service from wishlist
    const handleWishlistClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event propagation

        console.log("Profile : ", authUser?.profile)

        if (!authUser?.profile) {
            // If the user is not logged in, redirect to the registration page
            window.location.href = '/register';
            return;
        }

        // Toggle wishlist state and show toast message
        setIsWishlisted((prev) => !prev);
        setToastMessage(isWishlisted ? "Removed from wishlist" : "Added to wishlist");

        // Hide the toast message after 3 seconds
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    // Render star ratings based on the service rating
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const partialStarWidth = (rating % 1) * 100;
        const totalStars = 5;

        return (
            <div className="flex items-center space-x-1">
                {Array.from({ length: fullStars }, (_, index) => (
                    <svg
                        key={index}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049.293a1 1 0 011.902 0l2.018 6.195h6.518a1 1 0 01.592 1.81l-5.23 3.776 2.018 6.195a1 1 0 01-1.54 1.15l-5.23-3.776-5.23 3.776a1 1 0 01-1.54-1.15l2.018-6.195-5.23-3.776a1 1 0 01.592-1.81h6.518L9.05.293z" />
                    </svg>
                ))}
                {partialStarWidth > 0 && (
                    <div className="relative">
                        <svg
                            className="w-4 h-4 text-gray-300"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049.293a1 1 0 011.902 0l2.018 6.195h6.518a1 1 0 01.592 1.81l-5.23 3.776 2.018 6.195a1 1 0 01-1.54 1.15l-5.23-3.776-5.23 3.776a1 1 0 01-1.54-1.15l2.018-6.195-5.23-3.776a1 1 0 01.592-1.81h6.518L9.05.293z" />
                        </svg>
                        <svg
                            className="w-4 h-4 text-yellow-500 absolute top-0 left-0"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <defs>
                                <clipPath id="partialStarClip">
                                    <rect
                                        x="0"
                                        y="0"
                                        width={`${partialStarWidth}%`}
                                        height="100%"
                                    />
                                </clipPath>
                            </defs>
                            <path
                                d="M9.049.293a1 1 0 011.902 0l2.018 6.195h6.518a1 1 0 01.592 1.81l-5.23 3.776 2.018 6.195a1 1 0 01-1.54 1.15l-5.23-3.776-5.23 3.776a1 1 0 01-1.54-1.15l2.018-6.195-5.23-3.776a1 1 0 01.592-1.81h6.518L9.05.293z"
                                clipPath="url(#partialStarClip)"
                            />
                        </svg>
                    </div>
                )}
                {Array.from(
                    {
                        length:
                            totalStars -
                            fullStars -
                            (partialStarWidth > 0 ? 1 : 0),
                    },
                    (_, index) => (
                        <svg
                            key={index}
                            className="w-4 h-4 text-gray-300"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049.293a1 1 0 011.902 0l2.018 6.195h6.518a1 1 0 01.592 1.81l-5.23 3.776 2.018 6.195a1 1 0 01-1.54 1.15l-5.23-3.776-5.23 3.776a1 1 0 01-1.54-1.15l2.018-6.195-5.23-3.776a1 1 0 01.592-1.81h6.518L9.05.293z" />
                        </svg>
                    )
                )}
            </div>
        );
    };

    return (
        <div
            className="relative max-w-96 overflow-hidden bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
            onClick={() => onClick(service)}
        >
            <div className="flex items-center mb-4">
                <Image
                    src={profile.image ?? ''}
                    alt={service.title}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="ml-4 text-left">
                    <Link
                        href={{
                            pathname: "/description",
                            query: { id: service.id },
                        }}
                        legacyBehavior
                    >
                        <a className="text-xl font-bold hover:text-blue-500 hover:underline">
                            {service.title}
                        </a>
                    </Link>
                    <div className="flex flex-col">
                        <div className="flex flex-row space-x-2">
                            <span className="text-gray-500">{profile.rating || 0}</span>
                            {renderStars(profile.rating || 0)}
                        </div>
                        <span className="text-gray-500">
                            {profile.numReviews} reviews | {profile.numSold ?? 0} sold
                        </span>
                    </div>
                </div>
            </div>
            <p className="text-gray-700 text-left mb-4">
                • {service.description1}
            </p>
            <p className="text-gray-700 text-left mb-4">
                • {service.description2}
            </p>
            <p className="text-gray-700 text-left mb-4">
                • {service.description3}
            </p>
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2 items-center justify-center">
                    <span className="text-sm font-bold">
                        ${service.price}/{service.priceUnit}
                    </span>
                    <Link
                        href={{ 
                            pathname: '/chat', 
                            query: {
                                service: JSON.stringify(service)
                            }
                        }}
                        className="flex items-center justify-center"
                    >
                        <span>
                            <svg
                                className="w-6 h-6 text-[#0B2147] hover:text-[#D0693B] dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </Link>
                    <button
                        className={`text-gray-600 hover:text-gray-900`}
                        onClick={handleWishlistClick}
                    >
                        {isWishlisted ? (
                            <svg
                                className="w-6 h-6 text-red-500 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6 text-[#0B2147] hover:text-gray-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <button
                className="text-white py-2 px-3 rounded-full bg-[#0B2147] hover:bg-[#D0693B]"
                onClick={onChatClick}
            >
                Engage in service
            </button>
            <Toast message={toastMessage} />
        </div>
    );
};

export default ServiceMatchCard;
