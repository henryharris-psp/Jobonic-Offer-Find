import React, { useState } from 'react';

interface Milestone {
    id: number;
    title: string;
    numberOfDrafts: number;
    todoDescription: string;
    amountToPay: string;
    tasks: string[];
    isOpen: boolean;
}

const ProgressList: React.FC = () => {
    const [openMilestones, setOpenMilestones] = useState<number[]>([]);
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isContractOpen, setIsContractOpen] = useState(false);
    const [isEndContractPopupOpen, setIsEndContractPopupOpen] = useState(false);
    const [isCancellationPayoutPopupOpen, setIsCancellationPayoutPopupOpen] = useState(false);

    // Sample milestone data for demonstration
    const milestones: Milestone[] = [
        {
            id: 1,
            title: 'Milestone 1',
            numberOfDrafts: 2,
            todoDescription: 'Add color to logo',
            amountToPay: '$100',
            tasks: ['Complete 2 drafts', 'Add color to logo'],
            isOpen: true,
        },
        {
            id: 2,
            title: 'Milestone 2',
            numberOfDrafts: 3,
            todoDescription: 'Finalize logo design',
            amountToPay: '$150',
            tasks: ['Finalize logo design'],
            isOpen: false,
        },
        {
            id: 3,
            title: 'Milestone 3',
            numberOfDrafts: 1,
            todoDescription: 'Prepare final deliverables',
            amountToPay: '$200',
            tasks: ['Prepare final deliverables'],
            isOpen: false,
        },
        {
            id: 4,
            title: 'Review',
            numberOfDrafts: 0,
            todoDescription: '',
            amountToPay: '',
            tasks: [],
            isOpen: false,
        },
        {
            id: 5,
            title: 'Work completed',
            numberOfDrafts: 0,
            todoDescription: '',
            amountToPay: '',
            tasks: [],
            isOpen: false,
        },
    ];

    const toggleMilestone = (id: number) => {
        setOpenMilestones((prev) =>
            prev.includes(id)
                ? prev.filter((milestoneId) => milestoneId !== id)
                : [...prev, id]
        );
    };

    const handleFileUpload = () => {
        document.getElementById('file-input')?.click();
    };

    const handleGiveReview = () => {
        setIsReviewPopupOpen(true);
    };

    const handleRatingSelect = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleReviewSubmit = () => {
        console.log('Review submitted:', { rating: selectedRating, reviewText });
        setIsReviewPopupOpen(false);
        setReviewText('');
        setSelectedRating(0);
    };

    const handleCloseReviewPopup = () => {
        setIsReviewPopupOpen(false);
    };

    const toggleContractSection = () => {
        setIsContractOpen(!isContractOpen);
    };

    const handleEndContract = () => {
        setIsEndContractPopupOpen(true);
    };

    const handleCloseEndContractPopup = () => {
        setIsEndContractPopupOpen(false);
    };

    const handleConfirmEndContract = () => {
        setIsEndContractPopupOpen(false);
        setIsCancellationPayoutPopupOpen(true);
    };

    const handleCloseCancellationPayoutPopup = () => {
        setIsCancellationPayoutPopupOpen(false);
    };

    return (
        <div className="bg-[#E0F7FA] p-4 shadow-md w-[300px] pt-16">
            <h2 className="text-lg font-bold mb-4">Progress</h2>

            {/* Collaboration Contract Section */}
            <div>
                <div onClick={toggleContractSection} className="cursor-pointer flex items-center mb-4">
                    <span className={`mr-2 transition-transform duration-200 ${isContractOpen ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                    <span className="font-semibold">Collaboration Contract</span>
                </div>
                {isContractOpen && (
                    <div className="ml-4">
                        <div className="flex items-center mt-2">
                            <a href="#" className="text-[#0B2147] hover:underline mr-2">Service Contract</a>
                            <span className="text-xs text-gray-500">1.3 MB</span>
                            <button className="ml-auto">
                                <svg
                                    className="w-5 h-5 text-[#0B2147]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m-3-3l3 3 3-3m-3 3V4" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">$300 paid for Milestone 1</div>
                        <div className="mt-2">
                            <button className="bg-[#E1824F] text-white rounded-lg px-4 py-1 mr-2">View</button>
                            <button className="bg-[#E1824F] text-white rounded-lg px-4 py-1" onClick={handleEndContract}>End Contract</button>
                        </div>
                    </div>
                )}
            </div>

            <ul className="space-y-4">
                {milestones.length > 0 ? milestones.map((milestone) => (
                    <li key={milestone.id}>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleMilestone(milestone.id)}
                        >
                            <span className={`mr-2 text-black transition-transform duration-200 ${openMilestones.includes(milestone.id) ? 'rotate-90' : ''}`}>
                                ▶
                            </span>
                            <span className="font-semibold">{milestone.title}</span>
                        </div>
                        {openMilestones.includes(milestone.id) && (
                            <div className="ml-4 mt-2">
                                <ul className="list-disc list-inside">
                                    <li>{`Completed ${milestone.numberOfDrafts} drafts`}</li>
                                    <li>{milestone.todoDescription}</li>
                                    <li>{`Amount to pay: ${milestone.amountToPay}`}</li>
                                </ul>
                                {milestone.title === 'Review' ? (
                                    <button
                                        className="bg-[#E1824F] text-white rounded-lg px-2 py-1 mt-2"
                                        onClick={handleGiveReview}
                                    >
                                        Give Review
                                    </button>
                                ) : (
                                    <button
                                        className="bg-[#E1824F] text-white rounded-lg px-2 py-1 mt-2"
                                        onClick={handleFileUpload}
                                    >
                                        Submit work
                                    </button>
                                )}
                            </div>
                        )}
                    </li>
                )) : (
                    <li>No milestones available</li>
                )}
            </ul>

            <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        alert(`File ${file.name} selected`);
                    }
                }}
            />

            {/* End Contract Confirmation Popup */}
            {isEndContractPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[400px] relative">
                        <h2 className="text-lg font-bold mb-4">Are you sure you want to end contract?</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Both parties have to agree to end collaboration. The payment for the current milestone will still be sent to your collaborator.
                        </p>
                        <div className="flex justify-center">
                            <button
                                className="bg-[#E1824F] text-white rounded-lg px-4 py-2 mr-2"
                                onClick={handleConfirmEndContract} // Opens the next modal
                            >
                                Yes, end collaboration
                            </button>
                            <button
                                className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
                                onClick={handleCloseEndContractPopup}
                            >
                                No, continue collaboration
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancellation Payout Terms Popup */}
            {isCancellationPayoutPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[400px] relative">
                        <h2 className="text-lg font-bold mb-4">Cancellation Payout Terms</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            By default, the payment for <span className="font-bold">milestone 2</span> will still be released to <span className="font-bold">Freelancer Aems/you</span>. If you wish to appeal the payment amount, key in the amount below. The remaining amount will be released back to <span className="font-bold">you/employer</span>. Both you and <span className="font-bold">Freelancer Aems</span> will need to agree for money to be released.
                        </p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold">Current payout for milestone 2: $210</span>
                            <button className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2">Appeal Payout</button>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-[#E1824F] text-white rounded-lg px-4 py-2"
                                onClick={handleCloseCancellationPayoutPopup} // Closes the modal
                            >
                                Confirm Cancellation Payout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Popup */}
            {isReviewPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[400px] relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseReviewPopup}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-lg font-bold mb-4">What do you think of the service?</h2>
                        <div className="flex justify-center mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-3xl cursor-pointer ${selectedRating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                                    onClick={() => handleRatingSelect(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                            placeholder="Write your review"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <div className="flex justify-center">
                            <button
                                className="bg-[#E1824F] text-white rounded-lg px-4 py-2"
                                onClick={handleReviewSubmit}
                            >
                                Send Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressList;
