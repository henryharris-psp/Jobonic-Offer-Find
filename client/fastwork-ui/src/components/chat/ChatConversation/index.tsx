import React from "react";
import Header from "./partials/Header";
import Details from "./partials/Details";
import Messages from "./partials/Messages";
import NewMessage from "./partials/NewMessage";
import { People } from "@/interfaces/chat";
import { useChat } from "@/contexts/chat";

interface ChatConversationProps {
    activeChat: People;
}

const ChatConversation = ({ 
    activeChat,
}: ChatConversationProps) => {
    const { showChatList, showProgressList } = useChat();
    return (
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
            { !showChatList || !showProgressList ? (
                <Header/>
            ): ''}
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
