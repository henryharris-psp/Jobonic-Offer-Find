import { MediaType, Message } from "@/types/chat";
import { ReactNode } from "react";
import MessageBubble from "./MessageBubble";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InChatContractCard from "./InChatContractCard";
import InChatServiceOfferCard from "./InChatServiceOfferCard";
import Image from "next/image";
import { useChat } from "@/contexts/chat";

const MessageByMediaType = (message: Message) => {
    const { activeChatRoom } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const isSentByAuthUser = message.sender_id === authUser?.profile?.id;
    
    const messageComponentMap: Record<MediaType, ReactNode> = {
        text: 
            <MessageBubble 
                id={message.id} 
                content={message.content} 
                isSentByAuthUser={isSentByAuthUser}
            />,
        image: null,
        contract:
            <InChatContractCard
                contractId={message.content}
                isSentByAuthUser={isSentByAuthUser}
            />,
        service: 
            <InChatServiceOfferCard 
                serviceId={message.content}
                isSentByAuthUser={isSentByAuthUser}
            />,
    };

    return (
        <div 
            key={message.id} 
            className="flex flex-row w-full items-end"
        >
            <div className={`min-w-8 ${!isSentByAuthUser ? 'mx-2' : 'mx-1'}`}>
                { !isSentByAuthUser ? (
                    <Image
                        src="/avatar.svg"
                        alt="Profile Pic"
                        className="h-8 w-8 rounded-full"
                        width={100}
                        height={100}
                    />
                ) : ''}
            </div>
            <div className={`flex flex-1 ${
                (isSentByAuthUser ? "justify-end" : "justify-start")
            }`}>
                { messageComponentMap[message.media_type] || '' }
            </div>
            <div className={`min-w-8 ${isSentByAuthUser ? 'mx-2' : 'mx-1'}`}>
                { isSentByAuthUser ? (
                    <Image
                        src="/avatar.svg"
                        alt="Profile Pic"
                        className="h-8 w-8 rounded-full"
                        width={100}
                        height={100}
                    />
                ) : ''}
            </div>
        </div>
    );
};

export default MessageByMediaType;