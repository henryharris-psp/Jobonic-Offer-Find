import { useState } from "react";
import { useChat } from "@/contexts/chat";
import Button from "@/components/Button";
import LatestContractModal from "@/components/contract/LatestContractModal";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon, BanknotesIcon, EyeIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/solid";
import EndContractConfirmationDialog from "@/components/contract/dialogs/EndContractConfirmationDialog";
import ProgressSectionRoot from "./ProgressSectionRoot";
import LatestPayoutNegotiationModal from "@/components/contract/payout-negotiation/LatestPayoutNegotiationModal";

interface ContractProgressSectionProps {
    isCurrent: boolean,
    isDisabled: boolean;
}

const ContractProgressSection = ({
    isCurrent,
    isDisabled
}: ContractProgressSectionProps) => {
    const { latestContract, activeChatRoom, updateChatRoom, sendMessage } = useChat();
    const payoutNegotiations = latestContract?.payoutNegotiations ?? [];
    const [showLatestContractModal, setShowLatestContractModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [showLatestPayoutNegotiationModal, setShowLatestPayoutNegotiationModal] = useState(false);

    //methods
        const handleOnClickViewContract = () => {
            setShowLatestContractModal( () => {
                setIsEditMode(false);
                return true;
            });
        }
        
        const handleOnClickEndContract = () => {
            setShowConfirmationDialog(true);
        }

        const handleOnClickViewPayout = () => {
            setShowLatestPayoutNegotiationModal(true);
        }

        const handleOnClickCancel = async () => {
            try {
                const newlySentMessage = await sendMessage('text', 'Rejected to cancel contract.');
                if(newlySentMessage){
                    await updateChatRoom(newlySentMessage.room_id, {
                        status: 'to_submit'
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

    return (
        <>
            <ProgressSectionRoot
                title="Collaboration Contract"
                isCurrent={isCurrent}
                isDisabled={isDisabled}
            >
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center space-x-2">
                            <DocumentIcon className="size-5 text-cyan-900"/>
                            <button 
                                className="text-cyan-900 cursor-pointer text-sm underline whitespace-nowrap"
                                onClick={handleOnClickViewContract}
                            >
                                Service Contract
                            </button>
                            <span className="text-cyan-900 text-xs whitespace-nowrap">
                                1.3 MB
                            </span>
                            <button>
                                <ArrowDownTrayIcon className="size-5 text-cyan-900"/>
                            </button>
                        </div>
                    </div>

                    { activeChatRoom?.status === 'cancelled' ? (
                        <span className="text-sm">
                            Contract Cancelled
                        </span>
                    ) : (
                        payoutNegotiations.length !== 0 ? (
                            <div className="flex flex-row gap-1">
                                <Button
                                    size="2xs"
                                    title="Payout Negotiation"
                                    icon={<BanknotesIcon className="size-4 text-bold"/>}
                                    onClick={handleOnClickViewPayout}
                                />
                                <Button
                                    size="2xs"
                                    title="Cancel to End"
                                    icon={<XMarkIcon className="size-4 font-bold text-bold"/>}
                                    onClick={handleOnClickCancel}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-row gap-1">
                                <Button
                                    size="2xs"
                                    title="View"
                                    icon={<EyeIcon className="size-4 text-bold"/>}
                                    onClick={handleOnClickViewContract}
                                />
                                {/* allow to end contract only when contract is started */}
                                <Button
                                    size="2xs"
                                    title="End Contract"
                                    icon={<StopIcon className="size-4 font-bold text-bold"/>}
                                    onClick={handleOnClickEndContract}
                                    disabled={activeChatRoom?.status !== 'to_submit'}
                                />
                            </div>
                        )
                    ) }
                </div>
            </ProgressSectionRoot>

            <EndContractConfirmationDialog
                isOpen={showConfirmationDialog}
                onClose={() => setShowConfirmationDialog(false)}
                onCancel={() => setShowConfirmationDialog(false)}
            />

            <LatestContractModal
                key={Math.random()}
                isOpen={showLatestContractModal}
                defaultEditMode={isEditMode}
                onClose={() => setShowLatestContractModal(false)}
            />

            <LatestPayoutNegotiationModal
                key={Math.random()}
                isOpen={showLatestPayoutNegotiationModal}
                defaultEditMode={isEditMode}
                onClose={() => setShowLatestPayoutNegotiationModal(false)}
            />
        </>
    );
};

export default ContractProgressSection;
