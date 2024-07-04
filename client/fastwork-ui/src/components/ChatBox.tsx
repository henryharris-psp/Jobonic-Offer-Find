'use client';

import React, { useState } from 'react';

const Avatar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-10 h-10 mr-2">{children}</div>
);

const AvatarImage: React.FC<{ src: string }> = ({ src }) => (
    <img src={src} alt="Avatar" className="rounded-full w-full h-full object-cover" />
);

const DropdownMenuContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={`dropdown-content ${className}`}>{children}</div>
);

const DropdownMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="px-4 py-2 w-full hover:bg-gray-100 rounded cursor-pointer">
        {children}
    </div>
);

const EmptyChatsContent: React.FC = () => (
    <div className="text-center flex flex-col justify-center items-center p-6">
        <div className="text-2xl">No messages yet</div>
        <div className="mt-4">
            Reach out and start a conversation to advance your career
        </div>
    </div>
);

const cn = (...classNames: (string | null | undefined)[]) => classNames.filter(Boolean).join(' ');

type ChatsListItemData = {
    summary: string;
    sender: {
        name: string;
        imageUrl: string;
    },
    status: string;
};

const ChatsListItem: React.FC<{ data: ChatsListItemData; onClick?: () => void }> = ({ data, onClick }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleHover = (hovered: boolean) => {
        setIsHovered(hovered);
    };

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleItemClick = () => {
        setIsPopupOpen(true);
        if (onClick) {
            onClick();
        }
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className="flex items-center p-3 border-b border-gray-200 relative cursor-pointer" onClick={handleItemClick}>
                <div
                    className="flex items-center p-3 hover:bg-gray-100 relative"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                >
                    <div className="flex items-center justify-center w-12 h-12 relative">
                        {isChecked && (
                            <button
                                className="absolute inset-0 flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCheck();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        {!isChecked && isHovered && (
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleCheck();
                                }}
                                className={`absolute inset-0 z-10 opacity-100`}
                            />
                        )}
                        {!isChecked && !isHovered && (
                            <AvatarImage src={data.sender.imageUrl} />
                        )}
                    </div>
                </div>
                <div className="flex-grow pl-3 flex flex-col">
                    <div className="flex items-center mb-1">
                        <div className="font-semibold">{data.sender.name}</div>
                        <div className="ml-auto">
                            <div className='px-2 py-1 text-xs bg-green-500 text-white font-bold rounded-md'>{data.status}</div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">{data.summary}</div>
                </div>
            </div>
            {/* {isPopupOpen && <MessageBox onClose={handleClosePopup} />} */}
        </>
    );
};

const SearchInput: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

    const handleToggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleDelete = () => {
        console.log("Delete option clicked");
        // Implement delete functionality here
    };

    return (
        <div className="p-2 relative">
            <div className="relative">
                {isCheckboxSelected ? (
                    <div onClick={handleDelete} className="cursor-pointer">Delete</div>
                ) : (
                    <input
                        type="text"
                        className="w-full bg-slate-100 border-none h-8 pl-8 focus:outline-none"
                        placeholder="Search"
                    />
                )}
                <div onClick={handleToggleDropdown} className="absolute top-0 right-0 h-full flex items-center pr-2 cursor-pointer ml-2">:::</div>
            </div>
            {isDropdownOpen && (
                <div className="absolute flex flex-col items-center top-10 right-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg shadow-2xl z-50 p-4">
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuItem>Archived</DropdownMenuItem>
                        <DropdownMenuItem>My connections</DropdownMenuItem>
                        <DropdownMenuItem>Starred</DropdownMenuItem>
                        <DropdownMenuItem>Unread</DropdownMenuItem>
                        <DropdownMenuItem>InMail</DropdownMenuItem>
                        <DropdownMenuItem>Spam</DropdownMenuItem>
                    </DropdownMenuContent>
                </div>
            )}
        </div>
    );
};

type ChatTab = "focused" | "other";

