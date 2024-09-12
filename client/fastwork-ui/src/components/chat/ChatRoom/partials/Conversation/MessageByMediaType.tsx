import { MediaType, Message, SystemMessageType } from "@/types/chat";
import { ReactNode } from "react";
import MessageBubble from "./MessageBubble";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InChatContractCard from "./InChatContractCard";
import InChatServiceOfferCard from "./InChatServiceOfferCard";
import Image from "next/image";
import { useChat } from "@/contexts/chat";
import InChatPaymentRequestCard from "./InChatPaymentRequestCard";
import InChatSystemMessage from "./InChatSystemMessage";

const MessageByMediaType = (message: Message) => {
    const { authUserType } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const isSentByAuthUser = message.sender_id === authUser?.profile?.id;

    const systemMessageMap: Record<SystemMessageType, ReactNode> = {
        contract_accepted: 
            <InChatSystemMessage
                message="Greate! You both accepted the contract."
            />,
        payment_request: authUserType === 'freelancer'
            ? <InChatSystemMessage
                message="Please wait for employer&apos;s payment"
            />
            : <InChatPaymentRequestCard/>,
        payment_success: 
            <InChatSystemMessage
                message="Payment is successfully transfered to Jobonic. Jobonic will send to freelancer for each successful milestone."
            />,
    }
    
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
                updatedAt={message.created_at}
            />,
        service: 
            <InChatServiceOfferCard 
                serviceId={message.content}
                isSentByAuthUser={isSentByAuthUser}
            />,
        system: systemMessageMap[message.content as SystemMessageType]
    };

    return (
        <div 
            key={message.id} 
            className="flex flex-row w-full items-end"
        >
            <div className={`min-w-8 ${!isSentByAuthUser ? 'mx-2' : 'mx-1'}`}>
                { !isSentByAuthUser && message.media_type !== 'system' ? (
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
                message.media_type === "system" ? "justify-center" :
                (isSentByAuthUser ? "justify-end" : "justify-start")
            }`}>
                { messageComponentMap[message.media_type] || '' }
            </div>
            <div className={`min-w-8 ${isSentByAuthUser ? 'mx-2' : 'mx-1'}`}>
                { isSentByAuthUser && message.media_type !== 'system' ? (
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