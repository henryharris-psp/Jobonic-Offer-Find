import Button from "@/components/Button";
import GiveReviewModal from "@/components/GiveReviewModal";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ProgressSectionRoot from "./ProgressSectionRoot";

interface ReviewProgressSectionProps {
    isCurrent: boolean;
    isDisabled: boolean;
}

const ReviewProgressSection = ({
    isCurrent,
    isDisabled
}: ReviewProgressSectionProps) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    
    const handleOnGiveReview = () => {
        setShowReviewModal(true);
    } 

    return (
        <>
            <ProgressSectionRoot
                defaultOpened={false}
                isToggleable={true}
                title="To Review"
                isCurrent={isCurrent}
                isDisabled={isDisabled}
            >
                <div className="flex-1 flex">
                    <Button
                        size="xs"
                        icon={<ChatBubbleBottomCenterTextIcon className="size-4 text-white"/>}
                        title="Give Review"
                        onClick={handleOnGiveReview}
                        disabled={!isCurrent}
                    />
                </div>
            </ProgressSectionRoot>

            <GiveReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
            />
        </>
    );
};

export default ReviewProgressSection;
