import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useChat } from "@/contexts/chat";
import SafeInput, { SafeInputChangeEvent } from "../SafeInput";
import Button from "../Button";

interface PaymentCardProps {
    totalAmount: number;
    onPaid: () => void;
}

const PaymentCard = ({
    totalAmount,
    onPaid
}: PaymentCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const { sendMessage, updateChatRoom } = useChat();
    const [note, setNote] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    //methods
        const handleInputChange = (e: SafeInputChangeEvent) => {
            const { value } = e.target;
            console.log(value);
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
                const newlySentMessage = await sendMessage('system', 'payment_success');
                if (newlySentMessage) {
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'to_submit'
                    });
                }

                await timerToClose();
                onPaid();
            } catch (error) {
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
                <div className="flex flex-row items-center justify-between space-y-1">
                    <span className="text-gray-600">
                        Total Amount to pay
                    </span>
                    <span className="font-bold text-green-600 text-xl">
                        ${numberFormater.format(totalAmount)}
                    </span>

                </div>

                {/* payment selection */}
                <div className="w-full">
                    <label htmlFor="select" className="block text-sm font-medium text-gray-600">Select Payment Method</label>
                    <select id="select" name="select" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="option1">-- Select --</option>
                        <option value="option2">Payni</option>
                        <option value="option3">PromptPay QR</option>
                        <option value="option3">Karsikorn Bank</option>
                        <option value="option3">SCB</option>
                        <option value="option3">Bangkok Bank</option>
                    </select>

                    <span className="text-xs text-gray-500">
                        * Pay via Payni and get 3% discount
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
                        title={ isLoading ? 'Payment Processing...' : 'Pay Now'}
                        onClick={submit}
                        disabled={isLoading || isPaid}
                    />
            </div>
        </div>
    );
};

export default PaymentCard;
