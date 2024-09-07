import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { CheckCircleIcon, CheckIcon, CreditCardIcon, DocumentTextIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import ContractCard from "@/components/contract/ContractCard";
import { useChat } from "@/contexts/chat";
import matchClient from "@/client/matchClient";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Contract } from "@/types/general";
import PaymentCard from "@/components/PaymentCard";

const acceptContractMsg = `Contract is signed by both users. Let's get started`;

const SigningContract = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, sendMessage, updateChatRoom } = useChat();

    const [showContractModal, setShowContractModal] = useState(false);
    const [lastestContract, setLatestContract] = useState<Contract | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect( () => {
        if(activeChatRoom && activeChatRoom?.messages.length !== 0){
            const contractMessages = activeChatRoom.messages.filter(message => message.media_type === 'contract');
            
            if(contractMessages?.length !== 0){
                const latestContractMessage = contractMessages.reduce((latest, message) => {
                    return message.id > latest.id ? message : latest;
                }, contractMessages[0]);

                const latestContractId = latestContractMessage?.content;

                if(latestContractId){
                    fetchContract(latestContractId);
                }
            }
        }
    }, [activeChatRoom?.messages]);

    //methods
        const fetchContract = async (contractId: string | number) => {
            try{
                const res = await matchClient.get(`contracts/${contractId}`);
                setLatestContract(res.data);
            } catch (error) {
                console.log('cannot fetch contract data', error);
            }
        }

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
            if(confirm("Are you sure to accept contract?")){
                try{
                    await matchClient.put(`contracts/${lastestContract.id}/accept`, {
                        acceptedBy: authUser?.profile?.id
                    });
                    await sendMessage('text', acceptContractMsg);

                    //refresh contract
                    fetchContract(lastestContract.id);
                } catch (error) {
                    console.log('error', error);
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
            const [showPaymentCard, setShowPaymentCard] = useState(false);
                
            const handleOnClickPay = () => {
                setShowPaymentCard(true);
            }

    return (
        <div>
            <div className="flex flex-row items-center gap-1">
                { lastestContract && activeChatRoom && authUser ? (
                    <div className="flex flex-row gap-2 items-center flex-wrap">
                        <Button 
                            title="View Contract" 
                            icon={<DocumentTextIcon className="size-5 font-bold text-bold"/>}
                            iconPositon="start"
                            size="sm"
                            onClick={handleOnClickViewContract} 
                        />
                        { lastestContract?.accepted_by.length === 2 && authUser?.profile.id === activeChatRoom.employer_id ? (
                            <Button 
                                title="Pay Now" 
                                icon={<CreditCardIcon className="size-5 font-bold text-bold"/>}
                                iconPositon="start"
                                size="sm"
                                onClick={handleOnClickPay} 
                            />
                        ) : ''}
                        <div className="flex flex-col space-y-1">
                            {/* for auth user */}
                            { lastestContract.accepted_by.includes(authUser?.profile?.id) ? (
                                <div className="flex flex-row items-center space-x-1">
                                    <CheckCircleIcon className="size-4 text-green-500"/>
                                    <span className="text-xs text-gray-900">You have accepted the contract.</span>
                                </div>
                            ) : (
                                <div className="flex flex-row items-center space-x-1">
                                    <ClockIcon className="size-4 text-yellow-500"/>
                                    <span className="text-xs text-gray-500">
                                        { activeChatRoom.receiver.firstName } is waiting for your approval
                                    </span>
                                </div>
                            )}
                            
                             {/* for reciver */}
                            { lastestContract.accepted_by.includes(activeChatRoom?.receiver.id) ? (
                                <div className="flex flex-row items-center space-x-1">
                                    <CheckCircleIcon className="size-4 text-green-500"/>
                                    <span className="text-xs text-gray-900">
                                        { activeChatRoom.receiver.firstName } has accepted the contract.
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-row items-center space-x-1">
                                    <ClockIcon className="size-4 text-yellow-500"/>
                                    <span className="text-xs text-gray-500">
                                        Waiting for another member's approval 
                                    </span>
                                </div>
                            )}
                        </div>
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

            <Modal
                isOpen={showContractModal}
                onClose={handleOnCloseContract}
            >
                <div className="bg-white -500 rounded-2xl pb-5"> 
                    <ContractCard
                        contract={lastestContract}
                        isEditMode={isEditMode}
                        onClose={handleOnCloseContract}
                        onClickCancel={handleOnClickCancelEdit}
                    />
                    { !isEditMode ? (
                        <div className="flex flex-row justify-between space-x-1 mx-6">
                            <Button
                                title="Edit Contract"
                                size="sm"
                                icon={<PencilSquareIcon className="size-5"/>}
                                onClick={handleOnClickEdit}
                            />
                            <Button
                                size="sm"
                                color="success"
                                title="Accept"
                                icon={<CheckIcon className="size-5"/>}
                                onClick={handleOnClickAccept}
                            />
                        </div>
                    ) : ''}
                </div>
            </Modal>

            <Modal
                isOpen={showPaymentCard}
                onClose={() => setShowPaymentCard(false)}
            >
                <PaymentCard
                    totalAmount={lastestContract?.price}
                />
            </Modal>

        </div>
    );
};

export default SigningContract;
