import React, { useMemo, useState } from "react";
import { useChat } from "@/contexts/chat";
import Modal from "../Modal";
import Button from "../Button";
import PaymentCard from "./PaymentCard";

interface PaymentRequestCardProps {
    onPaid?: () => void;
}

const PaymentRequestCard = ({
    onPaid
}: PaymentRequestCardProps) => {
    const numberFormater = new Intl.NumberFormat();
    const { latestContract } = useChat();
    const [showPaymentCardModal, setShowPaymentCardModal] = useState(false);

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
        const handleOnClickProceed = () => {
            setShowPaymentCardModal(true);
        }

        const handleOnPaid = () => {
            setShowPaymentCardModal(false);
            onPaid?.();
        }
        
    return (
        <>
            <div className="flex items-center justify-center bg-white rounded-xl max-w-96 min-w-80">
                <div className="flex flex-col space-y-5 p-5">

                    {/* title */}
                    <div className="flex justify-center">
                        <span className="font-bold text-xl">
                            Total Amount to Pay
                        </span>
                    </div>

                    <div className="flex flex-row space-x-20">
                        <div className="flex-1 flex flex-col space-y-4">
                            { milestones.map( milestone => 
                                <div 
                                    key={milestone.id}
                                    className="text-gray-500 text-sm whitespace-nowrap"
                                >
                                    {milestone.title}
                                </div>
                            )}
                            <span className="text-gray-500 text-sm whitespace-nowrap font-bold pt-2">
                                Total
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col space-y-4">
                            { milestones.map( milestone => 
                                <span 
                                    key={milestone.id}
                                    className="text-gray-500 text-sm whitespace-nowrap"
                                >
                                    ${numberFormater.format(milestone.price)}
                                </span>
                            )}
                            <span className="text-gray-500 text-sm whitespace-nowrap font-bold pt-2">
                                ${numberFormater.format(totalAmount)}
                            </span>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        title="Proceed"
                        onClick={handleOnClickProceed}
                    />
                </div>
            </div>

            <Modal
                isOpen={showPaymentCardModal}
                onClose={() => setShowPaymentCardModal(false)}
            >
                <PaymentCard
                    totalAmount={totalAmount}
                    onPaid={handleOnPaid}
                />
            </Modal>
        </>
    );
};

export default PaymentRequestCard;
