import React, { useState, useEffect } from 'react';
import SideBarIcon from "@/components/google_apple_button/SideBarIcon";
import { TrashIcon, PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import httpClient from '@/client/httpClient';
import { chatFilters } from '@/data/chat';
import { useChat } from '@/contexts/chat';

interface Milestone {
    id: string;
    title: string;
    amountToPay: number;
    tasks: string[];
    isOpen: boolean;
    serviceId: string;
}

const ProgressList: React.FC = () => {
    const [openMilestones, setOpenMilestones] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isContractOpen, setIsContractOpen] = useState(false);
    const [isEndContractPopupOpen, setIsEndContractPopupOpen] = useState(false);
    const [isCancellationPayoutPopupOpen, setIsCancellationPayoutPopupOpen] = useState(false);
    const chat = useChat();
    const [milestone, setNewMilestone] = useState<Milestone>({
        id: '',
        title: '',
        amountToPay: 0,
        tasks: [],
        isOpen: false,
        serviceId: '',
    });

    useEffect(() => {
        const fetchMilestones = async () => {
            try {

                const serviceId = chat.activeChatRoom?.service_id;

                const response = await httpClient.get('/checkpoint/all');
                const data = response.data;

                
                data.forEach((milestone: Milestone) => {
                    console.log(`Milestone ID: ${milestone.id}, CreatedBy: ${milestone.serviceId}, ServiceID: ${serviceId}`);
                });

                // Apply filtering logic
                const filteredMilestones = data.filter((milestone: Milestone) => milestone.serviceId === serviceId);

                setMilestones(filteredMilestones);
            } catch (error) {
                console.error('Error fetching milestones:', error);
            }
        };

        fetchMilestones();
    }, [chat.activeChatRoom?.service_id]);



    const toggleMilestone = (id: string) => {
        setOpenMilestones((prev) =>
            prev.includes(id) ? prev.filter((milestoneId) => milestoneId !== id) : [...prev, id]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMilestone({ ...milestone, [name]: value });
    };

    const addMilestone = () => {
        
        setMilestones([...milestones, milestone]);
        setIsModalOpen(false);
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
        <div className="bg-[#E0F7FA] p-4 shadow-md w-[300px] pt-16 max-h-screen overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Progress</h2>

            {/* Collaboration Contract Section */}
            <div>
                <div onClick={toggleContractSection} className="cursor-pointer flex items-center mb-4">
                    <span className={`mr-2 transition-transform duration-200 ${isContractOpen ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                    <span className="font-semibold text-md">Collaboration Contract</span>
                </div>
                {isContractOpen && (
                    <div className="ml-6">
                        <div className="flex items-center mt-2">
                            <a href="#" className="text-[#0B2147] font-bold text-sm hover:underline mr-2">Service Contract</a>
                            <span className="text-xs text-gray-500 mr-2">1.3 MB</span>
                            <ArrowDownTrayIcon className="size-4 text-gray-700 cursor-pointer" />
                        </div>
                        <div className="text-sm font-bold text-gray-600 mt-2">$300 paid for Milestone 1</div>
                        <div className="flex mt-2">
                            <button className="bg-[#E1824F] text-sm text-white rounded-lg px-4 py-1 mr-2">View</button>
                            <button className="bg-[#E1824F] text-sm text-white rounded-lg px-4 py-1"
                                onClick={handleEndContract}>End Contract
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full h-[2px] bg-[#E2EEEE] mb-4 mt-4"></div>
            <div className="flex justify-between items-center mt-2 mb-2">
                <span className="font-semibold">Add Another Milestone</span>
                <SideBarIcon icon={<PlusIcon className="size-3 text-white font-bold cursor-pointer" />}
                             onClick={() => setIsModalOpen(true)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="flex flex-col w-full max-w-lg p-8 rounded-xl bg-[#CFEDF4]">
                        <h2 className="font-bold text-2xl text-center text-[#002D74] mb-6">Add Milestone</h2>
                        <div className="flex-1">
                            <p className="font-bold text-md ml-1 mb-2">Milestone Title</p>
                            <input
                                type="text"
                                name="title"
                                placeholder="Milestone Title"
                                value={milestone.title}
                                onChange={handleInputChange}
                                className="border-green-200 rounded-xl bg-[#e8f3f3] focus:outline-0 hover:outline-0 w-full"
                            />
                        </div>

                        <div className="flex-1 mt-4">
                                <p className="font-bold text-md ml-1 mb-2">Task</p>
                                <input
                                    type="text"
                                    name="todoDescription"
                                    placeholder="To-Do Description"
                                    value={milestone.tasks}
                                    onChange={handleInputChange}
                                    className="border-green-200 rounded-xl bg-[#e8f3f3] focus:outline-0 hover:outline-0 w-full"
                                />
                            </div>

                        <div className="flex-1 mt-4">
                            <p className="font-bold text-md ml-1 mb-2">Amount To Pay</p>
                            <input
                                type="text"
                                name="amountToPay"
                                placeholder="Amount to Pay"
                                value={milestone.amountToPay}
                                onChange={handleInputChange}
                                className="border-green-200 rounded-xl bg-[#e8f3f3] focus:outline-0 hover:outline-0 w-full"
                            />
                        </div>

                        <div className="flex justify-center items-center mt-6">
                            <button
                                onClick={addMilestone}
                                className="text-white whitespace-nowrap bg-orange-500 hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-2 mx-2 my-2"
                            >
                                Save
                            </button>
                            <button onClick={() => setIsModalOpen(false)}
                                className="text-white whitespace-nowrap bg-gray-500 hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ul className="space-y-4">
                {milestones.length > 0 ? milestones.map((milestone) => (
                    <li key={milestone.id}>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleMilestone(milestone.id)}
                        >
                            <span
                                className={`mr-2 text-black transition-transform duration-200 ${openMilestones.includes(milestone.id) ? 'rotate-90' : ''}`}>
                                ▶
                            </span>
                            <span className="font-semibold text-md">{milestone.title}</span>
                        </div>
                        {openMilestones.includes(milestone.id) && (
                            <div className="ml-4 mt-2">
                                <ul className="list-disc list-outside font-bold text-sm ml-6">
                                    <li>{milestone.tasks.join(', ')}</li>
                                    <li>{`Amount to pay: ${milestone.amountToPay}`}</li>
                                </ul>
                                {milestone.title === 'Review' ? (
                                    <button
                                        className="bg-[#E1824F] text-sm text-white rounded-lg px-4 py-1 mt-2 ml-4"
                                        onClick={handleGiveReview}
                                    >
                                        Give Review
                                    </button>
                                ) : (
                                    <button
                                        className="bg-[#E1824F] text-sm text-white rounded-lg px-4 py-1 mt-2 ml-4"
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
                    <div className="bg-white rounded-xl p-8 shadow-lg w-1/2 relative">
                        <h2 className="text-lg font-bold mb-4 text-center">Are you sure you want to end contract?</h2>
                        <div className="text-center">
                            <p className="text-sm text-gray-600 text-center">
                                Both parties have to agree to end collaboration.
                            </p>
                            <p className="text-sm text-gray-600 mb-4 text-center">
                                The payment for the current milestone will still be sent to your collaborator.
                            </p>
                        </div>

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
                    <div className="bg-white rounded-lg p-8 shadow-lg w-1/2 relative">
                        <h2 className="text-lg font-bold mb-4 text-center">Cancellation Payout Terms</h2>
                        <p className="text-sm text-gray-600 text-center mb-4">
                            By default, the payment for <span className="font-bold">milestone 2</span> will still be
                            released to <span className="font-bold">Freelancer Aems/you</span>. If you wish to
                            appeal the payment amount, key in the amount below. The remaining amount will be released back
                            to <span className="font-bold">you/employer</span>. Both you and <span
                                className="font-bold">Freelancer Aems</span> will need to agree for money to be
                            released.
                        </p>
                        <div className="flex justify-center items-center mb-4">
                            <span className="text-md mr-6 font-bold">Current payout for milestone 2: $210</span>
                            <button className="bg-gray-200 text-gray-700 rounded-xl px-4 py-2">Appeal Payout
                            </button>
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
