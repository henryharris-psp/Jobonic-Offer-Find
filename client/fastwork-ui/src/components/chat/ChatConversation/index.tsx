import React from "react";
import Header from "./partials/Header";
import Details from "./partials/Details";
import Messages from "./partials/Messages";
import NewMessage from "./partials/NewMessage";
import { People } from "@/components/chat/interfaces";

interface ChatConversationProps {
    activeChat: People;
}

const ChatConversation = ({ 
    activeChat,
}: ChatConversationProps) => {
    return (
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
            <Header/>
            <Details
                activeChat={activeChat}
                recipientUser={activeChat}
            />

            <div className="flex-1 overflow-auto">
                <Messages />
            </div>

            <NewMessage />
        </div>
    );
};

export default ChatConversation;
