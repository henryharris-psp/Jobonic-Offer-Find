import { useChat } from "@/contexts/chat";
import { ChatBubbleBottomCenterTextIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

const Header = () => {
    const { 
        showChatList, 
        setShowChatList,
        showProgressList,
        setShowProgressList,
    } = useChat();

    const handelOnOpenChatList = () => {
        setShowChatList(true)
    }

    const handelOnOpenProgressList = () => {
        setShowProgressList(true);
    }

    return (
        <div className="flex items-center justify-between h-12 px-3 bg-white border-b border-b-gray-200">
            <div>
                { !showChatList ? (
                    <button 
                        className="flex items-center justify-center space-x-1 h-9 w-16 rounded-full bg-[#0C2348] hover:bg-[#D0693B] active:bg-[#b65e35]"
                        onClick={handelOnOpenChatList}
                    >
                        <ChatBubbleBottomCenterTextIcon className="size-6 text-white"/>
                        <ChevronRightIcon className="size-4 text-white"/>
                    </button>
                ) : ''}
            </div>
            <div>
                { !showProgressList ? (
                    <button     
                        className="flex items-center justify-center h-9 w-9 rounded-full bg-[#0C2348] hover:bg-[#D0693B] active:bg-[#b65e35]"
                        onClick={handelOnOpenProgressList}
                    >
                        <ChevronLeftIcon className="size-5 text-white"/>
                    </button>
                ) : ''}
            </div>
        </div>
    );
};

export default Header;
