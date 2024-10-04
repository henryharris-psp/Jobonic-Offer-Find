import React, { useState } from "react";
import httpClient from "@/client/httpClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChat } from "@/contexts/chat";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import ContractCard from "../ContractCard";
import ContractAcceptStatus from "@/components/chat/ChatRoom/partials/DetailsHeader/ContractAcceptStatus";
import InChatPayoutNegotiationCard from "@/components/chat/ChatRoom/partials/Conversation/InChatPayoutNegotiationCard";

interface LatestPayoutNegotiationModalProps {
    isOpen: boolean;
    defaultEditMode?: boolean;
    onClose: () => void;
}

const acceptContractMsg = `I satisfied with your updated contract and have signed.`;

const LatestPayoutNegotiationModal = ({
    isOpen,
    defaultEditMode = false,
    onClose
}: LatestPayoutNegotiationModalProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { activeChatRoom, latestContract, sendMessage, updateChatRoom } = useChat();
    const latestPayoutNegotiation = latestContract?.latestPayoutNegotiation;
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
            <InChatPayoutNegotiationCard
                payoutNegotiationId={latestPayoutNegotiation?.id}
                onClose={onClose}
            />
        </Modal>
    );
};

export default LatestPayoutNegotiationModal;
