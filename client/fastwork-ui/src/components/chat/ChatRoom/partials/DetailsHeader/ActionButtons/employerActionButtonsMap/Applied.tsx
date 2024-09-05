import React, { useState } from "react";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";

const hireMessage = `
    Congratulation! Looking forward to working together! Could we discuss the contract details?
`;

const declinedMessage = `
    Thank you for your interest in the project. 
    After careful consideration, we've decided to move forward with another candidate. 
    We appreciate your time and wish you the best in your future projects!
`;

const Applied = () => {
    const { sendMessage, updateChatRoom } = useChat();

    //methods
        const sendHireMessage = async () => {
            try {
                const newlySentMessage = await sendMessage('text', hireMessage);
                if(newlySentMessage){
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'signing_contract'
                    });
                }
            } catch (error) {
                console.log('error gg', error);
            }
        }

        const sendDeclineMessage = async () => {
            try {
                const newlySentMessage = await sendMessage('text', declinedMessage);
                if(newlySentMessage){
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'enquiring'
                    });
                }
            } catch (error) {
                console.log('error gg', error);
            }
        }

        const handleOnClickHire = async () => {
            if(confirm('Are you sure to hire?')){
                sendHireMessage();
            }
        }

        const handleOnClickDecline = async () => {
            if(confirm('Are you sure to decline request?')){
                sendDeclineMessage();
            }
        }

    return (
        <div className="flex flex-row items-center gap-1">
            <Button 
                title="Decline" 
                icon={<XMarkIcon className="size-5 font-bold text-bold"/>}
                iconPositon="start"
                size="sm"
                onClick={handleOnClickDecline} 
            />
            <Button 
                title="Potential Hire" 
                icon={<CheckIcon className="size-5 font-bold text-bold"/>}
                iconPositon="start"
                size="sm"
                onClick={handleOnClickHire} 
            />
        </div>
    );
};

export default Applied;