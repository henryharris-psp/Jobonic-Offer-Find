import React, { useState } from "react";
import Modal from "../Modal";
import { Contract } from "@/types/general";
import ContractCard from "./ContractCard";
import Button from "../Button";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

interface ContractCardModalProps {
    isOpen: boolean;
    contract: Contract | null;
    onClose?: () => void;      
}

const ContractCardModal = ({
    isOpen,
    contract,
    onClose
}: ContractCardModalProps) => {

    const [isEditMode, setIsEditMode] = useState(false);

    //methods
        const handleOnClickEdit = () => {
            setIsEditMode(true);
        }

        const handleOnClickCancelEdit = () => {
            setIsEditMode(false);
        }

        const handleOnClickAccept = () => {
            console.log('accept');
        }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={() => onClose?.()}
        >
            <div className="bg-white -500 rounded-2xl pb-5">
                <ContractCard
                    contract={contract}
                    isEditMode={isEditMode}
                    onClose={onClose}
                />
                {isEditMode ? (
                    <div className="flex flex-row justify-between space-x-1 mx-6">
                        <Button
                            size="sm"
                            color="secondary"
                            title="Cancel"
                            onClick={handleOnClickCancelEdit}
                        />
                    </div>
                ) : (
                    <div className="flex flex-row justify-between space-x-1 mx-6">
                        <Button
                            title="Edit Contract"
                            size="sm"
                            icon={<PencilSquareIcon className="size-5" />}
                            onClick={handleOnClickEdit}
                        />
                        <Button
                            size="sm"
                            color="success"
                            title="Accept"
                            icon={<CheckIcon className="size-5" />}
                            onClick={handleOnClickAccept}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ContractCardModal;
