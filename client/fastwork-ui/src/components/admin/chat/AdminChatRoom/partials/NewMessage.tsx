'use client'
import { useChat } from "@/contexts/chat";
import { RootState } from "@/store";
import { PaperClipIcon, PhotoIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";

const NewMessage = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, sendMessage } = useChat();
    const [newMessage, setNewMessage] = useState('');

    //methods
        const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            setNewMessage(e.target.value);
        }

        //submit on enterkey press
        const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                handleOnSend();
            }
        };

        const handleOnSend = async () => {
            if (!authUser || !activeChatRoom || !newMessage.trim()) return;
            setNewMessage('');
            try {
                await sendMessage('text', newMessage.trim());
            } catch (error) {
                console.log("Error sending new message: ", error);
            }
        };

    return activeChatRoom ? (
        <div className="flex flex-row items-center px-3 py-2 space-x-2">
            <button 
                className="hover:opacity-80 active:opacity-60"
            >
                <PaperClipIcon className="size-7 text-[#0C2348]"/>
            </button>
            <button 
                className="hover:opacity-80 active:opacity-60"
            >
                <PhotoIcon className="size-8 text-[#0C2348]"/>
            </button>
            <input
                type="text"
                placeholder="Type your message..."
                className="flex flex-1 border min-w-0 border-gray-300 text-sm rounded-lg px-4 py-3"
                value={newMessage}
                onChange={handleOnInputChange}
                onKeyUp={handleOnKeyUp}
            />
            <button
                className="bg-[#0C2348] hover:bg-[#D0693B] active:bg-[#b65e35] text-white h-full px-4 rounded-lg text-xs font-bold shadow"
                onClick={handleOnSend}
            >
                Send
            </button>
        </div>
    ) : '';
};

export default NewMessage;
