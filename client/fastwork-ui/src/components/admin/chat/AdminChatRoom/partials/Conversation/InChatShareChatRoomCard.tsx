import MediaSkeleton from '@/components/chat/ChatRoom/partials/Conversation/MediaSkeleton';
import Image from 'next/image';

interface InChatShareChatRoomCardProps {
    chatRoomId: string | number;
}

const InChatShareChatRoomCard = ({
    chatRoomId
}: InChatShareChatRoomCardProps) => {
    
    return (
        chatRoomId ? (
            <MediaSkeleton/>
        ) : (
            <div className="bg-white shadow-lg rounded-lg p-4 mb-4 max-w-md mx-auto">
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
                        <h2 className="text-lg font-semibold text-gray-800">Chat Room Title</h2>
                        <p className="text-sm text-gray-500">Last message preview goes here...</p>
                    </div>
                </div>

                <div className="mt-3 flex justify-between items-center text-gray-500">
                    <span className="text-xs">Last active: 10 mins ago</span>
                    <span className="text-xs">25 messages</span>
                </div>
            </div>
        )
    )
}

export default InChatShareChatRoomCard