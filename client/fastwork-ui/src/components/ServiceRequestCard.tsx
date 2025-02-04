"use client";

import React, { useState } from "react";
import Image from "next/image";
import location from "@/../public/location-pin.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface ServiceRequest {
    title: string;
    work_category: string;
    company: string;
    location: string;
    employment_type: string;
    description_1: string;
    description_2: string;
    description_3: string;
    examples_of_work: string;
    submission_deadline: string;
    budget: string;
    language: string;
    days_left: string;
}

interface ServiceRequestCardProps {
    service: any;
    serviceRequest?: ServiceRequest;
    hasProfile: boolean;
    profilePic: string;
    applyDisplay?: boolean;
    price?: string;
    onAccept?: () => void;
    onEditOffer?: (newPrice: string) => void; // Updated to take new price
    onDeclineAndSendMessage?: () => void;
    onClick?: () => void;
}

const ServiceRequestCard = ({
    service, //TODO: remove
    serviceRequest,
    hasProfile,
    profilePic,
    applyDisplay = true,
    price,
    onAccept,
    onEditOffer,
    onDeclineAndSendMessage,
    onClick,
}: ServiceRequestCardProps): React.ReactElement => {
    const router = useRouter();
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const [deliverable, setDeliverable] = useState("");
    const [checkpoints, setCheckpoints] = useState<
        { id: number; deliverable: string; payment: string }[]
    >([]);
    const [focusStates, setFocusStates] = useState<{ [key: number]: boolean }>(
        {}
    );


    const handleAddCheckpoint = () => {
        const newId = checkpoints.length + 1;
        setCheckpoints([
            ...checkpoints,
            { id: newId, deliverable: "", payment: "" },
        ]);
        setFocusStates({ ...focusStates, [newId]: true });
    };

    const handleDeleteCheckpoint = (index: number) => {
        const newCheckpoints = [...checkpoints];
        newCheckpoints.splice(index, 1);
        setCheckpoints(newCheckpoints);
    };

    const handleCheckpointChange = (
        index: number,
        field: string,
        value: string
    ) => {
        const newCheckpoints = [...checkpoints];
        newCheckpoints[index] = { ...newCheckpoints[index], [field]: value };
        setCheckpoints(newCheckpoints);
    };

    const handleFocus = (id: number) => {
        setFocusStates({ ...focusStates, [id]: false });
    };

    const handleBlur = (id: number) => {
        setFocusStates({ ...focusStates, [id]: false });
    };

    const handleServiceRequestClick = () => {
        console.log("Service request card clicked");
        // router.push('/description');
    };

    const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (hasProfile) {
            router.push("/chat");
        } else {
            router.push("/createProfile");
        }
    };

    const handleChat = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push("/chat");
    };

    const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowAcceptModal(true);
    };

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    };

    const handleEditOffer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditOfferSubmit = () => {
        if (onEditOffer) {
            onEditOffer(newPrice);
        }
        setShowEditModal(false);
    };

    const handleDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (onDeclineAndSendMessage) {
            onDeclineAndSendMessage();
        }
    };

    const handleConfirmAccept = () => {
        // Logic to handle the confirmation with price and deliverable
        console.log(`Price: ${newPrice}, Deliverable: ${deliverable}`);
        setShowAcceptModal(false);
    };

    return (
        <>
            <div className="job-div">
                <div
                    className="job-card hover:cursor-pointer bg-[#CFEDF4] p-4 rounded-lg shadow-md"
                    onClick={onClick}
                >
                    {/* Profile Pic */}
                    <div className="flex justify-between items-center space-x-1">
                        <div className="flex items-center space-x-1">
                            <span>
                                <Image
                                    width={50}
                                    height={50}
                                    src="/avatar.svg"
                                    alt="Profile Pic"
                                    className="h-8 w-8 border rounded-full mr-1"
                                />
                            </span>
                            <p className="font-medium text-sm">is looking for</p>
                        </div>
                        <p className="text-xs font-medium" style={styles.chip}>
                            {serviceRequest?.employment_type}
                        </p>
                    </div>

                    <div className="overflow-auto mb-2 ml-1 mt-1">
                        <h2 className="text-lg font-bold whitespace-nowrap">
                            {serviceRequest?.title ? serviceRequest.title.charAt(0).toUpperCase() + serviceRequest.title.slice(1) : ''}
                        </h2>
                    </div>

                    <div className="flex justify-start flex-col items-start">
                        <div className="flex justify-start items-center flex-col space-x-2">
                            <p className="text-sm font-medium ml-1 text-gray-700 ">
                                {serviceRequest?.work_category}
                            </p>
                        </div>
                        <div className="flex flex-row items-center mt-1 text-gray-700">
                            <MapPinIcon
                                className="w-5 h-5"
                            />
                            <p className="text-xs font-medium">
                                {serviceRequest?.location}
                            </p>
                        </div>
                    </div>
                    <div>
                        <span className="font-medium text-sm underline">
                            {serviceRequest?.company}
                        </span>
                    </div>
                    <div className="font-medium text-gray-700 my-2 overflow-y-scroll">
                        <ul className="list-disc pl-5 space-y-1 overflow-y-auto h-[70px]">
                            {serviceRequest?.description_1 && (
                                <li className="job-description text-xs">
                                    {serviceRequest.description_1}
                                </li>
                            )}
                            {serviceRequest?.description_2 && (
                                <li className="job-description text-xs">
                                    {serviceRequest.description_2}
                                </li>
                            )}
                            {serviceRequest?.description_3 && (
                                <li className="job-description text-xs">
                                    {serviceRequest.description_3}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs font-medium pl-2">
                            <span className="text-xs">Budget:</span>{serviceRequest?.budget}$
                        </p>
                    </div>
                    {/* chat and apply buttons */}
                    {applyDisplay && (
                        <div className="flex items-center justify-center mt-2 space-x-2">
                            <Link
                                href={{
                                    pathname: '/chat',
                                    query: {
                                        service: JSON.stringify(service),
                                    }
                                }}
                            >
                                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <svg
                                        className="w-6 h-6 text-black"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" />
                                    </svg>
                                </button>
                            </Link>
                            <button
                                className="bg-[#0B2147] text-white rounded-lg font-medium text-sm px-4 py-2 hover:bg-[#D0693B]"
                                onClick={handleApply}
                                style={{ borderColor: "transparent" }}
                            >
                                Apply
                            </button>
                        </div>
                    )}
                    {/* accept, edit offer, and decline buttons */}
                    {!applyDisplay && (
                        <div className="flex items-center justify-center mt-2 space-x-2">
                            <button
                                className="bg-[#0B2147] text-white rounded-xl px-4 py-2 hover:bg-[#D0693B] text-sm"
                                onClick={handleApply}
                                style={{ borderColor: "transparent" }}
                            >
                                Accept
                            </button>
                            <button
                                className="bg-[#0B2147] text-white rounded-xl px-4 py-2 hover:bg-[#D0693B] text-sm"
                                onClick={handleEditOffer}
                                style={{ borderColor: "transparent" }}
                            >
                                Edit Offer
                            </button>
                            <button
                                className="bg-[#0B2147] text-white rounded-xl px-4 py-2 hover:bg-[#D0693B] text-sm"
                                onClick={handleDecline}
                                style={{ borderColor: "transparent" }}
                            >
                                Decline
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Accept Modal */}
            {showAcceptModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[50rem] relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseAcceptModal}
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
                        <div className="flex items-center mb-4">
                            <img
                                src={profilePic}
                                alt="Profile Pic"
                                className="h-12 w-12 rounded-full mr-4"
                            />
                            <h3 className="text-lg font-medium">
                                Logo designer
                            </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="col-span-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        value={newPrice}
                                        onChange={(e) =>
                                            setNewPrice(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg mt-1"
                                        placeholder="$200"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Deliverable
                                    </label>
                                    <textarea
                                        value={deliverable}
                                        onChange={(e) =>
                                            setDeliverable(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg mt-1"
                                        placeholder="3 sets of logo design"
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <button
                                    className="flex items-center bg-[#E1824F] text-white rounded-lg p-2 mb-2"
                                    onClick={handleAddCheckpoint}
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>
                                <p className="text-sm text-gray-700">
                                    Add checkpoints
                                </p>
                            </div>
                        </div>

                        {/* Checkpoints */}
                        <div className="overflow-y-auto max-h-60 mb-4">
                            {checkpoints.map((checkpoint, index) => (
                                <div
                                    key={checkpoint.id}
                                    className="grid grid-cols-4 gap-4 mb-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Checkpoint {checkpoint.id}
                                        </label>
                                    </div>
                                    <div className="col-span-2 flex gap-2">
                                        <input
                                            type="text"
                                            value={checkpoint.deliverable}
                                            onFocus={() =>
                                                handleFocus(checkpoint.id)
                                            }
                                            onBlur={() =>
                                                handleBlur(checkpoint.id)
                                            }
                                            onChange={(e) =>
                                                handleCheckpointChange(
                                                    index,
                                                    "deliverable",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg mt-1 ${focusStates[checkpoint.id]
                                                ? ""
                                                : "border-none"
                                                }`}
                                            placeholder="deliverable"
                                        />
                                        <input
                                            type="text"
                                            value={checkpoint.payment}
                                            onFocus={() =>
                                                handleFocus(checkpoint.id)
                                            }
                                            onBlur={() =>
                                                handleBlur(checkpoint.id)
                                            }
                                            onChange={(e) =>
                                                handleCheckpointChange(
                                                    index,
                                                    "payment",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg mt-1 ${focusStates[checkpoint.id]
                                                ? ""
                                                : "border-none"
                                                }`}
                                            placeholder="Payment"
                                        />
                                    </div>
                                    {index === checkpoints.length - 1 && (
                                        <div className="flex items-end justify-center">
                                            <button
                                                className="flex items-center bg-[#E1824F] text-white rounded-lg p-2 mb-2"
                                                onClick={() =>
                                                    handleDeleteCheckpoint(
                                                        index
                                                    )
                                                }
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
                                                        d="M20 12H4"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-[#E1824F] text-white rounded-lg px-4 py-2"
                                onClick={handleConfirmAccept}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Offer Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Offer</h2>
                        <p className="mb-4">Enter your new suggested price:</p>
                        <input
                            type="text"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-md"
                        />
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 bg-[#0C2348] text-white rounded-lg font-medium hover:bg-[#D0693B]"
                                onClick={handleEditOfferSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
                                onClick={handleCloseEditModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
const styles = {
    chip: {
        padding: "0.3rem 1rem", // Increased padding for comfort
        borderRadius: "9999px", // Smooth, rounded edges
        backgroundColor: "#b3e5fc", // Softer background color for user-friendliness
        color: "#01579b", // Darker text color for improved readability
        fontSize: "0.6rem", // Slightly larger font for better visibility
        fontWeight: 600, // Bolder text for emphasis
        display: "inline-flex", // Ensures proper flexbox alignment
        alignItems: "center", // Vertical centering
        justifyContent: "center", // Horizontal centering
        whiteSpace: "nowrap", // Prevents text wrapping
        alignContent: "center",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Adds subtle depth with a shadow
        margin: "0.25rem", // Adds spacing between chips
    },
};

export default ServiceRequestCard;
