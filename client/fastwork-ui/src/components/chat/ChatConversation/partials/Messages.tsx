import { supabase } from "@/app/config/supabaseClient";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { User } from "@/types/users";

interface Message {
    id: number;
    content: string;
    sender_id: number;
    sender: User;
    created_at: Date;
}

const Messages = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const messagesScreenRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    //methods 
        const fetchSenderDetails = async (senderId: number) => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', senderId)
                .single();
        
            if (error) {
                console.error('Error fetching sender details:', error);
                return null;
            }
            return data;
        };

        const fetchAllMessages = async () => {
            const { data: messages, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });
        
            if (error) {
                console.log('Error fetching messages:', error);
                return;
            }
        
            const messagesWithSenders = await Promise.all(messages.map(async (message) => {
                const sender = await fetchSenderDetails(message.sender_id);
                return {
                    ...message,
                    sender
                };
            }));
        
            setMessages(messagesWithSenders);
        };

        const isSentByAuthUser = (senderId: number) : boolean => {
            return senderId === authUser?.id
        }
    
    //subscribe to channel and listen
        useEffect(() => {
            //inital fetch
            fetchAllMessages();

            //listen to new Message
            const messageSubscription = supabase
                .channel("public:messages")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "messages" },
                    (payload: { new: Message }) => {
                        const handleNewMessage = async () => {
                            let newMessage = payload.new;
                            const sender = await fetchSenderDetails(newMessage.sender_id);
                            newMessage = {
                                ...payload.new,
                                sender: sender
                            }
    
                            setMessages( preMessages => {
                                return [
                                    ...preMessages,
                                    newMessage
                                ]
                            });
                        };
                        handleNewMessage();
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(messageSubscription);
            };
        }, []);

        //scroll to bottom on new message
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
            className="flex flex-col space-y-3 py-5 min-h-full"
        >
            { messages.map( msg => 
                <div 
                    key={msg.id} 
                    className={`flex flex-row
                        ${ isSentByAuthUser(msg.sender_id) ? 'justify-end' : 'justify-start' }
                    `}
                >
                    <div className={`flex items-end mx-3 ${ isSentByAuthUser(msg.sender_id)
                        ? 'flex-row-reverse'
                        : 'flex-row'
                    }`}>
                        <div>
                            {/* avatar */}
                            <img src={'/avatar.svg'} alt="Profile Pic" className="h-8 w-8 rounded-full" />
                        </div>
                        <div className={`flex items-center justify-center p-3 mx-2 rounded-xl break-words max-w-sm ${ isSentByAuthUser(msg.sender_id)
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
