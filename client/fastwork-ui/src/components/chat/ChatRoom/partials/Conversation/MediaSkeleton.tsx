import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

interface MediaSkeletonProps {
    isReloadable?: boolean;
    isLoading?: boolean;
    onReload?: () => void;
}

const MediaSkeleton = ({
    isLoading = false,
    isReloadable = false,
    onReload
}: MediaSkeletonProps) => {
    return (
        <div className="relative w-full">
            <div className="h-48 w-full min-w-72 max-w-96 rounded-xl bg-gray-200 animate-pulse" />

            { isReloadable ? (
                <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0">
                    <button
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                        onClick={() => onReload?.() }
                    >
                        <span className="">
                            <ArrowPathIcon
                                className={`size-5 font-bold text-gray-600 ${
                                    isLoading ? "animate-spin" : ""
                                }`}
                            />
                        </span>
                    </button>
                </div>
            ) : ''}
        </div>
    );
};

export default MediaSkeleton;
