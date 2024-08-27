import React, { useEffect, useMemo, useRef } from "react";
import Header from "./partials/Header";
import Details from "./partials/Details";
import NewMessage from "./partials/NewMessage";
import { useChat } from "@/contexts/chat";
import MessageBubble from "./partials/MessageBubble";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

const ChatConversation = () => {
    const { showChatList, showProgressList, activeChatRoom } = useChat();
    const messagesScreenRef = useRef<HTMLDivElement | null>(null);

    const messages = useMemo( () => {
        return activeChatRoom ? activeChatRoom.messages : [];
    }, [activeChatRoom]);

    //scroll to bottom on append new message
    useEffect( () => {
        if(messages.length !== 0 && messagesScreenRef.current) {
            messagesScreenRef.current.scrollIntoView({ 
                behavior: "smooth", 
                block: "end"
            });
        }
    }, [messages.length]);

    return (
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
            {!showChatList || !showProgressList ? (
                <Header />
            ) : ''}

            { activeChatRoom ? (
                <>
                    <Details/>
                    <div className="flex-1 overflow-auto">
                        { messages.length !== 0 ? (
                            <div
                                ref={messagesScreenRef}
                                className="flex flex-col space-y-3 py-5 min-h-full"
                            >
                                {messages.map((message) => (
                                    <MessageBubble 
                                        key={message.id}
                                        {...message}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full space-x-4">
                                <span className="text-4xl text-gray-600">Say Hi</span>
                                <span className="text-gray-400">to get started</span>
                            </div>
                        )}
                    </div>
                    <NewMessage/>
                </>
            ) : (
                <div className="flex flex-col h-full items-center justify-center space-y-5">
                    <ChatBubbleOvalLeftEllipsisIcon className="size-28 text-gray-300"/>
                    <span className="text-gray-500 text-sm">Please select a chat to start conversation</span>
                </div>
            )}
            
            
        </div>
    );
};

export default ChatConversation;
