import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import StarRating from "@/components/StarRating";
import { useChat } from "@/contexts/chat";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const ReviewButtons = () => {
    const { activeChatRoom, authUserType } = useChat();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [inputs, setInputs] = useState({
        starCount: 0,
        comment: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        setIsLoading(true);
        try{
            const res = await httpClient.post('customer-review', {
                noOfStar: inputs.starCount,
                review: inputs.comment,
                profileId: activeChatRoom?.receiver.id,// TODO: fix
                matchesId: activeChatRoom?.match_id,
                reviewType: "EMPLOYER",
                active: true
            });
            console.log(res.data);
        } catch (error) {
            console.log('error on rating', error);
        } finally {
            setIsLoading(false);
            setShowReviewModal(false);
        }
    };

    //methods
        const handleOnInputChange = (event: SafeInputChangeEvent) => {
            setInputs((prev) => ({...prev, comment: event.target.value}));
        };

        const handleStarChange = (newStarCount: number) => {
            setInputs( prev => ({...prev, starCount: newStarCount }));
        }
    return (
        <div>
            <Button
                title="Write a review"
                size="sm"
                icon={
                    <ChatBubbleBottomCenterTextIcon className="size-5 text-white" />
                }
                onClick={() => setShowReviewModal(true)}
            />

            <Modal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
            >
                <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl">
                    <span className="font-bold text-xl">
                        What do you think of working with your { authUserType === 'freelancer' ? 'employer' : 'freelancer' }?
                    </span>
                    <StarRating
                        size="6xl"
                        totalStars={5}
                        value={inputs.starCount}
                        onChange={handleStarChange}
                    />

                    <span className="text-xs text-gray-500 mx-5">
                        This review will be sent to { authUserType === 'freelancer' ? 'employer' : 'freelancer' } and can be viewed by publically.
                    </span>
                    <div className="flex flex-col space-y-2 w-full">
                        <span className="text-gray-700">Comment</span>
                        <SafeInput
                            type="textarea"
                            placeholder="write your review..."
                            value={inputs.comment}
                            onChange={handleOnInputChange}
                        />
                    </div>

                    <div>
                        <Button 
                            title={isLoading ? 'Submitting...' : 'Submit'} 
                            onClick={submit} 
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ReviewButtons;
