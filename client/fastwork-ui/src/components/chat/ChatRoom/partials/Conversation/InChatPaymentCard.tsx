import React, { useEffect, useState } from "react";
import MediaSkeleton from "./MediaSkeleton";
import { Payment } from "@/types/general";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { supabase } from "@/config/supabaseClient";
import DateParser from "@/functions/dateParser";
import { fetchPayment } from "@/functions/helperFunctions";

interface InChatPaymentCardProps {
    paymentId: string;
    transactionType: 'sent' | 'received';
    createdAt: string;
}

const InChatPaymentCard = ({
    paymentId,
    transactionType,
    createdAt
}: InChatPaymentCardProps) => {
    const dateParser = new DateParser();
    const numberFormater = new Intl.NumberFormat();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, createNewChatRoom, loadChatRoomData, changeChatRoom } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [payment, setPayment] = useState<Payment | null>(null);

    //on mounted
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getPayment(signal);

        return () => controller.abort();
    }, []);

    //methods
        const getPayment = async (signal?: AbortSignal) => {
            setIsLoading(true);
            try{
                const paymentRes = await fetchPayment(paymentId, signal); 
                if(paymentRes) setPayment(paymentRes);
            } catch (error) {
                console.log('error fetching payment', error);
            } finally {
                setIsLoading(false);
            }
        }

    //methods
        const handleOnClickContactSupport = async () => {
            if(activeChatRoom && authUser){
                setIsLoading(true);

                const freelancerId = authUser.profile.id;
                const employerId = 1; //admin profileId

                const { data: chatRooms, error } = await supabase
                    .from('chat_rooms')
                    .select(`*, messages (*)`)
                    .eq('freelancer_id', freelancerId)
                    .eq('employer_id', employerId)
                    .order('id', { ascending: false });

                if (error) {
                    console.log('Supabase fetching error', error);
                    return;
                }

                if(chatRooms.length !== 0){
                    const existedChatRooms = await loadChatRoomData(chatRooms);
                    if(existedChatRooms.length !== 0) changeChatRoom(existedChatRooms[0]);
                } else {
                    const newChatRoom = await createNewChatRoom(
                        activeChatRoom.service_id,
                        activeChatRoom.match_id,
                        freelancerId,
                        employerId
                    );
                    changeChatRoom(newChatRoom);
                }

                setIsLoading(false);
            }
        }

    return (
        <>
            { isLoading ? (
                <MediaSkeleton />
            ) : (
                !payment ? (
                    <div className="relative">
                        <MediaSkeleton />
                        <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0">
                            <button 
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                                onClick={() => getPayment()}    
                            >
                                <span className="">
                                    <ArrowPathIcon className={`size-5 font-bold text-gray-600 ${isLoading ? 'animate-spin' : ''}`}/>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto p-4 bg-gray-50 shadow-md rounded-lg border border-gray-200">
                        <div className="flex flex-row mb-2">
                            <span className="italic text-gray-400 text-xs">
                                System Message
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-gray-800">
                                { transactionType === 'sent' ? 'Payment Sent' : 'Payment Received'}
                            </div>
                            <div className="text-xs text-gray-500">{dateParser.getFormattedDate(createdAt)}</div>
                        </div>
                        <hr className="my-2 border-gray-300" />

                        <div className="mt-3">
                            <div className="flex justify-between text-gray-600 mt-2">
                                <span className="text-sm">For:</span>
                                <span className="font-bold text-sm text-ellipsis whitespace-nowrap max-w-32 overflow-hidden">
                                    { payment.payableType === 'CONTRACT' 
                                        ? 'All Milestone' 
                                        : payment?.milestone?.title
                                    }
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 mt-2">
                                <span className="text-sm">Amount { transactionType === 'sent' ? 'Sent' : 'Received'}:</span>
                                <span className="font-bold text-sm text-green-600">
                                    ${numberFormater.format(payment.amount)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 mt-2">
                                <span className="text-sm">Transaction ID:</span>
                                <span className="font-mono text-xs max-w-32 overflow-auto whitespace-nowrap">
                                    {paymentId}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600 mt-2">
                                <span className="text-sm">Payment Method:</span>
                                <span className="text-sm capitalize">{payment.paymentMethod}</span>
                            </div>
                        </div>

                        <hr className="my-2 border-gray-300" />

                        <div className="flex flex-col mt-3 space-y-2">
                            { transactionType === 'sent' ? (
                                <div className="flex justify-between">
                                    <span className="text-sm font-semibold text-gray-800">Billed To:</span>
                                    <span className="text-sm text-gray-600 capitalize">{payment?.receiver?.lastName}</span>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <span className="text-sm font-semibold text-gray-800">Received From:</span>
                                    <span className="text-sm text-gray-600 capitalize">{payment?.sender?.lastName}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 text-center space-y-3">
                            <p className="text-gray-500 text-xs">
                                If you have any questions, contact our support.
                            </p>
                            <Button
                                fullWidth={true}
                                size="sm"
                                title="Contact Support"
                                color="info"
                                onClick={handleOnClickContactSupport}
                            />
                        </div>
                    </div>
                )
            )}
        </>
    )
};

export default InChatPaymentCard;
