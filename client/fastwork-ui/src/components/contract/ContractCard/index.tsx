import Image from 'next/image';
import React, { UIEvent, useEffect, useMemo, useState } from 'react'
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import MilestoneFormModal from './MilestoneFormModal';
import { Contract, Milestone, Task } from '@/types/general';
import { useChat } from '@/contexts/chat';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import httpClient from '@/client/httpClient';
import SafeInput, { SafeInputChangeEvent } from '@/components/SafeInput';
import Button from '@/components/Button';

interface ContractCardProps {
    title: string,
    size?: 'xs' | 'sm';
    isEditMode?: boolean;
    contract: Contract | null;
    onClose?: () => void;
    onClickCancel?: () => void;
    isAccepted?: boolean;
}

const ContractCard = ({
    title,
    size = 'sm',
    isEditMode = false,
    contract,
    onClose,
    onClickCancel,
    isAccepted = false
}: ContractCardProps) => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { activeChatRoom, sendMessage } = useChat();
    const numberFormater = new Intl.NumberFormat();

    const [inputs, setInputs] = useState({
        price: contract ? contract.price : activeChatRoom?.service?.price.toString(),
        deliverable: contract ? contract.deliverable : ''
    });
    const [milestones, setMilestones] = useState<Milestone[]>(contract ? contract.milestones : []);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showScrollShadow, setShowScrollShadow] = useState<boolean>(false);

    //for milestone modal
    const [showMilestoneFormModal, setShowMilestoneFormModal] = useState(false);
    const [targetMilestone, setTargetMilestone] = useState<Milestone | null>(null);

    //watcher
    useEffect( () => {
        if(milestones.length !== 0){
            const milestoneTotalPrice = milestones.reduce((total, current) => {
                return total + Number(current.price);
            }, 0);

            setInputs( prev => ({...prev, price: milestoneTotalPrice}) );
        }
    }, [milestones]);

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

        const uploadMilestone = async (payload: Milestone) => {
            try {
                const res = await httpClient.post('checkpoint', {
                    ...payload,
                    matchId: activeChatRoom?.match_id
                });
                return res.data;
            } catch (error) {
                console.error('error uploading new milestone', error);
            }
        };

        const uploadTask = async (payload: Task) => {
            try{
                await httpClient.post('task', payload);
            } catch (error) {
                console.log('error uploading new task', error);
            }
        }

        const handleOnCreateContract = async () => {
            setErrorCheckable(true);
        
            if (inputErrors.length === 0) {
                setIsSubmitting(true);
        
                try {
                    //create_contract
                    const contractRes = await httpClient.post('contract', {
                        matchesId: activeChatRoom?.match_id,
                        price: inputs.price,
                        deliverable: inputs.deliverable,
                        acceptBy: [
                            authUser?.profile.id
                        ],
                        profileId: authUser?.profile.id
                    });
        
                    const contractId = contractRes.data.id;

                    if (milestones.length !== 0) {
                         //sequential upload for milestones
                        for (const milestone of milestones) {
                            const newlyCreatedMilestone = await uploadMilestone({
                                ...milestone,
                                id: null!,
                                contractId: contractId,
                                tasks: [],
                                dueDate: ''
                            });

                            const milestoneId = newlyCreatedMilestone.id;

                            //sequential upload for tasks
                            for(const task of milestone.tasks){
                                await uploadTask({
                                    ...task,
                                    checkpointId: milestoneId
                                });
                            }
                        }
                    }

                    await sendMessage('contract', contractId.toString());

                    setShowMilestoneFormModal(false);
                    onClose?.();
        
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

        const handleOnMilestoneDelete = (milestoneId: string | number | null) => {
            if(milestoneId && confirm('Are you sure want to delete?')){
                setMilestones( prev => prev.filter( milestone => milestone.id !== milestoneId ));
            }
        }

    return (
        <>
            <div className={`flex flex-col max-h-screen rounded-2xl overflow-hidden ${
                isAccepted ? 'bg-green-100' : 'bg-white'
            }`}>
                <div className={`flex-1 flex flex-row space-x-2 flex-wrap ${size === 'xs' ? 'p-4' : 'p-6'}`}>

                    {/* form */}
                    <div className="flex-1 flex flex-col justify-between min-w-64 space-y-5 overflow-hidden">
                        <div className="space-y-5">
                            <div className="flex flex-row space-x-3 items-center">
                                <Image
                                    width={50}
                                    height={50}
                                    src="/avatar.svg" 
                                    alt="avatar"
                                    className="rounded-full w-14 h-14"
                                />
                                <span className={`${ size === 'sm' ? 'text-xl' : 'text-lg'} font-bold`}>
                                    {title}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2 mx-1">
                                <div className="flex flex-row items-center justify-end space-x-1">
                                    <div className="flex w-32">
                                        <span className={`text-${size} text-gray-600`}>
                                            Total Price
                                        </span>
                                    </div>

                                    <div className="flex flex-row space-x-1 w-full">
                                        <div className="flex items-center justify-center px-3 rounded-lg bg-gray-100">
                                            <span className={`text-gray-600 text-${size}`}>
                                                $
                                            </span>
                                        </div>
                                        <SafeInput
                                            type="decimal"
                                            name="price"
                                            placeholder="eg. 200"
                                            value={inputs.price ?? ''}
                                            onChange={handleInputChange}
                                            disabled={!isEditMode || milestones.length > 0}
                                            errors={[
                                                {
                                                    show: errorCheckable && inputErrors.includes('price'),
                                                    msg: 'Required'
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row items-center justify-end space-x-1">
                                    <div className="flex w-32">
                                        <span className={`text-${size} text-gray-600`}>
                                            Deliverable
                                        </span>
                                    </div>
                                    <SafeInput
                                        size={size}
                                        type="text"
                                        name="deliverable"
                                        placeholder="eg. 3 set of logo design"
                                        value={inputs.deliverable}
                                        onChange={handleInputChange}
                                        disabled={!isEditMode}
                                        errors={[
                                            {
                                                show: errorCheckable && inputErrors.includes('deliverable'),
                                                msg: 'Required'
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        { isEditMode ? (
                            <div className="flex flex-row justify-between space-x-1">
                                <div className="flex flex-row gap-1">
                                    { onClickCancel ? (
                                        <Button
                                            size={size}
                                            color="secondary"
                                            title="Cancel"
                                            onClick={onClickCancel}
                                        />
                                    ): ''}
                                    <Button
                                        size={size}
                                        title={isSubmitting ? 'Saving...' : 'Save'}
                                        onClick={handleOnCreateContract}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button
                                    size={size}
                                    color="info"
                                    title="Add MileStone"
                                    icon={<PlusCircleIcon className="size-5"/>}
                                    onClick={handleOnClickMileStoneAdd}
                                />
                            </div>
                        ) : ''}
                    </div>

                    {/* milestone */}
                    { milestones.length !== 0 ? (
                        <div 
                            className={`flex-1 min-w-60 max-h-80 mt-5 overflow-auto ${showScrollShadow ? 'mask-gradient' : ''}`} 
                            onScroll={toggleScrollShadow}
                        >
                            <div className="flex flex-1 flex-col space-y-7">
                                { milestones.map( milestone => 
                                    <div 
                                        key={milestone.id} 
                                        className="flex flex-row items-center space-x-5"
                                    >
                                        <div className="flex flex-col space-y-1">
                                            <div className="max-w-24 text-center w-full">
                                                <span className={`text-${size} text-gray-600 font-bold`}>
                                                    { milestone.title }
                                                </span>
                                            </div>
                                            { isEditMode ? (
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
                                                    <span className="text-gray-400">•</span>
                                                    <span className={`mt-1 text-${size} text-gray-600`}>
                                                        { task.name }
                                                    </span>
                                                </div>
                                            )}
                                            { milestone.dueDate ? (
                                                <div className="flex flex-row items-center space-x-2">
                                                    <span className="text-gray-600">•</span>
                                                    <span className={`mt-1 text-${size} text-gray-600`}>
                                                        due by: { milestone.dueDate }
                                                    </span>
                                                </div>
                                            ) : ''}
                                        </div>
                                        <div className="flex justify-end min-w-12">
                                            <span className={`text-gray-600 text-${size}`}>
                                                $ { numberFormater.format(milestone.price) }
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

export default ContractCard