"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13 and later
import ChatMessageBig from "@/components/ChatMessageBig";

import { supabase } from "@/app/config/supabaseClient";
import { Message, ActiveChat, CurrentUser } from "../../interfaces";
import ContractCard from "@/components/ContractCard";

interface RecipientUser {
    id: number;
    fullName: string;
    avatar: string;
}

interface DetailsProps {
    activeChat: ActiveChat;
    recipientUser?: RecipientUser;
}

const Details: React.FC<DetailsProps> = ({
    activeChat,
    recipientUser,
}) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>(activeChat.messages);
    const [currentUser, setCurrentUser] = useState<CurrentUser>();
    const [isContractVisible, setIsContractVisible] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const [deliverable, setDeliverable] = useState("");
    const [checkpoints, setCheckpoints] = useState([
        { id: 1, deliverable: "Initial logo concepts", payment: "$100" },
        { id: 2, deliverable: "First draft of logo", payment: "$150" },
        { id: 3, deliverable: "Final logo delivery", payment: "$200" },
    ]);
    const [focusStates, setFocusStates] = useState<{ [key: number]: boolean }>(
        {}
    );
    const [file, setFile] = useState<File | null>(null);
    const [isAccepted, setIsAccepted] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("userInfo");
        if (userData) {
            const parsed = JSON.parse(userData);
            setCurrentUser(parsed);
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (recipientUser && currentUser) {
                const { data, error } = await supabase
                    .from("messages")
                    .select("*")
                    .or(
                        `sender_id.eq.${currentUser.userid},recipient_id.eq.${currentUser.userid}`
                    )
                    .or(
                        `sender_id.eq.${recipientUser.id},recipient_id.eq.${recipientUser.id}`
                    )
                    .order("created_at", { ascending: true });

                if (error) {
                    console.error("Error fetching messages:", error);
                } else {
                    setMessages(data);
                }
            }
        };

        fetchMessages();
    }, [recipientUser, newMessage, currentUser]);

    const handleMessageSubmit = async () => {
        if (newMessage.trim() !== "" && recipientUser && currentUser) {
            const { error } = await supabase.from("messages").insert([
                {
                    sender_id: currentUser.userid,
                    recipient_id: recipientUser.id,
                    sender: currentUser.username,
                    recipient: recipientUser.fullName,
                    text: newMessage,
                    avatar: currentUser.avatar || "/avatar.svg",
                    sentByCurrentUser: currentUser.userid === 1,
                },
            ]);
            if (error) {
                console.error("Error inserting message:", error);
            } else {
                setNewMessage("");
            }
        }
    };

    const handleDeclineAndSendMessage = () => {
        const newMessageObj: Message = {
            id: messages.length + 1,
            sender: "You",
            avatar: "/avatar.svg",
            text: "Offer declined.",
            sentByCurrentUser: true,
        };
        setMessages([...messages, newMessageObj]);
    };

    const handleViewContractDetails = () => {
        setIsContractVisible(true);
    };

    const handleCloseContract = () => {
        setIsContractVisible(false);
    };

    const handleAccept = () => {
        setIsAccepted(true);
        setShowAcceptModal(true);
    };

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    };

    const handleConfirmAccept = () => {
        console.log(`Price: ${newPrice}, Deliverable: ${deliverable}`);
        console.log("Checkpoints:", checkpoints);
        setShowAcceptModal(false);
    };

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

    const handlePayAll = () => {
        router.push("/payment");
    };

    const handlePaySelected = () => {
        router.push("/payment");
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmitWork = () => {
        // Trigger the file input click event
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="px-4 py-3 border-b border-b-gray-200">
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={recipientUser?.avatar || "/avatar.svg"}
                        alt={recipientUser?.fullName}
                    />
                    <div>
                        <div className="text-lg font-bold">
                            {recipientUser?.fullName}
                        </div>
                        <div className="text-xs text-gray-500">
                            Last seen yesterday, 23:88
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    is offering
                    <span className="font-bold text-black">Plumbing</span>
                </div>
                <div className="flex items-center space-x-1">
                    {!isAccepted ? (
                        <>
                            <button
                                className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1"
                                onClick={handleAccept}
                            >
                                ✔️
                            </button>
                            <button
                                className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1"
                                onClick={handleDeclineAndSendMessage}
                            >
                                ❌
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="flex-grow bg-[#71BAC7] text-white rounded-lg text-xs p-1">
                                Current Milestone: 1
                            </button>
                            <button
                                className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1"
                                onClick={handleSubmitWork}
                            >
                                Submit Work
                            </button>
                            <button
                                className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1"
                                onClick={() => setShowPaymentModal(true)}
                            >
                                Pay
                            </button>
                        </>
                    )}
                    <button
                        className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1"
                        onClick={handleViewContractDetails}
                    >
                        View Contract
                    </button>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500">
                {recipientUser?.fullName} has applied for your service
                request: Plumbing service. Accept, reject or edit contract
                offer.
            </div>
        </div>
    );
};

export default Details;
