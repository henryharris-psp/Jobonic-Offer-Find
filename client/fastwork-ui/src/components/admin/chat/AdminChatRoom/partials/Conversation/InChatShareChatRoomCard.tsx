import MediaSkeleton from "@/components/chat/ChatRoom/partials/Conversation/MediaSkeleton";
import { supabase } from "@/config/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InChatShareChatRoomCardProps {
    chatRoomId: string | number;
}

const InChatShareChatRoomCard = ({
    chatRoomId,
}: InChatShareChatRoomCardProps) => {
    const [chatRoom, setChatRoom] = useState(null);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("your_table_name")
                .select("*")
                .eq("id", chatRoomId)
                .single();

            if (error) {
                console.error("Error fetching data:", error);
                return;
            } else {
                setChatRoom(data);
            }
        })();
    }, [chatRoomId]);

    return chatRoom ? (
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
                        Chat Room Title
                    </h2>
                    <p className="text-sm text-gray-500">
                        Last message
                    </p>
                </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-gray-500 space-x-4">
                <span className="text-xs">Last active: 10 mins ago</span>
                <span className="text-xs">25 messages</span>
            </div>
        </div>
    );
};

export default InChatShareChatRoomCard;
