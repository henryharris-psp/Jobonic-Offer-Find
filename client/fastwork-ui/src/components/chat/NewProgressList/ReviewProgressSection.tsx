import Button from "@/components/Button";
import Collapsible from "@/components/Collapsible";
import GiveReviewModal from "@/components/GiveReviewModal";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ReviewProgressSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleOnToggle = () => {
        setIsOpen((prev) => !prev);
    };
    
    const handleOnGiveReview = () => {
        setShowReviewModal(true);
    } 

    return (
        <>
            <div className="flex flex-col">
                <div
                    className="flex flex-row items-center space-x-4 cursor-pointer"
                    onClick={handleOnToggle}
                >
                    <span className={`text-cyan-900 transition-transform duration-200 
                        ${isOpen ? "rotate-90" : ""}
                    `}>
                        ▶
                    </span>
                    <span className="text-cyan-900 font-semibold text-sm">
                        Review
                    </span>
                </div>

                <div>
                    <Collapsible 
                        isOpen={isOpen} 
                    >
                        <div className="flex flex-row space-x-6 mt-1">
                            {/* bar */}
                            <div
                                className="bg-cyan-900"
                                style={{
                                    marginLeft: 6,
                                    padding: 1.5,
                                }}
                            ></div>
                            <div className="flex flex-col mt-2">
                                <Button
                                    size="xs"
                                    icon={<ChatBubbleBottomCenterTextIcon className="size-4 text-white"/>}
                                    title="Give Review"
                                    onClick={handleOnGiveReview}
                                />
                            </div>
                        </div>
                    </Collapsible>
                </div>
            </div>

            <GiveReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
            />
        </>
    );
};

export default ReviewProgressSection;
