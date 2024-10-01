import React, { ChangeEvent, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useChat } from "@/contexts/chat";
import SafeInput, { SafeInputChangeEvent } from "../SafeInput";
import Button from "../Button";
import { updateMilestoneStatus } from "@/functions/helperFunctions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import moment from "moment";
import httpClient from "@/client/httpClient";

interface PaymentCardProps {
    totalAmount: number;
    isPaid: boolean;
    onPaid: () => void;
}

const PaymentCard = ({
    totalAmount,
    isPaid,
    onPaid,
}: PaymentCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const { 
        latestContract, 
        sendMessage, 
        updateChatRoom 
    } = useChat();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [note, setNote] = useState('');

    const [errorCheckable, setErrorCheckable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //methods
        const handleInputChange = (e: SafeInputChangeEvent) => {
            const { value } = e.target;
            setNote(value);
        }

        const handlePaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
            setPaymentMethod(e.target.value);
        };

        const timerToClose = async () => {
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        const submit = async () => {
            setErrorCheckable(true);

            if(paymentMethod !== ''){
                setIsLoading(true);

                try {
                    const res = await httpClient.post('payment', {
                        paymentMethod: paymentMethod,
                        amount: totalAmount,
                        paymentDate: moment().format('YYYY-MM-DD'),//today
                        payableType: "CONTRACT",
                        payableId: latestContract?.id,//contract_id
                        remarks: note,
                        senderId: authUser?.profile?.id,
                        receiverId: 1 //default admin profile id
                    });

                    console.log(res.data);

                    const firstMilestone = latestContract?.milestones[0];
                    if(firstMilestone){
                        await updateMilestoneStatus(firstMilestone.id, 'waiting_for_submission');
                    }

                    //send message to supabase and update chatroom state
                    const newlySentMessage = await sendMessage('full_payment', res.data, 'system');
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
                    setErrorCheckable(false);
                }
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
                <div className="flex flex-col space-y-1">
                    <div className="w-full">
                        <label
                            htmlFor="select" 
                            className="block text-sm font-medium text-gray-600"
                        >
                            Select Payment Method
                        </label>
                        <select 
                            id="select" 
                            name="select" 
                            className={`mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errorCheckable && paymentMethod === '' ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={paymentMethod}
                            onChange={handlePaymentChange}
                        >
                            <option value="">-- Select --</option>
                            <option value="Payni">Payni</option>
                            <option value="PromptPay QR">PromptPay QR</option>
                            <option value="Karsikorn Bank">Karsikorn Bank</option>
                            <option value="SCB">SCB</option>
                            <option value="Bangkok Bank">Bangkok Bank</option>
                        </select>
                    </div>
                    <span className="text-xs text-gray-500">
                        * Pay via Payni and get 3% discount
                    </span>
                    { errorCheckable && paymentMethod === '' ? (
                        <span className="text-2xs text-red-500">
                            * Please choose a payment method
                        </span>  
                    ) : ''}

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
