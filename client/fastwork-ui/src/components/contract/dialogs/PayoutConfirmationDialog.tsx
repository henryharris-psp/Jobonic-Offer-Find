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

    const handleOnClickConfrim = async () => {
        onClose();
    }

    return (
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
                        By default, the payment for milestone 2 will stil be released to Freelancer. <br /> If you wish to appeal the payment amount, key in the amount below. <br />
                        The remaining amount will be released back to you/employer. Both you and <br /> Freelancer will need to agree for money to be released.
                    </span>
                </div>

                <div className="w-3/4">
                    <div className="flex items-baseline justify-between space-y-1 w-full">
                        <span className="text-xs text-gray-500 font-semibold text-left">Default payout : </span>
                        <span className="text-xs text-gray-500 font-semibold text-left">$20</span>
                    </div>
                </div>

                <div className="flex flex-row gap-5 items-center">
                    <span className="text-sm text-gray-500 font-semibold">
                        Request payout amount
                    </span>
                    <div>
                    <SafeInput
                        type="text"
                        value={100}
                        onChange={(e) => console.log(e)}
                    />
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <Button
                        fullWidth
                        size="sm"
                        title="Confirm Payout"
                        onClick={handleOnClickConfrim}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default PayoutConfirmationDialog;
