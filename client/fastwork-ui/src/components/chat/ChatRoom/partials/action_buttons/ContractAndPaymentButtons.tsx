import React, { useState } from "react";
import { CreditCardIcon, DocumentTextIcon, PencilIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import { useChat } from "@/contexts/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ContractAcceptStatus from "../DetailsHeader/ContractAcceptStatus";
import Button from "@/components/Button";
import PaymentRequestCard from "@/components/payment/PaymentRequestCard";
import LatestContractModal from "@/components/contract/LatestContractModal";

const ContractAndPaymentButtons = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, latestContract } = useChat();

    const [showLatestContractModal, setShowLatestContractModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    //methods
        const handleOnClickCreateContract = () => {
            setShowLatestContractModal( () => {
                setIsEditMode(true);
                return true;
            });
        }

        const handleOnClickViewContract = () => {
            setShowLatestContractModal( () => {
                setIsEditMode(false);
                return true;
            });
        }

        const handleOnCloseContract = () => {
            setShowLatestContractModal(false)
        }

    //payment modal controller
        const [showPaymentRequestCardModal, setShowPaymentRequestCardModal] = useState(false);
                
        const handleOnClickPayNow = () => {
            setShowPaymentRequestCardModal(true);
        }

    return (
        <>
            <div className="flex flex-row items-center gap-1">
                { activeChatRoom && latestContract && authUser ? (
                    <div className="flex flex-row gap-1 items-center flex-wrap">
                        <Button 
                            title="View Contract" 
                            icon={<DocumentTextIcon className="size-5 font-bold text-bold"/>}
                            iconPositon="start"
                            size="sm"
                            onClick={handleOnClickViewContract} 
                        />
                        { latestContract?.acceptBy.length === 2 && authUser?.profile.id === activeChatRoom.employer_id ? (
                            <Button 
                                title="Pay Now" 
                                icon={<CreditCardIcon className="size-5 font-bold text-bold"/>}
                                iconPositon="start"
                                size="sm"
                                onClick={handleOnClickPayNow} 
                            />
                        ) : ''}
                        <ContractAcceptStatus
                            isSenderAccepted={latestContract.acceptBy.includes(authUser?.profile?.id)}
                            isReceiverAccepted={latestContract.acceptBy.includes(activeChatRoom?.receiver?.id)}
                        />
                    </div>
                ) : (
                    <Button 
                        title="Create Contract" 
                        icon={<PencilIcon className="size-4 font-bold"/>}
                        iconPositon="start"
                        size="sm"
                        onClick={handleOnClickCreateContract} 
                    />
                )}
            </div>

            { activeChatRoom ? (
                <>
                    <LatestContractModal
                        key={Math.random()}
                        isOpen={showLatestContractModal}
                        defaultEditMode={isEditMode}
                        onClose={handleOnCloseContract}
                    />

                    <Modal
                        isOpen={showPaymentRequestCardModal}
                        onClose={() => setShowPaymentRequestCardModal(false)}
                    >
                        <PaymentRequestCard
                            onPaid={() => setShowPaymentRequestCardModal(false)}
                        />
                    </Modal>
                </>
            ) : '' }

        </>
    );
};

export default ContractAndPaymentButtons;
