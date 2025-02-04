import httpClient from "@/client/httpClient";
import { useChat } from "@/contexts/chat";
import { useState } from "react";
import SafeInput, { SafeInputChangeEvent } from "./SafeInput";
import Modal from "./Modal";
import StarRating from "./StarRating";
import Button from "./Button";

interface GiveReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const completeWorkMessage = 'All works are marked as completed.';

const GiveReviewModal = ({
    isOpen,
    onClose
}: GiveReviewModalProps) => {
    const { activeChatRoom, authUserType, sendMessage, updateChatRoom } = useChat();
    const [inputs, setInputs] = useState({
        starCount: 0,
        comment: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleOnGiveReview = async () => {
        const newlySentMessage = await sendMessage('text', completeWorkMessage);
        if(newlySentMessage){
            await updateChatRoom(newlySentMessage.room_id, {
                status: 'completed'
            });
        }
    }

    const submit = async () => {
        setIsLoading(true);
        try{
            await handleOnGiveReview();
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
            onClose();
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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
                        placeholder="Write your review..."
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
    );
};

export default GiveReviewModal;
