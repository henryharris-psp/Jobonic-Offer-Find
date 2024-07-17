'use client';

interface MessageProps {
  message: {
    id: number | string;
    sender?: string;
    avatar?: string;
    text?: string;
    sender_id?: string | number;
    recipient? : string;
    recipient_id?: number | string;
    sentByCurrentUser?: boolean;
  };
  currentUserId: string | number
}

const ChatMessageBig: React.FC<MessageProps> = ({ message, currentUserId }) => {
  return (
    <div className={`flex items-start ${message.sender_id == currentUserId ? "justify-end" : ""}`}>
          {message.sender_id != currentUserId && (
            <img
              className="w-10 h-10 rounded-full mt-5 mr-4"
              src={message.avatar}
              alt={message.sender}
            />
          )}
        <div className="flex flex-col gap-1">
          <p className={`font-bold ${message.sender_id === currentUserId ? "text-end" : ""}`}>{message.sender}</p>
          <p className={`bg-blue-100 rounded-lg p-2 ${message.sender_id === currentUserId ? "bg-blue-200" : "bg-blue-300"}`}>{message.text}</p>
        </div>
      {message.sender_id == currentUserId && (
        <img
          className="flex w-10 h-10 rounded-full mt-5 ml-4"
          src={message.avatar}
          alt={message.sender}
        />
      )}
    </div>
  );
};

export default ChatMessageBig;

