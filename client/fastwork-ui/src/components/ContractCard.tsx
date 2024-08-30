import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import httpClient from "@/client/httpClient";
import { toast } from "react-toastify";
import {useChat} from "@/contexts/chat";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Fragment} from "react";
import axios from 'axios';
import StringParser from '@/functions/stringParsers';
interface Milestone {
    title: string;
    tasks: string[];
    payment: string;
}

const ContractCard: React.FC = () => {

    const [showMilestones, setShowMilestones] = useState(false);
    const {activeChatRoom} = useChat();
    const [isEditMode, setIsEditMode] = useState(true);
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [deliverables, setDeliverables] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false); // Track saving state
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message popup
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const { authUser } = useSelector((state: RootState) => state.auth);
    const stringParser = new StringParser();

    const handlePriceChange = (newPrice: number) => {
        setPrice(newPrice);
    };

    //Add new milestones
    const handleAddMilestone = () => {
        setShowMilestones(true);
        const newMilestone = {
            title: `Milestone ${milestones.length + 1}`,
            tasks: [],
            payment: '',
        };
        setMilestones([...milestones, newMilestone]);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);


    const handleSaveMilestones = async () => {
     
        setIsSaving(true); // Start saving state

        // Check for necessary data
        if (!activeChatRoom || !activeChatRoom.service_id || !activeChatRoom.service?.profileDTO?.id) {
            toast.error('Missing required chat room data.');
            return;
        }
    
        // Prepare contract payload
        const contractPayload = {
            serviceId: activeChatRoom.service_id, 
            profileId: activeChatRoom.service?.profileDTO?.id,
            deliverable: deliverables || '',
            paymentTotal: price || 0,
            paymentMode: 'MILESTONE', 
            status: stringParser.convertToUpperCase(activeChatRoom.status ?? ''),  // Ensure no spaces
        };
        
        console.log("Contract Payload Before Sending:", JSON.stringify(contractPayload, null, 2));
        
    
        // Log payload for debugging
        console.log("Contract Payload:", JSON.stringify(contractPayload, null, 2));
        console.log("Payment Total:", contractPayload.paymentTotal, "Type:", typeof contractPayload.paymentTotal);
    
        // Log milestone payloads for debugging
        //
    
        try {
            // Post contract payload
            const contractResponse = await httpClient.post('/matches', contractPayload);
            toast.success("Contract saved successfully.");
            console.log('Contract saved successfully:', contractResponse.data);
    
             // Prepare milestone payloads
        const milestonePayloads = milestones.map((milestone) => ({
            serviceId: activeChatRoom.service_id,
            price: price || 0, 
            matchId : contractResponse.data.id,
            title: milestone.title || '', 
            tasks: milestone.tasks || [],
            payment: milestone.payment || '', 
        }));

        console.log("Milestone Payloads:", JSON.stringify(milestonePayloads, null, 2));

            // Post each milestone payload
            const milestonePromises = milestonePayloads.map(payload =>
                httpClient.post('/checkpoint', payload)
            );
    
            const milestoneResponses = await Promise.all(milestonePromises);
            milestoneResponses.forEach(response =>
                console.log('Milestone saved successfully:', response.data)
            );
            toast.success("Milestones saved successfully.");

            setShowSuccessMessage(true); // Show success message

            setTimeout(() => {
                setShowSuccessMessage(false); // Hide success message after 5 seconds
            }, 5000);
    
        } catch (error: unknown) {
            // Enhanced error handling
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response Error:', error.response.data);
                    toast.error(`Error: ${error.response.data.message || 'An error occurred while saving data.'}`);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Request Error:', error.request);
                    toast.error('No response received from server.');
                } else {
                    // Something else caused the error
                    console.error('Unexpected Error:', error.message);
                    toast.error('An unexpected error occurred.');
                }
            } else {
                // Non-Axios error
                console.error('Unexpected Error Type:', error);
                toast.error('An unexpected error occurred.');
            }
        }finally {
            setIsSaving(false); // End saving state
        }
    };
    
    

    const handleEditContract = () => {
        setIsEditMode(!isEditMode);
    };

    const handleMilestoneChange = (milestoneIndex: number, taskIndex: number, value: string) => {
        const updatedMilestones = milestones.map((milestone, index) => {
            if (index === milestoneIndex) {
                const updatedTasks = milestone.tasks.map((task, tIndex) => (tIndex === taskIndex ? value : task));
                return { ...milestone, tasks: updatedTasks };
            }
            return milestone;
        });
        setMilestones(updatedMilestones);
    };

    const handlePaymentChange = (milestoneIndex: number, value: string) => {
        const updatedMilestones = milestones.map((milestone, index) =>
            index === milestoneIndex ? { ...milestone, payment: value } : milestone
        );
        setMilestones(updatedMilestones);
    };

    const handleAddMilestoneTask = (milestoneIndex: number) => {
        const updatedMilestones = milestones.map((milestone, index) => {
            if (index === milestoneIndex) {
                return { ...milestone, tasks: [...milestone.tasks, ''] };
            }
            return milestone;
        });
        setMilestones(updatedMilestones);
    };

    const handleRemoveMilestoneTask = (milestoneIndex: number, taskIndex: number) => {
        const updatedMilestones = milestones.map((milestone, index) => {
            if (index === milestoneIndex) {
                const updatedTasks = milestone.tasks.filter((_, tIndex) => tIndex !== taskIndex);
                return { ...milestone, tasks: updatedTasks };
            }
            return milestone;
        });
        setMilestones(updatedMilestones);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const handleSaveContract = () => {
        setIsEditMode(false);
    };

    return (
        <div className=" w-auto items-center p-5 border bg-[#CFEDF4] rounded-2xl shadow-lg max-h-screen overflow-y-auto hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {showSuccessMessage && (
                <div className="fixed top-0 left-0 right-0 flex items-center justify-center bg-green-500 text-white py-3 px-6 z-50 rounded-md shadow-lg">
                    Contract created successfully!
                </div>
            )}

            <div className="flex">

                <div className="flex flex-col mb-4 sm:mb-0">
                    <div className="flex justify-start items-center mt-4 mb-6 ">
                        <img src="/profile.png" alt="Profile" className="w-16 h-16 rounded-full"/>
                        <h2 className="text-xl font-bold ml-6">Logo designer</h2>
                    </div>

                    <div className="ml-4">
                        <div className="flex items-center">
                            <p className="text-gray-500 text-sm">
                                Price:
                            </p>
                            <div className=" text-gray-500 text-sm ml-16">
                                {isEditMode ? (
                                    <input
                                    type="number"
                                    value={price ?? ''}
                                    placeholder="$200"
                                    onChange={(e) => setPrice(Number(e.target.value) || 0)} // Convert to a number, default to 0 if NaN
                                        className="border-gray-300 bg-[#e8f3f3] text-sm rounded-lg p-4"
                                    />
                                ) : (
                                    `$${price}`
                                )}
                            </div>
                        </div>

                        <div className="flex items-center mt-4">
                            <p className="mt-2 text-gray-500 text-sm">Deliverable:</p>
                            <div className="ml-6 text-gray-500 text-sm mt-2">

                                {isEditMode ? (

                                    <input

                                        type="text"
                                        placeholder="Set of milestones"
                                        value={deliverables}
                                        onChange={(e) => setDeliverables(e.target.value)}
                                        className="border-gray-300 bg-[#e8f3f3] text-sm rounded-lg p-4"
                                    />
                                ) : (
                                    deliverables
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col ml-6 mr-16 max-h-96 mt-4 overflow-y-auto xs:flex-col"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {showMilestones && milestones.map((milestone, index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-start items-center mb-4">
                                <h2 className="font-bold mr-4 text-center p-4 text-sm">{milestone.title}</h2>

                                <ul className="font-bold text-sm flex-grow ml-6">
                                    {milestone.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex} className="flex items-center mb-2">
                                            <span className="mr-3 text-lg" style={{marginRight: '8px'}}>•</span>
                                            <span style={{paddingLeft: '4px'}}>
                                            {isEditMode ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={task}
                                                        onChange={(e) => handleMilestoneChange(index, taskIndex, e.target.value)}
                                                        className="border bg-[#e8f3f3] text-sm rounded-lg p-1 ml-4"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveMilestoneTask(index, taskIndex)}
                                                        className="text-gray-500 text-xs ml-2"
                                                    >
                                                        ➖
                                                    </button>
                                                </>
                                            ) : (
                                                task
                                            )}
                                            </span>
                                        </li>
                                    ))}
                                    {isEditMode && (
                                        <button
                                            type="button"
                                            onClick={() => handleAddMilestoneTask(index)}
                                            className="text-gray-500 text-xs ml-1 flex items-center"
                                        >
                                            ➕ Add Task
                                        </button>
                                    )}
                                </ul>
                                <p className="font-bold text-sm ml-6 mb-2 mr-4">
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            placeholder="Payment"
                                            value={milestone.payment}
                                            onChange={(e) => handlePaymentChange(index, e.target.value)}
                                            className="border bg-[#e8f3f3] text-sm rounded-lg p-1 ml-2 mr-4"
                                        />
                                    ) : (
                                        milestone.payment
                                    )}
                                </p>
                            </div>
                            <div className="h-[1px] bg-[#b6b6b4] w-full m-0 mb-4"></div>
                        </React.Fragment>
                    ))}

                    {isEditMode && (
                        <div className="flex flex-col justify-center items-center ml-10 mt-10">
                            <button
                                type="button"
                                onClick={handleAddMilestone}
                                className="text-gray-500 text-sm ml-10 flex items-center mb-2"
                            >
                                <PlusIcon className="w-12 h-12 rounded-3xl bg-[#E1824F] font-bold text-white"/>
                            </button>
                            <p className="font-bold ml-6">Add Milestone</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-row justify-center items-center w-full mb-4 sm:mt-4 sm:ml-4">

                {isEditMode ? (
                    <>

                    <button
                        className="bg-[#E1824F] text-white rounded-3xl text-md p-2 mb-4 mt-4 w-40 sm:w-auto sm:px-10"
                        onClick={handleEditContract}
                    >
                        Save Contract
                    </button>
                    </>
                ) : (
                    <>

                    <button
                        className="bg-[#E1824F] text-white rounded-3xl text-md mt-4 p-2 mb-4 w-40 sm:w-auto sm:px-10"
                        onClick={handleSaveMilestones}
                    >
                        Confirm
                    </button>

                <button
                    className="bg-[#E1824F] text-white rounded-3xl text-md p-2 mt-4 ml-4 mb-4 w-40 sm:w-auto sm:px-10"
                    onClick={handleEditContract}
                >
                    Edit Contract
                </button>
                    </>
            )
            }
            </div>
        </div>
    );
};

export default ContractCard;