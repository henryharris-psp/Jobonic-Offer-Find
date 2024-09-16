import { MediaType, Message } from "@/types/chat";
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
import InChatPaymentReceiptCard from "./InChatPaymentReceiptCard";

const MessageByMediaType = (message: Message) => {
    const { authUserType } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const isSentByAuthUser = message.sender_id == authUser?.profile?.id;
    
    const messageComponentMap: Record<MediaType, ReactNode> = {
        text:
            message.sender_id === 'system' ? (
                <InChatSystemMessage
                    message={message.content}
                />
            ) : (
                <MessageBubble 
                    id={message.id} 
                    content={message.content} 
                    isSentByAuthUser={isSentByAuthUser}
                />
            ),
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
        payment_request: authUserType === 'freelancer'
            ? <InChatSystemMessage
                message="Please wait for employer&apos;s payment"
            />
            : <div className="flex flex-col space-y-3">
                <InChatSystemMessage
                    message="Please transfer the total signed price to Jobonic. Jobonic will securely hold the funds and release payment to the freelancer once the submitted work is approved."
                />
                <div className="flex justify-center">
                    <InChatPaymentRequestCard/>
                </div>
            </div>,
        payment_receipt: authUserType === 'freelancer'
            ? <InChatSystemMessage
                message="The employer has transferred the full payment to Jobonic. Your collaboration has officially started. Give it your best."
            />
            : <div className="flex flex-col space-y-3">
                <InChatSystemMessage
                    message="Your Payment is successfully transfered to Jobonic. Jobonic will send to freelancer for each successful milestone."
                />
                <div className="flex justify-center">
                    <InChatPaymentReceiptCard
                        transactionId={message.content}
                    />
                </div>
            </div>,
    };

    return (
        <div 
            key={message.id} 
            className="flex flex-row w-full items-end"
        >
            <div className={`min-w-8 ${!isSentByAuthUser ? 'mx-2' : 'mx-1'}`}>
                { !isSentByAuthUser && message.sender_id !== 'system' ? (
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
                message.sender_id === "system" ? "justify-center" :
                (isSentByAuthUser ? "justify-end" : "justify-start")
            }`}>
                { messageComponentMap[message.media_type] || '' }
            </div>
            <div className={`min-w-8 ${isSentByAuthUser ? 'mx-2' : 'mx-1'}`}>
                { isSentByAuthUser && message.sender_id !== 'system' ? (
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