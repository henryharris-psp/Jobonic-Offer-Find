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

const ProgressSidebar: React.FC = () => {
    const [openMilestones, setOpenMilestones] = useState<number[]>([]);
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

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

    return (
        <div className="bg-[#E0F7FA] p-4 rounded-lg shadow-md w-[300px]">
            <h2 className="text-lg font-bold mb-4">Progress</h2>
            <ul className="space-y-2">
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

export default ProgressSidebar;

