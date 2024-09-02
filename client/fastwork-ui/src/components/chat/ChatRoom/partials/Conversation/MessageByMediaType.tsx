import { MediaType, Message } from "@/types/chat";
import { ReactNode } from "react";
import MessageBubble from "./MessageBubble";
import ServiceOfferCardWithLoading from "./ServiceOfferCardWithLoading";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ContractCard from "@/components/ContractCard";
import NewContractCard from "@/components/NewContractCard";
import ContractCardWithLoading from "./ContractCardWithLoading";

const MessageByMediaType = (message: Message) => {
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
            <ContractCardWithLoading
                isSentByAuthUser={isSentByAuthUser}
            />,
        service: 
            <ServiceOfferCardWithLoading 
                serviceId={message.content}
                isSentByAuthUser={isSentByAuthUser}
            />
    };

    return (
        <div
            className={`flex flex-row px-3 ${
                isSentByAuthUser 
                ? "justify-end" 
                : "justify-start"
            }`}
        >
            <div
                className={`flex items-end ${
                    isSentByAuthUser 
                    ? "flex-row-reverse" 
                    : "flex-row"
                }`}
            >
                {/* avatar */}
                <img
                    src="/avatar.svg"
                    alt="Profile Pic"
                    className="h-8 w-8 rounded-full"
                />
                { messageComponentMap[message.media_type] || '' }
            </div>
        </div>
    );
};

export default MessageByMediaType;