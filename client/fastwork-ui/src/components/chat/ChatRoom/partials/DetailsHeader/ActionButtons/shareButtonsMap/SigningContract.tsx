import React, { useMemo, useState } from "react";
import Button from "@/components/Button";
import { DocumentTextIcon, PencilIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import NewContractCard from "@/components/NewContractCard";
import { useChat } from "@/contexts/chat";
import { Contract } from "@/types/general";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SigningContract = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom } = useChat();
    const [showContractModal, setShowContractModal] = useState(false);

    const latestContract: Contract | null = useMemo( () => {
        const initialContact: Contract = {
            id: uuid(),
            price: activeChatRoom?.service?.price.toString() ?? '',
            deliverable: '',
            milestones: [],
            isFreelancerConfirmed: activeChatRoom?.freelancer_id === authUser?.id,
            isEmployerConfirmed: activeChatRoom?.employer_id === authUser?.id,
        };
        if(!activeChatRoom || activeChatRoom.contracts.length === 0) return initialContact;
        return activeChatRoom.contracts[activeChatRoom.contracts.length - 1];
    }, [activeChatRoom]);

    //methods
        const handleOnClickCreateContract = () => {
            setShowContractModal(true);
        }

        const handleOnClickViewContract = () => {
            setShowContractModal(true);
        }

        const handleOnCloseContract = () => {
            setShowContractModal(false);
        }
    
    return (
        <div>
            <div className="flex flex-row items-center gap-1">
                { activeChatRoom?.contracts.length === 0 ? (
                    <Button 
                        title="Create Contract" 
                        icon={<PencilIcon className="size-4 font-bold text-bold"/>}
                        iconPositon="start"
                        size="sm"
                        onClick={handleOnClickCreateContract} 
                    />
                ) : (
                    <Button 
                        title="View Contract" 
                        icon={<DocumentTextIcon className="size-5 font-bold text-bold"/>}
                        iconPositon="start"
                        size="sm"
                        onClick={handleOnClickViewContract} 
                    />
                )}
            </div>

            <Modal
                isOpen={showContractModal}
                onClose={handleOnCloseContract}
            >
                <NewContractCard
                    contract={latestContract}
                    isEditMode={true}
                    onClose={handleOnCloseContract}
                />
            </Modal>

        </div>
    );
};

export default SigningContract;
