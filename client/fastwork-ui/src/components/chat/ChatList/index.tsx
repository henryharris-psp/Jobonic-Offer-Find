import React, { useEffect, useState } from "react";
import { fromServiceProviderStatus, fromClientStatus, people, chatFilters } from "@/data/chat";
import SearchBox from "./partials/SearchBox";
import SelectAndSearchBox from "./partials/SelectAndSearchBox";
import { People, CurrentUser } from "@/types/chat";

interface ChatListProps {
    onActiveChatChange: (value: People) => void;
}

const ChatList = ({
    onActiveChatChange
}: ChatListProps) => {

    const [roleFilter, setRoleFilter] = useState('All');
    const [fromClientStatusFilter, setFromClientStatusFilter] = useState('All');
    const [fromServiceProviderStatusFilter, setFromServiceProviderStatusFilter] = useState('All');
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('userInfo');
            setCurrentUser(userData ? JSON.parse(userData) : null);
        }
    }, []);

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

                {people
                    .filter((people) => people.id !== currentUser?.id)
                    .map((people) => (
                        <div
                            className="flex p-2 hover:bg-blue-300 rounded-md justify-between cursor-pointer"
                            key={people.id}
                            onClick={() => onActiveChatChange(people)}
                        >
                            <div className="flex">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={people.avatar || "/avatar.svg"}
                                    alt={people.fullName}
                                />
                                <div className="text-black mt-2 flex items-center text-sm">
                                    {people.fullName}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-[#0B2147] text-center text-white px-2 py-1 text-xs rounded-md">
                                    Completed
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ChatList;
