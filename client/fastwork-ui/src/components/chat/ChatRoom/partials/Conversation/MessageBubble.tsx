import React from "react";

interface MessageBubbleProps {
    id: string | number,
    content: string,
    isSentByAuthUser: boolean
}

const MessageBubble = ({
    id,
    content,
    isSentByAuthUser
}: MessageBubbleProps) => {

    return (
        <div
            className={`flex items-center justify-center p-3 rounded-xl break-words max-w-sm ${
                isSentByAuthUser 
                ? "bg-[#0C2348] text-white" 
                : "bg-gray-200 text-black"
            }`}
        >
            <span className="text-xs break-words">{content}</span>
        </div>
    );
};

export default MessageBubble;
