import React, { useState } from "react";
import { fromServiceProviderStatus, fromClientStatus, chatFilters } from "@/data/chat";
import SearchBox from "./partials/SearchBox";
import SelectAndSearchBox from "./partials/SelectAndSearchBox";
import { ChatRoom } from "@/types/chat";
import { useChat } from "@/contexts/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import StringParser from "@/functions/stringParser";
import Image from "next/image";
import ChatListSkeleton from "./partials/ChatListSkeleton";

interface ChatListProps {
    isLoading: boolean
}

const skeletonCount = Array.from({ length: 4 }, (_, index) => index);

const ChatList = ({ 
    isLoading 
}: ChatListProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, changeChatRoom, chatRooms } = useChat();
    const [roleFilter, setRoleFilter] = useState('All');
    const [fromClientStatusFilter, setFromClientStatusFilter] = useState('All');
    const [fromServiceProviderStatusFilter, setFromServiceProviderStatusFilter] = useState('All');
    const stringParser = new StringParser();

    //methods
        const handleOnChatRoomChange = (chatRoom: ChatRoom) => {
            changeChatRoom(chatRoom);
        }

    return (
        <div className="flex-1 flex bg-[#CFEDF4]">
            <div className="flex flex-col px-4 pt-2">

                {/* new */}
                <div className="flex flex-col space-y-3 overflow-hidden">
                    <div className="flex items-center justify-center h-10 border-b-2 border-gray-300">
                        <span className="text-lg font-semibold">
                            Chats
                        </span>
                    </div>

                    <div className="flex justify-center mb-4">
                        {chatFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setRoleFilter(filter)}
                                className={`px-4 py-2 text-xs font-medium ${
                                    roleFilter === filter
                                        ? "bg-[#0B2147] text-white"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                                style={{ marginRight: "-1px" }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* filter and search bar */}
                    <form className="max-w-lg mx-auto">
                        <div className="flex flex-col pb-4 space-y-0">
                            {roleFilter === "All" && (
                                <SearchBox/>
                            )}
                            {roleFilter === "From clients" && (
                                <SelectAndSearchBox
                                    selectedValue={fromClientStatusFilter}
                                    onSelect={ newValue => setFromClientStatusFilter(newValue) }
                                    inputValue={null}
                                    onInputChange={ newValue => console.log(newValue)}
                                    options={fromClientStatus.map( e => ({
                                        label: e,
                                        value: e
                                    }))}
                                />
                            )}
                            {roleFilter === "From service providers" && (
                                <SelectAndSearchBox
                                    selectedValue={fromServiceProviderStatusFilter}
                                    onSelect={ newValue => setFromServiceProviderStatusFilter(newValue) }
                                    inputValue={null}
                                    onInputChange={ newValue => console.log(newValue)}
                                    options={fromServiceProviderStatus.map( e => ({
                                        label: e,
                                        value: e
                                    }))}
                                />
                            )}
                        </div>
                    </form>
                </div>

                <div className="flex-1 overflow-auto">
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
                                                <span className="font-bold">{`${chatRoom.receiver?.lastName ?? 'No Profile' }`}</span>
                                                <span className="text-xs text-gray-500">
                                                    {authUser?.profile.id === chatRoom?.freelancer_id ? 'is finding service' : 'is offering service'}
                                                </span>
                                            </div>
                                        </div>
                                        { chatRoom.status ? (
                                            <div className="flex items-center">
                                                <div className="bg-[#0B2147] text-center text-white px-2 py-1 text-xs rounded-md">
                                                    <span className="capitalize">
                                                        { stringParser.replaceUnderscoreWithSpace(chatRoom.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : ''}
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
