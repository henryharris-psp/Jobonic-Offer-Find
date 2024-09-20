import React, { useState } from "react";
import { useChat } from "@/contexts/chat";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface AlertMessageCardProps {
    onClose: () => void; // Function to close the alert
}

const applyMessage = 'The file has been rejected by the employer.'
                

const AlertMessageCard = ({ onClose }: AlertMessageCardProps) => {
    const { activeChatRoom, sendMessage, updateChatRoom } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [isRejecting, setIsRejecting] = useState(false);

    
    const handleReject = async () => {
        setIsRejecting(true);
    
        try {
            // Send system message to the freelancer side and update chat room for both users
            const newlySentMessage = await sendMessage('text',applyMessage);
            activeChatRoom?.id;
            if (newlySentMessage) {
                // Update the chat room for both employer and freelancer
                await updateChatRoom(newlySentMessage.room_id, {
                    status: 'file_rejected',
                    visibility: 'both' // The message is visible to both users
                });
            }
    
            // Close the alert once the process is complete
            onClose();
        } catch (error) {
            console.error('Error during rejection process:', error);
        } finally {
            setIsRejecting(false);
        }
    };
    return (
        <div className="flex flex-col bg-white rounded-lg justify-center items-center p-2 space-y-4">
            <h2 className="text-cyan-900 font-bold text-lg text-center mb-4">Milestone File Rejection Alert</h2>
            <div className="text-center text-md font-bold">
            Are you sure you want to reject the uploaded file from your service provider?
            </div>

            <div className="flex space-x-4 justify-center">
                <Button
                    title={isRejecting ? 'Rejecting...' : 'OK'}
                    onClick={handleReject}
                    disabled={isRejecting}
                />
                <Button
                    title="Cancel"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default AlertMessageCard;
