import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { CheckBadgeIcon, CheckIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import React from "react";

const SubmitWorkButton = () => {
    const { sendMessage, updateChatRoom } = useChat();

    const handleApprove = async () => {
        const newlySentMessage = await sendMessage('text', 'All milestones are completed and approved.', 'system');
            if (newlySentMessage) {
                await updateChatRoom(newlySentMessage.room_id, {
                    status: 'to_review'
                });
            }
    };
    return (
        <div className="flex flex-row items-center gap-1">
            <Button 
                title="Submit Work" 
                icon={<DocumentPlusIcon className="size-5 text-white" />}
                iconPositon="start"
                size="sm"
                onClick={() => console.log('submit')} 
            />
            <Button
                title="Complete" 
                color="success"
                icon={<CheckIcon className="size-5 font-bold text-bold"/>}
                iconPositon="start"
                size="sm"
                onClick={() => console.log('submit')} 
            />
            <Button 
                size="sm"
                icon={<CheckBadgeIcon className="size-5 text-white"/>}
                color="danger"
                title="Mark all as approved and paid" 
                onClick={handleApprove} 
            />
        </div>
    );
};

export default SubmitWorkButton;
