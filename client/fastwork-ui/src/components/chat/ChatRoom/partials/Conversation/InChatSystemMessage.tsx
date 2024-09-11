import React from "react";

interface InChatSystemMessageProps {
    message: string;
}

const InChatSystemMessage = ({
    message
}: InChatSystemMessageProps) => {
    return (
        <div className="flex flex-row items-center space-x-2 my-2 rounded-full overflow-hidden bg-gray-200 py-2 px-3">
            <span className="text-xs italic text-gray-400">System:</span>
            <span className="text-xs text-gray-500">
                {message}
            </span>
        </div>
    );
};

export default InChatSystemMessage;
