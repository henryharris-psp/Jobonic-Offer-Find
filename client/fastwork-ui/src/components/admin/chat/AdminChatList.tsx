'use client'
import React, { useState } from "react";
import { ChatRoom } from "@/types/chat";
import { useChat } from "@/contexts/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import StringParser from "@/functions/stringParser";
import Image from "next/image";
import SearchBox from "@/components/chat/ChatList/partials/SearchBox";
import ChatListSkeleton from "@/components/chat/ChatList/partials/ChatListSkeleton";

interface AdminChatListProps {
    isLoading: boolean
}

const skeletonCount = Array.from({ length: 4 }, (_, index) => index);

const AdminChatList = ({ 
    isLoading 
}: AdminChatListProps) => {
    const { activeChatRoom, changeChatRoom, chatRooms } = useChat();
    const [roleFilter, setRoleFilter] = useState('All');
    const stringParser = new StringParser();

    //methods
        const handleOnChatRoomChange = (chatRoom: ChatRoom) => {
            changeChatRoom(chatRoom);
        }

    return (
        <div className="flex-1 bg-[#CFEDF4]">
            <div className="px-4 pt-2">

                {/* new */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-center h-10 border-b-2 border-gray-300">
                        <span className="text-lg font-semibold">
                            Chats
                        </span>
                    </div>

                    {/* filter and search bar */}
                    <form className="max-w-lg mx-auto">
                        <div className="flex flex-col pb-4 space-y-0">
                            {roleFilter === "All" && (
                                <SearchBox/>
                            )}
                        </div>
                    </form>
                </div>

                { isLoading ? (
                    <div className="flex flex-col space-y-2">
                        { skeletonCount.map( id =>
                            <ChatListSkeleton key={id}/>
                        )}
                    </div>
                ) : (
                    chatRooms.length === 0 ? (
                        <div className="flex flex-col items-center space-y-3">
                            <span className="text-gray-400 mt-5 text-sm">You have no chat</span>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                        { chatRooms.map((chatRoom) => (
                            <div
                                key={chatRoom.id}
                                className={`flex p-2 hover:bg-sky-200 rounded-md justify-between cursor-pointer ${
                                    chatRoom.id === activeChatRoom?.id ? 'bg-sky-200' : ''
                                }`}
                                onClick={() => handleOnChatRoomChange(chatRoom)}
                            >
                                <div className="flex items-center space-x-2">
                                    <Image
                                        className="w-10 h-10 rounded-full mr-4"
                                        src={chatRoom.receiver?.image ?? '/avatar.svg'}
                                        alt="receiver_avatar"
                                        width={100}
                                        height={100}
                                    />
                                    <div className="flex flex-col space-y-1">
                                        <span className="font-bold">{`${chatRoom.receiver?.lastName ?? 'Customer' }`}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminChatList;
