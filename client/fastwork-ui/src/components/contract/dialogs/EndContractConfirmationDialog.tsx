import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../Modal";
import Button from "../../Button";
import { useChat } from "@/contexts/chat";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import httpClient from "@/client/httpClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMilestoneStatus } from "@/functions/helperFunctions";

interface EndContractConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
}

const EndContractConfirmationDialog = ({
    isOpen,
    onClose,
    onCancel,
}: EndContractConfirmationDialogProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { latestContract, sendMessage, updateChatRoom } = useChat();
    const currentMilestone = latestContract?.currentMilestone;

    const [price, setPrice] = useState<string>('0');
    const [hasPriceError, setHasPriceError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //to set default price
        useEffect( () => {
            if(currentMilestone){
                const currentMilestonePrice = latestContract.currentMilestone?.price.toString() ?? '0';
                setPrice(currentMilestonePrice);
            }
        }, [currentMilestone]);

    //methods
        const handleOnChangePrice = (event: SafeInputChangeEvent) => {
            const price = event.target.value;
            const min = 0;
            const max = currentMilestone?.price ?? 0;

            const isInRange = Number(price) >= min && Number(price) <= max

            setHasPriceError(!isInRange);
            if(isInRange) setPrice(price);
        }

        const handleOnClickConfrim = async () => {
            if(currentMilestone){
                setIsLoading(true);
                try{
                    const res = await httpClient.post('payment-out', {
                        checkpointId: currentMilestone.id,
                        contractId: latestContract.id,
                        acceptBy: [authUser?.profile.id],
                        profileId: authUser?.profile.id,
                        price: price
                    });
    
                    await updateMilestoneStatus(currentMilestone.id, 'not_started');

                    const payoutNegotiationId = res.data;
                    const newlySentMessage = await sendMessage('payout_negotiation', payoutNegotiationId);
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

                onClose();
            }
        }

        const handleOnClickCancel = () => {
            onClose();
        }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onCancel}
        >
            <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                <span className="font-bold text-2xl text-center">
                    Are you sure you want to end contract?
                </span>

                <div className="flex flex-col space-y-5 items-center">
                    <span className="text-md text-[#71BAC7] font-semibold text-center">
                        The milestone
                        <span className="underline mx-1">
                            { currentMilestone?.title }
                        </span>
                        is in progress
                    </span>

                    <div className="flex flex-row items-center gap-3">
                        <span className="text-sm text-gray-600 font-semibold text-center max-w-96">
                            What is your first offer for this ongoing milestone to negotiate ending the contract?
                        </span>
                        <div className="max-w-32 min-w-20 overflow-hidden">
                            <SafeInput
                                placeholder="Appeal Payout"
                                type="decimal"
                                value={price}
                                onChange={handleOnChangePrice}
                                errors={[
                                    {
                                        show: hasPriceError,
                                        msg: `Maximum fare is ${currentMilestone?.price}`
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-400 font-semibold text-center">
                        If you confrim to end the contract, a form to negotiate payout price will be generated.
                    </span>

                    <span className="text-xs text-gray-400 font-semibold text-center">
                        Both users must agree on the payout price for the current milestone in order to end the contract.
                    </span>
                </div>
                
                <div className="flex flex-row items-center gap-2 flex-wrap">
                    <Button
                        fullWidth
                        size="sm"
                        title={isLoading ? 'Requesting...' : 'Yes, end collaboration'}
                        onClick={handleOnClickConfrim}
                        disabled={isLoading}
                    />
                    <Button
                        fullWidth
                        variant="outlined"
                        size="sm"
                        title="No, continue collaboration"
                        onClick={handleOnClickCancel}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default EndContractConfirmationDialog;
