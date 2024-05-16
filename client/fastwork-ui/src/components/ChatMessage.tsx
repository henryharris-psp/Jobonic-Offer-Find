const ChatMessage = ({ message }: any) => {
  
  return (
    <div className={`flex items-start ${message.sentByCurrentUser ? "justify-end" : ""}`}>
          {!message.sentByCurrentUser && (
            <img
              className="w-10 h-10 rounded-full mt-5 mr-4"
              src={message.avatar}
              alt={message.sender}
            />
          )}
        <div className="flex flex-col gap-1">
          <p className={`font-bold ${message.sentByCurrentUser ? "text-end" : ""}`}>{message.sender}</p>
          <p className={`bg-blue-100 rounded-lg p-2 ${message.sentByCurrentUser ? "bg-blue-200" : "bg-blue-300"}`}>{message.text}</p>
        </div>
      {message.sentByCurrentUser && (
        <img
          className="flex w-10 h-10 rounded-full mt-5 ml-4"
          src={message.avatar}
          alt={message.sender}
        />
      )}
    </div>
  );
};

export default ChatMessage;
