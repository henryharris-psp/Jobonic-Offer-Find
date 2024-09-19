import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useChat } from "@/contexts/chat";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import Button from "@/components/Button";
import httpClient from "@/client/httpClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PaymentCardProps {
    totalAmount: number;
    onPaid: () => void;
    
}

const PaymentCard = ({
    totalAmount,
    onPaid
}: PaymentCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const { activeChatRoom, sendMessage, updateChatRoom } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth );
    const [note, setNote] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    //methods
        const handleInputChange = (e: SafeInputChangeEvent) => {
            const { value } = e.target;
            setNote(value);
        }

        const processPayment = async () => {
            
            return new Promise(resolve => setTimeout(resolve, 3000));
        }

        const timerToClose = async () => {
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        const submit = async () => {
            setIsLoading(true);

            try {
                await processPayment();
                setIsPaid(true);
                const newlySentMessage = await sendMessage('payment_receipt', 'transaction_id', 'system');
                if (newlySentMessage) {
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'to_submit'
                    });
                }

                await timerToClose();
                onPaid();
            } catch (error) {
                //TODO: handle payment fail errors such as unsufficient balance or payment rejected
                console.error('Error during submit process:', error);
            } finally {
                setIsLoading(false);
            }
        }
        
    return (
        <div className="flex flex-col bg-white rounded-xl min-w-80">
            <div className="flex flex-col p-5 space-y-5">

                <div className="flex justify-center items-center space-x-2">
                    { isPaid ? (
                        <CheckCircleIcon className="size-9 text-green-500"/>
                    ) : ''}
                    <span className="font-bold text-xl">
                        {isPaid ? 'Payment Successful' : 'Please make a payment'}
                    </span>
                </div>
                <div className="flex flex-row items-center justify-between space-y-1 space-x-2">
                    <span className="text-gray-600">
                        Total Amount To Pay For Milestones
                    </span>
                    <span className="font-bold text-green-600 text-xl">
                        ${numberFormater.format(totalAmount)}
                    </span>

                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-gray-600">
                        Write Note
                    </span>
                    <SafeInput
                        type="textarea"
                        placeholder="type something..."
                        value={note}
                        onChange={handleInputChange}
                    />
                </div>
                    <Button
                        title={ isLoading ? 'Payment Processing...' : 'Request Payment For Freelancer'}
                        onClick={submit}
                        disabled={isLoading || isPaid}
                    />
            </div>
        </div>
    );
};

export default PaymentCard;
