import React, { useState } from "react";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";

const inviteMessage = `
    I have reviewed your work and am impressed with your skills. 
    I'd like to discuss the possibility of collaborating on a project. Are you available for a quick chat to explore this further?
`;

const Enquiring = () => {
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
                            Service 1
                        </button>

                        <button 
                            className="w-56 h-56 bg-cyan-500"
                            onClick={() =>handleOnClickService('2')}
                        >
                            Service 2
                        </button>

                        <button 
                            className="w-56 h-56 bg-cyan-500"
                            onClick={() =>handleOnClickService('3')}
                        >
                            Service 3
                        </button>

                    </div>
                </div>
            ) : ''}
        </>
    );
};

export default Enquiring;