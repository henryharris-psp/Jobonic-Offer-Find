import Button from "@/components/Button";
import Modal from "@/components/Modal";
import PaymentRequestCard from "@/components/payment/PaymentRequestCard";
import { useChat } from "@/contexts/chat";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";

const InChatPaymentRequestCard = () => {
    const numberFormater = new Intl.NumberFormat();
    const { activeChatRoom } = useChat();
    const [showPaymentRequestCardModal, setShowPaymentRequestCardModal] = useState(false);

    const totalAmount = useMemo( () => {
        if(!activeChatRoom || !activeChatRoom.latestContract) return 0;
        return activeChatRoom?.latestContract?.price;
    }, [activeChatRoom?.latestContract]);

    const handleOnClickPayNow = () => {
        setShowPaymentRequestCardModal(true);
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
                    <div className="text font-semibold text-gray-800">Payment Request</div>
                    <div className="text-xs text-gray-500">Due: 12 Sep 2024</div>
                </div>
                <hr className="my-2 border-gray-300"/>
                <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-600 text-sm">Total Amount:</div>
                    <div className="text-lg font-bold text-green-600">
                        ${numberFormater.format(totalAmount)}
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <Button
                        fullWidth
                        size="sm"
                        title="Pay Now"
                        icon={<CreditCardIcon className="size-5 text-white"/>}
                        onClick={handleOnClickPayNow}
                    />
                </div>
            </div>

            <Modal
                isOpen={showPaymentRequestCardModal}
                onClose={() => setShowPaymentRequestCardModal(false)}
            >
                <PaymentRequestCard
                    onPaid={() => setShowPaymentRequestCardModal(false)}
                />
            </Modal>
        </>
    );
};

export default InChatPaymentRequestCard;
