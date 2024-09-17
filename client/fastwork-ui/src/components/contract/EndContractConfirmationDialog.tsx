import React from "react";
import Modal from "../Modal";
import Button from "../Button";

interface EndContractConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const EndContractConfirmationDialog = ({
    isOpen,
    onClose,
}: EndContractConfirmationDialogProps) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                <span className="font-bold text-2xl text-center">
                    Are you sure you want to end contract?
                </span>

                <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-500 font-semibold text-center">
                        Both parties have to agree to end collaboration.
                    </span>
                    <span className="text-xs text-gray-500 font-semibold text-center">
                        The payment for the current milestone will still be send to your collaborator.
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2 flex-wrap">
                    <Button
                        fullWidth
                        size="sm"
                        title="Yes, end collaboration"
                        onClick={() => console.log('yes')}
                    />
                    <Button
                        fullWidth
                        variant="outlined"
                        size="sm"
                        title="No, continue collaboration"
                        onClick={() => console.log('no')}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default EndContractConfirmationDialog;
