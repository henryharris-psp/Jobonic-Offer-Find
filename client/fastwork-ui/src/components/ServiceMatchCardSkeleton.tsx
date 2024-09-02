import React from "react";

const ServiceMatchCardSkeleton = () => {
    return (
        <div className="w-full animate-pulse space-y-10 rounded-lg bg-white p-6 shadow-md border border-gray-100">
            <div className="flex flex-row items-center space-x-5">
                <div className="h-14 w-14 rounded-full bg-gray-200"></div>

                <div className="flex flex-1 flex-col space-y-5">
                    <div className="h-6 rounded-md bg-gray-200"></div>
                    <div className="h-2 rounded-md bg-gray-200"></div>
                </div>
            </div>

            <div className="flex flex-col space-y-5">
                <div className="h-2 rounded-md bg-gray-200"></div>
                <div className="h-2 rounded-md bg-gray-200"></div>
                <div className="h-2 rounded-md bg-gray-200"></div>
                <div className="h-2 rounded-md bg-gray-200"></div>
            </div>

            <div className="flex flex-row space-x-4">
                <div className="h-10 flex-1 rounded-full bg-gray-200"></div>
                <div className="h-10 flex-1 rounded-full bg-gray-200"></div>
            </div>
        </div>
    );
};

export default ServiceMatchCardSkeleton;
