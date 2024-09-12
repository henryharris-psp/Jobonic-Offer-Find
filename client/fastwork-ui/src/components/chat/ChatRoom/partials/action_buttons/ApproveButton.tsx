import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import React from "react";

const ApproveButton = () => {
    const { sendMessage, updateChatRoom } = useChat();

    const handleApprove = async () => {
        const newlySentMessage = await sendMessage('system', 'All milestones are completed');
                if (newlySentMessage) {
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'to_review'
                    });
                }
    };
    return (
        <Button 
            size="sm"
            icon={<CheckBadgeIcon className="size-5 text-white"/>}
            color="danger"
            title="Mark all as approved and paid" 
            onClick={handleApprove} 
        />
    );
};

export default ApproveButton;
