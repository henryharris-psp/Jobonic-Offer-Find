import React from "react";

const ChatListSkeleton = () => {
    return (
        <div className="flex flex-row space-x-3 px-3 py-2 rounded-lg bg-gray-300 animate-pulse justify-between">
            <div className="rounded-full w-12 h-12 bg-gray-200"></div>
            <div className="flex flex-1 flex-col space-y-3 my-1">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default ChatListSkeleton;
