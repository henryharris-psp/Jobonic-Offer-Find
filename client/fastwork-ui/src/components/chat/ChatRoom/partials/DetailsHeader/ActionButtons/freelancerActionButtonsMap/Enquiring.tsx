import React, { useState } from "react";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const applyMessage = 'I am interested in applying for your service offer. Could you share the details on how I can proceed? Thanks!';

const Enquiring = () => {
    const { activeChatRoom, sendMessage, updateChatRoom, deleteChatRoom } = useChat();
    const [showServiceSelectionModal, setShowServiceSelectionModal] = useState(false);

    const handleOnClickApply = async () => {
        setShowServiceSelectionModal(true);
    }

    const handleOnClickDecline = () => {
        if(activeChatRoom){
            deleteChatRoom(activeChatRoom?.id);
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
            { showServiceSelectionModal ? (
                <div 
                    className="flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-50"
                    onClick={() => setShowServiceSelectionModal(false)}    
                >
                    <div 
                        className="flex flex-row space-x-2 items-center justify-center bg-white rounded-xl h-96 w-96"
                    >
                        <button 
                            className="w-56 h-56 bg-cyan-500"
                            onClick={() =>handleOnClickService('1')}
                        >
                            dfdfdff
                        </button>

                        <button 
                            className="w-56 h-56 bg-cyan-500"
                            onClick={() =>handleOnClickService('2')}
                        >
                            dfdfdff
                        </button>

                        <button 
                            className="w-56 h-56 bg-cyan-500"
                            onClick={() =>handleOnClickService('3')}
                        >
                            dfdfdff
                        </button>

                    </div>
                </div>
            ) : ''}
        </>
    );
};

export default Enquiring;