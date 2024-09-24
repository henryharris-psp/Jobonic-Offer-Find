import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useChat } from "@/contexts/chat";
import httpClient from "@/client/httpClient";

interface MilestonePaymentConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    leftAmount: number;
    amountToPay: number;
}

const MilestonePaymentConfirmationDialog = ({
    isOpen,
    onClose,
    leftAmount,
    amountToPay
}: MilestonePaymentConfirmationDialogProps) => {
    const { sendMessage } = useChat();

    const handleOnConfirm = async () => {
        try{
            await sendMessage('milestone_payment', 'transaction_id', 'system');
            onClose();
        } catch (error) {
            console.log(error);    
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
                        <div className="flex flex-row items-center space-x-2">
                            <span className="text-gray-600 font-semibold text-center">
                                Your credit on Jobonic:
                            </span>
                            <span className="text-[#D0693B] font-semibold text-center">
                                ${leftAmount}
                            </span>
                        </div>
                        
                        <div className="flex flex-row items-center space-x-2">
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
                                title="Yes, I confirm and agree to Pay"
                                onClick={handleOnConfirm}
                            />
                            <Button
                                fullWidth
                                variant="outlined"
                                size="sm"
                                title="No, cancel"
                                onClick={onClose}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MilestonePaymentConfirmationDialog;
