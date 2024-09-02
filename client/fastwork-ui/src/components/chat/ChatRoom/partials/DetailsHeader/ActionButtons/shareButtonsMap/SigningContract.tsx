import React, { useState } from "react";
import Button from "@/components/Button";
import { CreditCardIcon, DocumentTextIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import NewContractCard from "@/components/NewContractCard";
import Modal from "@/components/Modal";
import PaymentCard from "@/components/PaymentCard";

const SigningContract = () => {
    const [showContractModal, setShowContractModal] = useState(false);
    const [showPaymentCard, setShowPaymentCard] = useState(false);

    //methods
        const handleOnCreateContract = () => {
            setShowContractModal(true);
        }

        const handleOnCloseContract = () => {
            setShowContractModal(false);
        }

        const handleOnClickViewContract = () => {
            setShowContractModal(true);
        }

        const handlePay = () => {
            setShowPaymentCard(true);
        }
    
    return (
        <div>
            <div className="flex flex-row items-center gap-1">
                <Button 
                    title="View Contract" 
                    icon={<DocumentTextIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handleOnClickViewContract} 
                />
                <Button 
                    title="Pay Now" 
                    icon={<CreditCardIcon className="size-5 font-bold text-bold"/>}
                    iconPositon="start"
                    size="sm"
                    onClick={handlePay} 
                />
            </div>

            <Modal
                isOpen={showContractModal}
                onClose={() => setShowContractModal(false)}
            >
                <NewContractCard/>
            </Modal>

            <Modal
                isOpen={showPaymentCard}
                onClose={() => setShowPaymentCard(false)}
            >
                <PaymentCard/>
            </Modal>
        </div>
    );
};

export default SigningContract;
