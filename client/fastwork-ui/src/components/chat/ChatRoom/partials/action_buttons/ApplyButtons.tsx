import React, { useState } from "react";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ServiceOfferModal from "@/components/service_card/ServiceOfferModal";
import Modal from "@/components/Modal";

const applyMessage = 'I am interested in applying for your service offer. Could you share the details on how I can proceed? Here is my service offer card. Thanks!';

const ApplyButtons = () => {
    const { activeChatRoom, sendMessage, updateChatRoom, deleteChatRoom } = useChat();
    const [showServiceSelectionModal, setShowServiceSelectionModal] = useState(false);

    const handleOnClickApply = async () => {
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
            await sendMessage('text', applyMessage);
            const newlySentMessage = await sendMessage('service', selectedServiceId);
            if(newlySentMessage){
                await updateChatRoom(newlySentMessage.room_id, {
                    status: 'applied'
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
                    title="Apply Now" 
                    icon={<CheckIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnClickApply} 
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

export default ApplyButtons;