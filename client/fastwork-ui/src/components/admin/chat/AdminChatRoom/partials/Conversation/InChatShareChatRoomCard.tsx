import Button from "@/components/Button";
import MediaSkeleton from "@/components/chat/ChatRoom/partials/Conversation/MediaSkeleton";
import { supabase } from "@/config/supabaseClient";
import { useChat } from "@/contexts/chat";
import { ChatRoom } from "@/types/chat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InChatShareChatRoomCardProps {
    chatRoomId: string | number;
}

const InChatShareChatRoomCard = ({
    chatRoomId,
}: InChatShareChatRoomCardProps) => {
    const router = useRouter();
    const { changeChatRoom, loadChatRoomData } = useChat();
    const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("chat_rooms")
                .select(`*, messages (*)`)
                .eq("id", chatRoomId)
                .single();

            if (error) {
                console.error("Error fetching data:", error);
                return;
            } else {
                const chatRoomsWithData = await loadChatRoomData([data]);
                console.log('all chat rooms', chatRoomsWithData);
                if(chatRoomsWithData) setChatRoom(chatRoomsWithData[0]);
            }
        })();
    }, [chatRoomId]);

    //methods
        const handleOnGoToChatRoom = () => {
            router.push('/chat')
        }

    return !chatRoom ? (
        <MediaSkeleton />
    ) : (
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image
                        width={100}
                        height={100}
                        className="w-12 h-12 rounded-full"
                        src="/avatar.svg"
                        alt="Chat Room"
                    />
                </div>

                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                        { chatRoom?.receiver.lastName }
                    </h2>
                    <p className="text-sm text-gray-500">
                        New message from {chatRoom?.sender.lastName} ...
                    </p>
                </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-gray-500 space-x-4">
                <span className="text-xs">Last active: 10 mins ago</span>
                <span className="text-xs">25 messages</span>
            </div>

            <div className="mt-3">
                <Button
                    fullWidth
                    size="sm"
                    color="info"
                    title="Go to Chat Room"
                    onClick={handleOnGoToChatRoom}
                />
            </div>
        </div>
    );
};

export default InChatShareChatRoomCard;
