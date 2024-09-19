'use client'
import React from "react";
import Image from "next/image";
import { useChat } from "@/contexts/chat";

const DetailsHeader = () => {
    const { activeChatRoom } = useChat();

    return (
        <div className="flex flex-col bg-white">
            <div className="flex flex-row flex-wrap gap-5 items-center border-b border-b-gray-200 py-4 px-6">
                {/* receiver details */}
                <div className="flex flex-1 flex-row items-center mb-1 min-w-48 space-x-3 overflow-hidden">
                    <Image
                        src="/avatar.svg"
                        alt="avatar"
                        height={60}
                        width={60}
                        className="rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                        <span className="text-3xl font-bold capitalize">
                            { activeChatRoom?.receiver?.id || 'Customer'}
                        </span>
                        <div className="flex flex-row items-center space-x-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-500">
                                Online
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="flex items-center justify-center px-3 py-2 shadow-lg"
                style={{
                    zIndex: 2,
                }}
            >
                <span className="text-xs text-[#71BAC7] text-center">
                    Customer needs your help. Please support your best.
                </span>
            </div>
        </div>
    );
};

export default DetailsHeader;
