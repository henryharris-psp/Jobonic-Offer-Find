import { ChatBubbleLeftRightIcon, DocumentTextIcon, PaperClipIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useChat } from "@/contexts/chat";
import Image from "next/image";
import StringParser from "@/functions/stringParser";

const ShareAttachmentButton = () => {
    const stringParser = new StringParser();
    const { activeChatRoom, sendMessage, chatRooms } = useChat();
    const [showPopup, setShowPopup] = useState(false);

    const [showChatRoomSelection, setShowChatRoomSelection] = useState(false);

    //methods
        const handleOnToggle = () => {
            setShowPopup(prev => !prev);
        };

        const handleOnOpenChatRoomSelection = () => {
            setShowChatRoomSelection(true);
        }

        const handleOnShareChatRoom = async (chatRoomId: string | number) => {
            await sendMessage('chat_room', chatRoomId.toString());
        }

        const handleOnClickBackDrop = () => {
            setShowPopup(false);
            setShowChatRoomSelection(false);
        }

    return (
        <>
            <div className="relative">
                { showChatRoomSelection ? (
                    <div className="flex flex-col absolute h-64 bg-white rounded-xl w-64 border border-gray-200 bottom-12 shadow overflow-hidden z-50">
                        <div className="flex items-center text-[#0B2147] font-semibold text-sm justify-center border-b border-b-gray-200 h-12">
                            <span>Please Select a Chat to share</span>
                        </div>

                        <div className="flex-1 overflow-auto">
                            <div className="flex flex-col">
                                { chatRooms.map( chatRoom =>
                                    <button
                                        key={chatRoom.id} 
                                        className="flex flex-row justify-between items-center space-x-2 p-3 border-b border-b-gray-200 hover:opacity-80 active:opacity-50"
                                        onClick={() => handleOnShareChatRoom(chatRoom.id)}
                                    >
                                        <div className="flex flex-row space-x-5 items-center">
                                            <Image
                                                className="w-10 h-10 rounded-full"
                                                src={chatRoom.receiver?.image ?? '/avatar.svg'}
                                                alt="receiver_avatar"
                                                width={100}
                                                height={100}
                                            />
                                            <span className="text-sm text-gray-800 capitalize font-semibold">
                                                { chatRoom.receiver.lastName }
                                            </span>
                                        </div>
                                        <div className="bg-[#0B2147] text-center text-white px-2 py-1 text-xs rounded-md">
                                            <span className="capitalize text-2xs">
                                                { stringParser.replaceUnderscoreWithSpace(chatRoom.status)}
                                            </span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : ''}

                { showPopup ? (
                    <div className="flex absolute bg-white rounded-xl border border-gray-200 bottom-12 shadow overflow-hidden z-40">
                        <div className="flex-1 flex flex-col">
                            
                            <button 
                                className="flex flex-row items-center space-x-2 p-3 border-b border-b-gray-200 hover:opacity-80 active:opacity-50"
                                onClick={handleOnOpenChatRoomSelection}
                            >
                                <ChatBubbleLeftRightIcon className="size-5 text-blue-500"/>
                                <span className="text-sm text-blue-500 whitespace-nowrap">
                                    Share Chat Room
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
                    className="absolute top-0 bottom-0 right-0 left-0 z-30"
                    onClick={handleOnClickBackDrop}
                >
                </div>
            ) : ''}
        </>
    );
};

export default ShareAttachmentButton;
