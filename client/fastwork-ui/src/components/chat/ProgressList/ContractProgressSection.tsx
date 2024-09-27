import Button from "@/components/Button";
import LatestContractModal from "@/components/contract/LatestContractModal";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon, EyeIcon, StopIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EndContractConfirmationDialog from "@/components/contract/dialogs/EndContractConfirmationDialog";
import PayoutConfirmationDialog from "@/components/contract/dialogs/PayoutConfirmationDialog";
import ProgressSectionRoot from "./ProgressSectionRoot";
import { useChat } from "@/contexts/chat";

interface ContractProgressSectionProps {
    isCurrent: boolean,
    isDisabled: boolean;
}

const ContractProgressSection = ({
    isCurrent,
    isDisabled
}: ContractProgressSectionProps) => {
    const { latestContract } = useChat();
    const [showLatestContractModal, setShowLatestContractModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [showPayoutConfirmationDialog, setPayoutConfirmationDialog] = useState(false);

    const handleOnClickViewContract = () => {
        setShowLatestContractModal( () => {
            setIsEditMode(false);
            return true;
        });
    }

    const handleOnCloseContract = () => {
        setShowLatestContractModal(false);
    }
    
    const handleOnClickEndContract = () => {
        setShowConfirmationDialog(true);
    }

    const closeConfirmationDialog = () => {
        setShowConfirmationDialog(false);
        setPayoutConfirmationDialog(true);
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
                    { latestContract?.payoutNegotiations.length === 0 ? (
                        <div className="flex flex-row gap-1">
                            <Button
                                size="2xs"
                                title="View"
                                icon={<EyeIcon className="size-4 text-bold"/>}
                                onClick={handleOnClickViewContract}
                            />
                            <Button
                                size="2xs"
                                title="End Contract"
                                icon={<StopIcon className="size-4 font-bold text-bold"/>}
                                onClick={handleOnClickEndContract}
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
                            <Button
                                size="2xs"
                                title="End Contract"
                                icon={<StopIcon className="size-4 font-bold text-bold"/>}
                                onClick={handleOnClickEndContract}
                            />
                        </div>
                    )}
                </div>
            </ProgressSectionRoot>

            <LatestContractModal
                key={Math.random()}
                isOpen={showLatestContractModal}
                defaultEditMode={isEditMode}
                onClose={handleOnCloseContract}
            />

            <EndContractConfirmationDialog
                isOpen={showConfirmationDialog}
                onClose={() => setShowConfirmationDialog(false)}
                onConfirm={closeConfirmationDialog}
                onCancel={() => setShowConfirmationDialog(false)}
            />

            <PayoutConfirmationDialog
                isOpen={showPayoutConfirmationDialog}
                onClose={() => setPayoutConfirmationDialog(false)}
            />
        </>
    );
};

export default ContractProgressSection;
