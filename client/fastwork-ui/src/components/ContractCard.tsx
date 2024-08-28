import React, { useState } from 'react';
import {useSelector} from "react-redux";
import {Task} from "@firebase/vertexai-preview/dist/src/requests/request";
import {RootState} from "@/store";
import httpClient from "@/client/httpClient";
import {toast} from "react-toastify";

const ContractCard: React.FC<{ handleCloseModal: () => void }> = ({ handleCloseModal }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [price, setPrice] = useState('200');
    const [deliverables, setDeliverables] = useState(['3 sets of logo design', '3 sets of logo design']);
    const [milestones, setMilestones] = useState([
        { title: 'Milestone 1', tasks: ['Design colour scheme', 'Create logo draft'], payment: '10% payment: $100' },
        { title: 'Milestone 2', tasks: ['Logo draft 2', 'Due by: 5 August 2025'], payment: '40% payment: $100' },
        { title: 'Milestone 3', tasks: ['Logo draft 3', 'Due by: 5 August 2025'], payment: '40% payment: $200' },
    ]);
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleContract = async () => {
        const dynamicServiceId = "";
        const dynamicProfileId = authUser?.id || 1;

        const payload = {
            id: 1,
            serviceId: dynamicServiceId,
            profileId: dynamicProfileId,
            paymentTotal: parseFloat(price),
            numberOfCheckpoints: milestones.length,
            numberOfCheckpointsLeft: milestones.filter(m => m.payment).length,
            paymentMode: 'MILESTONE',
            status: '',
        };


        localStorage.setItem('contractData', JSON.stringify(payload));

        try {
            const response = await httpClient.post('/matches', payload);
            toast.success('Contract saved successfully!');
            setIsEditMode(false);
            handleCloseModal();
        } catch (error) {
            toast.error('An error occurred while saving the contract');
            console.error('Error:', error);
        }
    };



    const handleEditContract = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDeliverableChange = (index: number, value: string) => {
        const updatedDeliverables = [...deliverables];
        updatedDeliverables[index] = value;
        setDeliverables(updatedDeliverables);
    };

    const handleMilestoneChange = (milestoneIndex: number, taskIndex: number, value: string) => {
        const updatedMilestones = [...milestones];
        updatedMilestones[milestoneIndex].tasks[taskIndex] = value;
        setMilestones(updatedMilestones);
    };

    const handlePaymentChange = (index: number, value: string) => {
        const updatedMilestones = [...milestones];
        updatedMilestones[index].payment = value;
        setMilestones(updatedMilestones);
    };

    const handleAddDeliverable = () => {
        setDeliverables([...deliverables, '']);
    };

    const handleRemoveDeliverable = (index: number) => {
        const updatedDeliverables = deliverables.filter((_, i) => i !== index);
        setDeliverables(updatedDeliverables);
    };

    const handleAddMilestoneTask = (milestoneIndex: number) => {
        const updatedMilestones = [...milestones];
        updatedMilestones[milestoneIndex].tasks.push('');
        setMilestones(updatedMilestones);
    };

    const handleRemoveMilestoneTask = (milestoneIndex: number, taskIndex: number) => {
        const updatedMilestones = [...milestones];
        updatedMilestones[milestoneIndex].tasks = updatedMilestones[milestoneIndex].tasks.filter((_, i) => i !== taskIndex);
        setMilestones(updatedMilestones);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const handleSaveContract = () => {
        setIsEditMode(false);
        handleCloseModal(); // This will close the modal
    };

    return (
        <div className="flex flex-row border shadow-lg rounded-2xl bg-[#C8E0E2] p-4">
            <div className="flex flex-col w-[40%] pr-4">
                <div className="mb-4">
                    <div className="flex justify-start items-center">
                        <img
                            src=""
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                        />
                        <h2 className="text-xl font-bold ml-6">Logo designer</h2>
                    </div>

                    <div className="ml-4">
                        <p className="mt-2 text-gray-500 text-sm">Price :
                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="border bg-[#C8E0E2] text-sm rounded-lg p-1 ml-4"
                                />
                            ) : (
                                `$${price}`
                            )}
                        </p>
                        <p className="mt-2 text-gray-500 text-sm">Deliverable : </p>
                        <ul className="mt-2 ml-6 text-gray-500 text-sm">
                            {deliverables.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    {isEditMode ? (
                                        <>
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleDeliverableChange(index, e.target.value)}
                                                className="border bg-[#C8E0E2] text-sm rounded-lg p-1 mb-2 ml-8"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDeliverable(index)}
                                                className="text-gray-500 text-xs ml-2 "
                                            >
                                                ➖
                                            </button>
                                        </>
                                    ) : (
                                        item
                                    )}
                                </li>
                            ))}
                            {isEditMode && (
                                <button
                                    type="button"
                                    onClick={handleAddDeliverable}
                                    className="text-gray-500 text-xs mt-2 ml-6 flex items-center"
                                >
                                    ➕ Add Deliverable
                                </button>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="flex justify-start items-center">
                    <button
                        className="bg-[#E1824F] text-white rounded-3xl text-md p-2 mt-4 mr-4"
                        onClick={handleContract}
                    >
                        ✔️
                    </button>

                    <button
                        className="bg-[#E1824F] text-white rounded-3xl text-md p-2 mt-4 mr-4"
                        onClick={handleCancelEdit}
                    >
                        ❌
                    </button>
                    <button
                        className="mt-4 bg-[#E1824F] text-white w-full p-2 rounded-lg"
                        onClick={handleEditContract}
                    >
                        {isEditMode ? 'Save' : 'Edit Contract'}
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-[60%] max-h-96 overflow-y-auto">
                {milestones.map((milestone, index) => (
                    <React.Fragment key={index}>
                        <div className="flex justify-start items-center mt-8 mb-4">
                            <h3 className="font-bold mr-4 text-center p-4 text-sm">{milestone.title}</h3>
                            <ul className="font-bold mr-8 text-sm flex-grow">
                                {milestone.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex} className="flex items-center">
                                        {isEditMode ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={task}
                                                    onChange={(e) => handleMilestoneChange(index, taskIndex, e.target.value)}
                                                    className="border bg-[#C8E0E2] text-sm rounded-lg mb-2 p-1 ml-4"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveMilestoneTask(index, taskIndex)}
                                                    className="text-gray-500  text-xs ml-2"
                                                >
                                                    ➖
                                                </button>
                                            </>
                                        ) : (
                                            task
                                        )}
                                    </li>
                                ))}
                                {isEditMode && (
                                    <button
                                        type="button"
                                        onClick={() => handleAddMilestoneTask(index)}
                                        className="text-gray-500 text-xs ml-6 flex items-center"
                                    >
                                        ➕ Add Task
                                    </button>
                                )}
                            </ul>
                            <p className="font-bold text-sm">
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        value={milestone.payment}
                                        onChange={(e) => handlePaymentChange(index, e.target.value)}
                                        className="border bg-[#C8E0E2] text-sm rounded-lg p-1 mb-2 mr-4"
                                    />
                                ) : (
                                    milestone.payment
                                )}
                            </p>
                        </div>
                        <div className="w-full h-[2px] bg-[#E2EEEE] flex-grow"></div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ContractCard;
