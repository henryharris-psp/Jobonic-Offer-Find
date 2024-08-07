import { supabase } from "@/app/config/supabaseClient";
import React, { useEffect, useRef, useState } from "react";

interface Sender {
    id: number;
    name: string;
    created_at: Date;
}

interface Message {
    id: number;
    content: string;
    sent_by: Sender;
    created_at: Date;
}

const Messages = () => {
    const currentUser = {
        id: 1,
        name: 'Logged in User',
    }

    const messagesScreenRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    //methods 
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*, sent_by(*)')
                .order('created_at', { ascending: true });
            if (error) {
                console.log('error', error);
            } else {
                setMessages(data)
            }
        };

        const isFromCurrentUser = (msgId: number) => {
            return msgId % 2 === 0;
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
            className="flex flex-col space-y-2 py-5"
        >
            { messages.map( msg => 
                <div 
                    key={msg.id} 
                    className={`flex flex-row
                        ${ isFromCurrentUser(msg.id) ? 'justify-end' : 'justify-start'}
                    `}
                >
                    <div className={`flex items-end mx-3 ${ isFromCurrentUser(msg.id)
                        ? 'flex-row-reverse'
                        : 'flex-row'
                    }`}>
                        <div>
                            {/* avatar */}
                            <div className="flex items-center justify-center h-8 w-8 bg-orange-400 rounded-full">
                                <span className="text-xs text-white">
                                    user
                                </span>
                            </div>
                        </div>
                        <div className={`flex items-center justify-center p-3 mx-2 rounded-xl break-words max-w-sm ${ isFromCurrentUser(msg.id)
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
