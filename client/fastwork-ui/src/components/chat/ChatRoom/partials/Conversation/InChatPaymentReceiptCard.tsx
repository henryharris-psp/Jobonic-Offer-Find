import React, { useEffect, useState } from 'react'
import { useChat } from '@/contexts/chat';
import MediaSkeleton from './MediaSkeleton';
import Button from '@/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Payment } from '@/types/general';
import DateParser from '@/functions/dateParser';

interface InChatPaymentReceiptCardProps {
    transactionId: string;
}

const InChatPaymentReceiptCard = ({
    transactionId,
}: InChatPaymentReceiptCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const dateParser = new DateParser();
    const { activeChatRoom } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [payment, setPayment] = useState<Payment | null>(null);

    //on mounted
    useEffect(() => {
        getPayment();
    }, []);

    //methods
        const getPayment = async () => {
            const controller = new AbortController();
            const signal = controller.signal;

            setIsLoading(true);
            try{
                //get_payment
                // const contractRes = await fetchPayment(transactionId, signal);
                const contractRes = {
                    transactionId: transactionId,
                    amount: 123,
                    billedTo: 'Jobonic',
                    date: '31/12/2024',
                    paymentMethod: 'Payni'
                }
                if(contractRes) setPayment(contractRes);
            } catch (error) {
                console.log('error fetching contract', error);
            } finally {
                setIsLoading(false);
            }
        }

        const handleOnClickContactSupport = () => {
            console.log('contact support');
        }
        
    return (
        <>
            { isLoading ? (
                <MediaSkeleton/>
            ) : (
                !payment ? (
                    <div className="relative">
                        <MediaSkeleton/>
                        <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0">
                            <button 
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                                onClick={getPayment}    
                            >
                                <span className="">
                                    <ArrowPathIcon className={`size-5 font-bold text-gray-600 ${isLoading ? 'animate-spin' : ''}`}/>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto p-4 bg-gray-50 shadow-md rounded-lg border border-gray-200">
                        <div className="flex flex-row mb-2">
                            <span className="italic text-gray-400 text-2xs">
                                System Message
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-gray-800">
                                Payment Receipt
                            </div>
                            <div className="text-xs text-gray-500">{payment.date}</div>
                        </div>
                        <hr className="my-2 border-gray-300" />

                        <div className="mt-3">
                            <div className="flex justify-between text-gray-600">
                                <span className="text-sm">Amount Paid:</span>
                                <span className="font-bold text-sm text-green-600">
                                    ${numberFormater.format(payment.amount)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 mt-2">
                                <span className="text-sm">Transaction ID:</span>
                                <span className="font-mono text-xs">
                                    {payment.transactionId}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600 mt-2">
                                <span className="text-sm">Payment Method:</span>
                                <span className="text-sm">{payment.paymentMethod}</span>
                            </div>
                        </div>

                        <hr className="my-2 border-gray-300" />

                        <div className="mt-3">
                            <div className="flex justify-between mt-2">
                                <span className="text-sm font-semibold text-gray-800">Billed To:</span>
                                <span className="text-sm text-gray-600">{payment.billedTo}</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center space-y-3">
                            <p className="text-gray-500 text-xs">
                                If you have any questions, contact our support.
                            </p>
                            <Button
                                fullWidth
                                color="info"
                                size="sm"
                                title="Contact Support"
                                onClick={() => console.log('gg')}
                            />
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default InChatPaymentReceiptCard