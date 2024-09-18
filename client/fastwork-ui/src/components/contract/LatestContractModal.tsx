import React, { useState } from "react";
import httpClient from "@/client/httpClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChat } from "@/contexts/chat";
import ContractCard from "./ContractCard";
import Button from "../Button";
import Modal from "../Modal";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import ContractAcceptStatus from "../chat/ChatRoom/partials/DetailsHeader/ContractAcceptStatus";

interface LatestContractModalProps {
    isOpen: boolean;
    defaultEditMode?: boolean;
    onClose: () => void;
}

const acceptContractMsg = `I satisfied with your updated contract and have signed.`;

const LatestContractModal = ({
    isOpen,
    defaultEditMode = false,
    onClose
}: LatestContractModalProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, latestContract, sendMessage, updateChatRoom } = useChat();
    const [isEditMode, setIsEditMode] = useState(defaultEditMode);

    //methods
        //accept_contract
        const handleOnClickAccept = async () => {
            if(latestContract){
                if(confirm("Are you sure to accept contract?")){
                    try{
                        //update contract
                        await httpClient.put(`contract/${latestContract.id}`, {
                            matchesId: latestContract.matchesId,
                            price: latestContract.price,
                            deliverable: latestContract.deliverable,
                            profileId: latestContract.profileId,
                            acceptBy: [...latestContract.acceptBy, authUser?.profile?.id],
                        });
                        await sendMessage('text', acceptContractMsg);
                        const newlySentMessage = await sendMessage('payment_request', activeChatRoom?.match_id.toString(), 'system');
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

    return (
        <Modal
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className="bg-white rounded-2xl pb-5">
                <ContractCard
                    title={activeChatRoom?.service?.title || ""}
                    contract={latestContract}
                    isEditMode={isEditMode}
                    onClose={onClose}
                    onClickCancel={handleOnClickCancelEdit}
                />
                {!isEditMode ? (
                    <div className="flex flex-row items-center justify-between space-x-2 mx-6">
                        <div>
                            {latestContract?.acceptBy.length !== 2 ? (
                                <Button
                                    title="Edit Contract"
                                    size="sm"
                                    icon={
                                        <PencilSquareIcon className="size-5" />
                                    }
                                    onClick={handleOnClickEdit}
                                />
                            ) : ''}
                        </div>

                        {latestContract?.acceptBy.includes(authUser?.profile?.id) ? (
                            <ContractAcceptStatus
                                isSenderAccepted={latestContract.acceptBy.includes(authUser?.profile?.id)}
                                isReceiverAccepted={latestContract.acceptBy.includes(activeChatRoom?.receiver?.id)}
                            />
                        ) : (
                            <Button
                                size="sm"
                                color="success"
                                title="Accept"
                                icon={<CheckIcon className="size-5" />}
                                onClick={handleOnClickAccept}
                            />
                        )}
                    </div>
                ) : ''}
            </div>
        </Modal>
    );
};

export default LatestContractModal;
