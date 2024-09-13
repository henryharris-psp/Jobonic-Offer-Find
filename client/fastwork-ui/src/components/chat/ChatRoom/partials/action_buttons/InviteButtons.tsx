import React, { useState } from "react";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import ServiceOfferModal from "@/components/service_card/ServiceOfferModal";

const inviteMessage = `
    I have reviewed your work and am impressed with your skills. 
    I'd like to discuss the possibility of collaborating on a project. 
    Are you available for a quick chat to explore this further?
`;

const InviteButtons = () => {
    const { activeChatRoom, sendMessage, updateChatRoom, deleteChatRoom } = useChat();
    const [showServiceSelectionModal, setShowServiceSelectionModal] = useState(false);

    const handleOnClickInvite = async () => {
        setShowServiceSelectionModal(true);
    }

    const handleOnClickDecline = () => {
        if(activeChatRoom){
            if(confirm('Are you sure to decline?')){
                deleteChatRoom(activeChatRoom?.id);
            }
        }
    }

    const handleOnClickService = async (selectedServiceId: string) => {
        try {
            await sendMessage('text', inviteMessage);
            const newlySentMessage = await sendMessage('service', selectedServiceId);
            if(newlySentMessage){
                await updateChatRoom(newlySentMessage.room_id, {
                    status: 'invited'
                });
            }
        } catch (error) {
            console.log('error gg', error);
        }
    }

    return (
        <>
            <div className="flex flex-row items-center gap-1">
                <Button 
                    title="Decline" 
                    icon={<XMarkIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnClickDecline} 
                />
                <Button 
                    title="Send Invitation" 
                    icon={<PaperAirplaneIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnClickInvite} 
                />
            </div>

            <Modal
                isOpen={showServiceSelectionModal}
                onClose={() => setShowServiceSelectionModal(false)}
            >
                <ServiceOfferModal
                    onClick={handleOnClickService}
                />
            </Modal>
        </>
    );
};

export default InviteButtons;