const ChatTabsHeader: React.FC<{
    activeTab: ChatTab;
    onChangeTab: (tab: ChatTab) => void;
}> = ({ activeTab, onChangeTab }) => {
    return (
        <div className="w-full border-b font-semibold flex flex-row">
            <div
                className={`text-zinc-500 text-sm flex-1 text-center p-2 ${activeTab === "focused" ? "border-b-green-700 border-b-2" : ""}`}
                onClick={() => onChangeTab("focused")}
            >
                Focused
            </div>
            <div
                className={`text-zinc-500 text-sm flex-1 text-center p-2 ${activeTab === "other" ? "border-b-green-700 border-b-2" : ""}`}
                onClick={() => onChangeTab("other")}
            >
                Other
            </div>
        </div>
    );
};

const ChatHeader: React.FC<{
    onClick: () => void;
    isChatsExpanded: boolean;
}> = ({ onClick, isChatsExpanded }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const iconClassName =
        "cursor-pointer hover:rounded-full hover:bg-zinc-100 p-1 overflow-visible";

    return (
        <div className="relative flex flex-row items-center p-2 cursor-pointer" onClick={onClick}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="w-2" />
            <div className="text-sm font-semibold flex-grow">Messaging</div>
            <div className="flex flex-row space-x-1 items-center">
                <div className="w-10 h-10 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center cursor-pointer">
                    <div onClick={handleToggleDropdown} className="h-full flex items-center justify-center">:::</div>
                </div>
                {isDropdownOpen && (
                    <div className="absolute top-12 right-0 mt-2 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg shadow-2xl z-50 p-4">
                        <DropdownMenuContent className="w-full">
                            <DropdownMenuItem>Manage conversations</DropdownMenuItem>
                            <DropdownMenuItem>Messaging settings</DropdownMenuItem>
                            <DropdownMenuItem>Set away message</DropdownMenuItem>
                        </DropdownMenuContent>
                    </div>
                )}
                <div className={iconClassName}>✏️</div>
                {isChatsExpanded ? (
                    <div className={iconClassName}>⬇️</div>
                ) : (
                    <div className={iconClassName}>⬆️</div>
                )}
            </div>
        </div>
    );
};

const ChatBox: React.FC = () => {
    const [isChatsExpanded, setChatsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<ChatTab>("focused");

    const handleToggleChatBox = () => {
        setChatsExpanded(prevState => !prevState);
    };

    // sample chat data
    const chatData: ChatsListItemData[] = [
        {
            summary: "Good Morning",
            sender: {
                name: "Sender 1",
                imageUrl: "https://github.com/shadcn.png",
            },
            status: "Pending"
        },
        {
            summary: "Hello, how are you?",
            sender: {
                name: "Sender 2",
                imageUrl: "https://github.com/shadcn.png",
            },
            status: "Completed"
        },
        {
            summary: "How you doing?",
            sender: {
                name: "Sender 3",
                imageUrl: "https://github.com/shadcn.png",
            },
            status: "Ongoing"
        },
        {
            summary: "Good Night",
            sender: {
                name: "Sender 4",
                imageUrl: "https://github.com/shadcn.png",
            },
            status: "Completed"
        },
        {
            summary: "Hi",
            sender: {
                name: "Sender 5",
                imageUrl: "https://github.com/shadcn.png",
            },
            status: "Completed"
        },
    ];

    return (
        <div className="fixed right-0 bottom-0 w-72 bg-white shadow-md border rounded-t-lg rounded-tr-none max-h-[80vh]">
            <ChatHeader
                onClick={handleToggleChatBox}
                isChatsExpanded={isChatsExpanded}
            />
            {isChatsExpanded && (
                <>
                    <SearchInput />
                    <ChatTabsHeader activeTab={activeTab} onChangeTab={setActiveTab} />
                </>
            )}
            <div
                className={cn(
                    "transition-all duration-500 ease-in-out",
                    isChatsExpanded ? "max-h-[65vh] overflow-y-scroll" : "max-h-0 overflow-hidden"
                )}
            >
                {isChatsExpanded && (activeTab === "focused" ?
                    chatData.map((chatItem, index) => (
                        <ChatsListItem
                            key={index}
                            data={chatItem}
                        />
                    ))
                    : <EmptyChatsContent />
                )}
            </div>
        </div>
    );
};

export default ChatBox;
