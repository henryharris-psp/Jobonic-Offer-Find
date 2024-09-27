import React from "react";
import Modal from "../../Modal";
import Button from "../../Button";
import { useChat } from "@/contexts/chat";

interface EndContractConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const endContractMessage = 'I want to terminate contract.';

const EndContractConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    onCancel,
}: EndContractConfirmationDialogProps) => {

    const { sendMessage, updateChatRoom } = useChat();

    const handleOnClickConfrim = async () => {
        const newlySentMessage = await sendMessage('text', endContractMessage);

        if(newlySentMessage){
            await updateChatRoom(newlySentMessage.room_id, {
                status: 'contract_termination'
            });
        }

        onClose();
    }

    const handleOnClickCancel = () => {
        onClose();
    }

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onCancel}
            >
                <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                    <span className="font-bold text-2xl text-center">
                        Are you sure you want to end contract?
                    </span>

                    <div className="flex flex-col space-y-1">
                        <span className="text-xs text-gray-500 font-semibold text-center">
                            If you request to end the contract, a payout price negotiation form will be generated.
                        </span>

                        <span className="text-xs text-gray-500 font-semibold text-center">
                            Both users must agree on the payout price for the current milestone in order to end the contract.
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2 flex-wrap">
                        <Button
                            fullWidth
                            size="sm"
                            title="Yes, end collaboration"
                            onClick={onConfirm}
                        />
                        <Button
                            fullWidth
                            variant="outlined"
                            size="sm"
                            title="No, continue collaboration"
                            onClick={onCancel}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EndContractConfirmationDialog;
