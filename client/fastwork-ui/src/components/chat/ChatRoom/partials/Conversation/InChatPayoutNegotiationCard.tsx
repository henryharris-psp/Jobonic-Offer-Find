import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import { useChat } from "@/contexts/chat";
import { PayoutNegotiation } from "@/types/general";
import { ArrowLongRightIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo, useState } from "react";
import MediaSkeleton from "./MediaSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Modal from "@/components/Modal";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";

interface InChatPayoutNegotiationCardProps {
    payoutNegotiationId: string;
    isSentByAuthUser: boolean;
    onClose?: () => void
}

const InChatPayoutNegotiationCard = ({
    payoutNegotiationId,
    isSentByAuthUser,
    onClose
}: InChatPayoutNegotiationCardProps) => {
    const { activeChatRoom, latestContract, sendMessage, updateChatRoom } = useChat();
    const latestPayoutNegotiation = latestContract?.latestPayoutNegotiation;
    const { authUser } = useSelector((state: RootState) => state.auth );
    const [isLoading, setIsLoading] = useState(false);
    const [payoutNegotiation, setPayoutNegotiation] = useState<PayoutNegotiation | null>(null);
    const [showNewPayoutOfferModal, setShowNewPayoutOfferModal] = useState(false);

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
                const payoutNegotiationRes = await httpClient.get(`payment-out/get-by-id/${payoutNegotiationId}`, { signal });
                console.log(payoutNegotiationRes.data); 
                setPayoutNegotiation(payoutNegotiationRes.data);
            } catch (error) {
                console.log('error fetching payout_negotiation', error);
            } finally {
                setIsLoading(false);
            }
        }

    //methods                    
        //accept_contract
        const handleOnClickAccept = async () => {
            if(payoutNegotiation){
                if(confirm("Are you sure to accept end the contract?")){
                    try{
                        //on_accept_to_end
                        await httpClient.put(`payment-out/${payoutNegotiationId}`, {
                            ...payoutNegotiation,
                            acceptBy: [...payoutNegotiation.acceptBy, authUser?.profile?.id]
                        });

                        //TODO: tranfer payment
                        const newlySentMessage = await sendMessage('text', 'Jobonic has transfered your approved payout to freelancer and also your left credit back to your bank account.');
                        // const newlySentMessage = await sendMessage('payment_request', activeChatRoom?.match_id.toString(), 'system');
                        if(newlySentMessage){
                            await updateChatRoom(newlySentMessage.room_id, {
                                status: 'cancelled'
                            });
                        }

                        onClose?.();
                    } catch (error) {
                        console.log('error', error);
                    }
                }
            }
        }

        const handleOnClickReject = async () => {
            try {
                const newlySentMessage = await sendMessage('text', 'Rejected to cancel contract.');
                if(newlySentMessage){
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'to_submit'
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        const handleOnClickNegotiate = () => {
            setShowNewPayoutOfferModal(true);
        }

        const [newOfferPrice, setNewOfferPrice] = useState('');
        const handleOnInputChange = (event: SafeInputChangeEvent) => {
            const { value } = event.target;
            setNewOfferPrice(value);
        }

        const submit = async () => {
            if(payoutNegotiation){
                setIsLoading(true);
                try{
                    const res = await httpClient.post('payment-out', {
                        checkpointId: payoutNegotiation.checkpointId,
                        contractId: payoutNegotiation.contractId,
                        acceptBy: [authUser?.profile.id],
                        profileId: authUser?.profile.id,
                        price: newOfferPrice
                    });
    
                    const payoutNegotiationId = res.data;
                    const newlySentMessage = await sendMessage('payout_negotiation', payoutNegotiationId);

                    //TODO: not needed
                    if(newlySentMessage){
                        await updateChatRoom(newlySentMessage.room_id, {
                            status: 'contract_termination'
                        });
                    }
                } catch (error) {
                    console.log('error on ending contract', error);
                } finally {
                    setIsLoading(false);
                }

                onClose?.();
            }
        }

        const showActionButtons = useMemo( () => {
            if(!latestPayoutNegotiation) return false;
            return !isSentByAuthUser && latestPayoutNegotiation?.id === payoutNegotiationId && latestPayoutNegotiation.acceptBy.length < 2;
        }, [isSentByAuthUser, latestPayoutNegotiation, payoutNegotiationId]);

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
                                        <span className="font-medium text-[#71BAC7]">$ { payoutNegotiation.price }</span>
                                    </div>
                                </div>
    
                                <div className="flex flex-col space-y-1">
                                { latestContract?.milestones.map( milestone => 
                                    <div 
                                        key={milestone.id} 
                                            className={`flex flex-row text-sm items-center space-x-1 font-semibold ${
                                                milestone.id === payoutNegotiation.checkpointId ? 'text-[#D0693B]' : 'text-gray-500'
                                                
                                            } ${ milestone.status === 'not_started' ? 'opacity-50' : 'opacity-1' }`}
                                    >
                                        { milestone.id === payoutNegotiation.checkpointId ? (
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
                                {/* TODO: urgent */}
                                { showActionButtons ? (
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
                                ) : ''}
    
                            </div>
                        </div>
                    )
                )}

                <Modal
                    isOpen={showNewPayoutOfferModal}
                    onClose={() => setShowNewPayoutOfferModal(false)}
                >
                    <div className="bg-white rounded-xl">
                        <div className="flex flex-col justify-center p-5 space-y-5">
                            <span className="font-bold text-2xl text-center">
                                Update Payout Price to End Contact
                            </span>

                            <div className="flex flex-col space-y-3">
                                <SafeInput
                                    title="New Payout Price"
                                    value={newOfferPrice}
                                    onChange={handleOnInputChange}
                                    placeholder="Enter Price"
                                />
                                <Button
                                    color="success"
                                    title="Offer With New Price"
                                    onClick={submit}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>

            </>
        );
};

export default InChatPayoutNegotiationCard;
