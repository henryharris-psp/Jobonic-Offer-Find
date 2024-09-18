import Button from "@/components/Button";
import GiveReviewModal from "@/components/GiveReviewModal";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ReviewButtons = () => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    
    return (
        <div>
            <Button
                title="Give Review"
                size="sm"
                icon={
                    <ChatBubbleBottomCenterTextIcon className="size-5 text-white" />
                }
                onClick={() => setShowReviewModal(true)}
            />

            <GiveReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
            />

        </div>
    );
};

export default ReviewButtons;
