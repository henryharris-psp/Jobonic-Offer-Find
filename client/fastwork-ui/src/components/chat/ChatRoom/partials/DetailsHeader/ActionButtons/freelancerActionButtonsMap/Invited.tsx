import React, { useState } from "react";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const acceptMessage = `
    Thank you for your invitation. I am ready to work with you.
`;

const declinedMessage = `
    Thank you for your opportunity. But I am not available now. I am so sorry for that!
`;

const Invited = () => {
    const { sendMessage, updateChatRoom } = useChat();
    //methods
        const sendAcceptMessage = async () => {
            try {
                const newlySentMessage = await sendMessage('text', acceptMessage);
                if(newlySentMessage){
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'signing contract'
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

        const handleOnClickAccept = async () => {
            if(confirm('Are you sure to accept invitation?')){
                sendAcceptMessage();
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
                title="Accept" 
                icon={<CheckIcon className="size-5 font-bold text-bold"/>}
                iconPositon="start"
                size="sm"
                onClick={handleOnClickAccept} 
            />
        </div>
    );
};

export default Invited;