import React, { ChangeEvent, useState } from "react";
import Button from "./Button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useChat } from "@/contexts/chat";

interface PaymentCardProps {
    totalAmount: number
}

const paymentSuccessMessage = `Payment is successfully transfered to Jobonic. Jobonic will sent to freelancer for each successful milestone`;

const PaymentCard = ({
    totalAmount
}: PaymentCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const { sendMessage, updateChatRoom } = useChat();
    const [inputs, setInputs] = useState({
        amount: '',
        description: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    //methods
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }

        const submit = async () => {
            try {
                setIsLoading(true);
        
                // Delay for 3 seconds (3000ms)
                await new Promise(resolve => setTimeout(resolve, 3000));
        
                setIsLoading(false);
                setIsPaid(true);
        
                const newlySentMessage = await sendMessage('text', paymentSuccessMessage);
                
                if (newlySentMessage) {
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'waiting_for_submission'
                    });
                }
            } catch (error) {
                console.error('Error during submit process:', error);
            }
        }
        
    return (
        <div className="flex flex-col bg-white rounded-xl">
            <div className="flex flex-col p-5 space-y-3">

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
                    <span className="font-bold text-gray-800 text-xl">
                        $ { numberFormater.format(totalAmount) }
                    </span>

                </div>

                <div className="w-full">
                    <label htmlFor="select" className="block text-sm font-medium text-gray-700">Select Payment Method</label>
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
                    <span className="text-gray-600">
                        Write Note
                    </span>
                    <textarea
                        placeholder="Type..."
                        name="description"
                        value={inputs.description}
                        onChange={handleInputChange}
                        className="border h-32 text-sm border-gray-300 p-3 rounded-lg w-80"
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
