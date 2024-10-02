import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { PayoutNegotiation } from "@/types/general";
import { ArrowLongRightIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import MediaSkeleton from "./MediaSkeleton";

interface InChatPayoutNegotiationCardProps {
    payoutNegotiationId: string;
}

const InChatPayoutNegotiationCard = ({
    payoutNegotiationId
}: InChatPayoutNegotiationCardProps) => {
    const { activeChatRoom, latestContract } = useChat();

    const [isLoading, setIsLoading] = useState(false);
    const [payoutNegotiation, setPayoutNegotiation] = useState<PayoutNegotiation | null>(null);

    //on mounted
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getPayoutNegotiation(signal);

        return () => controller.abort();
    }, []);

    //methods
        const getPayoutNegotiation = async (signal?: AbortSignal) => {
            setIsLoading(true);
            try{
                const payoutNegotiationRes = await httpClient.get(`payment-out/${payoutNegotiationId}`, { signal });
                console.log(payoutNegotiationRes.data); 
                setPayoutNegotiation(payoutNegotiationRes.data);
            } catch (error) {
                console.log('error fetching payout_negotiation', error);
            } finally {
                setIsLoading(false);
            }
        }

    //methods
        const handleOnClickAccept = () => {
            console.log('accept');
        }

        const handleOnClickReject = () => {
            console.log('reject');
        }

        const handleOnClickNegotiate = () => {
            console.log('negotiate')
        }

    return (
        <>
            { isLoading ? (
                <MediaSkeleton />
            ) : (
                !payoutNegotiation ? (
                    <div className="relative">
                        <MediaSkeleton />
                        <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0">
                            <button 
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                                onClick={() => getPayoutNegotiation()}    
                            >
                                <span className="">
                                    <ArrowPathIcon className={`size-5 font-bold text-gray-600 ${isLoading ? 'animate-spin' : ''}`}/>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="min-w-72 bg-white shadow-md rounded-lg border border-gray-200 space-y-4">                        
                        <div className="flex flex-col space-y-5 p-4">
                            
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    { payoutNegotiation?.profileId === activeChatRoom?.employer_id ? 'Freelancer': 'Employer' } Wants to End Contract
                                </h3>
                                <div className="text-sm text-gray-500 space-x-1">
                                    <span>Custom amount offered for in-progress milestone:</span>
                                    <span className="font-medium text-[#71BAC7]">$450</span>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1">
                            { latestContract?.milestones.map( milestone => 
                                <div 
                                    key={milestone.id} 
                                        className={`flex flex-row text-sm items-center space-x-1 font-semibold ${
                                            milestone.status === 'waiting_for_submission' ? 'text-[#D0693B]' : 'text-gray-500'
                                            
                                        } ${ milestone.status === 'not_started' ? 'opacity-50' : 'opacity-1' }`}
                                >
                                    { milestone.status === 'waiting_for_submission' ? (
                                        <ArrowLongRightIcon className="size-3"/>
                                    ) : ''}
                                    <span>
                                        { milestone.title }
                                    </span>
                                </div>
                            )}
                                
                            </div>

                            <div className="flex flex-col space-y-2">
                                <span className="text-xs text-gray-600">
                                    The employer has offered to end the contract and pay the custom
                                    amount for the in-progress milestone.
                                </span>
                                <span className="text-xs text-gray-500">
                                    Do you want to accept or negotiate?
                                </span>
                            </div>

                            {/* buttons */}
                            <div className="flex flex-row justify-between items-center space-x-1">
                                <Button
                                    size="sm"
                                    title="Negotitate"
                                    onClick={handleOnClickNegotiate}
                                />
                                <div className="flex flex-row justify-between space-x-1 items-center">
                                    <Button
                                        size="sm"
                                        color="success"
                                        title="Accept & End"
                                        onClick={handleOnClickAccept}
                                    />
                                    <Button
                                        size="sm"
                                        color="danger"
                                        title="Decline"
                                        onClick={handleOnClickReject}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default InChatPayoutNegotiationCard;
