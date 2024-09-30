"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toast from "./Toast";
import { Service } from "@/types/service";
import { Profile } from "@/types/users";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import StarRating from "./StarRating";
import httpClient from "@/client/httpClient";
import { useRouter } from "next/navigation";

interface ServiceMatchCardProps {
    service: Service;
    profile?: Profile;
    hasProfile: boolean;
    onClick: (service: Service) => void;
    onChatClick: (e: React.MouseEvent) => void;
}

const ServiceMatchCard: React.FC<ServiceMatchCardProps> = ({
    service,
    profile,
    hasProfile,
    onClick,
    onChatClick,
}) => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const [isWishlisted, setIsWishlisted] = useState(false); // State to track if the service is wishlisted
    const [toastMessage, setToastMessage] = useState<string | null>(null); // State for displaying toast messages
    const [reviews, setReviews] = useState<any[]>([]); // Array to hold reviews
    const [averageRating, setAverageRating] = useState<number>(0); // Average rating
    const router = useRouter();
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await httpClient.get(`/customer-review?matchId=${service.id}`);
                const data = response.data;
                setReviews(data); // Set reviews from API response

                // Calculate average rating
                const totalRating = data.reduce((acc: number, review: any) => acc + review.noOfStar, 0);
                setAverageRating(totalRating / data.length || 0); // Avoid division by zero
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [service.id]);

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

    const handleEngageService = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("Has Profile:", hasProfile); // Log the value of hasProfile
        console.log("Auth User:", authUser); // Log authUser to check its state

        if (hasProfile) {
            router.push("/chat");
        } else {
            router.push("/createProfile");
        }
    };

    return (
        <div className="job-div">
            <div
                className="job-card hover:cursor-pointer"
                onClick={() => onClick(service)}
            >
                {/* TODO: temporary */}
                <span className="text-xs text-gray-400 mb-3">
                    Posted by {profile?.id}
                </span>
                <div className="flex items-center mb-2">
                    <Image
                        src="/avatar.svg"
                        alt={service.title}
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-gray-300 shadow-lg"
                    />
                    <div className="ml-4">
                        <div className="overflow-auto">
                            <h2 className="title text-md font-extrabold text-[#0B2147] leading-snug tracking-tight">
                                {service?.title ? service.title.charAt(0).toUpperCase() + service.title.slice(1) : ''}
                            </h2>

                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row space-x-1 items-center">
                                <StarRating value={averageRating} />
                            </div>
                            <span className="text-gray-500 font-semibold text-xs">
                                {reviews.length} reviews | {profile?.numSold ?? 0} sold
                            </span>
                        </div>
                    </div>

                </div>
                <div className="font-semibold text-gray-700 my-2 overflow-y-scroll">
                    <ul className="list-disc pl-5 space-y-1 overflow-y-auto h-[70px]">
                        {service?.description1 && (
                            <li className="job-description text-xs">
                                {service.description1}
                            </li>
                        )}
                        {service?.description2 && (
                            <li className="job-description text-xs">
                                {service.description2}
                            </li>
                        )}
                        {service?.description3 && (
                            <li className="job-description text-xs">
                                {service.description3}
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-semibold text-gray-800">
                            ${service.price}/{service.priceUnit}
                        </span>
                        <Link
                            href={{
                                pathname: '/chat',
                                query: {
                                    service: JSON.stringify(service),
                                }
                            }}
                        >
                            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                                <svg
                                    className="w-5 h-5 text-black"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" />
                                </svg>
                            </button>
                        </Link>
                        <button
                            className={`transition-colors duration-200 text-gray-600 hover:text-red-500`}
                            onClick={handleWishlistClick}
                        >
                            {isWishlisted ? (
                                <svg
                                    className="w-6 h-6 text-red-500 dark:text-white"
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
                                    className="w-6 h-6 text-[#0B2147] hover:text-gray-600 transition-colors duration-200"
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
                <div className="flex justify-center items-center">
                    <button
                        className="w-40 text-white text-sm font-semibold py-2 px-4 rounded-full bg-[#0B2147] hover:bg-[#D0693B] transition-colors duration-200"
                        onClick={handleEngageService}
                    >
                        Engage in service
                    </button>
                </div>

                <Toast message={toastMessage} />
            </div>
        </div>
    );
};

export default ServiceMatchCard;