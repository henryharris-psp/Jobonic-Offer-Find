import React from "react";

const MessageBubbleSkeleton = () => {
    return (
        <div
            className="flex flex-row justify-end"
        >
            <div
                className="flex items-end mx-3 flex-row-reverse"
            >
                <div>
                    {/* avatar */}
                    <img
                        src="/avatar.svg"
                        alt="Profile Pic"
                        className="h-8 w-8 rounded-full"
                    />
                </div>
                <div
                    className="flex items-center justify-center py-5 px-14 mx-2 rounded-xl break-words max-w-sm bg-gray-200 animate-pulse"
                > </div>
            </div>
        </div>
    );
};

export default MessageBubbleSkeleton;
