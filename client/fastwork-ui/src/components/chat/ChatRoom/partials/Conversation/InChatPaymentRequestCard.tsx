import Button from "@/components/Button";
import Modal from "@/components/Modal";
import PaymentCard from "@/components/payment/PaymentCard";
import { useChat } from "@/contexts/chat";
import DateParser from "@/functions/dateParser";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";

const InChatPaymentRequestCard = () => {
    const dateParser = new DateParser();
    const today = new Date().toISOString();
    const numberFormater = new Intl.NumberFormat();
    const { latestContract } = useChat();
    const [showPaymentCardModal, setShowPaymentCardModal] = useState(false);

    //computed
        const isPaid = useMemo(() => {
            return latestContract?.payment && latestContract?.payment.status === 'SUCCESS';
        }, [latestContract?.payment]);

    //methods
        const handleOnClickPayNow = () => {
            setShowPaymentCardModal(true);
        }

        const handleOnPaid = () => {
            setShowPaymentCardModal(false);
        }
      
    return (
        <>
            <div className="min-w-72 pt-3 px-4 pb-4 bg-white shadow-md rounded-lg border border-gray-200">
                <div className="flex flex-row mb-2">
                    <span className="italic text-gray-400 text-2xs">
                        System Message
                    </span>
                </div>
                
                <div className="flex items-center justify-between space-x-3">
                    <div className="font-semibold text-gray-800">Payment Request</div>
                    <div className="text-xs text-gray-500">
                        Due: {dateParser.getFormattedDate(today)}
                    </div>
                </div>
                <hr className="my-2 border-gray-300"/>
                
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <div className="text-gray-600 text-sm">For:</div>
                        <div className="text-gray-600 text-sm font-semibold">
                            All Milestones
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-gray-600 text-sm">To:</div>
                        <div className="text-gray-600 text-sm">
                            Jobonic
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-gray-600 text-sm">Total Amount:</div>
                        <div className="text-lg font-bold text-green-600">
                            ${numberFormater.format(latestContract ? latestContract?.price : 0)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full">
                    <Button
                        fullWidth
                        size="sm"
                        color={ isPaid ? 'success' : 'warning'}
                        title={ isPaid ? 'Successfully Paid' : 'Pay Now'}
                        icon={<CreditCardIcon className="size-5 text-white"/>}
                        onClick={handleOnClickPayNow}
                        disabled={isPaid}
                    />
                </div>
            </div>

            <Modal
                isOpen={showPaymentCardModal}
                onClose={() => setShowPaymentCardModal(false)}
            >
                <PaymentCard
                    onPaid={handleOnPaid}
                />
            </Modal>
        </>
    );
};

export default InChatPaymentRequestCard;
