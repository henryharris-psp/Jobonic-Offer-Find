import React from "react";
import Modal from "../../Modal";
import Button from "../../Button";
import SafeInput from "@/components/SafeInput";

interface PayoutConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const PayoutConfirmationDialog = ({
    isOpen,
    onClose,
}: PayoutConfirmationDialogProps) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                    <span className="font-bold text-2xl text-center">
                        Cancellation Payout Terms
                    </span>

                    <div className="flex flex-col space-y-1">
                        <span className="text-xs text-gray-500 font-semibold text-center">
                            By default, the payment for milestone 2 will stil be released to Freelancer. If you wish to appeal the payment amount, key in the amount below.
                            The remaining amount will be released back to you/employer. Both you and Freelancer Aems will need to agree for money to be released.
                        </span>
                    </div>

                    <div className="flex flex-row gap-5 items-center">
                        <span className="text-gray-500 font-semibold">
                            Current Payout for milestone 2: $210
                        </span>
                        <div>
                            <SafeInput
                                type="text"
                                value={123}
                                onChange={(e) => console.log(e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <Button
                            fullWidth
                            size="sm"
                            title="Confirm Cancellation Payout"
                            onClick={() => console.log('yes')}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PayoutConfirmationDialog;