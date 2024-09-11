import React, { useState } from "react";
import { CheckCircleIcon, CheckIcon, CreditCardIcon, DocumentTextIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import { useChat } from "@/contexts/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import httpClient from "@/client/httpClient";
import ContractAcceptStatus from "../DetailsHeader/ContractAcceptStatus";
import ContractCard from "@/components/contract/ContractCard";
import Button from "@/components/Button";
import PaymentRequestCard from "@/components/payment/PaymentRequestCard";

const acceptContractMsg = `I satisfied with your updated contract and have signed.`;

const ContractAndPaymentButtons = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, sendMessage, updateChatRoom } = useChat();

    const [showContractModal, setShowContractModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

        const handleOnClickCreateContract = () => {
            setShowContractModal( () => {
                setIsEditMode(true);
                return true;
            });
        }

        const handleOnClickViewContract = () => {
            setShowContractModal( () => {
                setIsEditMode(false);
                return true;
            });
        }

        //accept_contract
        const handleOnClickAccept = async () => {
            if(activeChatRoom?.latestContract){
                if(confirm("Are you sure to accept contract?")){
                    try{
                        await httpClient.put(`contract/${activeChatRoom.latestContract.id}`, {
                            matchesId: activeChatRoom.latestContract.matchesId,
                            price: activeChatRoom.latestContract.price,
                            deliverable: activeChatRoom.latestContract.deliverable,
                            profileId: activeChatRoom.latestContract.profileId,
                            acceptBy: [...activeChatRoom.latestContract.acceptBy, authUser?.profile?.id],
                        });
                        await sendMessage('contract', activeChatRoom.latestContract.id.toString());
                        await sendMessage('text', acceptContractMsg);
                        const newlySentMessage = await sendMessage('system', 'payment_request');
                        if(newlySentMessage){
                            await updateChatRoom(newlySentMessage.room_id, {
                                status: 'payment_verification'
                            });
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }
            }
        }

        const handleOnClickEdit = () => {
            setIsEditMode(true);
        }

        const handleOnClickCancelEdit = () => {
            setIsEditMode(false);
        }

        const handleOnCloseContract = () => {
            setShowContractModal(false)
        }

    //payment modal controller
        const [showPaymentRequestCardModal, setShowPaymentRequestCardModal] = useState(false);
                
        const handleOnClickPayNow = () => {
            setShowPaymentRequestCardModal(true);
        }

    return (
        <>
            <div className="flex flex-row items-center gap-1">
                { activeChatRoom && activeChatRoom?.latestContract && authUser ? (
                    <div className="flex flex-row gap-1 items-center flex-wrap">
                        <Button 
                            title="View Contract" 
                            icon={<DocumentTextIcon className="size-5 font-bold text-bold"/>}
                            iconPositon="start"
                            size="sm"
                            onClick={handleOnClickViewContract} 
                        />
                        { activeChatRoom.latestContract?.acceptBy.length === 2 && authUser?.profile.id === activeChatRoom.employer_id ? (
                            <Button 
                                title="Pay Now" 
                                icon={<CreditCardIcon className="size-5 font-bold text-bold"/>}
                                iconPositon="start"
                                size="sm"
                                onClick={handleOnClickPayNow} 
                            />
                        ) : ''}
                        <ContractAcceptStatus
                            isSenderAccepted={activeChatRoom.latestContract.acceptBy.includes(authUser?.profile?.id)}
                            isReceiverAccepted={activeChatRoom.latestContract.acceptBy.includes(activeChatRoom?.receiver?.id)}
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
                    <Modal
                        isOpen={showContractModal}
                        onClose={handleOnCloseContract}
                    >
                        <div className="bg-white rounded-2xl pb-5"> 
                            <ContractCard
                                title={activeChatRoom.service.title}
                                contract={activeChatRoom.latestContract}
                                isEditMode={isEditMode}
                                onClose={handleOnCloseContract}
                                onClickCancel={handleOnClickCancelEdit}
                            />
                            { !isEditMode ? (
                                <div className="flex flex-row items-center justify-between space-x-2 mx-6">
                                    <div>
                                        { activeChatRoom.latestContract?.acceptBy.length !== 2 ? ( 
                                            <Button
                                                title="Edit Contract"
                                                size="sm"
                                                icon={<PencilSquareIcon className="size-5"/>}
                                                onClick={handleOnClickEdit}
                                            />
                                        ) : ''}
                                    </div>

                                    { !activeChatRoom.latestContract?.acceptBy.includes(authUser?.profile?.id) ? (
                                        <Button
                                            size="sm"
                                            color="success"
                                            title="Accept"
                                            icon={<CheckIcon className="size-5"/>}
                                            onClick={handleOnClickAccept}
                                        />
                                    ) : (
                                        <div className="flex flex-row items-center space-x-1 pt-2">
                                            <CheckCircleIcon className="size-5 text-green-400"/>
                                            <span className="text-xs text-gray-400">
                                                You have accepted this contract.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ) : ''}
                        </div>
                    </Modal>

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
