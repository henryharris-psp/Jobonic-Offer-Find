import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import React from "react";

const terminateMsg = `Great Job! Employer has approved all your work. `;

const WaitingForSubmission = () => {
    const { sendMessage, updateChatRoom } = useChat();

    const handleOnTerminate = async () => {
        if(confirm('Are you sure?')){
            const newlySentMessage = await sendMessage('text', terminateMsg);
                
                if (newlySentMessage) {
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'waiting_for_review'
                    });
                }
        }
    }

    return (
        <div className="flex flex-col space-y-1">
            <div className="flex justify-center items-center text-center">
                <span className="text-sm font-bold text-orange-500">
                    You are currently in the contract, with 2 milestones left to submit
                </span>
            </div>
            <Button
                size="sm"
                color="danger"
                title="Mark all as completed and approved"
                onClick={handleOnTerminate}
            />
        </div>
    );
};

export default WaitingForSubmission;
