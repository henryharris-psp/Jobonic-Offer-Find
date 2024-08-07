import { supabase } from "@/app/config/supabaseClient";
import { useChat } from "@/contexts/chat";
import React, { useEffect, useRef, useState } from "react";

interface Message {
    id: number;
    content: string;
    sender_id: number;
    created_at: Date;
}

const Messages = () => {
    const { currentUser } = useChat();
    const messagesScreenRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    //methods 
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*, sender_id(*)')
                .order('created_at', { ascending: true });
            if (error) {
                console.log('error', error);
            } else {
                setMessages(data)
            }
        };

        const isSentByCurrentUser = (senderId: number) : boolean => {
            return senderId === currentUser?.id
        }
    
    //subscribe to channel and listen
        useEffect(() => {
            fetchMessages();

            const messageSubscription = supabase
                .channel("public:messages")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "messages" },
                    (payload: { new: Message }) => {
                        setMessages( preMessages => {
                            return [
                                ...preMessages,
                                payload.new
                            ]
                        });
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(messageSubscription);
            };
        }, []);


    useEffect( () => {
        if(messages.length !== 0 && messagesScreenRef.current) {
            messagesScreenRef.current.scrollIntoView({ 
                behavior: "smooth", 
                block: "end"
            });
          }
    }, [messages.length]);

    return (
        <div 
            ref={messagesScreenRef} 
            className="flex flex-col space-y-3 py-5"
        >
            { messages.map( msg => 
                <div 
                    key={msg.id} 
                    className={`flex flex-row
                        ${ isSentByCurrentUser(msg.sender_id) ? 'justify-end' : 'justify-start'}
                    `}
                >
                    <div className={`flex items-end mx-3 ${ isSentByCurrentUser(msg.sender_id)
                        ? 'flex-row-reverse'
                        : 'flex-row'
                    }`}>
                        <div>
                            {/* avatar */}
                            <img src={'/avatar.svg'} alt="Profile Pic" className="h-8 w-8 rounded-full" />
                        </div>
                        <div className={`flex items-center justify-center p-3 mx-2 rounded-xl break-words max-w-sm ${ isSentByCurrentUser(msg.sender_id)
                            ? "bg-[#0C2348] text-white"
                            : "bg-gray-200 text-black"
                        }`}>
                            <span className="text-xs break-words">
                                {msg.content}
                            </span>
                        </div>
                    </div>
                </div>  
            )}

        </div>
        
    );
};

export default Messages;
