import { RootState } from "@/store";
import { Message } from "@/types/chat";
import React from "react";
import { useSelector } from "react-redux";

const MessageBubble = ({
    id,
    sender_id,
    content,
    created_at
}: Message) => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const isSentByAuthUser = sender_id === authUser?.id;

    return (
        <div
            className={`flex flex-row ${
                isSentByAuthUser 
                ? "justify-end" 
                : "justify-start"
            }`}
        >
            <div
                className={`flex items-end mx-3 ${
                    isSentByAuthUser 
                    ? "flex-row-reverse" 
                    : "flex-row"
                }`}
            >
                <div>
                    {/* avatar */}
                    <img
                        src={"/avatar.svg"}
                        alt="Profile Pic"
                        className="h-8 w-8 rounded-full"
                    />
                </div>
                <div
                    className={`flex items-center justify-center p-3 mx-2 rounded-xl break-words max-w-sm ${
                        isSentByAuthUser 
                        ? "bg-[#0C2348] text-white" 
                        : "bg-gray-200 text-black"
                    }`}
                >
                    <span className="text-xs break-words">{content}</span>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
