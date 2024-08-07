import { useChat } from "@/contexts/chat";
import { ChatBubbleOvalLeftEllipsisIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
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
            { !showChatList ? (
                <button 
                    className="flex items-center justify-center space-x-1 h-9 w-16 bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-400"
                    onClick={handelOnOpenChatList}
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="size-6 text-gray-600"/>
                    <ChevronRightIcon className="size-4 text-gray-600"/>
                </button>
            ) : ''}
            { !showProgressList ? (
                <button     
                    className="flex items-center justify-center h-9 w-9 bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-400"
                    onClick={handelOnOpenProgressList}
                >
                    <ChevronLeftIcon className="size-6 text-gray-600"/>
                </button>
            ) : ''}
        </div>
    );
};

export default Header;
