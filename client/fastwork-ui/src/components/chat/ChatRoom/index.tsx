import TogglesHeader from "./partials/TogglesHeader";
import { useChat } from "@/contexts/chat";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import DetailsHeader from "./partials/DetailsHeader";
import Conversation from "./partials/Conversation";
import NewMessage from "./partials/DetailsHeader/NewMessage";

const ChatRoom = () => {
    const { showChatList, showProgressList, activeChatRoom } = useChat();

    return (
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
            {!showChatList || !showProgressList ? (
                <TogglesHeader />
            ) : ''}

            { activeChatRoom ? (
                <>
                    <DetailsHeader/>
                    <Conversation/>
                    <NewMessage/>
                </>
            ) : (
                <div className="flex flex-col h-full items-center justify-center space-y-5">
                    <ChatBubbleOvalLeftEllipsisIcon className="size-28 text-gray-300"/>
                    <span className="text-gray-500 text-sm">Please select a chat to start conversation</span>
                </div>
            )}
            
            
        </div>
    );
};

export default ChatRoom;
