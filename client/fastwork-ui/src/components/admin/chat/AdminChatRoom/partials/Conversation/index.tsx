'use client'
import { useChat } from "@/contexts/chat";
import React, { useEffect, useMemo, useRef } from "react";
import { Message } from "@/types/chat";
import MessageByMediaType from "@/components/chat/ChatRoom/partials/Conversation/MessageByMediaType";
import MessageBubbleSkeleton from "@/components/chat/ChatRoom/partials/Conversation/MessageBubbleSkeleton";

const Conversation = () => {
    const { activeChatRoom, isSending } = useChat();
    const messagesScreenRef = useRef<HTMLDivElement | null>(null);

    const messages = useMemo( () => {
        const results = activeChatRoom && activeChatRoom.messages ? activeChatRoom.messages : [];
        return results.filter( e => e.media_type !== 'signal').sort((a: Message, b: Message) => a.id - b.id);
    }, [activeChatRoom]);

    //scroll to bottom on append new message
    useEffect( () => {
        if(messages.length !== 0 && messagesScreenRef.current) {
            messagesScreenRef.current.scrollIntoView({ 
                behavior: "smooth", 
                block: "end"
            });
        }
    }, [messages, isSending]);

    return (
        <div className="flex-1 overflow-auto">
            {messages.length !== 0 ? (
                <div
                    ref={messagesScreenRef}
                    className="flex flex-col space-y-3 py-5 min-h-full justify-end"
                >   
                    {messages.map((message: Message) => (
                        <MessageByMediaType
                            key={message.id}
                            {...message}
                        />
                    ))}
                    { isSending ? (
                        <MessageBubbleSkeleton/>
                    ): ''}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full space-x-4">
                    <span className="text-4xl text-gray-600">Say Hi</span>
                    <span className="text-gray-400">to get started</span>
                </div>
            )}
        </div>
    );
};

export default Conversation;
