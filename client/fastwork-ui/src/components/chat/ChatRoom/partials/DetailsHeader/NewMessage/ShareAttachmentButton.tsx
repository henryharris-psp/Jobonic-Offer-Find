import { ChatBubbleLeftRightIcon, DocumentTextIcon, PaperClipIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useChat } from "@/contexts/chat";

const ShareAttachmentButton = () => {
    const { activeChatRoom, sendMessage } = useChat();
    const [showPopup, setShowPopup] = useState(false);
    const handleOnToggle = () => {
        setShowPopup(prev => !prev);
    };

    //methods
    const handleOnShareChatRoom = async () => {
        if(activeChatRoom){
            await sendMessage('chat_room', activeChatRoom?.id.toString());
        }
    }

    return (
        <>
            <div className="relative">
                { showPopup ? (
                    <div className="flex absolute bg-white rounded-xl border border-gray-200 bottom-12 shadow overflow-hidden">
                        <div className="flex-1 flex flex-col">
                            
                            <button 
                                className="flex flex-row items-center space-x-2 p-3 border-b border-b-gray-200 hover:opacity-80 active:opacity-50"
                                onClick={handleOnShareChatRoom}
                            >
                                <ChatBubbleLeftRightIcon className="size-5 text-blue-500"/>
                                <span className="text-sm text-blue-500 whitespace-nowrap">
                                    Share this Chat Room
                                </span>
                            </button>

                            <button 
                                className="flex flex-row items-center space-x-2 p-3 border-b border-b-gray-200 hover:opacity-80 active:opacity-50"
                                onClick={() => console.log('df')}
                            >
                                <DocumentTextIcon className="size-5 text-blue-500"/>
                                <span className="text-sm text-blue-500 whitespace-nowrap">
                                    Share Document
                                </span>
                            </button>

                            <button 
                                className="flex flex-row items-center space-x-2 p-3 border-b border-b-gray-200 hover:opacity-80 active:opacity-50"
                                onClick={() => console.log('df')}
                            >
                                <SpeakerWaveIcon className="size-5 text-blue-500"/>
                                <span className="text-sm text-blue-500 whitespace-nowrap">
                                    Share Audio File
                                </span>
                            </button>

                        </div>
                    </div>
                ) : ''}
                <button
                    className="hover:opacity-80 active:opacity-60"
                    onClick={handleOnToggle}
                >
                    <PaperClipIcon className="size-7 text-[#0C2348]" />
                </button>
            </div>

            {/* backdrop */}
            {showPopup ? (
                <div 
                    className="absolute top-0 bottom-0 right-0 left-0"
                    onClick={() => setShowPopup(false)}
                >
                </div>
            ) : ''}
        </>
    );
};

export default ShareAttachmentButton;
