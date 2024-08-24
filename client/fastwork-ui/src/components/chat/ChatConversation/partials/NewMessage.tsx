import { supabase } from "@/config/supabaseClient";
import { useChat } from "@/contexts/chat";
import { RootState } from "@/store";
import { ChatRoom } from "@/types/chat";
import { PaperClipIcon, PhotoIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";

const NewMessage = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, updateChatRoom} = useChat();
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
        
        const ensureChatRoomExists = async (activeChatRoom: ChatRoom) => {
            if (!activeChatRoom.isNew) return activeChatRoom.id;
        
            const { data, error } = await supabase
                .from("chat_rooms")
                .insert([{
                    employer_id: activeChatRoom.employer_id,
                    freelancer_id: activeChatRoom.freelancer_id,
                    service_id: activeChatRoom.service_id,
                    status: "enquiry"
                }])
                .select();
        
            if (error) {
                throw new Error('Error creating new chat room');
            }
        
            const newChatRoom = data[0];
            updateChatRoom(activeChatRoom.id, {
                id: newChatRoom.id,
                isNew: false
            });
        
            return newChatRoom.id;
        };
        
        const sendMessage = async (roomId: number | string, content: string, senderId: number) => {
            const { error } = await supabase
                .from("messages")
                .insert([{
                    room_id: roomId,
                    content,
                    sender_id: senderId
                }]);
        
            if (error) {
                throw new Error('Error sending new message');
            }
        };

        const handleOnSend = async () => {
            if (!authUser || !activeChatRoom || !newMessage.trim()) return;
        
            try {
                const roomId = await ensureChatRoomExists(activeChatRoom);
                await sendMessage(roomId, newMessage.trim(), authUser.id);
                setNewMessage('');
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
