import Button from "@/components/Button";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { useChat } from "@/contexts/chat";
import { BanknotesIcon } from "@heroicons/react/24/solid";

interface TerminationContractButtonProps {
    role: "employer" | "freelancer";
}

const TerminationContractButton: React.FC<TerminationContractButtonProps> = ({ role }) => {
    const [showTerminateContractModal, setShowTerminateContractModal] = useState(false);
    const { sendMessage, updateChatRoom } = useChat();

    const handleOnClickTerminateContract = () => {
        setShowTerminateContractModal(true);
    };

    const handleOnClose = () => {
        setShowTerminateContractModal(false);
    };

    const handleOnTerminateContract = async () => {
        try {
            const newlySentMessage = await sendMessage('text', 'Thanks for working with me. Bye Bye!');

            if(newlySentMessage)
                await updateChatRoom(newlySentMessage.room_id, {
                    status: 'cancelled'
                });
            console.log('Terminate contract');
        } catch (error) {
            console.log('error on Terminateing contract', error);
        } finally {
            setShowTerminateContractModal(false);
        }
    }

    return (
        <>
            <div>
                <Button
                    title="View Payout Negotiation"
                    size="sm"
                    icon={<BanknotesIcon className="size-5 text-white"/>}
                    onClick={() => setShowTerminateContractModal(true)}
                >
                </Button>

                <Modal
                    isOpen={showTerminateContractModal}
                    onClose={handleOnClose}
                >
                    <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                        <span className="font-bold text-2xl text-center">
                            Cancellation Payout Terms
                        </span>

                        <div className="flex flex-col space-y-1">
                            <span className="text-xs text-gray-500 font-semibold text-center">
                                You requested for $100 payout.
                            </span>
                        </div>

                        <div className="w-3/4">
                            <div className="flex items-baseline justify-between space-y-1 w-full">
                                <span className="text-xs text-gray-500 font-semibold text-left">Default payout : </span>
                                <span className="text-xs text-gray-500 font-semibold text-left">$20</span>
                            </div>

                            <div className="flex items-baseline justify-between space-y-1 w-full">
                                <span className="text-xs text-gray-500 font-semibold text-left">Your previous payout request : </span>
                                <span className="text-xs text-gray-500 font-semibold text-left">$20</span>
                            </div>

                            <div className="flex items-baseline justify-between space-y-1 w-full">
                                <span className="text-xs text-gray-500 font-semibold text-left">{role == "freelancer" ? "Employer payout request : " : "Freelancer payout request : "}</span>
                                <span className="text-xs text-gray-500 font-semibold text-left">$20</span>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2 flex-wrap">
                            <Button
                                fullWidth
                                size="sm"
                                title="Agree to latest payout"
                                onClick={handleOnTerminateContract}
                            />
                            <Button
                                fullWidth
                                size="sm"
                                title="Cancel"
                                onClick={handleOnClose}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
};

export default TerminationContractButton;