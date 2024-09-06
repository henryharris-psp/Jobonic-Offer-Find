import { MediaType, Message } from "@/types/chat";
import { ReactNode, useMemo } from "react";
import MessageBubble from "./MessageBubble";
import ServiceOfferCardWithLoading from "./ServiceOfferCardWithLoading";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ContractCardWithLoading from "./ContractCardWithLoading";
import { useChat } from "@/contexts/chat";

const MessageByMediaType = (message: Message) => {
    const { activeChatRoom } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const isSentByAuthUser = message.sender_id === authUser?.profile?.id;

    const isLatestContract = useMemo( () => {
        if(activeChatRoom && activeChatRoom?.messages.length !== 0){
            const contractMessages = activeChatRoom.messages.filter(message => message.media_type === 'contract');
            
            if(contractMessages?.length !== 0){
                const latestContractMessage = contractMessages.reduce((latest, message) => {
                    return message.id > latest.id ? message : latest;
                }, contractMessages[0]);

                return message.id === latestContractMessage?.id;
            }
        } 

        return false;
    }, [activeChatRoom?.messages]);
    
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
                contractId={message.content}
                isSentByAuthUser={isSentByAuthUser}
                showActionButtons={isLatestContract}
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