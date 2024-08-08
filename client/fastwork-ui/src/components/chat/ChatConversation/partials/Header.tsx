import { useChat } from "@/contexts/chat";
import { ChatBubbleBottomCenterTextIcon, ChevronLeftIcon, ChevronRightIcon, NumberedListIcon } from "@heroicons/react/24/solid";
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
                        className="flex items-center justify-evenly px-2 space-x-1 h-9 w-14 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
                        onClick={handelOnOpenChatList}
                    >
                        <ChatBubbleBottomCenterTextIcon className="size-6 text-gray-500"/>
                        <ChevronRightIcon className="size-4 text-gray-600"/>
                    </button>
                ) : ''}
            </div>
            <div>
                { !showProgressList ? (
                    <button     
                        className="flex items-center justify-evenly px-2 h-9 w-14 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
                        onClick={handelOnOpenProgressList}
                    >
                        <ChevronLeftIcon className="size-4 text-gray-600"/>
                        <NumberedListIcon className="size-5 text-gray-600"/>
                    </button>
                ) : ''}
            </div>
        </div>
    );
};

export default Header;
