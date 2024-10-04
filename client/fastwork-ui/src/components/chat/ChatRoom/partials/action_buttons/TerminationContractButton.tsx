import Button from "@/components/Button";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { useChat } from "@/contexts/chat";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import InChatPayoutNegotiationCard from "../Conversation/InChatPayoutNegotiationCard";
import LatestPayoutNegotiationModal from "@/components/contract/payout-negotiation/LatestPayoutNegotiationModal";

const TerminationContractButton = () => {
    const [showPayoutNegotiationCard, setShowPayoutNegotiationCard] = useState(false);

    return (
        <>
            <div>
                <Button
                    title="View Payout Negotiation"
                    size="sm"
                    icon={<BanknotesIcon className="size-5 text-white"/>}
                    onClick={() => setShowPayoutNegotiationCard(true)}
                >
                </Button>

                <LatestPayoutNegotiationModal
                    isOpen={showPayoutNegotiationCard}
                    onClose={() => setShowPayoutNegotiationCard(false)}
                />
            </div>
        </>
    )
};

export default TerminationContractButton;