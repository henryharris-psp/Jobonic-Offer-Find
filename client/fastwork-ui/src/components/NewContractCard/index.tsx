import Image from 'next/image';
import React, { ChangeEvent, UIEvent, useEffect, useMemo, useState } from 'react'
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import Button from '../Button';
import MilestoneFormModal from './MilestoneFormModal';
import { Contract, Milestone } from '@/types/general';
import { useChat } from '@/contexts/chat';
import axios from 'axios';
import SafeInput, { SafeInputChangeEvent } from '../SafeInput';

interface NewContractCardProps {
    contract: Contract
}

const NewContractCard = ({
    contract
}: NewContractCardProps) => {
    const isEdit = Boolean(contract);
    const { activeChatRoom, sendMessage, updateChatRoom } = useChat();
    const [inputs, setInputs] = useState({
        price: isEdit ? contract.price : '',
        deliverable: isEdit ? contract.deliverable : ''
    });
    const [milestones, setMilestones] = useState<Milestone[]>(isEdit ? contract.milestones : []);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(!isEdit);
    const [showScrollShadow, setShowScrollShadow] = useState<boolean>(false);

    //for milestone modal
    const [showMilestoneFormModal, setShowMilestoneFormModal] = useState(false);
    const [targetMilestone, setTargetMilestone] = useState<Milestone | null>(null);

    //error handlers
        const [errorCheckable, setErrorCheckable] = useState(false);
            
        const inputErrors = useMemo( () => {
            const errors = [];
            
            if(!inputs.price){
                errors.push('price');
            }

            if(!inputs.deliverable){
                errors.push('deliverable');
            }

            return errors;
        }, [inputs]);

    //methods
        const handleInputChange = (e: SafeInputChangeEvent) => {
            const { name, value } = e.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }

        //for better UX -> to let user know that list is scrollable         
        const toggleScrollShadow = (e: UIEvent<HTMLDivElement>) => {
            const reachedTop = e.currentTarget.scrollTop <= 0;
            const reachedBottom = e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight;
        
            if (reachedTop || reachedBottom) {
                setShowScrollShadow(false);
            } else {
                setShowScrollShadow(true);
            }
        };

        const handleOnCreateContract = async () => {
            setErrorCheckable(true);
        
            if (inputErrors.length === 0) {
                setIsSubmitting(true);
        
                try {
                    const contractRes = await axios.post('http://localhost:8000/api/contracts', {
                        serviceId: activeChatRoom?.service_id,
                        price: inputs.price,
                        deliverable: inputs.deliverable
                    });
        
                    const contractId = contractRes.data.id;

                    if (milestones.length !== 0) {
                        for (const milestone of milestones) {
                            await axios.post('http://localhost:8000/api/milestones', {
                                contractId: contractId,
                                name: milestone.name,
                                price: milestone.price,
                                dueDate: milestone.dueDate,
                                tasks: milestone.tasks
                            });
                        }
                    }

                    await sendMessage('contract', contractId);
                    const newlySentMessage = await sendMessage('text', 'Contract is updated');

                    if(newlySentMessage){
                        await updateChatRoom(newlySentMessage.room_id, {
                            status: 'waiting_for_payment'
                        });
                    }

                    setShowMilestoneFormModal(false);
        
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsSubmitting(false);
                }
            }
        };

    //milestone modal handlers
        const handleOnClickMileStoneAdd = () => {
            setShowMilestoneFormModal(() => {
                setTargetMilestone(null);
                return true;
            });
        }

        const handleOnClickMileStoneEdit = (milestone: Milestone) => {
            setShowMilestoneFormModal(() => {
                setTargetMilestone(milestone);
                return true;
            });
        }

    //milestone CRUD handler
        const handleOnNewMilestoneAdded = (newMilestone: Milestone) => {
            setMilestones( prev => [...prev, newMilestone]);
            setShowMilestoneFormModal(false);
        }

        const handleOnMilestoneUpdated = (updatedMilestone: Milestone) => {
            setMilestones( prev => prev.map( milestone => milestone.id === updatedMilestone.id ? updatedMilestone : milestone ));
            setShowMilestoneFormModal(false);
        }

        const handleOnMilestoneDelete = (milestoneId: string | number) => {
            if(confirm('Are you sure want to delete?')){
                setMilestones( prev => prev.filter( milestone => milestone.id !== milestoneId ));
            }
        }

    return (
        <>
            <div className="flex flex-col max-h-screen bg-white rounded-2xl overflow-hidden">
                <div className="flex-1 flex flex-row flex-wrap gap-5 p-7 sm:p-10">

                    {/* form */}
                    <div className="flex-1 flex flex-col justify-between min-w-80 space-y-5 overflow-hidden">
                        <div className="space-y-5">
                            <div className="flex flex-row space-x-3 items-center">
                                <Image
                                    width={50}
                                    height={50}
                                    src="/profile.png" 
                                    alt="avatar"
                                    className="rounded-full w-14 h-14"
                                />
                                <span className="text-2xl font-bold">
                                    Logo Designer
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2 mx-1">
                                <div className="flex flex-row items-center justify-end space-x-3">
                                    <div className="flex justify-end w-32">
                                        <span className="text-sm text-gray-600">
                                            Price
                                        </span>
                                    </div>
                                    <div className="flex flex-col space-y-1 w-full">
                                        <input 
                                            type="number"
                                            name="price"
                                            placeholder="eg. 200"
                                            value={inputs.price}
                                            className={`w-full min-w-0 placeholder:text-xs text-gray-600 border border-gray-300 text-sm rounded-lg ${
                                                !isEditing ? 'border-none' : ''
                                            }`}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                        { errorCheckable && inputErrors.includes('price') ? (
                                            <span className="text-red-500 text-xs">
                                                * Required
                                            </span>
                                        ) : ''}
                                    </div>

                                    <SafeInput
                                        type="number"
                                        name="price"
                                        placeholder="eg. 200"
                                        value={inputs.price}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="flex flex-row items-center justify-end space-x-3">
                                    <div className="flex justify-end w-32">
                                        <span className="text-sm text-gray-600">
                                            Deliverable
                                        </span>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="deliverable"
                                        placeholder="eg. 3 set of logo design"
                                        value={inputs.deliverable}
                                        className={`w-full min-w-0 placeholder:text-xs text-gray-600 border border-gray-300 text-sm rounded-lg ${
                                            !isEditing ? 'border-none' : ''
                                        }`}
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>

                        { isEditing ? (
                            <div className="flex flex-row justify-between">
                                <div className="flex items-center space-x-1">
                                    <Button
                                        size="sm"
                                        title="Cancel"
                                        onClick={() => setIsEditing(false)}
                                        disabled={!isEdit}
                                    />
                                    <Button
                                        size="sm"
                                        title={isSubmitting ? 'Saving...' : 'Save'}
                                        onClick={handleOnCreateContract}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    title="Add MileStone"
                                    icon={<PlusCircleIcon className="size-5"/>}
                                    onClick={handleOnClickMileStoneAdd}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    title="Edit Contract"
                                    onClick={() => setIsEditing(true)}
                                />
                            </div>
                        )}
                    </div>

                    {/* milestone */}
                    { milestones.length !== 0 ? (
                        <div 
                            className={`flex-1 min-w-80 max-h-80 overflow-auto ${showScrollShadow ? 'mask-gradient' : ''}`} 
                            onScroll={toggleScrollShadow}
                        >
                            <div className="flex flex-1 flex-col space-y-7">
                                { milestones.map( milestone => 
                                    <div 
                                        key={milestone.id} 
                                        className="flex flex-row items-center space-x-5"
                                    >
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm text-gray-600 font-bold">
                                                { milestone.name }
                                            </span>
                                            { isEditing ? (
                                                <div className="flex flex-row items-center justify-center space-x-1">
                                                    <button
                                                        className="border border-red-400 rounded p-1"
                                                        onClick={() => handleOnMilestoneDelete(milestone.id)}
                                                    >
                                                        <TrashIcon className="size-3 text-red-500"/>
                                                    </button>
                                                    <button
                                                        className="border border-blue-400 rounded p-1"
                                                        onClick={() => handleOnClickMileStoneEdit(milestone)}
                                                    >
                                                        <PencilIcon className="size-3 text-blue-500"/>
                                                    </button>
                                                </div>
                                            ) : ''}
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            { milestone.tasks.map( task =>
                                                <div 
                                                    key={task.id}
                                                    className="flex flex-row items-center space-x-2"
                                                >
                                                    <span className="text-gray-600">•</span>
                                                    <span className={`mt-1 text-sm text-gray-600`}>
                                                        { task.name }
                                                    </span>
                                                </div>
                                            )}
                                            { milestone.dueDate ? (
                                                <div className="flex flex-row items-center space-x-2">
                                                    <span className="text-gray-600">•</span>
                                                    <span className={`mt-1 text-sm text-gray-600`}>
                                                        due by: { milestone.dueDate }
                                                    </span>
                                                </div>
                                            ) : ''}
                                        </div>
                                        <div className="flex justify-end min-w-12">
                                            <span className="text-gray-600">
                                                { milestone.price }
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : ''}

                </div>
            </div>

            <MilestoneFormModal
                key={targetMilestone?.id}
                isOpen={showMilestoneFormModal}
                milestone={targetMilestone}
                onClose={() => setShowMilestoneFormModal(false)}
                onAdded={handleOnNewMilestoneAdded}
                onUpdated={handleOnMilestoneUpdated}
            />
        </>
    );
}

export default NewContractCard