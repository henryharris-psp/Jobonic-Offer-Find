import React, { useMemo, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useChat } from "@/contexts/chat";
import SafeInput, { SafeInputChangeEvent } from "../SafeInput";
import Button from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import moment from "moment";
import httpClient from "@/client/httpClient";
import { BootstrapColor } from "@/types/general";
import axios from "axios";

type PaymentStatus = 'NOT_PAID' | 'PENDING' | 'SUCCESS' | 'CANCELLED';

interface PaymentStatusMapProps {
    title: string;
    icon: JSX.Element | null;
    buttonTitle: string;
    buttonColor: BootstrapColor;
}

const paymentStatusMap: Record<PaymentStatus, PaymentStatusMapProps> = {
    'NOT_PAID': {
        title: 'Please make a payment',
        icon: null,
        buttonTitle: 'Pay Now',
        buttonColor: 'warning'
    },
    'PENDING': {
        title: 'Payment is Pending',
        icon: <ClockIcon className="size-8 text-yellow-500"/>,
        buttonTitle: 'Verify Your Payment',
        buttonColor: 'info'
    },
    'SUCCESS': {
        title: 'Payment Successful',
        icon: <CheckCircleIcon className="size-8 text-green-500"/>,
        buttonTitle: 'Successfully Paid',
        buttonColor: 'success'
    },
    'CANCELLED': {
        title: 'Please make a payment again',
        icon: null,
        buttonTitle: 'Pay Now',
        buttonColor: 'warning'
    },
}

interface PaymentCardProps {
    onPaid: () => void;
}

const PaymentCard = ({
    onPaid,
}: PaymentCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const {
        latestContract, 
        sendMessage, 
        sendSignal,
        updateChatRoom 
    } = useChat();

    const payment = latestContract?.payment || null;
    const status = !payment ? 'NOT_PAID' : payment.status;

    const { authUser } = useSelector((state: RootState) => state.auth);
    const [note, setNote] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //computed
        const { totalAmount, milestones } = useMemo( () => {
            if(!latestContract){
                return {
                    totalAmount: 0,
                    milestones: []
                }
            }
            const { price, milestones } = latestContract;
            return {
                totalAmount: price,
                milestones: milestones
            };
        }, [latestContract]);

    //methods
        const handleInputChange = (e: SafeInputChangeEvent) => {
            const { value } = e.target;
            setNote(value);
        }

        const openNewWindow = (payniUrl: string) => {
            const url = payniUrl;
            const windowName = '_blank';
            const windowFeatures = 'width=800,height=600,scrollbars=yes,resizable=yes';
    
            const newWindow = window.open(url, windowName, windowFeatures);
            if (newWindow) newWindow.opener = window;
        };

        const handleOnPaymentSucceed = async () => {
            if(payment?.id){
                const newlySentMessage = await sendMessage('full_payment', payment.id, 'system');
                if (newlySentMessage) {
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'to_submit'
                    });
                }
                onPaid();
            }
        }

        const initiatePayment = async () => {
            setIsLoading(true);

            try {
                const res = await httpClient.post('payment', {
                    paymentMethod: 'payni',
                    amount: totalAmount,
                    paymentDate: moment().format('YYYY-MM-DD'),//today
                    payableType: "CONTRACT",
                    payableId: latestContract?.id,//contract_id
                    remarks: note,
                    senderId: authUser?.profile?.id,
                    receiverId: 1 //default admin profile id
                });

                const { payni } = res.data;
                const { redirectUrl } = payni;

                if(redirectUrl){
                    openNewWindow(redirectUrl);
                    sendSignal();
                }
            } catch (error) {
                console.error('Error during submit process:', error);
            } finally {
                setIsLoading(false);
            }
        }

        const verifyPayment = async () => {
            if(payment?.transactionId){
                setIsLoading(true);

                try {
                    const res = await axios.get(`https://api-payni.laconic.co.th/api/external/status/${payment?.transactionId}`)
                    const status: 'PENDING' | 'SUCCESS' | 'CANCELLED' = res.data.Status;

                    switch (status) {
                        case 'PENDING': {
                            setStatusMessage('Payment is still pending');
                            break;
                        }
                        case 'SUCCESS': {
                            handleOnPaymentSucceed();
                            break;
                        }
                        case 'CANCELLED': {
                            setStatusMessage('Payment Operation Failed!');
                            break;
                        }
                                                
                        default:
                            break;
                    }
                    
                } catch {
                    if(payment){
                        
                    } else {
                        //if payment not found, reopen window to make payment
                        initiatePayment();
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        }

    return (
        <div className="flex flex-col bg-white rounded-xl min-w-80">
            <div className="flex flex-col p-5 space-y-5">

                <div className="flex flex-col space-y-2 items-center">
                    
                    { status === 'CANCELLED' ? (
                        <div className="flex justify-center text-red-500 items-center space-x-1">
                            <XCircleIcon className="size-5"/>
                            <span className="text-xs">
                                Payment Operation Failed!
                            </span>
                        </div>
                    ) : ''}
                    <div className="flex justify-center items-center space-x-2">
                        { paymentStatusMap[status].icon }
                        <span className="font-bold text-xl">
                            { paymentStatusMap[status].title }
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between space-y-1">
                    <span className="text-gray-800">
                        Total Amount to pay
                    </span>
                    <span className="font-bold text-green-600 text-xl">
                        ${numberFormater.format(totalAmount)}
                    </span>
                </div>

                <div className="flex flex-col space-y-3">
                    <span className="text-sm text-gray-600 font-medium">
                        By Milestone
                    </span>
                    <div className="flex flex-col space-y-2">
                        { milestones.map( milestone => 
                            <div 
                                key={milestone.id}
                                className="flex flex-row text-xs space-x-2 text-gray-500"
                            >
                                <span className="flex-1">
                                    { milestone.title }
                                </span>
                                <span>
                                    ${ numberFormater.format(milestone.price) }
                                </span>
                            </div>  
                        )}
                    </div>
                </div>

                { !['PENDING', 'SUCCESS'].includes(status) ? (
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
                ) : ''}

                <Button
                    title={ !isLoading ? 
                        paymentStatusMap[status].buttonTitle
                        : status === 'PENDING' ? 'Payment Processing...' : 'Verifying Payment...'
                    }
                    color={paymentStatusMap[status].buttonColor}
                    onClick={() => status === 'PENDING' ? verifyPayment() : initiatePayment()}
                    disabled={isLoading || status === 'SUCCESS'}
                />

            </div>
        </div>
    );
};

export default PaymentCard;
