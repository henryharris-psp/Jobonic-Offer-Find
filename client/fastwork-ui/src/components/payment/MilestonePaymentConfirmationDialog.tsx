import React, { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useChat } from "@/contexts/chat";
import httpClient from "@/client/httpClient";
import { updateMilestoneStatus } from "@/functions/helperFunctions";
import testClient from "@/client/testClient";

interface MilestonePaymentConfirmationDialogProps {
    milestoneId: string,
    isOpen: boolean;
    onClose: () => void;
    leftAmount: number;
    amountToPay: number;
}

const MilestonePaymentConfirmationDialog = ({
    milestoneId,
    isOpen,
    onClose,
    leftAmount,
    amountToPay
}: MilestonePaymentConfirmationDialogProps) => {
    const { latestContract } = useChat();
    const { sendMessage, updateChatRoom } = useChat();
    const [ isLoading, setIsLoading ] = useState(false);

    const processPayment = async () => {
        return new Promise(resolve => setTimeout(resolve, 3000));
    }

    const handleOnConfirm = async () => {
        setIsLoading(true);
        try{
            await processPayment();
            // await testClient.post('payments/payout', {
            //     amount: 123,
            //     paymentMethod: 'payni',
            //     payableType: 'match', // match & milestone
            //     payableId: activeChatRoom?.match_id,
            //     note: 'some dummy note'
            // });

            const allMilestones = latestContract?.milestones ?? [];
            const targetMilestone = allMilestones.find( e => e.id === milestoneId );
            
            if(targetMilestone){
                await updateMilestoneStatus(targetMilestone, 'paid');
                const newlySentMessage = await sendMessage('milestone_payment', 'transaction_id', 'system');

                //TODO: change after api update
                const upcomingMilestones = allMilestones.filter( e => e.id !== milestoneId && e.description === 'not_started' );
                
                //if all milestone are completed
                if(upcomingMilestones.length === 0){
                    if(newlySentMessage){
                        await updateChatRoom(newlySentMessage.room_id, {
                            status: 'to_review'
                        });
                    }
                } else {
                    //or switch to next milestone
                    const nextMilestone = upcomingMilestones[0];
                    if(nextMilestone){
                        await updateMilestoneStatus(nextMilestone, 'waiting_for_submission');
                    }
                }

            }
            onClose();
        } catch (error) {
            console.log(error);    
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
            >
                <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                    <span className="font-bold text-2xl text-center">
                        Are you sure you want to approve this milestone?
                    </span>

                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-gray-600 font-semibold text-center">
                                Your credit on Jobonic:
                            </span>
                            <span className="text-[#D0693B] font-semibold text-center">
                                ${leftAmount}
                            </span>
                        </div>
                        
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-gray-600 font-semibold text-center">
                                Payment for the current milestone:
                            </span>
                            <span className="text-[#71BAC7] font-semibold text-center">
                                ${amountToPay}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <span className="text-xs text-gray-500 font-semibold text-center">
                            By confirming, Jobonic will release ${amountToPay} to your service provider for the current milestone.
                        </span>

                        <div className="flex flex-row items-center gap-2 flex-wrap">
                            <Button
                                fullWidth
                                size="sm"
                                title={ isLoading ? 'Payment Processing...' : 'Yes, I confirm and agree to Pay'}
                                onClick={handleOnConfirm}
                                disabled={isLoading}
                            />
                            <Button
                                fullWidth
                                variant="outlined"
                                size="sm"
                                title="No, cancel"
                                onClick={onClose}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MilestonePaymentConfirmationDialog;
